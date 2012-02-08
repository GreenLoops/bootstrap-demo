var QH = function(appContext){
    this.repo = appContext.repo;
};

QH.prototype.greetings = function(type, callback){
    var self = this;

    self.repo.find("greetings", null, function(items){
        callback(items);
    });
};

module.exports = QH;

