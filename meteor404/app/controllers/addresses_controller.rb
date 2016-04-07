class AddressesController < ApplicationController
  def new
  end

  def create
    # @address = Address.new(street: params[:address][:Street], state: params[:address][:State], city: params[:address][:City], country: params[:address][:Country], user_id: 1)
    @address = Address.new(params[:address]).merge(user_id: 1)
    @address.save
  end

  def show
  end

  def index
  end
end

