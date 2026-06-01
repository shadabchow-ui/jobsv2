"use server";

export const searchUsers = async (
  _query: string
): Promise<
  | {
      data: string[];
    }
  | {
      error: unknown;
    }
> => {
  try {
    return { data: [] };
  } catch (error) {
    return { error };
  }
};
