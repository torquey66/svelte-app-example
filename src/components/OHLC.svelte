<script>
  import { onMount } from 'svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  export let data;

  let ohlc = {};
  let status = "";
  let isLoading = true;

  async function getOHLC() {
    try {
      const symbol = encodeURIComponent(data);
      const url = '/api/ohlc?symbol=' + symbol;
      const response = await fetch(url);
      if (response.ok) {
        const content = await response.json();
        const tickData = content.tickData;
        const latestTick = tickData.at(-1);
        const [time, open, high, low, close, vwap, volume, count] = latestTick;
        ohlc = { time, open, high, low, close, vwap, volume, count };
      }
      else {
        status = "Error fetching OHLC: " + response.status;
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
    getOHLC();
    return () => {};
  });
</script>

<div>
  <h2>OHLC</h2>
  {#if isLoading}
    <p>Loading OHLC...</p>
  {:else if ohlc}
    <Table>
      <TableBody>
        <TableBodyRow>
          <TableBodyCell>Open</TableBodyCell>
          <TableBodyCell>{ohlc.open}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>High</TableBodyCell>
          <TableBodyCell>{ohlc.high}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Low</TableBodyCell>
          <TableBodyCell>{ohlc.low}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Close</TableBodyCell>
          <TableBodyCell>{ohlc.close}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>VWAP</TableBodyCell>
          <TableBodyCell>{ohlc.vwap}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Volume</TableBodyCell>
          <TableBodyCell>{ohlc.volume}</TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCell>Time</TableBodyCell>
          <TableBodyCell>{ohlc.time}</TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  {:else}
    <p>No status available.</p>
  {/if}
</div>


