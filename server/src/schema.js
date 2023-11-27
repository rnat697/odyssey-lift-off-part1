const gql = require("graphql-tag");
const typeDefs = gql`
    #Schema definitions go here

    type Query{
        "Get Tracks array for homepage grid (non-null list of non-null Tracks.)"
        tracksForHome: [Track!]!
        track(id:ID!): Track
    }

    "A single track might include any number of modules and one module might be part of many tracks"
    type Module{
        "A Module is a single unit of teaching. Multiple Modules compose a Track"
        id: ID!
        title: String!
        "The module's length in minutes"
        length: Int
    }

    " **Lift-Off IV: Mutations** A graphQL operation that creates, modifies or destroys data"
    type Mutation{
        incrementTrackViews(id:ID!): IncrementTrackViewsResponse!
    }

    " **Lift-Off IV: Mutations** "
    type IncrementTrackViewsResponse{
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Newly updated track after a successful mutation"
        track: Track
    }

    "A track is a group of Modules that teaches about a specific topic"
    type Track {
        # Fields go here (! at the end means non-nullable) 
        id: ID!
        title: String!
        author: Author!
        thumbnail: String
        length: Int
        "The number of modules this track contains"
        modulesCount: Int
        description: String
        numberOfViews: Int
        "[Module!] = The list's items can't be null --> [Module!]! = The list itself can't be null and the items inside the list can't be null"
        modules: [Module!]!
    }

    "Author of a complete Track or a Module"
    type Author {
        id: ID!
        name: String!
        photo: String
    }

`;

module.exports = typeDefs;