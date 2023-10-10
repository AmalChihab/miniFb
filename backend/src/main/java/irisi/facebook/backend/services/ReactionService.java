package irisi.facebook.backend.services;

import irisi.facebook.backend.domain.command.ReactionCommand;
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
        Reaction savedReaction = reactionRepository.save(reaction);

        // Return the saved Reaction entity which includes the reactionId
        return savedReaction;
    }

    public Reaction updateReactionType(int reactionId, String newReactionType) {
        Reaction existingReaction = reactionRepository.findById(reactionId)
                .orElseThrow(() -> new IllegalArgumentException("Réaction introuvable avec ID : " + reactionId));

        existingReaction.setReactionType(newReactionType);
        // Save the updated Reaction entity
        Reaction updatedReaction = reactionRepository.save(existingReaction);

        // Return the updated Reaction entity which includes the reactionId
        return updatedReaction;
    }


    public void deleteReaction(int reactionId) {
        reactionRepository.deleteById(reactionId);
    }

    public int getNbrLikes(int postId){
        return reactionRepository.nbrLikes(postId);
    }

    public int getNbrDislikes(int postId){
        return reactionRepository.nbrDislikes(postId);
    }

    public Integer getReactionIdByPostIdAndUserId(int postId, int userId){
        Integer reactionId = reactionRepository.getReactionIdByPostIdAndUserId(postId, userId);
        if (reactionId == null) {
            // Handle the case where no reaction is found for the given postId and userId
            try {
                throw new Exception("Reaction not found for postId: ");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return reactionId;
    }

}

