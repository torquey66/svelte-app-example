<script>
  import "../app.css";
  import { BottomNav, BottomNavItem } from 'flowbite-svelte';
  import { Tabs, TabItem } from 'flowbite-svelte';

  import Status from '../components/Status.svelte';
  import Assets from '../components/Assets.svelte';
  import Pairs from '../components/Pairs.svelte';

  export let data;

  import { page } from '$app/stores';
  $: currentPath = $page.url.pathname;

</script>

<div>
  <Tabs tabStyle="pill">
    <TabItem open>
      <span slot="title">Assets</span>
      <p class="text-sm text-gray-500 dark:text-gray-400">
         <Assets data={data.assets}/>
      </p>
    </TabItem>
    <TabItem open>
      <span slot="title">Pairs</span>
      <p class="text-sm text-gray-500 dark:text-gray-400">
         <Assets data={data.pairs}/>
      </p>
    </TabItem>
  </Tabs>

  <BottomNav>
    <BottomNavItem>
      <Status/>
    </BottomNavItem>
  </BottomNav>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
