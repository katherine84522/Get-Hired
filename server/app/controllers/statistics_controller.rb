class StatisticsController < ApplicationController

    def index
        render json: Statistic.all
    end

    def create
        statistic = Statistic.create(job_title: params[:job_title], company: params[:company], location:params[:location], description: params[:description], link: params[:link], industries: params[:industries])
        render json: statistic
    end

    def destroy_all
        statistics = Statistic.all
        statistics.destroy_all
        render json: []
    end
end
