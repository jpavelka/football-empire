<script lang="ts">
    import { teamInfo } from './stores';
    import { mapScale, getImgUrl } from './utils';

    export let tId;
    export let imgSize;
    export let imgId = undefined;
    export let opacity = 1;
    export let onclick = undefined;
    export let ondblclick = undefined;
    export let noClick = false;
</script>

<image
    style={noClick ? 'pointer-events:none' : ''}
    id={imgId}
    x={mapScale($teamInfo[tId].projectedX) - imgSize / 2}
    y={mapScale($teamInfo[tId].projectedY) - imgSize / 2}
    width={imgSize}
    height={imgSize}
    href={getImgUrl(tId)}
    opacity={opacity}
    onclick={onclick}
    ondblclick={ondblclick}
/>