package irisi.facebook.backend.domain.representations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentRepresentation {
    private int id;
    private String body;
    private UserRepresentation user;
    private PostRepresentation post;
}
