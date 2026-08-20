const mongoose = require('mongoose');

const MONGO_URI = process?.env?.MONGO_URI
if (!MONGO_URI) {
    throw ("Unable to start server. Mongo URI needed")
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected!'));



