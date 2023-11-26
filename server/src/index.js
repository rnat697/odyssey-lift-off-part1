const { ApolloServer } = require("@apollo/server");
const  { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");

// **Lift-Off I** For mocking data  (https://www.apollographql.com/tutorials/lift-off-part1)
// const { addMocksToSchema } = require("@graphql-tools/mock");
// const { makeExecutableSchema } = require("@graphql-tools/schema");
// const mocks = {
//     Query: () => ({
//         tracksForHome: () => [...new Array(6)],
//     }),
//     Track: () => ({
//       id: () => "track_01",
//       title: () => "Astro Kitty, Space Explorer",
//       author: () => {
//         return {
//           name: "Grumpy Cat",
//           photo:
//             "https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg",
//         };
//       },
//       thumbnail: () =>
//         "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
//       length: () => 1210,
//       modulesCount: () => 6,
//     }),
//   };


async function startApolloServer(){
    // **Lift-Off I** Mocking Data Adjustments - Generates executable Schema from TypeDefs and instructs Apollo Server to populate every queried Schema with placeholder value
    // const server = new ApolloServer({
    //     schema: addMocksToSchema({
    //         schema: makeExecutableSchema({typeDefs}),
    //         mocks,
    //     }),
    // });

    // **Lift-Off II**
    const server = new ApolloServer({typeDefs, resolvers});

    const { url } = await startStandaloneServer(server,{
        context: async()=>{
            // This object becomes our resolver's contextValue, the third positional arguement
            return{
                dataSources: {
                    trackAPI: new TrackAPI(),
                },
            };
        },
    });
    console.log(`
    Server is running!
    Query at ${url}
    `)
}

startApolloServer();

