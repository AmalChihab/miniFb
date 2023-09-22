package irisi.facebook.backend.services;

import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.repositories.FbUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private FbUserRepository userRepository;

    public CustomUserDetailsService(FbUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Load user details by username
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find the user by username in the repository or throw an exception if not found
        FBUser user = userRepository.findByUserName(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username "));

        // Build a UserDetails object using the retrieved user information
        return User.builder()
                .username(user.getUserName()) // Set the username
                .password(user.getUserPassword()) // Set the password
                .roles("USER") // Set the user's roles (in this case, "USER")
                .build(); // Build and return the UserDetails object
    }
}
