import { build, files, prerendered, version } from '$service-worker'
import { getImgUrl } from '$lib/utils'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import ncaaRaw from './data/ncaa.json'
import nflRaw from './data/nfl.json'

let imgUrls = []
const leagueData = { nfl: nflRaw, ncaa: ncaaRaw }
for (const x of ['nfl', 'ncaa']) {
	for (const team of leagueData[x]) {
		imgUrls.push({
			url: getImgUrl(team.id, x.toUpperCase()),
			revision: null
		})
	}
}
// Do not precache external team logo images; handle them with a runtime
// stale-while-revalidate strategy so the app shows cached images immediately
// and updates them in the background.
const precache_list = [...build, ...files, ...prerendered].filter(
	s => s.split('/').reverse()[0] !== '.nojekyll'
).map((s) => ({
	url: s,
	revision: version,
}))

cleanupOutdatedCaches()
precacheAndRoute(precache_list)

// Runtime SWR caching for team logo images
const imgUrlSet = new Set(imgUrls.map(i => i.url))
registerRoute(
	({ url }) => imgUrlSet.has(url.href),
	new StaleWhileRevalidate({
		cacheName: 'team-logo-images',
	})
)