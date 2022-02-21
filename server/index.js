require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const accountRouter = require('./routes/account')
const contactRouter = require('./routes/contact')
const projectRouter = require('./routes/project')
const giftRouter = require('./routes/lucky')
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@profile.kfel2.mongodb.net/profile?retryWrites=true&w=majority`)
        console.log('MongoDB connected')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

connectDB()

app.use('/api/accounts', accountRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/projects', projectRouter);
app.use('/api/gifts', giftRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})