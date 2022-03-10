package com.ncrp.spring.app.models;


import org.elasticsearch.common.geo.GeoPoint;

/**
 * Model for GeoCoordinates
 *
 * TO-DO: Not completed, creating our own geocoordinate model for debugging / extending functionality for future use.
 */
public class GeoCoordinate extends GeoPoint
{
    private double latitude;
    private double longitude;

    /**
     * Initializes a geo coordinate using the given latitude and longitude
     * @param latitude The latitude for the geo coordinate.
     * @param longitude The longitude for the geo coordinate.
     */
    public GeoCoordinate(double latitude, double longitude)
    {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    @Override
    /**
     * Returns a string representation of the geo coordinate.
     */
    public String toString()
    {
        return String.format("[lat=%f, long=%f]", latitude, longitude);
    }
}
