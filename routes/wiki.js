var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:url_name', function(req, res) {
	var url_name = req.params.url_name;
	models.Page.findOne({"url_name":url_name}, function(err, pageObj) {
		res.render('wiki', {title: "WikiStack", docs:pageObj, headline:pageObj.title.toUpperCase()});
	});
});

router.post('/pageAction', function(req, res) {
	var url_name=req.body.url_name;
	console.log(url_name);
	var action= req.body.submit;
	if(action==="Delete") {
		models.Page.findOne({"url_name":url_name}, function(err, pageObj) {
			pageObj.remove();
			res.redirect('/');
		});
	}
	else if(action==="Edit") {
		models.Page.findOne({"url_name":url_name}, function(err, pageObj) {
			res.render('add', {title:"WikiStack", headline:"EDIT A PAGE", doc:pageObj});
		});
	} else {
		console.log("Are we getting to the end of the post?");
	}
});

module.exports = router;
