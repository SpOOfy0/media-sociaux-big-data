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

  const responses = await Promise.all([sentimentPromise]);

  return Promise.all(responses.map(response => response.text()));
}