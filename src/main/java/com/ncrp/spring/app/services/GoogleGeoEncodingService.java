package com.ncrp.spring.app.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

// Should take in an address from app and hook into Google Geo Encoding API
    // https://developers.google.com/maps/documentation/geocoding/start
public class GoogleGeoEncodingService {
    private final String baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    private String address;
//    private URLConnection urlConnection;

    public GoogleGeoEncodingService()
    {

    }

    public String getCoords(String address)
    {
        try
        {
            URL geoEncodURL = new URL(getURL(address));
        }
        catch (MalformedURLException error)
        {
            System.out.println("Forming the URL failed");
            //TODO: I want this to return an error informing user that they need to re-enter the address or contact us
            return null;
        }
        catch(IOException error)
        {
            System.out.println("Opening the connection failed");
            //TODO: Should return a connection error notice to user. They should either wait and try again or contact us
            return null;
        }
        return null;
    }

    private String getURL(String address)
    {

        String[] splitAddress = address.split(" ");
        String finalURL = baseURL + splitAddress[0];
        for(int i = 1; i < splitAddress.length; i++)
        {
            finalURL += "+" + splitAddress[i];
        }

        return finalURL;
    }

    public static void main(String[] args)
    {
        GoogleGeoEncodingService thing = new GoogleGeoEncodingService();
        System.out.println(thing.getCoords("1600 Amphitheatre Parkway, Mountain View, CA"));
    }

}
