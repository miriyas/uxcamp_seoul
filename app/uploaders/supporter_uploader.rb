# encoding: utf-8

class SupporterUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

	version :camp5th do
		process :resize_to_fit => [260, 150]
		process :convert => 'png'
	end

end
