require('dotenv').config();

const AZURE_OAI_API_KEY = process.env.AZURE_OAI_API_KEY;
const AZURE_OAI_ENDPOINT = process.env.AZURE_OAI_ENDPOINT;

async function textToMql(query) {
    const axios = require('axios');
    const fs = require('fs');

    try {
        // Read the AI input file
        const data = await fs.promises.readFile('AI-input.txt', 'utf8');
        const learningPath = data;

        // Construct the user input with context
        const aiInput = `${learningPath}\nQ: ${query}\nA:`;

        // Define headers for the API request
        const headers = {
            "Content-Type": "application/json",
            "api-key": AZURE_OAI_API_KEY,
        };

        // Define the payload for the API request
        const payload = {
            "messages": [
                {
                    "role": "system",
                    "content": `You are a helpful assistant that answers questions about MongoDB queries based on the context provided in ${learningPath}. If the question is not related to MongoDB queries or the context, say 'I do not know.'`
                },
                {
                    "role": "user",
                    "content": aiInput
                }
            ],
            "temperature": 0.3,
            "max_tokens": 400,
            "top_p": 1,
            "frequency_penalty": 0.2,
            "presence_penalty": 0,
            "stop": ["\n"]
        };

        // Make the API request
        const response = await axios.post(
            AZURE_OAI_ENDPOINT,
            payload,
            { headers: headers }
        );

        // Extract and log the assistant's response
        const assistantResponse = response.data.choices[0].message.content;

        return assistantResponse;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Example usage
// textToMql("query all restaurants where cuisine is American and name starts with 'Ri'")
// (async () => {
//     const query = "Query users collection for username with value 'boy'";
//     await text2Mql(query);
// })();