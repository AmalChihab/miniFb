package irisi.facebook.backend.domain.representations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReactionRepresentation {
    private int id;
    private String type;
    private PostRepresentation post;
    private UserRepresentation user;
}
