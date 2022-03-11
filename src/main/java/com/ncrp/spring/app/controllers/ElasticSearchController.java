package com.ncrp.spring.app.controllers;

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
import Jackson;


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
            return response.toString();
        }
        catch(Exception ex)
        {
            return null;
        }

    }

    private void processResponse(String response)
    {

    }

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
