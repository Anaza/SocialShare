var jam = {
    "packages": [
        {
            "name": "social-icons",
            "location": "vendor/social-icons"
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