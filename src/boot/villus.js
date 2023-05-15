// src/boot/villus.js
import { useClient, defaultPlugins } from 'villus';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  function authPlugin({ opContext }) {
    opContext.headers['Content-Type'] = 'application/json';
    opContext.headers['x-hasura-admin-secret'] =
      'Il0IFkTm1C3SgZPk1y1hrp4hsidxML2uNyswlzrMH3l0kRQLxQnWNfFIzE1IJ9cy';
  }

  app.provide(
    useClient({
      url: 'https://pleased-spaniel-49.hasura.app/v1/graphql',
      use: [authPlugin, ...defaultPlugins()],
    })
  );
});
