var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

/* SQL Query */
var sql_query = 'INSERT INTO appuser VALUES';

// GET
router.get('/', function(req, res, next) {
	res.render('signup', { title: 'Sign Up' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var username  = req.body.username.replace("'", "''");
	var name = req.body.name.replace("'", "''");
	var email = req.body.email.replace("'", "''");
	var password = req.body.password.replace("'", "''");
	var gender = req.body.gender;
	var address = req.body.address.replace("'", "''");
	var dob = req.body.dob;
	
	var today = new Date();
	var joindate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	
	// Construct Specific SQL Query
	var insert_query = sql_query 
			+ "('" + username + "','" + name + "','" 
			+ email + "','" + password + "','" 
			+ joindate + "','true','" 
			+ gender + "','" + address + "','" 
			+ dob + "')";
	console.log(insert_query);
	pool.query(insert_query, (err, data) => {
		res.redirect('/select')
	});
});

module.exports = router;
