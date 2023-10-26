/**********************************************************************************************************************
 *  Purpose         : Handing of the request coming from the clients regarding maps.
 *
 *  @description
 *
 *  @file           : mapController.js
 *  @overview       : MapController class delegates the request from client to appropriate api's.
 *  @author         : Vimlesh Kumar 
 *  @version        : 1.0
 *  @since          : 04-24-2023
 *
 **********************************************************************************************************************/
/**
*@description loads all the depencies requied for the user controller class including express validator
*/

const Response = require('../model/Response');
const Model = require('../model/mapModel');

module.exports.saveData = async (req, res) => {
    const {
        selectedOption,
        otherOption,
        description,
        locationDetails
    } = req && req.body;
    
    const results = await Model.saveDataModel({
        selectedOption,
        otherOption,
        description,
        locationDetails
    });
    if (results > 0) {
        let response = new Response(false, "list get successfully", results);
        res.status(200).send(response);
    } else {
        let response = new Response(true, "list NOT FOUND", []);
        res.status(200).send(response);
    }

}

