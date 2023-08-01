package com.rickandmortywiki.rickandmortywiki_feedback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rickandmortywiki.rickandmortywiki_feedback.model.PostModel;
import com.rickandmortywiki.rickandmortywiki_feedback.repository.PostRepository;

public class PostController {
	
	@RestController
	@RequestMapping("/post")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public class PostagemController {
		
		@Autowired
		private PostRepository postRepository;
		
		@GetMapping
		public ResponseEntity<List<PostModel>> getAll(){
			return ResponseEntity.ok(postRepository.findAll());
		}

	}
}
