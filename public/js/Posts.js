app.Posts = function(dataStore, options){
    var self = this;
    self.dataStore = dataStore;
};

app.Posts.prototype.postit = function(domainName, commandName, data, fn, donotRefresh){
    var self = this;
    $.ajax({
        url: "/c/1/"+domainName+"/"+commandName,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(){
            self.dataStore.init(fn);
        },
        error: function (res) {
            app.logger.log(res);
        }
    });
};

app.Posts.prototype.createGreeting = function(greeting, fn){
    var self = this;
    greeting.greetingId = Math.uuid(32);
    self.postit("greeting", "createGreeting", greeting, fn);
};

