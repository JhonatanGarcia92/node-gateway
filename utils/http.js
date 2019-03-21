module.exports = function() {
  var _request = (method, path, body, qs, token, successCallback, errorCallback) => {
    require('request')({
      method: method,
      headers: {'authorization': token},
      url: path,
      body: body,
      qs: qs,
      json: true,
      timeout: 5000
    }, (error, response, body) => {
      if (response && response.statusCode >= 200 && response.statusCode < 300) {
        return successCallback(body)
      }

      return errorCallback(error)
    })
  }

  return {
    get: (path, qs, token, successCallback, errorCallback) => {
      return _request('GET', path, null, qs, token, successCallback, errorCallback)
    },
    patch: (path, body, qs, token, successCallback, errorCallback) => {
      return _request('PATCH', path, body, qs, token, successCallback, errorCallback)
    },
    post: (path, body, qs, token, successCallback, errorCallback) => {
      return _request('POST', path, body, qs, token, successCallback, errorCallback)
    }
  }
}()
