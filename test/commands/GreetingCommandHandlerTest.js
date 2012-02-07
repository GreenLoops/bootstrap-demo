var buster = require("buster"),
    sinon  = require("sinon"),
    CH     = require("../../lib/commands/GreetingCommandHandler");

buster.testCase("The Greeting Command", {

    setUp: function (callback){
        var self = this;
        self.repo = {insert:function(){}};
        self.greeting = new CH(self.repo);
        callback();
    },

    "should insert new messages from client": function (done){
        var self = this,
            mockedRepo = sinon.mock(self.repo);

        var fromClient = {
            greetingId: "abc",
            sender: "joe",
            message: "hello, world"
        };

        var sentToDB = {
            greetingId: "abc",
            sender: "joe",
            message: "HELLO, WORLD"
        };

        mockedRepo.expects("insert").withArgs("greetings", "greetingId", sentToDB).callsArg(3);
        
        self.greeting.createGreeting(fromClient, function() {
            assert(true);
            mockedRepo.verify();
            done();
        });
    }

});

