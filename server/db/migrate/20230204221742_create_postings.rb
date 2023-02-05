class CreatePostings < ActiveRecord::Migration[7.0]
  def change
    create_table :postings do |t|
      t.string :link
      t.string :job_title
      t.string :company
      t.string :location
      t.text :description

      t.timestamps
    end
  end
end
