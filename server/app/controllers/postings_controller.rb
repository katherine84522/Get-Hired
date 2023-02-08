class PostingsController < ApplicationController

    def index
        render json: Posting.all
    end

    def show
        posting = Posting.find_by(id: params[:id])
        render json: posting
    end

    def create
        posting = Posting.create(job_title:params[:job_title], company:params[:company], location:params[:location], description:params[:description],link:params[:link], js: params[:js], python: params[:python], react:params[:react], ruby: params[:ruby], deleted: params[:deleted])
        render json: posting
    end


    def update
        posting = Posting.find_by(id: params[:id])
        posting.deleted << params[:deleted]
        posting.save
        render json: posting
    end

    def destroy
        posting = Posting.find_by(id:params[:id])
        posting.destroy
        render json: posting
    end

    def destroy_all
        all_postings = Posting.all
        all_postings.destroy_all
        render json: []
    end


end
