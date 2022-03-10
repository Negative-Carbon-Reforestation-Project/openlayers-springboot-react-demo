package com.ncrp.spring.app;

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

    public SearchResponse queryOpenSearch(double longitude, double latitude) throws IOException {
        int r = 1000;

        GeoPoint point = new GeoPoint(longitude, latitude);
        SearchSourceBuilder builder = new SearchSourceBuilder()
                .postFilter(QueryBuilders.geoDistanceQuery("location")
                        .point(point)
                        .distance(r, DistanceUnit.METERS));

        SearchRequest searchRequest = new SearchRequest("trees");
        searchRequest.searchType(SearchType.DFS_QUERY_THEN_FETCH);
        searchRequest.source(builder);
        SearchResponse response = highLevelClient.search(searchRequest, RequestOptions.DEFAULT);
        return response;
//        MultiSearchRequest request = new MultiSearchRequest();
//        SearchRequest latRequest = new SearchRequest();
//        SearchSourceBuilder builder = new SearchSourceBuilder()
//                .postFilter(QueryBuilders.rangeQuery("lat").from(latitude - offset).to(latitude + offset));

//        Criteria criteria = new Criteria("lat").greaterThan(latitude - offset).and("lat").lessThan(latitude + offset)
//                .and("long").greaterThan(longitude - offset).lessThan(longitude + offset);
//        Query query = new CriteriaQuery(criteria);

//        SearchResponse response = this.highLevelClient.search(query)

//        SearchSourceBuilder builder = new SearchSourceBuilder()
//                .postFilter(QueryBuilders.);
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

