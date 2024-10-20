var url = require('url')

let str = "http://localhost:7777/login?name=Vishal";

console.log(url.parse(str).pathname)