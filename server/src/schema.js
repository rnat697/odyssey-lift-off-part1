const gql = require("graphql-tag");
const typeDefs = gql`
    #Schema definitions go here

    type Query{
        "Get Tracks array for homepage grid (non-null list of non-null Tracks.)"
        tracksForHome: [Track!]!
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
    }

    "Author of a complete Track or a Module"
    type Author {
        id: ID!
        name: String!
        photo: String
    }

`;

module.exports = typeDefs;