import { useClient } from '@villus/core';

export default async ({ app }) => {
  app.provide(useClient({
    url: 'http://localhost:4000/graphql', // replace with your GraphQL endpoint
  }));
};
