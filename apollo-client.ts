import { ApolloClient, InMemoryCache } from "@apollo/client";
import { POKEMONS_QUERY } from "./pages";

// const client = new ApolloClient({
//   uri: "https://graphqlpokemon.favware.tech/",
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: "https://graphqlpokemon.favware.tech/",
  cache: new InMemoryCache(),
  //   resolvers: {
  //     Mutation: {
  //       filter: (pokemon, _args, { cache }) => {
  //         const { getFuzzyPokemon } = cache.readQuery({ query: POKEMONS_QUERY });
  //         // return getFuzzyPokemon.includes(pokemon.type);
  //         return getFuzzyPokemon;
  //       },
  //     },
  //   },
});

export default client;
