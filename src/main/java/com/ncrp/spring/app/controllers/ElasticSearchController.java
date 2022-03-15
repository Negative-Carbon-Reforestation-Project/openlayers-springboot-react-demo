package com.ncrp.spring.app.controllers;

import com.ncrp.spring.app.services.ElasticSearchService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/search/geo")
/**
 * The controller for Elastic Search queries
 */
public class ElasticSearchController
{
    private final ElasticSearchService elasticSearchService;

    @Autowired
    public ElasticSearchController(ElasticSearchService elasticService)
    {
        this.elasticSearchService = elasticService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    /**
     * Get mapping for our endpoint then process + return search results.
     *
     * Theoretical example: /api/search/geo?longitude=-121&latitude=48
     *                      will map latitude as 48 and longitude as -121.
     */
    public JSONObject getQuery(@RequestParam("longitude") double longitude, @RequestParam("latitude") double latitude)
    {
        return elasticSearchService.getSpeciesData(longitude, latitude);
    }
}

