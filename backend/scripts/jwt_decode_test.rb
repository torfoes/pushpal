# frozen_string_literal: true

require 'stringio'
require 'jose'
require 'json'
require 'base64'

# these are test values and were generated with a previous key that is no-longer in use. i will leave this here because it is valuable to understand
encrypted_jwt = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiOVBfaFB4WG8zeFlRVXRkbDhhdmtQMDh5V1ZWX0ppejVtMTZyZnpsSmVEcDVmT291cU55cGoyRy00NWVWcDMtSk5uMWNOcXoycGx0MFdiYlZFUnJSSVEifQ..yRXIEUoLiLh94XuotVdYKQ.POZ_bD3Wi2xUvxw4G-DLusg40mU1c5lixc4z8QiAx3eHhM9UZeA_lR362VdAlTXecGJDFo0BZ0OJzRDcD7oV5hXPy3uyJ8z3Gi6Hzd790xGMKT05W_5y3yHW_tQqACe6BbyQK8pRQuvHkuzLu-LJQ_DjZkAfTBUcqF7aOw_7uV4olIX6SROvCvW8aYkNQaxQ52ymOUSH6tU9PXu9Alr2Qr5CkWE9p-6unA3VKj3zSQVcoi05fOiS6g2dYgG2rWPJgvNPTPIfnJscGAUlEnERRA2SysBDsVZrVLHXXaPxIUBkoaQNtShi_Id2s8n_BR0bf7e12IzEwZv0IES7TMO43RdJZZUHSx44QJoa_u-uZ8hNUK_rmGfBDgeS0hhfS1f-piGIXQrDGsjXEO4G3QsO3g.BjS4aeJpcCdZmSvF7qEOl8tFd_tBGi-5StYV6s6Yeqk'

derived_key = '6e38cbe40ce5a7050110db6d264fd8fc1432a07f84027d441ae2c90773892a74610714f579bcfd2b1824102baafeb3ca38b3e24335bd5f6f855caa625d5aef65'

symmetric_key = [derived_key].pack('H*')
jwk_oct512 = JOSE::JWK.from_oct(symmetric_key)
decrypted_payload, = JOSE::JWE.block_decrypt(jwk_oct512, encrypted_jwt)
payload = JSON.parse(decrypted_payload)

puts "Decrypted Payload: #{payload}"
