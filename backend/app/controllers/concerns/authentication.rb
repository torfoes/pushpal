# frozen_string_literal: true

module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request
  end

  private

  def optional_authenticate_request
    token = extract_token_from_header

    return unless token.present?

    begin
      decoded_jwt = decrypt_jwt(token)
      email = decoded_jwt['email']
      name = decoded_jwt['name']
      picture = decoded_jwt['picture']
      sub = decoded_jwt['sub']

      @current_user = find_or_create_user(email, name, picture, sub) if email.present? && name.present? && sub.present?
    rescue StandardError => e
      Rails.logger.error("Optional authentication failed: #{e.message}")
    end
  end

  def authenticate_request
    # Rails.logger.info("Starting authentication for request...")

    token = extract_token_from_header

    if token.present?
      # Rails.logger.info("Token extracted successfully")
      # Rails.logger.info(token)

      begin
        decoded_jwt = decrypt_jwt(token)
        # Rails.logger.info("Decoded JWT: #{decoded_jwt.inspect}")

        email = decoded_jwt['email']
        name = decoded_jwt['name']
        picture = decoded_jwt['picture']
        sub = decoded_jwt['sub']

        unless email.present? && name.present? && sub.present?
          render json: { error: 'Invalid token payload' }, status: :unauthorized
          return
        end

        @current_user = find_or_create_user(email, name, picture, sub)

        # case where user could not be found or created
        render json: { error: 'Unable to authenticate user' }, status: :unauthorized unless @current_user

      # rescue JOSE::JWT::DecodeError => e
      #   render json: { error: 'Invalid token', message: e.message }, status: :unauthorized
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: 'Invalid user data', message: e.message }, status: :unprocessable_entity
      rescue StandardError => e
        render json: { error: 'Authentication failed', message: e.message }, status: :unauthorized
      end
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  def extract_token_from_header
    auth_header = request.headers['Authorization']
    return unless auth_header&.start_with?('Bearer ')

    auth_header.split(' ').last
  end

  def decrypt_jwt(token)
    decrypted_payload, = JOSE::JWE.block_decrypt(JWK_OCT512, token)
    JSON.parse(decrypted_payload)
  end

  def find_or_create_user(email, name, picture, sub)
    # Rails.logger.info("Attempting to find or create user with email: #{email}")
    user = User.find_or_create_by(email:) do |user|
      user.name = name
      user.picture = picture
      user.sub = sub
    end

    if user.persisted?
      Rails.logger.info("User found or created successfully: #{user.inspect}")
    else
      Rails.logger.error("Failed to create or find user: #{user.errors.full_messages}")
    end
    user
  end
end
