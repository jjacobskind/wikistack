var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('add', { title: 'WikiStack', headline:"ADD A PAGE" });
});

router.post('/submit', function(req, res) {
	var models = require('../models/');
	var title = req.body.title;
	var content = req.body.body;
	if(!!title) {
		var url_name = title.replace(/ +/g, "_").replace(/\W/g, "_").replace(/[_]+/g, "_");
	} else {
		url_name = Math.random().toString(36).substring(2,7);
	}
	var p = new models.Page({"title":title, "body":content, "url_name":url_name});
	p.save();
	res.redirect('/');
});

module.exports = router;
