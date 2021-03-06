// ForIn           ::= 'for' Id (',' Id)? 'in' Exp17
module.exports = function(env, at, next, debug) {
    var Id, Exp17;
    return {
        loadData: function() {
            Id = env.Id,
            Exp17 = env.Exp17;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new ForIn();
            debug("Starting for-in. env.index:" + env.index);
            if(!at('for')) {
                env.index = indexBefore;
                return false;
            }

            if(!at(Id)) {
                env.index = indexBefore;
                return false;
            }
            entity.idone = env.last;

            if(at(',')) {
                if(!at(Id)) {
                    env.index = indexBefore;
                    return false;
                }
                entity.idtwo = env.last;
            }

            if(!at('in')) {
                env.index = indexBefore;
                return false;
            }

            if(!at(Exp17)) {
                env.index = indexBefore;
                return false;
            }
            entity.exp = env.last;
            env.last = entity;
            debug("Completed for-in. env.index:" + env.index);
            return true;
        }
    };
};

var ForIn = function() {
    this.idone = null;
    this.idtwo = null;
    this.exp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "(for " + this.idone;
        if(this.idtwo !== null) {
            out += "," + this.idtwo;
        }
        out += " in " + this.exp.toString(0, indLvlHidden) + ")";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        var valId = !isNull(this.idtwo)?this.idtwo:this.idone;
        var keyId = !isNull(this.idtwo)?this.idone:scope.nextId();
        var objId = scope.nextId();

        write(scope.ind(indents) + 'var ' + objId + ' = ');
        this.exp.compile(write, scope, 0, indentsHidden);
        write(';\n' + scope.ind(indentsHidden) + 'keys(' 
            + objId + ').forEach(function(' + keyId + ') {\n' 
            + scope.ind(indentsHidden+1) + 'var ' + valId + ' = ' + objId + '[' + keyId + '];');
    };
};