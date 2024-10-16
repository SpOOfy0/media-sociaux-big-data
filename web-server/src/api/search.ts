import { google } from "googleapis";
import { Auth } from "../auth/auth.js";
import logger from "../libs/logger.js";

const youtube = google.youtube("v3");

export namespace Search {
  export async function videos(query: string, maxResults: number = 10) {
    if (Auth.getAPIKey() == null) {
      return null;
    }

    const response = await getVideos(query, maxResults);
    const videos = response.data.items;
    const videoIds = videos.map(video => video.id.videoId);
    const rawStats = await getVideosStatistics(videoIds, maxResults);
    
    logger.info({
      message: `Successfully requested videos for query: "${query}"`,
      location: "Search.videos"
    });

    return rawStats.data.items;
  }

  async function getVideos(query: string, maxResults: number) {
    return await youtube.search.list({
      key: Auth.getAPIKey(),
      q: query,
      part: ["snippet"],
      order: "relevance",
      type: ["video"],
      maxResults
    });
  }

  async function getVideosStatistics(ids: string[], maxResults: number) {
    return await youtube.videos.list({
      key: Auth.getAPIKey(),
      id: ids,
      part: ["snippet", "statistics", "contentDetails", "status"],
      maxResults
    });
  }
}
