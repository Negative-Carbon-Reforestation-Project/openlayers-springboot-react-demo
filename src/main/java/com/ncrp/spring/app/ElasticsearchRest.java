//package com.ncrp.spring.app;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.ncrp.spring.app.models.GeoCoordinate;
//import org.apache.http.client.CredentialsProvider;
//import org.apache.http.impl.client.BasicCredentialsProvider;
//import org.elasticsearch.action.get.GetRequest;
//import org.elasticsearch.action.get.GetResponse;
//import org.elasticsearch.action.search.MultiSearchRequest;
//import org.elasticsearch.action.search.SearchRequest;
//import org.elasticsearch.action.search.SearchResponse;
//import org.elasticsearch.action.search.SearchType;
//import org.elasticsearch.client.RequestOptions;
//import org.elasticsearch.client.Response;
//import org.elasticsearch.client.RestHighLevelClient;
//import org.elasticsearch.common.geo.GeoPoint;
//import org.elasticsearch.common.unit.DistanceUnit;
//import org.elasticsearch.index.query.QueryBuilders;
//import org.elasticsearch.search.builder.SearchSourceBuilder;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.data.elasticsearch.client.ClientConfiguration;
//import org.springframework.data.elasticsearch.client.RestClients;
//import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
//import org.springframework.data.elasticsearch.core.query.Criteria;
//import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
//import org.springframework.data.elasticsearch.core.query.Query;
//import javax.net.ssl.SSLContext;
//import java.security.KeyManagementException;
//import java.security.KeyStoreException;
//import java.security.NoSuchAlgorithmException;
//import java.util.logging.Level;
//import java.util.logging.Logger;
//import org.apache.http.HttpHost;
//import org.apache.http.auth.AuthScope;
//import org.apache.http.auth.UsernamePasswordCredentials;
//import org.apache.http.client.CredentialsProvider;
//import org.apache.http.conn.ssl.NoopHostnameVerifier;
//import org.apache.http.impl.client.BasicCredentialsProvider;
//import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
//import org.apache.http.ssl.SSLContextBuilder;
//import org.apache.http.ssl.SSLContexts;
//import org.elasticsearch.action.index.IndexRequest;
//import org.elasticsearch.client.RestClient;
//import org.elasticsearch.client.RestClientBuilder;
//import org.elasticsearch.client.RestHighLevelClient;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//import org.springframework.core.io.Resource;
//import org.springframework.data.elasticsearch.client.ClientConfiguration;
//import org.springframework.data.elasticsearch.client.RestClients;
//import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
//import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
//
//import java.io.IOException;
//import java.security.KeyManagementException;
//import java.security.KeyStoreException;
//import java.util.ArrayList;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
//@SpringBootApplication
//@EnableElasticsearchRepositories
//public class ElasticsearchRest
//{
//    RestHighLevelClient highLevelClient;
//
//
//    public ElasticsearchRest() throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
//        this.highLevelClient = elasticsearchClient("a4059048841004a80a3e273b13fe4b57-228758828.us-west-2.elb.amazonaws.com", 9200);
//    }
//
////    @Override
////    public RestHighLevelClient elasticsearchClient()
////    {
////        String host_port = "a4059048841004a80a3e273b13fe4b57-228758828.us-west-2.elb.amazonaws.com:9200";
//////        String host_port = "localhost:9200";
////        final ClientConfiguration clientConfiguration = ClientConfiguration.builder()
////                .connectedTo(host_port)
////                .withBasicAuth("admin","admin")
////                .build();
////        return RestClients.create(clientConfiguration).rest();
////    }
//
////    @Bean(name = "esClient")
////    public RestHighLevelClient elasticsearchClient(@Value("${opensearch_host}") String opensearchHost,
////                                            @Value("${opensearch_port}") Integer opensearchPort)
////            throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException
////    {
//////        LOG.log(Level.INFO, "Loading opensearch client to: " + opensearchHost + ":" + opensearchPort);
////        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
////        credentialsProvider.setCredentials(AuthScope.ANY,
////                new UsernamePasswordCredentials("admin", "admin"));
////        SSLContextBuilder sslBuilder = SSLContexts.custom().loadTrustMaterial(null, (x509Certificates, s) -> true);
////        final SSLContext sslContext = sslBuilder.build();
////        RestClientBuilder builder = RestClient.builder(new HttpHost(opensearchHost, opensearchPort, "https"))
////                .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
////                    @Override
////                    public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
////                        return httpClientBuilder
////                                .setDefaultCredentialsProvider(credentialsProvider)
////                                .setSSLContext(sslContext)
////                                .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE);
////                    }
////                });
////        RestHighLevelClient client = new RestHighLevelClient(builder);
////        //final ClientConfiguration configuration = ClientConfiguration.create(opensearchHost + ":" + opensearchPort);
////        //RestHighLevelClient client = RestClients.create(configuration).rest();
////        return client;
////    }
//
//    public SearchResponse searchAll() {
//        SearchSourceBuilder builder = new SearchSourceBuilder()
//                //
//                .query(QueryBuilders.rangeQuery("lat").from(48.3).to(48.4));
//        SearchRequest searchRequest = new SearchRequest("tree-data")
//                .source(builder);
//        try {
//            SearchResponse searchResponse = this.highLevelClient.search(searchRequest, RequestOptions.DEFAULT);
//            return searchResponse;
//        } catch (IOException e) {
////            LOG.log(Level.WARNING, "unable to searchAll:", e);
//        }
//        return null;
//    }
//
//    public void testConnection() throws IOException {
//
//        GetRequest getRequest = new GetRequest("tree-data", "cec0ee69f13239de668225118e227e85");
//        GetResponse response = this.highLevelClient.get(getRequest, RequestOptions.DEFAULT);
//
////        GetRequest getRequest = new GetRequest(
////                "trees",
////                "0"
////        );
////        GetResponse getResponse = this.highLevelClient.get(getRequest, RequestOptions.DEFAULT);
////        SearchSourceBuilder builder = new SearchSourceBuilder()
////                .postFilter(QueryBuilders.rangeQuery("lat").from(48.3).to(48.4));
////
////        SearchRequest searchRequest = new SearchRequest();
////        searchRequest.searchType(SearchType.DFS_QUERY_THEN_FETCH);
////        searchRequest.source(builder);
//
//        //Query seems to work, will need to check documentation for SearchResponse to figure out how to handle from here
//        // - but it is 2am and I'm tired, so I'm going to bed
////        SearchResponse response = this.highLevelClient.search(searchRequest, RequestOptions.DEFAULT);
//    }
//
//    public String queryOpenSearch(double longitude, double latitude) throws IOException {
//        int r = 10000;
//
//        GeoPoint point = new GeoPoint(longitude, latitude);
//        SearchSourceBuilder builder = new SearchSourceBuilder()
//                .postFilter(QueryBuilders.geoDistanceQuery("location")
//                        .point(point)
//                        .distance(r, DistanceUnit.METERS));
//
//        SearchRequest searchRequest = new SearchRequest("tree-data");
//        searchRequest.searchType(SearchType.DFS_QUERY_THEN_FETCH);
//        searchRequest.source(builder);
//        SearchResponse response = highLevelClient.search(searchRequest, RequestOptions.DEFAULT);
////        String location = processResponse(response.toString());
//        processResponse(response.toString());
//        return response.toString();
//    }
//
//
//    private ArrayList<GeoCoordinate> processResponse(String response)
//    {
//        ObjectMapper mapper = new ObjectMapper();
//        //com.fasterxml.jackson.core.JsonProcessingException, com.fasterxml.jackson.databind.JsonMappingException
//        try
//        {
//            Map<String, Object> map = mapper.readValue(response, new TypeReference<Map<String,Object>>(){});
//            // This section is dirty and I know it. Will need to make this more generic if time allows - Matt Tk
//            ArrayList<Object> hitsList = (ArrayList<Object>) ((LinkedHashMap<String, Object>) map.get("hits")).get("hits");
//
//            ArrayList<GeoCoordinate> coordList = new ArrayList<>();
//            for(int x = 0; x < hitsList.size(); x++)
//            {
//                LinkedHashMap<String, Object> tempHashMap = (LinkedHashMap<String, Object>) ((LinkedHashMap<String, Object>) hitsList.get(x)).get("_source");
//                GeoCoordinate newCoord = new GeoCoordinate((Double) tempHashMap.get("lat"), (Double) tempHashMap.get("long"), (String) tempHashMap.get("location"), (Integer) tempHashMap.get("id"), (Double) tempHashMap.get("norm_value"));
//                coordList.add(newCoord);
//            }
//            return coordList;
//
//        }
//        catch(Exception error)
//        {
//            System.out.println("Error processing json");
//            return null;
//        }
//    }
//
//    public void closeConnection() throws IOException {
//        this.highLevelClient.close();
//    }
//
//    public static void main(String[] args) throws IOException, KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
//        ElasticsearchRest elasticsearchRest = new ElasticsearchRest();
////        elasticsearchRest.searchAll();
//        elasticsearchRest.queryOpenSearch(48.9964, -121.4147);
////        elasticsearchRest.testConnection();
//        elasticsearchRest.closeConnection();
//    }
//}
//
