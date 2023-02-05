class UsersController < ApplicationController


    def index
        render json: User.all
    end

    def show
        if current_user
            render json: current_user, status: :ok
        else
            render json: "Not authenticated", status: :unauthorized
        end 
    end

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        user = User.find_by(id:params[:id])
        user.update(username: params[:username], password: params[:password], email: params[:email], subscribed: params[:subscribed])
        render json: user
    end

    def destroy
        user = User.find_by(id:params[:id])
        user.destroy
        render json: user
    end

    def show_jobs
        jobs = User.find_by(id:params[:id]).jobs
        render json: jobs
    end

    def show_connections
        connections = User.find_by(id:params[:id]).connections
        render json: connections
    end

    def show_interviews
        interviews = User.find_by(id:params[:id]).interviews
        render json: interviews
    end

    private

    def user_params
        params.permit(:username, :email, :password, :subscribed)
    end

end
