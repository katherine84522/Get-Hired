require 'selenium-webdriver'

options = Selenium::WebDriver::Chrome::Options.new


driver = Selenium::WebDriver.for :chrome, options:options
driver.get('https://www.linkedin.com/')


email = driver.find_element(:xpath, '//*[@id="session_key"]')
email.send_keys('candy84522@yahoo.com.tw')

password = driver.find_element(:xpath, '//*[@id="session_password"]')
password.send_keys('@thisiscool')

sleep 1
signinBtn = driver.find_element(:xpath, '//*[@id="main-content"]/section[1]/div/div/form/button')
signinBtn.click

driver.get("https://www.linkedin.com/in/rustyrazorblade/")

sleep 3
nameDiv = driver.find_element(:class_name, 'pv-text-details__left-panel')
name = nameDiv.find_element(:tag_name, 'h1').text
                                   
p name

jobsection = driver.find_elements(:css, 'section.artdeco-card.ember-view.relative.break-words.pb3.mt2')[3]


job_list = jobsection.find_element(:tag_name, 'ul')


jobTitles = job_list.find_element(:css, 'span.mr1.t-bold')


job_title = jobTitles.find_element(:css, 'span.visually-hidden').text

p job_title

company_name = job_list.find_element(:css, 'span.t-14.t-normal')


company = company_name.find_element(:css, 'span.visually-hidden').text

p company



driver.quit