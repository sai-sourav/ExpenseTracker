const User = require('../model/usermodel');

exports.getexpenses = async (req, res, next) => {
    try {
        const response = await User.findAll();
        res.json(response);
    } catch(err) {
        if (err) {
            console.log("error in getting products:",err);
            res.status(500).json({error : err});
        }
    }
}

exports.postexpense = async (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.desc;
    const category = req.body.category;
    try{
    const response = await User.create({
                        amount: amount,
                        description : description,
                        category : category
                    });
        res.status(201).json({created : response});
    } catch(err){
        if (err) {
            console.log("error creating expense: ",err);
            res.staus(500).json({error: err});
        }
    }
}

exports.editexpense = async (req, res, next) => {
    const id = req.params.userid;
    const updatedamount = req.body.amount;
    const updateddescription = req.body.desc;
    const updatedcategory = req.body.category;
    try{
        const user = await User.findByPk(id);
        user.amount = updatedamount;
        user.description = updateddescription;
        user.category = updatedcategory;
        const response = await user.save();
        res.status(201).json({created : response});
    } catch(err){
        if (err) {
            console.log("error updating expense: ",err);
            res.staus(500).json({error: err});
        }
    }

}

exports.deleteexpense = async (req, res, next) => {
    const id = req.params.userid;
    try{
        const user = await User.findByPk(id);
        const response = await user.destroy();
        res.status(200).json({deleted : response});
    } catch(err){
        if (err) {
            console.log("error deleting expense: ",err);
            res.staus(500).json({error: err});
        }
    }

}