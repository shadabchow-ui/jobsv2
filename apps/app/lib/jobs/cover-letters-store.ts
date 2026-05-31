/**
 * Cover Letters Store — persistence-ready boundary.
 *
 * This module defines the contract for cover-letter persistence and provides
 * a local/mock implementation using in-memory data. Swap the implementation
 * for a real database-backed version when Prisma + DATABASE_URL are ready.
 *
 * Blocker: Prisma generated client not available (`packages/database/generated/`
 * does not exist). Schema in `packages/database/prisma/schema.prisma` is a stub
 * with only a `Page` model. `DATABASE_URL` is not configured in `.env`.
 *
 * To unblock:
 *   1. Add a `CoverLetter` model to `packages/database/prisma/schema.prisma`
 *      with fields: id, userId, linkedApplicationId?, linkedJobId?, targetJobTitle,
 *      targetCompany, recipientName?, tone, body, status, personalizationNotes (JSON),
 *      createdAt, updatedAt
 *   2. Run `bun run build` in `packages/database` to generate the client
 *   3. Configure `DATABASE_URL` in `apps/app/.env`
 *   4. Implement the `CoverLettersStore` interface below using Prisma
 */

import type {
  CoverLetterDraft,
  CoverLetterStatus,
  CoverLetterTone,
} from "./types";

/** Input for creating a new cover letter draft. */
export interface CreateCoverLetterInput {
  body: string;
  linkedApplicationId?: string;
  linkedJobId?: string;
  personalizationNotes?: { checked: boolean; id: string; label: string }[];
  recipientName?: string;
  targetCompany: string;
  targetJobTitle: string;
  tone: CoverLetterTone;
}

/** Input for updating an existing cover letter draft. */
export interface UpdateCoverLetterInput {
  body?: string;
  linkedApplicationId?: string;
  linkedJobId?: string;
  personalizationNotes?: { checked: boolean; id: string; label: string }[];
  recipientName?: string;
  status?: CoverLetterStatus;
  targetCompany?: string;
  targetJobTitle?: string;
  tone?: CoverLetterTone;
}

/** Contract for cover-letter storage. */
export interface CoverLettersStore {
  /** Create a new draft. Returns the created record. */
  create(
    userId: string,
    input: CreateCoverLetterInput
  ): Promise<CoverLetterDraft>;
  /** Delete a draft. Returns true if removed. */
  delete(userId: string, draftId: string): Promise<boolean>;
  /** Get a single draft by id. */
  getById(
    userId: string,
    draftId: string
  ): Promise<CoverLetterDraft | undefined>;
  /** Link a draft to an application record. */
  linkToApplication(
    userId: string,
    draftId: string,
    applicationId: string
  ): Promise<CoverLetterDraft | undefined>;
  /** List all cover letter drafts for the given user. */
  list(userId: string): Promise<CoverLetterDraft[]>;
  /** Unlink a draft from its application. */
  unlinkFromApplication(
    userId: string,
    draftId: string
  ): Promise<CoverLetterDraft | undefined>;
  /** Update an existing draft. Returns the updated record, or undefined if not found. */
  update(
    userId: string,
    draftId: string,
    input: UpdateCoverLetterInput
  ): Promise<CoverLetterDraft | undefined>;
}

// ---------------------------------------------------------------------------
// Local (mock) implementation — not persisted
// ---------------------------------------------------------------------------

import { mockCoverLetterDrafts as mockDrafts } from "./data";

const now = (): string => new Date().toISOString();

function buildDraft(
  input: CreateCoverLetterInput,
  id: string
): CoverLetterDraft {
  return {
    body: input.body,
    createdAt: now(),
    id,
    linkedApplicationId: input.linkedApplicationId,
    linkedJobId: input.linkedJobId,
    personalizationNotes: input.personalizationNotes ?? [],
    recipientName: input.recipientName,
    status: "draft",
    targetCompany: input.targetCompany,
    targetJobTitle: input.targetJobTitle,
    tone: input.tone,
    updatedAt: now(),
  };
}

class LocalCoverLettersStore implements CoverLettersStore {
  private readonly data: Map<string, CoverLetterDraft[]>;

  constructor() {
    this.data = new Map();
    const seeded: CoverLetterDraft[] = mockDrafts.map((d, i) => ({
      ...d,
      createdAt: "2026-05-28T10:00:00Z",
      linkedApplicationId: undefined,
      linkedJobId: i === 0 ? "saved-1" : undefined,
      status: "draft" as CoverLetterStatus,
      updatedAt: "2026-05-30T10:00:00Z",
    }));
    this.data.set("local-dev", seeded);
  }

  list(userId: string): Promise<CoverLetterDraft[]> {
    return Promise.resolve(this.data.get(userId) ?? []);
  }

  getById(
    userId: string,
    draftId: string
  ): Promise<CoverLetterDraft | undefined> {
    const drafts = this.data.get(userId);
    if (!drafts) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(drafts.find((d) => d.id === draftId));
  }

  create(
    userId: string,
    input: CreateCoverLetterInput
  ): Promise<CoverLetterDraft> {
    const drafts = this.data.get(userId) ?? [];
    const id = `cl-draft-${Date.now()}`;
    const draft = buildDraft(input, id);
    drafts.push(draft);
    this.data.set(userId, drafts);
    return Promise.resolve(draft);
  }

  update(
    userId: string,
    draftId: string,
    input: UpdateCoverLetterInput
  ): Promise<CoverLetterDraft | undefined> {
    const drafts = this.data.get(userId);
    if (!drafts) {
      return Promise.resolve(undefined);
    }
    const idx = drafts.findIndex((d) => d.id === draftId);
    if (idx === -1) {
      return Promise.resolve(undefined);
    }
    const updated: CoverLetterDraft = {
      ...drafts[idx],
      ...(input.body !== undefined && { body: input.body }),
      ...(input.linkedApplicationId !== undefined && {
        linkedApplicationId: input.linkedApplicationId,
      }),
      ...(input.linkedJobId !== undefined && {
        linkedJobId: input.linkedJobId,
      }),
      ...(input.personalizationNotes !== undefined && {
        personalizationNotes: input.personalizationNotes,
      }),
      ...(input.recipientName !== undefined && {
        recipientName: input.recipientName,
      }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.targetCompany !== undefined && {
        targetCompany: input.targetCompany,
      }),
      ...(input.targetJobTitle !== undefined && {
        targetJobTitle: input.targetJobTitle,
      }),
      ...(input.tone !== undefined && { tone: input.tone }),
      updatedAt: now(),
    };
    drafts[idx] = updated;
    return Promise.resolve(updated);
  }

  delete(userId: string, draftId: string): Promise<boolean> {
    const drafts = this.data.get(userId);
    if (!drafts) {
      return Promise.resolve(false);
    }
    const idx = drafts.findIndex((d) => d.id === draftId);
    if (idx === -1) {
      return Promise.resolve(false);
    }
    drafts.splice(idx, 1);
    return Promise.resolve(true);
  }

  linkToApplication(
    userId: string,
    draftId: string,
    applicationId: string
  ): Promise<CoverLetterDraft | undefined> {
    return this.update(userId, draftId, {
      linkedApplicationId: applicationId,
      status: "linked",
    });
  }

  unlinkFromApplication(
    userId: string,
    draftId: string
  ): Promise<CoverLetterDraft | undefined> {
    return this.update(userId, draftId, {
      linkedApplicationId: undefined,
      status: "draft",
    });
  }
}

/** Default store instance. Replace with a Prisma-backed implementation. */
export const coverLettersStore: CoverLettersStore =
  new LocalCoverLettersStore();
