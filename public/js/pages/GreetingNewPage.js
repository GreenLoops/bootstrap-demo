app.GreetingNewPage = function(target){
    var self = this;

    jsc.BasePage.call(self, target, "greeting");

    self.mainTemplate = _.template('\
        <form id=greeting-form class=form-horizontal action="#">\
            <fieldset>\
                <legend>General Details</legend>\
                <div class=control-group>\
                    <label for=kind class=control-label>Kind</label>\
                    <div class=controls>\
                        <select id=kind name="kind" class=span2>\
                            <option value="0">Normal</option>\
                            <option value="1">Disabled</option>\
                            <option value="2">Other</option>\
                        </select>\
                    </div>\
                </div>\
                <div class=control-group>\
                    <label for=message class=control-label>Message</label>\
                    <div class=controls>\
                        <input id=message name="message" type=text class=input-xlarge required />\
                        <p class=help-block>Message to use for the greeting</p>\
                    </div>\
                </div>\
            </fieldset>\
        </form>\
        <div class=well>\
            <button id=action-save class="btn btn-primary">Save</button>\
            <button id=action-cancel class=btn>Cancel</button>\
        </div>\
    ');
};
jsc.compose(app.GreetingNewPage, jsc.BasePage);

app.GreetingNewPage.prototype.init = function(ctx, complete){
    var self = this;

    self.$el.html(self.mainTemplate({}));
    self.form = self.eid("greeting-form");

    $("#action-save").on("click", function(event){
        self.done();
    });

    $("#action-cancel").on("click", function(event){
        self.redirect("/greeting");
    });

    app.dataStore.greetingById(ctx.params.greetingId, function(greeting){
        app.binding.populate(self.form, greeting);
        complete();
    });
};

app.GreetingNewPage.prototype.done = function(){
    var self = this;
    self.attempt(function(done){
        var greetingData = app.binding.parse(self.form);
        app.posts.createGreeting(greetingData, function(){
            done(true);
        });
    }, "/greeting");
};

app.GreetingNewPage.prototype.cancel = function(){
};
