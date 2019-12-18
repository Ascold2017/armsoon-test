const express = require('express')
const axios = require('axios')
const cors = require('cors')
const crypto = require('crypto')
const config = require('../config.json')
function createOrder (req, res) {
  const url = '/api/v1/order'
  const data = {
    ordType: 'Market',
    symbol: req.body.symbol,
    orderQty: req.body.count,
    side: req.body.side
  }
  const expires = Math.round(new Date().getTime() / 1000) + 60
  const signature = crypto.createHmac('sha256', config.API_SECRET)
    .update('POST' + url + expires.toString() + JSON.stringify(data)).digest('hex')

  axios.post(
    'https://testnet.bitmex.com' + url,
    data,
    {
      headers: {
        'api-key': config.API_KEY,
        'api-expires': expires,
        'api-signature': signature
      }
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(err => res.status(400).json(err.response.data))
}

function getOrders (req, res) {
  const url = '/api/v1/order'
  const expires = Math.round(new Date().getTime() / 1000) + 60
  const signature = crypto.createHmac('sha256', config.API_SECRET)
    .update('GET' + url + expires.toString()).digest('hex')

  axios.get(
    'https://testnet.bitmex.com' + url,
    {
      headers: {
        'api-key': config.API_KEY,
        'api-expires': expires,
        'api-signature': signature
      }
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(err => res.status(400).json(err.response.data))
}

function getValutePairs (req, res) {
  axios.get(config.API_URL + '/instrument/active')
    .then(response => {
      res.json(response.data)
    })
}
function getQuoteHistory (req, res) {
  axios.get(config.API_URL + `/trade/bucketed?binSize=1m&amp;partial=false&amp;count=100&amp;reverse=true&amp;symbol=${req.params.id}`)
    .then(response => {
      res.json(response.data)
    })
}

const server = express()
server.use(cors())
server.use(express.json())
server.get('/valute-pairs', getValutePairs)
server.get('/quote-history/:id', getQuoteHistory)
server.post('/order', createOrder)
server.get('/order', getOrders)

server.listen(3000)
