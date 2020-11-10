
import SignUp from "./Components/Auth/SignUp";
import UserProvider from "./providers/UserProvider";

export default function App() {
  return (
      <UserProvider>
      <h1 className="text-primary">Covid - statistics
      </h1>
          <SignUp/>
      </UserProvider>
  );
}
