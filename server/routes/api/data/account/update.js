const router = require('express').Router(),
  mysql = require('../../../../models/mysql'),
  multer = require('multer'),
  AWS = require('aws-sdk'),
  CONFIG_MYSQL = require('../../../../config/mysql_config')

// PUT /api/data/account/:id
router.put('/:id', (req, res) => {
  const account_id = req.params.id
  const data = {
    domain,
    thumbnail_url,
    account_image_url_1,
    account_name,
    account_name_english,
    company_short_description,
    company_short_description_english,
    company_description,
    company_description_english,
    products,
    website,
    phone,
    established_date,
    mailing_country,
    mailing_state,
    mailing_city,
    mailing_postal_code,
    mailing_street_address,
    mailing_street_address_2,
    history,
    mailing_country_english,
    mailing_state_english,
    mailing_city_english,
    mailing_postal_code_english,
    mailing_street_address_english,
    mailing_street_address_2_english,
    history_english
  } = req.body
  console.log(data)

  mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_ACCOUNTS} SET ? WHERE account_id = ${account_id}`, data,
    (err) => {
      if(err) throw err
      res.status(200).json({msg: 'account updated'})
    })
})

// PUT /api/data/account/image/:id
const BUCKET_NAME = 'factoryhunt.com'
AWS.config.region = 'us-west-1' //지역 설정
const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })
router.put('/image/:id', upload.array('image', 1), (req, res) => {
  const account_id = req.params.id
  const db_column = req.body.db_column
  const {
    mimetype,
    buffer
  } = req.files[0]
  const key = db_column === 'thumbnail_url' ? 'logo' : 'cover'

  const params = { // AWS S3업로드에 대한 정보 입니다.
    Bucket: BUCKET_NAME, // S3 Bucket 이름을 지정합니다.
    Key: `accounts/${account_id}/${key}`, // Key : S3의 경로 및 파일 이름을 지정합니다.
    ACL: 'public-read', // ACL : 파일 권한에 대한 설정입니다.
    ContentType: mimetype,
    Body: buffer
  }
  const s3 = new AWS.S3()

  const uploadToS3 = new Promise((resolve, reject) => {
    s3.upload(params).send((err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })

  const urlUpdate = (result) => {
    let data;
    if (db_column === 'thumbnail_url') {
      data = {
        thumbnail_url: result.Location
      }
    } else if (db_column === 'account_image_url_1') {
      data = {
        account_image_url_1: result.Location
      }
    }
    mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_ACCOUNTS} SET ? WHERE account_id = ${account_id}`, data,
      (err) => {
        if (err) throw err

        res.status(200).json({
          result: true,
          msg: 'Account image updated'
        })
      })
  }

  const onError = () => {
    res.status(403).json({
      result: false,
      msg: 'Image upload failed.'
    })
  }

  uploadToS3
    .then(urlUpdate)
    .catch(onError)
})

module.exports = router