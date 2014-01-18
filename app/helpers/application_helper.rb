module ApplicationHelper


	def hdate(dt, divider={})
		return '' if dt.blank?
		divider = "." if divider.blank?
		dt.strftime("%Y#{divider}%m#{divider}%d")
	end

	def hdatetime(dt, divider={})
		return '' if dt.blank?
		divider = "." if divider.blank?
		dt.strftime("%Y#{divider}%m#{divider}%d %H:%M")
	end
  
  def htime(dt)
		return '' if dt.blank?
		divider = ":"
		dt.strftime("%H:%M")
  end

	# for form error message
	def flash_error_message(association)
		if @errors[association].present?
			@errors.each do |a, message|
				concat "<div class='flash_error_message'>#{message.to_sentence}</div>".html_safe
			end
		end
	end

# == Navigation Tag Helpers ==

  def navigation_tag(options = {}, &block)
    b = NavigationBuilder.new(self, options)
    yield b
    concat(b.to_html) unless b.empty?
    nil
  end
  
  class NavigationBuilder
    include ActionView::Helpers::TagHelper
    include ActionView::Helpers::CaptureHelper
    
    def initialize(template, options = {})
      @template = template
      @items = []
      @container_id = options.delete(:id)
      @container_class = options.delete(:class)
      @spacer = options.delete(:spacer) || "\n"
    end
    
    def empty?
      @items.empty?
    end
    
    def item(caption, path, options = {})
      anchor_option = options.delete(:anchor_option) || {}
      if options[:icon].present?
        caption = "<i class=\"#{options.delete(:icon)}#{ ' icon-white' if options[:current] }\"></i> #{caption}".html_safe
      end

      if options[:count].present?
        model = caption.singularize.constantize
        caption = "#{caption} <span class=\"num_badge\">#{model.count}</span>".html_safe
      end      
      @items << [@template.link_to(caption, path, anchor_option), options]
      nil
    end
    
    def item_html(options = {}, &block)
      content = @template.capture(&block)
      @items << [content, options]
      nil
    end
    
    def item_wrapper(content, options = {})
      classes = [] 
      html_option = options.delete(:html) || {}
      classes << html_option.delete(:class)
      classes << "first"   	if @items.first[0] == content
      classes << "last"     if @items.last[0] == content
      if options.delete(:current)
				classes << "active"
				content = content + content_tag(:div, "", class: "arrow")
			end


			if classes == [nil]
				content_tag :li, content
			else
				html_option[:class] = classes.join(" ").strip
				content_tag :li, content, html_option
			end
    end
    
    def build
      content_tag :ul, @items.collect{|t| item_wrapper(*t)}.join(@spacer).html_safe, :id => @container_id, :class => @container_class
    end
    
    alias :to_html :build
  end


end
