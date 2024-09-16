class MembershipsController < ApplicationController
  before_action :set_membership, only: %i[ show edit update destroy ]

  # GET /memberships or /memberships.json
  def index
    if params[:organization_id]
      membership = Membership.find_by(user: @current_user, organization_id: params[:organization_id])

      if membership
        render json: { isMember: true }, status: :ok
        return
      else
        render json: { isMember: false }, status: :ok
        return
      end
    else
    end


    memberships = Membership.where(user: @current_user)

    managed_organizations = memberships.where(role: [:creator, :manage]).map do |membership|
      {
        id: membership.organization.id,
        name: membership.organization.name,
        description: membership.organization.description,
        role: membership.role,
        member_count: membership.organization.memberships.count
      }
    end

    member_organizations = memberships.where(role: [:creator, :manage, :member]).map do |membership|
      {
        id: membership.organization.id,
        name: membership.organization.name,
        description: membership.organization.description,
        role: membership.role,
        member_count: membership.organization.memberships.count
      }
    end

    render json: {
      managed_organizations: managed_organizations,
      member_organizations: member_organizations
    }, status: :ok
  end

  # GET /memberships/1 or /memberships/1.json
  def show
    render json: @membership, status: :ok
  end

  # GET /memberships/new
  def new
    @membership = Membership.new
  end

  # GET /memberships/1/edit
  def edit
  end

  # POST /memberships or /memberships.json
  def create
    # Find the organization by ID
    organization = Organization.find_by(id: params[:organization_id])
    if organization.nil?
      return render json: { error: 'Organization not found' }, status: :not_found
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
    # Use callbacks to share common setup or constraints between actions.
    def set_membership
      @membership = Membership.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def membership_params
      params.require(:membership).permit(:user_id, :organization_id, :role)
    end
end
