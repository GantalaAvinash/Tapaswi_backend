const Housecontact = require('../Models/HouseContact')

// create a new contact form 
exports.createHouseContact = (req, res) => {
    const { email, message, name, phone} = req.body;
    const userorder = new Housecontact({
        email: email,
        name: name,
        message: message,
        phone: phone,   
    });
    if(!email || !message || !name){
        res.status(200).json({ message: "Please enter all details "});
    }
    else{userorder.save().then(response => {
            res.status(200).json({ message: "Data saved Successfully" })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })}
}

// get all contact forms
exports.getHouseContact = (req, res) => {
    Housecontact.find().then(
        response => {
            res.status(200).json({ message: "Sucessfull fetched Houses!", house: response });
        }
    ).catch(
        err => {
            res.status(500).json({ message: "Error", error: err });
        }
    );
}

// get contact form by id
exports.getHouseContactById = async (req, res, next) => {
    try {
        const { house_id } = req.params;

        const houseList = await Housecontact.findOne({
            house_id: house_id,
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
}

// delete contact form by id
exports.deleteHouseContactById = async (req, res, next) => {
    try {
        const { house_id } = req.params;

        const houseList = await Housecontact.deleteOne({
            house_id: house_id,
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
}