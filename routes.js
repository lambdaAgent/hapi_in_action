"use strict";

const Recipes = require("./handlers/recipes");
const Pages = require("./handlers/pages");
const Assets = require("./handlers/assets");

module.exports = [{
    method: 'GET',
    path: '/',
    handler: Pages.home
}, {
    method: 'GET',
    path: '/{param*}',
    handler: Assets.servePublicDirectory
},{
    method: 'GET',
    path: '/recipes/{id}',
    handler: Pages.viewRecipe
},];


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