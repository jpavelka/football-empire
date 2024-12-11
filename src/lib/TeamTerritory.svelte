<script lang="ts">
    import { teamInfo } from "./stores";
    import { coordsToSvgPathD } from "./utils";

    export let tId;
    export let changed = false;
    export let svgEl = undefined;
    const team = $teamInfo[tId];

    const clipId = (tId, i, j, url=false) => {
        if (j < 0) {
            return ''
        }
        const id = `clip-${tId}-${i}-${j}`
        if (url) {
            return `url(#${id})`
        } else {
            return id
        }
    }
    const svgTime = !svgEl ? 0 : svgEl.getCurrentTime() + 0.1;
    const svgScale = 1.03;
</script>

{#each team.conquered as cId}
    {#each $teamInfo[cId].originalTerritory.entries() as [i, t]}
        {#each t.clips.entries() as [j, c]}
            <clipPath id={clipId(cId, i, j)} clip-path={clipId(cId, i, j - 1, true)} stroke=yellow>
                <path d={coordsToSvgPathD(c)}/>
            </clipPath>
        {/each}
        <path
            id={`territory-${tId}-${i}`}
            style=transform-origin:center;
            d={coordsToSvgPathD(t.pathCoords)}
            fill={team.color}
            opacity=0.5
            clip-path={clipId(cId, i, t.clips.length - 1, true)}
        >
        {#if changed}
            <animateTransform attributeName="transform" begin={svgTime} type="scale" dur="0.5s" from="1" to={svgScale} repeatCount="1"/>
            <animateTransform attributeName="transform" begin={svgTime + 0.5} type="scale" dur="0.5s" from={svgScale} to={svgScale} repeatCount="1"/>
            <animateTransform attributeName="transform" begin={svgTime + 1} type="scale" dur="1s" from={svgScale} to="1" repeatCount="1"/>
        {/if}
        </path>
    {/each}
{/each}
