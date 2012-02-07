var connect  = require("connect"),
    os       = require("os"),
    fs       = require("fs"),
    http     = require("request"),
    lymph    = require("lymph"),
    routers  = require("./routers"),
    commands = require("./commands");
    queries  = require("./queries");

var devMode = (process.argv.length > 2 && process.argv[2] === "prod") ? false : true;

var ipAddress = "127.0.0.1";
var ifs = os.networkInterfaces();

for(var y in ifs.eth1){
    if(ifs.eth1[y].family === "IPv4" && !ifs.eth1[y].internal){
        ipAddress = ifs.eth1[y].address;
    }
}

lymph.initRepo("bdemo", function(repo) {

    var commandHandlers = {
        greetings: new commands.GreetingCommandHandler(repo)
    };

    var queryHandlers = {
        main: new queries.MainQueryHandler(repo)
    };

    if(devMode) console.log("running in dev mode on ", ipAddress);

    var server = connect.createServer(
        connect.cookieParser(),
        connect.session({secret: 'FlurbleGurgleBurgle', store: new connect.session.MemoryStore({ reapInterval: -1 }) }),
        connect.bodyParser(),
        connect.query(),
        connect.router(lymph.QueryRouter(devMode, queryHandlers)),
        connect.router(lymph.CommandRouter(devMode, commandHandlers)),
        //connect.router(routers.AppRouter),
        //filters.LessEngine.filter(fs, "public"),
        connect.static(__dirname + "../../public")
    );

    server.listen(8080);
});

