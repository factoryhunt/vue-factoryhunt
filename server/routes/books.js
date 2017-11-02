var express = require('express');
var router = express.Router();
var mysql = require('../models/mysql');

// CREATE BOOK
router.post('/', function(req, res){

  var published_date = new Date(req.body.published_date);
  var book = {
    title: req.body.title,
    author: req.body.author,
    published_date: published_date
  };
  var query = mysql.query(
    "INSERT INTO books SET ?", book,
    function(err, result){
      if(err){
        console.log(err);
        throw err;
      }
      res.status(200).send("success");
    });
  console.log('query:' + query);
  console.log('result:' + result);
});

// GET ALL BOOKS
router.get('/', function(req, res){
  mysql.query("select * from books", function(err, books){

    if(err) return res.status(500).send({error:"server error"})
    res.status(200).json(books);
  })
});
// GET SINGLE BOOK
router.get('/:book_id', function(req, res){

  mysql.query("select * from books where book_id = ?",
    req.params.book_id, function(err, book){

      if(err) return res.status(500).json({error: err});
      if(Object.keys(book).length == 0) return;

      res.status(404).json({error: "book not found"});
      res.json(book);
    })
});

// UPDATE THE BOOK
router.put('/:book_id', function(req, res){

  mysql.query("select * from books where book_id = ?",
    req.params.book_id,
    function(err, books){

      if(err)
        return res.status(500).json({error: 'database error'});

      if(Object.keys(books).length == 0)
        return res.status(404).json({error: 'book not found'});

      if(req.body.title) books[0].title = req.body.title;

      if(req.body.author) books[0].author = req.body.author;

      if(req.body.published_date)
        books[0].published_date = req.body.published_date;

      var query = connection.query(
        "update books set title = ?, author = ?, published_date = ? where book_id = ?",
        [books[0].title,
          books[0].author,
          books[0].published_date,
          books[0].book_id], function(err){

          if(err) res.status(500).json({error: "failed to update"});
          res.json({message: 'book updated'});
        })
    })
});

// DELETE BOOK
router.delete('/:book_id', function(req, res){

  mysql.query("delete from books where book_id = ?", req.params.book_id, function(err, results){

    if(err) return res.status(500).json({error: 'database err'});
    res.status(204).end();
  })
});

module.exports = router;