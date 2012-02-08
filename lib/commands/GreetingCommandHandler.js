var util = require("util"),
    lymph = require("lymph");

var CH = function(appContext){
    lymph.CommandHandler.call(this, appContext.repo, "greetings", "greetingId");
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

