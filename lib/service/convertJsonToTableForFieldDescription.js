// Modules
const Type = require('type-of-is')
const yaml = require('js-yaml');
const Validation = require('../utils/validation')
var pathArrays = []
/*
 * @param {any} json
 * @returns {object} a json schema
*/
module.exports = function convert(json, options) {
  var structureTable
  json = JSON.parse(json)
  structureTable = main(json, "", options).flat()
  pathArrays = []
  return processTable(structureTable, options)
}

function main(value, path = "", options = {}) {
  switch (Validation.returnType(value)) {
    case "object":
      return processObject(value, path, options).flat()
      break;
    case "array":
      return processArray(value, path + "[n]", options).flat()
      break;

    default:
      return processOther(value, path, options)
      break;
  }
}

function processOther(params, path = "", options = {}) {
  var objectItem = {}
  objectItem.compledPath = path
  if (options.type) {
    objectItem.type = Validation.returnType(params)
  }
  if (options.example) {
    objectItem.example = params
  }
  return objectItem
}

function processObject(object, path = "", options = {}) {
  var output = []
  for (var key in object) {
    output.push(main(object[key], path + "." + key, options))
  }

  return output
}

function processArray(array, path = "", options = {}) {
  var outputArray = []

  // Determine whether each item is different
  for (var arrIndex = 0, arrLength = array.length; arrIndex < arrLength; arrIndex++) {
    if (!pathArrays.includes(path)) {
      outputArray.push(main(array[arrIndex], path, options))
      pathArrays.push(path)
    }
  }
  return outputArray
}

function processTable(object, options) {
  var table = []
  var itemValue
  var styleTable = (typeof options.styleTable === 'string' && options.styleTable.trim() !== '') ? ` style="${options.styleTable}"` : ""
  var styleFirstLine = (typeof options.styleFirstLine === 'string' && options.styleFirstLine.trim() !== '') ? ` style="${options.styleFirstLine}"` : ""
  table.push(`<table${styleTable}>\r\n`)
  table.push(`\t<tr${styleFirstLine}>\r\n`)
  table.push(`\t\t<td>name</td>\r\n`)
  if (options.type > 0) {
    table.push(`\t\t<td>type</td>\r\n`)
  }
  if (options.example > 0) {
    table.push(`\t\t<td>example</td>\r\n`)
  }
  if (options.blankColumns > 0) {
    for (let index = 0; index < options.blankColumns; index++) {
      table.push(`\t\t<td></td>\r\n`)
    }
  }
  table.push(`\t</tr>\r\n`)
  for (var index in object) {
    table.push(`\t<tr>\r\n`)
    itemValue = object[index]
    for (var indexItem in itemValue) {
      table.push(`\t\t<td>`, itemValue[indexItem], `</td>\r\n`)
    }
    if (options.blankColumns > 0) {
      for (let index = 0; index < options.blankColumns; index++) {
        table.push(`\t\t<td></td>\r\n`)
      }
    }
    table.push(`\t</tr>\r\n`)
  }
  table.push(`</table>\r\n`)
  return table.join('')
}