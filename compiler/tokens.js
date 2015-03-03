var Tokens = {
    Indent: 
        ["    "],
    Separators: 
        [".", "{", "}", "[", "]", "(", ")", ":", ",", ";"],
    OneCharacterOperators: 
        ["+", "-", "~", "/", "*", "%", "<", ">", "&", "|", "^", "?", "="],
    TwoCharacterOperators: 
        ["<-", "++", "--",  "<=", ">=", "==", "<<", ">>", "*=",
         "/=", "%=", "+=", "-=", "^=", "!="],
    ThreeCharacterOperators: 
        ["!==",  "===", "<<<", ">>>", "<<=", ">>="],
    FourCharacterOperators: 
        [ "<<<=", ">>>="],
    WordOperators:
        ["not", "and", "or"],
    Reserved:
        ["let", "_", "for", "in", "end", "if", "elif", "else",
         "stop", "skip", "do", "while", "try", "catch", "throw",
         "ret", "finally", "switch", "case", "new", "func"],
    Comments: 
        ["//", "/*", "*/"],
    Native:
        ["***native***"],
    Bool: 
        ["true", "false"],
    Unused:
        ["break", "class", "const", "continue", "debugger", 
        "default", "delete", "export", "extends", "function", 
        "import", "instanceof", "super", "this", "typeof", 
        "var", "void", "with", "return"]
};

// ErrUC = Error: Unexpected Characters, ErrUR = Error: Unused Reserved
Tokens.kinds = 
    [{ kind:"Newline", abbr: null}, {kind:"UnexpectedChars", abbr:"ErrUC"}, {kind:"Indent", abbr:null},
     {kind:"Id", abbr: "Id"}, {kind:"Reserved", abbr: null/*"Res"*/}, {kind:"Unused", abbr: "ErrUR"},
     {kind:"Comment", abbr: undefined}, {kind:"Separator", abbr: null/*"Sep"*/}, {kind:"Operator", abbr: null/*"Op"*/},
     {kind:"Native", abbr: null}, {kind:"BoolLit", abbr: "Bool"}, {kind:"IntLit", abbr: "Int"},
     {kind:"StrLit", abbr: "Str"} ];

module.exports = Tokens;