const {buildSchema} = require('graphql')

// в этой функции мы будем описывать разные schema и queryLanguage от graphql
// делаем запрос
// !-данный тип он обязательный
module.exports = buildSchema(`
    type Query{
        test: String!
    }
`)