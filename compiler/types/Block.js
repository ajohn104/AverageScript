// Block           ::= (Newline Stmt)*
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        
        debug("Beginning block search. envir.index:" + envir.index + " \n");
        debug("Current token:");
        debug(parseTokens[envir.index]);
        debug("Previous token:");
        debug(parseTokens[envir.index-1]);
        debug('\n');
        
        var indexMid = envir.index;
        while(at(envir.Newline)) {
            if(!at(envir.Stmt)) {
                debug("Block search stopped.\n");
                envir.index = indexMid;
                break;
            }
            indexMid = envir.index;
        }
        
        debug("Ending block search. envir.index:" + envir.index + " \n");
        debug("Current token is now:");
        debug(parseTokens[envir.index]);
        debug('\n');
        
        return true;
    }
};