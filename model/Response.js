/**
 * @design by Vimlesh Kumar
 */

class Response {
    //boolean,string,obj
    constructor(error, message, data) {
        this.error = error;
        this.message = message;
        this.response = data;
    }
}

module.exports = Response;
