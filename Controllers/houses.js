
const house = require("../Models/house");

// create a new house
const Joi = require('joi');

const houseSchema = Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    country: Joi.string().required(),
    address: Joi.string().required(),
    bedrooms: Joi.number().integer().positive().required(),
    bathrooms: Joi.number().integer().positive().required(),
    surface: Joi.number().positive().required(),
    year: Joi.number().integer().min(1800).max(new Date().getFullYear()).required(),
    price: Joi.number().positive().required(),
    sliderImages: Joi.array().items(Joi.object({
        imageUrl: Joi.string().uri().required
    }))
});

exports.createHouse = async (req, res) => {
    try {
        const { error, value } = houseSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(d => d.message);
            return res.status(400).json({ message: messages });
        }

        const newhouse = new House(value);
        await newhouse.save();
        res.status(200).json({ message: "Data saved successfully" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


// get all houses
exports.getHouses = async (req, res) => {
    try {
        const response = await house.find();
        res.status(200).json({ message: "Sucessfull fetched Houses!", house: response });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err });
    }
};

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
exports.deleteHouse = async (req, res, next) => {
    try {
        const { house_id } = req.params;

        const result = await house.findOneAndDelete({ house_id });
        res.status(200).json({
            status: true,
            message: `House object ${house_id} deleted successfully`,
        });
    } catch (error) {
        next(error);
    }
};


// update house by id

exports.updateHouse = async (req, res, next) => {
    try {
        const { house_id } = req.params;
        const {
            type,
            name,
            description,
            image,
            sliderImages,
            country,
            address,
            bedrooms,
            bathrooms,
            surface,
            year,
            price,
        } = req.body;
        const result = await house.findOneAndUpdate(
            { house_id },
            {
                type: type,
                name: name,
                description: description,
                image: image,
                country: country,
                address: address,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                surface: surface,
                year: year,
                price: price,
                sliderImages: sliderImages,
            }
        );
        res.status(200).json({
            status: true,
            message: `House object ${house_id} updated successfully`,
        });
    } catch (error) {
        next(error);
    }
};

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

// get house by bedrooms
exports.getHouseByBedrooms = async (req, res, next) => {
    try {
        const { bedrooms } = req.params;

        const houseList = await house.find({
            bedrooms: bedrooms,
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        next(error);
    }
};

// get house by bathrooms
exports.getHouseByBathrooms = async (req, res, next) => {
    try {
        const { bathrooms } = req.params;

        const houseList = await house.find({
            bathrooms: bathrooms,
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        next(error);
    }
};

// get hosue by price range where getHouseByPriceRange?min=1000&max=2000
exports.getHouseByPriceRange = async (req, res, next) => {
    try {
        const { min, max } = req.query;

        const houseList = await house.find({
            price: { $gte: min, $lte: max },
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        next(error);
    }
}

// get house by surface range where getHouseBySurfaceRange?min=1000&max=2000

exports.getHouseBySurfaceRange = async (req, res, next) => {
    try {
        const { min, max } = req.query;

        const houseList = await house.find({
            surface: { $gte: min, $lte: max },
        });
        res.status(200).json({
            status: true,
            house: houseList,
        });
    } catch (error) {
        next(error);
    }
}

