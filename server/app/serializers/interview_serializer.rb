class InterviewSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :round, :emailed, :completed, :virtual, :address

  belongs_to :user
  belongs_to :job
end
