class MeteorsController < ApplicationController
  # before_action :find_meteor
  skip_before_action :verify_authenticity_token
  def index
  end

  def create
    binding.pry
    @meteor = Meteor.new(params[:meteor])
    @meteor.save


  end

  def show
  end

  private
  # Unsure if this will break or not for pages that don't have an id.

  # def find_meteor
  #   @meteor = Meteor.find(params[:id])
  # end

end
