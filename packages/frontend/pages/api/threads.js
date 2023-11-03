export default async function handler(req, res) {
    console.log("[threads] Endpoint triggered"); // Log the start

    const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
    const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;

    console.log("[threads] HASURA_ENDPOINT:", HASURA_ENDPOINT); // Logging the endpoint for visibility (avoid logging the admin secret for security reasons)

    try {
        console.log("[threads] Request Body:", req.body); // Logging the request body

        const response = await fetch(HASURA_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            console.error("[threads] Error Response from Hasura:", response.statusText); // Logging error responses
        }

        const data = await response.json();
        console.log("[threads] Hasura Response:", data); // Logging the Hasura response

        res.status(response.status).json(data); // Use Hasura's response status
    } catch (error) {
        console.error("[threads] Exception Detail:", error); // Logging the exception detail using console.error for error visibility
        res.status(500).json({ error: 'Failed to process thread' });
    } finally {
        console.log("[threads] Endpoint finished processing"); // Log the end of processing
    }
}
