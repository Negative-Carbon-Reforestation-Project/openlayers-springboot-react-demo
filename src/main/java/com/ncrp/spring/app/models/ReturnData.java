package com.ncrp.spring.app.models;

import java.util.Map;

public class ReturnData
{
    private Map<String, Double> innerMap;
    private Map<String, Map<String, Double>> outerMap;
    private Double forestationScore;

    public ReturnData()
    {
        this.forestationScore = -1.0;
    }

    public ReturnData(Map<String, Map<String, Double>> outerMap, Double forestationScore)
    {
        this.outerMap = outerMap;
        this.innerMap = outerMap.get(outerMap.keySet().toArray()[0]);
        this.forestationScore = forestationScore;
    }

    public Map<String, Double> getInnerMap() {
        return innerMap;
    }

    public void setInnerMap(Map<String, Double> innerMap) {
        this.innerMap = innerMap;
    }

    public Map<String, Map<String, Double>> getOuterMap() {
        return outerMap;
    }

    public void setOuterMap(Map<String, Map<String, Double>> outerMap) {
        this.outerMap = outerMap;
    }

    public Double getForestationScore() {
        return forestationScore;
    }

    public void setForestationScore(Double forestationScore) {
        this.forestationScore = forestationScore;
    }
}
