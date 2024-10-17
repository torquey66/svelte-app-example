<script>
  import "../app.css";
</script>

<nav>
	<a href="/">home</a>
	<a href="/refdata">refdata</a>
</nav>

<slot />

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
