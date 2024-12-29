<script lang="ts">
    import BaseMap from './BaseMap.svelte';
    import { height, width, teamInfo, remainingTeams, allTeams, selectingTeams, allowArrow } from './stores';
    import TeamTerritory from './TeamTerritory.svelte';
    import MappedTeamIcon from './MappedTeamIcon.svelte';
    import Arrow from './Arrow.svelte';
    import { getInitialTerritories, mapScale, getImgUrl } from './utils';

    getInitialTerritories($allTeams);
    remainingTeams.update(() => {
        return $allTeams.map(t => t)
    });
    let history = [];
    let historyInd = -1;
    const imgSize = 25;
    let selectValues = {team1: -1, team2: -1};
    let win = {team1: false, team2: false};
    let lastWinner = '';
    let logoClickable = true;
    const selectChange = (t) => {
        const otherT = t === 'team1' ? 'team2' : 'team1'
        if (selectValues[t] > 0) {
            if (selectValues[t] === selectValues[otherT]) {
                selectValues[otherT] = -1
            }
        }
        arrowCoords = [];
    }
    const checkChange = (t) => {
        const id = t + 'Win';
        const otherT = t === 'team1' ? 'team2' : 'team1'
        const otherId = otherT + 'Win';
        if (document.getElementById(id).checked) {
            win[t] = true;
            win[otherT] = false;
        } else {
            win[t] = false;
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
        const [winId, loseId] = (win.team1 ? [selectValues.team1, selectValues.team2] : [selectValues.team2, selectValues.team1]);
        if (historyInd !== history.length - 1) {
            history = history.slice(0, historyInd + 1);
        }
        history.push([selectValues.team1, win.team1 ? '>' : '<', selectValues.team2, $teamInfo[loseId].conquered]);
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
        selectValues.team1 = -1;
        selectValues.team2 = -1;
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
        selectValues.team1 = t1;
        selectChange('team1');
        selectValues.team2 = t2;
        selectChange('team2');
        if (direction === '>') {
            win.team1 = true;
            win.team2 = false;
        } else {
            win.team1 = false;
            win.team2 = true;
        }
        historyInd -= 1;
        lastWinner = '';
        arrowCoords = [];
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
        setLastWinner(winner);
        arrowCoords = [];
        historyInd += 1;
        if (historyInd < history.length - 1) {
            const [t1, direction, t2, conquered] = history[historyInd + 1];
            selectValues.team1 = t1;
            selectChange('team1');
            selectValues.team2 = t2;
            selectChange('team2');
            if (direction === '>') {
                win.team1 = true;
                win.team2 = false;
            } else {
                win.team1 = false;
                win.team2 = true;
            }
        } else {
            selectValues.team1 = -1;
            selectValues.team2 = -1;
            win.team1 = false;
            win.team2 = false;
        }
    }
    const imgClick = (tId) => { 
        if ($remainingTeams.includes(tId)) {
            if (selectValues.team1 < 0) {
                selectValues.team1 = tId
                selectChange('team1')
            } else if (selectValues.team1 === tId) {
                win.team1 = true;
                win.team2 = false;
            } else if (selectValues.team2 === tId) {
                win.team2 = true;
                win.team1 = false;
            } else if (selectValues.team2 < 0 && selectValues.team1 !== tId) {
                selectValues.team2 = tId
                selectChange('team2')
            }
        }
    }
    let svgEl;
    let animate = true;
    $: arrowCoords = [];
</script>

<div style=text-align:center>
    <div style=height:130px;>
        {#if $remainingTeams.length === 1}
        <div style=font-size:20pt;font-weight:bold;>Winner!</div>
            <img height=65 width=65 src={getImgUrl($remainingTeams[0])} />
            <div style=font-size:16pt>{$teamInfo[$remainingTeams[0]].school} {$teamInfo[$remainingTeams[0]].mascot}</div>
        {:else}
            <div style=font-size:16pt>Select {Math.min(...Object.values(selectValues)) > 0 ? 'Winner' : 'Matchup'}
                {#if Math.min(...Object.values(selectValues)) === -1}
                    <span style=font-size:12pt>({$remainingTeams.length} teams remain)</span>
                {/if}
            </div>
            <div style=display:flex;justify-content:center;>
                {#each ['team1', 'team2'] as t}
                    {@const otherT = t === 'team1' ? 'team2' : 'team1'}
                    <input type=checkbox style=display:none bind:checked={win[t]} id={`${t}Win`} disabled={selectValues[t] < 0} onchange={() => checkChange(t)}/>
                    <label for={`${t}Win`}>
                        <span style=display:inline-flex;flex-direction:column;align-items:center;min-width:160px;>
                        {#if selectValues[t] > 0}
                            <span style=display:flex;}>
                                <img  style={`${win[t] ? 'border: 3pt solid #dd0;border-radius: 10pt;' : 'margin:3pt'}`} height=60 width=60 src={getImgUrl(selectValues[t])}/>
                                <button style='padding:0 2pt;margin-left:5px;height:1rem;' onclick={() => {
                                    selectValues[t] = -1;
                                    arrowCoords = [];
                                    setTimeout(() => {
                                        win[t] = false;
                                    }, 50)
                                }}>x</button>
                            </span>
                        {:else}
                            <span style=width:100%;height:60px;margin:3pt;>
                                <button style='padding:1rem 0.4rem;' onclick={() => {
                                    let iterNum = 0;
                                    const randomTeam = () => {
                                        const availableTeams = $remainingTeams.filter(
                                            x => ![parseInt(selectValues.team1), parseInt(selectValues.team2)].includes(parseInt(x))
                                        )
                                        if (availableTeams.length === 0) {
                                            return
                                        }
                                        const randomId = availableTeams[Math.floor(Math.random() * availableTeams.length)];
                                        selectValues[t] = randomId;
                                        selectChange(t);
                                        if ($remainingTeams.length === 2) {
                                            selectValues[otherT] = $remainingTeams.filter(tId => tId !== selectValues[t])[0];
                                            selectChange(otherT);
                                        }
                                        if (iterNum < (animate ? 13 : 0)) {
                                            iterNum += 1
                                            setTimeout(randomTeam, 50)
                                        }
                                    }
                                    randomTeam()
                                }}>Random</button>
                                {#if selectValues[otherT] > 0}
                                    <button style='padding:1rem 0.4rem;' onclick={() => {
                                        logoClickable = false;
                                        arrowCoords = [];
                                        allowArrow.set(true);
                                        const svgRect = svgEl.getBoundingClientRect();
                                        const teamX = mapScale($teamInfo[selectValues[otherT]].projectedX);
                                        const teamY = mapScale($teamInfo[selectValues[otherT]].projectedY);
                                        const stepSize = 2;
                                        setTimeout(() => {
                                            let it = 0;
                                            const maxIts = 5;
                                            let checkPoint;
                                            while (selectValues[t] < 0 && it < maxIts) {
                                                const angle = 2 * Math.PI * Math.random();
                                                let vec = [Math.cos(angle), Math.sin(angle)];
                                                const maxMultX = vec[0] < 0 ? -teamX / vec[0] : ((svgRect.right - svgRect.left) - teamX) / vec[0];
                                                const maxMultY = vec[1] < 0 ? -teamY / vec[1] : ((svgRect.bottom - svgRect.top) - teamY) / vec[1];
                                                let mult = stepSize;
                                                while(mult < Math.min(maxMultX, maxMultY)) {
                                                    const multVec = [vec[0] * mult, vec[1] * mult];
                                                    checkPoint = [
                                                        teamX + multVec[0],
                                                        teamY + multVec[1]
                                                    ]
                                                    const vecEndEl = document.elementFromPoint(svgRect.left + checkPoint[0], svgRect.top + checkPoint[1]);
                                                    const possibleId = vecEndEl?.attributes.tId?.value
                                                    if (!!possibleId && possibleId !== selectValues[otherT]) {
                                                        selectValues[t] = possibleId;
                                                        selectChange(t);
                                                        break
                                                    }
                                                    mult += stepSize;
                                                }
                                                it += 1;
                                            }
                                            arrowCoords = [[teamX, teamY], checkPoint];
                                            logoClickable = true;
                                        }, 100)
                                    }}>Spin</button>
                                {/if}
                            </span>
                        {/if}
                        <select style=margin-top:0.25rem; id={`${t}Select`} bind:value={selectValues[t]} onchange={() => selectChange(t)}>
                            <option value={-1}>No selection</option>
                            {#each $remainingTeams.sort((a, b) => $teamInfo[a].school.localeCompare($teamInfo[b].school)) as tId}
                                <option id={`select${t.replace('team', '')}${tId}`} value={tId}>{$teamInfo[tId].school}</option>
                            {/each}
                        </select>
                        </span>
                    </label>
                    {#if t === 'team1'}
                        <span style=padding:20pt;font-size:20pt;>vs.</span>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
    <div style=margin-top:0.25rem;>
        <button
            disabled={historyInd < 0}
            onclick={backClick}
        >{'<<'}</button>
        {#if $remainingTeams.length === 1}
            <button onclick={() => selectingTeams.update(() => true)}>New Game</button>
        {:else}
            <button
                id=goButton
                disabled={!(win.team1 || win.team2) || selectValues.team1 < 0 || selectValues.team2 < 0}
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
                src={getImgUrl(history[historyInd][0])}
            >
            <span style=align-content:center>{history[historyInd][1]}</span>
            <img
                style={`height:40px;width:40px;opacity:${history[historyInd][1] === '<' ? 1 : 0.2};padding:0 0.5rem;`}
                src={getImgUrl(history[historyInd][2])}
            >
        {/if}
    </div>
    <svg bind:this={svgEl} height={$height} width={$width} style={`margin-top:-${1 + ((Math.max(500, Math.min(750, $width)) - 500) / 250)}rem;`}>
        {#key $width}
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