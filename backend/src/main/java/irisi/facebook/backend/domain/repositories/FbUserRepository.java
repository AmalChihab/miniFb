package irisi.facebook.backend.domain.repositories;

import irisi.facebook.backend.domain.model.FBUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FbUserRepository extends JpaRepository<FBUser, Integer> {
    Boolean existsByUserName(String username);
    Optional<FBUser> findByUserName(String username);
}
