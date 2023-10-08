package irisi.facebook.backend.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class FBUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String userName;
    private String userPassword;
    private String userDescription;
    private Date userBirthday;
    private String userPhoneNumber;
    private String userGender;
    private String userEmail;

    @Lob
    @Column(length = 1048576)
    private byte[] profilePicture;

}
