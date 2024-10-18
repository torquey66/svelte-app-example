<script>
  import { Modal } from 'flowbite-svelte';
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

  let isModalOpen = false;
  let selectedRow = null;

  function handleRowClick(row) {
    selectedRow = row;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    selectedRow = null;
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

  {#if isModalOpen}
    <Modal title={selectedRow['symbol']} bind:open={isModalOpen} on:close={closeModal} autoclose outsideclose>
      <p>{JSON.stringify(selectedRow)}</p>
    </Modal>
  {/if}
</div>

