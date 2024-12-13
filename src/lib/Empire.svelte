<script lang="ts">
    import BaseMap from './BaseMap.svelte';
    import { height, width, teamInfo, remainingTeams, allTeams, selectingTeams } from './stores';
    import TeamTerritory from './TeamTerritory.svelte';
    import MappedTeamIcon from './MappedTeamIcon.svelte';
    import Arrow from './Arrow.svelte';
    import { getInitialTerritories } from './utils';

    getInitialTerritories($allTeams);
    remainingTeams.update(() => {
        return $allTeams.map(t => t)
    });
    let history = [];
    let historyInd = -1;
    const imgSize = 25;
    let select1Value;
    let select2Value;
    let team1Win;
    let team2Win;
    $: select2Disabled = [];
    let lastWinner = '';
    let logoClickable = true;
    const select1Change = () => {
        if (select1Value > 0) {
            if (select1Value === select2Value) {
                select2Value = -1
            }
            for (const tId of select2Disabled) {
                try {
                    document.getElementById(`select2${tId}`).disabled = false
                } catch {}
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
    let svgTime = -1;
    const svgTimeDiff = 2;
    const setLastWinner = (winner) => {
        lastWinner = winner;
        setTimeout(() => {
            lastWinner = ''
        }, 2000);
        if (svgEl.getCurrentTime() > svgTime + svgTimeDiff) {
            svgTime = svgEl.getCurrentTime();
        }
    }
    const buttonClick = () => {
        const [winId, loseId] = (team1Win ? [select1Value, select2Value] : [select2Value, select1Value]);
        if (historyInd !== history.length - 1) {
            history = history.slice(0, historyInd + 1);
        }
        history.push([select1Value, team1Win ? '>' : '<', select2Value, $teamInfo[loseId].conquered]);
        historyInd += 1;
        remainingTeams.update(teams => {
            return teams.filter(x => x !== loseId)
        })
        teamInfo.update(t => {
            t[winId].conquered = t[winId].conquered.concat(t[loseId].conquered)
            t[loseId].conquered = []
            return t
        })
        setLastWinner(winId);
        select1Value = -1;
        select2Value = -1;
        team1Win = false;
        team2Win = false;
        arrowCoords = [];
    }    
    const backClick = () => {
        const [t1, direction, t2, conquered] = history[historyInd];
        const [winner, loser] = direction === '>' ? [t1, t2] : [t2, t1];
        remainingTeams.update(teams => {
            return teams.concat(loser)
        })
        teamInfo.update(t => {
            t[loser].conquered = conquered;
            t[winner].conquered = t[winner].conquered.filter(x => !conquered.includes(x));
            return t
        })
        historyInd -= 1;
        lastWinner = '';
    }
    const forwardClick = () => {
        const [t1, direction, t2, conquered] = history[historyInd + 1];
        const [winner, loser] = direction === '>' ? [t1, t2] : [t2, t1];
        remainingTeams.update(teams => {
            return teams.filter(t => t !== loser);
        })
        teamInfo.update(t => {
            t[winner].conquered = t[winner].conquered.concat(conquered)
            t[loser].conquered = []
            return t
        })
        historyInd += 1;
        setLastWinner(winner);
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
    let svgEl;
    let arrowCoords = [];
    let animate = true;
</script>

<div style=text-align:center>
    <div style=height:145px>
        {#if $remainingTeams.length === 1}
            <div style=font-size:30pt;>Winner!</div>
            <img height=75 width=75 src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${$remainingTeams[0]}.png`} />
            <div style=font-size:16pt>{$teamInfo[$remainingTeams[0]].school} {$teamInfo[$remainingTeams[0]].mascot}</div>
        {:else}
            <select id=team1Select bind:value={select1Value} onchange={select1Change}>
                <option value={-1}>--Attacking Team--</option>
                {#each $remainingTeams.sort((a, b) => $teamInfo[a].school.localeCompare($teamInfo[b].school)) as tId}
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
            <div style=display:flex;justify-content:center;>
                {#each [[select1Value, 'team1'], [select2Value, 'team2']] as [val, t]}
                    {#if t === 'team1'}
                        <input type=checkbox bind:checked={team1Win} id={`${t}Win`} disabled={!val} onchange={() => checkChange(t)}/>
                    {/if}
                    <label for={`${t}Win`}>
                        <span style=display:inline-flex;flex-direction:column;align-items:center;min-width:160px;>
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
                            <span style=width:100%;height:60px;>
                                <button style='padding:0.5rem 0.6rem;' onclick={() => {
                                    let iterNum = 0;
                                    const randomTeam = () => {
                                        const availableTeams = $remainingTeams.filter(
                                            x => ![parseInt(select1Value), parseInt(select2Value)].includes(parseInt(x))
                                        )
                                        if (availableTeams.length === 0) {
                                            return
                                        }
                                        const randomId = availableTeams[Math.floor(Math.random() * availableTeams.length)];
                                        if (t === 'team1'){
                                            select1Value = randomId;
                                            select1Change();
                                            if ($remainingTeams.length === 2) {
                                                select2Value = $remainingTeams.filter(tId => tId !== select1Value)[0];
                                            }
                                        } else {
                                            select2Value = randomId;
                                            if ($remainingTeams.length === 2) {
                                                select1Value = $remainingTeams.filter(tId => tId !== select2Value)[0];
                                                select1Change();
                                            }
                                        }
                                        if (iterNum < (animate ? 13 : 0)) {
                                            iterNum += 1
                                            setTimeout(randomTeam, 50)
                                        }
                                    }
                                    randomTeam()
                                }}>?</button>
                                {#if t === 'team2'}
                                    <button style='padding:0.5rem 0.6rem;' disabled={select1Value < 0} onclick={() => {
                                        logoClickable = false;
                                        const angle = 2 * Math.PI * Math.random();
                                        let vec = [Math.cos(angle), Math.sin(angle)];
                                        const svgRect = svgEl.getBoundingClientRect();
                                        const teamX = $teamInfo[select1Value].projectedX;
                                        const teamY = $teamInfo[select1Value].projectedY;
                                        const maxMultX = vec[0] < 0 ? -teamX / vec[0] : ((svgRect.right - svgRect.left) - teamX) / vec[0];
                                        const maxMultY = vec[1] < 0 ? -teamY / vec[1] : ((svgRect.bottom - svgRect.top) - teamY) / vec[1];
                                        const stepSize = 2;
                                        let mult = stepSize;
                                        let checkPoint;
                                        setTimeout(() => {
                                            while(mult < Math.min(maxMultX, maxMultY)) {
                                                const multVec = [vec[0] * mult, vec[1] * mult];
                                                checkPoint = [
                                                    teamX + multVec[0],
                                                    teamY + multVec[1]
                                                ]
                                                const vecEndEl = document.elementFromPoint(svgRect.left + checkPoint[0], svgRect.top + checkPoint[1]);
                                                const possibleId = vecEndEl?.attributes.tId?.value
                                                if (!!possibleId && possibleId !== select1Value) {
                                                    select2Value = possibleId;
                                                    break
                                                }
                                                mult += stepSize;
                                            }
                                            arrowCoords = [[teamX, teamY], checkPoint];
                                            logoClickable = true;
                                        }, 100)
                                    }}>spin</button>
                                {/if}
                            </span>
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
            </div>
        {/if}
    </div>
    <div style=margin-top:0.5rem;>
        <button
            disabled={historyInd < 0}
            onclick={backClick}
        >{'<<'}</button>
        {#if $remainingTeams.length === 1}
            <button onclick={() => selectingTeams.update(() => true)}>New Game</button>
        {:else}
            <button
                id=goButton
                disabled={!(team1Win || team2Win) || select1Value < 0 || select2Value < 0}
                onclick={buttonClick}
            >
                Continue
            </button>
        {/if}
        <button
            disabled={historyInd + 1 === history.length}
            onclick={forwardClick}
        >{'>>'}</button>
    </div>

    <div style=height:40px;padding-top:0.25rem;display:flex;justify-content:center;font-size:12pt>
        {#if historyInd >= 0}
            <span style=align-content:center;padding-left:0.5rem;>Last: </span>
            <img
                style={`height:40px;width:40px;opacity:${history[historyInd][1] === '>' ? 1 : 0.2};padding:0 0.5rem;`}
                src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${history[historyInd][0]}.png`}
            >
            <span style=align-content:center>{history[historyInd][1]}</span>
            <img
            style={`height:40px;width:40px;opacity:${history[historyInd][1] === '<' ? 1 : 0.2};padding:0 0.5rem;`}
                src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${history[historyInd][2]}.png`}
            >
        {/if}
    </div>
    <svg bind:this={svgEl} height={$height} width={$width} style=margin-top:-2rem;>
        <BaseMap />
        {#key $remainingTeams}
            {#each $remainingTeams as tId}
                <TeamTerritory
                    tId={tId}
                    svgEl={svgEl}
                    pulse={animate && (lastWinner === tId && svgEl.getCurrentTime() < svgTime + 0.1)}
                    colorFadeIds={historyInd >= 0 ? history[historyInd][3] : []}
                    previousColor={historyInd >= 0 ? $teamInfo[history[historyInd][0] === tId ? history[historyInd][2] : history[historyInd][0]].color : ''}
                />
            {/each}
        {/key}
        {#each $allTeams as tId}
            {#if !$remainingTeams.includes(tId)}
                <MappedTeamIcon
                    tId={tId}
                    imgSize={imgSize}
                    opacity={0.15}
                    noClick={!logoClickable}
                />   
            {/if}
        {/each}
        {#each $remainingTeams as tId}
            <MappedTeamIcon 
                tId={tId}
                imgSize={imgSize}
                noClick={!logoClickable}
                onclick={() => imgClick(tId)}
                ondblclick={() => {
                    imgClick(tId)
                    if (!document.getElementById('goButton').disabled) {
                        buttonClick()
                    }
                }}
            />
        {/each}
        {#key arrowCoords}
            {#if arrowCoords.length === 2}
                <Arrow
                    coords={arrowCoords}
                    svgEl={svgEl}
                    animate={animate}
                />
            {/if}
        {/key}
    </svg>
    <div style=margin-top:1rem>
        <button onclick={() => selectingTeams.update(() => true)}>New Game</button>
    </div>
    <div style=margin-top:1rem;display:inline-flex;align-items:center;>
        <span style=font-size:14pt;padding-right:0.5rem;>Animations:</span>
        <label class="switch">
            <input type="checkbox" bind:checked={animate}>
            <span class="slider round"></span>
        </label>
    </div>
</div>

<style>
    /* The switch - the box around the slider */
    .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>