/*
A list of functions utilizing the four API methods
GET, PUT, POST, DELETE for the valence (Brightspace) API.
Includes a function that gets the user context.
These axios based request functions and the getUserContext()
function can be used in tandem to make any request to valence
which is detailed in the README.md
*/

//------------ IMPORTING DEPENDENCIES -------------

const axios = require('axios')

//------------- GET REQUEST FUNCTION --------------
async function makeGetRequest(url) {
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
            const errRes = err.config.response
            const response = {'status':errRes.status, 'text':errRes.data}
            return response
        }
    }

    return response()
}

//--------------- POST REQUEST FUNCTION -----------------
async function makePostRequest(url, data) {
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
            const errRes = err.config.response
            const response = {'status':errRes.status, 'text':errRes.data}
            return response
        }
    }

    return response()
}

//--------------- DELETE REQUEST FUNCTION -----------------
async function makeDeleteRequest(url) {
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
            const errRes = err.config.response
            const response = {'status':errRes.status, 'text':errRes.data}
            return response
        }
    }

    return response()
}

//--------------- PUT REQUEST FUNCTION -----------------
async function makePutRequest(url, data) {
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
            const errRes = err.config.response
            const response = {'status':errRes.status, 'text':errRes.data}
            return response
        }
    }

    return response()
}

//----------------- FUNCTION TO VALIDATE USER CONTEXT -------------------
function getUserContext(userId, userKey, req, host, method, appContext) {
    const scheme = 'https://';
    const port = '443';
    const userContext = appContext.createUserContextWithValues(host, port, userId, userKey);
    const url = userContext.createUrlForAuthentication(req, method);
    return scheme + url
  }


// EXPORT MODULE

  module.exports = { valence_requests }