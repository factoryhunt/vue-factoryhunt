var axios = require('axios');

module.exports = function (req, response) {
  console.log('api/open/year called');
  console.log(req)

  const host = 'http://apis.data.go.kr/1450000/delngBsshInfoService/getAreaSttusInqire'
  const serviceKey = '6%2B9nQk4dKcezyxGpOqLUikgeq0VE3XXCmrM9hIV5FyUU1DQEaK3YO2mpS%2BB6yFD78m7PPUZSGJL9wLifI3u7Jg%3D%3D'
  const convertJSON = '&_type=json';
  const options = '&numOfRows=999&pageSize&999&pageNo=1&startPage=1'
  const supplierNumber = req.body.supplierNumber;
  var param = '&splyPrtnum=' + supplierNumber;
  var url = host + '?serviceKey=' + serviceKey + options + param + convertJSON;

  axios.get(url)
    .then(res => {
      console.log('Status', res.statusCode);
      console.log('Headers', JSON.stringify(res.headers));
      console.log('Reponse received', body);
      response.send(body);
    });

  // request({
  //   url: url,
  //   method: 'GET'
  // }, function (err, res, body) {
  //
  // })
}
