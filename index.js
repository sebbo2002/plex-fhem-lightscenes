const express = require('express'), 
      multer  = require('multer'),
      request = require('request')

      upload = multer({ dest: '/tmp/' }),
      app = express();

if (!process.env.LIGHTSCENE) {
	return cb(new Error('Unable to start: LIGHTSCENE empty'));
}

app.get('/ping', function(req, res) {
	res.send('pong');
});

app.post('/', upload.single('thumb'), function(req, res) {
	let payload = JSON.parse(req.body.payload),
		scene = null;

	res.sendStatus(201);
	
	// check player
	if(
		!payload.owner ||
		!payload.Player || 
		!payload.Player.local || 
		payload.Player.title.indexOf('Apple TV') === -1
	) {
		return;
	}

	if(['media.play', 'media.resume'].indexOf(payload.event) !== -1 && payload.Metadata.librarySectionType === 'movie') {
		scene = process.env.SCENE_PLAY_MOVIE || process.env.SCENE_PLAY || 'play';
	}
	else if(['media.play', 'media.resume'].indexOf(payload.event) !== -1 && payload.Metadata.librarySectionType === 'show') {
		scene = process.env.SCENE_PLAY_SHOW || process.env.SCENE_PLAY || 'play';
	}
	else if(['media.play', 'media.resume'].indexOf(payload.event) !== -1 && payload.Metadata.cinemaTrailer) {
		scene = process.env.SCENE_PLAY_TRAILER || process.env.SCENE_PLAY || 'play';
	}
	else if(payload.event === 'media.pause') {
		scene = process.env.SCENE_PAUSE || 'home';
	}
	else if(payload.event === 'media.stop') {
		scene = process.env.SCENE_STOP || 'home';
	}
	else {
		return;
	}

	request({
		uri: (process.env.URL || 'http://fhem') + '/fhem?cmd.setScene=set%20' + process.env.LIGHTSCENE + '%20scene%20' + scene + '&XHR=1'
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