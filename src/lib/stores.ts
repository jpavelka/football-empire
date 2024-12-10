import { writable, get } from "svelte/store";
import { geoAlbersUsa } from 'd3-geo';
import teamsRaw from '../data/teams.json';
import statesRaw from '../data/states.json';

export const width = writable(1000);
export const height = writable(550);

const projection = geoAlbersUsa()
    .scale(1.2 * get(width))
    .translate([get(width) / 2, get(height) / 2])

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
for (const t of teamsRaw) {
    [t.projectedX, t.projectedY] = projection([t.longitude, t.latitude]);
    t.originalTerritory = [];
    t.conquered = [];
    statesObj[t.state].teams.push(t.id);
}

const teamsObj = {}
for (const t of teamsRaw) {
    teamsObj[t.id] = t
}

export const teamInfo = writable(teamsObj)
export const stateInfo = writable(statesObj)
export const shapeInfo = writable(shapesObj)
export const remainingTeams = writable([])
export const selectingTeams = writable(true)
export const allTeams = writable([])