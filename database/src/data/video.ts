import { db } from "./client.js";

const videos = db.collection("videos");

export namespace Video {
  // Lire une vidéo à partir de l'URL
  export async function read(url: string) {
    const video = await videos.findOne({ url });
    return video;
  }

  // Effectuer une requête pour obtenir un lot de vidéos
  export async function request(request: string) {
    const videoBatch = await videos.find({ request }).limit(10).toArray();
    return videoBatch;
  }

  // Ajouter des vidéos à la collection
  export async function append(request: string, videoBatch: any[]) {
    // Ajouter la requête à chaque vidéo du lot
    const videoWithRequest = videoBatch.map(video => {
      video.request = request;
      return video;
    });

    try {
      // Insérer plusieurs vidéos dans MongoDB
      const result = await videos.insertMany(videoWithRequest);
      // Retourner l'objet de résultat pour vérifier l'insertion
      return result;
    } catch (error) {
      // Gérer les erreurs d'insertion
      console.error("Error inserting videos: ", error);
      throw error;
    }
  }
}
