package irisi.facebook.backend.domain.command;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserCommand {
    private int userId;

    @NotBlank(message = "username is required")
    private String userName;

    @NotBlank(message = "Password is required")
    private String userPassword;

    @NotBlank(message = "Description is required")
    private String userDescription;

    @Past(message = "Birthday must be in the past")
    private Date userBirthday;

    @Pattern(regexp = "^\\d{10}$", message = "Invalid phone number")
    private String userPhoneNumber;

    @NotNull(message = "Gender is required")
    private String userGender;

    @Email(message = "Invalid email format")
    private String userEmail;
}
