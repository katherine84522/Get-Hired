from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import requests

base_url = 'https://www.indeed.com'

c = webdriver.ChromeOptions()
c.add_argument("--incognito")
# Starts the driver and goes to our starting webpage
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=c
)
driver.get(f'{base_url}/jobs?q=software+engineer&sc=0kf%3Aexplvl%28ENTRY_LEVEL%29jt%28fulltime%29%3B&fromage=14&vjk=c1ec75b86b23bf87')

# This loop goes through every page and grabs all the details of each posting
# Loop will only end when there are no more pages to go through
while True:
    # Imports the HTML of the current page into python
    soup1 = BeautifulSoup(driver.page_source, 'lxml')

    # Grabs the HTML of each posting
    posting_anchors = soup1.find_all('a', class_='jcs-JobTitle')
    for anchor in posting_anchors:
        post_path = anchor.get('href')
        post_url = f'{base_url}{post_path}'
        driver.execute_script("window.open('')")
        driver.switch_to.window(driver.window_handles[1])
        driver.get(post_url)
        soup2 = BeautifulSoup(driver.page_source, 'lxml')
        try:
            name = soup2.find(
                'h1', class_='icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title').text.strip()
        except:
            name = 'None'

        try:
            company = driver.find_element(
                By.XPATH, '//*[@id="viewJobSSRRoot"]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[3]/div[1]/div[2]/div/div/div/div[1]/div[2]/div/a'
            ).text.strip()
        except:
            try:
                company = driver.find_element(
                    By.XPATH, '//*[@id="viewJobSSRRoot"]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div[2]/div/a'
                ).text.strip()
            except:
                company = None
                print(company)
        try:
            location = driver.find_element(
                By.XPATH, '//*[@id="viewJobSSRRoot"]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[3]/div[1]/div[2]/div/div/div/div[2]/div').text.strip()
        except:
            try:
                location = driver.find_element(
                    By.XPATH, '//*[@id="viewJobSSRRoot"]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div/div[2]/div').text.strip()
            except:
                location = None
        # driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
        try:
            description = soup2.find(
                'div', class_='jobsearch-jobDescriptionText').text.strip()
        except:
            description = None

        url = "http://127.0.0.1:3000/statistics"
        headers = {"Content-Type": "application/json; charset=utf-8"}
        data = {
            "job_title": name,
            "company": company,
            "location": location,
            "description": description,
            "link": post_url
        }
        response = requests.post(url, headers=headers, json=data)
        print("Status Code", response.status_code)
        print("JSON Response ", response.json())
        driver.close()
        driver.switch_to.window(driver.window_handles[0])

    try:
        driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
        button = soup1.find('a', attrs={'aria-label': 'Next Page'}).get('href')
        driver.get('https://indeed.com'+button)
    except:
        break

driver.quit()
