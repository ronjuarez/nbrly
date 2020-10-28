# nbrly LHL Final Project
---

Nbrly is a single page app where users can post and answer requests for groceries to be picked up for neighbours with vulnerabiliies to COVID-19. It uses [nbrly-api](https://github.com/ronjuarez/nbrly-api) as its backend. 

## Front-End Tech Stack
* ReactJS
* React Router
* Styled-Components
* Material UI
* Axios

## Back-End Tech Stack
* Ruby on Rails
* PostgresQL

---

# To run nbrly locally:
1) Clone the [nbrly-api](https://github.com/ronjuarez/nbrly-api) back-end repo.
2) Clone the [nbrly](https://github.com/ronjuarez/nbrly) front-end repo.
3) Install api dependencies by running `bundle install`.
4) Create and seed the API DB with `rails db:migrate` followed by `rails db:reset`.
5) Run the API server using `rails s`.
6) Install front-end dependencies using `npm i`.
7) Run app server using `npm start`

The app's backend will run http//localhost:3000/, and it's frontend will run on http://localhost:8000.

---

# Here is a demonstration of nbrly's key features:
## On LOAD you will see a map with pins that represent different requests in your city. By clicking on each pin you will be able to see the request address, request items, and a button to accept requests.
![First Screen](https://github.com/ronjuarez/nbrly/blob/master/app-gifs/mapofrequests.gif)

## You can also accept requests from the the Request List pane in the Requests tab. Swipe away the items you've picked up and mark the delivery as completed. Once the task is completed it's assigned points will show up for the user on the leaderboard.
![Second Screen](https://github.com/ronjuarez/nbrly/blob/master/app-gifs/answeringrequestsupdatingpoints.gif)

## The leaderboard can also be filtered by points! To place a request, open the Request Form pane in the Requests tab and fill the form. Once completed you'll be brought back to the map where you will see your Request on the map!
![Final Screen](https://github.com/ronjuarez/nbrly/blob/master/app-gifs/filteringbydeliveriesmakingrequests.gif)
