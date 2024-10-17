<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  export let data;

  const cols = ['symbol', 'altname', 'wsname', 'aclass_base', 'base', 'aclass_quote', 'quote', 'lot', 'pair_decimals', 'cost_decimals', 'lot_decimals', 'lot_multiplier', 'leverage_buy', 'leverage_sell', 'fees', 'fees_maker', 'fee_volume_currency', 'margin_call', 'margin_stop', 'ordermin', 'costmin', 'tick_size', 'status', 'long_position_limit','short_position_limit'];

  $: symbols = Object.keys(data.result);
  $: rows = symbols.map(key => {
    return {
      symbol: key,
      ...data.result[key],
    };
  });


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
        <TableBodyRow>
          {#each cols as col}
            <TableBodyCell class="p-2 border-b">{row[col]}</TableBodyCell>
          {/each}
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>

