<script lang="ts">
    import { teamInfo } from './stores';

    export let tId
    export let imgSize
    export let imgId = undefined
    export let opacity = 1
    export let onclick = undefined
    export let ondblclick = undefined
</script>

<image
    id={imgId}
    x={$teamInfo[tId].projectedX - imgSize / 2}
    y={$teamInfo[tId].projectedY - imgSize / 2}
    width={imgSize}
    height={imgSize}
    href={`https://a.espncdn.com/i/teamlogos/ncaa/500/${tId}.png`}
    opacity={opacity}
    onclick={onclick}
    ondblclick={ondblclick}
/>   