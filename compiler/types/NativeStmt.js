// NativeStmt      ::= '***native***'
module.exports = {
    is: function() {
        var indexBefore = index;

        if(parseTokens[index].lexeme !== '***native***') {
            index = indexBefore;
            return false;
        }
        index++;

        return true;
    }
};