<script lang="ts">
    import { shapeInfo } from "./stores";
    import { coordsToSvgPathD } from "./utils";

    const allPaths = [
        Object.values($shapeInfo).map(s => coordsToSvgPathD(s.svgCoords))
    ]
</script>

{#each allPaths as d}
    <path
        d={d}
        fill=#ccc
        stroke=white
    />
{/each}