class AddReactToPostings < ActiveRecord::Migration[7.0]
  def change
    add_column :postings, :react, :boolean
  end
end
