class AddLinkToConnections < ActiveRecord::Migration[7.0]
  def change
    add_column :connections, :link, :string
  end
end
