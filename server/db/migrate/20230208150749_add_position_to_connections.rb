class AddPositionToConnections < ActiveRecord::Migration[7.0]
  def change
    add_column :connections, :position, :string
  end
end
