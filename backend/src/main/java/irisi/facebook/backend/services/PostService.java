package irisi.facebook.backend.services;

import irisi.facebook.backend.domain.command.PostCommand;
import irisi.facebook.backend.domain.command.UserCommand;
import irisi.facebook.backend.domain.mappers.PostMapper;
import irisi.facebook.backend.domain.model.Post;
import irisi.facebook.backend.domain.repositories.CommentRepository;
import irisi.facebook.backend.domain.repositories.PostRepository;
import irisi.facebook.backend.domain.repositories.ReactionRepository;
import irisi.facebook.backend.domain.representations.PostRepresentation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final ReactionRepository reactionRepository;
    private final CommentRepository commentRepository;

    public List<PostRepresentation> getAll() {
        Sort sort = Sort.by(Sort.Direction.DESC, "postId"); // Sort by id in descending order
        return postMapper.convertToPostRepresentationList(postRepository.findAll(sort));
    }

    public List<PostRepresentation> getAllByUserId(int userId) {
        Sort sort = Sort.by(Sort.Direction.DESC, "postId");
        return postMapper.convertToPostRepresentationList(postRepository.findAllByPostOwnerUserId(userId, sort));
    }


    public int create(PostCommand postCommand) {
        byte[] photo = postCommand.getPhoto();
        String body = postCommand.getBody();
        UserCommand command = postCommand.getUser();

        Post post = new Post();
        post.setPostBody(body);
        post.setPostOwner(postMapper.convertToUser(command));
        post.setPostPhoto(photo);
        postRepository.save(post);
        return post.getPostId();

    }

    public PostRepresentation update(PostCommand postCommand) {
        Post post = postRepository.findById(postCommand.getId()).orElse(null);
        post.setPostBody(postCommand.getBody());
        post.setPostOwner(postMapper.convertToUser(postCommand.getUser()));
        post.setPostPhoto(postCommand.getPhoto());
        postRepository.save(post);
        return postMapper.convertToPostRepresentation(post);
    }

    public String delete(int id) {
        if (id != 0) {

            // delete related records in the 'reaction' table
            reactionRepository.deleteReactionsByPostReaction_PostId(id);

            // delete related records in the 'comment' table
            commentRepository.deleteReactionsByCommentPost_PostId(id);

            postRepository.deleteById(id);
        }
        return "post deleted!";
    }

}