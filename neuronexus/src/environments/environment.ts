// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // local
  // BASE_API_ENDPOINT: 'http://104.211.219.149:1437/api/',
  // BASE_IMAGE_URL: 'http://104.211.219.149:1437/uploads/',
  // USE_HASH_IN_URL: true,

  // local_new
  // BASE_API_ENDPOINT: 'http://104.211.229.156:1437/api/',
  // BASE_IMAGE_URL: 'http://104.211.229.156:1437/uploads/',
  // USE_HASH_IN_URL: true,

  // previous server
  // BASE_API_ENDPOINT: 'http://18.221.247.184:1437/api/',
  // BASE_IMAGE_URL: 'http://18.221.247.184:1437/uploads/',
  // USE_HASH_IN_URL: false,

  // current server
  // BASE_API_ENDPOINT: 'https://admin.neuronexus.com/api/',
  // BASE_IMAGE_URL: 'https://admin.neuronexus.com/uploads/',
  BASE_API_ENDPOINT: 'http://localhost:1437/api/',
  BASE_IMAGE_URL: 'http://localhost:1437/uploads/',
  USE_HASH_IN_URL: false,

  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
