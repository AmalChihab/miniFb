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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        FBUser user = userRepository.findByUserName(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username "));

        return User.builder()
                .username(user.getUserName())
                .password(user.getUserPassword())
                .roles("USER")
                .build();
    }
}