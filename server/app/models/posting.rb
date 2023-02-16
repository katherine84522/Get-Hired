class Posting < ApplicationRecord

    validates :job_title, uniqueness: { scope: :company}
end
