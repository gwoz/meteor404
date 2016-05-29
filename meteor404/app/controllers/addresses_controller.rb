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

    # @step_list_string = JSON.stringify(@step_list)
    # JSON.parse(@step_list_string)
    # respond_to do |format|
    #   format.json { render :json => @step_list.to_json }
    #   # format.json { step_list @step_list }
    # end

    render json: @step_list 




    # @address = Address.new(street: params[:address][:street], state: params[:address][:state], city: params[:address][:city], country: params[:address][:country], user_id: 1)
    # @address.save

  end

  def show
  end



  private

  def addresses_params
    params.require(:address).permit(:content)
  end
end



