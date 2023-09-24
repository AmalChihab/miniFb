package irisi.facebook.backend.domain.mappers;

import irisi.facebook.backend.domain.command.PostCommand;
import irisi.facebook.backend.domain.command.UserCommand;
import irisi.facebook.backend.domain.model.Comment;
import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.model.Post;
import irisi.facebook.backend.domain.representations.CommentRepresentation;
import irisi.facebook.backend.domain.representations.PostRepresentation;
import irisi.facebook.backend.domain.representations.UserRepresentation;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CommentMapper {
    public CommentRepresentation convertToCommentRepresentation(Comment comment) {
        return CommentRepresentation.builder()
                .id(comment.getCommentId())
                .body(comment.getCommentBody())
                .user(convertToUserRepresentation(comment.getCommentOwner()))
                .post(convertToPostRepresentation(comment.getCommentPost()))
                .build();
    }

    public List<CommentRepresentation> convertToCommentRepresentationList(List<Comment> commentList) {
        List<CommentRepresentation> representations = new ArrayList<>();

        for (Comment comment : commentList) {
            representations.add(
                    CommentRepresentation.builder()
                            .id(comment.getCommentId())
                            .body(comment.getCommentBody())
                            .user(convertToUserRepresentation(comment.getCommentOwner()))
                            .post(convertToPostRepresentation(comment.getCommentPost()))
                            .build()
            );
        }

        return representations;
    }


    public UserRepresentation convertToUserRepresentation(FBUser user) {
        if (user == null) {
            // Handle the case when 'user' is null, return a default or placeholder UserRepresentation:
            return UserRepresentation.builder()
                    .id(0)
                    .description("User not available")
                    .name("Unknown")
                    .password("N/A")
                    .build();
        }
        return UserRepresentation.builder()
                .id(user.getUserId())
                .description(user.getUserDescription())
                .name(user.getUserName())
                .password(user.getUserPassword())
                .build();
    }

    public FBUser convertToUser(UserCommand user) {
        return FBUser.builder()
                .userId(user.getUserId())
                .userDescription(user.getUserDescription())
                .userPassword(user.getUserPassword())
                .userName(user.getUserName())
                .build();
    }

    public FBUser convertToFBUser(UserCommand userCommand) {
        return FBUser.builder()
                .userId(userCommand.getUserId())
                .userDescription(userCommand.getUserDescription())
                .userPassword(userCommand.getUserPassword())
                .userName(userCommand.getUserName())
                .build();
    }


    public PostRepresentation convertToPostRepresentation(Post post) {
        return PostRepresentation.builder()
                .id(post.getPostId())
                .photo(post.getPostPhoto())
                .body(post.getPostBody())
                .user(convertToUserRepresentation(post.getPostOwner()))
                .build();
    }

    public Post convertToPost(PostCommand post) {
        FBUser postOwner = post.getUser() != null ? convertToFBUser(post.getUser()) : null;

        return Post.builder()
                .postId(post.getId())
                .postPhoto(post.getPhoto())
                .postBody(post.getBody())
                .postOwner(postOwner)
                .build();
    }
}

