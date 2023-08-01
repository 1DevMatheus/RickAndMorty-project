package com.rickandmortywiki.rickandmortywiki_feedback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rickandmortywiki.rickandmortywiki_feedback.model.PostModel;

@Repository
public interface PostRepository extends JpaRepository<PostModel, Long>{
    List<PostModel> findAllByUserContainingIgnoreCase(@Param("user") String user);
    List<PostModel> findAllByTargetContainingIgnoreCase(@Param("target") String target);


}
