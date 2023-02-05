class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.boolean :applied
      t.boolean :saved
      t.integer :user_id
      t.integer :connection_id
      t.date :applied_date
      t.string :link
      t.string :company
      t.string :job_title

      t.timestamps
    end
  end
end
