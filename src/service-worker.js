import { build, files, prerendered, version } from '$service-worker'
import { getImgUrl } from '$lib/utils'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import ncaaRaw from './data/ncaa.json'
import nflRaw from './data/nfl.json'

let imgUrls = []
const leagueData = { nfl: nflRaw, ncaa: ncaaRaw }
for (const x of ['nfl', 'ncaa']) {
	for (const team of leagueData[x]) {
		imgUrls.push(getImgUrl(team.id, x.toUpperCase()))
	}
}
const precache_list = [...build, ...files, ...prerendered].filter(
	s => s.split('/').reverse()[0] !== '.nojekyll'
).map((s) => ({
	url: s,
	revision: version,
}))

precacheAndRoute(precache_list)