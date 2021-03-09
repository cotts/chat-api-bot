import axios from 'axios'
import csv from 'csvtojson'

/**
 *  Get Stock CSV String given a code
 * @param {String} code - Stock Code
 * @returns {Promise}
 */
const getCsvInfo = (code) => {
  return axios
    .get(`https://stooq.com/q/l/?s=${code}&f=sd2t2ohlcv&h&e=csv,`)
    .then((data) => data.data)
    .catch((error) => {
      console.log(error)
      return error.message
    })
}

/**
 *  Convert content string to JSON
 * @param {String} content
 *
 */
const convertCsvToJson = (content) =>
  csv({ noheader: false }).fromString(data.data)
