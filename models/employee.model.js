const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: 'field ini belum terisi.'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    } 
});

// custom validasi 
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'email salah !'); 

mongoose.model('Employee', employeeSchema);