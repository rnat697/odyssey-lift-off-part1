const { RESTDataSource } = require("@apollo/datasource-rest");

// **Lift-Off II Resolvers** using a REST API data source
class TrackAPI extends RESTDataSource {
    baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

    getTracksForHome(){
        return this.get('tracks');
    }
    
    getAuthor(authorId){
        return this.get(`author/${authorId}`);
    }

    // **Lift-Off III Arguements**, getting a single track 
    getTrack(trackID){
        return this.get(`track/${trackID}`);
    }

    getTrackModules(trackID){
        return this.get(`track/${trackID}/modules`);
    }
}

module.exports = TrackAPI;

