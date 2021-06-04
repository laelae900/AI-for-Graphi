<template>
    <div>
     <div id="app">
         <h1> Future AI powered Intelligence Search  </h1>
     <table border='1' width='100%' style='border-collapse: collapse;'>
       <tr>
         <th> Movie Title </th>
         <th> Rank Score </th>
       </tr>
       <tr v-for='movie in movies' 
             :key="movie.id">
            <td>{{ movie.title}}</td>
            <td>{{ movie.full_pagerank }}</td>
         <td>
                    <input type="button" @click="deleteContact(contact.id)" value="Delete">
         </td> 
       </tr>
     </table>
     <br>
         <div><input type="button" @click="getMovie()" value="Search"></div> 
        
        </div>
    
</template>
   <script src="https://d3js.org/d3.v6.min.js"></script>
<script>

import * as d3 from 'd3'
import gql from 'graphql-tag'

export default {
    name:'app',

 apollo: {   
     
           movies: gql `query GetMovie
              {
                  movies
                  {
                    title
                    full_pagerank
                      
                  }
              }`,
    
         allActors: gql `query actor
              {
                allActors {
                  name
                 full_pagerank
               }
              }
            ` ,     
               
              variables()
              {
                return {
                        offset: parseInt(this.$route.params.offset) || 0,
                        limit: 10,
                        id: this.id,
                        name: this.name,
                        title: this.title,
                  
                      }
              }
             
      },

     data()
    {
        return {
                movies:[],
                distractors:[],
                videos:[],
                subjects:[],
                allActors:[]
               }

    },
     
}

</script>

