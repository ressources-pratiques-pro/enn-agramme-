function getTypeFromUrl(){
  const p = new URLSearchParams(location.search);
  const t = p.get("type");
  return t && /^[1-9]$/.test(t) ? t : "1";
}

async function loadData(){
  const res = await fetch("assets/data/types.json");
  return await res.json();
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;");
}

function renderType(t, data){
  document.getElementById("badgeNum").textContent = t;

  const name = data?.name ? `Type ${t} — ${data.name}` : `Type ${t}`;
  document.title = name;
  document.getElementById("tTitle").textContent = name;

  const c = document.getElementById("content");
  if(!data){
    c.innerHTML = `<p class="muted">Type ${escapeHtml(t)} absent de types.json</p>`;
    return;
  }

  const parts = (data.sections || []).map(sec => {
    const title = escapeHtml(sec.title || "Section");
    const html = sec.html || "<p>Ton contenu ici</p>";
    return `
      <details open>
        <summary>${title}</summary>
        <div class="box">${html}</div>
      </details>
    `;
  }).join("");

  c.innerHTML = parts;
}

(async ()=>{
  const t = getTypeFromUrl();
  const all = await loadData();
  renderType(t, all[t]);
})().catch(()=>{
  document.getElementById("content").innerHTML = `<p class="muted">Impossible de charger assets/data/types.json</p>`;
});