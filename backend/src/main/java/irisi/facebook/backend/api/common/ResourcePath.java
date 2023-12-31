package irisi.facebook.backend.api.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

// this class is responsible for defining the global endpoint of each entity
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ResourcePath {
    public static final String USER = "users";
    public static final String POST = "posts";
    public static final String COMMENT = "comments";
    public static final String REACTION = "reactions";

}
