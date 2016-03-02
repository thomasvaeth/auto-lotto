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

app.get('/numbers', function(req, res) {
	request('http://www.powerball.com/powerball/winnums-text.txt', function(error, response, html) {
		var recentNumbers = html.split('\n')[1];
		var winningNumbers = recentNumbers.trim().split(' ').slice(1);
		var winningArr = [];
		winningNumbers.forEach(function(num) {
			if (num !== '') winningArr.push(parseInt(num));
		});
		res.send({numbers: winningArr});
	});
});

app.listen(port, function() {
	console.log('I just won $' + port + ' million dollars.');
});
