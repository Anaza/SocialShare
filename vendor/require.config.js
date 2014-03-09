var jam = {
    "packages": [
        {
            "name": "text",
            "location": "vendor/text",
            "main": "text.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jquery",
            "main": "jquery.js"
        },
        {
            "name": "social-icons",
            "location": "vendor/social-icons"
        },
        {
            "name": "raphael-amd",
            "location": "vendor/raphael-amd",
            "main": "raphael.amd.js"
        },
        {
            "name": "underscore",
            "location": "vendor/underscore",
            "main": "underscore.js"
        },
        {
            "name": "eve",
            "location": "vendor/eve",
            "main": "eve.js"
        },
        {
            "name": "Modernizr",
            "location": "vendor/Modernizr"
        }
    ],
    "version": "0.2.5",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({packages: jam.packages, shim: jam.shim});
}
else {
    var require = {packages: jam.packages, shim: jam.shim};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}