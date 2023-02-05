class AddEmailedToInterviews < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :emailed, :boolean
  end
end
