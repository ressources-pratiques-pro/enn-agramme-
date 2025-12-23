document.addEventListener("DOMContentLoaded", () => {
  const cx = 350, cy = 350, R = 270;
  const order = [9, 1, 2, 3, 4, 5, 6, 7, 8];

  const arrowsFallback = {
    integr: { 1:7, 2:4, 3:6, 4:1, 5:8, 6:9, 7:5, 8:2, 9:3 },
    disint: { 1:4, 2:8, 3:9, 4:2, 5:7, 6:3, 7:1, 8:5, 9:6 }
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

  const points = {};
  order.forEach((t, i) => { points[t] = polarPoint(i); });

  const hexSeq = [1, 4, 2, 8, 5, 7, 1];
  const triSeq = [3, 6, 9, 3];

  function pathFromSeq(seq) {
    return seq
      .map((t, idx) => (idx === 0 ? "M" : "L") + points[t].x.toFixed(2) + " " + points[t].y.toFixed(2))
      .join(" ");
  }

  const hexPath = document.getElementById("hexPath");
  const triPath = document.getElementById("triPath");
  if (hexPath) hexPath.setAttribute("d", pathFromSeq(hexSeq));
  if (triPath) triPath.setAttribute("d", pathFromSeq(triSeq));

  const nodesLayer = document.getElementById("nodesLayer");
  const arrowsLayer = document.getElementById("arrowsLayer");

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
    arrowEls.integr[t]?.classList.add("on");
    arrowEls.disint[t]?.classList.add("on");
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

    g.addEventListener("click", () => window.selectType?.(t));
    nodesLayer.appendChild(g);
  }

  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(makeNode);

  const badgeNum = document.getElementById("badgeNum");
  const centerEl = document.getElementById("center");
  const fearEl = document.getElementById("fear");
  const desireEl = document.getElementById("desire");
  const compulsionEl = document.getElementById("compulsion");
  const toIntegr = document.getElementById("toIntegr");
  const toDisint = document.getElementById("toDisint");
  const moveHealthText = document.getElementById("moveHealthText");
  const moveStressText = document.getElementById("moveStressText");
  const openFull = document.getElementById("openFull");
  const btnReset = document.getElementById("btnReset");

  let typesData = null;

  const dataURL = new URL("assets/data/types.json", document.baseURI).href;
  const profileURL = (t) => new URL(`profils/type${t}.html`, document.baseURI).href;

  async function loadData() {
    try {
      const res = await fetch(dataURL, { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      typesData = await res.json();
    } catch (e) {
      typesData = null;
    }
  }
  loadData();

  window.selectType = function selectType(t) {
    if (badgeNum) badgeNum.textContent = t;

    const data = typesData ? typesData[String(t)] : null;

    const it = data?.integr ?? arrowsFallback.integr[t];
    const dt = data?.disint ?? arrowsFallback.disint[t];

    if (centerEl) centerEl.textContent = data?.center ?? "—";
    if (fearEl) fearEl.textContent = data?.fear ?? "—";
    if (desireEl) desireEl.textContent = data?.desire ?? "—";
    if (compulsionEl) compulsionEl.textContent = data?.compulsion ?? "—";

    if (toIntegr) toIntegr.textContent = it ?? "—";
    if (toDisint) toDisint.textContent = dt ?? "—";

    if (moveHealthText) moveHealthText.textContent = data?.integr_text ?? "—";
    if (moveStressText) moveStressText.textContent = data?.disint_text ?? "—";

    if (openFull) {
      openFull.setAttribute("href", profileURL(t));
      openFull.setAttribute("aria-disabled", "false");
    }

    showOnlyTypeArrows(t);
  };

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      if (badgeNum) badgeNum.textContent = "—";
      if (centerEl) centerEl.textContent = "—";
      if (fearEl) fearEl.textContent = "—";
      if (desireEl) desireEl.textContent = "—";
      if (compulsionEl) compulsionEl.textContent = "—";
      if (toIntegr) toIntegr.textContent = "—";
      if (toDisint) toDisint.textContent = "—";
      if (moveHealthText) moveHealthText.textContent = "—";
      if (moveStressText) moveStressText.textContent = "—";
      if (openFull) openFull.setAttribute("aria-disabled", "true");
      clearAllArrows();
    });
  }

  clearAllArrows();
});
