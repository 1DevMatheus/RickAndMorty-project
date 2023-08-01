package com.rickandmortywiki.rickandmortywiki_feedback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rickandmortywiki.rickandmortywiki_feedback.model.PostModel;

@Repository
public interface PostRepository extends JpaRepository<PostModel, Long>{

}
