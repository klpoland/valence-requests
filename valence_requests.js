/*
A list of functions utilizing the four API methods
GET, PUT, POST, DELETE for the valence (Brightspace) API.
Includes a function that gets the user context.
These axios based request functions and the getUserContext()
function can be used in tandem to make any request to valence
which is detailed in the README.md
*/

// EXPORT MODULE

var exports = module.exports = {}

//------------ IMPORTING DEPENDENCIES -------------

const axios = require('axios')

//------------- GET REQUEST FUNCTION --------------
exports.makeGetRequest = async function(url) {
    const request = async () => {
        try {
            return await axios.get(url)
        } catch (error) {
            console.error(error)
        }
    }

    const response = async () => {
        const res = await request()
        try {
            if (res.status === 200) {
                const data = res.data
                return data
            }
        } catch (err) {
            console.log(err)
        }
    }

    return response()
}

//--------------- POST REQUEST FUNCTION -----------------
exports.makePostRequest = async function(url, data) {
    const options = JSON.stringify(data)
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    const request = async () => {
        try {
            return await axios.post(url, options)
        } catch (error) {
            console.error(error)
        }
    }

    const response = async () => {
        const res = await request()
        try {
            if (res.status === 200) {
                const data = res.data
                return data
            }
        } catch (err) {
            console.log(err)
        }
    }

    return response()
}

//--------------- DELETE REQUEST FUNCTION -----------------
exports.makeDeleteRequest = async function(url) {
    const request = async () => {
        try {
            return await axios.delete(url)
        } catch (error) {
            console.error(error)
        }
    }

    const response = async () => {
        const res = await request()
        try {
            if (res.status === 200) {
                const data = res.data
                return data
            }
        } catch (err) {
            console.log(err)
        }
    }

    return response()
}

//--------------- PUT REQUEST FUNCTION -----------------
exports.makePutRequest = async function(url, data) {
    const options = JSON.stringify(data)
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    const request = async () => {
        try {
            return await axios.put(url, options)
        } catch (error) {
            console.error(error)
        }
    }

    const response = async () => {
        const res = await request()
        try {
            if (res.status === 200) {
                const data = res.data
                return data
            }
        } catch (err) {
            console.log(err)
        }
    }

    return response()
}

//----------------- FUNCTION TO VALIDATE USER CONTEXT -------------------
exports.getUserContext = function(userId, userKey, req, method, appContext) {
    const scheme = 'https://';
    const port = '443';
    const host = 'ugatest2.view.usg.edu'
    const userContext = appContext.createUserContextWithValues(host, port, userId, userKey);
    const url = userContext.createUrlForAuthentication(req, method);
    return scheme + url
}
