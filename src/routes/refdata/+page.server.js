export async function load() {
    try {
      const response = await fetch('https://api.kraken.com/0/public/Assets');
      console.log(response);
      let reply = await response.json();
      return reply;
    } catch (error) {
      console.error('Failed to fetch list:', error);
      return {};
    }
}
