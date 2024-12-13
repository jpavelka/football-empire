<script lang="ts">
    import { teamInfo } from "./stores";
    import { coordsToSvgPathD } from "./utils";

    export let tId;
    export let pulse = false;
    export let colorFadeIds = [];
    export let previousColor = '';
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
    const svgTime = !svgEl ? 0 : svgEl.getCurrentTime();
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
            tId={tId}
            id={`territory-${tId}-${i}`}
            style=transform-origin:center;
            d={coordsToSvgPathD(t.pathCoords)}
            fill={team.color}
            opacity=0.5
            clip-path={clipId(cId, i, t.clips.length - 1, true)}
        >
            {#if pulse}
                <animateTransform attributeName="transform" begin={svgTime} type="scale" dur="0.5s" from="1" to={svgScale} repeatCount="1"/>
                <animateTransform attributeName="transform" begin={svgTime + 0.5} type="scale" dur="0.5s" from={svgScale} to={svgScale} repeatCount="1"/>
                <animateTransform attributeName="transform" begin={svgTime + 1} type="scale" dur="1s" from={svgScale} to="1" repeatCount="1"/>
                {#if colorFadeIds.includes(cId)}
                    <animate
                        attributeName='fill'
                        begin={svgTime}
                        values={`${previousColor};${$teamInfo[tId].color}`}
                        dur='2s'
                        repeatCount=1
                    />
                {/if}
            {/if}
        </path>
    {/each}
{/each}
