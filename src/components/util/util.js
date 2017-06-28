
exports.clearForm = function (objJson) {
  for (var prop in objJson) {
    if (objJson.hasOwnProperty(prop)) {
      // console.log(Object.prototype.toString.call(objJson[prop]));
      if (typeof objJson[prop] === 'string') {
        objJson[prop] = ''
      }
      if (Object.prototype.toString.call(objJson[prop]) === '[object Date]') {
        objJson[prop] = new Date()
      }
      if (Object.prototype.toString.call(objJson[prop]) === '[object Number]') {
        objJson[prop] = 0
      }
      if (Object.prototype.toString.call(objJson[prop]) === '[object Array]') {
        objJson[prop] = []
      }
    }
  }
}

exports.createDynamicJson = function (objJson) {
  var rootJson = {}
  for (var prop in objJson) {
    if (objJson.hasOwnProperty(prop)) {
      if (prop !== '_id') {
        rootJson[prop] = objJson[prop]
      }
    }
  }
  return rootJson
}

exports.validRequiredFields = function (jsonData, jsonDataRequired) {
  var messageError = null

  if (jsonDataRequired === null) {
    messageError = 'No existen campos configurados para validar, por favor verifique!'
    return messageError
  }

  var fields = jsonDataRequired.fields
  var labels = jsonDataRequired.labels
  var prop = null

  for (var index in fields) {
    prop = fields[index]
    if (jsonData.hasOwnProperty(prop)) {
      if (typeof jsonData[prop] === 'string') {
        if (jsonData[prop] === null || jsonData[prop].trim() === '') {
          messageError = 'El campo [' + labels[index] + '] es requerido, por favor verifique!'
          break
        }
      }

      if (Object.prototype.toString.call(jsonData[prop]) === '[object Number]') {
        if (jsonData[prop] === null || jsonData[prop] <= 0) {
          messageError = 'El campo [' + labels[index] + '] es requerido, por favor verifique!'
          break
        }
      }

      if (Object.prototype.toString.call(jsonData[prop]) === '[object Date]') {
        if (jsonData[prop] === null) {
          messageError = 'El campo [' + labels[index] + '] es requerido, por favor verifique!'
          break
        }
      }

      if (Object.prototype.toString.call(jsonData[prop]) === '[object Array]') {
        if (jsonData[prop].length <= 0) {
          messageError = 'El campo [' + labels[index] + '] es requerido, por favor verifique!'
          break
        }
      }
    }
  }

  return messageError
}

exports.validFilterFields = function (jsonData) {
  var messageError = null

  for (var prop in jsonData) {
    if (jsonData.hasOwnProperty(prop)) {
      if (typeof jsonData[prop] === 'string') {
        if (jsonData[prop] === null || jsonData[prop].trim() === '') {
          messageError = 'Existe campo(s) requerido(s) por llenar, por favor verifique!'
          break
        }
      }

      if (Object.prototype.toString.call(jsonData[prop]) === '[object Number]') {
        if (jsonData[prop] === null || jsonData[prop] <= 0) {
          messageError = 'Existe campo(s) requerido(s) por llenar, por favor verifique!'
          break
        }
      }

      if (Object.prototype.toString.call(jsonData[prop]) === '[object Date]') {
        if (jsonData[prop] === null) {
          messageError = 'Existe campo(s) requerido(s) por llenar, por favor verifique!'
          break
        }
      }

      if (Object.prototype.toString.call(jsonData[prop]) === '[object Array]') {
        if (jsonData[prop].length <= 0) {
          messageError = 'Existe campo(s) requerido(s) por llenar, por favor verifique!'
          break
        }
      }
    }
  }

  return messageError
}

exports.filterDocument = function (arrJsonData, strCompany, strDocument) {
  var jsonConfiguration = null

  if (!Array.isArray(arrJsonData)) {
    jsonConfiguration = arrJsonData
    return jsonConfiguration
  }

  for (var index in arrJsonData) {
    var jsonData = arrJsonData[index]
    if (jsonData.hasOwnProperty('company') && jsonData.hasOwnProperty('document')) {
      if (jsonData['company'] === strCompany && jsonData['document'] === strDocument) {
        jsonConfiguration = jsonData
        break
      }
    }
  }

  if (jsonConfiguration !== null) {
    return jsonConfiguration
  }

  for (index in arrJsonData) {
    jsonData = arrJsonData[index]
    if (jsonData.hasOwnProperty('company') && jsonData.hasOwnProperty('document')) {
      if (jsonData['company'] === 'default' && jsonData['document'] === strDocument) {
        jsonConfiguration = jsonData
        break
      }
    }
  }

  if (jsonConfiguration === null) {
    jsonConfiguration = {}
  }

  return jsonConfiguration
}

exports.formatFields = function (jsonData, jsonDataFormat) {
  if (jsonDataFormat === null) {
    return
  }

  var fields = jsonDataFormat.fields
  var format = jsonDataFormat.format
  var prop = null

  for (var index in fields) {
    prop = fields[index]
    if (jsonData.hasOwnProperty(prop)) {
      if (typeof jsonData[prop] === 'string') {
        jsonData[prop] = jsonData[prop].trim()
        if (format[index] === 'Upper') {
          jsonData[prop] = jsonData[prop].toUpperCase()
        }
        if (format[index] === 'Lower') {
          jsonData[prop] = jsonData[prop].toLowerCase()
        }
        if (format[index] === 'Email') {
          jsonData[prop] = jsonData[prop].toLowerCase()
        }
      }

      if (Object.prototype.toString.call(jsonData[prop]) === '[object Number]') {
      }

      if (Object.prototype.toString.call(jsonData[prop]) === '[object Date]') {
      }

      if (Object.prototype.toString.call(jsonData[prop]) === '[object Array]') {
      }
    }
  }
}

exports.filterCompany = function (arrJsonData, strCompany) {
  var jsonArrayItems = []

  if (!Array.isArray(arrJsonData)) {
    jsonArrayItems = arrJsonData.items
    return jsonArrayItems
  }

  for (var index in arrJsonData) {
    var jsonData = arrJsonData[index]
    if (jsonData.hasOwnProperty('company')) {
      if (jsonData['company'] === strCompany) {
        jsonArrayItems = jsonData.items
        break
      }
    }
  }

  if (jsonArrayItems.length > 0) {
    return jsonArrayItems
  }

  for (index in arrJsonData) {
    jsonData = arrJsonData[index]
    if (jsonData.hasOwnProperty('company')) {
      if (jsonData['company'] === 'default') {
        jsonArrayItems = jsonData.items
        break
      }
    }
  }

  return jsonArrayItems
}

exports.getUrlServerDB = function () {
  return 'http://localhost:3000/'
}
