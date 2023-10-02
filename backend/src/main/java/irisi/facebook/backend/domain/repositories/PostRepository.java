package irisi.facebook.backend.domain.repositories;

import irisi.facebook.backend.domain.model.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findAllByPostOwnerUserId(int userId, Sort sort);
}

