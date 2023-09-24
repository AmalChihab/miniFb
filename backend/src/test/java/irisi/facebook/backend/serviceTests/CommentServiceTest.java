package irisi.facebook.backend.serviceTests;

import irisi.facebook.backend.domain.command.CommentCommand;
import irisi.facebook.backend.domain.command.PostCommand;
import irisi.facebook.backend.domain.command.UserCommand;
import irisi.facebook.backend.domain.mappers.CommentMapper;
import irisi.facebook.backend.domain.model.Comment;
import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.model.Post;
import irisi.facebook.backend.domain.repositories.CommentRepository;
import irisi.facebook.backend.domain.representations.CommentRepresentation;
import irisi.facebook.backend.services.CommentService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private CommentMapper commentMapper;

    @InjectMocks
    private CommentService commentService;

    @Test
    public void shouldGetAllComments() {
        List<Comment> comments = new ArrayList<>();
        Comment comment1 = new Comment();
        comment1.setCommentId(1);
        comment1.setCommentBody("Comment 1");
        comments.add(comment1);

        Comment comment2 = new Comment();
        comment2.setCommentId(2);
        comment2.setCommentBody("Comment 2");
        comments.add(comment2);

        when(commentRepository.findAll()).thenReturn(comments);
        when(commentMapper.convertToCommentRepresentationList(comments)).thenReturn(new ArrayList<>());

        List<CommentRepresentation> commentRepresentations = commentService.getAll();
        verify(commentRepository).findAll();
        verify(commentMapper).convertToCommentRepresentationList(comments);
        assertEquals(0, commentRepresentations.size());
    }

    @Test
    public void shouldGetAllCommentsByPostId() {
        Long postId = 1L;
        List<Comment> comments = new ArrayList<>();

        Comment comment1 = new Comment();
        comment1.setCommentId(1);
        comment1.setCommentBody("Comment 1");
        comment1.setCommentPost(new Post());
        comments.add(comment1);

        Comment comment2 = new Comment();
        comment2.setCommentId(2);
        comment2.setCommentBody("Comment 2");
        comment2.setCommentPost(new Post());
        comments.add(comment2);

        when(commentRepository.findByPostId(postId)).thenReturn(comments);
        when(commentMapper.convertToCommentRepresentationList(comments)).thenReturn(new ArrayList<>());

        List<CommentRepresentation> commentRepresentations = commentService.getCommentsByPostId(postId);

        verify(commentRepository).findByPostId(postId);
        verify(commentMapper).convertToCommentRepresentationList(comments);

        assertEquals(0, commentRepresentations.size());
    }



    @Test
    public void shouldCreateComment() {
        CommentCommand command = new CommentCommand();
        UserCommand userCommand = new UserCommand();
        userCommand.setUserName("test user");
        command.setBody("hello");
        command.setUser(userCommand);

        PostCommand postCommand = new PostCommand();
        postCommand.setId(1);
        command.setPost(postCommand);

        FBUser fbUser = new FBUser();
        fbUser.setUserName("test user");
        when(commentMapper.convertToUser(userCommand)).thenReturn(fbUser);

        Comment expectedComment = new Comment();
        expectedComment.setCommentBody("hello");
        expectedComment.setCommentOwner(fbUser);
        expectedComment.setCommentPost(new Post());
        when(commentRepository.save(any(Comment.class))).thenReturn(expectedComment);

        int createdCommentID = commentService.create(command);
        verify(commentMapper).convertToUser(userCommand);
        verify(commentRepository).save(any(Comment.class));
        assertEquals(expectedComment.getCommentId(), createdCommentID);
    }

    @Test
    public void shouldUpdateComment() {
        int commentIdToUpdate = 123;

        CommentCommand commentCommand = new CommentCommand();
        commentCommand.setId(commentIdToUpdate);
        commentCommand.setBody("Updated Body");

        UserCommand userCommand = new UserCommand();
        userCommand.setUserName("Updated User");
        commentCommand.setUser(userCommand);

        PostCommand postCommand = new PostCommand();
        postCommand.setId(1);
        commentCommand.setPost(postCommand);

        Comment existingComment = new Comment();
        existingComment.setCommentId(commentIdToUpdate);
        existingComment.setCommentBody("Old Body");
        FBUser existingUser = new FBUser();
        existingUser.setUserName("Old User");
        existingComment.setCommentOwner(existingUser);
        existingComment.setCommentPost(new Post());

        when(commentRepository.findById(commentIdToUpdate)).thenReturn(Optional.of(existingComment));

        FBUser updatedUser = new FBUser();
        updatedUser.setUserName("Updated User");
        when(commentMapper.convertToUser(userCommand)).thenReturn(updatedUser);

        CommentRepresentation updatedCommentRepresentation = new CommentRepresentation();
        updatedCommentRepresentation.setBody("Updated Body");
        updatedCommentRepresentation.setUser(commentMapper.convertToUserRepresentation(updatedUser));
        when(commentMapper.convertToCommentRepresentation(existingComment)).thenReturn(updatedCommentRepresentation);

        CommentRepresentation result = commentService.update(commentCommand);
        verify(commentRepository).save(existingComment);
        assertEquals("Updated Body", result.getBody());
    }

    @Test
    public void shouldDeleteComment() {
        int commentIdToDelete = 123;
        String result = commentService.delete(commentIdToDelete);
        verify(commentRepository).deleteById(commentIdToDelete);
        assertEquals("Comment deleted!", result);
    }

}


