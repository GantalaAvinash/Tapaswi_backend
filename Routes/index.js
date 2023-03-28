const express = require("express");
const HouseContact = require("../Controllers/HouseContact"); 
const Houses = require("../Controllers/houses");
const studentsController = require("../Controllers/student");
const router = express.Router();

router.route('/housecontact').post(HouseContact.createHouseContact);   
router.route('/housecontact').get(HouseContact.getHouseContact);
router.route('/housecontact/:house_id').get(HouseContact.getHouseContactById);
router.route('/housecontact/:house_id').delete(HouseContact.deleteHouseContactById);
router.route('/houses').get(Houses.getHouses);
router.route('/houses/:house_id').get(Houses.getHouseById);
router.route('/houses/:house_id').delete(Houses.deleteHouse);
router.route('/houses/:house_id').put(Houses.updateHouse);
router.route('/houses').post(Houses.createHouse);
router.route('/housesbytype/:type').get(Houses.getHouseByType);
router.route('/housesbyaddress/:address').get(Houses.getHouseByAddress);
router.route('/housesbyprice/:price').get(Houses.getHouseByPrice);
router.route('/housesbysurface/:surface').get(Houses.getHouseBySurface);
router.route('/student').get(studentsController.getStudents);
router.route('/studentsignup').post(studentsController.studentsignUp);
router.route('/studentlogin').post(studentsController.studentlogin);
router.route('/student/:std_id').delete(studentsController.deleteStudent);
router.route('/student/:std_id').get(studentsController.getStudentById);
router.route('/visitor').get(visitorController.getVisitor);
router.route('/visitor').post(visitorController.visitor);
router.route('/visitor').put(visitorController.incrementVisitorCount);

module.exports=router;
