app.GreetingPage = function(target){
    var self = this;

    jsc.BasePage.call(self, target, "greetings");

    self.mainTemplate = _.template('\
        <div class=page-bar></div>\
        <div id=table-here class=full-table-data></div>\
    ');

    self.tableBuilder = new jsc.TableBuilder({
        className: "table-data",
        idTemplate : "<%= greetingId %>",
        cols : [
            { header: "Message", dataTemplate: "<%= message %>" }
        ]
    });
};
jsc.compose(app.GreetingPage, jsc.BasePage);

app.GreetingPage.prototype.init = function(ctx, complete){
    var self = this;

    self.$el.html(self.mainTemplate({}));

    app.queries.allGreetings(function(greetings){

        self.eid("table-here").appendChild(self.tableBuilder.generate(greetings));

        $("tbody tr").on("click", function(event){
            console.log("clicked it");
        });

        complete();
    });
};

