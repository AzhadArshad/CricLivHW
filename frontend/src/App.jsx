import { login, getMe } from "./services/authService";

login({ email_id: "far125@example.com", my_password: "2345678" })
  .then((data) => {
    console.log("Login success:", data);
    console.log("------");
    console.log(localStorage.getItem("token"));
  })
  .catch((err) => console.error("Error:", err));

// getMe()
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

function App() {
  return <>hi</>;
}

export default App;
