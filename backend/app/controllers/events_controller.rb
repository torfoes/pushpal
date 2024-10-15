# frozen_string_literal: true

class EventsController < ApplicationController
  # Use optional authentication for viewing events
  before_action :optional_authenticate_request, only: %i[index show]

  # Require authentication for creating, updating, and deleting events
  before_action :authenticate_request, except: %i[index show]

  # Set event context only for actions that need it
  before_action :set_event, only: %i[show update destroy]
  before_action :set_current_member_role, only: %i[show update destroy]
  before_action :authorize_event_management, only: %i[create update destroy]

  # GET /organizations/:organization_id/events
  def index
    @organization = Organization.find(params[:organization_id])
    @events = @organization.events

    render json: @events, status: :ok
  end

  # GET /organizations/:organization_id/events/:id
  def show
    attendances = @event.attendances.includes(membership: :user).map do |attendance|
      {
        id: attendance.id,
        event_id: attendance.event_id,
        organization_id: @event.organization_id,
        checkin_status: attendance.checkin_status,
        checkin_time: attendance.time,
        rsvp_status: attendance.rsvp_status,
        rsvp_time: attendance.rsvp_time,

        # user fields
        user_name: attendance.membership.user.name,
        user_email: attendance.membership.user.email,
        user_id: attendance.membership.user.id,
        user_picture: attendance.membership.user.picture,
        user_role: attendance.membership.role
      }
    end

    response = {
      id: @event.id,
      name: @event.name,
      description: @event.description,
      date: @event.date,
      attendance_required: @event.attendance_required,
      attendances:
    }

    render json: response, status: :ok
  end

  # POST /organizations/:organization_id/events
  def create
    @organization = Organization.find(params[:organization_id])
    @event = @organization.events.build(event_params)

    if @event.save
      create_attendances if @event.attendance_required
      render json: @event, status: :created, location: [@organization, @event]
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organizations/:organization_id/events/:id
  def update
    if @event.update(event_params)
      create_attendances if @event.attendance_required && @event.attendances.empty?
      render json: @event, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/:organization_id/events/:id
  def destroy
    @event.destroy
    render json: { message: 'Event was successfully destroyed.' }, status: :no_content
  end

  private

  def set_current_member_role
    # Find the membership for the current user in the specified organization
    @current_member_role = @current_user.memberships.find_by(organization_id: params[:organization_id])&.role

    # If no membership is found, set the role to nil
    return if @current_member_role

    render json: { error: 'Membership not found' }, status: :forbidden
  end

  # Set the event for actions that need it
  def set_event
    @event = Event.find(params[:id])
  end

  # Permit only trusted parameters
  def event_params
    params.require(:event).permit(:name, :description, :date, :attendance_required, :creator_membership_id)
  end

  # Create attendances for all members if attendance is required
  def create_attendances
    @event.organization.memberships.each do |membership|
      Attendance.create!(membership:, event: @event)
    end
  end

  # Ensure that only authorized users (creator or manager) can manage events
  def authorize_event_management
    organization = @event ? @event.organization : Organization.find(params[:organization_id])
    membership = @current_user.memberships.find_by(organization:)

    return if membership&.role.in?(%w[creator manager])

    render json: { error: 'Not authorized' }, status: :forbidden
  end
end
