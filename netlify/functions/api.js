import 'dotenv/config'
import express, { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import serverless from 'serverless-http'

const api = express()

api.use(cors())
api.use(bodyParser.json())

const router = Router()


mongoose.connect(process.env.DATABASE_URL)

router.get('/', (req, res) => {
    res.json({message: "Server running"})
})

const climbsSchema = new mongoose.Schema({
    image: String,
    name: String,
    about: String,
    location: String,
    elevation: String, 
    category: String,
    done: Boolean,
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }]   
})

const userSchema = new mongoose.Schema({
    userEmail: {
      type: String,
      required: true        
    },
    lastLogin: {
      type: Date,
      required: true
    }     
})

const commentsSchema = new mongoose.Schema({
    comment: String
})

const Climb = mongoose.model('Climb', climbsSchema)
const Comments = mongoose.model('comment', commentsSchema )
const User = mongoose.model('User', userSchema)



router.post('/climb/new',(req, res) => {
    const climb = req.body

    const myClimb = new Climb(climb)
    myClimb.save()
    .then(() => {
        console.log("Climb saved")
        res.sendStatus(200)
    })
})

router.get('/climb', async (req, res) => {
    const allClimbs = await Climb.find()
    res.json(allClimbs)    
})

router.get('/climb/:id', async(req, res) => {
    const climb = await Climb.findById(req.params.id)
    res.json(climb)
})

router.delete('/climb/:id', (req, res) => {
    Climb.deleteOne({"_id": req.params.id})
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.put('/climb/:id', async(req,res) => {
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

// router.post('/climb/:id/comments', async function(req, res) {       
//     const comment = new Comment({
//         comment: req.body.comment        
//     })
//     const climbId = await Climb.findById(climbId)      
//     climb.comments.push(comment)
//     const climbwithcomment = await climb.save()
    
//     .then(() => {
//         res.sendStatus(200)
//     })
//     .catch( err => {
//         console.error(err)
//         res.sendStatus(500)
//     })
// })

router.post('/user/login', async (req, res) => {
    const now = new Date()
  
    if( await User.countDocuments({"userEmail": req.body.userEmail}) === 0) {
      const newUser = new User ({
        userEmail: req.body.userEmail,
        lastLogin: now
      })
      newUser.save()
      .then(() => {
        res.sendStatus(200)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
    } else {
      await User.findOneAndUpdate({"userEmail": req.body.userEmail}, {lastLogin: now})
      res.sendStatus(200)
    }
  })
  api.use("/api", router)

  export const handler = serverless(api)

