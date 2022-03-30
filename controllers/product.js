const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isAuth = require("./isAuth");
const User = require("../models/account");
const Store = require("../models/store");
const Catagory = require("../models/catogory");
const Product = require("../models/product");
// addCategory
router.post('/addCategory' , isAuth , async (request, response)=>{
    const userID = request.account._id;
    const store = await Store.findOne({ associatedID: userID });
   const catagoryID = mongoose.Types.ObjectId();
    const {
        catagoryName,
        priority,
        discount,
    } = request.body;

    const _catagory = new Catagory({
        _id : catagoryID,
        priority:priority,
        storeID : store._id,
        catagoryName:catagoryName,
        discount: discount,
        
    })
    _catagory.save()
    .then(newProduct=>{
        return response.status(200).json({
            message: newProduct
        })
    })
    .catch((err) => {
        return response.status(200).json({
            message: err
        })
    })
});

router.put('/updateCategory' , isAuth , async (request, response)=>{

    const userID = request.account._id 

});

router.delete('/deleteCategory' , isAuth , async (request, response)=>{

});

//

router.post('/addProduct' , isAuth , async (request, response)=>{

});

router.put('/updateProduct' , isAuth , async (request, response)=>{

});

router.delete('/deleteProduct' , isAuth , async (request, response)=>{

});


router.get('/getAllCategory', isAuth , async (request, response)=>{

});
router.get('/getAllProduct', isAuth , async (request, response)=>{

});
module.exports = router;