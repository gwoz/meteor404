class ApplicationController < ActionController::Base
  # respond_to :html, :json
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.


  def handle_options_request
    head(:ok) if request.request_method == "OPTIONS"
  end
  skip_before_action :verify_authenticity_token
  after_filter :set_access_control_headers

  def set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
  end
  
  protect_from_forgery with: :exception
end
