class AddAddressToInterviews < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :address, :string
  end
end
