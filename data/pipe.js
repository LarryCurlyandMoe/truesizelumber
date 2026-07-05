// ===== Pipe dimensions and data =====
const PIPE = {
  "1/2 pvc": {
    display: "1/2\" PVC",
    nominal: "1/2\"",
    actualOD: "0.840\"",
    actualID: "0.602\"",
    material: "PVC",
    uses: "Cold water, irrigation, DWV",
    tip: "PVC needs primer (usually purple) before cement on most pressure applications — skipping primer is a common DIY mistake and a common cause of joint failure."
  },
  "3/4 pvc": {
    display: "3/4\" PVC",
    nominal: "3/4\"",
    actualOD: "1.050\"",
    actualID: "0.810\"",
    material: "PVC",
    uses: "Water supply, irrigation",
    tip: "Confirm your pipe is rated for the pressure and temperature of your application — thin-wall irrigation pipe and Schedule 40 pressure pipe aren't interchangeable."
  },
  "1 pvc": {
    display: "1\" PVC",
    nominal: "1\"",
    actualOD: "1.315\"",
    actualID: "1.015\"",
    material: "PVC",
    uses: "Large flow, drainage",
    tip: "For drainage (DWV) use, PVC doesn't need to handle pressure, so thinner-wall DWV-rated pipe is normal — don't confuse its spec sheet with pressure-rated pipe."
  },
  "1.5 pvc": {
    display: "1½\" PVC",
    nominal: "1.5\"",
    actualOD: "1.900\"",
    actualID: "1.500\"",
    material: "PVC",
    uses: "Major drainage, pools",
    tip: "1.5\" is a common pool equipment size — make sure pipe and fittings are pool-chemical rated, since regular PVC can degrade faster under some sanitizers."
  },
  "2 pvc": {
    display: "2\" PVC",
    nominal: "2\"",
    actualOD: "2.375\"",
    actualID: "1.939\"",
    material: "PVC",
    uses: "Large irrigation, drainage systems",
    tip: "At 2\" and up, PVC gets noticeably stiffer to work with — leave more room around fittings rather than trying to force a bend into a run."
  },
  "1/2 copper": {
    display: "1/2\" Copper (Type M)",
    nominal: "1/2\"",
    actualOD: "0.625\"",
    actualID: "0.545\"",
    material: "Copper Type M",
    uses: "Plumbing, standard residential",
    tip: "Type M is thinner-walled than Type L — some local codes require Type L for water supply lines, so check before you buy a whole run of pipe."
  },
  "3/4 copper": {
    display: "3/4\" Copper (Type M)",
    nominal: "3/4\"",
    actualOD: "0.875\"",
    actualID: "0.795\"",
    material: "Copper Type M",
    uses: "Main water line, plumbing",
    tip: "For soldered joints, the pipe and fitting need to be clean and fluxed — a dull or oxidized surface is the most common cause of a leaking joint."
  },
  "1 copper": {
    display: "1\" Copper (Type M)",
    nominal: "1\"",
    actualOD: "1.125\"",
    actualID: "1.025\"",
    material: "Copper Type M",
    uses: "Large plumbing runs",
    tip: "Larger copper takes more heat to solder properly — a small torch can struggle to bring a 1\" fitting to even temperature all the way around."
  },
  "1/2 schedule40": {
    display: "1/2\" Schedule 40 Steel",
    nominal: "1/2\"",
    actualOD: "0.840\"",
    actualID: "0.622\"",
    material: "Steel Sch 40",
    uses: "Industrial, high pressure gas/air",
    tip: "Steel pipe is measured and joined by NPT threads cut into the pipe itself — its actual OD matches PVC at the same nominal size, which is why fittings share naming across materials."
  },
  "3/4 schedule40": {
    display: "3/4\" Schedule 40 Steel",
    nominal: "3/4\"",
    actualOD: "1.050\"",
    actualID: "0.824\"",
    material: "Steel Sch 40",
    uses: "Industrial, compressed air",
    tip: "Use thread sealant rated for the specific application — compressed air and gas lines need a sealant rated for that use, not just generic plumber's tape."
  },
  "1 schedule40": {
    display: "1\" Schedule 40 Steel",
    nominal: "1\"",
    actualOD: "1.315\"",
    actualID: "1.049\"",
    material: "Steel Sch 40",
    uses: "Piping, irrigation, industrial",
    tip: "Threading removes wall thickness right where the pipe is joined — a threaded end is measurably weaker there than a plain, unthreaded section of the same pipe."
  },
  "1.5 schedule40": {
    display: "1½\" Schedule 40 Steel",
    nominal: "1.5\"",
    actualOD: "1.900\"",
    actualID: "1.610\"",
    material: "Steel Sch 40",
    uses: "Large diameter industrial",
    tip: "Steel pipe at this size is heavy — plan hanger/support spacing so a full run doesn't sag under its own weight, especially once it's carrying liquid."
  },
  "2 schedule40": {
    display: "2\" Schedule 40 Steel",
    nominal: "2\"",
    actualOD: "2.375\"",
    actualID: "2.067\"",
    material: "Steel Sch 40",
    uses: "Industrial applications, steam",
    tip: "For steam lines specifically, thermal expansion matters — longer runs typically need expansion joints or loops, unlike a cold water line of the same size."
  },
  "3 schedule40": {
    display: "3\" Schedule 40 Steel",
    nominal: "3\"",
    actualOD: "3.500\"",
    actualID: "3.068\"",
    material: "Steel Sch 40",
    uses: "Large flow, industrial",
    tip: "At 3\" and up, most installations use grooved or flanged mechanical joints rather than threading — cutting clean threads at this diameter needs heavy equipment."
  },
  "4 schedule40": {
    display: "4\" Schedule 40 Steel",
    nominal: "4\"",
    actualOD: "4.500\"",
    actualID: "4.026\"",
    material: "Steel Sch 40",
    uses: "Major pipelines, large diameter",
    tip: "Same as 3\" — expect grooved couplings or welded joints rather than NPT threading once you're at 4\" nominal."
  }
};
