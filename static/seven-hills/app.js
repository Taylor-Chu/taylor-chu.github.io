/* Seven Hills spectator page */
const $ = id => document.getElementById(id);
// API base: same origin normally; the github.io copy sets window.TRACKER_API
// to the current tunnel URL (resolved from backend.json). Read at call time
// so the page recovers when the URL arrives late or changes mid-race.
const apiUrl = p => (window.TRACKER_API || "") + p;

const map = L.map("map", { zoomControl: true }).setView([55.936, -3.205], 12);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19, attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let routeLine = null, doneLine = null, trailLine = null, runnerMarker = null;
let hillMarkers = {};
let routeCoords = [];   // [[lat,lon],...]
let routeCum = [];      // cumulative metres, parallel to routeCoords

function havM(a, b) {
  const R = 6371000, toR = Math.PI / 180;
  const dLat = (b[0] - a[0]) * toR, dLon = (b[1] - a[1]) * toR;
  const s = Math.sin(dLat / 2) ** 2 +
    Math.cos(a[0] * toR) * Math.cos(b[0] * toR) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

async function loadRoute() {
  try {
    const r = await (await fetch(apiUrl("/api/route"))).json();
    if (!r.loaded) return setTimeout(loadRoute, 5000);
    routeCoords = r.coords.map(c => [c[1], c[0]]); // geojson lon,lat -> lat,lon
    routeCum = [0];
    for (let i = 1; i < routeCoords.length; i++)
      routeCum.push(routeCum[i - 1] + havM(routeCoords[i - 1], routeCoords[i]));
    routeLine = L.polyline(routeCoords, { color: "#38bdf8", weight: 4, opacity: .8 }).addTo(map);
    doneLine = L.polyline([], { color: "#4ade80", weight: 5, opacity: .95 }).addTo(map);
    map.fitBounds(routeLine.getBounds(), { padding: [24, 24] });
    r.hills.forEach((h, i) => {
      const icon = L.divIcon({ className: "", html: `<div class="hill-icon" id="hm${i}">${i + 1}</div>`, iconSize: [22, 22], iconAnchor: [11, 11] });
      hillMarkers[h.name] = L.marker([h.lat, h.lon], { icon }).addTo(map).bindPopup(`${i + 1}. ${h.name}`);
    });
  } catch (e) { setTimeout(loadRoute, 5000); }
}

function coveredSlice(distM) {
  // route coordinates up to distM along the line
  if (!routeCoords.length || distM <= 0) return [];
  const out = [];
  for (let i = 0; i < routeCoords.length; i++) {
    if (routeCum[i] > distM) break;
    out.push(routeCoords[i]);
  }
  return out;
}

const fmtPace = s => s ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}/km` : "–";
const fmtDur = s => {
  if (s == null) return "–";
  s = Math.max(0, Math.round(s));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}` : `${m}:${String(ss).padStart(2, "0")}`;
};
const fmtClock = t => new Date(t * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

async function poll() {
  try {
    const s = await (await fetch(apiUrl("/api/state"))).json();
    render(s);
  } catch (e) { /* transient */ }
  setTimeout(poll, 5000);
}

function render(s) {
  $("runnerName").textContent = s.runner_name || "";

  // live badge
  const badge = $("liveBadge");
  if (s.position && s.position_age_s != null) {
    if (s.position_age_s < 90) { badge.textContent = "LIVE"; badge.className = "badge live"; }
    else { badge.textContent = `LAST FIX ${fmtDur(s.position_age_s)} AGO`; badge.className = "badge stale"; }
  } else { badge.textContent = "WAITING FOR GPS"; badge.className = "badge stale"; }

  // banners
  $("offRouteBanner").classList.toggle("hidden", !(s.progress && s.progress.off_route && !s.finished));
  if (s.progress) $("offRouteDist").textContent = `${Math.round(s.progress.off_route_dist_m)} m`;
  $("finishBanner").classList.toggle("hidden", !s.finished);
  if (s.finished) $("finishBanner").textContent = `🏁 FINISHED — ${fmtDur(s.elapsed_s)}`;

  // stats
  $("stHills").textContent = `${s.hills_done}/${s.hills.length}`;
  const p = s.progress || {};
  $("stDist").textContent = p.total_m ? `${(p.dist_m / 1000).toFixed(1)} / ${(p.total_m / 1000).toFixed(1)} km` : "–";
  $("stPct").textContent = p.total_m ? `${p.pct}%` : "–";

  // bottom route progress bar with runner
  const pct = Math.min(100, p.pct || 0);
  $("rpFill").style.width = `${pct}%`;
  const runner = $("rpRunner");
  runner.style.left = `${pct}%`;
  if (p.total_m) $("rpTotal").textContent = `${(p.total_m / 1000).toFixed(1)} km`;
  // legs animate while fixes are fresh and the race is on; freeze when stale/finished
  const moving = !s.finished && s.elapsed_s != null &&
    s.position_age_s != null && s.position_age_s < 90;
  runner.classList.toggle("running", moving);
  runner.classList.toggle("finished", !!s.finished);
  $("stElapsed").textContent = s.elapsed_s != null ? fmtDur(s.elapsed_s) :
    (s.start_mode === "auto"
      ? (s.scheduled_epoch ? `starts ~${fmtClock(s.scheduled_epoch)}` : "waiting")
      : (s.start_epoch ? `starts ${fmtClock(s.start_epoch)}` : "–"));
  $("stPace").textContent = fmtPace(s.pace && s.pace.cur_s_per_km);
  $("stAvgPace").textContent = fmtPace(s.pace && s.pace.avg_s_per_km);
  $("stEta").textContent = (s.pace && s.pace.eta_remaining_s && !s.finished)
    ? fmtClock(s.now + s.pace.eta_remaining_s) : (s.finished ? "done" : "–");

  // hills row
  const row = $("hillsRow");
  row.innerHTML = "";
  let nextFound = false;
  s.hills.forEach((h, i) => {
    const div = document.createElement("div");
    let cls = "hill";
    if (h.visited) cls += " done";
    else if (!nextFound) { cls += " next"; nextFound = true; }
    div.className = cls;
    div.innerHTML = `<span class="num">${h.visited ? "✓" : i + 1}</span>${h.name}` +
      (h.visited_at ? `<span class="t">${fmtClock(h.visited_at)}</span>` : "");
    row.appendChild(div);
    const hm = document.getElementById(`hm${i}`);
    if (hm) hm.classList.toggle("done", !!h.visited);
  });

  // map
  if (s.position) {
    const ll = [s.position.lat, s.position.lon];
    if (!runnerMarker) {
      const icon = L.divIcon({
        className: "", iconSize: [16, 16], iconAnchor: [8, 8],
        html: `<div class="runner-icon"><div class="pulse"></div><div class="dot"></div></div>`,
      });
      runnerMarker = L.marker(ll, { icon, zIndexOffset: 1000 }).addTo(map);
    } else runnerMarker.setLatLng(ll);
    if ($("followChk").checked) map.panTo(ll);
    $("fixInfo").textContent =
      `${ll[0].toFixed(5)}, ${ll[1].toFixed(5)} · ±${Math.round(s.position.acc || 0)}m · via ${s.position.src}`;
  }
  if (s.trail && s.trail.length > 1) {
    if (!trailLine) trailLine = L.polyline(s.trail, { color: "#f472b6", weight: 2, opacity: .7, dashArray: "4 5" }).addTo(map);
    else trailLine.setLatLngs(s.trail);
  }
  if (doneLine && p.dist_m) doneLine.setLatLngs(coveredSlice(p.dist_m));
}

loadRoute();
poll();
