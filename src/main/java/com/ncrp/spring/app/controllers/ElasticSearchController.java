package com.ncrp.spring.app.controllers;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/search/geo")
/**
 * The controller for Elastic Search queries
 */
public class ElasticSearchController
{
    private final RestHighLevelClient client;

    @Autowired
    public ElasticSearchController(RestHighLevelClient esClient)
    {
        this.client = esClient;
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
        try
        {
            int distance = 100000;

            GeoPoint point = new GeoPoint(latitude, longitude);

            SearchSourceBuilder builder = new SearchSourceBuilder()
                                                .postFilter(QueryBuilders.geoDistanceQuery("location")
                                                .point(point)
                                                .distance(distance, DistanceUnit.METERS));

            SearchRequest searchRequest = new SearchRequest("trees");
            searchRequest.searchType(SearchType.DFS_QUERY_THEN_FETCH);
            searchRequest.source(builder);
            SearchResponse response = this.client.search(searchRequest, RequestOptions.DEFAULT);

//            processResponse(response.toString());

            return response.toString();
        }
        catch(Exception ex)
        {
            return ex.toString() + "\n\n\n\n\n\n\n\n\n\n\n\n\n" + this.client.toString();
        }

    }

    private ArrayList<GeoCoordinate> processResponse(String response)
    {
        try
        {
            return null;
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
}
