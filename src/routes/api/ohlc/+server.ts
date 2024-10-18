export async function GET( { url } ) {

    const symbol = url.searchParams.get('symbol') ?? '';
    const serverURL = 'https://api.kraken.com/0/public/OHLC?pair=' + symbol;
    const empty = {};

    try {
        const serverResponse = await fetch(serverURL,  {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (serverResponse.ok) {
            const content = await serverResponse.json();
            const last = content.result['last'];
            const tickData = content.result[symbol];
            const result = {
                'last' : last,
                'tickData' : tickData
            };
            const response = new Response(JSON.stringify(result), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }});
            return response;
        }
        else {
            const response = new Response(JSON.stringify(empty), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }});
            return response;
        }
    } catch (error) {
        console.error(error);
        const response = new Response(JSON.stringify(empty), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }});
        return response;
    }
}
