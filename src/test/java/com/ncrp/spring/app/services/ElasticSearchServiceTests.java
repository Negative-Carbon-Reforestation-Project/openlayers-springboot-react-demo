package com.ncrp.spring.app.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
/**
 * Contains tests for the Elastic Search Service
 *
 * TO-DO: Unit tests are only written for public methods. Currently,
 * the service is coupled tight to some private methods that could use some testing.
 */
public class ElasticSearchServiceTests
{
    @Autowired
    private ElasticSearchService elasticSearchService;

    @Test
    /**
     * TO-DO: Simple method stub to test getSpeciesData, please cross reference known results and assertEquals on experimental results.
     * Read about parameterized testing on JUnit
     */
    void getSpeciesDataWithCorrectCoordinatesReturnsTrue()
    {

       //  this.elasticSearchService.getSpeciesData(1, 1);
    }

    @Test
    void getSpeciesDataWithIncorrectCoordinatesThrowsException()
    {

    }
}
