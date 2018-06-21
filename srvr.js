var express = require('express');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
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
})
app.get('/', (req, res)=>{
	res.render('index')
});
app.post('/login', (req, res)=>{
	con.query('select * from player_info_table where uname=\''+req.body.username+'\';', function(err, results) {
		if (err) throw err;
		console.log(results[0]);
		uname = results[0].uname;
		name = results[0].name;
		rank = results[0].rank;
		backhand = results[0].backhand;
		forehand = results[0].forehand;
		lob = results[0].lob;
		smash = results[0].smash;
		dominance = results[0].dominance;
		strokes = results[0].strokes;
		serve = results[0].serve;
		speed = results[0].speed;
		react = results[0].react;
		frequency = results[0].frequency;
		steps = results[0].steps;
		video = results[0].video;
		style1="Smash";
		style2="Forehand";
		style3="Backhand";
		style4="Lob";
		res.render('player', {
		name :name,
		rank :rank,
		s1 :smash,
		s2 :forehand,
		s3 :backhand,
		s4 :lob,
		style1 :style1,
		style2 :style2,
		style3 :style3,
		style4 :style4,
		dominance :dominance,
		strokes :strokes,
		serve :serve,
		speed :speed,
		react :react,
		frequency :frequency,
		steps :steps,
		vid_link : "<source src=\"videos/"+"Wang-v-Nehwal.mp4"+"\" type=\"video/mp4\">"
		});
	});
});