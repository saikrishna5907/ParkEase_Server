//check environment
var env = process.env.NODE_ENV ||"development";
// fetch env.config

var config = require("./config.json");
var envConfig = config[env];

Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
