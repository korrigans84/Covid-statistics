# Covid 19 Statistics | By DevAtom

## Introduction
This website resume all data about covid 19 around the world.  
It also provide for confirmed users to post an article about one country  
This website wad created for a student project of EURECOM.  

## What technology is used?

I use React as a client framework, and use different services from firebase to authenticate te users, store data and get data. 
I setup a CI using github workflow, to build and deploy the code for every merge to main branch. \\
For the future, I'll create a test step, to confirm the merge request from a release only if the tests are passed.

## About the API 
For the data, I use this [API](https://documenter.getpostman.com/view/10808728/SzS8rjbc#00030720-fae3-4c72-8aea-ad01ba17adf8), which provide many global data, and by countries.


## How to run the project
You must have npm and nodejs installed on your device. 
```
git clone  https://github.com/korrigans84/Covid-statistics.git
cd Covid-statistics    
npm i 
cp .env.example .env && nano .env 
 ```
here, you must define your own variables, which are nessesary to lauch the app. Then, run

```
npm start
```
