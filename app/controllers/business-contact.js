let express = require('express');

//connect to our Business Contact Model
let Contact = require('../model/business-contact');


function displayName(req) {
    return req.user ? req.user.displayName : ''
}

//showing Business Contact
module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactResponse) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('business-contact/list', {
                title: 'Business Contact',
                ContactList: contactResponse,
                displayName: displayName(req)
            });
        }
    });
}

//showing add page
module.exports.displayAddPage = (req, res, next) => {
    res.render('business-contact/add', {
        title: 'Add Contact',
        displayName: displayName(req)
    });
}

//processing the add page using module exports
module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "name": req.body.name, "phone": req.body.phone, "email": req.body.email
    });

    Contact.create(newContact, (err, Contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh and go to Business Contact
            res.redirect('/business-contact');
        }
    });
}

//showing edit page using module exports
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Contact.findById(id, (err, editContact) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh and go to Business Contact
            res.render('business-contact/edit', {
                title: 'Update Contact',
                contactList: editContact,
                displayName: displayName(req)

            });
        }
    })
}

//processing the edit page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let editedContact = Contact({
        "_id": id, "name": req.body.name, "phone": req.body.phone, "email": req.body.email
    });

    Contact.updateOne({_id: id}, editedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh and go to Business Contact
            res.redirect('/business-contact');
        }
    });
}

//performing the deletion of business contact
module.exports.performDeleteContact = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh and go to Business Contact
            res.redirect('/business-contact');
        }
    });
}