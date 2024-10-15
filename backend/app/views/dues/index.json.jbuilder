# frozen_string_literal: true

json.array! @dues, partial: 'dues/due', as: :due
