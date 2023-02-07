from email import encoders
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
import ssl
import smtplib
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver import ChromeOptions, Chrome
import time
from selenium.webdriver.common.by import By
import math
import requests
import json


# c = webdriver.ChromeOptions()
# c.add_argument("--incognito")
# Starts the driver and goes to our starting webpage
opts = ChromeOptions()
opts.add_experimental_option("detach", True)
driver = Chrome(chrome_options=opts)

# This loop goes through every page and grabs all the details of each posting
# Loop will only end when there are no more pages to go through
driver.get('https://www.indeed.com/jobs?q=software+engineer+%24110%2C000&l=United+States&sc=0kf%3Aexplvl%28ENTRY_LEVEL%29%3B&fromage=14&vjk=f6c220ac6b9317ae')

time.sleep(3)
# Imports the HTML of the current page into python
soup = BeautifulSoup(driver.page_source, 'lxml')
# Grabs the HTML of each posting
posting_list = driver\
    .find_element(By.CLASS_NAME, 'jobsearch-ResultsList')\
    .find_elements(By.TAG_NAME, 'li')
# print(posting_list)
while True:
    for post in posting_list:
        try:
            anchor = post.find_element(By.TAG_NAME, 'a')
            print(anchor)
            anchor.click()
            time.sleep(2)
            soup2 = BeautifulSoup(driver.page_source, 'lxml')
            try:
                job_title = soup2.find(
                    'h2', class_='icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title is-embedded'
                ).text.strip()
                print(job_title)
            except:
                job_title = 'N/A'
                print('Job title not found')
            try:
                company = soup2.find(
                    'div', class_='css-czdse3 eu4oa1w0'
                ).text.strip()
                print(company)
            except:
                company = 'N/A'
                print('company not found')
            try:
                location = driver.find_element(
                    By.XPATH, '//*[@id="jobsearch-ViewjobPaneWrapper"]/div/div/div/div[1]/div/div/div[1]/div/div[1]/div[1]/div[1]/div[2]/div/div/div/div[2]/div'
                ).text.strip()
                print(location)
            except:
                location = 'N/A'
                print('location not found')
            try:
                description = soup2.find(
                    'div', class_='jobsearch-jobDescriptionText'
                ).text.strip()
            except:
                description = 'N/A'
                print('description not found')

            url = "http://127.0.0.1:3000/statistics"
            headers = {"Content-Type": "application/json; charset=utf-8"}
            data = {
                "job_title": job_title,
                "company": company,
                "location": location,
                "description": description
            }
            response = requests.post(url, headers=headers, json=data)
            print("Status Code", response.status_code)
            print("JSON Response ", response.json())
        except:
            pass

    try:
        driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
        button = soup.find('a', attrs={'aria-label': 'Next Page'}).get('href')
        driver.get('https://indeed.com'+button)
    except:
        break

    break


driver.quit()
