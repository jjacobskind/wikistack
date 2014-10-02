var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
	// console.log("AAAAAAAAAAAAAA");
	// models.Page.distinct('title', function(err, titles) {
	// 	console.log(titles);
	// 	res.render('index', { title: 'WikiStack', headline:"BROWSE MY WIKISTACK" });
	// });
	models.Page.find({}, function (err, all_pages) {
		var checkObj = {};
		var objArr = [];
		all_pages.forEach(function(item) {
			if(checkObj[item.title]===undefined) {
				checkObj[item.title]=item;
			}
			else {
				checkObj[item.title].multiple=true;
			}
		});

		for(var obj in checkObj) {
			if(checkObj[obj].hasOwnProperty("multiple")) {
				checkObj[obj].url_name = "disambiguation/" + checkObj[obj].url_name;
			}
			objArr.push(checkObj[obj]);
		}
		res.render('index', { title: 'WikiStack', docs:objArr, headline:"BROWSE MY WIKISTACK" });
	});
});

module.exports = router;
