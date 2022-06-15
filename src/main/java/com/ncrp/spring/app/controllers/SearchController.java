package com.ncrp.spring.app.controllers;

import com.ncrp.spring.app.services.OpenSearchService;
import com.ncrp.spring.app.services.RayServeService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search/geo")
/**
 * The controller for map queries
 */
public class SearchController
{
    private final OpenSearchService openSearchService;

    private final RayServeService rayServeService;

    @Autowired
    public SearchController(OpenSearchService openSearchService, RayServeService rayServeService)
    {
        this.openSearchService = openSearchService;
        this.rayServeService = rayServeService;
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
        String opensearch_response = openSearchService.getSpeciesData(longitude, latitude);
        JSONObject ray_response = new JSONObject(rayServeService.getReforestationPrediction(longitude, latitude));
        JSONObject result = new JSONObject(opensearch_response);
        result.put("prediction", ray_response.get("prediction"));
        return result.toString();
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
//            return new ResponseEntity<>(searchService.getSpeciesData(longitude,latitude), HttpStatus.OK);
//        }
//        catch (Exception exception)
//        {
//            return new ResponseEntity<>(exception.getStackTrace(), HttpStatus.BAD_REQUEST);
//        }
//    }
}

