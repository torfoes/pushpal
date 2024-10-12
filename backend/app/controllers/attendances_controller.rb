# app/controllers/attendances_controller.rb

class AttendancesController < ApplicationController
  include OrganizationContext

  private def organization_id_param
    params[:organization_id]
  end

  before_action :authenticate_request
  before_action :set_organization
  before_action :set_event
  before_action :set_current_member_role
  before_action :authorize_member!

  before_action :set_attendance, only: [:show, :update, :destroy, :toggle_rsvp, :toggle_checkin]
  before_action :authorize_attendance_modification, only: [:update, :destroy, :toggle_rsvp, :toggle_checkin]

  # GET /organizations/:organization_id/events/:event_id/attendances
  def index
    attendances = @event.attendances.includes(membership: :user)
    render json: attendances.map { |attendance| attendance_json(attendance) }, status: :ok
  end

  # GET /organizations/:organization_id/events/:event_id/attendances/:id
  def show
    render json: attendance_json(@attendance), status: :ok
  end

  # POST /organizations/:organization_id/events/:event_id/attendances
  def create
    @attendance = @event.attendances.new(attendance_params)

    if @attendance.save
      render json: attendance_json(@attendance), status: :created
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organizations/:organization_id/events/:event_id/attendances/:id
  def update
    if @attendance.update(attendance_params)
      render json: attendance_json(@attendance), status: :ok
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/:organization_id/events/:event_id/attendances/:id
  def destroy
    @attendance.destroy
    render json: { message: 'Attendance was successfully destroyed.' }, status: :no_content
  end

  # POST /organizations/:organization_id/events/:event_id/attendances/:id/toggle_rsvp
  def toggle_rsvp
    @attendance.rsvp_status = !@attendance.rsvp_status
    @attendance.rsvp_time = @attendance.rsvp_status ? Time.current : nil

    if @attendance.save
      render json: attendance_json(@attendance), status: :ok
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  # POST /organizations/:organization_id/events/:event_id/attendances/:id/toggle_checkin
  def toggle_checkin
    @attendance.checkin_status = !@attendance.checkin_status
    @attendance.time = @attendance.checkin_status ? Time.current : nil

    if @attendance.save
      render json: attendance_json(@attendance), status: :ok
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  private

  # Helper method to serialize attendance
  def attendance_json(attendance)
    {
      id: attendance.id,
      event_id: attendance.event_id,
      organization_id: @organization.id,
      checkin_status: attendance.checkin_status,
      checkin_time: attendance.time,
      rsvp_status: attendance.rsvp_status,
      rsvp_time: attendance.rsvp_time,
      # User fields
      user_id: attendance.membership.user.id,
      user_name: attendance.membership.user.name,
      user_email: attendance.membership.user.email,
      user_picture: attendance.membership.user.picture,
      user_role: attendance.membership.role
    }
  end

  # Set the event based on event_id
  def set_event
    @event = @organization.events.find_by(id: params[:event_id])
    unless @event
      render json: { error: 'Event not found' }, status: :not_found
    end
  end

  # Set the attendance based on id
  def set_attendance
    @attendance = @event.attendances.find_by(id: params[:id])
    unless @attendance
      render json: { error: 'Attendance not found' }, status: :not_found
    end
  end

  # Only allow a list of trusted parameters through.
  def attendance_params
    params.require(:attendance).permit(:membership_id, :rsvp_status, :checkin_status)
  end

  # Authorize the user to modify the attendance
  def authorize_attendance_modification
    if @attendance.membership.user_id == @current_user.id
      # User is modifying their own attendance
      return
    elsif @current_member_role.in?(%w[creator manager])
      # User is an admin in the organization
      return
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
