package com.ncrp.spring.app.controllers;

import com.ncrp.spring.app.services.GoogleGeoEncodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class GoogleGeoEncodingController {
    private final GoogleGeoEncodingService geoEncodingService;

    @Autowired
    public GoogleGeoEncodingController(GoogleGeoEncodingService geoEncodingService)
    {

        this.geoEncodingService = geoEncodingService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public String getAddressQuery(@RequestParam("address") String address)
    {
        String coords = geoEncodingService.getCoords(address);
        return coords;
    }
}
