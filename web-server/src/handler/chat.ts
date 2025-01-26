export async function sendMessage(userMessage) {
    const port = process.env.MACHINE_LEARNING_PORT; // Valeur par défaut
    const baseURL = `http://machine-learning:${port}/chat`;

    try {
        const response = await fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error in sendMessage:", error);
        throw new Error("Failed to process the query.");
    }
}
