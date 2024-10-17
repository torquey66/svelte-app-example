<script>
  import "../app.css";
  import { BottomNav, BottomNavItem } from 'flowbite-svelte';
  import Status from '../components/Status.svelte';

  import { page } from '$app/stores';
  $: currentPath = $page.url.pathname;

</script>

<div>
  <div>
    <div class="border-b border-gray-300">
      <div class="flex space-x-4">
        <a
          href="/assets"
          class={`px-8 py-8 font-bold transition-colors duration-200 rounded-t-lg
                 ${currentPath === '/assets' ? 'text-blue-600 bg-white shadow' : 'text-gray-500 hover:text-red-600'}`}
          >
          Assets
        </a>
        <a
          href="/pairs"
          class={`px-8 py-8 font-bold transition-colors duration-200 rounded-t-lg
          ${currentPath === '/pairs' ? 'text-blue-600 bg-white shadow' : 'text-gray-500 hover:text-red-600'}`}
          >
          Pairs
        </a>
      </div>
    </div>
    <slot />
  </div>

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
