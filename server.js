import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Listenig on port: ${port}`)
})

mongoose.connect(process.env.DATABASE_URL)

app.get('/', (req, res) => {
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

const commentsSchema = new mongoose.Schema({
    comment: String
})

const Climb = mongoose.model('Climb', climbsSchema)
const Comments = mongoose.model('comment', commentsSchema )


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

// app.post('/climb/:id/comments', async function(req, res) {       
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
