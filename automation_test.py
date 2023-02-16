from email import encoders
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
import ssl
import smtplib
import os


# Input the email account that will send the email and who will receiving it
sender = os.environ.get('EMAIL')
receiver = os.environ.get('EMAIL')
password = os.environ.get('PASSWORD')

# Creates the Message, Subject line, From and To
msg = MIMEMultipart()
msg['Subject'] = 'New Jobs Today on HIRED'
msg['From'] = sender
msg['To'] = ','.join('katherine84522@gmail.com')
s = smtplib.SMTP_SSL(host='smtp.gmail.com', port=465)
s.login(user=sender, password=password)
s.sendmail(sender, receiver, msg.as_string())
# s.quit()
