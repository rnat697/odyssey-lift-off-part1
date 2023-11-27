import React from 'react';
import { Layout, QueryResult } from '../components';
import { gql, useQuery } from "@apollo/client";
import TrackCard from "../containers/track-card";

/** GraphQL Client Best practices:
* - Assign each query string to a constant with ALL_CAPS name
* - Test out queries in Apollo Studio Explorer and copy them over
* - Wrap each query in the `gql` literal
* - Include only fields that the client requires
*/ 
const TRACKS = gql`
  # Query goes here
  query GetTracks{
    tracksForHome{
      id
      title
      thumbnail
      length
      modulesCount
      author{
        id
        name
        photo
      }
    }
  }

`;
/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const {loading, error, data } = useQuery(TRACKS);

  return <Layout grid> 
    <QueryResult error={error} loading={loading} data={data}>
      {data?.tracksForHome?.map((track)=>(
        <TrackCard key={track.id} track={track}/>
      ))}
    </QueryResult>
  
  </Layout>;
};

export default Tracks;
