function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

function getTypeParam(){
  const p = new URLSearchParams(location.search);
  const t = parseInt(p.get("type") || "1", 10);
  return (t>=1 && t<=9) ? t : 1;
}

const TYPE = getTypeParam();
const DATA_URL = `assets/data/type-${TYPE}.json?v=12`;

const elTitle = qs("#typeTitle");
const elSubtitle = qs("#typeSubtitle");

const qType = qs("#qType");
const qCenter = qs("#qCenter");
const qWings = qs("#qWings");
const qIntegr = qs("#qIntegr");
const qDisint = qs("#qDisint");

const sectionsGrid = qs("#sectionsGrid");
const toc = qs("#toc");

const drawer = qs("#drawer");
const drawerOverlay = qs("#drawerOverlay");
const drawerTitle = qs("#drawerTitle");
const drawerSub = qs("#drawerSub");
const drawerIcon = qs("#drawerIcon");
const drawerContent = qs("#drawerContent");

const btnClose = qs("#btnClose");
const btnPin = qs("#btnPin");

const searchBox = qs("#searchBox");
const btnExpandAll = qs("#btnExpandAll");
const btnCollapseAll = qs("#btnCollapseAll");

let DATA = null;
let pinned = false;
let currentSectionId = null;

function openDrawer(){
  drawer.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeDrawer(){
  if (pinned) return;
  drawer.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  currentSectionId = null;
}

drawerOverlay.addEventListener("click", closeDrawer);
btnClose.addEventListener("click", closeDrawer);

btnPin.addEventListener("click", ()=>{
  pinned = !pinned;
  btnPin.textContent = pinned ? "Désépingler" : "Épingler";
});

document.addEventListener("keydown", (e)=>{
  if (e.key === "Escape") closeDrawer();
});

function setHeader(d){
  document.title = `Type ${d.type} • ${d.name}`;
  elTitle.textContent = `Type ${d.type} • ${d.name}`;
  elSubtitle.textContent = d.tagline || "Fiche interactive";

  qType.textContent = d.type;
  qCenter.textContent = d.quick?.center || "—";
  qWings.textContent = d.quick?.wings || "—";
  qIntegr.textContent = d.quick?.integr || "—";
  qDisint.textContent = d.quick?.disint || "—";
}

function storeKey(){ return `ennea_sections_order_type_${TYPE}`; }

function applyOrder(sections){
  const saved = localStorage.getItem(storeKey());
  if (!saved) return sections;

  try{
    const ids = JSON.parse(saved);
    const map = new Map(sections.map(s => [s.id, s]));
    const ordered = [];
    ids.forEach(id => { if (map.has(id)) ordered.push(map.get(id)); });
    sections.forEach(s => { if (!ids.includes(s.id)) ordered.push(s); });
    return ordered;
  }catch{
    return sections;
  }
}

function saveOrderFromDOM(){
  const ids = Array.from(sectionsGrid.querySelectorAll(".secCard")).map(c => c.dataset.id);
  localStorage.setItem(storeKey(), JSON.stringify(ids));
}

function makeSecCard(s){
  const div = document.createElement("div");
  div.className = "secCard";
  div.dataset.id = s.id;
  div.draggable = true;

  const icon = document.createElement("div");
  icon.className = "secIcon";
  icon.textContent = s.icon || "📌";

  const meta = document.createElement("div");
  meta.className = "secMeta";

  const h = document.createElement("div");
  h.className = "secTitle";
  h.textContent = s.title;

  const p = document.createElement("div");
  p.className = "secDesc";
  p.textContent = s.desc || "Clique pour ouvrir";

  meta.appendChild(h);
  meta.appendChild(p);

  const drag = document.createElement("div");
  drag.className = "secDrag";
  drag.textContent = "⋮⋮";
  drag.title = "Glisser pour réorganiser";

  div.appendChild(icon);
  div.appendChild(meta);
  div.appendChild(drag);

  div.addEventListener("click", (e)=>{
    if (e.target === drag) return;
    showSection(s.id);
  });

  div.addEventListener("dragstart", ()=>{
    div.classList.add("dragging");
  });
  div.addEventListener("dragend", ()=>{
    div.classList.remove("dragging");
    saveOrderFromDOM();
  });

  return div;
}

function enableDnD(){
  sectionsGrid.addEventListener("dragover", (e)=>{
    e.preventDefault();
    const dragging = sectionsGrid.querySelector(".secCard.dragging");
    if (!dragging) return;

    const after = getDragAfterElement(sectionsGrid, e.clientY);
    if (after == null) sectionsGrid.appendChild(dragging);
    else sectionsGrid.insertBefore(dragging, after);
  });
}

function getDragAfterElement(container, y){
  const els = [...container.querySelectorAll(".secCard:not(.dragging)")];
  return els.reduce((closest, child)=>{
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) return { offset, element: child };
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

function renderTOC(sections){
  toc.innerHTML = "";
  sections.forEach(s=>{
    const a = document.createElement("a");
    a.href = "#";
    a.addEventListener("click",(e)=>{ e.preventDefault(); showSection(s.id); });

    const ic = document.createElement("span");
    ic.className = "tIcon";
    ic.textContent = s.icon || "📌";

    const t = document.createElement("span");
    t.textContent = s.title;

    const small = document.createElement("span");
    small.className = "tSmall";
    small.textContent = (s.items?.length || 0) + " •";

    a.appendChild(ic);
    a.appendChild(t);
    a.appendChild(small);

    toc.appendChild(a);
  });
}

function textMatch(hay, needle){
  if (!needle) return true;
  return (hay || "").toLowerCase().includes(needle.toLowerCase());
}

function makeNodeCard(node){
  const card = document.createElement("div");
  card.className = "nodeCard";

  const head = document.createElement("div");
  head.className = "nodeHead";

  const title = document.createElement("h3");
  title.className = "nodeTitle";
  title.textContent = node.label || "—";

  const caret = document.createElement("div");
  caret.className = "nodeCaret";
  caret.textContent = "Ouvrir";

  head.appendChild(title);
  head.appendChild(caret);

  const value = document.createElement("div");
  value.className = "nodeValue";
  value.textContent = node.value || "";

  const childrenWrap = document.createElement("div");
  childrenWrap.className = "nodeChildren";

  if (Array.isArray(node.children)){
    node.children.forEach(ch=>{
      childrenWrap.appendChild(makeNodeCard(ch));
    });
  }

  if (node.kind === "levels" && Array.isArray(node.levels)){
    const grid = document.createElement("div");
    grid.className = "levels";
    node.levels.forEach(l=>{
      const b = document.createElement("button");
      b.type = "button";
      b.className = "levelBtn";
      b.innerHTML = `<div class="levelNum">Niveau ${l.n}</div><div class="levelTxt">${l.text}</div>`;
      b.addEventListener("click", ()=>{
        card.classList.add("open");
        value.style.display = "block";
        value.textContent = `Niveau ${l.n} : ${l.text}`;
      });
      grid.appendChild(b);
    });
    childrenWrap.appendChild(grid);
  }

  head.addEventListener("click", ()=>{
    card.classList.toggle("open");
    const isOpen = card.classList.contains("open");
    caret.textContent = isOpen ? "Fermer" : "Ouvrir";
  });

  if (!node.value && !node.children && node.kind !== "levels"){
    caret.textContent = "";
  }

  card.appendChild(head);
  if (node.value) card.appendChild(value);
  if ((node.children && node.children.length) || node.kind === "levels") card.appendChild(childrenWrap);

  return card;
}

function expandAll(){
  qsa(".nodeCard").forEach(c=>{
    c.classList.add("open");
    const caret = c.querySelector(".nodeCaret");
    if (caret) caret.textContent = "Fermer";
  });
}
function collapseAll(){
  qsa(".nodeCard").forEach(c=>{
    c.classList.remove("open");
    const caret = c.querySelector(".nodeCaret");
    if (caret) caret.textContent = "Ouvrir";
  });
}

btnExpandAll.addEventListener("click", expandAll);
btnCollapseAll.addEventListener("click", collapseAll);

function showSection(id){
  const s = DATA.sections.find(x => x.id === id);
  if (!s) return;

  currentSectionId = id;

  drawerIcon.textContent = s.icon || "📌";
  drawerTitle.textContent = s.title;
  drawerSub.textContent = s.desc || "";

  drawerContent.innerHTML = "";

  const needle = (searchBox.value || "").trim();

  const items = (s.items || []).filter(it=>{
    const blob = (it.label || "") + " " + (it.value || "");
    return textMatch(blob, needle) || (it.children || []).some(ch => textMatch((ch.label||"")+" "+(ch.value||""), needle));
  });

  if (!items.length){
    const empty = document.createElement("div");
    empty.className = "nodeCard";
    empty.textContent = needle ? "Aucun résultat dans cette rubrique." : "Rubrique vide pour l’instant.";
    drawerContent.appendChild(empty);
  }else{
    items.forEach(it=> drawerContent.appendChild(makeNodeCard(it)));
  }

  openDrawer();
}

searchBox.addEventListener("input", ()=>{
  if (!DATA || !currentSectionId) return;
  showSection(currentSectionId);
});

async function load(){
  const res = await fetch(DATA_URL);
  DATA = await res.json();

  setHeader(DATA);

  const sections = applyOrder(DATA.sections || []);
  sectionsGrid.innerHTML = "";
  sections.forEach(s => sectionsGrid.appendChild(makeSecCard(s)));

  renderTOC(sections);
  enableDnD();
}

load().catch(()=>{
  elTitle.textContent = "Fichier manquant";
  elSubtitle.textContent = "Crée assets/data/type-" + TYPE + ".json";
});
