const express = require('express')
const router = express.Router();
const db = require('../config/database')
const gig = require('../models/gig');


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
    const data = {
        title: 'Simplr wp website',
        technologies: 'website, js, html, css',
        bugdet: '$2500',
        description: 'This is some dummy text for the description of our gig and this does not make any sense, forget about it',
        contact_email: 'singh.yudi10@gmail.com',
    }

    let {title, technologies, bugdet, description, contact_email} = req.body; //this data will be coming from the request...
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
            bugdet,
            description,
            contact_email
        });
    }else{

        if(!budget) {
            budget = "Unknown";
        }else {
            budget = "$" + budget;
        }

        technologies = technologies.toLowerCase().replace(/, /g, ',');
        
        // Insert into table
        gig.create({
            title: title,
            technologies: technologies,
            bugdet: bugdet, 
            description: description,
            contact_email: contact_email
        }).then((gig) => {
            console.log("this was added::::" + gig);
            res.redirect('/gigs')
        })
        .catch(err => console.log(err));
    }

})


module.exports = router;