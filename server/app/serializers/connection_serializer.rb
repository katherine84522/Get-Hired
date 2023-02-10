class ConnectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :company, :position, :contact, :recruiter, :user_id, :link
  has_many :jobs
end
