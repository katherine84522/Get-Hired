class CreateStatistics < ActiveRecord::Migration[7.0]
  def change
    create_table :statistics do |t|
      t.string :job_title
      t.string :company
      t.string :location
      t.string :description
      t.string :link
      t.string :industries

      t.timestamps
    end
  end
end
