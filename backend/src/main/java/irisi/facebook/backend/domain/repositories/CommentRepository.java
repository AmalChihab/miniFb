package irisi.facebook.backend.domain.repositories;

import irisi.facebook.backend.domain.model.Comment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("SELECT c FROM Comment c WHERE c.commentPost.postId = :postId")
    List<Comment> findByPostId(Long postId);

    // added this one to make sure to delete all the comments for a post before deleting it
    @Modifying
    @Transactional
    @Query("DELETE FROM Comment c WHERE c.commentPost.postId = :postId")
    void deleteReactionsByCommentPost_PostId(int postId);
}
