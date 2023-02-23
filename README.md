# Get Hired
**Get Hired** is a job applications, interviews, and connections tracking system. Not only that, but also a job board. Inspired by Katherine's job-hunting experience which she thought could be optimized in many ways.

## Job Posting Feed
- Postings are scraped from Linkedin and Indeed. The Python scraping script automatically runs everyday in the morning, and only get the newest postings that are posted the last 24 hours. 
- While scraping, it also checks if one of these skills is mentioned: React, JavaScript, Ruby, and Python. If it is, then Get Hired will show the skill(s) mentioned on each posting info. If none of the skills is mentioned, then the Python script will not send a POST request to create the positng in the PostgreSQL database.

![searchbyCompany](https://user-images.githubusercontent.com/115205162/221044223-158e3dbc-6bd7-425e-b8e4-51765388e92d.gif)

You can search postings by company name.

![skillssearchbar](https://user-images.githubusercontent.com/115205162/221043948-4f3f08f9-21ba-482b-880f-c54d6c88a0af.gif)

or by the skills they require

- If you click the job title, it will open a new window and take you to the actual job posting page.
- If you are logged out, this is the only feature you have.

![markasApplied2](https://user-images.githubusercontent.com/115205162/221043713-d709f0a5-f915-44c5-920b-c611058eef4f.gif)

- After logging in, there are two buttons on each posting, one is to save it, the other is not mark the posting as applied.Clicking on either of them, the posting will disappear from your job posting feed, and instead, it will show up in **My Jobs** page.

## My Jobs Page
Your saved jobs and your applied jobs show up here.

### Saved Jobs

![savedJobs2](https://user-images.githubusercontent.com/115205162/221043448-98944a52-8095-4588-8f37-ace5cde518e1.gif)

- For each saved job, you can **Add Referral**, and you can choose a connection from a dropdown list of all your connections.
- If you applied for the saved job, you can **Mark as Applied** and a window will pop up and ask the date that you applied the job on. After you click on the submit button, it will show up in Applied job list instead of the Saved job list.

### Applied Jobs

![appliedjob2](https://user-images.githubusercontent.com/115205162/221042801-41ff3286-0574-4bc7-9074-2e4220b8bf7f.gif)

- If the applied job had a connection, the name of the connection will be on each job, and you can **Mark as Referred**, then "Referred by: connection name" will show up on the job instead of showing "Status: Not yet referred".
- You can click on **Invited to Interview** to update the application status of the job to the interviewing status. A new popup window will let you choose a date and time of the interview, and whether it's virtual or in-person interview. If it is in-person, you can also type in the address. After submitting the form, a new interview will appear in the **Interviews** page.

## My Network

![connections2](https://user-images.githubusercontent.com/115205162/221042518-6fffd5d5-bc98-4816-afff-96266c00fb6c.gif)

- All your connections are on this page, including their contact infos, companies, positions, referrals and potential referrals.
- A popup window shows up when you click on **Add** button. You can add a connection with his or her Linkedin profile link or you can add the info manually.
- If you choose to add with Linkedin profile link, after submitting the form, a message "getting the info..." will show up and the connection will appear in the connections page a few seconds later. This part is done with Ruby and Selenium.
- You can also filter you connections to show only the recruiters by clicking the **Recruiter** button on top of the page.

## Interviews
Incoming and completed interviews are on this page.

![interviews1](https://user-images.githubusercontent.com/115205162/221042117-cd2756e4-3f72-4e84-a21f-4783b984934b.gif)

### Incoming
- Besides the interview infos, there is a **Completed** button on each Incoming interview. Click on the button, and the interview will be in the **Completed** interview list instead.

### Completed
- The **Update** button enables us to update two statuses: follow-up email and invitation to the next round. If the email is sent, then you will only see the checkbox for invitation to the next round.
- If invited to the next round checkbox is checked, another form will ask you to fill up the date and time of the new interview. After submitting the form, the new interview will be in the Incoming list.

## Calendar

![calendar](https://user-images.githubusercontent.com/115205162/221041749-eb60ef7b-6a79-4860-b4b6-16f557bec157.gif)

You can see all the interviews in either monthly view or weekly view.

## Dashboard

![dahsboard2](https://user-images.githubusercontent.com/115205162/221040550-e533d32d-3b5b-43d1-b4a2-122bf7f0816c.gif)

Three graphs that help us keep track on our productivity: 1. Total jobs applied in last 7 days. 2. Total jobs applied in last 4 weeks. 3. Total interviews in last 4 weeks. We can also see our new connections that were added in last 7 dyas and in last month.The graphs are done using Chart.js.

## Report

![report2](https://user-images.githubusercontent.com/115205162/221041121-8141338b-a6bf-4342-9fe2-b24646126f3f.gif)

- Partnered with a data analyst - Tungting Wang (Nelson) for this analysis. He wrote the script in Python utilized NLP method to get the top 30 skills that are mentioned in the 1500+ job postings that Katherine scraped from Linkedin. The web scraping is done in Python with Selenium and BeautifulSoup.
- Two share buttons at the bottom enable you to share the report to Linkedin and email it to your friend.

## Dark Mode

![darkmode2](https://user-images.githubusercontent.com/115205162/221041454-ae180d77-0d27-45b3-ba95-a7eda8237722.gif)

<p>Isn't it cool?</p><br/>

