package irisi.facebook.backend;

import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.repositories.FbUserRepository;
import irisi.facebook.backend.services.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class authenticationServiceTest {

    @Test
    public void shouldLoadUserExists() {
        // Arrange
        String username = "testUser";
        String password = "testPassword";
        FBUser testUser = new FBUser(0, username, password, "desc");
        FbUserRepository userRepository = mock(FbUserRepository.class);
        when(userRepository.findByUserName(username)).thenReturn(java.util.Optional.of(testUser));

        CustomUserDetailsService userDetailsService = new CustomUserDetailsService(userRepository);

        // Act
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // Assert
        assertNotNull(userDetails);
        assertEquals(username, userDetails.getUsername());
        assertEquals(password, userDetails.getPassword());
    }

    @Test
    public void shouldReturnUserNotFound() {
        // Arrange
        String username = "nonexistentUser";
        FbUserRepository userRepository = mock(FbUserRepository.class);
        when(userRepository.findByUserName(username)).thenReturn(java.util.Optional.empty());

        CustomUserDetailsService userDetailsService = new CustomUserDetailsService(userRepository);

        // Act and Assert
        assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername(username);
        });
    }


}
