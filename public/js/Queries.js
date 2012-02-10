app.Queries = function(options){
    var self = this;

    self.data = {
        greetings:[] 
    };
};

app.Queries.prototype.clear = function(){
    var self = this;
    self.data = {
        greetings:[] 
    };
};

app.Queries.prototype.byName = function(queryName, fn){
    var self = this;
    $.getJSON("/q/"+app.contextId+"/main/"+queryName+"/all", function(r) {
        fn(r);
    }).error(function(e) {
        console.log("oops");
    });
};

app.Queries.prototype.byNameAndId = function(queryName, queryId, fn){
    var self = this;
    $.getJSON("/q/"+app.contextId+"/"+queryName+"/"+queryId, function(r) {
        fn(r);
    }).error(function(e) {
        console.log("oops");
    });
};

app.Queries.prototype.init = function(fn){
    var self = this;

    self.byName("greetings", function(greetings){
        self.data.greetings = greetings;
        fn();
    });
};

app.Queries.prototype.allGreetings = function(fn){
    var self = this;

    fn(self.data.greetings);
};

app.Queries.prototype.greetingById = function(greetingId, fn){
    var self = this;

    var greeting = _.find(self.data.greetings, function(g){
        return g.greetingId === greetingId;
    });

    fn(greeting);
};

