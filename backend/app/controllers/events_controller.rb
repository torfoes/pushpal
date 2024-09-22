class EventsController < ApplicationController
  before_action :set_event, only: %i[ show edit update destroy ]

  # GET /events or /events.json
  def index
    if params[:organization_id]
      # Fetch events for the specific organization
      @events = Event.where(organization_id: params[:organization_id])
    else
      # Fallback to return all events if no organization_id is provided (though this should not happen with nested routes)
      @events = Event.all
    end
    render json: @events
  end

  # GET /events/1 or /events/1.json
  def show
    @attendances = @event.attendances.includes(:user)
    render json: { event: @event, attendances: @attendances }
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    @event = Event.new(event_params)
    membership = @current_user.memberships.first # Get the current user's membership

    if membership
      @event.creator_membership_id = membership.id
      @event.organization_id = membership.organization_id # Associate with the user's organization
    else
      render json: { error: 'User has no memberships' }, status: :unprocessable_entity and return
    end

    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1 or /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to event_url(@event), notice: "Event was successfully updated." }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1 or /events/1.json
  def destroy
    @event.destroy

    respond_to do |format|
      format.html { redirect_to events_url, notice: "Event was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:name, :date, :description, :organization_id)
    end
end
