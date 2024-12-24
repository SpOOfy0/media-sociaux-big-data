/**
 * Generate three Python graphs using machine learning for data studies.
 * @param json The data to send to the Python server.
 * @returns The three generated graphs.
 */
export async function sendPythonServerRequests(json: any[]): Promise<string[]> {
  const sentimentPromise = fetch(`http://machine-learning:${process.env.MACHINE_LEARNING_PORT}/sentiment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  });

  const sentiments = await (await sentimentPromise).json();

  const query = json.map((value, index) => ({
    comment: value.comment,
    sentiment: sentiments[index].label,
    score: sentiments[index].score,
  }))

  const explanationPromise = await fetch(`http://machine-learning:${process.env.MACHINE_LEARNING_PORT}/explaination`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  });

  return Promise.all([JSON.stringify(sentiments), explanationPromise.text()]);
}