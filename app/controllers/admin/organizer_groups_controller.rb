class Admin::OrganizerGroupsController < ApplicationController
	before_filter :require_organizer
	layout 'admin'
	
  def new
    @group = OrganizerGroup.new
  end
  def create
    params[:organizer_group][:event_id] = params[:event_id]
    @group = OrganizerGroup.new(group_params)
    if @group.save
      redirect_to admin_event_path(params[:event_id]), notice: '그룹을 추가했습니다.'
    else
			p @group.errors
      render action: 'new'
    end
  end

  def edit
    @group = OrganizerGroup.find(params[:id])
  end
  def update
    @group = OrganizerGroup.find(params[:id])
    if @group.update(group_params)
      redirect_to admin_event_path(params[:event_id]), notice: '그룹을 수정했습니다.'
    else
			p @group.errors
      render action: 'edit'
    end
  end

  def destroy
    @group = OrganizerGroup.find(params[:id])
    @group.destroy
		redirect_to admin_event_path(params[:event_id]), notice: '그룹을 삭제했습니다.'
  end

private
  def group_params
    params.require(:organizer_group).permit(:name, :event_id, :position)
  end
end