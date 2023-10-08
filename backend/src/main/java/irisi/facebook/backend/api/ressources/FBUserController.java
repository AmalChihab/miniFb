package irisi.facebook.backend.api.ressources;

import irisi.facebook.backend.services.FBUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/users")
public class FBUserController {
    @Autowired
    private FBUserService userService;

    @PostMapping("/{userId}/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(
            @PathVariable int userId,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            if (!file.isEmpty()) {
                byte[] profilePicture = file.getBytes();
                userService.saveProfilePicture(userId, profilePicture);
                return ResponseEntity.ok("Profile picture uploaded successfully.");
            } else {
                return ResponseEntity.badRequest().body("File is empty.");
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to upload profile picture.");
        }
    }

    @GetMapping("/{userId}/profile-picture")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable int userId) {
        byte[] profilePicture = userService.getProfilePicture(userId);
        if (profilePicture != null) {
            return ResponseEntity.ok().body(profilePicture);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}