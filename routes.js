"use strict";

const Assets = require("./handlers/assets");
const Pages = require("./handlers/pages");
const Actions = require('./handlers/actions');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: Pages.home
},{
    method: 'GET',
    path: '/recipes/{id}',
    handler: Pages.viewRecipe
},{
	method: ["GET", "POST"],
	path: "/login",
	handler(request, reply){
		if(request.method === "get") Pages.login(request, reply)
		else if (request.method === "post") Actions.login(request, reply)
	}
},{
	method: ["GET", "POST"],
	path: "/create",
	handler(request, reply){
		if(request.method === "get") Pages.createRecipe(request, reply)
		else if(request.method === "post") Actions.createRecipe(request, reply)
	},
	config:{
		auth: {
			mode: 'required'
		}
	}
},{
	method: "GET",
	path: "/logout",
	handler: Actions.logout
},{
    method: 'GET',
    path: '/{param*}',
    handler: Assets.servePublicDirectory
}];




// module.exports = [{
// 	method:"GET",
// 	path:"/",
// 	handler: Pages.homes
// },{
// 	method:"GET",
// 	path:"/{param*}",
// 	handler: Assets.servePublicDirectory
// },{
// 	method: "GET",
// 	path: "/api/recipes",
// 	handler: Recipes.find
// },{
// 	method: "GET",
// 	path: "/api/recipes/{id}",
// 	handler: Recipes.findOne
// }, {
// 	method: "POST",
// 	path: "/api/recipes",
// 	config: {
// 		auth: "api"
// 	},
// 	handler: Recipes.create
// }, {
// 	method: "POST",
// 	path: "/api/recipes/{id}/star",
// 	config: {
// 		auth: "api"
// 	},
// 	handler: Recipes.addStar
// }]