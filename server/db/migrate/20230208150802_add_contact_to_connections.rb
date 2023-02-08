class AddContactToConnections < ActiveRecord::Migration[7.0]
  def change
    add_column :connections, :contact, :string
  end
end
