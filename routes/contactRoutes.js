const express= require("express");
const router= express.Router();
const { getContacts,createContact,getcontact,updateContact,deleteContact}= require("../controllers/contactcontroller");
const validateToken = require("../middleware/validatetokenhandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getcontact).put(updateContact).delete(deleteContact);

module.exports = router;
