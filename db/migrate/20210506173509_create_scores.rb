class CreateScores < ActiveRecord::Migration[6.1]
  def change
    create_table :scores do |t|
      t.string :name
      t.integer :points

      t.timestamps
    end
  end
end
