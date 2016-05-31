class AddressesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def new
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
    end

    render json: @step_list 
  end

  def show
  end



  private

  def addresses_params
    params.require(:address).permit(:content)
  end
end



