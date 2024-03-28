# Project 2: Node/Express/MongoDB Full-stack CRUD Application


## Description

My second project was to create a Full Stack Web Application with full (CRUD) Create, Read, Update and Delete functionality using MongoDB, Node, Vue and Express. This was my first full stack app and was a big learning curve. I chose a subject close to my heart and built an app to display my favourite cycling climbs in Europe. Each climb has a photograph, location, elevation, category and description. Users can login in and view, add, comment and delete climbs.

## Deployment link

My project was deployed to GitHub and can be found by clicking the links below:

Front End Netlify Link:
pqsclassicclimbs.netlify.app/



## Timeframe

This was a solo project following the content we had been taught over the second module. We were given one week to complete, from planning to submission.

We received the brief on a Friday afternoon and were expected to begin coding on Monday. This meant a weekend spent reading and understanding the brief, prior to deciding on an idea, planning, and being ready to start first thing Monday morning. Once I had come up with an idea, I drew up a rough plan in Excalidraw, and made an ERD of the basic Schema. I also set up the repos as we would be working with a Back End and a Front End. My goals were to get most of the Back End coded and have Postman and Mongo DB working on Monday, then to start the Front End on Tuesday and into Wednesday. I wanted to have full functionality by midday on Thursday leaving me some time to style, proof and deploy before 14:00 on Friday.
## Technologies Used

The main aim of this project was to utilise the skills that we had learned in Node, Express, Vue, MongoDB and Postman. We would of course be using JavaScript, HTML and CSS as well. I also used Excalidraw, dbdiagram.io and Adobe Photoshop to make my plan, ERD and polish my images respectively. 

## Brief

### Technical Requirements

Have at least 2 data entities (data resources) in addition to the `User` Model** - one entity that represents the main functional idea for your app and another with a One : Many or Many : Many relationship with that main entity (embedded or referenced).

Use OAuth authentication.

Implement basic authorization that restricts access to features that need a logged in user in order to work (typically CUD data operations) by "protecting" those routes from anonymous users using the ensure Logged In middleware from the OAuth lesson.  In addition, ensure that editing and deletion of a data resource can only be done by the user that created that data (this is done in the controller - refer to the Guide to User-Centric CRUD).

 Have full-CRUD data operations somewhere within the app's features. For example, you can have functionality that Creates & Updates a post and satisfy Delete functionality by implementing the ability to delete comments.

 Be styled such that the app looks and feels similar to apps we use on a daily basis - in other words, it should have a consistent and polished user interface.

 Be deployed online (Netlify).

### Necessary Deliverables

A working full-stack app that meets or exceeds the above technical requirements, built by you, and hosted on Netlify.
Daily commits (the more the better) dating back to the very beginning of the project. Commit messages should be in the present tense, e.g., "Style landing page" instead of "Styled landing page". Do not "start over" with a new repo.

























## Planning

Once I had come up with an idea that I was happy with, and one that I thought would work well, I could begin planning, firstly the functionality and secondly, the look and feel of what I wanted the final user version to look like. 
There were limitless options to choose from, but in the end, I chose to make an app that would do something that involves a personal passion and pastime of mine. I am a self-confessed cycling geek, with an avid interest in all things bike and cycling related, so I set about to create an app that would list some of Europe’s “Classic Climbs”. 
Admittedly the plan did undergo some evolution as I got further into the project and the very first plan put down was somewhat different to the finished article.

My whole plan, and subsequent revision are available below:

