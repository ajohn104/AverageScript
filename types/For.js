// For             ::= 'for' ( ('let'? Id '=')? Exp ',')? Exp ',' Exp
module.exports = function(env, at, next, debug) {
    var Id, Exp;
    return {
        loadData: function() {
            Id = env.Id,
            Exp = env.Exp;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new For();
            var initialExp = new InitialCondition();
            if(!at('for')) {
                env.index = indexBefore;
                return false;
            }

            if(at('let')) {
                initialExp.let = "let";
                if(!at(Id)) {
                    env.index = indexBefore;
                    return false;
                }
                initialExp.id = env.last;
                if(!at('=')) {
                    env.index = indexBefore;
                    return false;
                }
                if(!at(Exp)) {
                    env.index = indexBefore;
                    return false;
                }
                initialExp.exp = env.last;
                if(!at(',')) {
                    env.index = indexBefore;
                    return false;
                }
                entity.firstexp = initialExp;
            } else if(at(Id)) {
                initialExp.id = env.last;
                if(!at('=')) {
                    env.index = indexBefore;
                    return false;
                }
                if(!at(Exp)) {
                    env.index = indexBefore;
                    return false;
                }
                initialExp.exp = env.last;
                if(!at(',')) {
                    env.index = indexBefore;
                    return false;
                }
                entity.firstexp = initialExp;
            } else {
                if(!at(Exp)) {
                    env.index = indexBefore;
                    return false;
                }
                initialExp.exp = env.last;

                if(!at(',')) {
                    env.index = indexBefore;
                    return false;
                }
                entity.firstexp = initialExp;
            }

            if(!at(Exp)) {
                env.index = indexBefore;
                return false;
            }
            entity.exp = env.last;
            if(!at(',')) {
                env.index = indexBefore;
                return false;
            }
            if(!at(Exp)) {
                env.index = indexBefore;
                return false;
            }
            entity.repeatexp = env.last;
            env.last = entity;
            return true;
        }
    };
};

// Todo: The toString here needs to be more explicit.
var For = function() {
    this.firstexp = null;
    this.exp = null;
    this.repeatexp = null;
    this.doesntNeedParens = true;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "(for ";
        if(this.firstexp !== null) {
            out += this.firstexp.toString(0, indLvlHidden) + ", ";
        }
        out += this.exp.toString(0, indLvlHidden) + ", ";
        out += this.repeatexp.toString(0, indLvlHidden);
        out += ")";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write('for(');
        if(this.firstexp !== null) {
            this.firstexp.compile(write, scope, 0, indentsHidden);
        } else {
            write(scope.nextId() + ' = ' + 0);      // An initial condition is required in Javascript, but not AVG.
        }
        this.exp.compile(write, scope, 0, indentsHidden);
        write(';');
        if(this.repeatexp !== null) {
            this.repeatexp.compile(write, scope, 0, indentsHidden);
        }
        write(') {');
    };
};

var InitialCondition = function() {
    this.let = "";
    this.id = null;
    this.exp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents;
        if(this.let !== "") {
            out += "(Declare ->" + this.id + "=" + this.exp.toString(0, indLvlHidden) + ")";
        } else if(this.id !== null) {
            out += "(Assign ->" + this.id + "=" + this.exp.toString(0, indLvlHidden) + ")";
        } else {
            out += "(" + exp.toString(0, indLvlHidden) + ")";
        }
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        write((this.let !== ""?'var ':'') + (this.id !== null?this.id + ' = ':''));
        this.exp.compile(write, scope, 0, indentsHidden);
        write(';');
    };
};