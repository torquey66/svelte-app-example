<script>
  import { onMount } from 'svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  export let data;

  let ticker = {};
  let status = "";
  let isLoading = true;

  async function getTicker() {
    try {
      const symbol = encodeURIComponent(data);
      const url = '/api/ticker?symbol=' + symbol;
      const response = await fetch(url);
      if (response.ok) {
        const content = await response.json();
        ticker = content;
      }
      else {
        status = "Error fetching Ticker: " + response.status;
      }
    }
    catch (error) {
      status = error.message;
    }
    finally {
      isLoading = false;
    }
  }

  onMount(async () => {
    getTicker();
    return () => {};
  });

  /**
   * See https://docs.kraken.com/api/docs/rest-api/get-ticker-information
   * for details on Ticker content.
   */
  function formatQuote(quote) {
    const px = quote[0];
    const qty = quote[1];
    return `${qty} @ ${px}`;
  }

  function formatAmount(amount) {
    const last = amount[0];
    const last24 = amount[1];
    return `${last} (${last24})`;
  }
</script>

<div>
  <h2>Ticker</h2>
  {#if isLoading}
    <p>Loading ticker...</p>
  {:else if ticker}
    <Table>
      <TableBody>
        <TableBodyRow>
          <TableBodyCell>Ask</TableBodyCell>
          <TableBodyCell>{formatQuote(ticker.ask)}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Bid</TableBodyCell>
          <TableBodyCell>{formatQuote(ticker.bid)}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Close</TableBodyCell>
          <TableBodyCell>{formatQuote(ticker.close)}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Volume</TableBodyCell>
          <TableBodyCell>{formatAmount(ticker.volume)}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>VWAP</TableBodyCell>
          <TableBodyCell>{formatAmount(ticker.vwap)}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Num Trades</TableBodyCell>
          <TableBodyCell>{formatAmount(ticker.num_trades)}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Low</TableBodyCell>
          <TableBodyCell>{formatAmount(ticker.low)}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>High</TableBodyCell>
          <TableBodyCell>{formatAmount(ticker.high)}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Open</TableBodyCell>
          <TableBodyCell>{ticker.open}</TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  {:else}
    <p>No status available.</p>
  {/if}
</div>


