const router = require('express').Router()
const mysql = require('../../../../models/mysql')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
AWS.config.region = 'us-west-1' //지역 설정
const BUCKET_NAME = 'factoryhunt.com'
const CONFIG_MYSQL = require('../../../../config/mysql_config')

// Create single product
// POST /api/data/product/:account_id
const createProductImageMulter = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      console.log('params', req.params)
      console.log('query', req.query)
      console.log('file', file)
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      // const product_name = req.body.product_name
      console.log('body', req.body)
      console.log('params', req.params)
      console.log('query', req.query)
      console.log('file', file)
      const product_id = req.params.account_id
      const file_name = file.originalname
      cb(null, `products/${product_id}/thumbnail_images/${file_name}`)
    }
  })
})
router.post('/:account_id', createProductImageMulter.array('images', 5), (req, res) => {
  const account_id = req.params.account_id

  const createProduct = () => new Promise((resolve, reject) => {
    let data = {
      product_name,
      product_domain,
      product_code,
      product_image_url_1,
      primary_product_category,
      secondary_product_category,
      product_origin,
      item_dimensions,
      material_type,
      minimum_order_quantity,
      product_description,
    } = req.body
    data.account_id = account_id
    data.product_status = 'pending'
    console.log(data)

    mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_PRODUCTS} SET ?`, data,
      (err, rows) => {
        if (err) return reject(err)
        resolve(rows.insertId)
      })
  })

  const updateImageUrl = (product_id) => new Promise((resolve, reject) => {
    let imageData = {}

    for (let i = 0; i < req.files.length; i++) {
      if (i === 0) {
        imageData.product_image_url_1 = req.files[i].location
      }
      if (i === 1) {
        imageData.product_image_url_2 = req.files[i].location
      }
      if (i === 2) {
        imageData.product_image_url_3 = req.files[i].location
      }
      if (i === 3) {
        imageData.product_image_url_4 = req.files[i].location
      }
      if (i === 4) {
        imageData.product_image_url_5 = req.files[i].location
      }
    }
    mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_PRODUCTS} SET ? WHERE product_id = ${product_id}`, imageData,
      (err) => {
        if (err) reject(err)
        resolve()
      })
  })

  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'Image upload success.'
    })
  }
  const onError = () => {
    res.status(403).json({
      result: false,
      msg: 'Image upload failed.'
    })
  }

  createProduct()
    .then(updateImageUrl)
    .then(onSuccess)
    .catch(onError)
})

// POST /api/data/product/editor/:account_id
const createEditorImageMulter = multer({
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
      cb(null, `products/${product_id}/editor_images/${file_name}`)
    }
  })
})
router.post('/editor/:account_id/', createEditorImageMulter.array('images', 1), (req, res) => {
  res.send(req.files[0].location)
})

module.exports = router