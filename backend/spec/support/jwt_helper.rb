# spec/support/jwt_helper.rb

require 'jose'
require 'json'
require 'openssl'
require 'stringio'

module JwtHelper
  def derive_encryption_key(hash_algo, key_material, salt, info, length)
    OpenSSL::KDF.hkdf(
      key_material,
      salt: salt,
      info: info,
      length: length,
      hash: hash_algo
    )
  end

  # init the JWK for encryption/decryption
  def jwk_oct512
    @jwk_oct512 ||= begin
                      hash_algo = 'sha256'
                      key_material = ENV['AUTH_SECRET'] || 'your_test_auth_secret_key_which_is_secure_and_long_enough'
                      salt = ENV['NEXT_PUBLIC_AUTHJS_SESSION_COOKIE'] || 'your_test_salt_value'
                      info = "Auth.js Generated Encryption Key (#{salt})"
                      length = 64

                      derived_key = derive_encryption_key(hash_algo, key_material, salt, info, length)
                      JOSE::JWK.from_oct(derived_key)
                    end
  end

  # gen an encrypted JWT for a given user
  def generate_encrypted_jwt(user)
    payload = {
      email: user.email,
      name: user.name,
      picture: user.picture || 'http://example.com/picture.jpg',
      sub: user.sub || SecureRandom.uuid
    }

    header = {
      'alg' => 'dir',
      'enc' => 'A256CBC-HS512'
    }

    payload_json = payload.to_json
    jwe = JOSE::JWE.block_encrypt(jwk_oct512, payload_json, header)
    jwe.compact
  end
end
