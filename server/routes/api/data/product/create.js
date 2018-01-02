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
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      const product_id = req.product_id
      const file_name = file.originalname
      cb(null, `products-eng/${product_id}/thumbnail_images/${file_name}`)
    }
  })
})
const fields = [
  {name: 'images'},
  {name: 'pdf'}
]
router.post('/:account_id', productCreate, createProductImageMulter.fields(fields), (req, res) => {
  // console.log(req.files)
  const product_id = req.product_id
  const updateTextData = () => new Promise((resolve, reject) => {
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

    mysql.query(`UPDATE ${CONFIG_MYSQL.TABLE_PRODUCTS} SET ? WHERE product_id = ${product_id}`, data,
      (err) => {
        if (err) return reject(err)
        resolve()
      })
  })

  const updateImageUrl = () => new Promise((resolve, reject) => {
    const product_id = req.product_id
    let imageData = {}

    for (let i = 0; i < req.files.images.length; i++) {
      if (i === 0) {
        imageData.product_image_url_1 = req.files.images[i].location
      }
      if (i === 1) {
        imageData.product_image_url_2 = req.files.images[i].location
      }
      if (i === 2) {
        imageData.product_image_url_3 = req.files.images[i].location
      }
      if (i === 3) {
        imageData.product_image_url_4 = req.files.images[i].location
      }
      if (i === 4) {
        imageData.product_image_url_5 = req.files.images[i].location
      }
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

  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'Image upload succeed.'
    })
  }
  const onError = (err) => {
    console.log(err)
    res.status(403).json({
      result: false,
      msg: 'Image upload failed.'
    })
  }

  updateTextData()
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
      // const product_id = req.params.product_id
      // const file_name = file.originalname
      const date = Date.now().toString()
      cb(null, `products-eng/editor_images/${date}`)
    }
  })
})
router.post('/editor/:account_id/', createEditorImageMulter.array('images', 1), (req, res) => {
  res.send(req.files[0].location)
})

module.exports = router

function productCreate (req, res, next) {
  const account_id = req.params.account_id
  const createEmptyRecord = () => new Promise((resolve, reject) => {
    let data = {}
    data.account_id = account_id
    data.product_status = 'pending'

    mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_PRODUCTS} SET ?`, data,
      (err, rows) => {
        if (err) return reject(err)
        resolve(rows.insertId)
      })
  })

  const onError = () => {
    res.status(403).json({
      result: false,
      msg: 'Product create failed.'
    })
  }

  createEmptyRecord().then((id) => {
    req.product_id = id
    console.log('new product id: ', req.product_id)
    next()
  }).catch(onError)
}