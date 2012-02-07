var buster = require("buster"),
    sinon  = require("sinon"),
    QH     = require("../../lib/queries/MainQueryHandler");

buster.testCase("The Main Query Handler", {

    setUp: function (callback){
        var self = this;
        self.repo = {find:function(){}};
        self.main = new QH(self.repo);
        callback();
    },

    "should return a list of all greetings": function (done){
        var self = this,
            mockedRepo = sinon.mock(self.repo);

        var fromRepo = [
            { greetingId: "abc", sender: "joe", message: "HELLO, WORLD" }
        ];

        var sentToClient = [
            { greetingId: "abc", sender: "joe", message: "HELLO, WORLD" }
        ];

        mockedRepo.expects("find").withArgs("greetings", null).callsArgWith(2, fromRepo);
        
        self.main.greetings("all", function(rst) {
            assert.equals(rst, sentToClient);
            done();
        });
    }

});

