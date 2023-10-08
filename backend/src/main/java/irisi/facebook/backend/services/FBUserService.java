package irisi.facebook.backend.services;

import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.repositories.FbUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FBUserService {
    @Autowired
    private FbUserRepository userRepository;

    public void saveProfilePicture(int userId, byte[] profilePicture) {
        Optional<FBUser> userOptional = userRepository.findById(userId);
        userOptional.ifPresent(user -> {
            user.setProfilePicture(profilePicture);
            userRepository.save(user);
        });
    }

    public byte[] getProfilePicture(int userId) {
        Optional<FBUser> userOptional = userRepository.findById(userId);
        return userOptional.map(FBUser::getProfilePicture).orElse(null);
    }
}

