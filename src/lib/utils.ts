import { get } from "svelte/store"
import { teamInfo, stateInfo, shapeInfo } from "./stores"


export const coordsToSvgPathD = (coords) => {
    return 'M' + coords.map(p => p.join(',')).join('L')
}

const intersectLineWithBoundingBox = (
    x1, y1, m, xBounds, yBounds
) => {
    const y_xmax = m * xBounds[1] - m * x1 + y1
    const y_xmin = m * xBounds[0] - m * x1 + y1
    const x_ymax = (yBounds[1] - y1 + m * x1) / m
    const x_ymin = (yBounds[0] - y1 + m * x1) / m
    const intersections = [
        [xBounds[0], y_xmin],
        [xBounds[1], y_xmax],
        [x_ymin, yBounds[0]],
        [x_ymax, yBounds[1]]
    ]
    const tol = 1 / 10 ** 6
    const feasibleIntersections = intersections.filter(
        i => xBounds[0] - tol <= i[0] && i[0] <= xBounds[1] + tol && yBounds[0] - tol <= i[1] && i[1] <= yBounds[1] + tol
    )
    return feasibleIntersections
}

const pointGreatLessEqLine = (
    point, m, x1, y1
) => {
    const lhs = m * (point[0] - x1) + y1
    return (lhs < point[1] ? 1 : lhs > point[1] ? -1 : 0)
}

export const getInitialTerritories = (allTeams) => {
    for (const tId of allTeams) {
        teamInfo.update(ts => {
            ts[tId].originalTerritory = []
            ts[tId].conquered = [tId]
            return ts
        })
    }
    for (const shInf of Object.values(get(shapeInfo))) {
        const teams = get(stateInfo)[shInf.state].teams.filter(tId => allTeams.includes(`${tId}`))
        if (teams.length === 1) {
            teamInfo.update(ts => {
                const t = ts[teams[0]]
                t.originalTerritory.push({
                    pathCoords: shInf.svgCoords,
                    clips: []
                })
                return ts
            })
            continue
        }
        const clips = {}
        for (const tId of teams) {
            clips[tId] = []
        }
        for (const tId1 of teams) {
            for (const tId2 of teams) {
                if (tId1 === tId2) {
                    continue
                }
                const t1 = get(teamInfo)[tId1];
                const t2 = get(teamInfo)[tId2];
                const midpoint = [
                    (t1.projectedX + t2.projectedX) / 2,
                    (t1.projectedY + t2.projectedY) / 2
                ]
                const m = -(t1.projectedX - t2.projectedX) / (t1.projectedY - t2.projectedY)
                const intersections = intersectLineWithBoundingBox(midpoint[0], midpoint[1], m, shInf.xBounds, shInf.yBounds)
                const bbCorners = [
                    [shInf.xBounds[0], shInf.yBounds[0]],
                    [shInf.xBounds[0], shInf.yBounds[1]],
                    [shInf.xBounds[1], shInf.yBounds[1]],
                    [shInf.xBounds[1], shInf.yBounds[0]]
                ]
                const bbRel = bbCorners.map(x => pointGreatLessEqLine(x, m, midpoint[0], midpoint[1]))
                if (intersections.length > 0) {
                    for (const t of [t1, t2]) {
                        const teamSide = pointGreatLessEqLine([t.projectedX, t.projectedY], m, midpoint[0], midpoint[1]);
                        let corners = []
                        for (const i in bbRel) {
                            if (bbRel[i] === teamSide) {
                                corners.push(i)
                            }
                        }
                        const addIntersectionPoints = (tCoords, intersections) => {
                            const lastCoord = tCoords[tCoords.length - 1]
                            if (lastCoord[0] === intersections[0][0] || lastCoord[1] === intersections[0][1]) {
                                return tCoords.concat(intersections);
                            } else {
                                return tCoords.concat(
                                    [intersections[1], intersections[0]]
                                )
                            }                        
                        }
                        let tCoords = [];
                        let lastC = '';
                        for (const c of corners) {
                            if (tCoords.length === 0) {
                                tCoords.push(bbCorners[c]);
                                lastC = c;
                            } else if (parseInt(c) === (parseInt(lastC) + 1) % bbCorners.length) {
                                tCoords.push(bbCorners[c]);
                                lastC = c;
                            } else {
                                tCoords = addIntersectionPoints(tCoords, intersections)
                                tCoords.push(bbCorners[c]);
                                lastC = c;
                            }
                        }
                        if (tCoords.length === corners.length && corners.length > 0) {
                            tCoords = addIntersectionPoints(tCoords, intersections)
                        }
                        clips[t.id].push(tCoords)
                    }
                } else {
                    for (const t of [t1, t2]) {
                        const teamSide = pointGreatLessEqLine([t.projectedX, t.projectedY], m, midpoint[0], midpoint[1]);
                        let corners = []
                        for (const i in bbRel) {
                            if (bbRel[i] !== teamSide) {
                                corners.push(i)
                            }
                        }
                        if (corners.length === 4) {
                            clips[t.id].push(bbCorners)
                        }
                    }
                }
            }
        }
        teamInfo.update(ts => {
            for (const tId of teams) {
                const t = ts[tId]
                t.originalTerritory.push({
                    pathCoords: shInf.svgCoords,
                    clips: clips[t.id]
                })
            }
            return ts
        })
    }
}