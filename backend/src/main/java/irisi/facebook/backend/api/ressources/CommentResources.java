package irisi.facebook.backend.api.ressources;


import irisi.facebook.backend.api.common.ResourcePath;
import irisi.facebook.backend.domain.command.CommentCommand;
import irisi.facebook.backend.domain.model.Comment;
import irisi.facebook.backend.domain.representations.CommentRepresentation;
import irisi.facebook.backend.services.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(ResourcePath.COMMENT)
@RequiredArgsConstructor
@Slf4j
public class CommentResources {

    private final CommentService commentService;


    @GetMapping
    public ResponseEntity<List<CommentRepresentation>> getAllComments() {
        return ResponseEntity.ok(commentService.getAll());
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentRepresentation>> getCommentsByPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @PostMapping
    public ResponseEntity<CommentRepresentation> insertComment(@RequestBody CommentCommand commentCommand) {

        log.info("comment: ",commentCommand);
        log.info("Adding a new comment: {}", commentCommand);
        return ResponseEntity.ok(commentService.create(commentCommand));
    }


    @PutMapping
    public ResponseEntity<CommentRepresentation> updateComment(@RequestBody CommentCommand commentCommand) {

        return ResponseEntity.ok(commentService.update(commentCommand));
    }


    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable int commentId) {
        return ResponseEntity.ok(commentService.delete(commentId));
    }
}
