package irisi.facebook.backend.services;

import irisi.facebook.backend.domain.command.PostCommand;
import irisi.facebook.backend.domain.command.UserCommand;
import irisi.facebook.backend.domain.mappers.PostMapper;
import irisi.facebook.backend.domain.model.Post;
import irisi.facebook.backend.domain.repositories.PostRepository;
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

    public List<PostRepresentation> getAll() {
        Sort sort = Sort.by(Sort.Direction.DESC, "postId"); // Sort by id in descending order
        return postMapper.convertToPostRepresentationList(postRepository.findAll(sort));
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
            postRepository.deleteById(id);
        }
        return "post deleted!";
    }
}