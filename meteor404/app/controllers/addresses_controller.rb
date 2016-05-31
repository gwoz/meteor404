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
    i = 1
    if directions.length < 1 
      direction_list = directions["routes"][0]["legs"][0]["steps"].each do |step|
        @step_list << i
        @step_list << ". "
        @step_list << step["html_instructions"]
        @step_list << "<br>"
        @step_list << "<br>"
        i += 1
      end
      render json: @step_list
    else
      @step_list << "<h2>Sorry, but you cant drive to that meteor. </h2> <br> <h2>It's probably accross an ocean...</h2><br><h2> maybe try booking a flight?</h2>"
      render json: @step_list
    end 
  end

  def center_map
    @address = Address.new(city: params["city"])
    render json: @address
  end

  private
    def addresses_params
      params.require(:address).permit(:content)
    end
end



