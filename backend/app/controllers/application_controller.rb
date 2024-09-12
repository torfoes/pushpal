class ApplicationController < ActionController::Base
  # for csrf
  skip_before_action :verify_authenticity_token

end
