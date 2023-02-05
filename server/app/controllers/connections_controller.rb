class ConnectionsController < ApplicationController

    def index
        render json: Connection.all
    end

    def show
        connection = Connection.find_by(id: params[:id])
        render json: connection
    end

    def create
        connection = Connection.create(recruiter: params[:recruiter], name: params[:name], company:params[:company], user_id: params[:user_id])
        render json: connection
    end

    def update
        connection = Connection.find_by(id: params[:id])
        connection.update(company:params[:company])
        render json: connection
    end

    def destroy
        connection = Connection.find_by(id: params[:id])
        connection.destroy
        render json: connection
    end
end
