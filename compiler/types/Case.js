// Case            ::= Newline 'case' Exp18 ':' Indent Block Dedent
module.exports = {
    is: function(at, parseTokens, envir, debug) {
        var indexBefore = envir.index;

        if(!at(envir.Newline)) {
            envir.index = indexBefore;
            return false;
        }

        if(parseTokens[envir.index].lexeme !== 'case') {
            envir.index = indexBefore;
            return false;
        } 
        envir.index++;

        if(!at(envir.Exp18)) {
            envir.index = indexBefore;
            return false;
        }

        if(parseTokens[envir.index].lexeme !== ':') {
            envir.index = indexBefore;
            return false;
        } 
        envir.index++;

        if(!at(envir.Indent)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Block)) {
            envir.index = indexBefore;
            return false;
        }

        if(!at(envir.Dedent)) {
            envir.index = indexBefore;
            return false;
        }

        return true;
    }
};