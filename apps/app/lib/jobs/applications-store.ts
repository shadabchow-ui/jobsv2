import type { ApplicationRecord, ApplicationStatus } from "./types";

export interface ApplicationStore {
  create(input: CreateApplicationInput): ApplicationRecord;
  getById(id: string): ApplicationRecord | undefined;
  list(): ApplicationRecord[];
  remove(id: string): boolean;
  updateNotes(
    id: string,
    updates: UpdateNotesInput
  ): ApplicationRecord | undefined;
  updateStatus(
    id: string,
    status: ApplicationStatus
  ): ApplicationRecord | undefined;
}

export interface CreateApplicationInput {
  company: string;
  hasCoverLetter?: boolean;
  hasResume?: boolean;
  jobId: string;
  location: string;
  title: string;
}

export interface UpdateNotesInput {
  applicationDate?: string;
  nextAction?: string;
  reminderDate?: string;
}

let nextId = 100;

function generateId(): string {
  nextId++;
  return `app-${nextId}`;
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

class InMemoryApplicationStore implements ApplicationStore {
  private readonly records: ApplicationRecord[];

  constructor(initial: ApplicationRecord[] = []) {
    this.records = [...initial];
  }

  list(): ApplicationRecord[] {
    return [...this.records];
  }

  getById(id: string): ApplicationRecord | undefined {
    return this.records.find((r) => r.id === id);
  }

  create(input: CreateApplicationInput): ApplicationRecord {
    const record: ApplicationRecord = {
      id: generateId(),
      jobId: input.jobId,
      title: input.title,
      company: input.company,
      location: input.location,
      status: "saved",
      applicationDate: todayISO(),
      hasResume: input.hasResume ?? false,
      hasCoverLetter: input.hasCoverLetter ?? false,
    };
    this.records.push(record);
    return record;
  }

  updateStatus(
    id: string,
    status: ApplicationStatus
  ): ApplicationRecord | undefined {
    const record = this.records.find((r) => r.id === id);
    if (!record) {
      return undefined;
    }
    record.status = status;
    return { ...record };
  }

  updateNotes(
    id: string,
    updates: UpdateNotesInput
  ): ApplicationRecord | undefined {
    const record = this.records.find((r) => r.id === id);
    if (!record) {
      return undefined;
    }
    if (updates.applicationDate !== undefined) {
      record.applicationDate = updates.applicationDate;
    }
    if (updates.nextAction !== undefined) {
      record.nextAction = updates.nextAction;
    }
    if (updates.reminderDate !== undefined) {
      record.reminderDate = updates.reminderDate;
    }
    return { ...record };
  }

  remove(id: string): boolean {
    const index = this.records.findIndex((r) => r.id === id);
    if (index === -1) {
      return false;
    }
    this.records.splice(index, 1);
    return true;
  }
}

let storeInstance: ApplicationStore | null = null;

export function getApplicationStore(): ApplicationStore {
  if (!storeInstance) {
    const { mockApplications } = require("./mock-data");
    storeInstance = new InMemoryApplicationStore(
      (mockApplications as ApplicationRecord[]).map((r) => ({ ...r }))
    );
  }
  return storeInstance;
}

export function resetApplicationStore(): void {
  storeInstance = null;
}

export type { ApplicationStore as ApplicationStoreInterface };
