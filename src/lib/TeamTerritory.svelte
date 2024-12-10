<script lang="ts">
    import { teamInfo } from "./stores";
    import { coordsToSvgPathD } from "./utils";

    export let tId;
    const team = $teamInfo[tId];
</script>

{#each team.conquered as tId}
    {#each $teamInfo[tId].originalTerritory.entries() as [i, t]}
        <mask id={`mask-${tId}-${i}`}>
            <path d={coordsToSvgPathD(t.pathCoords)} fill=white/>
            {#each t.masks as m}
                <path d={coordsToSvgPathD(m)} fill=black/>
            {/each}
        </mask>
        <path
            d={coordsToSvgPathD(t.pathCoords)}
            fill={team.color}
            opacity=0.5
            mask={`url(#mask-${tId}-${i})`}
        />
    {/each}
{/each}
