const asyncHandler = require("express-async-handler");

const Contact= require("../models/contactmodel");

//@desc get all contacts
//@route GET /api/contact
//@acess private
const getContacts = asyncHandler(async(req,res) => {
    const contacts= await contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});


//@desc create new contact
//@route POST /api/contact
//@acess private
const createContact = asyncHandler(async(req,res) => {
    console.log("The request body is :",req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error ("All fields are mandatory!")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc create new contact
//@route GET /api/contact
//@acess private
const getcontact = asyncHandler(async(req,res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//@desc update  contact
//@route PUT /api/contact
//@acess private
const updateContact = asyncHandler(async(req,res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("user does not have permission to update other user's contact");
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    
    res.status(200).json(updatedContact);
});

//@desc delete contact
//@route delete /api/contact
//@acess private
const deleteContact = asyncHandler(async(req,res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("user does not have permission to update other user's contact");
    }
    await contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = { getContacts,createContact,getcontact,updateContact,deleteContact};