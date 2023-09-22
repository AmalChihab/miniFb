package irisi.facebook.backend.domain.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import irisi.facebook.backend.domain.command.UserCommand;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentCommand {
    private int id;
    private String body;
    private PostCommand post;
    private UserCommand user;
}