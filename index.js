var app = require('express')();
var request = require('request');
var $ = require('cheerio');
var port = process.env.PORT || 3000;

app.get('/jackpot', function(req, res) {
	request('http://www.powerball.com/', function(error, response, html) {
		if (!error && response.statusCode === 200) {
			var parsedHTML = $.load(html);
			var jackpotArr = [];
			var jackpot = parsedHTML('#jackpot h1').text();
			var amount = jackpot.match(/\d+/);

			jackpotArr.push(amount * 1000000 * 100);
			res.send({amount: jackpotArr});
		}
	});
});

app.listen(port, function() {
	console.log('I just won $' + port + ' million dollars.');
});
