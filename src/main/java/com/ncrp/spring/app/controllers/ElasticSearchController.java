package com.ncrp.spring.app.controllers;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ncrp.spring.app.models.HitResult;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/search/geo")
/**
 * The controller for Elastic Search queries
 */
public class ElasticSearchController
{
    private final RestHighLevelClient client;
    private final double EARTH_RADIUS = 6371;

    @Autowired
    public ElasticSearchController(RestHighLevelClient esClient)
    {
        this.client = esClient;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    /**
     * Get mapping for our endpoint then process + return search results.
     *
     * Theoretical example: /api/search/geo?longitude=-121&latitude=48
     *                      will map latitude as 48 and longitude as -121.
     */
    public String getQuery(@RequestParam("longitude") double longitude, @RequestParam("latitude") double latitude)
    {
        try
        {
            //Change to 100m
            int distance = 1000;

            GeoPoint point = new GeoPoint(latitude, longitude);

            SearchSourceBuilder builder = new SearchSourceBuilder()
                                                .postFilter(QueryBuilders.geoDistanceQuery("location")
                                                .point(point)
                                                .distance(distance, DistanceUnit.METERS));

            SearchRequest searchRequest = new SearchRequest("trees");
            searchRequest.searchType(SearchType.DFS_QUERY_THEN_FETCH);
            searchRequest.source(builder);
            SearchResponse response = this.client.search(searchRequest, RequestOptions.DEFAULT);
            ObjectMapper mapper = new ObjectMapper();
            ArrayList<Map<String, Double>> processedResults = processResponse(response, point);
            if(processedResults == null)
            {
                return "{\"tree\": \"none\"}";
            }
            Map<String, Double> summedResults = sumSearchResults(processedResults);

            //ZEROES REMOVED HERE
            Map<String, Double> trimmedResults = removeEmpty(summedResults);

            String userJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(trimmedResults);

            return userJson;
        }
        catch(Exception ex)
        {
            return ex.toString() + "\n\n\n\n\n\n\n\n\n\n\n\n\n" + this.client.toString();
        }

    }

    private Map<String, Double> removeEmpty(Map<String, Double> map)
    {
        ArrayList<String> toRemove = new ArrayList<>();
        for(String key : map.keySet())
        {
            if(map.get(key) <= 0.0)
            {
                toRemove.add(key);
            }
        }

        for(String key : toRemove)
        {
            map.remove(key);
        }

        return map;
    }

    //Process a SearchResponse object into HitResult objects, which is then transformed into an ArrayList of Maps
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

                Map<String, Object> currentSource = currentHit.getSourceAsMap();    //Have to store as object I believe?

                for(String key : currentSource.keySet())
                {
                    if(key.equals("location"))
                    {
                        ArrayList<Double> thing = (ArrayList<Double>) currentSource.get(key);   //I think this cast is safe?
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
                //Use distance to calculate score of that species
                //Sum up results across each search result/species
            ArrayList<Map<String, Double>> scores = new ArrayList<>();

            for(HitResult result : results)
            {
                Map<String, Double> map_score = new HashMap<>();

                //Iterate through each species in result
                for(String key : result.getSpecies_map().keySet())
                {
                    Double score = 0.0;
                    Double normValue = result.getSpecies_map().get(key);
                    Double distance = getDistance(queryPoint.getLat(), queryPoint.getLon(), result.getLocation().getLat(), result.getLocation().getLon());
                    if(normValue > 0.0) //Make sure we aren't dividing by zero
                        score = calcScore(distance, normValue, distance);
                    map_score.put(key, score);
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

    //Sums search results across tree types for final score
    private Map<String, Double> sumSearchResults(ArrayList<Map<String, Double>> results)
    {
        Map<String, Double> finalSum = new HashMap<>();

        //Looping through each map
        for(Map<String, Double> map : results)
        {
            //Looping through each key in a map
            for(String key : map.keySet())
            {
                if(finalSum.containsKey(key))
                    finalSum.put(key, finalSum.get(key) + map.get(key));    //If it exists already, sum with prev entry
                else
                    finalSum.put(key, map.get(key));    //Other-wise just pop it in there
            }
        }
        return finalSum;
    }

    //Current score calculations. Currently, results in very small number that isn't very user-friendly
    private double calcScore(double distance, double score, double searchRadius)
    {
        return(1 / distance * score * searchRadius);
    }

    // Calculates distance between two lat/long pairs using the Haversine Formula
    // May need to revisit to verify accuracy of measurements
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
}

