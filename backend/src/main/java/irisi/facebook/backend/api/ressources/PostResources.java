package irisi.facebook.backend.api.ressources;

import irisi.facebook.backend.api.common.ResourcePath;
import irisi.facebook.backend.domain.command.PostCommand;
import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.model.Post;
import irisi.facebook.backend.domain.representations.PostRepresentation;
import irisi.facebook.backend.services.PostService;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(ResourcePath.POST)
@RequiredArgsConstructor
@Slf4j
public class PostResources {

    private final PostService postService;


    //method to get all posts
    @GetMapping
    public ResponseEntity<List<PostRepresentation>> getAllPosts() {
        return ResponseEntity.ok(postService.getAll());
    }

    @GetMapping("/posts/user/{userId}")
    public ResponseEntity<List<PostRepresentation>> getAllPostsByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(postService.getAllByUserId(userId));
    }

    @GetMapping("/{postId}/creator")
    public ResponseEntity<FBUser> getCreatorOfPost(@PathVariable int postId) {
        Post post = postService.getPostById(postId);

        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        FBUser creator = post.getPostOwner();

        if (creator == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(creator);
    }


    //method to save new post
    @PostMapping
    public ResponseEntity<Integer> insertPost(@RequestBody PostCommand postCommand) {
        log.info("ajouter un nouveau post : {}", postCommand);
        return ResponseEntity.ok(postService.create(postCommand));
    }

    //methode to update new post
    @PutMapping
    public ResponseEntity<PostRepresentation> updatePost(@RequestBody PostCommand postCommand) {
        return ResponseEntity.ok((postService.update(postCommand)));
    }

    //method to delete a post
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable int postId) {
        return ResponseEntity.ok(postService.delete(postId));
    }

}


