const Hapi = require("hapi");
const Sqlite3 = require("sqlite3");
const db = new Sqlite3.Database("./dindin.sqlite");
const server = new Hapi.Server();
server.connection({port: 4000});

server.bind({
	db: db,
	apiBaseUrl: "http://localhost:4000/api",
	webBaseUrl: "http://localhost:4000"
});

const validateFunc = (token, callback) => {
	db.get("SELECT * FROM users WHERE token = ?", [token], (err,result) => {
		if(er) return callback(err, false);

		const user = result;
		if(typeof user === "undefined"){
			return callback(null, false);
		}
		callback(null, true, {
			id: user.id,
			username: user.username
		});
	});
};

server.register([
	require("dindin-api"), 
	require("inert"),
	require("vision")
	], (err) => {
	if(err) throw err;
	
	server.views({
		engines:{
			hbs: require("handlebars")
		},
		relativeTo: __dirname,
		path: "./views",
		layoutPath: "./views/layouts",
		helpersPath: "./views/helpers",
		layout:true,
		isCached: false,
		partialsPath: "./views/partials"
	})

	server.route(require("./routes"));

	server.start((err) => {
		if(err) throw err;

		console.log("Server running at: ", server.info.uri);
	});

})

