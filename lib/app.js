var connect  = require("connect"),
    os       = require("os"),
    fs       = require("fs"),
    http     = require("request"),
    lymph    = require("lymph"),
    commands = require("./commands");
    queries  = require("./queries");

var less = require("less");
var devMode = (process.argv.length > 2 && process.argv[2] === "prod") ? false : true;

var ipAddress = "127.0.0.1";
var ifs = os.networkInterfaces();

for(var y in ifs.eth1){
    if(ifs.eth1[y].family === "IPv4" && !ifs.eth1[y].internal){
        ipAddress = ifs.eth1[y].address;
    }
}

lymph.initRepo("bdemo", function(repo) {

    var appContext = {
        devMode: devMode,
        repo: repo
    };

    var appHandler = function(contextId, type, callback){
        callback("main.html", {message:"hello"});
    };

    if(devMode) console.log("running in dev mode on ", ipAddress);

    var server = connect.createServer(
        connect.cookieParser(),
        connect.session({secret: 'FlurbleGurgleBurgle', store: new connect.session.MemoryStore({ reapInterval: -1 }) }),
        connect.bodyParser(),
        connect.query(),
        connect.router(lymph.QueryRouter(appContext, queries)),
        connect.router(lymph.CommandRouter(appContext, commands)),
        connect.router(lymph.AppRouter(devMode, fs, appHandler)),
        lymph.LessEngine.filter(fs, "public"),
        connect.static(__dirname + "../../public")
    );

    server.listen(8080);
});

