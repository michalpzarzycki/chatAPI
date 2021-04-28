const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.listen(PORT, () => {
    console.log("PORT", PORT)
})