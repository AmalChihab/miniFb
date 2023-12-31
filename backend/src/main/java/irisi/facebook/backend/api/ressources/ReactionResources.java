package irisi.facebook.backend.api.ressources;

import irisi.facebook.backend.api.common.ResourcePath;
import irisi.facebook.backend.domain.command.ReactionCommand;
import irisi.facebook.backend.domain.model.Reaction;
import irisi.facebook.backend.services.ReactionService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ResourcePath.REACTION)
@RequiredArgsConstructor
public class ReactionResources {
    private final ReactionService reactionService;

    @GetMapping("/all")
    public ResponseEntity<List<Reaction>> getAllReactions() {
        List<Reaction> reactions = reactionService.getAllReactions();
        return ResponseEntity.ok(reactions);
    }
    @GetMapping("/nbrLikes/{postId}")
    public int getNumberOfLikes(@PathVariable int postId){
        return reactionService.getNbrLikes(postId);
    }

    @GetMapping("/nbrDislikes/{postId}")
    public int getNumberOfDislikes(@PathVariable int postId){
        return reactionService.getNbrDislikes(postId);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Reaction>> getReactionsByPostId(@PathVariable int postId) {
        List<Reaction> reactions = reactionService.getReactionByPostId(postId);
        return ResponseEntity.ok(reactions);
    }

    @GetMapping("/reactionId")
    public ResponseEntity<Integer> getReactionIdByPostIdAndUserId(@RequestParam int postId, @RequestParam int userId) {
        Integer reactionId = reactionService.getReactionIdByPostIdAndUserId(postId, userId);
        return ResponseEntity.ok(reactionId);
    }

    @PostMapping("/create")
    public ResponseEntity<Reaction> createReaction(
            @RequestBody ReactionCommand reactionCommand) {
        Reaction reaction = reactionService.createReaction(
                reactionCommand.getUser(),
                reactionCommand.getPostId(),
                reactionCommand.getType()
        );
        return new ResponseEntity<>(reaction, HttpStatus.CREATED);
    }

    @PutMapping("/{reactionId}")
    public ResponseEntity<Reaction> updateReactionType(
            @PathVariable int reactionId,
            @RequestBody ReactionCommand reactionCommand) {
        Reaction updatedReaction = reactionService.updateReactionType(reactionId, reactionCommand.getType());
        return ResponseEntity.ok(updatedReaction);
    }

    @DeleteMapping("/{reactionId}")
    public ResponseEntity<Void> deleteReaction(@PathVariable int reactionId) {
        reactionService.deleteReaction(reactionId);
        return ResponseEntity.noContent().build();
    }

}
