<script lang="ts">
    import Empire from '$lib/Empire.svelte';
    import Setup from '$lib/Setup.svelte';
    import { selectingTeams } from '$lib/stores';
</script>
  
{#if $selectingTeams}
    <Setup />
{:else}
    <Empire />
{/if}
<style>
	:global(button) {
		padding: 5pt;
        border-radius: 5pt;
        font-size: 12pt;
	}
    :global(option) {
        font-size: 12pt;
    }
    :global(select) {
        height: 2rem;
    }
</style>
  