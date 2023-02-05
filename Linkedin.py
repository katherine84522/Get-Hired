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
import time
from selenium.webdriver.common.by import By
import math
import requests
import json


c = webdriver.ChromeOptions()
c.add_argument("--incognito")
# Starts the driver and goes to our starting webpage
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=c
)
driver.maximize_window()

# This loop goes through every page and grabs all the details of each posting
# Loop will only end when there are no more pages to go through
driver.get('https://www.linkedin.com/jobs/search?keywords=Software%20Engineer&location=New%20York%2C%20New%20York%2C%20United%20States&locationId=&geoId=102571732&f_TPR=r86400&distance=25&f_E=1%2C2&f_SB2=3&position=1&pageNum=0')

job_count = driver.find_element(
    By.CLASS_NAME, 'results-context-header__job-count').text

job_count_num = int(job_count)

scrolls = job_count_num / 25

rounded_up_scrolls = math.ceil(scrolls)

print('job count string:', job_count)
print('integer:', job_count_num)
print('devision:', scrolls)
print('round up:', rounded_up_scrolls)
print(type(rounded_up_scrolls))

r = requests.delete("http://127.0.0.1:3000/postings", data={'key': 'value'})
print(r)
print(r.json())

i = 2
while i <= rounded_up_scrolls:
    driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
    i = i + 1
    try:
        more_job = driver.find_element(By.CLASS_NAME,
                                       'infinite-scroller__show-more-button infinite-scroller__show-more-button--visible')
        more_job.click()
    except:
        pass
        time.sleep(4)


# Imports the HTML of the current page into python
soup = BeautifulSoup(driver.page_source, 'lxml')
# Grabs the HTML of each posting
posting_list = driver\
    .find_element(By.CLASS_NAME, 'jobs-search__results-list')\
    .find_elements(By.TAG_NAME, 'li')
# print(posting_list)
for post in posting_list:
    python_language = False
    js_language = False
    ruby_language = False
    react_language = False
    anchor = post.find_element(By.TAG_NAME, 'a')
    link = anchor.get_attribute('href')
    anchor.click()
    time.sleep(2)
    soup2 = BeautifulSoup(driver.page_source, 'lxml')
    try:
        job_title = soup2.find(
            'h2', class_='top-card-layout__title font-sans text-lg papabear:text-xl font-bold leading-open text-color-text mb-0 topcard__title'
        ).text.strip()
        print(job_title)
    except:
        job_title = 'N/A'
        print('Job title not found')
    try:
        company = soup2.find(
            'a', class_='topcard__org-name-link topcard__flavor--black-link'
        ).text.strip()
        print(company)
    except:
        company = 'N/A'
        print('company not found')
    try:
        location = soup2.find(
            'span', class_='topcard__flavor topcard__flavor--bullet'
        ).text.strip()
        print(location)
    except:
        location = 'N/A'
        print('location not found')
    try:
        description = soup2.find(
            'div', class_='show-more-less-html__markup show-more-less-html__markup--clamp-after-5'
        ).text.strip()
    except:
        description = 'N/A'
        print('description not found')
    print(link)

    if "python" in description.lower():
        python_language = True

    if "javascript" in description.lower():
        js_language = True

    if "ruby" in description.lower():
        ruby_language = True

    if "react" in description.lower():
        react_language = True

    print("js:", js_language, "python:",
          python_language, "ruby:", ruby_language, "react:", react_language)

    if js_language or python_language or ruby_language or react_language:
        url = "http://127.0.0.1:3000/postings"
        headers = {"Content-Type": "application/json; charset=utf-8"}
        data = {
            "job_title": job_title,
            "company": company,
            "location": location,
            "description": description,
            "link": link,
            "js": js_language,
            "python": python_language,
            "ruby": ruby_language,
            "react": react_language
        }
        response = requests.post(url, headers=headers, json=data)
        print("Status Code", response.status_code)
        print("JSON Response ", response.json())


driver.quit()


# Input the email account that will send the email and who will receiving it
sender = import.meta.env.EMAIL
receiver = import.meta.env.EMAIL

# Creates the Message, Subject line, From and To
msg = MIMEMultipart()
msg['Subject'] = 'New Jobs Today on HIRED'
msg['From'] = sender
msg['To'] = ','.join(receiver)
s = smtplib.SMTP_SSL(host='smtp.gmail.com', port=465)
s.login(user=import.meta.env.EMAIL, password=import.meta.env.PASSWORD)
s.sendmail(sender, receiver, msg.as_string())
s.quit()
