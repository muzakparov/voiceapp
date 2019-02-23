var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	res.json([
		{
			action: "talk",
			text: "Connecting you now."
		}
	]);
	// res.render('index', { title: 'Express' });
});

module.exports = router;
