var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:url_name', function(req, res) {
	var url_name = req.params.url_name;
	models.Page.findOne({"url_name":url_name}, function(err, pageObj) {
		res.render('wiki', {title: "WikiStack", docs:pageObj, headline:pageObj.title.toUpperCase()});
	});
});

module.exports = router;
