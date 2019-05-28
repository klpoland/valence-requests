# valence-requests
Node.js request functions intended for use with the Valence (Brightspace) API

## Dependencies
- axios (provided in download folder)
- valence SDK for Node.js if applicable

## Function Descriptions
- __makeGetRequest(url)__ | make GET request to API (returns response object)
  - __url__ | URL endpoint to which you are making the request
- __makePostRequest(url, data)__ | make POST request to API (returns response object)
  - __url__ | URL endpoint to which you are making the request
  - __data__ | payload of JSON parameters you are sending with the request
- __makeDeleteRequest(url)__ | make DELETE request to API (returns response object)
  - __url__ | URL endpoint to which you are making the request
- __makePutRequest(url, data)__ | make PUT request to API (returns response object)
  - __url__ | URL endpoint to which you are making the request
  - __data__ | payload of JSON parameters you are sending with the request
- __getUserContext(userId, userKey, req, host, method, appContext)__ | get the user context of the requester using parameters retrieved from valence (returns url)
  - __userKey__ | user key assigned by valence when a user authorizes an app on the valence API
  - __userId__ | user ID assigned by valence when a user authorizes an app on the valence API
  - __req__ | the request path (see valence routing table)
  - __host__ | the host URL that your valence app makes requests to
  - __method__ | request method
  - __appContext__ | app context object created from valence module

## Examples of Use
1. Download valence_requests package to your working directory with git clone, then import into your code like so:
  ```javascript
  const valReq = require('./valence_requests.js')
  ```
2. For valence, you'll also need to import the valence module:
```javascript
const D2L = require('./valence.js')
```
3. Make sure your code has access to you app key and ID and the user key and ID you want to use. I would recommend keeping your app key and ID in a table and loading it into your code, and (for AWS users) if multiple users will be making calls to the API with your app in their user context, pass their user key and ID as an event (using lambda proxy integration with the API gateway) into your lambda handler:
```javascript
exports.handler = async (event, context, callback) => {
  const userKey = event.queryStringParameters.x_a
  const userId = event.queryStringParameters.x_b
  
  /*
  when using lambda proxy integration, 
  an event object is passed to the lambda handler
  connected to the API gateway and the url parameters 
  detailed in the valence API documentation
  are passed to the callback url (the API gateway endpoint) 
  and these parameters then appear in 
  the queryStringParameters section of the proxy event.
  */
}
```
4. Now you can construct functions for making any type of API call to valence. Any of these functions and the lambda handler will need to be asynchronous to accomodate the promise based nature of axios, which is the module used to make the HTTP requests. Let's make a GET request to retrieve and make a list of API versions which can be used in many other requests:
```javascript
async function get_api_versions(userKey, userId, host, appContext) {
  const result = {}
  const req = 'd2l/api/versions/'
  const method = 'GET'
  const url = getUserContext(userId, userKey, req, host, method, appContext)
  const res = await makeGetRequest(url)
  for (var i = 0; i < res.length; i++) {
    var api = res[i]
    var name = api.ProductCode
    var version = api.LatestVersion
    result[name] = version
  }
}
```
5. You can then call this function in your handler and pass in your own parameters.
```javascript
const versionsList = await get_api_versions(
                           <YOUR USER ID>, 
                           <YOUR USER KEY>, 
                           <YOUR HOST>, 
                           <YOUR APP CONTEXT>)
```
6. Now let's try something a bit more complex, a POST request. Let's try to make a function that posts on a discussion forum. Make sure you have the proper permissions to do this:
```javascript
async function postToTopic(userKey, userId, host, version, ou, forumId, topicId, appContext) {
    const req = '/d2l/api/le/' + version + '/' + ou + '/discussions/forums/' + forumId + '/topics/' + topicId + '/posts/'
    const method = 'POST'
    const url = getUserContext(userId, userKey, req, host, method, appContext)
    const data = {
        "ParentPostId": null,
        "Subject": "Hello World",
        "Message": {
            "Content": "This post is test. Hello.",
            "Type": "Text|Html"
        },
        "IsAnonymous": false
    }
    const res = await makePostRequest(url, data)
    return res
}
```
When you call this function and run your program, you should see a new post under the org unit, forum, and topic you inputted.
