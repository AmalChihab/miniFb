package irisi.facebook.backend.domain.representations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostRepresentation {
    private int id;
    private byte[] photo;
    private String body;
    private UserRepresentation user;
}
