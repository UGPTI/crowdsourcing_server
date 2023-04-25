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

const MapController = {

    /**
     * @description get all data from a specific table order by a field
     * @param {table} table name
     * @param {field} field name
     * @response {error(boolean), message(String), response(object:any)}
     */
    getDreList: (req, res) => {
        const table = req.params.table
        const field = req.params.field

        new DataModel().getAll(table, field, (err, results) => {
            if (err) {
                let response = new Response(500, err.message, err);
                res.send(response);
            } else {
                if (results && results.length > 0) {
                    let response = new Response(false, "list get successfully", results);
                    res.status(200).send(response);
                } else {
                    let response = new Response(true, "list NOT FOUND", []);
                    res.status(200).send(response);
                }
            }
        })
    },//end getAll

}


module.exports = MapController;