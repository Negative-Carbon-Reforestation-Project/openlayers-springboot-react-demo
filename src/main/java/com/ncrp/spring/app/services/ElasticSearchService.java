package com.ncrp.spring.app.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ncrp.spring.app.models.HitResult;
import com.ncrp.spring.app.models.ReturnData;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.SSLContexts;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.net.ssl.SSLContext;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class ElasticSearchService
{
    private final double EARTH_RADIUS = 6371;

    private RestHighLevelClient client;


    /**
     * Constructs an elastic search service given the open search host and port.
     * @param openSearchHost The host for the open search cluster
     * @param openSearchPort The port for the open search cluster
     */
    public ElasticSearchService(@Value("${opensearch_host}") String openSearchHost,
                                @Value("${opensearch_port}") int openSearchPort)
    {
        this.client = getClient(openSearchHost, openSearchPort);
    }

    /**
     * Initializes the elastic search client
     * @param openSearchHost The host for the open search cluster
     * @param openSearchPort The port for the open search cluster
     * @return
     */
    private RestHighLevelClient getClient(String openSearchHost, int openSearchPort)
    {
        try
        {
            CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials("admin", "admin"));

            SSLContextBuilder sslBuilder = SSLContexts.custom().loadTrustMaterial(null, (x509Certificates, s) -> true);
            SSLContext sslContext = sslBuilder.build();

            RestClientBuilder builder = RestClient.builder(new HttpHost(openSearchHost, openSearchPort, "https"))
                    .setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder
                            .setDefaultCredentialsProvider(credentialsProvider)
                            .setSSLContext(sslContext)
                            .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE));

            return new RestHighLevelClient(builder);
        }
        catch (Exception ex)
        {
            return null;
        }

    }

    /**
     * Retrieves the species data for the given coordinates
     * @param longitude The longitude
     * @param latitude The latitude
     * @return
     */
    public String getSpeciesData(double longitude, double latitude)
    {
        try
        {
            //Change to 100m
            int distance = 100;
            GeoPoint point = new GeoPoint(latitude, longitude);

            SearchSourceBuilder builder = new SearchSourceBuilder()
                    .postFilter(QueryBuilders.geoDistanceQuery("location")
                            .point(point)
                            .distance(distance, DistanceUnit.METERS));
            builder.size(1000);
            SearchRequest searchRequest = new SearchRequest("");
            searchRequest.searchType(SearchType.DFS_QUERY_THEN_FETCH);
            searchRequest.source(builder);
            SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);

            ArrayList<Map<String, Double>> processedResults = processResponse(response, point);

            if(processedResults == null)
            {
                return "{\"species\": \"Not available\", \"wa_total_reforestation_opportunity\": 0 }";
            }
            Map<String, Double> averagedResults = averageSearchResults(processedResults);
            JSONObject finalJson = mapToJson(averagedResults);

            return finalJson.toString();
//            return averagedResults;

        }
        catch(Exception ex)
        {
            return "{\"species\": \"Not available\", \"wa_total_reforestation_opportunity\": 0 }";
        }
    }

    /**
     * Process a SearchResponse object into HitResult objects, which is then transformed into an ArrayList of Maps
     * @param response The elastic search response
     * @param queryPoint The GeoPoint representing the coordinates
     * @return An arraylist of maps, containing the keys and values.
     */
    private ArrayList<Map<String, Double>> processResponse(SearchResponse response, GeoPoint queryPoint)
    {
        try
        {
            SearchHits hits = response.getHits();

            //Length check, make sure we have results
            if(hits.getHits().length <= 0)
                return null;

            ArrayList<HitResult> results = new ArrayList<>();

            //Loops through each hit and maps to a 'HitResult' object
            for(int i = 0; i < hits.getHits().length; i++)
            {
                HitResult newResult = new HitResult();
                SearchHit currentHit = hits.getAt(i);

                Map<String, Object> currentSource = currentHit.getSourceAsMap();

                for(String key : currentSource.keySet())
                {
                    if(key.equals("location"))
                    {
                        ArrayList<Double> thing = (ArrayList<Double>) currentSource.get(key);
                        newResult.setLocation(new GeoPoint(thing.get(0), thing.get(1)));
                    }
                    else
                    {
                        try
                        {
                            newResult.addToMap(key, (Double) currentSource.get(key));
                        }
                        catch (Exception error)
                        {
                            System.out.println(error.toString());
                        }
                    }
                }

                results.add(newResult);
            }

            //Once we have the results stored in HitResults, we need to format output for React app
            //Calculate distance between 'queryPoint' and each hit from search
            //Sum up results across each search result/species
            ArrayList<Map<String, Double>> scores = new ArrayList<>();

            for(HitResult result : results)
            {
                Map<String, Double> map_score = new HashMap<>();

                //Iterate through each species in result
                for(String key : result.getSpecies_map().keySet())
                {
                    Double normValue = result.getSpecies_map().get(key);
                    map_score.put(key, normValue);
                }
                scores.add(map_score);
            }

            return scores;
        }
        catch(Exception error)
        {
            System.out.println("Error processing json with exception: " + error.toString());
            return null;
        }
    }

    /**
     * Calculates distance between two lat/long pairs using the Haversine Formula
     * TO-DO: May need to revisit to verify accuracy of measurements
     * @param initLat The initial latitude
     * @param initLong The initial longtitude
     * @param newLat The new latitude
     * @param newLong The new longitude
     * @return The distance between two coordinate pairs.
     */
    private double getDistance(double initLat, double initLong, double newLat, double newLong)
    {
        initLat = Math.toRadians(initLat);
        initLong = Math.toRadians(initLong);
        newLat = Math.toRadians(newLat);
        newLong = Math.toRadians(newLong);

        double sin2Long = Math.pow(Math.sin((newLong - initLong) / 2), 2);
        double sin2Lat = Math.pow(Math.sin((newLat - initLat) / 2), 2);

        return 2 * EARTH_RADIUS * (Math.asin(Math.sqrt(sin2Lat + Math.cos(initLat) * Math.cos(newLat) * sin2Long)));
    }

    /**
     * Calculates the average of the species data
     * @param results The arraylist of map containing the species data
     * @return The average of the species data.
     */
    private Map<String, Double> averageSearchResults(ArrayList<Map <String, Double>> results)
    {
        Map<String, Double> finalResult = new HashMap<>();
        Map<String, Double> finalCount = new HashMap<>();

        //Looping through each map
        for(Map<String, Double> map : results)
        {
            for(String key : map.keySet())
            {
                if(finalResult.containsKey(key))
                {
                    finalResult.put(key, map.get(key) + finalResult.get(key));
                    finalCount.put(key, finalCount.get(key) + 1);
                }
                else
                {
                    finalResult.put(key, map.get(key));
                    finalCount.put(key, map.get(key));
                }
            }
        }

        for(String key : finalResult.keySet())
            finalResult.put(key, finalResult.get(key) / finalCount.get(key));

        return finalResult;
    }

    private JSONObject mapToJson(Map<String, Double> finalMap)
    {
        Double forestationScore = 0.0;
        JSONObject json = new JSONObject();
        final String forestKey = "wa_total_reforestation_opportunity";
        if(finalMap.containsKey(forestKey) && finalMap.size() > 1)
        {
            forestationScore = finalMap.get(forestKey);
            Map<String, Double> shortMap = new HashMap<>(finalMap);
            shortMap.remove(forestKey);
            ArrayList<Map<String, Double>> quickList = new ArrayList<>();
            quickList.add(shortMap);
            json.put("species", quickList);
            json.put(forestKey, forestationScore);
            return json;
        }
        else if(finalMap.containsKey(forestKey) && finalMap.size() <= 1)
        {
            //UPDATE THIS TO RETURN FORMATTED JSON
            json.put(forestKey, finalMap.get(forestKey));
            json.put("species", "Not available");
            return json;
        }
        else
        {
            ArrayList<Map<String, Double>> quickList = new ArrayList<>();
            quickList.add(finalMap);
            json.put("species", quickList);
            json.put("wa_total_reforestation_opportunity", 0);
            return json;
        }
    }

//    private ArrayList<String> getIndexes()
//    {
//        GetInd
//
//        ArrayList<String> indices = this.client.
//
//                admin().cluster()
//                .prepareState().get().getState()
//                .getMetaData().getIndices();
//    }
}

