# spec/support/request_spec_helper.rb

module RequestSpecHelper
  def json
    JSON.parse(response.body)
  end

  def valid_headers(user)
    {
      "Authorization" => "Bearer #{generate_encrypted_jwt(user)}",
      "Content-Type" => "application/json"
    }
  end

  def unauthorized_headers
    {
      "Authorization" => nil,
      "Content-Type" => "application/json"
    }
  end
end
