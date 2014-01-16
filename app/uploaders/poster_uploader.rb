# encoding: utf-8

class PosterUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

	version :w960 do
		process :resize_to_fit => [960, nil]
		process :convert => 'jpg'
	end
	version :w240 do
		process :resize_to_fit => [240, 320]
		process :convert => 'jpg'
	end

end
