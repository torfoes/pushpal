class OrganizationsController < ApplicationController
  skip_before_action :authenticate_request, only: [:show]
  before_action :set_organization, only: %i[ show edit update destroy ]

  # GET /organizations or /organizations.json
  def index
    @organizations = Organization.all
    render json: @organizations, status: :ok
  end

  # GET /organizations/1 or /organizations/1.json
  def show
    members = if @current_user
                @organization.memberships.includes(:user).map do |membership|
                  {
                    id: membership.user.id,
                    name: membership.user.name,
                    email: membership.user.email,
                    role: membership.role
                  }
                end
              else
                []
              end

    response = {
      id: @organization.id,
      name: @organization.name,
      description: @organization.description,
      member_count: @organization.memberships.count,
      members: members.presence
    }

    render json: response, status: :ok
  end

  # GET /organizations/new
  def new
    @organization = Organization.new
    render json: @organization, status: :ok
  end

  # GET /organizations/1/edit
  def edit
    render json: @organization, status: :ok
  end

  # POST /organizations or /organizations.json
  def create
    @organization = Organization.new(organization_params)

    ActiveRecord::Base.transaction do
      if @organization.save
        Membership.create!(
          user: @current_user,
          organization: @organization,
          role: :creator
        )

        render json: @organization, status: :created, location: @organization
      else
        render json: @organization.errors, status: :unprocessable_entity
      end
    end
  end


  # PATCH/PUT /organizations/1 or /organizations/1.json
  def update
    if @organization.update(organization_params)
      render json: @organization, status: :ok
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/1 or /organizations/1.json
  def destroy
    @organization.destroy
    render json: { message: 'Organization was successfully destroyed.' }, status: :no_content
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def organization_params
      params.require(:organization).permit(:name, :description)
    end
end
