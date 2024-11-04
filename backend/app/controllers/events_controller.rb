# frozen_string_literal: true

# app/controllers/events_controller.rb

class EventsController < ApplicationController
  include OrganizationContext

  # Set organization and membership context for all actions
  before_action :set_organization
  before_action :set_current_member_role
  before_action :set_current_membership

  # Authorization callbacks
  before_action :authorize_admin!, only: %i[create update destroy]
  before_action :authorize_member!, only: %i[index show upcoming]

  # Set event context only for actions that need it
  before_action :set_event, only: %i[show update destroy]

  # GET /organizations/:organization_id/events
  def index
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

        # User fields
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
      start_time: @event.start_time,
      duration: @event.duration,
      organization_id: @event.organization_id,
      creator_membership_id: @event.creator_membership_id,
      attendance_required: @event.attendance_required,
      attendances:
    }

    render json: response, status: :ok
  end

  # GET /organizations/:organization_id/events/upcoming
  def upcoming
    @upcoming_events = @organization.events
                                    .where('start_time >= ?', Date.today)
                                    .order(start_time: :asc)
                                    .limit(10)

    render json: @upcoming_events, status: :ok
  end

  # POST /organizations/:organization_id/events
  def create
    @event = @organization.events.build(event_params)
    @event.creator_membership = @current_membership

    if @event.save
      create_attendances
      render json: @event, status: :created, location: [@organization, @event]
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organizations/:organization_id/events/:id
  def update
    if @event.update(event_params)
      create_attendances if @event.attendance_required && @event.attendances.empty?
      render json: @event, status: :ok
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/:organization_id/events/:id
  def destroy
    @event.destroy
    render json: { message: 'Event was successfully destroyed.' }, status: :no_content
  end

  private

  # Override organization_id_param to fetch from :organization_id
  def organization_id_param
    params[:organization_id]
  end

  # Set the event within the context of the current organization
  def set_event
    @event = @organization.events.find_by(id: params[:id])
    render json: { error: 'Event not found' }, status: :not_found unless @event
  end

  # Permit only trusted parameters
  def event_params
    params.require(:event).permit(:name, :description, :start_time, :duration, :attendance_required)
  end

  # Create attendances for all members if attendance is required
  def create_attendances
    @organization.memberships.each do |membership|
      Attendance.create!(membership:, event: @event)
    end
  end
end
