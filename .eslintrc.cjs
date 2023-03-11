module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        indent: ["warn", 4, { SwitchCase: 0 }],
        semi: ["warn", "never"],
        "brace-style": ["warn", "1tbs"],
        quotes: ["warn", "double"],
        "linebreak-style": ["warn", "unix"],
        "space-before-function-paren": [
            "warn",
            {
                anonymous: "always",
                named: "never",
                asyncArrow: "always"
            }
        ],
        "arrow-spacing": "warn",
        "comma-spacing": "warn",
        "keyword-spacing": "warn",
        "object-curly-spacing": ["warn", "always"],
        "space-infix-ops": "warn",
        "space-unary-ops": "warn",
        "semi-spacing": "warn",
        "space-before-blocks": "warn",
        "arrow-parens": "warn",
        "@typescript-eslint/space-infix-ops": "warn",
        "@typescript-eslint/type-annotation-spacing": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off"
    }
}
