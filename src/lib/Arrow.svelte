<script>
    import { allowArrow } from "./stores";

    export let coords;
    export let svgEl;
    export let animate;

    const vec = [coords[1][0] - coords[0][0], coords[1][1] - coords[0][1]];
    const vecLen = Math.sqrt(vec[0]**2 + vec[1]**2);
    const unitVec = [vec[0] / vecLen, vec[1] / vecLen];
    const angle = 360 * Math.acos(unitVec[0]) / (2 * Math.PI);
    const initLength = 20;
    const initCoords = [coords[0], [coords[0][0] + initLength * unitVec[0], coords[0][1] + initLength * unitVec[1]]]
    const svgTime = !svgEl ? 0 : svgEl.getCurrentTime();
    const arrowLen = 8
    const coordsMinusArrow = [coords[0], [coords[0][0] + unitVec[0] * (Math.max(0.1, vecLen - arrowLen)), coords[0][1] + unitVec[1] * (Math.max(0.1, vecLen - arrowLen))]];
</script>

{#if $allowArrow}
    <defs>
        <marker id='arrowHead' orient="auto"
            markerWidth='3' markerHeight='4'
            refX='0.1' refY='2'>
            <path d='M0,0 V4 L2,2 Z' fill='#222'/>
        </marker>
    </defs>
    {#if animate}
        <path
            id='arrow-line'
            marker-end='url(#arrowHead)'
            stroke-width='4'
            fill='none'
            stroke='#222'
            d={`M${initCoords[0].join(',')} L ${initCoords[1].join(',')}`}
        >
            <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from={`0 ${coords[0].join(',')}`}
                to={`1080 ${coords[0].join(',')}`}
                begin={svgTime + 0.1}
                dur="1s"
                repeatCount="1"
            />
            <animate
                attributeName="d"
                attributeType="XML"
                begin={svgTime + 1.25}
                dur={Math.sqrt(vecLen) / 40}
                to={`M${coordsMinusArrow[0].join(',')} L ${coordsMinusArrow[1].join(',')}`}
                fill="freeze"
            />
        </path>
    {:else}
        <path
            id='arrow-line'
            marker-end='url(#arrowHead)'
            stroke-width='4'
            fill='none'
            stroke='#222'
            d={`M${coordsMinusArrow[0].join(',')} L ${coordsMinusArrow[1].join(',')}`}
        />
    {/if}
{/if}