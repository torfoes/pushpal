class ApplicationController < ActionController::Base
  # for csrf
  skip_before_action :verify_authenticity_token

  include Authentication

  before_action :authenticate_request
end
