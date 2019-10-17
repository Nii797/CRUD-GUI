const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const Employee   = mongoose.model('Employee');
 
// router =============================================================================================================

router.get('/', (req, res) => {
    res.render('employee/addOrEdit',{
        viewTitle: "Masukan Calon keanggotaan member ASIPA INDONESIA"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
        InsertRecord(req, res);
    else
        updateRecord(req, res);  
});

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.render("employee/list", {
                list: docs    
            });
        }
    }); 
    // res.json("Data Masuk"); ===============> sintaks sebelumnya
});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update",
                employee: doc
            });    
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('employee/list');
        } else {
            console.log('Error untuk menghapus data : ' + err);
        }
    });
});
// ==========================================================================================================================

// =========================================================== FUNGSI ======================================================= 

function InsertRecord(req, res) {
    var employee           = new Employee();
        employee.fullname  = req.body.fullname;
        employee.email     = req.body.email;
        employee.mobile    = req.body.mobile;
        employee.city      = req.body.city;
        employee.save((err, doc) => {
            if(!err)
                res.redirect('employee/list');
            else {
                if(err.name == 'ValidationError'){
                    handleValidationError(err, req.body);
                    res.render('employee/addOrEdit',{
                        viewTitle: "Masukan Calon keanggotaan member ASIPA INDONESIA",
                        employee: req.body
                    });
                }    
                else    
                    console.log('Terjadi kesalahan selama penampian : ' + err);
            }    
        });  
}

function handleValidationError(err, body){
    for(field in err.errors){
        switch (err.errors[field].path){
            case 'fullname':
                body['fullnameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;                             
        }
    }
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if(!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update',
                    employee: req.body
                })
            }
            else
                console.log('Error Update : ' + err);
        }
    });
}

// ================================================== memanggil router ====================================================

module.exports = router