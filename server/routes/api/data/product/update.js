const router = require('express').Router()
const mysql = require('../../../../models/mysql')
const CONFIG_MYSQL = require('../../../../config/mysql_config')

// Update
// PUT /api/data/product/:product_id
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const BUCKET_NAME = 'factoryhunt.com'
AWS.config.region = 'us-west-1' //지역 설정
const s3 = new AWS.S3()
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const product_id = req.params.product_id
      const file_name = file.originalname
      cb(null, `products-eng/${product_id}/thumbnail_images/${file_name}`)
    }
  })
})
const uploadKeys = [
  {name: 'image_1'},
  {name: 'image_2'},
  {name: 'image_3'},
  {name: 'image_4'},
  {name: 'image_5'},
  {name: 'pdf'}
]
router.put('/:product_id', upload.fields(uploadKeys), (req, res) => {
  // constants
  const product_id = req.params.product_id

  // promises
  const updateProduct = () => new Promise((resolve, reject) => {
    const data = {
      product_name,
      product_domain,
      primary_product_category,
      secondary_product_category,
      product_code,
      product_origin,
      item_dimensions,
      material_type,
      minimum_order_quantity,
      product_description
    } = req.body
    mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_PRODUCTS} SET ? WHERE product_id = ${product_id}`, data, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
  const imageUrlUpdate = () => new Promise((resolve, reject) => {
    let imageData = {}
    if (req.files.image_1) {
      imageData.product_image_url_1 = req.files.image_1[0].location
    }
    if (req.files.image_2) {
      imageData.product_image_url_2 = req.files.image_2[0].location
    }
    if (req.files.image_3) {
      imageData.product_image_url_3 = req.files.image_3[0].location
    }
    if (req.files.image_4) {
      imageData.product_image_url_4 = req.files.image_4[0].location
    }
    if (req.files.image_5) {
      imageData.product_image_url_5 = req.files.image_5[0].location
    }
    if (req.files.pdf) {
      imageData.product_pdf_url = req.files.pdf[0].location
    }
    mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_PRODUCTS} SET ? WHERE product_id = ${product_id}`, imageData,
      (err) => {
        if (err) reject(err)
        resolve()
      })
  })

  // compute
  updateProduct()
    .then(imageUrlUpdate)
    .then(onSuccess(res))
    .catch(onError(res))
})

module.exports = router

function onSuccess (res) {
  return res.status(200).json({
    result: true,
    msg: 'Product edited success.'
  })
}
function onError (res) {
  return res.status(200).json({
    result: false,
    msg: 'Product edited failed.'
  })
}