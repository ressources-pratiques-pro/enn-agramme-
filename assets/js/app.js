document.addEventListener("DOMContentLoaded", () => {
  // --- Helpers ---
  const cx = 350, cy = 350, R = 270;
  const order = [9, 1, 2, 3, 4, 5, 6, 7, 8];

  const arrowsFallback = {
    integr: { 1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3 },
    disint: { 1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6 }
  };

  const groups = {
    instinctif: [8, 9, 1],
    emotionnel: [2, 3, 4],
    mental: [5, 6, 7]
  };

  function groupOf(t) {
    if (groups.instinctif.includes(t)) return "instinctif";
    if (groups.emotionnel.includes(t)) return "emotionnel";
    return "mental";
  }

  function polarPoint(index) {
    const angle = (-90 + index * (360 / 9)) * (Math.PI / 180);
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  // --- Robust "site root" for GitHub Pages (user pages or project pages) ---
  function getSiteRoot() {
    const parts = location.pathname.split("/").filter(Boolean);
    if (!parts.length) return "/";
    // If first segment looks like a file (index.html), it's user-pages root
    if (parts[0].includes(".")) return "/";
    // Otherwise assume project pages: /REPO/
    return `/${parts[0]}/`;
  }

  const SITE_ROOT = getSiteRoot();

  // --- Build enneagram points ---
  const points = {};
  order.forEach((t, i) => { points[t] = polarPoint(i); });

  const hexSeq = [1, 4, 2, 8, 5, 7, 1];
  const triSeq = [3, 6, 9, 3];

  function pathFromSeq(seq) {
    return seq
      .map((t, idx) => (idx === 0 ? "M" : "L") + points[t].x.toFixed(2) + " " + points[t].y.toFixed(2))
      .join(" ");
  }

  // --- Safe DOM getter (prevents JS crash if an id is missing) ---
  function byId(id) {
    return document.getElementById(id);
  }

  const hexPath = byId("hexPath");
  const triPath = byId("triPath");
  if (hexPath) hexPath.setAttribute("d", pathFromSeq(hexSeq));
  if (triPath) triPath.setAttribute("d", pathFromSeq(triSeq));

  const nodesLayer = byId("nodesLayer");
  const arrowsLayer = byId("arrowsLayer");

  const arrowEls = { integr: {}, disint: {} };

  function makeArrow(from, to, cls) {
    if (!arrowsLayer) return null;
    const p1 = points[from], p2 = points[to];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", p1.x);
    line.setAttribute("y1", p1.y);
    line.setAttribute("x2", p2.x);
    line.setAttribute("y2", p2.y);
    line.setAttribute("class", "arrow " + cls);

    if (cls === "integr") line.setAttribute("marker-end", "url(#arrowHeadGreen)");
    if (cls === "disint") line.setAttribute("marker-end", "url(#arrowHeadPink)");

    arrowsLayer.appendChild(line);
    return line;
  }

  for (const t of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    arrowEls.integr[t] = makeArrow(t, arrowsFallback.integr[t], "integr");
    arrowEls.disint[t] = makeArrow(t, arrowsFallback.disint[t], "disint");
  }

  function clearAllArrows() {
    document.querySelectorAll(".arrow").forEach(a => a.classList.remove("on"));
  }

  function showOnlyTypeArrows(t) {
    clearAllArrows();
    arrowEls.integr[t] && arrowEls.integr[t].classList.add("on");
    arrowEls.disint[t] && arrowEls.disint[t].classList.add("on");
  }

  function makeNode(t) {
    if (!nodesLayer) return;
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "node " + groupOf(t));

    const p = points[t];

    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", p.x);
    c.setAttribute("cy", p.y);
    c.setAttribute("r", 28);

    const tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tx.setAttribute("x", p.x);
    tx.setAttribute("y", p.y + 1);
    tx.textContent = t;

    g.appendChild(c);
    g.appendChild(tx);

    g.addEventListener("click", () => selectType(t));
    nodesLayer.appendChild(g);
  }

  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(makeNode);

  // --- UI elements ---
  const badgeNum = byId("badgeNum");
  const centerEl = byId("center");
  const fearEl = byId("fear");
  const desireEl = byId("desire");
  const compulsionEl = byId("compulsion");
  const toIntegr = byId("toIntegr");
  const toDisint = byId("toDisint");
  const moveHealthText = byId("moveHealthText");
  const moveStressText = byId("moveStressText");
  const openFull = byId("openFull");
  const btnReset = byId("btnReset");

  let typesData = null;

  async function loadData() {
    const url = new URL(SITE_ROOT + "assets/data/types.json", location.origin);
    const res = await fetch(url.toString(), { cache: "no-store" });
    typesData = await res.json();
  }
  loadData().catch(() => {});

  function setText(el, v) {
    if (!el) return;
    el.textContent = v;
  }

  function setOpenFull(t) {
    if (!openFull) return;
    openFull.setAttribute("href", SITE_ROOT + `profils/type${t}.html`);
    openFull.setAttribute("aria-disabled", "false");
  }

  function resetUI() {
    setText(badgeNum, "—");
    setText(centerEl, "—");
    setText(fearEl, "—");
    setText(desireEl, "—");
    setText(compulsionEl, "—");
    setText(toIntegr, "—");
    setText(toDisint, "—");
    setText(moveHealthText, "—");
    setText(moveStressText, "—");
    if (openFull) openFull.setAttribute("aria-disabled", "true");
    clearAllArrows();
  }

  // --- Public selector (kept for inline usage if needed) ---
  window.selectType = function selectType(t) {
    t = clamp(+t || 1, 1, 9);

    setText(badgeNum, String(t));

    const data = typesData ? typesData[String(t)] : null;
    const it = (data && data.integr) ? data.integr : arrowsFallback.integr[t];
    const dt = (data && data.disint) ? data.disint : arrowsFallback.disint[t];

    setText(centerEl, (data && data.center) ? data.center : "—");
    setText(fearEl, (data && data.fear) ? data.fear : "—");
    setText(desireEl, (data && data.desire) ? data.desire : "—");
    setText(compulsionEl, (data && data.compulsion) ? data.compulsion : "—");

    setText(toIntegr, String(it));
    setText(toDisint, String(dt));

    setText(moveHealthText, (data && data.integr_text) ? data.integr_text : "—");
    setText(moveStressText, (data && data.disint_text) ? data.disint_text : "—");

    setOpenFull(t);
    showOnlyTypeArrows(t);
  };

  if (btnReset) {
    btnReset.addEventListener("click", resetUI);
  }

  clearAllArrows();
  resetUI();
});
