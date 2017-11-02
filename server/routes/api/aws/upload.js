var
  formidable = require('formidable'),
  AWS = require('aws-sdk'),
  fs = require('fs'),
  async = require('async'),
  Upload = {};

AWS.config.region = 'us-west-1'; //지역 설정
var s3 = new AWS.S3();
var form = new formidable.IncomingForm({
  encoding: 'utf-8',
  multiples: true,
  keepExtensions: false //확장자 제거
});
const BUCKET_NAME = 'elasticbeanstalk-us-west-1-624975634187';

var params = { // AWS S3업로드에 대한 정보 입니다.
  Bucket: BUCKET_NAME, // S3 Bucket 이름을 지정합니다.
  Key: null, // Key : S3의 경로 및 파일 이름을 지정합니다.
  ACL: 'public-read', // ACL : 파일 권한에 대한 설정입니다.
  Body: null // Body : 업로드할 파일의 경로를 지정합니다.
};

Upload.formidable = function (req, callback) {
  form.parse(req, function (err, fields, files) {
  });
  form.on('error', function (err) {
    callback(err, null);
  });
  form.on('end', function () {
    callback(null, this.openedFiles);
  });
  form.on('aborted', function () {
    callback('form.on(aborted)', null);
  });
};

Upload.s3 = function (files, callback) {
  params.Key = 'catalogs/'+files[0].name;
  params.Body = fs.createReadStream(files[0].path);
  s3.upload(params, function (err, result) {
    callback(err, result);
  });
};

// POST: /api/aws/upload
module.exports = function (req, res) {
  console.log('s3 upload called');
  console.log(req)
  var tasks = [
    function (callback) {
      Upload.formidable(req, function (err, files, field) {
        console.log(req)
        console.log(files)
        callback(err, files);
      })
    },
    function (files, callback) {
      Upload.s3(files, function (err, result) {
        callback(err, files);
      });
    }
  ];
  async.waterfall(tasks, function (err, result) {
    if(!err){
      res.json({success:true, msg:'업로드 성공'})
    }else{
      res.json({success:false, msg:'실패', err:err})
    }
  });
};

//putObject는 data 파라미터에 이미지가 저장된 url을 반환하지 않는다
// s3.putObject(params, function(err, data) {
//     console.log(err);
//     console.log(data);
// });

// BUCKET_NAME 주소에서 response로 데이터들 가져올 때
// s3.listObjects({Bucket: BUCKET_NAME}).on('success', function handlePage(response)
// {
//     for(var name in response.data.Contents) {
//         console.log(response.data.Contents[name].Key);
//     }
//     if (response.hasNextPage()) {
//         response.nextPage('success', handlePage).send();
//     }
// }).send();

// S3에서 파일 다운로드
// 개념이 약간 애매한데 file의 최종 경로에 다운로드를 받겠다는 얘기인 것 같다. pipe로 연결한다.
// var file = fs.createWriteStream('logo.png');
// var params = {Bucket:BUCKET_NAME, Key:'logo.png'};
// s3.getObject(params).createReadStream().pipe(file);

