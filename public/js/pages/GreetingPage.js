app.GreetingPage = function(target){
    var self = this;

    jsc.BasePage.call(self, target, "greeting");

    self.mainTemplate = _.template('\
        <a href="#/greeting/new" class=btn>New Greeting</a>\
        <div id=table-here class=full-table-data></div>\
    ');

    self.tableBuilder = new jsc.TableBuilder({
        className: "table",
        idTemplate : "<%= greetingId %>",
        cols : [
            { header: "Message", dataTemplate: "<%= message %>" },
            { header: "Kind",    dataTemplate: "<%= kind %>"    }
        ]
    });
};
jsc.compose(app.GreetingPage, jsc.BasePage);

app.GreetingPage.prototype.init = function(ctx, complete){
    var self = this;

    self.$el.html(self.mainTemplate({}));

    app.dataStore.allGreetings(function(greetings){

        self.eid("table-here").appendChild(self.tableBuilder.generate(greetings));

        $("tbody tr").on("click", function(event){
            console.log("clicked it");
        });

        complete();
    });
};

