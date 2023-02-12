class ConnectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :company, :position, :contact, :recruiter, :user_id, :link, :created_at
  has_many :jobs
end
