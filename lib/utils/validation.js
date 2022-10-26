'use strict'

const Pattern = require("./pattern");
const {DATA_ONLY, TIME_ONLY, DATE_TIME_ONLY, DATE_TIME, DATE_TIME_RFC} = Pattern

class Validation {

    static isValideJson(body) {
        
        try {
            JSON.parse(body);
        } catch (error) {
            console.error(error);
            return false;
        }
        return true;
    }

    static returnType(value) {
        
        var type = ({}).toString.call(value).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        console.log(type);
        if (type == "number") {
            return (Number.isInteger(value)) ? "integer" : type
        }
        return type
    }

    static isDate(value) {
        if (DATA_ONLY.test(value)){
            return 'date-only'
        }else if (TIME_ONLY.test(value)) {
            return 'time-only'
        } else if (DATE_TIME_ONLY.test(value)) {
            return 'datetime-only'
        } else if (DATE_TIME.test(value) || DATE_TIME_RFC.test(value)) {
            return 'datetime'
        } else {
            return 'string'
        }
    }
}

module.exports = Validation