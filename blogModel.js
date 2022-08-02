const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    content: String
})

module.exports =  new mongoose.model('blog',blogSchema)