class JobsController < ApplicationController

    def index
        render json: Job.all
    end

    def show
        job = Job.find(id:params[:id])
        render json: job
    end

    def create
        job = Job.create(applied: params[:applied], saved: params[:saved], user_id: params[:user_id], connection_id:params[:connection_id], applied_date: params[:applied_date], link: params[:link], company: params[:company], job_title: params[:job_title], location: params[:location])
        render json: job
    end

    def update
        job = Job.find_by(id: params[:id])
        job.update(applied:params[:applied], saved: params[:saved],applied_date: params[:applied_date])
        render json: job
    end

    def destroy
        job = Job.find_by(id: params[:id])
        job.destroy
        render json: job 
    end
end
