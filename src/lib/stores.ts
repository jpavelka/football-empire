import { writable, derived, get } from "svelte/store";
import { geoAlbersUsa } from 'd3-geo';
import ncaaRaw from '../data/ncaa.json';
import nflRaw from '../data/nfl.json';
import statesRaw from '../data/states.json';

export const width = writable(1000);
export const height = writable(550);
export const league = writable('NCAA');
export const teamsRaw = derived(league, $league => $league === 'NCAA' ? ncaaRaw : nflRaw);

export const updateWithProjection = () => {
    const projection = geoAlbersUsa()
        .scale(1.2)
        .translate([1 / 2, get(height) / (2 * get(width))])

    let statesObj = {};
    let shapesObj = {};
    for (const s of statesRaw) {
        const g = s.geometry
        const allCoordinates = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
        for (const [i, coords] of allCoordinates.entries()) {
            let llc = []
            let sc = []
            for (const c of coords) {
                for (const p of c) {
                    const proj = projection(p);
                    if (!!proj) {
                        llc.push(p);
                        sc.push(proj);
                    }
                }
            }
            if (llc.length > 0 && !['AK', 'PR'].includes(s.properties.abbrev)) {
                const shapeId = `${s.properties.abbrev}_${i}`
                const xBounds = [Math.min(...llc.map(x => projection(x)[0])), Math.max(...llc.map(x => projection(x)[0]))]
                const yBounds = [Math.min(...llc.map(x => projection(x)[1])), Math.max(...llc.map(x => projection(x)[1]))]
                const projTopLeft = [xBounds[0], yBounds[0]]
                const projBottomRight = [xBounds[1], yBounds[1]]
                if (!!projTopLeft && !!projBottomRight) {
                    shapesObj[shapeId] = {
                        latLongCoords: llc,
                        svgCoords: sc,
                        state: s.properties.abbrev,
                        xBounds: xBounds,
                        yBounds: yBounds,
                        projTopLeft: projTopLeft,
                        projBottomRight: projBottomRight,
                        id: shapeId
                    }
                }
            }
        }
        statesObj[s.properties.abbrev] = {
            teams: []
        }
    }

    let newTeamsStates = false;
    const tInfVals = [...Object.values(get(teamInfo))];
    if (tInfVals.length === 0) {
        newTeamsStates = true;
    } else if (tInfVals[0].league !== get(league)) {
        newTeamsStates = true;
    }
    if (newTeamsStates) {
        for (const t of get(teamsRaw)) {
            t.projectedX = -1;
            t.projectedY = -1;
            const proj = projection([t.longitude, t.latitude]);
            t.projectedX = proj[0];
            t.projectedY = proj[1];
            t.originalTerritory = [];
            t.conquered = [];
            statesObj[t.state].teams.push(t.id);
        }
    }

    const teamsObj = {}
    for (const t of get(teamsRaw)) {
        teamsObj[t.id] = t;
        teamsObj[t.id].league = get(league);
    }

    shapeInfo.set(shapesObj);
    if (newTeamsStates) {
        teamInfo.set(teamsObj);
        stateInfo.set(statesObj);
    }
}

export const teamInfo = writable({})
export const stateInfo = writable({})
export const shapeInfo = writable({})
export const remainingTeams = writable([])
export const selectingTeams = writable(true)
export const allTeams = writable([])
export const allowArrow = writable(false)
export const hoverId = writable('')