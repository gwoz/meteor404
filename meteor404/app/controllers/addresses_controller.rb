class AddressesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
  end

  def create
    street = params["street"]
    city = params["city"]
    state = params["state"]
    country = params["country"]
    lat = params["lat"]
    lng = params["lng"]

    directions = HTTParty.get("https://maps.googleapis.com/maps/api/directions/json?origin=#{street}+#{city}+#{state}&destination=#{lat}+#{lng}")
    @step_list = []

    direction_list = directions["routes"][0]["legs"][0]["steps"].each do |step|
      @step_list << step["html_instructions"]
      @step_list << "<br>"
      @step_list << "<br>"
    end
    render json: @step_list 
  end

  def center_map
    @address = Address.new(city: params["address"]["city"], state: params["address"]["state"])
    render json: @address
  end

  private

  def addresses_params
    params.require(:address).permit(:content)
  end
end



