class Admin::ProgramsController < ApplicationController
	before_filter :require_organizer
	layout 'admin'
	
  def new
    @program = Program.new
  end
  def create
    p params
    params[:program][:period_id] = params[:period_id]
    @program = Program.new(program_params)
    if @program.save
      redirect_to admin_event_path(params[:event_id]), notice: '프로그램이 잘 생성되었습니다.'
    else
			p @program.errors
      render action: 'new'
    end
  end

  def edit
    @program = Program.find(params[:id])
  end
  def update
    p params
    @program = Program.find(params[:id])
    if @program.update(program_params)
      redirect_to admin_event_path(params[:event_id]), notice: '프로그램이 잘 수정되었습니다.'
    else
			p @program.errors
      render action: 'edit'
    end
  end

  def destroy
    @program = Program.find(params[:id])
    @program.destroy
		redirect_to admin_event_path(params[:event_id]), notice: '프로그램을 삭제했습니다.'
  end

  private
    def program_params
      params.require(:program).permit(:title, :position, :room_id, :content, :period_id)
    end
end