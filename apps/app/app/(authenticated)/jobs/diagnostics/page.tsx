import type { Metadata } from "next";
import {
  type DataQualityReport,
  type DiagnosticsReport,
  getFullDiagnostics,
} from "@/lib/jobs/diagnostics";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Diagnostics — Jobs Console",
  description: "Jobs Search provider and system health diagnostics.",
};

const statusBadge = (
  label: string,
  variant: "success" | "warning" | "muted" | "info"
) => {
  const colors: Record<string, string> = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    muted: "bg-muted text-muted-foreground border-border",
    info: "bg-info/10 text-info border-info/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-medium text-[11px] uppercase tracking-wide ${colors[variant]}`}
    >
      {label}
    </span>
  );
};

const Section = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="space-y-3">
    <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
      {title}
    </h2>
    {children}
  </div>
);

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div className="flex items-center justify-between gap-4 py-2">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="font-medium font-mono text-sm">
      {String(value ?? "—")}
    </span>
  </div>
);

const ProviderCard = ({ report }: { report: DiagnosticsReport }) => (
  <div className="divide-y divide-border rounded-lg border bg-card">
    <div className="flex items-center justify-between gap-3 p-4">
      <div className="space-y-0.5">
        <span className="font-medium text-sm">Active Provider</span>
        <p className="text-muted-foreground text-xs">
          {report.provider.activeProvider}
        </p>
      </div>
      {report.provider.isMock
        ? statusBadge("Mock", "warning")
        : statusBadge("Live", "success")}
    </div>
    <div className="px-4 pt-1 pb-3">
      <DetailRow
        label="Provider Name"
        value={report.apiConfiguration.providerName}
      />
      <DetailRow
        label="Endpoint URL"
        value={report.apiConfiguration.endpointUrl}
      />
      <DetailRow
        label="Auth Method"
        value={report.apiConfiguration.authMethod}
      />
      <DetailRow
        label="API Key Env Var"
        value={report.apiConfiguration.apiKeyEnvVar}
      />
      <DetailRow
        label="Rate Limits"
        value={report.apiConfiguration.rateLimits}
      />
      <DetailRow
        label="Response Schema"
        value={report.apiConfiguration.responseSchema}
      />
    </div>
  </div>
);

const CacheCard = ({ report }: { report: DiagnosticsReport }) => (
  <div className="divide-y divide-border rounded-lg border bg-card">
    <div className="flex items-center justify-between gap-3 p-4">
      <div className="space-y-0.5">
        <span className="font-medium text-sm">Search Cache</span>
        <p className="text-muted-foreground text-xs">
          In-memory search result cache
        </p>
      </div>
      {report.searchCache.entryCount > 0
        ? statusBadge(`${report.searchCache.entryCount} entries`, "info")
        : statusBadge("Empty", "muted")}
    </div>
    <div className="px-4 pt-1 pb-3">
      <DetailRow label="Entry Count" value={report.searchCache.entryCount} />
      <DetailRow
        label="Cache TTL"
        value={`${report.searchCache.ttlMs / 1000}s`}
      />
      <DetailRow
        label="Oldest Entry"
        value={
          report.searchCache.oldestEntryAgeMs !== null
            ? `${Math.round(report.searchCache.oldestEntryAgeMs / 1000)}s ago`
            : "N/A"
        }
      />
    </div>
  </div>
);

const MockFallbackCard = ({ report }: { report: DiagnosticsReport }) => (
  <div className="divide-y divide-border rounded-lg border bg-card">
    <div className="flex items-center justify-between gap-3 p-4">
      <div className="space-y-0.5">
        <span className="font-medium text-sm">Mock Fallback</span>
        <p className="text-muted-foreground text-xs">
          Demo data when real provider is unavailable
        </p>
      </div>
      {report.mockFallback.enabled
        ? statusBadge("Enabled", "info")
        : statusBadge("Disabled", "muted")}
    </div>
    <div className="px-4 pt-1 pb-3">
      <DetailRow
        label="Fallback Available"
        value={report.mockFallback.enabled ? "Yes" : "No"}
      />
      <DetailRow label="Mock Jobs Count" value={report.mockFallback.jobCount} />
    </div>
  </div>
);

const DataQualityCard = ({ quality }: { quality: DataQualityReport }) => (
  <div className="divide-y divide-border rounded-lg border bg-card">
    <div className="flex items-center justify-between gap-3 p-4">
      <div className="space-y-0.5">
        <span className="font-medium text-sm">Data Quality</span>
        <p className="text-muted-foreground text-xs">
          {quality.totalJobs} total mock jobs
        </p>
      </div>
      {quality.missingSalary === 0 &&
      quality.missingApplyUrl === 0 &&
      quality.missingSkills === 0 &&
      quality.unknownRemoteType === 0
        ? statusBadge("Clean", "success")
        : statusBadge("Issues found", "warning")}
    </div>
    <div className="px-4 pt-1 pb-3">
      <DetailRow label="Missing Salary" value={quality.missingSalary} />
      <DetailRow
        label="Unknown Remote Type"
        value={quality.unknownRemoteType}
      />
      <DetailRow label="Missing Apply URL" value={quality.missingApplyUrl} />
      <DetailRow label="Missing Skills" value={quality.missingSkills} />
    </div>
  </div>
);

const TroubleshootingCard = ({
  items,
}: {
  items: DiagnosticsReport["troubleshooting"];
}) => (
  <div className="divide-y divide-border rounded-lg border bg-card">
    {items.length === 0 ? (
      <div className="p-4 text-muted-foreground text-sm">
        No issues detected.
      </div>
    ) : (
      items.map((item) => (
        <div className="flex flex-col gap-1.5 p-4" key={item.issue}>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-destructive text-xs">●</span>
            <div className="space-y-1">
              <p className="font-medium text-sm">{item.issue}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {item.resolution}
              </p>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

const DiagnosticsPage = () => {
  const report = getFullDiagnostics();

  return (
    <>
      <Header page="Diagnostics" pages={["Jobs"]} />
      <div className="flex flex-1 flex-col gap-8 p-6 pt-0">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-semibold text-2xl tracking-tight">Diagnostics</h1>
          <p className="text-muted-foreground text-sm">
            Jobs Search provider and system health diagnostics. This page is
            read-only and does not expose secrets.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Section title="Provider">
            <ProviderCard report={report} />
          </Section>

          <Section title="Cache">
            <CacheCard report={report} />
          </Section>

          <Section title="Mock Fallback">
            <MockFallbackCard report={report} />
          </Section>

          <Section title="Data Quality">
            <DataQualityCard quality={report.dataQuality} />
          </Section>
        </div>

        <Section title="Troubleshooting">
          <TroubleshootingCard items={report.troubleshooting} />
        </Section>
      </div>
    </>
  );
};

export default DiagnosticsPage;
