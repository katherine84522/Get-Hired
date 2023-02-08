class AddTimeToInterviews < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :time, :time
  end
end
