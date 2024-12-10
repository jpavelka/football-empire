<script lang="ts">
    import BaseMap from './BaseMap.svelte';
    import { height, width, teamInfo, remainingTeams, allTeams, selectingTeams } from './stores';
    import TeamTerritory from './TeamTerritory.svelte';
    import MappedTeamIcon from './MappedTeamIcon.svelte';
    import { getInitialTerritories } from './utils';

    getInitialTerritories($allTeams);
    remainingTeams.update(() => {
        return $allTeams.map(t => t).sort((a, b) => {
            return $teamInfo[a].school > $teamInfo[b].school ? 1 : -1
        })
    });
    const imgSize = 25
    let select1Value;
    let select2Value;
    let team1Win;
    let team2Win;
    $: select2Disabled = [];
    const select1Change = () => {
        if (select1Value > 0) {
            if (select1Value === select2Value) {
                select2Value = -1
            }
            for (const tId of select2Disabled) {
                document.getElementById(`select2${tId}`).disabled = false
            }
            document.getElementById(`select2${select1Value}`).disabled = true
            select2Disabled = [select1Value]
        }
    }
    const checkChange = (t) => {
        const id = t + 'Win';
        const otherId = (t === 'team1' ? 'team2' : 'team1') + 'Win';
        if (document.getElementById(id).checked) {
            if (t === 'team1') {
                team1Win = true;
                team2Win = false;
            } else {
                team2Win = true;
                team1Win = false;
            }
            document.getElementById(otherId).checked = false;
        } else {
            if (t === 'team1') {
                team1Win = false;
            } else {
                team2Win = false;
            };
        }
    }
    const buttonClick = () => {
        const [winId, loseId] = (team1Win ? [select1Value, select2Value] : [select2Value, select1Value]);
        remainingTeams.update(teams => {
            return teams.filter(x => x !== loseId)
        })
        teamInfo.update(t => {
            t[winId].conquered = t[winId].conquered.concat(t[loseId].conquered)
            t[loseId].conquered = []
            return t
        })
        select1Value = -1;
        select2Value = -1;
        team1Win = false;
        team2Win = false;
    }
    const imgClick = (tId) => { 
        if ($remainingTeams.includes(tId)) {
            if (select1Value < 0) {
                select1Value = tId
                select1Change()
            } else if (select1Value === tId) {
                team1Win = true;
                team2Win = false;
            } else if (select2Value === tId) {
                team2Win = true;
                team1Win = false;
            } else if (select2Value < 0 && select1Value !== tId) {
                select2Value = tId
            }
        }
    }
</script>

<div style=text-align:center>
{#if $remainingTeams.length === 1}
    <div style=font-size:32pt;>Winner!</div>
    <img height=80 width=80 src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${$remainingTeams[0]}.png`} />
    <div style=font-size:16pt>{$teamInfo[$remainingTeams[0]].school} {$teamInfo[$remainingTeams[0]].mascot}</div>
{:else}
    <select id=team1Select bind:value={select1Value} onchange={select1Change}>
        <option value={-1}>--Attacking Team--</option>
        {#each $remainingTeams as tId}
            <option value={tId}>{$teamInfo[tId].school}</option>
        {/each}
    </select>
    <select id=team2Select bind:value={select2Value}>
        <option value={-1}>--Defending Team--</option>
        {#each $remainingTeams as tId}
            <option id={`select2${tId}`} value={tId}>{$teamInfo[tId].school}</option>
        {/each}
    </select>
    <div style=font-size:16pt>Select winner:</div>
    {#each [[select1Value, 'team1'], [select2Value, 'team2']] as [val, t]}
        {#if t === 'team1'}
            <input type=checkbox bind:checked={team1Win} id={`${t}Win`} disabled={!val} onchange={() => checkChange(t)}/>
        {/if}
        <label for={`${t}Win`}>
            <span style=display:inline-flex;flex-direction:column;align-items:center;min-width:100px>
            {#if val > 0}
                <img height=60 width=60 src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${val}.png`}/>
                <span style=height:1.5rem;>
                    {$teamInfo[val].school}
                    <button style='padding:0 2pt;margin-left:5px' onclick={() => {
                        const [v, c] = t === 'team1' ? [select1Value, team1Win] : [select2Value, team2Win]
                        if (t === 'team1') {
                            select1Value = -1;
                            setTimeout(() => {
                                team1Win = false;
                            }, 50)
                        } else {
                            select2Value = -1;
                            setTimeout(() => {
                                team2Win = false;
                            }, 50)
                        };
                    }}>x</button>
                </span>                
            {:else}
                <div style=width:100%;height:60px></div>
                <span style=height:1.5rem;><em>No selection</em></span>
            {/if}
            </span>
        </label>
        {#if t === 'team2'}
            <input type=checkbox bind:checked={team2Win} id={`${t}Win`} disabled={!val} onchange={() => checkChange(t)}/>
        {/if}
        {#if t === 'team1'}
            <span style=padding:20pt;font-size:20pt;>vs.</span>
        {/if}
    {/each}
    <div style=margin-top:0.5rem;>
        <button
            id=goButton
            disabled={!(team1Win || team2Win) || select1Value < 0 || select2Value < 0}
            onclick={buttonClick}
        >
            Update Map
        </button>
    </div>
{/if}

<svg height={$height} width={$width}>
    <BaseMap />
    {#key $remainingTeams}
        {#each $remainingTeams as tId}
            <TeamTerritory tId={tId} />
        {/each}
    {/key}
    {#each $allTeams as tId}
        {#if !$remainingTeams.includes(tId)}
            <MappedTeamIcon 
                tId={tId}
                imgSize={imgSize}
                opacity={0.15}
            />   
        {/if}
    {/each}
    {#each $remainingTeams as tId}
        <MappedTeamIcon 
            tId={tId}
            imgSize={imgSize}
            onclick={() => imgClick(tId)}
            ondblclick={() => {
                imgClick(tId)
                if (!document.getElementById('goButton').disabled) {
                    buttonClick()
                }
            }}
        /> 
    {/each}
</svg>
<div style=margin-top:1rem>
    <button onclick={() => selectingTeams.update(() => true)}>New Map</button>
</div>
</div>