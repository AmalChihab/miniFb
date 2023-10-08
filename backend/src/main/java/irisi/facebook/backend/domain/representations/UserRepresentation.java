package irisi.facebook.backend.domain.representations;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRepresentation {
    private int id;
    private String name;
    private String password;
    private String description;
    private Date birthday;
    private String phoneNumber;
    private String gender;
    private String email;

    @Lob
    private byte[] profilePicture;
}
