class Admin::OauthController < ApplicationController

	def nothing
		render :nothing => true, :status => :ok
	end


	# sends the user on a trip to the provider,
	# and after authorizing there back to the callback url.
	def oauth
		# store_location
		login_at(params[:provider])
	end

	def callback
		logger.info "callback - 1"
		provider = params[:provider]
		
    # if current_user
    # logger.info "callback - 2"
    #   connect_authentication_to_user(provider)
    #       logger.info "callback - 3"
    #   redirect_back_or_to(admin_root_path)
    #       logger.info "callback - 4"
    #   return
    # end
		
		if @user = login_from(provider)
					logger.info "callback - 5"
			if token = access_token(provider.to_sym)
						logger.info "callback - 6"
				auth = @user.authentications.where(:provider => provider.to_s).first
						logger.info "callback - 7"
				auth.update_attributes(access_token: token.token)
						logger.info "callback - 8"
			end
			redirect_back_or_to admin_root_path, :notice => "Logged in from #{provider.titleize}!"
		else
			begin
						logger.info "callback - 9"
				@user = find_or_create_from(provider)

				# @user = create_from(provider)
				# NOTE: this is the place to add '@user.activate!' if you are using user_activation submodule
		logger.info "callback - 10"
				reset_session # protect from session fixation attack
						logger.info "callback - 11"
				auto_login(@user)
						logger.info "callback - 12"
				redirect_back_or_to admin_root_path, :notice => "Logged in from #{provider.titleize}!"
			rescue Exception => e
						logger.info "callback - 13"
				redirect_back_or_to admin_root_path, :alert => "Failed to login from #{provider.titleize}!"
			end
		end
	end

	# def callback_for_app
	#			attrs = params[:user]
	# 
	#			if attrs[:email].blank?
	#			render json: "", status: :unauthorized
	#				return
	#			end
	# 
	#		if @user = User.find_by_email(attrs[:email])
	#				mobile_authentication = @user.mobile_authentications.create_or_update(attrs[:mobile_authentication])
	# 
	#				if authentication = @user.authentications.where(provider: attrs[:provider], uid: attrs[:uid]).first
	#					authentication.update_attributes(access_token: attrs[:access_token])
	#				else
	#					@user.authentications.create(provider: attrs[:provider], uid: attrs[:uid], access_token: attrs[:access_token])
	#			end
	#		else
	#			render json: ""
	#		end
	# end
	
	# TODO: 현재는 agreement없이 facebook으로 자동 회원가입되도록 해놓음.

	def callback_for_app
		params.permit!
		attrs = params[:user]

		if attrs[:email].blank?
			render json: "", status: :unauthorized
			return
		end

		if @user = User.find_by_email(attrs[:email])
			mobile_authentication = @user.mobile_authentications.create_or_update(attrs[:mobile_authentication])

			if authentication = @user.authentications.where(provider: attrs[:provider], uid: attrs[:uid]).first
				authentication.update_attributes(access_token: attrs[:access_token])
			else
				@user.authentications.create(provider: attrs[:provider], uid: attrs[:uid], access_token: attrs[:access_token])
			end
		else
			# user sign up process for app
			@user = User.new({
				name: attrs[:name],
				email: attrs[:email],
				mobile_authentication: attrs[:mobile_authentication],
			});
			# TODO: User에 속성없음 
			# @user.signup_device = "app"

			if @user.save(:validate => false)
				# UserMailer.signup_notification(user).deliver

				@user.authentications.create(provider: attrs[:provider], uid: attrs[:uid], access_token: attrs[:access_token])
				authentication = @user.mobile_authentications.create_or_update(attrs[:mobile_authentication])
			end
		end

	end

	def agreement
		attrs = params[:user]

		if attrs[:email].blank?
			render json: "", status: :unauthorized
			return
		end

		if @user = User.find_by_email(attrs[:email])
			authentication = @user.mobile_authentications.create_or_update(attrs[:mobile_authentication])
		else
			# user sign up process for app
			@user = User.new(attrs)
			@user.signup_device = "app"

			if @user.save(:validate => false)
				# UserMailer.signup_notification(user).deliver

				@user.authentications.create(provider: attrs[:provider], uid: attrs[:uid], access_token: attrs[:access_token])
				authentication = @user.mobile_authentications.create_or_update(attrs[:mobile_authentication])
			end
		end

		render "callback_for_app"
	end


	protected
		
		def connect_authentication_to_user(provider)
      logger.info  @access_token
      logger.info 2222222222222222222222222222222
			provider = provider.to_sym
			@provider = Config.send(provider.to_sym)
			@provider.process_callback(params,session)
			@user_hash = @provider.get_user_hash(@access_token)
			config = user_class.sorcery_config

			if auth = Authentication.where(:provider => "facebook", :uid => @user_hash[:uid]).first
				auth.update_attribute config.authentications_user_id_attribute_name, current_user.id
			else
				config.authentications_class.create!({
					config.authentications_user_id_attribute_name => current_user.id, 
					config.provider_attribute_name => "facebook", 
					config.provider_uid_attribute_name => @user_hash[:uid],
					:access_token => access_token(:facebook).token
				})
			end
		end

		def find_or_create_from(provider)
			logger.info "fc - 1"
			provider = provider.to_sym
			logger.info "fc - 2"
			@provider = Config.send(provider)
						logger.info "fc - 3"
			@user_hash = @provider.get_user_hash(@access_token)
						logger.info "fc - 4"
			config = user_class.sorcery_config
						logger.info "fc - 5"
			attrs = {}
			@provider.user_info_mapping.each do |k,v|
				if (varr = v.split("/")).size > 1
					attribute_value = varr.inject(@user_hash[:user_info]) {|hsh,v| hsh[v] } rescue nil
					attribute_value.nil? ? attrs : attrs.merge!(k => attribute_value)
        else
          attrs.merge!(k => @user_hash[:user_info][v])
				end
			end

      logger.info @user_hash[:user_info]["email"]
      logger.info @provider.user_info_mapping
      logger.info "@@"
      logger.info attrs

			user_class.transaction do
							logger.info "fc - 6"
				unless @user = User.find_by_email(attrs[:email])
								logger.info "fc - 7"
					@user = user_class.new()
								logger.info "fc - 8"
					attrs.each do |k,v|
														logger.info "fc - 9 #{k}: #{v}"
						@user.send(:"#{k}=", v) if @user.respond_to?(k)
					end
					@user.save(:validate => false)
				end
							logger.info "fc - 10"
				user_class.sorcery_config.authentications_class.create!({
					config.authentications_user_id_attribute_name => @user.id, 
					config.provider_attribute_name => provider, 
					config.provider_uid_attribute_name => @user_hash[:uid],
					:access_token => access_token(provider).token
				})
							logger.info "fc - 11"
			end

			logger.info "fc - 12"

			@user
		end

end
