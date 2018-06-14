var express = require('express');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
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
	console.log('listening')
});
app.get('/', (req, res)=>{
	res.render('index')
});
app.post('/login', (req, res)=>{
	res.render('player', {
		name: req.body.username
	});
});
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});