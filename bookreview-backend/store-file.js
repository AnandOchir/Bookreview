const mongoose = require('mongoose');
const {GridFSBucket} = require('gridfs-stream');
const fs = require('fs');

//...

// Connect to Mongo
mongoose
  .connect('mongodb+srv://AnandOchir:123457@cluster0.mgbf9.mongodb.net/BooksCollection?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const storeFile = async (upload) => {

    console.log("I am here")
    const { filename, createReadStream, mimetype } = await upload.then(result => result);

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'files' });
    
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: mimetype
    });
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(uploadStream)
        .on('error', reject)
        .on('finish', () => {
            resolve(uploadStream.id)
        })
    })  
  }

  module.exports = { storeFile }