$(document).ready(function(){

    var mainEl = document.getElementById("main-content");

    app.dataStore = new app.DataStore();
    app.posts = new app.Posts(app.dataStore);

    var greetingPage = new app.GreetingPage(mainEl);
    var greetingNewPage = new app.GreetingNewPage(mainEl);

    app.binding = new jsc.FormBinding({
        dateFormatter: function(value, format){
            return moment(value).format(format);
        } 
    });

    app.logging = new jsc.Logging();
    app.logging.addConsoleAppender();
    app.logger = app.logging.getLogger("default");

    var router = new jsc.Router({
        "/greeting":      function(ctx) { greetingPage.render(ctx);    },
        "/greeting/new":  function(ctx) { greetingNewPage.render(ctx); }
    });

    router.onChange(function(){

    });

    app.dataStore.init(function(){
        router.start();
    });
});
