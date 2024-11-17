import { google } from "googleapis";
import { Auth } from "../auth/auth.js";
import logger from "../libs/logger.js";

const youtube = google.youtube("v3");

export namespace Comments {
  export async function byChannel(channel: string, maxResults: number = 10) {
    if (Auth.getAPIKey() == null) {
      return null;
    }

    const channelId = await getChannelIdFromInput(channel);
    if (!channelId) {
      logger.warn({
        message: `No channel found for channel: "${channel}".`,
        location: "Comments.byChannel"
      });
      return null;
    }

    const videoIds = await getChannelVideos(channelId, maxResults);
    const comments = await getVideoComments(videoIds, maxResults);

    logger.info({
      message: `Successfully fetched comments for channel: "${channelId}"`,
      location: "Comments.byChannel"
    });

    return comments;
  }

  async function getChannelIdFromInput(input: string): Promise<string | null> {
    const response = await youtube.search.list({
      key: Auth.getAPIKey(),
      q: input,
      type: ["channel"],
      part: ["snippet"],
      maxResults: 1
    });
  
    const channels = response.data.items;
    if (channels && channels.length > 0) {
      return channels[0].id.channelId;
    }
  
    return null;
  }

  async function getChannelVideos(channelId: string, maxResults: number) {
    const response = await youtube.search.list({
      key: Auth.getAPIKey(),
      channelId,
      part: ["snippet"],
      order: "date",
      type: ["video"],
      maxResults
    });

    const videos = response.data.items;
    return videos.map(video => video.id.videoId);
  }

  async function getVideoComments(videoIds: string[], maxResults: number) {
    const allComments: any[] = [];

    for (const videoId of videoIds) {
      const response = await youtube.commentThreads.list({
        key: Auth.getAPIKey(),
        videoId,
        part: ["snippet"],
        maxResults
      });

      const comments = response.data.items.map(item => ({
        videoId,
        comment: item.snippet.topLevelComment.snippet.textDisplay,
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        likeCount: item.snippet.topLevelComment.snippet.likeCount,
        publishedAt: item.snippet.topLevelComment.snippet.publishedAt
      }));

      allComments.push(...comments);
    }

    return allComments;
  }
}