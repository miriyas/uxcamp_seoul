# encoding: utf-8

class HistoryImageUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

	version :w1280 do
		process :resize_to_fill => [1280, 400]
		process :convert => 'jpg'
	end

end
