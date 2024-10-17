<script>
  import "../app.css";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Home</span>
  </NavBrand>
  <NavHamburger/>
  <NavUl >
    <NavLi href="/">About</NavLi>
    <NavLi href="/refdata">Ref Data</NavLi>
  </NavUl>
</Navbar>

<slot/>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
