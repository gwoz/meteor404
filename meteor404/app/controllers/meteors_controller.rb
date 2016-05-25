class MeteorsController < ApplicationController
  # before_action :find_meteor
  skip_before_action :verify_authenticity_token
  def index
  end

  def create
    @meteor = Meteor.new(name: params[:name], mass: params[:mass], year: params[:year], reclat: params[:lat], reclong: params[:lng])
    @meteor.save

    render '_meteor_details_section', locals: { meteor: @meteor}, layout: false
  end

  def show
    binding.pry
    @address = Address.new
    @meteor = Meteor.find(params[:id])
  end

  private
  # Unsure if this will break or not for pages that don't have an id.

  # def find_meteor
  #   @meteor = Meteor.find(params[:id])
  # end

end
