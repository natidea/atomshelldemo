
console.info("Entered amdMain");

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

// overwrite node entities
require = requirejs;
var module = undefined;

// configure the base url relative to the root HTML file
require.config({
    baseUrl: './',
    paths: {
        "jquery": "lib/jquery-1.10.2"
    }
});

console.info("Configured require");

// use an app launcher to complete configuration, load components and start the app
require(["jquery", "app"], ($, App) =>
{
    $(() =>
    {
        var el = document.getElementById('content');
        var greeter = new App.Greeter(el);
        greeter.start();
    });
});
