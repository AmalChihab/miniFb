package irisi.facebook.backend.domain.mappers;

import irisi.facebook.backend.domain.command.UserCommand;
import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.model.Post;
import irisi.facebook.backend.domain.representations.PostRepresentation;
import irisi.facebook.backend.domain.representations.UserRepresentation;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PostMapper {

    public PostRepresentation convertToPostRepresentation(Post post) {
        PostRepresentation.PostRepresentationBuilder builder = PostRepresentation.builder()
                .id(post.getPostId())
                .photo(post.getPostPhoto())
                .body(post.getPostBody());

        if (post.getPostOwner() != null) {
            builder.user(convertToUserRepresentation(post.getPostOwner()));
        }

        return builder.build();
    }


    public List<PostRepresentation> convertToPostRepresentationList(List<Post> postList) {
        List<PostRepresentation> representations = new ArrayList<>();

        for (Post post : postList) {
            representations.add(
                    PostRepresentation.builder()
                            .id(post.getPostId())
                            .photo(post.getPostPhoto())
                            .body(post.getPostBody())
                            .user(convertToUserRepresentation(post.getPostOwner()))
                            .build()
            );
        }

        return representations;
    }

    public UserRepresentation convertToUserRepresentation(FBUser user) {
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

}
