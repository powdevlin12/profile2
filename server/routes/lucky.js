const express = require("express");
const router = express.Router();
const Gift = require("../models/gifts");
const User = require("../models/users");
const ListSpin = require("../models/listSnips");
const LuckyController = require("../controller/lucky");
// Create gift
// POST localhost:5000/api/gifts/
router.post("/", async (req, res) => {
  const { name, description, percentWin } = req.body;
  try {
    const newGift = new Gift({ name, description, percentWin });
    await newGift.save();
    res.status(200).json({ success: true, message: "add thanh cong", newGift });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Fallure add gift !" });
  }
});

// Create user snip
// POST localhost:5000/api/gifts/users/
router.post("/users", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const user = await User.findOne({ phone: phone });
    if (!user) {
      var newUser = new User({ name, email, phone });
      await newUser.save();
    }
    const percent = LuckyController.randomGift();
    console.log(percent);
    const gifts = await Gift.find({});
    let gift = LuckyController.handleFindGift(gifts, percent)[0];
    console.log(gift);
    let userID = phone;
    let giftID = gift._id;

    const newListSpin = new ListSpin({ user: userID, gift: giftID });
    await newListSpin.save();
    return res.status(200).json({ success: true, user, gift });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "False when spin" });
  }
});

//get all gift of user
//GET localhost:5000/api/gifts/:phone
router.get("/:phone", async (req, res) => {
  const { phone } = req.params;
  try {
    const list = await ListSpin.find({ user: phone }).populate("gift");
    const user = await User.findOne({ phone: phone });
    console.log(user);
    return res
      .status(200)
      .json({
        success: true,
        message: "Lay danh sach trung thuong thanh cong",
        list,
        user,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: true, message: "GET HISTORY FALUARE" });
  }
});

// GET COUNT Human spin
//GET localhost:5000/api/gifts/:phone/count
router.get("/:phone/count",async(req,res)=>{
  const {phone} = req.params;
  const date = new Date();
  const day = date.getDate()
  const start = new Date(Date.UTC(2022,date.getMonth(),day,0,0,0))
  const end = new Date(Date.UTC(2022,date.getMonth(),day,23,59,59))
  const listSpin = await ListSpin.find({createAt: {$gte: start, $lte: end},user:phone})
  const count = listSpin.length;
  if(count<=4)
  {
    return res.status(200).json({success:true});
  }
  return res.status(200).json({success:false});
})

module.exports = router;
