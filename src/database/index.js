const mongoose = require('mongoose');

const uri = 'mongodb+srv://alissonmanfron:mf020911@cluster0-dt4kr.gcp.mongodb.net/noderest?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

module.exports = mongoose;