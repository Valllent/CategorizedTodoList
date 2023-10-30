module.exports = {
    name: () => {
        return {
            "type": "string",
            "presence": {
                allowEmpty: false
            },
            "format": {
                "pattern": "[a-zA-Z0-9\-_ ]*",
                "flags": "i",
                "message": " name contains unsupported characters"
            },
            "length": {
                "minimum": 6,
                "maximum": 20,
                "message": " name length must be from 6 to 20 symbols"
            }
        }
    },
    email: () => {
        return {
            "type": "string",
            "email": true,
            "presence": {
                allowEmpty: false
            },
        }
    },
    password: () => {
        return {
            "type": "string",
            "presence": {
                allowEmpty: false
            },
            "length": {
                "minimum": 8,
                "maximum": 20,
                "message": "Password length must be from 8 to 20 symbols."
            }
        }
    }
}