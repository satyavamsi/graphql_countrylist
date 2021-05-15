const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const {
  getConversionResolver,
  getCountriesResolver,
} = require("../resolvers/resolvers");
const { ScalarObjectType } = require("./helpers");

const CountryType = new GraphQLObjectType({
  name: "Country",
  fields: () => ({
    name: { type: GraphQLString },
    population: { type: GraphQLInt },
    capital: { type: GraphQLString },
    numericCode: { type: GraphQLString },
    nativeName: { type: GraphQLString },
    currencies: { type: new GraphQLList(CurrencyType) },
    conversions: {
      type: ScalarObjectType,
      async resolve(parent) {
        const conversion = await getConversionResolver(parent);
        return conversion;
      },
    },
  }),
});

// Custom type for currency data
const CurrencyType = new GraphQLObjectType({
  name: "Currency",
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
  }),
});

// Graphql entry query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    countries: {
      type: new GraphQLList(CountryType),
      args: { name: { type: GraphQLString } },
      async resolve(parent, { name }) {
        const countries = await getCountriesResolver(name);
        return countries;
      },
    },
    conversion: {
      type: ScalarObjectType,
      async resolve() {
        const conversion = await getConversionResolver();
        return conversion;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
