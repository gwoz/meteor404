class CreateMeteors < ActiveRecord::Migration
  def change
    create_table :meteors do |t|
      t.string :name
      t.integer :meteor_id
      t.string :nametype
      t.string :recclass
      t.integer :mass
      t.string :fall
      t.integer :year
      t.float :reclat
      t.float :reclong
      t.string :geolocation
      t.boolean :favorite, default: false

      t.timestamps null: false
    end
  end
end
