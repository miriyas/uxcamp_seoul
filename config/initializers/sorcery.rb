Rails.application.config.sorcery.submodules = [:external, :remember_me]

Rails.application.config.sorcery.configure do |config|
  config.external_providers = [:facebook]

  CALLBACK_HOST = "uxcamp.co.kr"
  # CALLBACK_HOST = "localhost:3000"
  
  config.facebook.key = "1379852698941469"  # Facebook App ID
  config.facebook.secret = "a063c07deacab55351d2fa6a9051974f" # Facebook App Secret
  config.facebook.callback_url = "http://#{CALLBACK_HOST}/admin/oauth/callback?provider=facebook"
  config.facebook.user_info_mapping = { :email => "email", :name => "name" }
  config.facebook.scope = "email"
  
  config.user_config do |user|
    user.username_attribute_names = [:email]
    user.authentications_class = Authentication
  end

  config.user_class = "User"
end
