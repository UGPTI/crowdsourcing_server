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

module.exports.getDreList = async (req, res) => {
    const results = await Model.dreListModel();
    if (results && results.length > 0) {
        let response = new Response(false, "list get successfully", results);
        res.status(200).send(response);
    } else {
        let response = new Response(true, "list NOT FOUND", []);
        res.status(200).send(response);
    }
}

module.exports.readAndUpdateDreList = async (req, res) => {
   
    const results = await Model.readAndUpdateDreListModel();
    if (results && results.length > 0) {
        let response = new Response(false, "list updated successfully", results);
        res.status(200).send(response);
    } else {
        let response = new Response(true, "list NOT FOUND", []);
        res.status(400).send(response);
    }
}

