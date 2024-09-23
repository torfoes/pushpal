# config/initializers/vapid_keys.rb

VAPID_KEYS = {
  public_key: (ENV['VAPID_PUBLIC_KEY'] || Rails.application.credentials.dig(:webpush, :public_key)).to_s.freeze,
  private_key: (ENV['VAPID_PRIVATE_KEY'] || Rails.application.credentials.dig(:webpush, :private_key)).to_s.freeze,
  subject: (ENV['VAPID_SUBJECT'] || Rails.application.credentials.dig(:webpush, :subject)).to_s.freeze
}.freeze

missing_keys = []
missing_keys << 'VAPID_PUBLIC_KEY' if VAPID_KEYS[:public_key].blank?
missing_keys << 'VAPID_PRIVATE_KEY' if VAPID_KEYS[:private_key].blank?
missing_keys << 'VAPID_SUBJECT' if VAPID_KEYS[:subject].blank?

unless missing_keys.empty?
  error_message = "Missing VAPID configuration: #{missing_keys.join(', ')}. Please set them in environment variables or Rails credentials."
  Rails.logger.error(error_message)
  raise error_message
end
