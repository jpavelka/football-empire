<script lang="ts">
    import Empire from '$lib/Empire.svelte';
    import Setup from '$lib/Setup.svelte';
    import { selectingTeams, height, width, updateWithProjection, allowArrow } from '$lib/stores';

    let clientWidth = 1000;
    $: {
        width.set(Math.min(1000, clientWidth));
        allowArrow.set(false);
        height.set($width * 0.55);
    }
    updateWithProjection();
</script>

<div bind:clientWidth={clientWidth} />
  
{#if $selectingTeams}
    <Setup />
{:else}
    <Empire />
{/if}
<style>
	:global(button) {
        all: unset;
        cursor: pointer;
        border-radius: 17px; 
        justify-content: center;
        align-items: center;
        padding: 5pt;
        border: 1pt solid black;
        border-radius: 5pt;
        font-size: 12pt;
        background-color: #ddd;
        box-shadow: 0 3px 0 #555;
	}
    :global(button:active) {
        box-shadow: none;
        transform: translateY(3px);
    }
    :global(button:disabled) {
        box-shadow: none;
        color: #bbb;
        opacity: 0.6;
        transform: translateY(0);
    }
    :global(option) {
        font-size: 12pt;
    }
    :global(option:disabled) {
        color: #ccc;
        background-color: #eee;
    }
    :global(select) {
        --radius: 2px;
        --baseFg: dimgray;
        --baseBg: white;
        --accentFg: #555;
        --accentBg: #ddd;
        font: 400 12px/1.3 sans-serif;
        font-size: 0.8rem;
        -webkit-appearance: none;
        appearance: none;
        color: var(--baseFg);
        border: 1px solid var(--baseFg);
        line-height: 1.1;
        outline: 0;
        padding: 0.75em 2.5em 0.65em 0.75em;
        border-radius: var(--radius);
        background-color: var(--baseBg);
        background-image: linear-gradient(var(--baseFg), var(--baseFg)),
            linear-gradient(-135deg, transparent 50%, var(--accentBg) 50%),
            linear-gradient(-225deg, transparent 50%, var(--accentBg) 50%),
            linear-gradient(var(--accentBg) 42%, var(--accentFg) 42%);
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-size: 1px 100%, 20px 22px, 20px 22px, 20px 100%;
        background-position: right 20px center, right bottom, right bottom, right bottom;   
    }

    :global(select:hover) {
        background-image: linear-gradient(var(--accentFg), var(--accentFg)),
        linear-gradient(-135deg, transparent 50%, var(--accentFg) 50%),
        linear-gradient(-225deg, transparent 50%, var(--accentFg) 50%),
        linear-gradient(var(--accentFg) 42%, var(--accentBg) 42%);
    }

    :global(body) {
        margin: 0;
        padding: 0.5rem
    }
</style>
  