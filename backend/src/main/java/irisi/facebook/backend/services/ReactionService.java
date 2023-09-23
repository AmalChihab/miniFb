package irisi.facebook.backend.services;

import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.model.Post;
import irisi.facebook.backend.domain.model.Reaction;
import irisi.facebook.backend.domain.repositories.PostRepository;
import irisi.facebook.backend.domain.repositories.ReactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReactionService {
    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;

    public List<Reaction> getAllReactions() {
        return reactionRepository.findAll();
    }

    public List<Reaction> getReactionByPostId(int postId) {
        return reactionRepository.findReactionByPostId(postId);
    }

    public Reaction createReaction(FBUser reactingUser, int postId, String reactionType) {
        // Find the Post entity by postId
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + postId));

        Reaction reaction = new Reaction();
        reaction.setReactingUser(reactingUser);
        reaction.setPostReaction(post);
        reaction.setReactionType(reactionType);

        // Save the Reaction entity
        return reactionRepository.save(reaction);
    }

    public Reaction updateReactionType(int reactionId, String newReactionType) {
        Reaction existingReaction = reactionRepository.findById(reactionId)
                .orElseThrow(() -> new IllegalArgumentException("Réaction introuvable avec ID : " + reactionId));

        existingReaction.setReactionType(newReactionType);
        return reactionRepository.save(existingReaction);
    }


    public void deleteReaction(int reactionId) {
        reactionRepository.deleteById(reactionId);
    }

}

