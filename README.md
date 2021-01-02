# Mockup Quora

Hey curious mind,
This is an app in which I tried to make a replica of Quora to my best efforts using React, Redux, Node JS, Express Js, MongoDb, and little bit of AWS | [Visit Website](https://mockup-quora.herokuapp.com/)

![Mockup-Quora](https://raw.githubusercontent.com/SudhansuBandha/Mockup-Quora/main/frontend/public/images/Screenshot%20(12).png)


## Features :
- JSONwebtoken based login and registration system
- A respective user can ask questions, write answer to other questions asked by other users and edit as well as delete the questions and answers posted by them
- WYSIWYG rich text-editor is used for writing asnwers to the questions
- Users can view their own profile page as well as profile page of other users
- Users can view their 
    - recent activites, 
    - questions that they have asked,
    - answers  that they have replied,
    - their followers 
    - users who are following them
under separate sections in the profile page 
- Users can comment and like as well as dislike the answers of other users
- Users can follow and unfollow other users as per their preferences
- Search feature is implemented where an user can search for other users and questions asked in the website
- URL of profile images are stored in the MONGO DB database and their respective image files are stored in S3 Bucket in AWS server

## Frontend (React, Redux, Axios)
- User login and registration system is built using redux
- Built the Routes
- Built the Components rendered by each Route. For Home Component, every time the component is mounted, data is being fetched by Axios request to the backend .
- For posting questions, answers and comments, liking other answers and search features, Axios.post request is sent to perform the relevant tasks
- Proxy server is used for connecting frontend with the backend
- URL of profile images are being fetched from MONGO DB collection


## Backend (Node-Js, Express, MongoDb, AWS)
- All the necessary datas are stored in MONGO DB database using the cloud service of MONGO DB Atlas
- Token based user authentication is used based on jsonwebtokens
- Relevant express routings are performed for all backend related features
- AWS S3 bucket and MONGO DB configurations are made using environment variables

## Important Notes to the viewers (Future Updates):
- More AWS features to be included SNS etc.
- More sophisticated deployment using Docker Containers onto the cloud of AWS (as currently it is deployed in Heroku and it may perform slowly)


Thank you for visiting and have a prosperous day ahead...




