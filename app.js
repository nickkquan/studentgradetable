const express = require("express");
const path = require("path");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 9000;
const config = {
	user: "root",
	password: "root",
	host: "localhost",
	port: 3306,
	database: "SGT"
};

const connection = mysql.createConnection(config);

connection.connect(function(err) {
	if (err) {
		console.log("Yo we broke", err.stack);
	}

	console.log("Yo we work", connection.threadId);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
	res.send(express.static(path.join(__dirname, "client", "index.html")));
});

app.get("/students/get", (req, res) => {
	let sql = "SELECT * FROM ??";
	let inserts = ["students"];

	let query = mysql.format(sql, inserts);
	console.log("this is the query", query);

	connection.query(query, function(err, results) {
		if (err) throw err;

		let output = {
			success: true,
			data: results
		};

		res.json(output);
	});
});

app.post("/students/create", (req, res) => {
	let { name, course, grade } = req.body;

	let sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
	let inserts = ["students", "name", "course", "grade", name, course, grade];

	let query = mysql.format(sql, inserts);
	console.log("this is the query", query);

	connection.query(query, function(err, results) {
		if (err) throw err;

		let output = {
			success: true,
			new_id: results.insertId
		};

		res.json(output);
	});
});

// app.get("/students/update", (req, res) => {});

app.post("/students/delete", (req, res) => {
	let { student_id } = req.body;
	// let { student_id } = req.params; <-- This line will be used for a route along the lines of:
	// app.post("/students/delete/:student_id", (req, res) => {

	let sql = "DELETE FROM ?? WHERE ?? = ?";
	let inserts = ["students", "student_id", student_id];

	let query = mysql.format(sql, inserts);
	console.log("this is the query", query);

	connection.query(query, function(err, results) {
		if (err) throw err;

		let output = {
			success: true
		};

		res.json(output);
	});
});

app.listen(PORT, () => {
	console.log("Check it, our server started on PORT", PORT);
});
