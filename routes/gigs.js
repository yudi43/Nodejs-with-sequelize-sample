const express = require('express')
const router = express.Router();
const db = require('../config/database')
const gig = require('../models/gig');
const sequelize = require('sequelize')
const Op = sequelize.Op;


//get gigs list
router.get('/', (req, res) => 
gig.findAll()
.then((gigs) => {
    res.render('gigs', {gigs: gigs.map(gig => gig.toJSON())});
})
.catch((err) => console.log(err)
)
);

//display add gig form
router.get('/add', (req, res) => {
    res.render('add');
});

//add a gig
router.post('/add', (req, res) => {

    let {title, technologies, budget, description, contact_email} = req.body; //this data will be coming from the request...
    let errors = [];
    
    //validation...
    if(!title){
        errors.push({text: "Please add a title"});
    }
    if(!technologies){
        errors.push({text: "Please add some technologies"});
    }
    if(!description){
        errors.push({text: "Please add a description"});
    }
    if(!contact_email){
        errors.push({text: "Please add a contact email"});
    }

    //check for errors
    if(errors.length > 0) {
        //means there was an error.
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        });
    }else{
        if(!budget) {
            budget = "Unknown";
        }else {
            budget = "$" + budget;
        }

        // Make lowercase and remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        // Insert into table
        gig.create({
            title: title,
            technologies: technologies,
            budget: budget, 
            description: description,
            contact_email: contact_email
        }).then((gig) => {
            console.log("this was added::::" + gig);
            res.redirect('/jobs')
        })
        .catch(err => console.log(err));
    }
})

//search jobs
router.get('/search', (req, res) => {
    const {term} = req.query;
    
    //convert to lowercase
    term = term.toLowerCase();

    gig.findAll({where: {technologies: {[Op.like]: '%' + term + '%'}}})
    .then((gigs) => res.render('gigs', {gigs: gigs.map((gig) => gig.toJSON())}))
    .catch(err => console.log(err));
})


module.exports = router;