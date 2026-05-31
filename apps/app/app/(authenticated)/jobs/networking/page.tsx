"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { cn } from "@repo/design-system/lib/utils";
import {
  AlertCircleIcon,
  BellIcon,
  CalendarIcon,
  MailIcon,
  MessageSquareIcon,
  PlusIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  mockContacts,
  mockFollowUps,
  mockOutreachTemplates,
} from "@/lib/jobs/networking-data";
import { Header } from "../../components/header";

const connectionColor: Record<string, string> = {
  "1st": "bg-emerald-500/10 text-emerald-500",
  "2nd": "bg-amber-500/10 text-amber-500",
  "3rd": "bg-muted text-muted-foreground/60",
};

const priorityIcon = (p: string) => {
  if (p === "high") {
    return <AlertCircleIcon className="size-3 text-destructive" />;
  }
  if (p === "medium") {
    return <AlertCircleIcon className="size-3 text-amber-500" />;
  }
  return <BellIcon className="size-3 text-muted-foreground" />;
};

const NetworkingPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const displayedContacts = mockContacts;

  return (
    <>
      <Header page="Networking" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">Networking</h1>
          <p className="text-muted-foreground text-sm">
            Manage your professional connections and outreach.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Contacts ({mockContacts.length})</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    className="gap-1.5 text-xs"
                    disabled
                    size="sm"
                    variant="outline"
                  >
                    <UserPlusIcon className="size-3.5" />
                    Add Contact
                  </Button>
                  <Button
                    className="gap-1.5 text-xs"
                    disabled
                    size="sm"
                    variant="ghost"
                  >
                    <MailIcon className="size-3.5" />
                    Import
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {displayedContacts.length === 0 && (
                <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-10 text-center">
                  <UsersIcon className="size-8 text-muted-foreground/40" />
                  <p className="font-medium text-muted-foreground text-sm">
                    No contacts yet
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Add contacts or import from your network to grow your
                    professional reach.
                  </p>
                  <Button
                    asChild
                    className="mt-1 h-7 gap-1.5 px-3 text-xs"
                    size="sm"
                    variant="outline"
                  >
                    <Link href="/jobs/profile">Set Up Profile</Link>
                  </Button>
                </div>
              )}
              {displayedContacts.map((contact) => (
                <div
                  className="group flex items-start justify-between gap-4 rounded-lg border bg-card p-4 transition-all duration-150 ease-out hover:bg-accent/30 hover:shadow-sm"
                  key={contact.id}
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {contact.name}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-1.5 py-0 font-medium font-mono text-[10px]",
                          connectionColor[contact.connectionLevel]
                        )}
                      >
                        {contact.connectionLevel}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {contact.role} at {contact.company}
                    </p>
                    {contact.notes && (
                      <p className="text-muted-foreground/60 text-xs italic">
                        {contact.notes}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag) => (
                        <Badge
                          className="text-[10px]"
                          key={tag}
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {contact.lastContacted && (
                      <p className="text-[11px] text-muted-foreground/50">
                        Last contacted {contact.lastContacted}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-start gap-1">
                    <Button
                      className="opacity-0 group-hover:opacity-100"
                      disabled
                      size="icon-sm"
                      title="Draft message"
                      variant="ghost"
                    >
                      <MessageSquareIcon className="size-3.5" />
                      <span className="sr-only">Draft message</span>
                    </Button>
                    <Button
                      className="opacity-0 group-hover:opacity-100"
                      disabled
                      size="icon-sm"
                      title="Save contact"
                      variant="ghost"
                    >
                      <UserPlusIcon className="size-3.5" />
                      <span className="sr-only">Save contact</span>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Follow-Up Reminders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockFollowUps.length === 0 && (
                  <p className="py-6 text-center text-muted-foreground text-xs">
                    No upcoming follow-ups.
                  </p>
                )}
                {mockFollowUps.map((fu) => (
                  <div
                    className="flex items-start gap-3 rounded-lg border bg-card p-3"
                    key={fu.id}
                  >
                    <div className="mt-0.5">{priorityIcon(fu.priority)}</div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="font-medium text-xs">{fu.contactName}</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {fu.reason}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                        <CalendarIcon className="size-3" />
                        Due {fu.dueDate}
                      </div>
                    </div>
                    <Button
                      className="shrink-0"
                      disabled
                      size="icon-sm"
                      title="Schedule follow-up"
                      variant="ghost"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span className="sr-only">Schedule follow-up</span>
                    </Button>
                  </div>
                ))}
                <Button
                  className="w-full gap-1.5"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <PlusIcon className="size-3.5" />
                  Add Reminder
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outreach Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockOutreachTemplates.map((tmpl) => (
                  <button
                    className={cn(
                      "w-full rounded-lg border bg-card p-3 text-left text-xs transition-all duration-150",
                      selectedTemplate === tmpl.id
                        ? "border-primary/50 bg-primary/5 shadow-sm"
                        : "hover:bg-accent/50 hover:shadow-sm"
                    )}
                    key={tmpl.id}
                    onClick={() =>
                      setSelectedTemplate(
                        selectedTemplate === tmpl.id ? null : tmpl.id
                      )
                    }
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{tmpl.title}</span>
                      <Badge className="shrink-0 text-[10px]" variant="outline">
                        {tmpl.category}
                      </Badge>
                    </div>
                    {selectedTemplate === tmpl.id && (
                      <p className="mt-2 whitespace-pre-wrap text-[11px] text-muted-foreground leading-relaxed">
                        {tmpl.body}
                      </p>
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkingPage;
