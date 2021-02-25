const express = require ('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// to connect mongodb on MAC, run 'mongod --config /usr/local/etc/mongod.conf --fork'
mongoose.connect('mongodb://localhost/mevn-database')
    .then(db =>console.log('Database connected'))
    .catch(err => console.log(err));

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/tasks'))

// Static files
app.use(express.static(__dirname + '/public'))

// Server is listening
app.listen(app.get('port'), () =>{
    console.log('Server listening on port', app.get('port'));
})