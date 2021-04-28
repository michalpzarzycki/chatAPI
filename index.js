const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');

const authRoutes = require('./routes/auth')


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const PORT = process.env.PORT || 8000;
const app = express();
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected")
}).catch(err => { console.log("ERROR", err)});
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/api', authRoutes)

app.listen(PORT, () => {
    console.log("PORT", PORT)
})