package react.model;

public class User {
  private String userName;
  private String token;
  private boolean authenticated;

  public User() {
  }

  public User(String userName, String token, boolean authenticated) {
    this.userName = userName;
    this.token = token;
    this.authenticated = authenticated;
  }

  public String getUserName() {
    return userName;
  }

  public String getToken() {
    return token;
  }

  public boolean isAuthenticated() {
    return authenticated;
  }
}
