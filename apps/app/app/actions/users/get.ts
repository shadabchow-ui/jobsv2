"use server";

export const getUsers = async (
  _userIds: string[]
): Promise<
  | {
      data: Liveblocks["UserMeta"]["info"][];
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
