package com.ncrp.spring.app.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RayServeService {

  private final RestTemplate restTemplate;

  private final String url;

  public RayServeService(@Value("${ray_host}") String rayHost, @Value("${ray_port}") int rayPort) {
    this.restTemplate = new RestTemplate();
    this.url = "http://" + rayHost + ":" + rayPort;
  }

  public String getReforestationPrediction(double longitude, double latitude) {
    JSONObject body = new JSONObject();
    body.put("longitude", longitude);
    body.put("latitude", latitude);
    return restTemplate.postForObject(url + "/opportunity", body.toString(), String.class);
  }
}