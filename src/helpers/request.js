var axios = require('axios')
const config = require('@/../config.json')
axios.defaults.preflightContinue = true
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true
export default ({ url, method, data }) => new Promise((resolve, reject) => {
  const requestOptions = {
    url: config.API_URL + url,
    method,
    data
  }

  axios(requestOptions)
    .then(response => resolve(response.data))
    .catch(error => console.log(error.response))
})
