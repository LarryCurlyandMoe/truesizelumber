// ===== Shared lumber size data =====
// One source of truth — every page (homepage, size pages, calculators) reads from this.
const SIZES = {
  "1x2":  { t: 0.75, w: 1.5,   tFrac: "¾",  wFrac: "1½",
    uses: "Furring strips, lattice, garden stakes, shims",
    tip: "1x2 is thin and prone to cupping — sight down the length of the board in the aisle before buying, and expect more waste per board than thicker stock." },
  "1x4":  { t: 0.75, w: 3.5,   tFrac: "¾",  wFrac: "3½",
    uses: "Trim, face frames, shelving cleats, furring",
    tip: "For trim runs, buy boards from the same bundle when you can — color and grain match noticeably better than boards pulled from different bundles." },
  "1x6":  { t: 0.75, w: 5.5,   tFrac: "¾",  wFrac: "5½",
    uses: "Shiplap siding, fence pickets, shelving",
    tip: "Shiplap and lapped siding lose width to the overlap — order 15-20% extra length coverage beyond a simple width/board calculation." },
  "1x8":  { t: 0.75, w: 7.25,  tFrac: "¾",  wFrac: "7¼",
    uses: "Shelving, rustic siding, stair skirt boards",
    tip: "At 7¼\" actual width, this is a common closet-shelf depth — deep enough to be useful without the cost jump to 1x10." },
  "1x10": { t: 0.75, w: 9.25,  tFrac: "¾",  wFrac: "9¼",
    uses: "Wide shelving, stair risers, box beams",
    tip: "Wide 1-by boards warp more easily than narrow ones — look for straight, tight grain lines (quarter-sawn) for the flattest boards." },
  "1x12": { t: 0.75, w: 11.25, tFrac: "¾",  wFrac: "11¼",
    uses: "Wide shelving, box framing, fascia boards",
    tip: "At 11¼\" actual width this is often special-order rather than shelf stock at smaller yards — call ahead before planning a project around it." },
  "2x2":  { t: 1.5,  w: 1.5,   tFrac: "1½", wFrac: "1½",
    uses: "Furring strips, small frames, garden stakes, shelf cleats",
    tip: "True 2x2 stock is less common than lumber ripped down from 2x4 — compare price and straightness between the two before buying." },
  "2x4":  { t: 1.5,  w: 3.5,   tFrac: "1½", wFrac: "3½",
    uses: "Wall studs, general framing, workbenches",
    tip: "Standard 16\" on-center stud spacing is planned around the actual 1½\" width, not the nominal 2\" — always lay out framing from actual dimensions." },
  "2x6":  { t: 1.5,  w: 5.5,   tFrac: "1½", wFrac: "5½",
    uses: "Exterior wall framing, deck joists, ledger boards",
    tip: "Many current energy codes call for 2x6 exterior walls specifically for the deeper insulation cavity — check your local code before framing walls this thick." },
  "2x8":  { t: 1.5,  w: 7.25,  tFrac: "1½", wFrac: "7¼",
    uses: "Floor joists (shorter spans), header beams",
    tip: "Span tables use the actual 7¼\" depth, not the nominal 8\" — check your species and grade against local code span tables before spacing joists." },
  "2x10": { t: 1.5,  w: 9.25,  tFrac: "1½", wFrac: "9¼",
    uses: "Floor joists (longer spans), stair stringers, headers",
    tip: "A common joist size for standard residential spans, but always verify against your local code's span tables for your actual spacing and load, not just habit." },
  "2x12": { t: 1.5,  w: 11.25, tFrac: "1½", wFrac: "11¼",
    uses: "Long-span floor joists, deck ledgers, large headers",
    tip: "At 11¼\" actual depth this is often the largest dimensional size worth using before engineered lumber (I-joists, LVL) becomes more economical for long spans." },
  "4x4":  { t: 3.5,  w: 3.5,   tFrac: "3½", wFrac: "3½",
    uses: "Deck posts, fence posts, small structural posts",
    tip: "Pressure-treated rated for ground contact is a different (and more expensive) product than 'above ground' PT — check the end tag if any part of the post touches soil or concrete." },
  "6x6":  { t: 5.5,  w: 5.5,   tFrac: "5½", wFrac: "5½",
    uses: "Structural posts, porch/pergola posts, heavy fence posts",
    tip: "6x6 is often sold rough-sawn or as reclaimed timber alongside dimensional PT stock — actual size and moisture content can vary more than smaller lumber, so measure before you build around it." },
  "5/4x4": { t: 1.0, w: 3.5,  tFrac: "1",  wFrac: "3½",
    uses: "Narrow decking runs, deck stair treads",
    tip: "5/4 decking is milled with eased (rounded) edges on both long sides, unlike standard 2-by lumber — that rounded edge is a deck-specific detail, not a defect." },
  "5/4x6": { t: 1.0, w: 5.5,  tFrac: "1",  wFrac: "5½",
    uses: "Standard deck boards — the most common decking size",
    tip: "Despite the name, 5/4 decking is about 1\" thick, not 1¼\" — the \"5/4\" refers to the rough-sawn thickness before drying and planing, the same nominal-vs-actual gap as dimensional lumber." },
};

function nominalLabel(key){ return key.replace("x", "×"); }
function actualLabel(s){ return `${s.tFrac}" × ${s.wFrac}"`; }
// Turn a data key into a safe filename fragment (keys like "5/4x6" or "1/4 bolt" contain / and spaces).
function sanitizeKey(key){ return key.replace(/\//g, "-").replace(/\s+/g, "-").toLowerCase(); }

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
      el.href = linkPattern.replace("{key}", sanitizeKey(key));
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
// Each row links to that size's full guide page, so the chart doubles as navigation.
function buildReferenceTable(tbodyEl, highlightKey){
  tbodyEl.innerHTML = "";
  Object.keys(SIZES).forEach(key => {
    const s = SIZES[key];
    const tr = document.createElement("tr");
    if (key === highlightKey) tr.className = "current-row";
    const href = `${sanitizeKey(key)}-lumber.html`;
    tr.innerHTML = `<td class="nom"><a href="${href}">${nominalLabel(key)}</a></td><td class="act"><a href="${href}">${actualLabel(s)}</a></td><td class="mono"><a href="${href}">${s.t}" × ${s.w}"</a></td>`;
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
