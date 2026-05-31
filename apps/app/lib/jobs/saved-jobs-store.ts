/**
 * Saved Jobs Store — persistence-ready boundary.
 *
 * This module defines the contract for saved-jobs persistence and provides
 * a local/mock implementation using in-memory data. Swap the implementation
 * for a real database-backed version when Prisma + DATABASE_URL are ready.
 *
 * Blocker: Prisma generated client not available (`packages/database/generated/`
 * does not exist). Schema in `packages/database/prisma/schema.prisma` is a stub
 * with only a `Page` model. `DATABASE_URL` is not configured in `.env`.
 *
 * To unblock:
 *   1. Add a `SavedJob` model to `packages/database/prisma/schema.prisma`
 *   2. Run `bun run build` in `packages/database` to generate the client
 *   3. Configure `DATABASE_URL` in `apps/app/.env`
 *   4. Implement the `SavedJobsStore` interface below using Prisma
 */

import type { SavedJob } from "./types";

/** A job payload that can be saved (normalized external data). */
export interface SaveJobInput {
  company: string;
  id: string;
  location: string;
  matchScore?: number;
  title: string;
}

/** Contract for saved-jobs storage. */
export interface SavedJobsStore {
  /** Check if a job is saved by the given user. */
  isSaved(userId: string, jobId: string): Promise<boolean>;
  /** List all saved jobs for the given user. */
  list(userId: string): Promise<SavedJob[]>;
  /** Save a job for the given user. Returns the saved record. */
  save(userId: string, input: SaveJobInput): Promise<SavedJob>;
  /** Remove a saved job by id for the given user. Returns true if removed. */
  unsave(userId: string, jobId: string): Promise<boolean>;
}

// ---------------------------------------------------------------------------
// Local (mock) implementation — not persisted
// ---------------------------------------------------------------------------

import { mockSavedJobs as mockData } from "./mock-data";

class LocalSavedJobsStore implements SavedJobsStore {
  private readonly data: Map<string, SavedJob[]>;

  constructor() {
    this.data = new Map();
    this.data.set("local-dev", [...mockData]);
  }

  list(userId: string): Promise<SavedJob[]> {
    return Promise.resolve(this.data.get(userId) ?? []);
  }

  save(userId: string, input: SaveJobInput): Promise<SavedJob> {
    const jobs = this.data.get(userId) ?? [];
    const existing = jobs.find((j) => j.id === input.id);
    if (existing) {
      return Promise.resolve(existing);
    }
    const saved: SavedJob = {
      company: input.company,
      id: input.id,
      location: input.location,
      matchScore: input.matchScore,
      savedDate: new Date().toISOString().slice(0, 10),
      title: input.title,
    };
    jobs.push(saved);
    this.data.set(userId, jobs);
    return Promise.resolve(saved);
  }

  unsave(userId: string, jobId: string): Promise<boolean> {
    const jobs = this.data.get(userId);
    if (!jobs) {
      return Promise.resolve(false);
    }
    const idx = jobs.findIndex((j) => j.id === jobId);
    if (idx === -1) {
      return Promise.resolve(false);
    }
    jobs.splice(idx, 1);
    this.data.set(userId, jobs);
    return Promise.resolve(true);
  }

  isSaved(userId: string, jobId: string): Promise<boolean> {
    const jobs = this.data.get(userId);
    if (!jobs) {
      return Promise.resolve(false);
    }
    return Promise.resolve(jobs.some((j) => j.id === jobId));
  }
}

/** Default store instance. Replace with a Prisma-backed implementation. */
export const savedJobsStore: SavedJobsStore = new LocalSavedJobsStore();
