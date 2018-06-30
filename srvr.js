var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
app.use(express.static(__dirname));
var hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), ()=>{
	console.log('listening');
});
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: ""
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to mysql");
});
con.query('use badminton;', function(err, results) {
	if (err) throw err;
	console.log("db selected");
});
app.get('/', (req, res)=>{
	res.render('index');
});




app.post('/compare', (req, res)=>{
	var selected_videos = req.body.sort();
	con.query('select backhand, forehand, lob, smash from per_match_table where match_name in(?) order by match_name;',[req.body], function(err, results) {
		var data2 = [];
		if (err) throw err;
		for(i in results){
			var values = [{ "label": "Smash", "y": results[i].smash }, { "label": "Forehand", "y": results[i].forehand },
			{ "label": "Backhand", "y":results[i].backhand}, { "label": "Lob", "y": results[i].lob }];
			var match_entry = {"name":selected_videos[i], "dataPoints":values};
			data2.push(match_entry);	
		}
		res.json({"points": data2});
	});
});




app.post('/login', (req, res)=>{
	con.query('select * from player_info_table where uname=\''+req.body.username+'\';', function(err, results) {
		if (err) throw err;
		console.log(results[0]);
		uname = results[0].uname;
		name = results[0].name;
		profile_picture = results[0].profile_picture;
		rank = results[0].rank;
		matches_played = results[0].matches_played;
		avg_backhand = results[0].avg_backhand;
		avg_forehand = results[0].avg_forehand;
		avg_lob = results[0].avg_lob;
		avg_smash = results[0].avg_smash;
		avg_dominance = results[0].avg_dominance;
		avg_strokes_per_point = results[0].avg_strokes_per_point;
		avg_speed = results[0].avg_speed;
		avg_react = results[0].avg_react;
		avg_frequency = results[0].avg_frequency;
		avg_heart_rate = results[0].avg_heart_rate;
		avg_calories_burnt = results[0].avg_calories_burnt;
		avg_match_duration = results[0].avg_match_duration;
		avg_weight = results[0].avg_weight;
		latest_video_link = results[0].latest_video_link;
		res.render('player', {
			name :name,
			profile_picture :profile_picture,
			rank :rank,
			matches_played :matches_played,
			avg_backhand :avg_backhand,
			avg_forehand :avg_forehand,
			avg_lob :avg_lob,
			avg_smash :avg_smash,
			avg_dominance :avg_dominance,
			avg_strokes_per_point :avg_strokes_per_point,
			avg_speed :avg_speed,
			avg_react :avg_react,
			avg_frequency :avg_frequency,
			avg_heart_rate :avg_heart_rate,
			avg_calories_burnt :avg_calories_burnt,
			avg_match_duration :avg_match_duration,
			avg_weight :avg_weight,
			latest_video_link : "<source src=\"videos/"+latest_video_link+"\" type=\"video/mp4\">"
		});
	});
});