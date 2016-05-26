class CreateMeteors < ActiveRecord::Migration
  def change
    create_table :meteors do |t|
      t.string :name
      t.integer :mass
      t.integer :year
      t.float :reclat
      t.float :reclong
      t.boolean :favorite, default: false

      t.timestamps null: false
    end
  end
end
