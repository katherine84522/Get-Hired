class AddVirtualToInterviews < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :virtual, :boolean
  end
end
