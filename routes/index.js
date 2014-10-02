var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
	models.Page.find({}, function (err, all_pages) {
		res.render('index', { title: 'WikiStack', docs:all_pages, headline:"BROWSE MY WIKISTACK" });
	});
});

module.exports = router;
