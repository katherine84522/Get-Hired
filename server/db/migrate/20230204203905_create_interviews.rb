class CreateInterviews < ActiveRecord::Migration[7.0]
  def change
    create_table :interviews do |t|
      t.date :date
      t.integer :round
      t.integer :user_id
      t.integer :job_id

      t.timestamps
    end
  end
end
