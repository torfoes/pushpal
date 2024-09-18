class MembershipsController < ApplicationController
  before_action :set_membership, only: %i[show edit update destroy]

  # GET /memberships or /memberships.json
  def index
    if params[:organization_id]
      membership = Membership.find_by(user: @current_user, organization_id: params[:organization_id])

      if membership
        render json: { isMember: true }, status: :ok
      else
        render json: { isMember: false }, status: :ok
      end
      return
    end

    memberships = Membership.includes(:organization).where(user: @current_user)

    organizations = memberships.map do |membership|
      {
        id: membership.organization.id,
        name: membership.organization.name,
        description: membership.organization.description,
        role: membership.role,
        member_count: membership.organization.memberships.count
      }
    end

    render json: { organizations: organizations }, status: :ok
  end

  # GET /memberships/1 or /memberships/1.json
  def show
    render json: @membership, status: :ok
  end

  # POST /memberships or /memberships.json
  def create
    organization = Organization.find_by(id: params[:organization_id])
    if organization.nil?
      render json: { error: 'Organization not found' }, status: :not_found and return
    end

    @membership = Membership.new(user: @current_user, organization: organization, role: :member)

    if @membership.save
      render json: { message: 'Membership created successfully', membership: @membership }, status: :created
    else
      render json: { errors: @membership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /memberships/1 or /memberships/1.json
  def update
    if @membership.update(membership_params)
      render json: { message: 'Membership updated successfully', membership: @membership }, status: :ok
    else
      render json: { errors: @membership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /memberships/1 or /memberships/1.json
  def destroy
    @membership.destroy
    render json: { message: 'Membership successfully destroyed' }, status: :no_content
  end

  private

  def set_membership
    @membership = @current_user.memberships.find_by(id: params[:id])
    unless @membership
      render json: { error: 'Membership not found' }, status: :not_found
    end
  end

  def membership_update_params
    params.require(:membership).permit(:role)
  end
end
