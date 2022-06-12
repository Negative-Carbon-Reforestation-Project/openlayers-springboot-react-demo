package com.ncrp.spring.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
/**
 * The controller for the app.
 *
 * @remarks: Needed for forward compatiblity with React-Router.
 */
public class AppController
{
    @RequestMapping(
        value = {
                "/",
                "/index",
                "/mission",
                "/accessibility",
                "/terms",
                "/privacy",
                "/maps",
                "/maps/embed"
        }
    )
    /**
     * Returns the index page when requests are sent to the routes specified in the request mapping
     */
    public String getIndex()
    {
        return "/index.html";
    }
}
