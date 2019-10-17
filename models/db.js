const mongoose = require('mongoose');
    
mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true }, (err) => {
    if(!err) {
        console.log('mongoDB koneksi sukses.')
    } else {
        console.log('Error di database Koneksi : ' + err)
    }
});

require('./employee.model');

