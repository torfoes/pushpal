# frozen_string_literal: true

# app/controllers/memberships_controller.rb
class MembershipsController < ApplicationController
  include OrganizationContext

  # set organization context for all actions
  before_action :set_organization
  before_action :set_current_member_role
  before_action :set_current_membership

  # Adjust authorization callbacks
  before_action :authorize_admin!, only: %i[update destroy]
  # Exclude :current from authorize_member!
  before_action :authorize_member!, only: %i[index show]

  before_action :set_membership, only: %i[show update destroy]

  # GET /organizations/:organization_id/memberships/current
  def current
    membership = @organization.memberships.find_by(user: @current_user)

    if membership
      render json: {
        id: membership.id,
        role: membership.role,
        organization_id: membership.organization_id
      }, status: :ok
    else
      render json: { error: 'Membership not found' }, status: :not_found
    end
  end

  # GET /organizations/:organization_id/memberships
  def index
    memberships = @organization.memberships.includes(:user)

    render json: {
      memberships: memberships.map do |membership|
        {
          id: membership.id,
          user: {
            id: membership.user.id,
            name: membership.user.name,
            email: membership.user.email,
            picture: membership.user.picture,
            dues_paid: membership.dues_paid
          },
          role: membership.role,
          organization_id: membership.organization_id
        }
      end
    }, status: :ok
  end

  # GET /organizations/:organization_id/memberships/:id
  def show
    render json: {
      id: @membership.id,
      user: {
        id: @membership.user.id,
        name: @membership.user.name,
        email: @membership.user.email,
        picture: @membership.user.picture
      },
      role: @membership.role,
      organization_id: @membership.organization_id
    }, status: :ok
  end

  # POST /organizations/:organization_id/memberships
  def create
    existing_membership = @organization.memberships.find_by(user: @current_user)
    if existing_membership
      render json: { error: 'You are already a member of this organization.' }, status: :unprocessable_entity and return
    end

    @membership = @organization.memberships.new(user: @current_user, role: 'member')

    if @membership.save
      render json: { message: 'Membership created successfully', membership: @membership }, status: :created
    else
      render json: { errors: @membership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organizations/:organization_id/memberships/:id
  def update
    if @membership.update(membership_update_params)
      render json: { message: 'Membership updated successfully', membership: @membership }, status: :ok
    else
      render json: { errors: @membership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/:organization_id/memberships/:id
  def destroy
    @membership.destroy
    render json: { message: 'Membership successfully destroyed' }, status: :no_content
  end

  private

  # override organization_id_param to fetch from :organization_id
  def organization_id_param
    params[:organization_id]
  end

  # Scope the membership within the current organization
  def set_membership
    @membership = @organization.memberships.find_by(id: params[:id])
    return if @membership

    render json: { error: 'Membership not found' }, status: :not_found
  end

  def membership_params
    params.require(:membership).permit(:user_id, :role)
  end

  def membership_update_params
    params.require(:membership).permit(:role, :dues_paid)
  end
end
