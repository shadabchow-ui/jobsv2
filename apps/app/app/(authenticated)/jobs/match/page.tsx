import type { Metadata } from "next";
import { mockCandidateProfile, mockJobs, scoreJobs } from "@/lib/jobs";
import { Header } from "../../components/header";
import { MatchCard } from "../components/match-card";

export const metadata: Metadata = {
  title: "AI Job Match — Jobs",
  description: "AI-powered job matching based on your profile.",
};

const MatchPage = () => {
  const results = scoreJobs(mockJobs, mockCandidateProfile);

  return (
    <>
      <Header page="AI Job Match" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">
            AI Job Match
          </h1>
          <p className="text-muted-foreground text-sm">
            Jobs ranked by how well they fit your profile. Scores are local
            estimates based on your skills, experience, and preferences.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <h2 className="mb-2 font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
            Your Profile
          </h2>
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted-foreground text-xs">Role</span>
              <p className="font-medium">
                {mockCandidateProfile.desiredRole ?? "not provided"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Location</span>
              <p className="font-medium">
                {mockCandidateProfile.location ?? "not provided"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Remote</span>
              <p className="font-medium">
                {mockCandidateProfile.remotePreferred
                  ? "Preferred"
                  : "not provided"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Type</span>
              <p className="font-medium">
                {mockCandidateProfile.employmentType ?? "not provided"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Seniority</span>
              <p className="font-medium">
                {mockCandidateProfile.seniority ?? "not provided"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">
                Salary expectation
              </span>
              <p className="font-medium">
                {mockCandidateProfile.salaryExpectation
                  ? `$${mockCandidateProfile.salaryExpectation.min.toLocaleString()} – $${mockCandidateProfile.salaryExpectation.max.toLocaleString()}`
                  : "not provided"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Skills</span>
              <p className="font-medium">
                {mockCandidateProfile.skills.join(", ")}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
            Recommended Matches
          </h2>
          <div className="space-y-3">
            {results.map((match) => (
              <MatchCard key={match.job.id} match={match} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchPage;
