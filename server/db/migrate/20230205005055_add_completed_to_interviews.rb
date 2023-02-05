class AddCompletedToInterviews < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :completed, :boolean
  end
end
