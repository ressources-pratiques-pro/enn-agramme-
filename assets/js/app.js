const cx = 350, cy = 350, R = 270;
const order = [9,1,2,3,4,5,6,7,8];

const arrowsFallback = {
  integr: { 1:7, 2:4, 3:6, 4:1, 5:8, 6:9, 7:5, 8:2, 9:3 },
  disint: { 1:4, 2:8, 3:9, 4:2, 5:7, 6:3, 7:1, 8:5, 9:6 }
};

const groups = {
  instinctif: [8,9,1],
  emotionnel: [2,3,4],
  mental: [5,6,7]
};

function groupOf(t){
  if (groups.instinctif.includes(t)) return "instinctif";
  if (groups.emotionnel.includes(t)) return "emotionnel";
  return "mental";
}

function polarPoint(index){
  const angle = (-90 + index * (360/9)) * (Math.PI/180);
  return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
}

const points = {};
order.forEach((t,i)=>{ points[t] = polarPoint(i); });

const hexSeq = [1,4,2,8,5,7,1];
const triSeq = [3,6,9,3];

function pathFromSeq(seq){
  return seq.map((t, idx) => (idx===0 ? "M" : "L") + points[t].x.toFixed(2) + " " + points[t].y.toFixed(2)).join(" ");
}

document.getElementById("hexPath").setAttribute("d", pathFromSeq(hexSeq));
document.getElementById("triPath").setAttribute("d", pathFromSeq(triSeq));

const nodesLayer = document.getElementById("nodesLayer");
const arrowsLayer = document.getElementById("arrowsLayer");

const arrowEls = { integr:{}, disint:{} };

function makeArrow(from, to, cls){
  const p1 = points[from], p2 = points[to];
  const line = document.createElementNS("http://www.w3.org/2000/svg","line");
  line.setAttribute("x1", p1.x);
  line.setAttribute("y1", p1.y);
  line.setAttribute("x2", p2.x);
  line.setAttribute("y2", p2.y);
  line.setAttribute("class", "arrow " + cls);
  arrowsLayer.appendChild(line);
  return line;
}

for(const t of [1,2,3,4,5,6,7,8,9]){
  arrowEls.integr[t] = makeArrow(t, arrowsFallback.integr[t], "integr");
  arrowEls.disint[t] = makeArrow(t, arrowsFallback.disint[t], "disint");
}

function clearAllArrows(){
  document.querySelectorAll(".arrow").forEach(a => a.classList.remove("on"));
}

function showOnlyTypeArrows(t){
  clearAllArrows();
  arrowEls.integr[t]?.classList.add("on");
  arrowEls.disint[t]?.classList.add("on");
}

function makeNode(t){
  const g = document.createElementNS("http://www.w3.org/2000/svg","g");
  g.setAttribute("class","node " + groupOf(t));

  const p = points[t];

  const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
  c.setAttribute("cx", p.x);
  c.setAttribute("cy", p.y);
  c.setAttribute("r", 28);

  const tx = document.createElementNS("http://www.w3.org/2000/svg","text");
  tx.setAttribute("x", p.x);
  tx.setAttribute("y", p.y + 1);
  tx.textContent = t;

  const lb = document.createElementNS("http://www.w3.org/2000/svg","text");
  lb.setAttribute("x", p.x);
  lb.setAttribute("y", p.y + 44);
  lb.setAttribute("class","label");
  lb.textContent = "";

  g.appendChild(c);
  g.appendChild(tx);
  g.appendChild(lb);

  g.addEventListener("click", ()=>selectType(t));
  nodesLayer.appendChild(g);
}

[1,2,3,4,5,6,7,8,9].forEach(makeNode);

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

let typesData = null;

async function loadData(){
  const res = await fetch("assets/data/types.json");
  typesData = await res.json();
}
loadData().catch(()=>{});

function selectType(t){
  badgeNum.textContent = t;

  const data = typesData ? typesData[String(t)] : null;

  const it = data?.integr ?? arrowsFallback.integr[t];
  const dt = data?.disint ?? arrowsFallback.disint[t];

  centerEl.textContent = data?.center ?? "—";
  fearEl.textContent = data?.fear ?? "—";
  desireEl.textContent = data?.desire ?? "—";
  compulsionEl.textContent = data?.compulsion ?? "—";

  toIntegr.textContent = it;
  toDisint.textContent = dt;

  moveHealthText.textContent = data?.integr_text ?? "—";
  moveStressText.textContent = data?.disint_text ?? "—";

  openFull.setAttribute("href", `type${t}.html`);
  openFull.setAttribute("aria-disabled","false");

  showOnlyTypeArrows(t);
}

document.getElementById("btnReset").addEventListener("click", ()=>{
  badgeNum.textContent = "—";
  centerEl.textContent = "—";
  fearEl.textContent = "—";
  desireEl.textContent = "—";
  compulsionEl.textContent = "—";
  toIntegr.textContent = "—";
  toDisint.textContent = "—";
  moveHealthText.textContent = "—";
  moveStressText.textContent = "—";
  openFull.setAttribute("aria-disabled","true");
  clearAllArrows();
});

clearAllArrows();
