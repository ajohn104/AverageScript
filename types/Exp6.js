// Exp6            ::= Exp7 ('|' Exp7)*
module.exports = {
    is: function(at, next, env, debug) {
        debug("Starting on exp6. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        var indexBefore = env.index; 
        var indentedBefore = env.inIndented;
        var entity = new Exp6();
        if(!at(env.Exp7)) {
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            return false;
        }
        entity.val = env.last;
        env.checkIndent();
        var indexMid = env.index;
        while(at('|')) {
            var part = {operator: env.last};
            env.checkIndent();
            if(!at(env.Exp7)) {
                env.index = indexMid;
                break;
            }
            part.exp = env.last;
            entity.furtherExps.push(part);
            indexMid = env.index;
        }
        env.last = entity;
        debug("Finalizing exp6 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        return true;
    }
};

var Exp6 = function() {
    this.val = null;
    this.furtherExps = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = "";
        for(var j = 0; j < this.furtherExps.length; j++) {
            out += "(";
        }
        out += this.val.toString(indentlevel, indLvlHidden);
        for(var i = 0; i < this.furtherExps.length; i++) {
            out += this.furtherExps[i].operator + this.furtherExps[i].exp.toString(0, indLvlHidden) + ")";
        }
        return out;
    };
};