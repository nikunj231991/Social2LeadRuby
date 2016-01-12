class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
 WEB_URL= "http://localhost:3000/"
    SERVICE_URL= "http://192.168.0.122/Social2Lead.WebApi/"
end
