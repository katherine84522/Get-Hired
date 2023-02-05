class AddPythonToPostings < ActiveRecord::Migration[7.0]
  def change
    add_column :postings, :python, :boolean
  end
end
