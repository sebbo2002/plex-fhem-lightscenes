const express = require('express'), 
      request = require('request'), 
      multer  = require('multer'),
      request = require('request')

      upload = multer({ dest: '/tmp/' }),
      app = express();


app.post('/', upload.single('thumb'), function(req, res, next) {
	let payload = JSON.parse(req.body.payload),
		scene = null;
	
	// check player
	if(
		!payload.owner ||
		!payload.Player || 
		!payload.Player.local || 
		payload.Player.title.indexOf('Apple TV') === -1
	) {
		return;
	}

	if(['media.play', 'media.resume'].indexOf(payload.event) !== -1 && [1, 2].indexOf(payload.Metadata.librarySectionID) !== -1) {
		scene = 'movie';
	}
	else if(['media.play', 'media.resume'].indexOf(payload.event) !== -1 && payload.Metadata.cinemaTrailer) {
		scene = 'trailer';
	}
	else if(payload.event === 'media.pause') {
		scene = 'trailer';
	}
	else if(payload.event === 'media.stop') {
		scene = 'home';
	}
	else {
		return;
	}

	request({
		uri: 'https://home.sebbo.net/fhem?cmd.setScene=set%20sebbo_LS%20scene%20' + scene + '&XHR=1'
	}, function(error, httpResponse, body) {
		if(error) {
			console.log(error);
		}
		if(body) {
			console.log(body);
		}
	});
});

app.listen(process.env.PORT || 8888);