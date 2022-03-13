package com.ncrp.spring.app;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
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
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.net.ssl.SSLContext;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

@SpringBootApplication
@EnableElasticsearchRepositories
public class Application
{

	@Bean(name = "esClient")
	public RestHighLevelClient elasticsearchClient(@Value("${opensearch_host}") String opensearchHost,
												   @Value("${opensearch_port}") Integer opensearchPort)
			throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException
	{
//        LOG.log(Level.INFO, "Loading opensearch client to: " + opensearchHost + ":" + opensearchPort);
		final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
		credentialsProvider.setCredentials(AuthScope.ANY,
				new UsernamePasswordCredentials("admin", "admin"));
		SSLContextBuilder sslBuilder = SSLContexts.custom().loadTrustMaterial(null, (x509Certificates, s) -> true);
		final SSLContext sslContext = sslBuilder.build();
		RestClientBuilder builder = RestClient.builder(new HttpHost(opensearchHost, opensearchPort, "https"))
				.setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
					@Override
					public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
						return httpClientBuilder
								.setDefaultCredentialsProvider(credentialsProvider)
								.setSSLContext(sslContext)
								.setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE);
					}
				});
		RestHighLevelClient client = new RestHighLevelClient(builder);
		return client;
	}

	public static void main(String[] args)
	{
		SpringApplication.run(Application.class, args);
	}

}
