class Admin::OauthController < ApplicationController

	def nothing
		render :nothing => true, :status => :ok
	end


  # sends the user on a trip to the provider,
  # and after authorizing there back to the callback url.
  def oauth
		session[:return_to_url] = request.referer
    login_at(params[:provider])
  end

  def callback
    provider = params[:provider]
    
    if current_user
      connect_authentication_to_user(provider)
      redirect_back_or_to admin_root_path
      return
    end
    
    if @user = login_from(provider)
      if token = access_token(provider.to_sym)
        auth = @user.authentications.where(:provider => provider.to_s).first
        auth.update_attributes(access_token: token.token)
      end
    	redirect_back_or_to admin_root_path, :notice => "페이스북으로 로그인 성공."
    else
      begin
        @user = find_or_create_from(provider)

        # @user = create_from(provider)
        # NOTE: this is the place to add '@user.activate!' if you are using user_activation submodule

        reset_session # protect from session fixation attack
        auto_login(@user)
        redirect_back_or_to admin_root_path, :notice => "페이스북으로 로그인 성공."
      rescue Exception => e
        redirect_back_or_to admin_root_path, :alert => "Failed to login from #{provider.titleize}! 이준혁을 불러주세요."
      end
    end
  end

  # def callback_for_app
  #     attrs = params[:user]
  # 
  #     if attrs[:email].blank?
  #     render json: "", status: :unauthorized
  #       return
  #     end
  # 
  #   if @user = User.find_by_email(attrs[:email])
  #       mobile_authentication = @user.mobile_authentications.create_or_update(attrs[:mobile_authentication])
  # 
  #       if authentication = @user.authentications.where(provider: attrs[:provider], uid: attrs[:uid]).first
  #         authentication.update_attributes(access_token: attrs[:access_token])
  #       else
  #         @user.authentications.create(provider: attrs[:provider], uid: attrs[:uid], access_token: attrs[:access_token])
  #     end
  #   else
  #     render json: ""
  #   end
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
      provider = provider.to_sym
      @provider = Config.send(provider.to_sym)
      @provider.process_callback(params,session)
      @user_hash = @provider.get_user_hash
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
      provider = provider.to_sym
      @provider = Config.send(provider)
      @user_hash = @provider.get_user_hash(@access_token)
      config = user_class.sorcery_config
      attrs = {}
      @provider.user_info_mapping.each do |k,v|
        if (varr = v.split("/")).size > 1
          attribute_value = varr.inject(@user_hash[:user_info]) {|hsh,v| hsh[v] } rescue nil
          attribute_value.nil? ? attrs : attrs.merge!(k => attribute_value)
        else
          if [:birthday].include?(k)
            begin
              d = @user_hash[:user_info][v].split("/")
              attrs.merge!(k => Date.new(d[2].to_i,d[0].to_i,d[1].to_i))
            rescue
            end
          else
            attrs.merge!(k => @user_hash[:user_info][v])
          end
        end
      end

      user_class.transaction do
        unless @user = User.find_by_email(attrs[:email])
          @user = user_class.new()
          attrs.each do |k,v|
            @user.send(:"#{k}=", v)
          end
          @user.save(:validate => false)
        end
        user_class.sorcery_config.authentications_class.create!({
          config.authentications_user_id_attribute_name => @user.id, 
          config.provider_attribute_name => provider, 
          config.provider_uid_attribute_name => @user_hash[:uid],
  				:access_token => access_token(provider).token
        })
      end

      @user
    end

end
