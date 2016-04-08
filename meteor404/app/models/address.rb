class Address < ActiveRecord::Base
  belongs_to :user

  def concat_address
    self.street + self.city + self.state + self.country
  end

end
