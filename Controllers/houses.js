
const house = require("../Models/house");

// create a new house
exports.createHouse = (req, res) => {
    const { type, name, description, image, imageLg, country, address, bedrooms, bathrooms, surface, year, price } = req.body;
    const house = new house({
        type: type,
        name: name,
        description: description,
        image: image,
        imageLg: [
            { url: imageLg[0] },
            { url: imageLg[1] },
            { url: imageLg[2] },
            { url: imageLg[3] }
        ],
        country: country,
        address: address,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        surface: surface,
        year: year,
        price: price,
    });
    if (!type || !name || !description || !image || !country || !address || !bedrooms || !bathrooms || !surface || !year || !price) {
        res.status(200).json({ message: "Please enter all details" });
    } else {
        house
            .save()
            .then(() => {
                res.status(200).json({ message: "Data saved successfully" });
            }) 
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
};

// get all houses
exports.getHouses = (req, res) => {
    house.find().then(
        response => {
            res.status(200).json({ message: "Sucessfull fetched Houses!", house: response });
        }
    ).catch(
        err => {
            res.status(500).json({ message: "Error", error: err });
        }
    );
}

// get house by id
exports.getHouseById = async (req, res, next) => {
    try {
        const { house_id } = req.params;

        const houseList = await house.findOne({
            house_id: house_id,
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        next(error);
    }
};

// delete house by id
exports.deleteHouse = (req, res, next) => {
    const { house_id } = req.params;

    house.findOneAndDelete({ house_id })
        .then(result => {
            res.status(200).json({
                status: true,
                message: `House object ${house_id} deleted successfully`
            })
        }).catch(error => {
            next(error);
        })
}

// update house by id
exports.updateHouse = (req, res) => {
    const { house_id } = req.params;
    const { type, name, description, image, imageLg, country, address, bedrooms, bathrooms, surface, year, price } = req.body;

    house.findOneAndUpdate({ house_id }, {
        type: type,
        name: name,
        description: description,
        image: image,
        imageLg: imageLg,
        country: country,
        address: address,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        surface: surface,
        year: year,
        price: price,
    }, { new: true })

        .then(result => {
            res.status(200).json({
                status: true,
                message: `House object ${house_id} updated successfully`,
                house: result
            })
        }).catch(error => {
            next(error);
        })
}

// get house by type
exports.getHouseByType = async (req, res, next) => {
    try {
        const { type } = req.params;

        const houseList = await house.find({
            type: type,
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        next(error);
    }
};

// get house by price

exports.getHouseByPrice = async (req, res, next) => {
    try {
        const { price } = req.params;

        const houseList = await house.find({
            price: price,
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        next(error);
    }
};

// get house by address
exports.getHouseByAddress = async (req, res, next) => {
    try {
        const { address } = req.params;
        
        const houseList = await house.find({
            address: address,
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        next(error);
    }
};

// get house by surface area  
exports.getHouseBySurface = async (req, res, next) => {
    try {
        const { surface } = req.params;

        const houseList = await house.find({
            surface: surface,
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        next(error);
    }
};

