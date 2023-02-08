require 'selenium-webdriver'

options = Selenium::WebDriver::Chrome::Options.new
options.add_argument('--headless')

driver = Selenium::WebDriver.for :chrome, options:options
driver.get('https://www.linkedin.com/')



email = driver.find_element(:xpath, '//*[@id="session_key"]')
email.send_keys('candy84522@yahoo.com.tw')

password = driver.find_element(:xpath, '//*[@id="session_password"]')
password.send_keys('@thisiscool')

sleep 1
signinBtn = driver.find_element(:xpath, '//*[@id="main-content"]/section[1]/div/div/form/button')
signinBtn.click

driver.get("https://www.linkedin.com/in/rafiakhandaker/")

sleep 3
name = driver.find_element(:xpath, '//*[@id="ember29"]/div[2]/div[2]/div[1]/div[1]/h1').text

p name

company = driver.find_element(:xpath, '//*[@id="ember29"]/div[2]/div[2]/ul/li/button/span/div').text

p company

sleep 10

driver.quit