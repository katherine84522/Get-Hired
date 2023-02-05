class User < ApplicationRecord
    has_secure_password
     
    has_many :jobs
    has_many :interviews
    has_many :connections
end
