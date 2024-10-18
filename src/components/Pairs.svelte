<script>
  import { Drawer, Table, TableBody, TableBodyCell, TableBodyRow, TableHead,
           TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import { sineIn } from 'svelte/easing';
  import { InfoCircleSolid } from 'flowbite-svelte-icons';

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

  function handleRowClick(row) {
    selectedRow = row;
    isDrawerHidden = false;
  }

  function closeModal() {
    selectedRow = null;
    isDrawerHidden = true;
  }

  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn
  };

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
    <div class="flex items-center">
      <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        <InfoCircleSolid class="w-5 h-5 me-2.5" />
        {selectedRow['symbol']}
      </h5>
    </div>
  </Drawer>
  
</div>

