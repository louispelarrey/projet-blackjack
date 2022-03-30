export { secureFetch }
// Paramètre: URL (Appel API).
// Retour: Promesse.
let secureFetch = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Bad status code");
        }
        const hasContentType = response.headers.has("content-type");
        const isJson = response.headers
            .get("content-type")
            .startsWith("application/json");
        if (!hasContentType || !isJson) {
            throw new Error("Bad content");
        }
        return await response.json();
    } catch (error) {
        return Promise.reject(error);
    }
};