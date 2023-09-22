package irisi.facebook.backend.domain.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostCommand {
    private int id;
    private byte[] photo;
    private String body;
    private UserCommand user;
}
