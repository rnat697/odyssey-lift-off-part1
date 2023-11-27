// **Lift-Off II Resolvers**Populates the data for a single field in the schema. It can fetch data from any data source, then transforms that data into the shape your client requires.
//As a best practice, when working on your resolvers and data sources, try to keep resolver functions as thin as possible. 
const resolvers = {
    Query: {
        // Returns an array of Tracks that will be used to populate
        // the homepage gridof our webclient
        /**
         * tracksForHome: (parents, args, contextValue, info)=>{},
         * @param {*} parents returned value of the resolver for this field's parent
         * @param {*} args  object that contains all GraphQL arguments that were provided for the field by the GraphQL operation
         * @param {*} contextValue object that is shared across all resolvers that are executing for a particular operation. Used to share state (like auth info, database connection or RESTDataSource)
         * @param {*} info  contains information about operation's execution state, including field name, path to the field from root etc (used for caching policies at resolver level)
         */

        // get all tracks, will be used to populate the homepage grid of our web client
        tracksForHome: (_, __, { dataSources})=>{
            return dataSources.trackAPI.getTracksForHome();
        },
        // **Lift-Off III Arguements** To get a single track
        track:(_, {id},{dataSources})=>{
            return dataSources.trackAPI.getTrack(id);
        },
    },
    Mutation:{
        incrementTrackViews:async (_,{id},{dataSources})=>{
            try{
                // This returns 3 fields that are not present in schema (code, success and message).
                const track = await dataSources.trackAPI.incrementTrackViews(id);
                // So we need to wait for the trackAPI call to finish returning the data first.
                return{
                    code:200,
                    success: true,
                    message: `Successfully incremented number of views for track ${id}`,
                    track,
                }
            }catch(err){
                return{
                    code:err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    track: null,
                }
            }
        },
    },

    Track:{
        author: ({authorId},_, {dataSources}) => {
            return dataSources.trackAPI.getAuthor(authorId);
        },
        modules: ({id},_,{dataSources})=>{
            return dataSources.trackAPI.getTrackModules(id);
        }
    }
};

module.exports = resolvers;