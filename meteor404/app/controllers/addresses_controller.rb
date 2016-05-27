class AddressesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def new
  end

  def create
    directions = HTTParty.get("https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal")
    binding.pry
    @address = Address.new(street: params[:address][:street], state: params[:address][:state], city: params[:address][:city], country: params[:address][:country], user_id: 1)
    @address.save


    respond_to do |format|
      format.json { render json: @address }
    end
  end

  def show
  end



  private

  def addresses_params
    params.require(:address).permit(:content)
  end
end



