// Storing the data right now in memory

const conversations = new Map<string, string>()

// Return and object contains get and set lastresponse id
export const conversationRepository = {
  getLastResponseId(conversationId: string) {
    return conversations.get(conversationId)
  },
  setLastResponseId(conversationId: string, responseId: string) {
    conversations.set(conversationId, responseId)
  },
}
