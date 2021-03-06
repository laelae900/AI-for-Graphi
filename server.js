/* eslint-disable no-console */
// npm install --save neo4j-driver
// node example.js

const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer } = require("apollo-server");
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "bolt://34.239.115.211:7687",
  neo4j.auth.basic("neo4j", "authorizations-nail-humans")
);

const typeDefs = /* GraphQL */ `
type Movie {
  budget: Int
  countries: [String]
  imdbId: ID
  imdbRating: Float
  imdbVotes: Int
  languages: [String]
  movieId: ID!
  plot: String
  poster: String
  released: String
  revenue: Int
  runtime: Int
  title: String
  tmdbId: String
  url: String
  year: Int
  full_pagerank:Float
  genres: [Genre] @relationship(type: "IN_GENRE", direction: OUT)
  actors: [Actor] @relationship(type: "ACTED_IN", direction: IN)
  directors: [Director] @relationship(type: "DIRECTED", direction: IN)
  similar(first: Int = 3): [Movie]
    @cypher(
      statement: """
      MATCH (this)-[:ACTED_IN|:DIRECTED|:IN_GENRE]-(overlap)-[:ACTED_IN|:DIRECTED|:IN_GENRE]-(rec:Movie)
      WITH rec, COUNT(*) AS score
      RETURN rec ORDER BY score DESC LIMIT $first
      """
    )
}

type Genre {
  name: String
  full_pagerank:Float
  movies: [Movie] @relationship(type: "IN_GENRE", direction: IN)
}

type User {
  userId: ID!
  name: String
  full_pagerank:Float
  rated: [Movie] @relationship(type: "RATED", direction: OUT)
}

type Actor {
  bio: String
  born: Date
  bornIn: String
  died: Date
  imdbIb: String
  name: String
  poster: String
  tmdbId: String
  url: String
  full_pagerank:Float
  acted_in: [Movie] @relationship(type: "ACTED_IN", direction: OUT)
}

type Director {
  bio: String
  born: Date
  bornIn: String
  died: Date
  imdbIb: String
  name: String
  poster: String
  tmdbId: String
  url: String
  full_pagerank:Float
  directed: [Movie] @relationship(type: "DIRECTED", direction: OUT)
}

`;

// Create executable GraphQL schema from GraphQL type definitions,
// using @neo4j/graphql to autogenerate resolvers
const neoSchema = new Neo4jGraphQL({
  typeDefs,
  debug: true,
});

// Create ApolloServer instance that will serve GraphQL schema created above
// Inject Neo4j driver instance into the context object, which will be passed
//  into each (autogenerated) resolver
const server = new ApolloServer({
  context: { driver },
  schema: neoSchema.schema,
  introspection: true,
  playground: true,
});

// Start ApolloServer
server.listen().then(({ url }) => {
  console.log(`GraphQL server ready at ${url}`);
});
