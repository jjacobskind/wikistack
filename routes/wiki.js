var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:url_name', function(req, res) {
	var url_name = req.params.url_name;
	models.Page.findOne({"url_name":url_name}, function(err, pageObj) {
		console.log(pageObj);
		var multiple=false;
		if(pageObj.versions.length>0) {
			multiple=true;
		}
		res.render('wiki', {title: "WikiStack", doc:pageObj, headline:pageObj.title.toUpperCase(), multiple:multiple});
	});
});

router.post('/pageAction', function(req, res) {
	var page_id=req.body.page_id;
	console.log(page_id);
	var action= req.body.submit;
	if(action==="Delete") {
		models.Page.findOne({"_id":page_id}, function(err, pageObj) {
			pageObj.remove();
			res.redirect('/');
		});
	}
	else if(action==="Edit") {
		models.Page.findOne({"_id":page_id}, function(err, pageObj) {
			console.log(pageObj);
			res.render('add', {title:"WikiStack", headline:"EDIT '" + pageObj.title + "'", doc:pageObj, edit:true});
		});
	}
});

router.get('/disambiguation/:url_name', function(req, res) {
	var url_name = req.params.url_name;
	models.Page.find({"url_name":url_name}, function(err, pageArr) {
		pageArr.forEach(function(obj) {
			if(obj.body.length>30) {
				obj.body = obj.body.substring(0,30) + "...";
			}
		})
		console.log(pageArr);
		res.render('list', {title: "WikiStack", docs:pageArr, headline:"Which '" + pageArr[0].title.toUpperCase() + "' page are you looking for?"});
	})
});

router.get('/list/:id', function(req, res) {
	models.Page.find({"_id":req.params.id}, function(err, pageObj) {
		var retArr = pageObj.versions;
		res.render('list', {title: "WikiStack", docs:pageArr, headline:"PREVIOUS VERSIONS OF '" + pageObj.title.toUpperCase() + "'"});
	});
});

module.exports = router;
