# frozen_string_literal: true

# spec/support/auth_helper.rb

module AuthHelper
  HARD_CODED_JWT = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiOVBfaFB4WG8zeFlRVXRkbDhhdmtQMDh5V1ZWX0ppejVtMTZyZnpsSmVEcDVmT291cU55cGoyRy00NWVWcDMtSk5uMWNOcXoycGx0MFdiYlZFUnJSSVEifQ..cNGua9et-5yCPFIOUR64TA.fAgrwwnGdZ0vrut0DZJj5s-tOwLv89_VSSd_VyNrAWtL7-rhTrHXqY2ebltPtpjUSXMJcKlmuqh3HQrJO-iEwwKoeDt99z3hNOtJ7eJa48-CN6A8SRk572KalXv2XpN6ZWTxc6cBQ2q_1R-uMgwO4KBhG6xWiS3yZX1RuOow4a8ERvNxRhH5YPLLB_8zAoZMiRlglSzsvqZCQPX7rX0weupkp5tQn-6V16BOsCNsM-jMHS1vHgB-nB3XVi0f0Z8qLB07OIJs3oJdvavcDg3D-tAvN5tFRvj-AOaw9NLv9EuXaBTfobN8Gi-3HyymqEz8qR72H18sqzsFDAXUvBnSOFXGOi01TLnfLBNICau4L0fVyQFy0Mb0dqNRD_FJUs6JZPhIdltkL7OTQ883W2UfHg.dV8gIyzilWLOquOzPUZ0UiSJuVq75XFPhgZk717BGwk'

  def auth_headers
    {
      'Authorization' => "Bearer #{HARD_CODED_JWT}",
      'Content-Type' => 'application/json'
    }
  end
end
