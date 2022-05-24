const axios = require("axios");
const express = require("express");
const app = express();
let cors = require("cors");

var fs = require("fs");
var https = require("https");
var privateKey = fs.readFileSync("./sslcert/privkey.pem", "utf8");
var certificate = fs.readFileSync("./sslcert/cert.pem", "utf8");

var credentials = { key: privateKey, cert: certificate };

const port = process.env.PORT || 5000;
app.use(cors());

app.get("/distanceMetrixCaller/:origins/:destination", function (req, res) {
	let origins = encodeURI(req.params.origins);
	let destination = encodeURI(req.params.destination);

	// Washington%2C%20DC
	// New%20York%20City%2C%20NY

	let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${origins}&destinations=place_id:${destination}&mode=transit&key=AIzaSyDAPkb9swgCy7sy02SeLUuT8B7apC0Hh94`;

	console.log("Request for distance calculator");

	axios({
		method: "get",
		url: url,
		headers: { "Content-Type": "application/json; charset=utf-8" },
	})
		.then(function (response) {
			// res.send(origins + " " + destination);
			res.send(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});
});

app.get("/propositionPlace/:origins/:destination", function (req, res) {
	let origins = encodeURI(req.params.origins);
	let destination = encodeURI(req.params.destination);

	// Washington%2C%20DC
	// New%20York%20City%2C%20NY

	let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyDAPkb9swgCy7sy02SeLUuT8B7apC0Hh94`;
	console.log("Request for find place");
	axios({
		method: "get",
		url: url,
		headers: { "Content-Type": "application/json; charset=utf-8" },
	})
		.then(function (response) {
			// res.send(origins + " " + destination);
			res.send(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});
});
var server = https.createServer(credentials, app);

server.listen(port, () => {
	console.log("server starting on port : " + port);
});
