import Profile from "@/components/Profile/Profile";
import { AuthProvider } from "@/context/AuthContext";

export default function Home() {
  return (
    <>
      <AuthProvider>
        <Profile />
      </AuthProvider>
    </>
  );
}
