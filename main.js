import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
 //import VueApollo, { ApolloProvider } from 'vue-apollo';
import VueApollo from "vue-apollo";
Vue.use(ApolloClient)
Vue.use(VueApollo);

const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:4000/graphql',
  })
  
  // Cache implementation
  const cache = new InMemoryCache()
  
  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  })
  
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  })
            
    new Vue({
      router,
      apolloProvider,
        render: h => h(App),
    }).$mount('#app')