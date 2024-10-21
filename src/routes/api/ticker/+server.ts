export async function GET( { url } ) {

    const symbol = url.searchParams.get('symbol') ?? '';
    const serverURL = 'https://api.kraken.com/0/public/Ticker?pair=' + symbol;
    const empty = {};

    try {
        const serverResponse = await fetch(serverURL,  {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (serverResponse.ok) {
            const content = await serverResponse.json();
            const ticker = content.result[symbol];
            const result = {
                "ask": ticker.a,
                "bid": ticker.b,
                "close": ticker.c,
                "volume": ticker.v,
                "vwap": ticker.p,
                "num_trades": ticker.t,
                "low": ticker.l,
                "high": ticker.h,
                "open": ticker.o,
            };
            const response = new Response(JSON.stringify(result), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }});
            return response;
        }
        else {
            // TODO: return proper error response
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
