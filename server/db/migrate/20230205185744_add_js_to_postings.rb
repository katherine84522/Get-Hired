class AddJsToPostings < ActiveRecord::Migration[7.0]
  def change
    add_column :postings, :js, :boolean
  end
end
