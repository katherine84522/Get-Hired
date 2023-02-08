class AddDeletedToPostings < ActiveRecord::Migration[7.0]
  def change
    add_column :postings, :deleted, :integer, array: true, default: []
  end
end
