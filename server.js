const Hapi = require("hapi");
const Sqlite3 = require("sqlite3");
const db = new Sqlite3.Database("./dindin.sqlite");
const server = new Hapi.Server();
server.connection({port: 4000});

server.bind({
	apiBaseUrl: "http://localhost:4000/api",
	webBaseUrl: "http://localhost:4000"
});

server.register([
	require("dindin-api"), 
	require("inert"),
	require("vision"),
	require("hapi-auth-cookie")
], (err) => {
	if(err) throw err;
	
	server.auth.strategy("session", "cookie", "try", {
		password: "70fe4f26ff9bcb5aab079875cadeec09",
		isSecure: false
	})

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

