<script>
  import "../app.css";
  import { BottomNav, BottomNavItem, Skeleton, ImagePlaceholder, TextPlaceholder } from 'flowbite-svelte';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import Status from '../components/Status.svelte';
</script>

<div>
  <Navbar>
    <NavBrand href="/">
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Kraken Explorer</span>
    </NavBrand>
    <NavHamburger/>
    <NavUl >
      <NavLi href="/">About</NavLi>
      <NavLi href="/refdata">Ref Data</NavLi>
    </NavUl>
  </Navbar>

  <div class="max-h-screen overflow-hidden flex flex-col">
    <div class="flex-grow overflow-auto">
      <slot/>
    </div>
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
