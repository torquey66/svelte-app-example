<script>
  import "../app.css";
  import { BottomNav, BottomNavItem } from 'flowbite-svelte';
  import { Footer} from 'flowbite-svelte';
  import { Tabs, TabItem } from 'flowbite-svelte';

  import Status from '../components/Status.svelte';
  import Assets from '../components/Assets.svelte';
  import Pairs from '../components/Pairs.svelte';

  export let data;

</script>

<div>
  <Tabs tabStyle="pill">
    <TabItem open>
      <span slot="title">Assets</span>
      <p class="text-sm text-gray-500 dark:text-gray-400">
         <Assets data={data.assets}/>
      </p>
    </TabItem>
    <TabItem>
      <span slot="title">Pairs</span>
      <p class="text-sm text-gray-500 dark:text-gray-400">
         <Pairs data={data.pairs}/>
      </p>
    </TabItem>
  </Tabs>

  <BottomNav  class="bg-gray-800 text-white">
    <BottomNavItem class="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">Kraken Explorer</BottomNavItem>
    <BottomNavItem class="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
      <Status/>
    </BottomNavItem>
  </BottomNav>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
