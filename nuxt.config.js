// import axios from 'axios'
// let dynamicRoutes = async () => {
//   const axios = require('axios');

//   return axios.get('http://css.harrowschool.io/.netlify/functions/getLectures').then(res => {
//    console.log(res)
//    return res.data.map(lecture => `/lectures/${lecture._id}`)
//  })
// }

// let dynamicRoutesMongo = async () => {
//   const MongoClient = require("mongodb").MongoClient;

//   const MONGODB_URI = process.env.MONGODB_URI;
//   const DB_NAME = 'test';

//   const client = await MongoClient.connect(MONGODB_URI, {
//     useUnifiedTopology: true,
//   });

//   const db = client.db(DB_NAME);

//   const lectures = await db.collection("lectures").find({}, {"name":1, "_id":1, "image":1, "content":0, "date":1, "location":0, "speakers":0 }).sort([['timestamp', -1]]).toArray();

//   client.close();

//   return lectures.map(lecture => `/events/${lecture._id}`)
// }

// let dynamicRoutesContent =  async () => {
//   const { $content } = require('@nuxt/content')
//   const files = await $content({ deep: true }).fetch()

//   return files.map(file => file.path === '/index' ? '/' : file.path.replace('2023-multithreading-main/', 'threads/').replace('/README',''))


// }

let dynamicRoutesJoined = async () => {
  // const routesMongo = await dynamicRoutesMongo()
  // const routesContent = await dynamicRoutesContent()
   const routesMongo = []
  const routesContent = []
  const routesCustom = []

  return [...routesMongo, ...routesContent, ...routesCustom]
}

export default {
  server: {
    port: 3010 // default: 3000
  },

  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Harrow CSS',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name:"google-site-verification", content:"3s1BylhYBsehxtp9mCX6pvliiK-CMgy9UHsi582913c"}
    ],
    link: [
      {
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
        rel: 'stylesheet',
        integrity:
          'sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor',
        crossorigin: 'anonymous',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/templogodark.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/templogowhite.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js',
        integrity:
          'sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2',
        crossorigin: 'anonymous',
      }
    ],
  },

  generate: {
    // include routes at dynamicRoutesMongo and dynamicRoutesContent
    routes: dynamicRoutesJoined,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/google-fonts', '@nuxtjs/moment'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/markdownit'],

  markdownit: {
    runtime: true, // Support `$md()`
  },

  auth: {
    redirect: {
      callback: '/auth',
      home: false,
      login: 'auth/logon',
      logout: '/',
    },
    strategies: {
      aad: {
        scheme: 'oauth2',
        endpoints: {
          authorization:
            'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize',
          token:
            'https://login.microsoftonline.com/organizations/oauth2/v2.0/token',
          logout: false,

        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800,
          global: true,
          required: true,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: 'offline',
        // ******** change this for your Application (Client) ID ********
        clientId: '44d26139-5962-4f60-880a-2b0952be30d2',
        codeChallengeMethod: 'S256',
        scope: ['openid', 'profile'],
        autoLogout: true,
      },
    },
  },
  ssr: false,


  // auth: {
  //   strategies: {
  //     local: {
  //       //      scheme: "refresh",
  //       token: {
  //         property: "token",
  //         global: true,
  //         required: true,
  //         type: "Bearer",
  //       },
  //       user: {
  //         property: "user",
  //         autoFetch: true,
  //       },
  //       //      refreshToken: {  // it sends request automatically when the access token expires, and its expire time has set on the Back-end and does not need to we set it here, because is useless
  //       //        property: "refresh_token",
  //       //        data: "refresh_token",
  //       //      },
  //       endpoints: {
  //         login: { url: "/api/auth/login", method: "post" },
  //         //        refresh: { url: "/api/auth/refresh-token", method: "post" },
  //         logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
  //         user: { url: "/api/auth/user", method: "get" },
  //       },
  //     },
  //   },
  // },

  // serverMiddleware: ['~/api/app.js'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/api/',
    // baseURL: 'http://localhost:7071/api/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  googleFonts: {
    families: {
      Poppins: true,
    },
  },
}
