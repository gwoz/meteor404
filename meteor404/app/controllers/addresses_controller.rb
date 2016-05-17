class AddressesController < ApplicationController
  def new
  end

  def create
    @address = Address.new(street: params[:address][:street], state: params[:address][:state], city: params[:address][:city], country: params[:address][:country], user_id: 1)
    @address.save

    respond_to do |format|
      format.json { render json: @address }
    end
  end

  def show
  end

  def index
  end

  private

  def addresses_params
    params.require(:address).permit(:content)
  end
end



