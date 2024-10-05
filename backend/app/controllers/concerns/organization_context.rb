# app/controllers/concerns/organization_context.rb

module OrganizationContext
  extend ActiveSupport::Concern

  private

  # Dynamically determine the organization ID parameter
  def set_organization
    org_id = organization_id_param
    @organization = Organization.find(org_id)
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Organization not found' }, status: :not_found
  end

  # Helper method to determine the parameter key for organization ID
  def organization_id_param
    params[:id]
  end

  # Set the current user's role within the organization
  def set_current_member_role
    membership = Membership.find_by(user: @current_user, organization: @organization)
    if membership
      @current_member_role = membership.role
      @is_member = true
    else
      @current_member_role = nil
      @is_member = false
    end
  end

  # Set the current user's membership within the organization
  def set_current_membership
    @current_membership = Membership.find_by(user: @current_user, organization: @organization)
  end

  def authorize_member!
    unless @is_member
      render json: { error: 'Unauthorized: You are not a member of this organization.' }, status: :unauthorized
    end
  end

  def authorize_admin!
    unless @current_membership&.role.in?(%w[manager creator])
      render json: { error: 'Unauthorized: Admin access required.' }, status: :unauthorized
    end
  end
end
