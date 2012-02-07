var util = require("util"),
    lymph = require("lymph");

var CH = function(repo){
    lymph.CommandHandler.call(this, repo, "greetings", "greetingId");

    console.log("init CH");
};
util.inherits(CH, lymph.CommandHandler);

CH.prototype.createGreeting = function(greeting, callback){
    var self = this;

    greeting.message = greeting.message.toUpperCase();

    self.insert(greeting, function() {
        callback();
    });
};

module.exports = CH;

