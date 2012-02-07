app.Commands = function(options){
    var self = this;

    self.data = {
        greetings:[] 
    };
};

app.Commands.prototype.postit = function(commandName, data, fn, donotRefresh){
    $.ajax({
        url: "/api/c/"+sll.currentPortfolioId+commandName,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(){
            if(!donotRefresh){

            }else{
                fn();
            }
        },
        error: function (res) {
            sll.logger.log(res);
        }
    });
};

app.Commands.prototype.createGreeting = function(greeting, fn){
    var self = this;

    fn(self.data.greetings);
};

