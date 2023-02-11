from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.common.by import By
import requests


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
driver.get('https://www.linkedin.com/jobs/search?keywords=Software%20Engineer&location=United%20States&locationId=&geoId=103644278&f_TPR=r2592000&f_SB2=5&f_E=2&f_JT=F&position=1&pageNum=0')


i = 2
while i <= 120:
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

    try:
        industries = soup2.find(
            'span', class_='description__job-criteria-text description__job-criteria-text--criteria'
        ).text.strip()
    except:
        industries = 'N/A'
        print('industries not found')

    url = "http://127.0.0.1:3000/statistics"
    headers = {"Content-Type": "application/json; charset=utf-8"}
    data = {
        "job_title": job_title,
        "company": company,
        "location": location,
        "description": description,
        "link": link,
        "industries": industries
    }
    response = requests.post(url, headers=headers, json=data)
    print("Status Code", response.status_code)
    print("JSON Response ", response.json())


driver.quit()
