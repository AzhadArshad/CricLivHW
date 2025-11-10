// When the user logins we will store the recieved JWT token and user info in local storage
export const startLogin = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  console.log("Stored token:", localStorage.getItem("token"));
  console.log("Stored user:", JSON.parse(localStorage.getItem("user")));
};

// Remove all the token and info when logged out and redirect to login page
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// Gives back to current user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null; // gives back javascript object othervise null
};

// Check if logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

//Tok check if logged in user is admin
export const isAdmin = () => {
  const user = getUser();
  return user?.user_role === "admin";
};
