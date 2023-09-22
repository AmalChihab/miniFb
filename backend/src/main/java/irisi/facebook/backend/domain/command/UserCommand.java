package fstg.irisi.miniFb.domain.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserCommand {
    private int userId;
    private String userName;
    private String userPassword;
    private String userDescription;
}
