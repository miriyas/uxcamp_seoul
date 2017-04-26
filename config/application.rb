require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module UxcampSeoul
  class Application < Rails::Application
    config.time_zone = 'Seoul'
    config.i18n.enforce_available_locales = true
    # config.assets.paths << "#{Rails}/vendor/assets"
  end
end
