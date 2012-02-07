$(document).ready(function(){

    var mainEl = document.getElementById("main-content");

    var greetingPage = new app.GreetingPage(mainEl);

    app.binding = new jsc.FormBinding({
        dateFormatter: function(value, format){
            return moment(value).format(format);
        } 
    });

    app.logging = new jsc.Logging();
    app.logging.addConsoleAppender();
    app.logger = app.logging.getLogger("default");

    app.queries = new app.Queries();

    var router = new jsc.Router({
        "/greeting":  function(ctx) { greetingPage.render(ctx); },
        "/":          function(ctx) { console.log("whatup");    }
    });

    router.onChange(function(){
        console.log("changed");
    });

    app.queries.init(function(){
        router.start();
    });
});
