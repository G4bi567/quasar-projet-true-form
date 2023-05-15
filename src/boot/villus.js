import { createClient, defaultPlugins } from '@villus/core';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  const client = createClient({
    url: 'https://pleased-spaniel-49.hasura.app/v1/graphql',
    use: [...defaultPlugins()],
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'Il0IFkTm1C3SgZPk1y1hrp4hsidxML2uNyswlzrMH3l0kRQLxQnWNfFIzE1IJ9cy',
    },
  });

  app.provide(client);
});
