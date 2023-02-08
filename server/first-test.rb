require "selenium-webdriver"
require "test/unit"

class SeleniumRubyTest < Test::Unit::TestCase
@@driver

def setup
# create Driver object for Chrome
@@driver = Selenium::WebDriver.for :chrome
# Navigate to URL
@@driver.navigate.to "https://www.bstackdemo.com/"
end

def test_login
@@driver.manage.timeouts.implicit_wait = 10 # seconds
# Find the element using driver object
element = @@driver.find_element(:xpath => "//*[@class='checkmark' and contains(text(),'Apple')]")
wait = Selenium::WebDriver::Wait.new(timeout: 30)
# Wait until the element is displayed
wait.until { element.displayed? }
@@driver.find_element(:xpath => "//*[@class='checkmark' and contains(text(),'Apple')]").click
# Wait for the condition
wait.until { @@driver.find_element(:css, ".products-found span").text == "9 Product(s) found." }
actualValue = @@driver.find_element(:css, ".products-found span").text
# Assert the expected text with actual text
assert_equal(actualValue, "9 Product(s) found.")
end

def teardown
# Quit the driver
@@driver.quit
end

end