<script lang="ts">
    import { teamInfo } from "./stores";
    import { coordsToSvgPathD } from "./utils";

    export let tId;
    export let pulse = false;
    export let colorFadeIds = [];
    export let previousColor = '';
    export let svgEl = undefined;
    export let changeColor = false;
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
    let svgTime = !svgEl ? 0 : svgEl.getCurrentTime();
    let pulseFactor = 0;
    for (const cId in team.conquered) {
        for (const ter of Object.values($teamInfo[tId].originalTerritory)) {
            pulseFactor = Math.max(
                pulseFactor,
                Math.max(...ter.pathCoords.map(c=> Math.max(Math.abs(c[0] - 0.5), Math.abs(c[1] - 0.25))))
            )
        }
    }
    const svgScale = 1.03 * (1 + (0.04 - pulseFactor / 10));
</script>

{#each team.conquered as cId}
    {#each $teamInfo[cId].originalTerritory.entries() as [i, t]}
        {#each t.clips.entries() as [j, c]}
            <clipPath id={clipId(cId, i, j)} clip-path={clipId(cId, i, j - 1, true)}>
                <path d={coordsToSvgPathD(c)}/>
            </clipPath>
        {/each}
        {#key changeColor}
            <path
                tId={tId}
                id={`territory-${tId}-${i}`}
                style=transform-origin:center;
                d={coordsToSvgPathD(t.pathCoords)}
                fill={changeColor ? 'yellow' : team.color}
                opacity=0.5
                clip-path={clipId(cId, i, t.clips.length - 1, true)}
                on:mouseenter={() => {
                    changeColor = true;
                }}
                on:mouseleave={() => {
                    changeColor = false;
                }}
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
        {/key}
    {/each}
{/each}
