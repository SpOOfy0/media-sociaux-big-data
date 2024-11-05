import { db } from "./client.js";

const videos = db.collection("videos");

export namespace Video {
  export async function read(url: string) {
    const video = await videos.findOne({ url });
    return video;
  }

  export async function request(request: string) {
    const videoBatch = videos.find({ request }, { limit: 10 });
    return videoBatch.toArray();
  }

  export async function append(request: string, videoBatch: any[]) {
    const videoWithRequest: any[] = videoBatch.map(video => {
      video.request = request;
      return video;
    });
    videos.insertMany(videoWithRequest);
  }
}