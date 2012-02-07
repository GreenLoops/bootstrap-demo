var url = require("url"),
    _ = require("underscore"),
    Cookies = require("cookies");

function authorize(portfolios, portfolioId)
{
    var authorized =  _.any(portfolios, function(portfolio) {
        return portfolio.portfolioId === portfolioId;
    });

    return authorized;
}

module.exports = function(devMode, userService)
{
    return function(req, res, next)
    {
        var purl = req.urlp = url.parse(req.url, true);
        var cookies = new Cookies(req, res);
        var portfolioMatch = purl.pathname.match(/\/a\/([a-z0-9\-]*)$/);
        var portfolioId;

        if(portfolioMatch !== null)
        {
            portfolioId = portfolioMatch[1];
        }

        if(req.session && req.session.auth === true)
        {
            if(purl.pathname === "/index.html" || purl.pathname === "/")
            {
                cookies.set("email", req.session.user.email);
                res.writeHead(302, { Location: "/a/"+req.session.user.defaultPortfolio+"#/" });
                res.end();
            }
            else if(portfolioId && authorize(req.session.user.portfolios, portfolioId))
            {
                cookies.set("email", req.session.user.email);
                next();
            }
            else if(portfolioId)
            {
                res.writeHead(403);
                res.end();
            }
            else {
                next();
            }
        }
        else if(portfolioId && devMode)
        {
            var email = cookies.get("email");

            if(email) {
                userService.isRegistered(email, function(users) {
                    if(users === null)
                    {
                        res.writeHead(302, { Location: "/signup.html" });
                        res.end();
                    }
                    else if(authorize(users[0].portfolios, portfolioId))
                    {
                        req.session.auth = true;
                        req.session.user = users[0];
                        next();
                    }
                    else
                    {
                        res.writeHead(403);
                        res.end();
                    }
                });
            }
            else
            {
                res.writeHead(302, { Location: "/auth/authenticate" });
                res.end();
            }
        }
        else if(purl.pathname.match(/\/a\/[a-z0-9\-]*$/))
        {
            res.writeHead(302, { Location: "/auth/authenticate" });
            res.end();
        }
        else
        {
            next();
        }
    };
};

