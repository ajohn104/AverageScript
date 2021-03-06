// This isn't actually a part of the macrosyntax, but rather a convenience method of sorts. For consistency.
module.exports = function(env, at, next, debug) {
    this.env = env;
    return function(lexeme) {
        return {
            lexeme: lexeme,
            is: function() {
                var indexBefore = env.index;
                if(env.parseTokens[env.index].lexeme !== this.lexeme) {
                    env.index = indexBefore;
                    return false;
                }
                env.last = this.lexeme;
                env.index++;
                return true;
            }
        }
    };
};