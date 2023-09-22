package irisi.facebook.backend.domain.representations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRepresentation {
    private int id;
    private String name;
    private String password;
    private String description;
}
