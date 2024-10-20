export async function load() {
    try {
        const assetsResponse = await fetch('https://api.kraken.com/0/public/Assets');
        const assetsJSON = await assetsResponse.json();
        const pairsResponse = await fetch('https://api.kraken.com/0/public/AssetPairs');
        const pairsJSON = await pairsResponse.json();
        return { 'assets': assetsJSON,
                 'pairs': pairsJSON };
    } catch (error) {
        console.error('Failed to fetch list:', error);
        return {};
    }
}
