import type { Metadata } from "next";
import { mockCareerProfile } from "@/lib/jobs";
import { Header } from "../../components/header";
import { ProfileCard } from "../components/profile-card";

export const metadata: Metadata = {
  title: "Career Profile — Jobs",
  description: "Manage your career profile and job preferences.",
};

const ProfilePage = () => (
  <>
    <Header page="Career Profile" pages={["Jobs Console", "Jobs"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">
          Career Profile
        </h1>
        <p className="text-muted-foreground text-sm">
          Define your target roles, preferences, and career goals. Your profile
          is used by AI Job Match and search to find the best opportunities.
        </p>
      </div>

      <ProfileCard profile={mockCareerProfile} />
    </div>
  </>
);

export default ProfilePage;
