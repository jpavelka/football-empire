<script lang="ts">    
    import BaseMap from '$lib/BaseMap.svelte';
    import { teamInfo, selectingTeams, height, width, allTeams } from '$lib/stores';
    import MappedTeamIcon from '$lib/MappedTeamIcon.svelte';
  
    const conferences = [...new Set(Object.values($teamInfo).map(t => t.conference))].sort((a, b) => a > b ? 1 : -1);
    const sortedTeamsAndIds = Object.keys($teamInfo).map(tId => [tId, $teamInfo[tId].school]).sort((a, b) => {
      return a[1] > b[1] ? 1 : -1
    })
    let selectedConference;
    const inList = (tId) => {
      return ['All', $teamInfo[tId].conference].includes(selectedConference)
    }
    const changeSelected = (tId) => {
      const sel = document.getElementById(`select_${tId}`);
      if ($allTeams.includes(tId)) {
        allTeams.update(at => at.filter(x => x !== tId));
        sel.checked = false;
      } else {
        allTeams.update(at => {
          at.push(tId)
          return at
        })
        sel.checked = true;
      }
    }
    const multiSelect = (tf) => {
      for (const tId of Object.keys($teamInfo)) {
        const sel = document.getElementById(`select_${tId}`);
        if (inList(tId) && sel.checked !== tf) {
          changeSelected(tId);
        }
      }
    }
</script>


<div style=font-size:20pt;text-align:center;>Select Teams:</div>
<div style=text-align:center;font-size:16pt>
    Conference
    <select bind:value={selectedConference} style=margin-bottom:0.5rem>
        <option value='All'>All</option>
        {#each conferences as conf}
            <option value={conf}>{conf}</option>
        {/each}
    </select>
    <div style=margin-bottom:1rem>
      <button style=margin-right:10px onclick={() => multiSelect(true)}>Select All</button>
      <button onclick={() => multiSelect(false)}>Remove All</button>
    </div>
</div>
<div style='display:flex;flex-wrap:wrap;align-items:flex-start;height:10rem;overflow-y:scroll;margin-bottom:1rem;border:1pt solid grey;padding:1rem;font-size:14pt;max-width:{$width * 1.2}px;margin:auto'>
  {#each sortedTeamsAndIds as [tId, t]}
    {#if inList(tId)}
      <span style=width:11rem;text-align:left;margin-bottom:0.5rem;display:flex;align-items:flex-start>
        <input type=checkbox id={`select_${tId}`} checked={$allTeams.includes(tId)} onchange={() => changeSelected(tId)}>
        <img height=25 width=25 src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${tId}.png`}>
        <label for={`select_${tId}`}>{t}</label>
      </span>
    {/if}
  {/each}
</div>
<div style=text-align:center;margin-top:1rem;>
  <button disabled={$allTeams.length === 0} onclick={() => {
    selectingTeams.update(x => false)
  }}>Start</button>
</div>
<div style=text-align:center>
<svg height={$height} width={$width}>
  <BaseMap />
  {#each Object.keys($teamInfo) as tId}
    <MappedTeamIcon
      tId={tId}
      imgSize={25}
      onclick={() => {
        changeSelected(tId)
      }}
      opacity={$allTeams.includes(tId) ? 1 : 0.15}
    />
  {/each}
</svg>
</div>