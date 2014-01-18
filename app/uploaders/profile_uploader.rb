# encoding: utf-8

class ProfileUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

	version :w80 do
		process :resize_to_fit => [80, 80]
		process :convert => 'jpg'
	end
	
  version :w100 do
		process :resize_to_fit => [100, 100]
		process :convert => 'jpg'
	end
  
	version :w180 do
		process :resize_to_fit => [180, 180]
		process :convert => 'jpg'
	end
end
