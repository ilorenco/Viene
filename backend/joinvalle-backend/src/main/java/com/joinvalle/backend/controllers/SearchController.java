package com.joinvalle.backend.controllers;

import com.joinvalle.backend.dtos.SearchResultDTO;
import com.joinvalle.backend.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/busca")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping
    public List<SearchResultDTO> search(@RequestParam("q") String keyword) {
        return searchService.search(keyword);
    }
}
