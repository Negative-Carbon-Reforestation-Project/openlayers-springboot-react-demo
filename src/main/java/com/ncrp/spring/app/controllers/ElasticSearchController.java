package com.ncrp.spring.app.controllers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.ncrp.spring.app.services.ElasticSearchService;
import org.apache.coyote.Request;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
     * Get mapping for our endpoint then process + return search results
     *
     * @param longitude The longitude specified in the request query
     * @param latitude The latitude specified in the request query
     *
     * Example: /api/search/geo?longitude=-121&latitude=48 will map latitude as 48 and longitude as -121.
     */
    public String getQuery(@RequestParam("longitude") double longitude, @RequestParam("latitude") double latitude)
    {
        String jsonString = elasticSearchService.getSpeciesData(longitude,latitude);
        return jsonString;
    }


//    @GetMapping
//    @CrossOrigin(origins = "http://localhost:3000")
//    /**
//     * TO-DO: Improved handler that sends a response object instead of a string. Useful for error checking.
//     *
//     * Get mapping for our endpoint then process + return search results
//     *
//     * @param longitude The longitude specified in the request query
//     * @param latitude The latitude specified in the request query
//     * @return
//     * Example: /api/search/geo?longitude=-121&latitude=48 will map latitude as 48 and longitude as -121.
//     */
//    public ResponseEntity getQuery(@RequestParam("longitude") double longitude, @RequestParam("latitude") double latitude)
//    {
//        try
//        {
//            return new ResponseEntity<>(elasticSearchService.getSpeciesData(longitude,latitude), HttpStatus.OK);
//        }
//        catch (Exception exception)
//        {
//            return new ResponseEntity<>(exception.getStackTrace(), HttpStatus.BAD_REQUEST);
//        }
//    }
}

