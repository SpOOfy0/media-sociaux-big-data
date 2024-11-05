/**
 * Generate three Python graphs using machine learning for data studies.
 * @param json The data to send to the Python server.
 * @returns The three generated graphs.
 */
export async function sendPythonServerRequests(json: any[]): Promise<string[]> {
  const data = json.map(data => ({
    likes: Number.parseInt(data.likes),
    views: Number.parseInt(data.views),
    comments: Number.parseInt(data.comments),
    tags: Number.parseInt(data.tags.length),
    publication: Number.parseInt(data.publication),
    duration: Number.parseInt(data.duration),
    madeForKids: data.madeForKids ? 1 : 0
  }));

  const pairsPromise = fetch(`http://machine-learning:${process.env.MACHINE_LEARNING_PORT}/pairs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const outliersPromise = fetch(`http://machine-learning:${process.env.MACHINE_LEARNING_PORT}/outliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const importancePromise = fetch(`http://machine-learning:${process.env.MACHINE_LEARNING_PORT}/importance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data,
      y: "likes"
    })
  });

  const responses = await Promise.all([pairsPromise, outliersPromise, importancePromise]);

  return Promise.all(responses.map(response => response.text()));
}