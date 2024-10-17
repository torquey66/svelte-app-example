<script>
  import { onMount } from 'svelte';
  import { fetchStatus } from '../lib/status.ts';

  let name = '';
  let status = '';
  let isLoading = false;

  async function fetchData() {
    try {
      status = await fetchStatus();
    } catch (error) {
      status = error.message;
    } finally {
      isLoading = false;
    }
  }

  onMount(async () => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  <h4>
    {#if isLoading}
      <p>Loading status...</p>
    {:else if status}
      <p>{status}</p>
    {:else}
      <p>No status available.</p>
    {/if}
  </h4>
</div>
