export async function fetchStatus() {
    try {
        const response = await fetch('https://api.kraken.com/0/public/SystemStatus');
        const jresponse = await response.json();
        console.log(jresponse)
        return `${jresponse.result.status} @ ${jresponse.result.timestamp}`;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch status.');
    }
}
