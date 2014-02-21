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
		p "callback - 1"
		provider = params[:provider]
		
		if current_user
		p "callback - 2"
			connect_authentication_to_user(provider)
					p "callback - 3"
			redirect_back_or_to(admin_root_path)
					p "callback - 4"
			return
		end
		
		if @user = login_from(provider)
					p "callback - 5"
			if token = access_token(provider.to_sym)
						p "callback - 6"
				auth = @user.authentications.where(:provider => provider.to_s).first
						p "callback - 7"
				auth.update_attributes(access_token: token.token)
						p "callback - 8"
			end
			redirect_back_or_to admin_root_path, :notice => "Logged in from #{provider.titleize}!"
		else
			begin
						p "callback - 9"
				@user = find_or_create_from(provider)

				# @user = create_from(provider)
				# NOTE: this is the place to add '@user.activate!' if you are using user_activation submodule
		p "callback - 10"
				reset_session # protect from session fixation attack
						p "callback - 11"
				auto_login(@user)
						p "callback - 12"
				redirect_back_or_to admin_root_path, :notice => "Logged in from #{provider.titleize}!"
			rescue Exception => e
						p "callback - 13"
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
      p @access_token
      p 2222222222222222222222222222222
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
			p "fc - 1"
			provider = provider.to_sym
			p "fc - 2"
			@provider = Config.send(provider)
						p "fc - 3"
			@user_hash = @provider.get_user_hash(@access_token)
						p "fc - 4"
			config = user_class.sorcery_config
						p "fc - 5"
			attrs = {}
			@provider.user_info_mapping.each do |k,v|
				if (varr = v.split("/")).size > 1
					attribute_value = varr.inject(@user_hash[:user_info]) {|hsh,v| hsh[v] } rescue nil
					attribute_value.nil? ? attrs : attrs.merge!(k => attribute_value)
        else
          attrs.merge!(k => @user_hash[:user_info][v])
				end
			end

      p @user_hash[:user_info]["email"]
      p @provider.user_info_mapping
      p "@@"
      p attrs

			user_class.transaction do
							p "fc - 6"
				unless @user = User.find_by_email(attrs[:email])
								p "fc - 7"
					@user = user_class.new()
								p "fc - 8"
					attrs.each do |k,v|
														p "fc - 9 #{k}: #{v}"
						@user.send(:"#{k}=", v) if @user.respond_to?(k)
					end
					@user.save(:validate => false)
				end
							p "fc - 10"
				user_class.sorcery_config.authentications_class.create!({
					config.authentications_user_id_attribute_name => @user.id, 
					config.provider_attribute_name => provider, 
					config.provider_uid_attribute_name => @user_hash[:uid],
					:access_token => access_token(provider).token
				})
							p "fc - 11"
			end

			p "fc - 12"

			@user
		end

end
