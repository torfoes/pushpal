# frozen_string_literal: true

# app/controllers/organizations_controller.rb

class OrganizationsController < ApplicationController
  include OrganizationContext

  # skip the inherited authenticate_request before_action
  skip_before_action :authenticate_request

  # use optional authentication for :show action
  before_action :optional_authenticate_request, only: [:show]

  # require authentication for all other actions
  before_action :authenticate_request, except: [:show]

  # set organization context only for actions that need it
  before_action :set_organization, only: %i[show update destroy send_push_notifications]
  before_action :set_current_member_role, only: %i[show update destroy send_push_notifications]
  before_action :set_current_membership, only: %i[show update destroy send_push_notifications]

  before_action :authorize_admin!, only: %i[update destroy send_push_notifications]

  # GET /organizations
  def index
    @organizations = Organization.all
    render json: @organizations, status: :ok
  end

  # GET /organizations/:id
  def show
    members = if @is_member
                @organization.memberships.includes(:user).map do |membership|
                  {
                    id: membership.id,
                    name: membership.user.name,
                    email: membership.user.email,
                    picture: membership.user.picture,
                    role: membership.role,
                    dues_paid: membership.dues_paid,
                    organization_id: @organization.id
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
      members:
    }

    render json: response, status: :ok
  end

  # POST /organizations
  def create
    @organization = Organization.new(organization_params)

    ActiveRecord::Base.transaction do
      if @organization.save
        Membership.create!(
          user: @current_user,
          organization: @organization,
          role: :creator,
          dues_paid: false
        )

        render json: @organization, status: :created, location: @organization
      else
        render json: @organization.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /organizations/:id
  def update
    if @organization.update(organization_params)
      render json: @organization, status: :ok
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/:id
  def destroy
    @organization.destroy
    render json: { message: 'Organization was successfully destroyed.' }, status: :no_content
  end

  # GET /organizations/mine
  def mine
    organizations = @current_user.organizations

    organizations_data = organizations.map do |organization|
      membership = organization.memberships.find_by(user: @current_user)

      {
        id: organization.id.to_s,
        name: organization.name,
        description: organization.description,
        role: membership&.role || 'member',
        member_count: organization.memberships.count
      }
    end

    render json: {
      organizations: organizations_data
    }, status: :ok
  rescue StandardError => e
    render json: { error: 'Failed to fetch organizations', message: e.message }, status: :internal_server_error
  end

  private

  def organization_params
    params.require(:organization).permit(:name, :description)
  end
end
