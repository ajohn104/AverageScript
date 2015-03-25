// Block           ::= (Newline Stmt)*
module.exports = {
    is: function(at, next, envir, debug) {
        var indexBefore = envir.index;
        var entity = new Block();
        debug("Beginning block search. envir.index:" + envir.index + " \n");
        debug("Current token:");
        debug(envir.parseTokens[envir.index]);
        debug("Previous token:");
        debug(envir.parseTokens[envir.index-1]);
        debug('\n');
        var indexMid = envir.index;
        while(at(envir.Newline)) {
            if(!at(envir.Stmt)) {
                debug("Block search stopped.\n");
                envir.index = indexMid;
                break;
            }
            entity.stmts.push(envir.last);
            indexMid = envir.index;
        }
        
        debug("Ending block search. envir.index:" + envir.index + " \n");
        debug("Current token is now:");
        debug(envir.parseTokens[envir.index]);
        debug('\n');
        envir.last = entity;
        return true;
    } 
};

var Block = function() {
    this.stmts = [];
    this.toString = function(indentlevel) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = envir.indents(indentlevel);
        var out = indents + "Block -> stmts: [\n";
        for(var i = 0; i < this.stmts.length; i++) {
            out += this.stmts[i].toString(indentlevel + 1) + "\n";
        }
        out += indents + "]";
        return out;
    };
};