const express = require("express");
const router = express.Router();
const Contact = require("../models/contacts");

// GET contact
// localhost:5000/api/contact
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.find({});
    if (!contact)
      return res
        .status(400)
        .json({ success: false, message: "Not found contact" });
    res.status(200).json({ success: true, message: 'Find Contact completed !', contact })
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: 'Fallure contact !' })
  }
});

module.exports = router;