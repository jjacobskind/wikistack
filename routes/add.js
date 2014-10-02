var express = require('express');
var router = express.Router();
	var models = require('../models/');

var title_process = function (title) {
	if(!!title) {
		return title.replace(/ +/g, "_").replace(/\W/g, "_").replace(/[_]+/g, "_");
	} else {
		return Math.random().toString(36).substring(2,7);
	}
}


/* GET users listing. */
router.get('/', function(req, res) {
  res.render('add', { title: 'WikiStack', headline:"ADD A PAGE" });
});

router.post('/submit', function(req, res) {
	var title = req.body.title;
	var content = req.body.body;
	var url_name = title_process(title);
	var p = new models.Page({"title":title, 
							"body":content, 
							"url_name":url_name, 
							"versions": []
						});
	p.save();
	res.redirect('/');
});


router.post('/edit', function(req, res) {
	var id = req.body.id;
	
	models.Page.findOne({"_id":id}, function(err, pageObj) {
		pageObj.versions.push({"title":pageObj.title, 
								"body":pageObj.body, 
								"url_name":pageObj.url_name});

		pageObj.title = req.body.title;
		pageObj.body = req.body.body;
		pageObj.url_name = title_process(req.body.title);
		pageObj.save();
	});
  	res.redirect('/');
});


module.exports = router;