![Initial Plan](https://github.com/patrickq2023/Project-2-Backend/assets/151511696/081bd954-3d39-4ff1-a52e-9b18b32b9420)



![Final Plan ](https://github.com/patrickq2023/Project-2-Backend/assets/151511696/484f59c1-0ff6-4f73-88ca-a94e98c766f0)





## Build/Code Process

## STEP BY STEP THROUGH THE PROCESS

Once I had decided exactly what I wanted to do I needed to create an ERD diagram illustrating the basic Schema.
Before I could start coding, I need to set up two repos, one for the Back End and one for Front End
Having done this, I needed to install all the dependencies for each one. 
The next stage was to get an operational Back End that implemented the Schemas and get all of the end points into my server.js file.
Part of this was setting up the localhost 3000 port and making sure this was connected to the database.
With all the endpoints in place, I had to make sure that they were all working with Postman and MongoDB.
Once satisfied that my Back End was working correctly, I could make a start on the Front End.
The Front End was a lot more labour intensive as I had to set up the Components, Router and all of the Views files in Vue.
After these were all set up, I needed to check that they were displaying correctly on the Front End.
When I finally had all of the CRUD functionality, I needed to set up the Google OAuth so that users could login and logout.
With this in place I needed to add another Schema to my server.js on the Front End
Now that Google OAuth was in place, I needed to then restrict the ability to perform any of the CRUD actions unless logged in.
The final stage prior to deployment was to spend some time making things look better.
I quite liked the look of the default Vue styling, (they clearly have a much better design team at their disposal). I tweaked some of the font sizes and colours, added an image to the home page and made a few other cosmetic changes.
Deployment to Netlifly was the final step.





The code snippet below is from my server.js file on my backend and it basically encapsulates all of the CRUD functionality of my backend.

POST: Creates a new climbing route by saving the provided data to the database.
GET: Retrieves climbing routes from the database. The first endpoint retrieves all routes, while the second one retrieves a specific route based on its ID.
PUT: Updates a climbing route in the database based on its ID with the provided data.
DELETE: Deletes a climbing route from the database based on its ID.


```javascript


app.post('/climb/new',(req, res) => {
   const climb = req.body


   const myClimb = new Climb(climb)
   myClimb.save()
   .then(() => {
       console.log("Climb saved")
       res.sendStatus(200)
   })
})


app.get('/climb', async (req, res) => {
   const allClimbs = await Climb.find()
   res.json(allClimbs)   
})


app.get('/climb/:id', async(req, res) => {
   const climb = await Climb.findById(req.params.id)
   res.json(climb)
})


app.delete('/climb/:id', (req, res) => {
   Climb.deleteOne({"_id": req.params.id})
   .then(() => {
       res.sendStatus(200)
   })
   .catch(err => {
       res.sendStatus(500)
   })
})


app.put('/climb/:id', async(req,res) => {
   Climb.updateOne({"_id": req.params.id}, {name: req.body.name, about: req.body.about,
       location: req.body.location, elevation: req.body.elevation, category: req.body.category,
       image:req.body.image})
       .then(() => {
           res.sendStatus(200)
       })
       .catch( err => {
           console.error(err)
           res.sendStatus(500)
       })
})

```


 This function effectively adds a new climbing route by sending a POST request to the API with the route data and handles the response accordingly. It also performs basic input validation to ensure all required fields are filled before making the request.

```javascript


function addClimb() {
   if (climb.value.image === '' || climb.value.name === ''|| climb.value.about === ''||
   climb.value.location === ''|| climb.value.elevation === ''||climb.value.category === '' ) {
       alert('All values are required')
       return
   }
   fetch(`${import.meta.env.VITE_API_URL}/climb/new`, {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(climb.value)
   })
   .then(res => {
       fetchData()
       climb.value ={
       image: '',
       name: '',
       about: '',
       location: '',
       elevation: '',
       category: '',
       done: false 
       }
       console.log(res)
   })
   .catch( err => console.error(err))
}

```


## Challenges

This whole project was a daunting challenge, a full stack app. from the ground up with all of the required elements and functionality, is a lot to do!! Setting up the Back End correctly and implementing the Schema so that it behaved correctly and interacted with Postman and Mongo DB was at times tricky for me to get right. One of the other big challenges was ensuring that all the paths were correct and that everything matched up. Another big challenge, (and an ongoing one) is to try and unpick the error messages and try to fix them. 


## Wins

Making a working full stack CRUD app is a serious undertaking. For me the biggest win was getting all of the CRUD functions to work correctly. It was very rewarding to see the final end product especially when remembering the first view of the Front End with no styling, all the way to the final user view, fully styled and with images!

## Key Learnings/Takeaways 

I learned a lot over the course of this project. I guess the biggest takeaway is to break a big task down into small bite size chunks and work methodically through them. 


Realising that a plan can change halfway through and adapting to the new plan.
That walking away from a problem and focussing on another aspect of the project can help you see the original problem with more clarity. 
I think making sure that all the paths are identical to each other is one of the biggest learnings for troubleshooting.
I learned an excellent tip for inspecting CSS in the Chrome Console.
Netlify is very tricky to deploy for this type of project!


## Bugs

There are no bugs that I have come across in the final version, however I encountered many bugs along the way!! This was one of the most challenging parts of this project reading all the console error messages and trying to resolve them all.


## Future Improvements

I do believe that there are a few improvements that I could make to the app. My primary goal was to satisfy the requirements of the brief, however if I had had more time, these are some improvements that I would like to implement:
I would like to amend the user privileges so that only I can delete climbs. 
I wanted to add a comments box to each individual climb.
I wanted to add a general suggestions box for people to suggest climbs that I can add.
I would like to add a field to the climbs giving the Strava link, this is a minor change.


Final view of what the site looked like on completion from left to right, HOME, CLIMB LIST, INDIVIDUAL CLIMB pages,





![Final Site View](https://github.com/patrickq2023/Project-2-Backend/assets/151511696/0224a8d2-38d9-49d0-9e99-ce9857fd34ac)





