import { db } from "./client.js";

const channels = db.collection("channels");

export namespace Channel {
  export async function read(channel: string) {
    const channelComments = await channels.find({ channel }).toArray();
    return channelComments;
  }

  export async function append(channel: string, commentBatch: any[]) {
    const commentsWithMetadata: any[] = commentBatch.map(comment => ({
      ...comment,
      channel
    }));
    await channels.insertMany(commentsWithMetadata);
  }
}