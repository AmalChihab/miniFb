package irisi.facebook.backend.domain.repositories;

import irisi.facebook.backend.domain.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
}

