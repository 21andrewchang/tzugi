import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {session && session.user ? (
        <Home key={session.user.id} session={session} />
      ) : (
        <Login />
      )}
    </>
  );
}
