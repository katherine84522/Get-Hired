class Job < ApplicationRecord
    belongs_to :connection, optional: true
    belongs_to :user
end
