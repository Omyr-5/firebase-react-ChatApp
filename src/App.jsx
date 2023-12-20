import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config/FirebaseConfig";
import ChatScreen from "./Pages/ChatScreen";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div style={{ display: "flex", width: "100%", paddingLeft: "400px" }}>
        {user ? <ChatScreen /> : (
          <>
            <SignIn />
            {/* <SignUp /> */}

          </>
        )}
      </div>
    </>
  );
}

export default App;
