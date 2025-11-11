import { ChatRepository } from "@/infrastructure/repositories/chat.repository";

/**
 * Query to retrieve sender names in parallel.
 * Uses caching if provided.
 */
export async function getSenderNamesQuery(
  senderIds: string[],
  cache: Record<string, string> = {}
): Promise<Record<string, string>> {
  const repository = new ChatRepository();

  const results = await Promise.all(
    senderIds.map(async (senderId) => {
      if (cache[senderId]) return [senderId, cache[senderId]] as [string, string];
      const name = await repository.getSenderName(senderId);
      return [senderId, name] as [string, string];
    })
  );

  const names: Record<string, string> = {};
  results.forEach(([id, name]) => (names[id] = name));
  return names;
}
