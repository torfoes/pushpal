require 'openssl'

# Function to derive encryption key using HKDF
def derive_encryption_key(hash_algo, key_material, salt, info, length)
  OpenSSL::KDF.hkdf(key_material,
                    salt: salt,
                    info: info,
                    length: length,
                    hash: hash_algo)
end

# this key is not in use - this is simply to demonstrate the process.
key_material = "xBvLQXMtI7W1BILHGszkhbNpYgOtcaosq64s7Sn6308="
salt = "authjs.session-token"
info = "Auth.js Generated Encryption Key (#{salt})"
length = 64

derived_key = derive_encryption_key('sha256', key_material, salt, info, length)

puts "Derived Key: #{derived_key.unpack1('H*')}"