# frozen_string_literal: true
# == Schema Information
#
# Table name: user_social_profiles
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  provider      :string           not null
#  uid           :string           not null
#  access_token  :string
#  access_secret :string
#  name          :string
#  nickname      :string
#  email         :string
#  description   :string
#  image_url     :string
#  omniauth_dump :json
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_user_social_profiles_on_provider_and_uid  (provider,uid) UNIQUE
#  index_user_social_profiles_on_user_id           (user_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_ce01591987  (user_id => users.id)
#

class User::SocialProfile < ApplicationRecord
  belongs_to :user

  class << self
    def find_or_initialize_from_omniauth(omniauth:)
      profile = find_or_initialize_by(
        provider: omniauth[:provider],
        uid: omniauth[:uid]
      )
      profile.assign_attributes(
        access_token: omniauth[:credentials][:token],
        name: omniauth[:info][:name],
        email: omniauth[:info][:email],
        image_url: omniauth[:info][:image],
        omniauth_dump: omniauth.to_json
      )
      profile
    end
  end
end
