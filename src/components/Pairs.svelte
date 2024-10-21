<script>
  import { Drawer, Table, TableBody, TableBodyCell, TableBodyRow, TableHead,
           TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { sineIn } from 'svelte/easing';
  import { InfoCircleSolid } from 'flowbite-svelte-icons';
  import OHLC from './OHLC.svelte';

  export let data;

  const cols = [
    'symbol', 'altname', 'wsname', 'aclass_base', 'base', 'aclass_quote', 'quote',
    'lot', 'pair_decimals', 'cost_decimals', 'lot_decimals', 'lot_multiplier',
    'leverage_buy', 'leverage_sell', 'margin_call', 'margin_stop', 'ordermin', 'costmin',
    'tick_size', 'status', 'long_position_limit','short_position_limit',
    'fees', 'fees_maker', 'fee_volume_currency'];

  $: symbols = Object.keys(data.result);
  $: rows = symbols.map(key => {
    return {
      symbol: key,
      ...data.result[key],
    };
  });

  let selectedRow = null;
  let isDrawerHidden = true;

  function closeDrawer() {
    selectedRow = null;
    isDrawerHidden = true;
  }

  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn
  };

  let ohlc = {};
  async function getOHLC() {
    const symbol = encodeURIComponent(selectedRow.symbol);
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
      console.error('Error fetching OHLC:', response.status);
    }
  }

  function handleRowClick(row) {
    selectedRow = row;
    isDrawerHidden = false;
    getOHLC();
  }

</script>

<div>
  <Table hoverable={true}>
    <TableHead>
      {#each cols as col}
        <TableHeadCell class="p-2 text-left">{col}</TableHeadCell>
      {/each}
    </TableHead>

    <TableBody>
      {#each rows as row}
        <TableBodyRow on:click={() => handleRowClick(row)}>
          {#each cols as col}
            <TableBodyCell class="p-2 border-b">{row[col]}</TableBodyCell>
          {/each}
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  <Drawer placement="right" transitiontype="fly" {transitionParams} bind:hidden={isDrawerHidden}>
      <h1>{selectedRow.symbol}</h1>
      <OHLC data={selectedRow.symbol}/>
  </Drawer>
  
</div>

