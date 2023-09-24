package irisi.facebook.backend.serviceTests;

import irisi.facebook.backend.api.ressources.ReactionResources;
import irisi.facebook.backend.domain.command.ReactionCommand;
import irisi.facebook.backend.domain.model.FBUser;
import irisi.facebook.backend.domain.model.Post;
import irisi.facebook.backend.domain.model.Reaction;
import irisi.facebook.backend.domain.repositories.ReactionRepository;
import irisi.facebook.backend.services.ReactionService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@SpringBootTest(classes = ReactionResources.class)
public class ReactionServiceTest {
    @MockBean
    private ReactionService reactionService;
    @Mock
    private ReactionRepository reactionRepository;
    @Autowired
    private ReactionResources reactionResources;
    MockMvc mockMvc;

    @Test
    public void should_get_all_reactions(){
        Reaction reaction1 = new Reaction();
        reaction1.setReactionId(1);
        reaction1.setReactionType("Like");

        Reaction reaction2 = new Reaction();
        reaction2.setReactionId(2);
        reaction2.setReactionType("Love");

        List<Reaction> reactionList = new ArrayList<>();
        reactionList.add(reaction1);
        reactionList.add(reaction2);

        Mockito.when(reactionService.getAllReactions()).thenReturn(reactionList);

        ResponseEntity<List<Reaction>> responseEntity = reactionResources.getAllReactions();

        assertEquals(200, responseEntity.getStatusCodeValue());

        List<Reaction> actualReactions = responseEntity.getBody();
        assertEquals(reactionList, actualReactions);
    }

    @Test
    public void should_get_reactions_by_post_id(){
        int postId = 1;

        Reaction reaction1 = new Reaction();
        reaction1.setReactionId(1);
        reaction1.setReactionType("Like");

        Reaction reaction2 = new Reaction();
        reaction2.setReactionId(2);
        reaction2.setReactionType("Love");

        List<Reaction> reactionList = new ArrayList<>();
        reactionList.add(reaction1);
        reactionList.add(reaction2);

        Mockito.when(reactionService.getReactionByPostId(postId)).thenReturn(reactionList);

        ResponseEntity<List<Reaction>> responseEntity = reactionResources.getReactionsByPostId(postId);

        assertEquals(200, responseEntity.getStatusCodeValue());

        List<Reaction> actualReactions = responseEntity.getBody();
        assertEquals(reactionList, actualReactions);
    }

    @Test
    public void should_create_new_reaction(){

        FBUser reactingUser = new FBUser();
        Post post = new Post();
        String reactionType = "Like";
        ReactionCommand reactionCommand = new ReactionCommand();

        Reaction newReaction = new Reaction();
        newReaction.setReactingUser(reactingUser);
        newReaction.setPostReaction(post);
        newReaction.setReactionType(reactionType);

        Mockito.when(reactionService.createReaction(reactingUser, post.getPostId(), reactionType)).thenReturn(newReaction);

        ResponseEntity<Reaction> responseEntity = reactionResources.createReaction(reactionCommand);

        assertEquals(201, responseEntity.getStatusCodeValue());

    }

    @Test
    public void should_update_reaction_type() throws Exception{
        int reactionId = 1;
        String newReactionType = "Love";
        ReactionCommand reactionCommand = new ReactionCommand();

        Reaction existingReaction = new Reaction();
        existingReaction.setReactionId(reactionId);
        existingReaction.setReactionType("Like");

        Mockito.when(reactionRepository.findById(reactionId)).thenReturn(Optional.of(existingReaction));

        existingReaction.setReactionType(newReactionType);

        Mockito.when(reactionRepository.save(existingReaction)).thenReturn(existingReaction);

        ResponseEntity<Reaction> responseEntity = reactionResources.updateReactionType(reactionId, reactionCommand);

        assertEquals(200, responseEntity.getStatusCodeValue());

    }
    @Test
    public void should_delete_reaction (){
        int reactionId = 1;
        Reaction reaction = new Reaction();
        reaction.setReactionId(reactionId);
        ResponseEntity<Void> responseEntity = reactionResources.deleteReaction(reactionId);

        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
    }
}

