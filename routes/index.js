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
		var tester = {};
		if (tester["on"]===undefined)	tester["on"] = "asdf";
		tester.two = "asdfg";
		console.log(tester);
		var objArr = [];
		all_pages.forEach(function(item) {
			if(checkObj[item.title]===undefined) {
				checkObj[item.title]=item;
			}
			else {
				checkObj[item.title].multiple=true;
				// console.log(checkObj[item.title] + "*********");
			}
		});
		console.log(checkObj);
		for(var obj in checkObj) {
			// console.log(obj);
			if(obj.hasOwnProperty("multiple")) {
				obj.url_name = "disambiguation/" + obj.url_name;
			}
			objArr.push(obj);
		}
		res.render('index', { title: 'WikiStack', docs:objArr, headline:"BROWSE MY WIKISTACK" });
	});
});

module.exports = router;
