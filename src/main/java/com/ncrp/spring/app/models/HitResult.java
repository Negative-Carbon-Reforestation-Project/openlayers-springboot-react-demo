package com.ncrp.spring.app.models;

import org.elasticsearch.common.geo.GeoPoint;

import java.util.HashMap;
import java.util.Map;

public class HitResult
{
    private Map<String, Double> species_map;
    private GeoPoint location;

    public HitResult()
    {
        this.species_map = new HashMap<>();
        this.location = null;
    }

    public HitResult(Map<String, Double> species_map, GeoPoint location)
    {
        this.species_map = species_map;
        this.location = location;
    }

    public HitResult(Map<String, Double> species_map, double latitude, double longitude)
    {
        this.species_map = species_map;
        this.location = new GeoPoint(latitude, longitude);
    }

    public Map<String, Double> getSpecies_map() {
        return species_map;
    }

    public void setSpecies_map(Map<String, Double> species_map) {
        this.species_map = species_map;
    }

    public GeoPoint getLocation() {
        return location;
    }

    public void setLocation(GeoPoint location) {
        this.location = location;
    }

    public void addToMap(String newKey, Double value)
    {
        this.species_map.put(newKey, value);
    }

    public String toString()
    {
        return "Location: " + this.location.toString() + "\nMap: " + this.species_map.toString();
    }
}
