import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const typeDefs = `#graphql
  type Location {
    id: ID!
    name: String!
    latitude: Float!
    longitude: Float!
    country_code: String!
  }

    type Weather {
    temperature: Float!
    windspeed: Float!
    winddirection: Float!
    weathercode: Int!
    time: String!
  }

  type Query {
    locations: [Location!]!
    getWeather(latitude: Float!, longitude: Float!): Weather!
  }
`;  

const resolvers = {
  Query: {
    getLocations: async (_: any, { name }: { name: string }) => {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`);
      const data = await response.json();
      return data.results;
    },
    getWeather: async (_, { latitude, longitude }) => {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const data = await response.json();
      return data.current_weather;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`Server ready at: ${url}`);
});