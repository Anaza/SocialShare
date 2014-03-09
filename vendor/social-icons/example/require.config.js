var jam = {
    "packages": [ ],
    "version": "1.0.0",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [],
    "shim": {}
});
}
else {
    var require = {
    "packages": [ ],
    "shim": {}
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}