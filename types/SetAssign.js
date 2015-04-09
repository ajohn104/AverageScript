// SetAssign       ::= Exp AssignOp Exp
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new SetAssign();
        if(!at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        entity.leftexp = env.last;
        if(!at(env.AssignOp)) {
            env.index = indexBefore;
            return false;
        }
        entity.operator = env.last;
        if(!at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        entity.rightexp = env.last;

        env.last = entity;
        return true;
    }
};

var SetAssign = function() {
    this.leftexp = null;
    this.operator = null;
    this.rightexp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "Assign(" + this.leftexp.toString(0, indLvlHidden);
        out += this.operator + this.rightexp.toString(0, indLvlHidden);
        out += ")";
        return out;
    };
};