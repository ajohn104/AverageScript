// Func            ::= 'func' (Id (',' Id)* )? '->' ('ret'? Exp) | (Indent Block Dedent)
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;
        debug("Beginning func testing. envir.index:" + envir.index);
        if(parseTokens[envir.index].lexeme !== 'func') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        debug("Found 'func', looking for parameters. envir.index:" + envir.index);
        if(at(envir.Id)) {
            debug("Found Id. Checking for ','. envir.index:" + envir.index);
            while(parseTokens[envir.index].lexeme === ',') {
                envir.index++;
                debug("Found ','. Looking for Id. envir.index:" + envir.index);
                if(!at(envir.Id)) {
                    envir.index = indexBefore;
                    return false;
                }
                debug("Found Id. Looking for ','. envir.index:" + envir.index);
            }
        }
        debug("End of parameters. Looking for '->'. envir.index:" + envir.index);
        if(parseTokens[envir.index].lexeme !== '->') {
            envir.index = indexBefore;
            return false;
        }
        envir.index++;
        debug("Found '->'. Looking for single line 'ret'. envir.index:" + envir.index);
        if(parseTokens[envir.index].lexeme === 'ret') {
            envir.index++;
            if(!at(envir.Exp)) {
                envir.index = indexBefore;
                return false;
            }
        } else if(at(envir.Exp)) {
            debug("Single line 'ret' not found. Instead found Single line Exp. envir.index:" + envir.index);
            ; // Just let it fall through
        } else {
            debug("Not single line. checking for indent. envir.index:" + envir.index);
            if(!at(envir.Indent)) {
                envir.index = indexBefore;
                return false;
            }
            debug("Found indent. Checking for Block. envir.index:" + envir.index);
            if(!at(envir.Block)) {
                envir.index = indexBefore;
                return false;
            }
            debug("Found Block. Looking for Dedent. envir.index:" + envir.index + ", lexeme: " + parseTokens[envir.index].lexeme);
            if(!at(envir.Dedent)) {
                envir.index = indexBefore;
                return false;
            }
            debug("Successful end of function. envir.index:" + envir.index + " \n");
        }
        debug("Finalizing function success. envir.index:" + envir.index);
        debug(parseTokens[envir.index]);
        debug('\n');
        return true;
    }
};