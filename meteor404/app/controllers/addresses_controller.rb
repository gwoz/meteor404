class AddressesController < ApplicationController
  def new
  end

  def create
    @address = Address.new(params[:address])
    @address.save
  end

  def show
  end

  def index
  end
end
