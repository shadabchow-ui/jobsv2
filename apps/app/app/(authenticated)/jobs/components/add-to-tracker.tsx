"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { CheckCircleIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { getApplicationStore } from "@/lib/jobs/applications-store";

interface AddToTrackerProps {
  company: string;
  jobId: string;
  location: string;
  title: string;
}

export const AddToTracker = ({
  company,
  jobId,
  location,
  title,
}: AddToTrackerProps) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const store = getApplicationStore();
    store.create({
      company,
      jobId,
      location,
      title,
    });
    setAdded(true);
  };

  if (added) {
    return (
      <Button className="w-full" disabled size="sm" variant="secondary">
        <CheckCircleIcon className="size-3.5" />
        Added to tracker
      </Button>
    );
  }

  return (
    <Button
      className="w-full"
      onClick={handleAdd}
      size="sm"
      variant="secondary"
    >
      <PlusIcon className="size-3.5" />
      Add to applications
    </Button>
  );
};
