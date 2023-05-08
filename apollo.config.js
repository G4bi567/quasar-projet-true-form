'use strict'
/* eslint-env node */
// See https://www.apollographql.com/docs/devtools/apollo-config/
module.exports = {
  service: {
    endpoint: {
      url: "https://pleased-spaniel-49.hasura.app/v1/graphql", // defaults to http://localhost:4000
      headers: {
        // optional
        "content-type" : "application/json",
        "x-hasura-admin-secret": "Il0IFkTm1C3SgZPk1y1hrp4hsidxML2uNyswlzrMH3l0kRQLxQnWNfFIzE1IJ9cy",
      },
      skipSSLValidation: true, // optional, disables SSL validation check
    },
  },
};
