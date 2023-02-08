class AddReferredToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :referred, :boolean
  end
end
