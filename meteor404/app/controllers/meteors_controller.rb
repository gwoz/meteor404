class MeteorsController < ApplicationController
  # before_action :find_meteor

  def index
    @meteor = "Billy"
  end

  def create
    @meteor = Meteor.new(params[:meteor])

    @meteor.save
  end

  def new
  end


  def show
  end


  private
  # Unsure if this will break or not for pages that don't have an id.

  # def find_meteor
  #   @meteor = Meteor.find(params[:id])
  # end

end
