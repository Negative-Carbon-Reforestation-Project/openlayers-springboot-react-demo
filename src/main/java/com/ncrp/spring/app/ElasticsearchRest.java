package com.ncrp.spring.app;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ncrp.spring.app.models.GeoCoordinate;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.search.MultiSearchRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

public class ElasticsearchRest extends AbstractElasticsearchConfiguration
{
    RestHighLevelClient highLevelClient;

    public ElasticsearchRest()
    {
        this.highLevelClient = elasticsearchClient();
    }

    @Override
    public RestHighLevelClient elasticsearchClient()
    {
        String host_port = "localhost:9200";
        final ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo(host_port)
                .build();
        return RestClients.create(clientConfiguration).rest();
    }

    public void testConnection() throws IOException {
//        GetRequest getRequest = new GetRequest(
//                "trees",
//                "0"
//        );
//        GetResponse getResponse = this.highLevelClient.get(getRequest, RequestOptions.DEFAULT);
        SearchSourceBuilder builder = new SearchSourceBuilder()
                .postFilter(QueryBuilders.rangeQuery("lat").from(48.3).to(48.4));

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.searchType(SearchType.DFS_QUERY_THEN_FETCH);
        searchRequest.source(builder);

        //Query seems to work, will need to check documentation for SearchResponse to figure out how to handle from here
        // - but it is 2am and I'm tired, so I'm going to bed
        SearchResponse response = this.highLevelClient.search(searchRequest, RequestOptions.DEFAULT);
    }

    public String queryOpenSearch(double longitude, double latitude) throws IOException {
        int r = 10000;

        GeoPoint point = new GeoPoint(longitude, latitude);
        SearchSourceBuilder builder = new SearchSourceBuilder()
                .postFilter(QueryBuilders.geoDistanceQuery("location")
                        .point(point)
                        .distance(r, DistanceUnit.METERS));

        SearchRequest searchRequest = new SearchRequest("trees");
        searchRequest.searchType(SearchType.DFS_QUERY_THEN_FETCH);
        searchRequest.source(builder);
        SearchResponse response = highLevelClient.search(searchRequest, RequestOptions.DEFAULT);
//        String location = processResponse(response.toString());
        processResponse(response.toString());
        return response.toString();
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

    public void closeConnection() throws IOException {
        this.highLevelClient.close();
    }

    public static void main(String[] args) throws IOException {
        ElasticsearchRest elasticsearchRest = new ElasticsearchRest();
        elasticsearchRest.queryOpenSearch(48.3, -124.651);
//        elasticsearchRest.testConnection();
        elasticsearchRest.closeConnection();
    }
}

