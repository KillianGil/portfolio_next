
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://eu-west-2.cdn.hygraph.com/content/cm3oklmn601a908w3pnoj2y48/master", 
  cache: new InMemoryCache(),
});

export default client;