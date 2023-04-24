/**********************************************************************************************************************
 *  Purpose         : Handing of the request coming from the clients regarding maps.
 *
 *  @description
 *
 *  @file           : userController.js
 *  @overview       : UserController class delegates the request from client from signup,login and forgetpassword.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 04-21-20123
 *
 **********************************************************************************************************************/
/**
*@description loads all the depencies requied for the user controller class including express validator
*/

const mapService = require('../service/mapService');

function MapController(){

}

MapController.prototype.getDreList = (req,res,next) => {
    mapService.getDreListService
}