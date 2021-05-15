const graphql = require("graphql");
const { Kind } = require("graphql/language");
const { GraphQLScalarType } = graphql;

function parseLiteral(ast) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = parseLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseLiteral);
    default:
      return null;
  }
}

// Custom graphql type for dynamic keys
const ScalarObjectType = new GraphQLScalarType({
  name: "ScalarObjectType",
  serialize(v) {
    return v;
  },
  parseValue(v) {
    return v;
  },
  parseLiteral(ast) {
    return parseLiteral(ast);
  },
});

module.exports = { ScalarObjectType };
