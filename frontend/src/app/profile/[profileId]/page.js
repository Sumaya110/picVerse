import Profile from "@/components/Profile/Profile";
import { AuthProvider } from "@/context/AuthContext";

export default async function ProfilePage({ params }) {
  const { profileId } = await params;

  return (
    <AuthProvider>
      <Profile profileId={profileId} />
    </AuthProvider>
  );
}
