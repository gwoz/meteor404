class MeteorsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
  end

  def create
    @meteor = Meteor.new(name: params[:name], mass: params[:mass], year: params[:year], reclat: params[:lat], reclong: params[:lng])
    @meteor.save

    render '_meteor_details_section', locals: { meteor: @meteor}, layout: false
  end
end
