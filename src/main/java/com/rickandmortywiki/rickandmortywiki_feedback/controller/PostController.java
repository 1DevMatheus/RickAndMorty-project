package com.rickandmortywiki.rickandmortywiki_feedback.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.rickandmortywiki.rickandmortywiki_feedback.model.PostModel;
import com.rickandmortywiki.rickandmortywiki_feedback.repository.PostRepository;

	
	@RestController
	@RequestMapping("/post")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public class PostController {
	
		
		@Autowired
		private PostRepository postRepository;
		
		@GetMapping
		public ResponseEntity<List<PostModel>> getAll(){
			return ResponseEntity.ok(postRepository.findAll());
		}
		@GetMapping("/{id}")
		public ResponseEntity<PostModel> getById(@PathVariable Long id){
			return postRepository.findById(id)
					.map(resp -> ResponseEntity.ok(resp))
					.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
		}
		@GetMapping("/user/{user}")
		public ResponseEntity<List<PostModel>> getByUser(@PathVariable String user){
			return ResponseEntity.ok(postRepository.findAllByUserContainingIgnoreCase(user));
		}
	
	@GetMapping("/target/{target}")
	public ResponseEntity<List<PostModel>> getByTarget(@PathVariable String target){
		return ResponseEntity.ok(postRepository.findAllByTargetContainingIgnoreCase(target));
	}
		@PostMapping
		public ResponseEntity<PostModel> post(@Valid @RequestBody PostModel post) {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(postRepository.save(post));
		}

		@PutMapping
		public ResponseEntity<PostModel> put(@Valid @RequestBody PostModel post) {
			return postRepository.findById(post.getId())
					.map(response -> ResponseEntity.status(HttpStatus.OK)
							.body(postRepository.save(post)))
					.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
		}

		@ResponseStatus(HttpStatus.NO_CONTENT)
		@DeleteMapping("/{id}")
		public void delete(@PathVariable Long id) {
			Optional<PostModel> post = postRepository.findById(id);
			
			if(post.isEmpty())
				throw new ResponseStatusException(HttpStatus.NOT_FOUND);
			
			postRepository.deleteById(id);				
		}

	}

