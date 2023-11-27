import React from 'react';
import { Layout, QueryResult } from '../components';
import { gql, useQuery } from "@apollo/client";
import TrackCard from "../containers/track-card";
import { useParams } from 'react-router-dom';
import TrackDetail from "../components/track-detail";

/** GraphQL Client Best practices:
* - Assign each query string to a constant with ALL_CAPS name
* - Test out queries in Apollo Studio Explorer and copy them over
* - Wrap each query in the `gql` literal
* - Include only fields that the client requires
*/ 
const GET_TRACK = gql`
  # Query goes here
    query GetTrack($trackId: ID!) {
        track(id: $trackId) {
            id
            title
            author {
            id
            name
            photo
            }
            thumbnail
            length
            modulesCount
            description
            numberOfViews
            modules {
            id
            title
            length
            }
        }
    }

`;
/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Track = () => {
    const {trackId =""} = useParams();
    const { loading, error, data } = useQuery(GET_TRACK,{
        variables:{ trackId},
    });
    return <Layout> 
        <QueryResult error={error} loading={loading} data={data}>
            <TrackDetail track={data?.track}/>
        </QueryResult>
    </Layout>;
};

export default Track;
