const express = require("express");
const HouseContact = require("../Controllers/HouseContact"); 
const Houses = require("../Controllers/houses");
const UserController = require("../Controllers/user");
const visitorController = require("../Controllers/visitor");
const router = express.Router();

// house contact routes
router.route('/housecontact').post(HouseContact.createHouseContact);   
router.route('/housecontact').get(HouseContact.getHouseContact);
router.route('/housecontact/:house_id').get(HouseContact.getHouseContactById);
router.route('/housecontact/:house_id').delete(HouseContact.deleteHouseContactById);
// house routes
router.route('/houses').get(Houses.getHouses);
router.route('/houses/:house_id').get(Houses.getHouseById);
router.route('/houses/:house_id').delete(Houses.deleteHouse);
router.route('/houses/:house_id').put(Houses.updateHouse);
router.route('/houses').post(Houses.createHouse);
router.route('/housesbytype/:type').get(Houses.getHouseByType);
router.route('/housesbyaddress/:address').get(Houses.getHouseByAddress);
router.route('/housesbyprice/:price').get(Houses.getHouseByPrice);
router.route('/housesbysurface/:surface').get(Houses.getHouseBySurface);
// user signup and login routes
router.route('/user').post(UserController.userSignUp);
router.route('/user').get(UserController.getUsers);
router.route('/user/:user_id').get(UserController.getUserById);
router.route('/user/:user_id').delete(UserController.deleteUserById);
router.route('/user/:user_id').put(UserController.updateUser);
router.route('/userlogin').post(UserController.userLogin); 

// visitor routes
router.route('/visitor').get(visitorController.getVisitor);
router.route('/visitor').post(visitorController.visitor);
router.route('/visitor').put(visitorController.incrementVisitorCount);

module.exports=router;
