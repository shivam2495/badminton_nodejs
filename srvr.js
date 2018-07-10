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
	con.query('select * from per_match_table where match_name in(?) order by match_name;',[req.body],
	function(err, results) {
		var data1 = [], data2 = [];
		if (err) throw err;
		for(i in results){
			var values1 = [{ "label": "Smash", "y": results[i].smash }, { "label": "Forehand", "y": results[i].forehand },
			{ "label": "Backhand", "y":results[i].backhand}, { "label": "Lob", "y": results[i].lob }];
			var match_entry1 = {"name":selected_videos[i], "dataPoints":values1};
			var values2 = [{ "label": "Dominance (%)", "y": results[i].dominance }, { "label": "Reaction time (sec)", "y": results[i].react },
			{ "label": "Strokes per point", "y": results[i].strokes_per_point }, { "label": "Speed (m/s)", "y":results[i].speed}, 
			{ "label": "Frequency of movement", "y": results[i].frequency }];
			var match_entry2 = {"name":selected_videos[i], "dataPoints":values2};
			data1.push(match_entry1);
			data2.push(match_entry2);
		}
		res.json({"points": data1, "stats": data2});
	});
});
app.post('/match_list', (req, res)=>{
	con.query('select match_name, video_link from per_match_table where uname=(?);',req.body, function(err, results) {
		var match_list = [];
		var match_link_list =[];
		for(i in results){
			match_list.push(results[i].match_name);
			match_link_list.push(results[i].video_link);
		}
		res.json({"match_list": match_list, "match_link_list": match_link_list});
	});
});
app.post('/avg', (req, res)=>{
	con.query('select * from player_info_table where uname=(?);',req.body, function(err, results) {
		res.json({"forehand": results[0].avg_forehand,"speed":results[0].avg_speed,"lob": results[0].avg_lob,"smash":results[0].avg_smash,
			"duration":results[0].avg_match_duration, "weight":results[0].avg_weight,"calories":results[0].avg_calories_burnt,
			"backhand": results[0].avg_backhand,"reaction":results[0].avg_react,"heart_rate":results[0].avg_heart_rate});
	});
});
app.post('/latest', (req, res)=>{
	con.query('select * from per_match_table where uname=(?) order by date desc;',req.body, function(err, results) {
		res.json({"video_link": results[0].video_link, "forehand": results[0].forehand, "backhand": results[0].backhand,"lob": results[0].lob,
			"smash": results[0].smash,"duration":results[0].match_duration, "weight":results[0].weight,"calories":results[0].calories_burnt,
			"speed":results[0].speed,"reaction":results[0].react,"heart_rate":results[0].heart_rate, "doc_recom":results[0].recommendations});
	});
});
app.post('/past', (req, res)=>{
	con.query('select * from per_match_table where video_link=(?);',req.body, function(err, results) {
		res.json({"video_link": results[0].video_link, "forehand": results[0].forehand, "backhand": results[0].backhand,"lob": results[0].lob,
			"smash": results[0].smash,"duration":results[0].match_duration, "weight":results[0].weight,"calories":results[0].calories_burnt,
			"speed":results[0].speed,"reaction":results[0].react,"heart_rate":results[0].heart_rate, "doc_recom":results[0].recommendations});
	});
});

app.post('/login', (req, res)=>{
	con.query('select * from player_info_table where uname=\''+req.body.username+'\';', function(err, results) {
		if (err) throw err;
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
			uname :uname,
			name :name,
			profile_picture :"images/"+profile_picture,
			rank :rank,
			matches_played :matches_played,
			// avg_backhand :avg_backhand,
			// avg_forehand :avg_forehand,
			// avg_lob :avg_lob,
			// avg_smash :avg_smash,
			// avg_dominance :avg_dominance,
			// avg_strokes_per_point :avg_strokes_per_point,
			// avg_speed :avg_speed,
			// avg_react :avg_react,
			// avg_frequency :avg_frequency,
			// avg_heart_rate :avg_heart_rate,
			// avg_calories_burnt :avg_calories_burnt,
			// avg_match_duration :avg_match_duration,
			// avg_weight :avg_weight,
			latest_video_link : "<source src=\"videos/"+latest_video_link+"\">"
		});
	});
});