const router = require('express').Router();
const mongoose = require('mongoose');
const { Client } = mongoose;
const Snippet = require('../models/snippet');

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/snippet_search', authRequired, (req, res) => {

  res.render('snippet_search');
});

router.get('/snippet_search/language', authRequired, (req, res) =>{

  Snippet.find({language: req.query.language})
    .then((results) => {
      res.render('snippet_search', {snippetLang: results});
    })
});

router.get('/snippet_search/tags', authRequired, (req, res) => {
  Snippet.find({tags: req.query.tags})
    .then((results) => {
      res.render('snippet_search', {snippetTag: results});
    })
});



function authRequired(req, res, next) {
  if(req.user) {
    next();
  }
  else {
    res.redirect('/login');
  }
};

router.get('/home', authRequired, (req, res) => {
  Snippet.find({})
    .then((results) => {
      res.render('home', {snippets: results, username: req.user.username});
    })
});

router.post('/snippets', (req, res) => {
  let newSnippet = new Snippet ({title: req.body.title, code: req.body.code, notes: req.body.notes, language: req.body.language, tags: req.body.tags});
  newSnippet
    .save()
    .then((result) => {
      console.log('posted');
      return result;
    });
    res.redirect('/home');
});









module.exports = router;
