export class VideoParser {
  private videos: any[];

  constructor(videos: any[]) {
    this.videos = videos;
  }

  private preprocess(): Record<string, any>[] {
    const videos: Record<string, any>[] = [];

    for (const video of this.videos) {
      videos.push({
        id: video.id,
        url: `https://youtu.be/${video.id}`,
        publication: Date.parse(video.snippet.publishedAt),
        title: video.snippet.title,
        channel: video.snippet.channelTitle,
        thumbnail: video.snippet.thumbnails.default.url,
        tags: video.snippet.tags ?? [],
        duration: this.processDuration(video.contentDetails.duration),
        definition: video.contentDetails.definition,
        caption: video.contentDetails.caption,
        license: video.status.license,
        madeForKids: video.status.madeForKids,
        views: video.statistics.viewCount,
        likes: video.statistics.likeCount,
        favorites: video.statistics.favoriteCount,
        comments: video.statistics.commentCount
      })
    }

    return videos;
  }

  private processDuration(duration: string): number {
    const extractorRegex = /^PT(?:(\d{1,2})H)?(?:(\d{1,2})M)?(?:(\d{1,2})S)?$/;
    
    const [_, hourStr, minuteStr, secondStr]: string[] = duration.match(extractorRegex);
    const hour = parseInt(hourStr ?? "0");
    const minute = parseInt(minuteStr ?? "0");
    const second = parseInt(secondStr ?? "0");

    return second + 60 * minute + 3600 * hour;
  }

  parse(): string {
    const videos = this.preprocess();

    return JSON.stringify(videos);
  }
}