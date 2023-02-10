class AddInvitedNextToInterviews < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :invited_next, :boolean
  end
end
