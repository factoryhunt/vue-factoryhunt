var express = require('express');
var fs = require('fs');
var AWS = require('aws-sdk');

var s3 = new AWS.S3();
AWS.config.region = 'us-west-1';
const BUCKET_NAME = 'elasticbeanstalk-us-west-1-624975634187';

var router = express.Router();

// POST: /api/aws/get
module.exports = function (req, res) {
// BUCKET_NAME 주소에서 response로 데이터들 가져올 때
  s3.listObjects({Bucket: BUCKET_NAME}).on('success', function handlePage(response) {
    for(var name in response.data.Contents) {
        console.log(response.data.Contents[name]);

    }
    if (response.hasNextPage()) {
        response.nextPage('success', handlePage).send();
    }
  }).send();
};

//putObject는 data 파라미터에 이미지가 저장된 url을 반환하지 않는다
// s3.putObject(params, function(err, data) {
//     console.log(err);
//     console.log(data);
// });

// S3에서 파일 다운로드
// 개념이 약간 애매한데 file의 최종 경로에 다운로드를 받겠다는 얘기인 것 같다. pipe로 연결한다.
// var file = fs.createWriteStream('logo.png');
// var params = {Bucket:BUCKET_NAME, Key:'logo.png'};
// s3.getObject(params).createReadStream().pipe(file);

