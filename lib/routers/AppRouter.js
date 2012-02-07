var fs    = require("fs"),
    _     = require("underscore");

module.exports = function(app) {

    app.get("/a/:contextId", function(req, res, next) {

        fs.readFile("./templates/mainDesktop.html", "utf-8", function (err, data) {

            if (err) {
                throw err;
            }

            var context = {
                name: "main context"
            };

            var compiled = _.template(data);
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.end(compiled({
                context: context
            }));
        });
    });
};

