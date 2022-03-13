package com.ncrp.spring.app.models;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    private String location;
    private int id;
    private  double normValue;

    /**
     * Initializes a geo coordinate using the given latitude and longitude
     * @param latitude The latitude for the geo coordinate.
     * @param longitude The longitude for the geo coordinate.
     */
    public GeoCoordinate(double latitude, double longitude, String location, int id, double normValue)
    {
        this.latitude = latitude;
        this.longitude = longitude;
        this.location = location;
        this.id = id;
        this.normValue = normValue;

    }

    public double getLatitude()
    {
        return latitude;
    }

    public void setLatitude(double latitude)
    {
        this.latitude = latitude;
    }

    public double getLongitude()
    {
        return longitude;
    }

    public void setLongitude(double longitude)
    {
        this.longitude = longitude;
    }

    public String getLocation()
    {
        return location;
    }

    public void setLocation(String location)
    {
        this.location = location;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public double getNormValue()
    {
        return normValue;
    }

    public void setNormValue(double normValue)
    {
        this.normValue = normValue;
    }

    @Override
    /**
     * Returns a string representation of the geo coordinate.
     */
    public String toString()
    {
        return String.format("[lat=%f, long=%f]", latitude, longitude);
    }

    public String toJson()
    {
        ObjectMapper mapper = new ObjectMapper();
        try
        {
            String jsonString = mapper.writeValueAsString(this);
            return jsonString;
        }
        catch(Exception error)
        {
            System.out.println("Error creating json object from GeoCoordinates.java");
            return null;
        }
    }
}
