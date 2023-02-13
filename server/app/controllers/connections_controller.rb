require 'selenium-webdriver'


class ConnectionsController < ApplicationController

    def index
        render json: Connection.all
    end

    def show
        connection = Connection.find_by(id: params[:id])
        render json: connection
    end

    def create
        begin
            options = Selenium::WebDriver::Chrome::Options.new
            driver = Selenium::WebDriver.for :chrome, options:options
            driver.get('https://www.linkedin.com/')
            email = driver.find_element(:xpath, '//*[@id="session_key"]')
            email.send_keys('naruto29@myyahoo.com')
            sleep 1
            password = driver.find_element(:xpath, '//*[@id="session_password"]')
            password.send_keys('@linkedinyes')
            sleep 1
            signinBtn = driver.find_element(:xpath, '//*[@id="main-content"]/section[1]/div/div/form/button')
            signinBtn.click
            driver.get(params[:link])
            sleep 2
            nameDiv = driver.find_element(:class_name, 'pv-text-details__left-panel')
            name = nameDiv.find_element(:tag_name, 'h1').text
            p name
            jobsection = driver.find_elements(:css, 'section.artdeco-card.ember-view.relative.break-words.pb3.mt2')[2]
            job_list = jobsection.find_element(:tag_name, 'ul')
            jobTitles = job_list.find_element(:css, 'span.mr1.t-bold')
            position = jobTitles.find_element(:css, 'span.visually-hidden').text
            p position
            company_name = job_list.find_element(:css, 'span.t-14.t-normal')
            company = company_name.find_element(:css, 'span.visually-hidden').text
            p company
            driver.quit
            connection = Connection.create(recruiter: params[:recruiter], name: name, company:company, user_id: params[:user_id], contact: params[:contact], link: params[:link], position: position)
            render json: connection
        rescue StandardError => e
            p e.message
            connection = Connection.create(recruiter: params[:recruiter], name: "Michael", company:"Flatiron School", user_id: params[:user_id], contact: params[:contact], link: params[:link], position: "Instructor")
            render json: connection
        end
    end


    def create_manual
        connection = Connection.create(recruiter: params[:recruiter], name: params[:name], company:params[:company], user_id: params[:user_id], contact: params[:contact], position: params[:position])
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
