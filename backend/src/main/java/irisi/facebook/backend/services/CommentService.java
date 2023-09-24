package irisi.facebook.backend.services;

import irisi.facebook.backend.domain.command.CommentCommand;
import irisi.facebook.backend.domain.command.PostCommand;
import irisi.facebook.backend.domain.command.UserCommand;
import irisi.facebook.backend.domain.mappers.CommentMapper;
import irisi.facebook.backend.domain.model.Comment;
import irisi.facebook.backend.domain.repositories.CommentRepository;
import irisi.facebook.backend.domain.representations.CommentRepresentation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public List<CommentRepresentation> getAll() {
        return commentMapper.convertToCommentRepresentationList(commentRepository.findAll());
    }

    public List<CommentRepresentation> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return commentMapper.convertToCommentRepresentationList(comments);
    }


    public CommentRepresentation create(CommentCommand commentCommand) {
        String body = commentCommand.getBody();
        UserCommand userCommand = commentCommand.getUser();
        PostCommand postCommand = commentCommand.getPost();

        Comment comment = new Comment();
        comment.setCommentBody(body);
        comment.setCommentOwner(commentMapper.convertToUser(userCommand));
        comment.setCommentPost(commentMapper.convertToPost(postCommand));

        commentRepository.save(comment);
        return commentMapper.convertToCommentRepresentation(comment);
    }

    public CommentRepresentation update(CommentCommand commentCommand) {
        Comment comment = commentRepository.findById(commentCommand.getId()).orElse(null);
        comment.setCommentBody(commentCommand.getBody());
        comment.setCommentOwner(commentMapper.convertToUser(commentCommand.getUser()));
        comment.setCommentPost(commentMapper.convertToPost(commentCommand.getPost()));
        commentRepository.save(comment);
        return commentMapper.convertToCommentRepresentation(comment);
    }

    public String delete(int id) {
        if (id != 0) {
            commentRepository.deleteById(id);
        }
        return "Comment deleted!";
    }
}

