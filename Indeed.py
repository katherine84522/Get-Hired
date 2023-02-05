from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import sqlite3
from selenium.webdriver.common.by import By

db_connection = sqlite3.connect('test.db')
db_connection.execute('''
    create table if not exists indeed (
        link text,
        job_title text,
        company text,
        location text,
        description text
    )
''')

db_cursor = db_connection.cursor()

base_url = 'https://www.indeed.com'

c = webdriver.ChromeOptions()
c.add_argument("--incognito")
# Starts the driver and goes to our starting webpage
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=c
)
driver.get(f'{base_url}/jobs?q=software+engineer&fromage=1')

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
        name = soup2.find(
            'h1', class_='icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title').text.strip()
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
        description = soup2.find(
            'div', class_='jobsearch-jobDescriptionText').text.strip()
        driver.close()
        driver.switch_to.window(driver.window_handles[0])

        data = (post_url, name, company, location, description)

        db_cursor.execute('insert into indeed values(?, ?, ?, ?, ?)', data)
        db_connection.commit()

    try:
        driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
        button = soup1.find('a', attrs={'aria-label': 'Next Page'}).get('href')
        driver.get('https://indeed.com'+button)
    except:
        break

driver.quit()
