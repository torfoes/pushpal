#!/usr/bin/env ruby
# frozen_string_literal: true

require 'stringio'
require 'jose'
require 'json'
require 'openssl'

# Helper method to derive the encryption key using HKDF
def derive_encryption_key(hash_algo, key_material, salt, info, length)
  OpenSSL::KDF.hkdf(
    key_material,
    salt:,
    info:,
    length:,
    hash: hash_algo
  )
end

# Sample payload to encode into JWT
payload = {
  email: 'testuser@example.com',
  name: 'Test User',
  picture: 'http://example.com/picture.jpg',
  sub: 'unique_user_id_123'
}

# Define your encryption parameters
hash_algo = 'sha256'
key_material = 'your_test_auth_secret_key_which_is_secure_and_long_enough' # Replace with your actual key
salt = 'your_test_salt_value' # Replace with your actual salt
info = "Auth.js Generated Encryption Key (#{salt})"
length = 64

# Derive the encryption key
derived_key = derive_encryption_key(hash_algo, key_material, salt, info, length)
derived_key_hex = derived_key.unpack1('H*')
puts "Derived Key (Hex): #{derived_key_hex}"

# Convert the hex key to binary
symmetric_key = [derived_key_hex].pack('H*')

# Create a JOSE JWK from the symmetric key
jwk_oct512 = JOSE::JWK.from_oct(symmetric_key)

# Define JWE header with required algorithms
header = {
  'alg' => 'dir',            # Direct encryption using a shared symmetric key
  'enc' => 'A256CBC-HS512'   # Content encryption algorithm
}

# Encrypt the payload into a JWE (JWT) with the header
payload_json = payload.to_json
jwe = JOSE::JWE.block_encrypt(jwk_oct512, payload_json, header)
encrypted_jwt = jwe.compact

puts "\nEncrypted JWT:"
puts encrypted_jwt

# Decrypt the JWT back to payload
begin
  decrypted_payload_json, = JOSE::JWE.block_decrypt(jwk_oct512, encrypted_jwt)
  decrypted_payload = JSON.parse(decrypted_payload_json)

  puts "\nDecrypted Payload:"
  puts JSON.pretty_generate(decrypted_payload)

  # Verify that the decrypted payload matches the original payload
  if decrypted_payload == payload.transform_keys(&:to_s)
    puts "\n✅ The decrypted payload matches the original payload."
  else
    puts "\n❌ The decrypted payload does NOT match the original payload."
  end
rescue JOSE::JWE::Error => e
  puts "\n❌ Failed to decrypt JWT: #{e.message}"
end
