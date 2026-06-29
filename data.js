// ===== Shared lumber size data =====
// One source of truth — every page (homepage, size pages, calculators) reads from this.
const SIZES = {
  "1x2":  { t: 0.75, w: 1.5,   tFrac: "¾",  wFrac: "1½" },
  "1x4":  { t: 0.75, w: 3.5,   tFrac: "¾",  wFrac: "3½" },
  "1x6":  { t: 0.75, w: 5.5,   tFrac: "¾",  wFrac: "5½" },
  "1x8":  { t: 0.75, w: 7.25,  tFrac: "¾",  wFrac: "7¼" },
  "1x10": { t: 0.75, w: 9.25,  tFrac: "¾",  wFrac: "9¼" },
  "1x12": { t: 0.75, w: 11.25, tFrac: "¾",  wFrac: "11¼" },
  "2x2":  { t: 1.5,  w: 1.5,   tFrac: "1½", wFrac: "1½" },
  "2x4":  { t: 1.5,  w: 3.5,   tFrac: "1½", wFrac: "3½" },
  "2x6":  { t: 1.5,  w: 5.5,   tFrac: "1½", wFrac: "5½" },
  "2x8":  { t: 1.5,  w: 7.25,  tFrac: "1½", wFrac: "7¼" },
  "2x10": { t: 1.5,  w: 9.25,  tFrac: "1½", wFrac: "9¼" },
  "2x12": { t: 1.5,  w: 11.25, tFrac: "1½", wFrac: "11¼" },
  "4x4":  { t: 3.5,  w: 3.5,   tFrac: "3½", wFrac: "3½" },
  "6x6":  { t: 5.5,  w: 5.5,   tFrac: "5½", wFrac: "5½" },
};

function nominalLabel(key){ return key.replace("x", "×"); }
function actualLabel(s){ return `${s.tFrac}" × ${s.wFrac}"`; }

// Cross-section diagram: dashed = nominal, solid = actual
function diagramSVG(s){
  const maxDim = Math.max(s.t, s.w);
  const scale = 110 / maxDim;
  const w = s.w * scale;
  const t = s.t * scale;
  const cx = 150, cy = 90;
  const nomPad = 14;
  return `
  <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="${cx - w/2 - nomPad}" y="${cy - t/2 - nomPad}" width="${w+nomPad*2}" height="${t+nomPad*2}"
          fill="none" stroke="#3D5A73" stroke-width="2" stroke-dasharray="6,5"/>
    <rect x="${cx - w/2}" y="${cy - t/2}" width="${w}" height="${t}" fill="#E8622C" opacity="0.85"/>
    <text x="150" y="20" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#3D5A73">dashed = nominal</text>
    <text x="150" y="166" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="600" fill="#C44E1F">solid = actual</text>
  </svg>`;
}

// Build the tappable size grid. onClick(key) fires when a size is chosen.
// If linkPattern is provided, buttons render as real <a> links (for SEO) instead of buttons.
function buildSizeGrid(containerEl, activeKey, linkPattern){
  containerEl.innerHTML = "";
  Object.keys(SIZES).forEach(key => {
    const el = document.createElement(linkPattern ? "a" : "button");
    el.className = "size-btn" + (key === activeKey ? " active" : "");
    el.textContent = nominalLabel(key);
    if (linkPattern){
      el.href = linkPattern.replace("{key}", key);
    } else {
      el.dataset.key = key;
    }
    containerEl.appendChild(el);
  });
}

// Populate a <select> with every size as an option
function populateSizeSelect(selectEl){
  Object.keys(SIZES).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = nominalLabel(key) + " (" + actualLabel(SIZES[key]) + ")";
    selectEl.appendChild(opt);
  });
}

// Build the full reference table. highlightKey adds a subtle highlight row.
function buildReferenceTable(tbodyEl, highlightKey){
  tbodyEl.innerHTML = "";
  Object.keys(SIZES).forEach(key => {
    const s = SIZES[key];
    const tr = document.createElement("tr");
    if (key === highlightKey) tr.className = "current-row";
    tr.innerHTML = `<td class="nom">${nominalLabel(key)}</td><td class="act">${actualLabel(s)}</td><td class="mono">${s.t}" × ${s.w}"</td>`;
    tbodyEl.appendChild(tr);
  });
}

// ===== Calculators (shared logic) =====

// Deck/board coverage: how many boards to span a given width
function calcBoardsForWidth(sizeKey, widthFt, gapIn){
  const s = SIZES[sizeKey];
  const boardWidthIn = s.w + gapIn;
  const widthIn = widthFt * 12;
  const boardsNeeded = boardWidthIn > 0 ? Math.ceil(widthIn / boardWidthIn) : 0;
  const coverage = boardsNeeded > 0 ? (boardsNeeded * boardWidthIn / 12) : 0;
  return { boardsNeeded, coverage, s };
}

// Board feet: (thickness(in) × width(in) × length(ft)) / 12
function calcBoardFeet(sizeKey, lengthFt, qty){
  const s = SIZES[sizeKey];
  const bfPerBoard = (s.t * s.w * lengthFt) / 12;
  const totalBf = bfPerBoard * qty;
  return { bfPerBoard, totalBf, s };
}
