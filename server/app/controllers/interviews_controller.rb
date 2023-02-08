class InterviewsController < ApplicationController

    def index
        render json: Interview.all
    end

    def show
        interview = Interview.find_by(id: params[:id])
        render json: interview
    end

    def create
        interview = Interview.create(date: params[:date], round: params[:round], user_id: params[:user_id], job_id: params[:job_id], emailed:params[:emailed], completed: params[:completed], virtual:params[:virtual], address:params[:address], time: params[:time])
        render json: interview
    end

    def update
        interview = Interview.find_by(id: params[:id])
        interview.update(emailed:params[:emailed], completed: params[:completed])
        render json: interview
    end

    def destroy
        interview = Interview.find_by(id: params[:id])
        interview.destroy
        render json: interview
    end

end
