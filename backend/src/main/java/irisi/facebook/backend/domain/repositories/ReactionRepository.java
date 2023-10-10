package irisi.facebook.backend.domain.repositories;

import irisi.facebook.backend.domain.model.Reaction;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository

public interface ReactionRepository extends JpaRepository<Reaction,Integer> {
    @Query("SELECT r FROM Reaction r WHERE r.postReaction.postId = :postId")
    List<Reaction> findReactionByPostId(int postId);

    @Query("SELECT count(r) FROM Reaction r WHERE r.postReaction.postId = :postId and r.reactionType LIKE 'LIKE'")
    int nbrLikes(int postId);

    @Query("SELECT count(r) FROM Reaction r WHERE r.postReaction.postId = :postId and r.reactionType LIKE 'DISLIKE'")
    int nbrDislikes(int postId);

    @Query("SELECT r.reactionId FROM Reaction r WHERE r.postReaction.postId = :postId and r.reactingUser.userId = :userId")
    Integer getReactionIdByPostIdAndUserId(int postId, int userId);

    // added this one to make sure to delete all the reactions for a post before deleting it
    @Modifying
    @Transactional
    @Query("DELETE FROM Reaction r WHERE r.postReaction.postId = :postId")
    void deleteReactionsByPostReaction_PostId(int postId);

}
