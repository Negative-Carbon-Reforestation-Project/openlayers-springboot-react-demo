package com.ncrp.spring.app.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ncrp.spring.app.models.GeoCoordinate;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/search/geo")
/**
 * The controller for Elastic Search queries
 */
public class ElasticSearchController extends AbstractElasticsearchConfiguration
{

    @Override
    public RestHighLevelClient elasticsearchClient()
    {
        String host_port = "localhost:9200";
        final ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo(host_port)
                .build();
        return RestClients.create(clientConfiguration).rest();
    }

    @GetMapping
    /**
     * Get mapping for our endpoint.
     *
     * Theoretical example: /api/search/geo?latitude=140&longitude=27
     *                      will map latitude as 140 and longitude as 27.
     */
    public String getQuery(@RequestParam("latitude") double latitude, @RequestParam("longitude") double longitude)
    {
        try (RestHighLevelClient highLevelClient = elasticsearchClient())
        {
            int distance = 1000;

            GeoPoint point = new GeoPoint(longitude, latitude);

            SearchSourceBuilder builder = new SearchSourceBuilder()
                                                .postFilter(QueryBuilders.geoDistanceQuery("location")
                                                .point(point)
                                                .distance(distance, DistanceUnit.METERS));

            SearchRequest searchRequest = new SearchRequest("trees");
            searchRequest.searchType(SearchType.DFS_QUERY_THEN_FETCH);
            searchRequest.source(builder);
            SearchResponse response = highLevelClient.search(searchRequest, RequestOptions.DEFAULT);

            processResponse(response.toString());

            return response.toString();
        }
        catch(Exception ex)
        {
            return null;
        }

    }

    private ArrayList<GeoCoordinate> processResponse(String response)
    {
        ObjectMapper mapper = new ObjectMapper();
        //com.fasterxml.jackson.core.JsonProcessingException, com.fasterxml.jackson.databind.JsonMappingException
        try
        {
            Map<String, Object> map = mapper.readValue(response, new TypeReference<Map<String,Object>>(){});
            // This section is dirty and I know it. Will need to make this more generic if time allows - Matt Tk
            ArrayList<Object> hitsList = (ArrayList<Object>) ((LinkedHashMap<String, Object>) map.get("hits")).get("hits");
            ArrayList<GeoCoordinate> coordList = new ArrayList<>();
            for(int x = 0; x < hitsList.size(); x++)
            {
                LinkedHashMap<String, Object> tempHashMap = (LinkedHashMap<String, Object>) ((LinkedHashMap<String, Object>) hitsList.get(x)).get("_source");
                GeoCoordinate newCoord = new GeoCoordinate((Double) tempHashMap.get("lat"), (Double) tempHashMap.get("long"), (String) tempHashMap.get("location"), (Integer) tempHashMap.get("id"), (Double) tempHashMap.get("norm_value"));
                coordList.add(newCoord);
            }
            return coordList;

        }
        catch(Exception error)
        {
            System.out.println("Error processing json");
            return null;
        }
    }

    private ArrayList<String> calcScore(ArrayList<GeoCoordinate> geoList)
    {
        return null;
    }

    //Implements Haversine formula to calculate distance:
    // https://en.wikipedia.org/wiki/Haversine_formula
    private double getDistance(GeoCoordinate initGeo, GeoCoordinate newGeo)
    {

        return 0.0;
    }


//    /**
//     *
//     * @param response
//     */
//    private String processResponse(String response)
//    {
//        ObjectMapper mapper = new ObjectMapper();
//        //com.fasterxml.jackson.core.JsonProcessingException, com.fasterxml.jackson.databind.JsonMappingException
//        try
//        {
//            JsonNode jsonNode = mapper.readTree(response);
//            String location = jsonNode.get("location").asText();
//            return location;
//        }
//        catch(Exception error)
//        {
//            System.out.println("Error processing json");
//            return null;
//        }
//    }

//    @GetMapping
//    /**
//     * Get mapping for our range query endpoint [Needs to be completed].
//     */
//    public void getRangeQuery()
//    {
//        // Do something funny
//    }

//    @GetMapping
//    /**
//     * Get mapping for our endpoint. >>>>>>>>>>>> TEST METHOD to check endpoint <<<<<<<<<<<<<
//     *
//     * Theoretical example: /api/search/geo?latitude=140&longitude=27
//     *                      will map latitude as 140 and longitude as 27.
//     */
//    public String getQuery(@RequestParam("latitude") double latitude, @RequestParam("longitude") double longitude)
//    {
//        return String.format("Lat=%f, Long=%f", latitude,longitude);
//
//    }


}
