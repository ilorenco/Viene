package com.joinvalle.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardingController {
    @RequestMapping("/")
    public String redirectToIndex() {
        return "forward:/browser/index.html";
    }
}