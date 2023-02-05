class CreateConnections < ActiveRecord::Migration[7.0]
  def change
    create_table :connections do |t|
      t.boolean :recruiter
      t.string :name
      t.string :company
      t.integer :user_id

      t.timestamps
    end
  end
end
