package irisi.facebook.backend.api.ressources;

import irisi.facebook.backend.domain.command.UserCommand;
import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.repositories.FbUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

// authentication controller

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private FbUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody UserCommand loginDto){

        Optional<FBUser> userOptional = userRepository.findByUserName(loginDto.getUserName());

        //checking if the user is found
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        // if the user is found we check if the entered password matches the actual one in our database
        FBUser user = userOptional.get();

        if (!passwordEncoder.matches(loginDto.getUserPassword(), user.getUserPassword())) {
            return ResponseEntity.badRequest().body("Invalid password!");
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUserName(), loginDto.getUserPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Create a UserCommand object with the user information
        UserCommand loggedInUser = UserCommand.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userDescription(user.getUserDescription())
                .userGender(user.getUserGender())
                .userBirthday(user.getUserBirthday())
                .userEmail(user.getUserEmail())
                .userPhoneNumber(user.getUserPhoneNumber())
                .profilePicture(user.getProfilePicture())
                .build();

        return ResponseEntity.ok(loggedInUser);
    }



    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserCommand signUpDto){

        // check for username exists in a DB
        if(userRepository.existsByUserName(signUpDto.getUserName())){
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }


        // if the user doesn't exist, we can create our user object now
        FBUser user = new FBUser();
        user.setUserName(signUpDto.getUserName());
        user.setUserPassword(passwordEncoder.encode(signUpDto.getUserPassword()));
        user.setUserDescription(signUpDto.getUserDescription());
        user.setUserGender(signUpDto.getUserGender());
        user.setUserBirthday(signUpDto.getUserBirthday());
        user.setUserPhoneNumber(signUpDto.getUserPhoneNumber());


        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);

    }
}
