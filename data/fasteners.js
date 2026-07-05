// ===== Fastener dimensions and data =====
const FASTENERS = {
  "1/4 bolt 3/4": {
    display: "1/4\" × 3/4\" Bolt",
    diameter: "1/4\"",
    length: "3/4\"",
    uses: "General machinery, small fastening",
    tip: "A 1/4\" bolt typically needs a 5/16\" clearance hole through the material, or a 17/64\" (or #F) drilled hole if you're tapping 1/4-20 threads directly."
  },
  "1/4 bolt 1": {
    display: "1/4\" × 1\" Bolt",
    diameter: "1/4\"",
    length: "1\"",
    uses: "General fastening",
    tip: "Check grip length before buying — you want at least 1-2 threads proud of the nut once everything is clamped up, not the bolt bottoming out mid-stack."
  },
  "1/4 bolt 2": {
    display: "1/4\" × 2\" Bolt",
    diameter: "1/4\"",
    length: "2\"",
    uses: "Structural, through-bolting",
    tip: "For through-bolts in wood, use a washer under both the head and the nut — without one, a 1/4\" bolt can crush into softer lumber under load over time."
  },
  "3/8 bolt 1": {
    display: "3/8\" × 1\" Bolt",
    diameter: "3/8\"",
    length: "1\"",
    uses: "Heavy machinery, structural",
    tip: "3/8\" bolts on anything that vibrates (equipment, trailers) should use a lock washer or nylon-lock nut, not just a plain nut."
  },
  "3/8 bolt 2": {
    display: "3/8\" × 2\" Bolt",
    diameter: "3/8\"",
    length: "2\"",
    uses: "Structural fastening, bridges",
    tip: "Clearance drilling for 3/8\" bolts is typically a 7/16\" hole — oversizing further just adds slop to a structural connection."
  },
  "1/2 bolt 1": {
    display: "1/2\" × 1\" Bolt",
    diameter: "1/2\"",
    length: "1\"",
    uses: "Heavy structural, automotive",
    tip: "Torque specs for 1/2\" bolts vary a lot by grade (Grade 5 vs Grade 8) — check a torque chart and use a <a href=\"https://www.amazon.com/s?k=torque+wrench&tag=truesizelumber-20\" target=\"_blank\" rel=\"nofollow sponsored noopener\">torque wrench</a> for anything load-bearing instead of going by feel."
  },
  "1/2 bolt 2": {
    display: "1/2\" × 2\" Bolt",
    diameter: "1/2\"",
    length: "2\"",
    uses: "Beams, heavy construction",
    tip: "Use structural-rated washers (not decorative fender washers) on load-bearing wood-to-wood connections at this size."
  },
  "8 wood screw 1.25": {
    display: "#8 Wood Screw, 1¼\"",
    gauge: "8",
    length: "1.25\"",
    uses: "General woodworking, cabinets",
    tip: "Pilot hole for a #8 screw is typically 1/8\" in hardwood; softwoods like pine can often take it slightly smaller or skip the pilot hole for short screws."
  },
  "10 wood screw 1.5": {
    display: "#10 Wood Screw, 1½\"",
    gauge: "10",
    length: "1.5\"",
    uses: "Deck screws, framing",
    tip: "#10 is the most common deck screw gauge — use an <a href=\"https://www.amazon.com/s?k=exterior+deck+screws&tag=truesizelumber-20\" target=\"_blank\" rel=\"nofollow sponsored noopener\">exterior-rated coated or stainless screw</a> outdoors; interior drywall screws will rust and snap."
  },
  "12 wood screw 2.5": {
    display: "#12 Wood Screw, 2½\"",
    gauge: "12",
    length: "2.5\"",
    uses: "Deck boards, structural",
    tip: "Pre-drill with a slightly larger pilot (about 5/32\"-3/16\") especially near board ends, or a #12 screw is likely to split the wood."
  },
  "16 wood screw 3": {
    display: "#16 Wood Screw, 3\"",
    gauge: "16",
    length: "3\"",
    uses: "Heavy deck, beams",
    tip: "Always pre-drill at this gauge and length — driving without a pilot hole risks splitting the board or stripping the screw head before it seats."
  },
  "10d nail": {
    display: "10d Common Nail (3.125\")",
    penny: "10",
    length: "3.125\"",
    uses: "General framing, rough construction",
    tip: "The \"d\" (penny) sizing is historical, not dimensional — 10d is a step down from 16d, useful where a full 16d nail would be oversized for the connection."
  },
  "16d nail": {
    display: "16d Common Nail (3.5\")",
    penny: "16",
    length: "3.5\"",
    uses: "Heavy framing, structure",
    tip: "16d is the standard framing nail for face- or end-nailing 2x dimensional lumber, like nailing a stud to a top or bottom plate."
  },
  "20d nail": {
    display: "20d Common Nail (4\")",
    penny: "20",
    length: "4\"",
    uses: "Structural framing, beams",
    tip: "20d nails show up less in typical stud framing — more common on built-up beams. Many of those heavier connections now use structural screws instead of nails."
  },
  "1/4 anchor": {
    display: "1/4\" Drywall Anchor",
    diameter: "1/4\"",
    expandedDiameter: "3/4\"",
    uses: "Hanging items on drywall",
    tip: "Standard expansion anchors like this are rated for light loads — for anything heavy (mirrors, shelving), find a stud or use a <a href=\"https://www.amazon.com/s?k=toggle+bolt+anchor&tag=truesizelumber-20\" target=\"_blank\" rel=\"nofollow sponsored noopener\">toggle-style anchor</a> instead."
  },
  "3/8 anchor": {
    display: "3/8\" Drywall Anchor",
    diameter: "3/8\"",
    expandedDiameter: "1\"",
    uses: "Heavy items, drywall",
    tip: "Even a \"heavy duty\" drywall anchor is limited by the drywall itself failing before the anchor does — spread heavy loads across multiple anchors or onto a stud."
  },
  "5/16 lag bolt 3": {
    display: "5/16\" × 3\" Lag Bolt",
    diameter: "5/16\"",
    length: "3\"",
    uses: "Wood-to-wood, outdoor structure",
    tip: "Lag bolts need a pilot hole slightly smaller than the shank — a dab of dish soap or beeswax on the threads makes driving significantly easier."
  },
  "3/8 lag bolt 4": {
    display: "3/8\" × 4\" Lag Bolt",
    diameter: "3/8\"",
    length: "4\"",
    uses: "Deck ledger, major fastening",
    tip: "Deck ledger attachment is one of the most safety-critical connections on a deck — follow your local code's exact lag bolt spacing pattern instead of estimating."
  },
  "1/4 rebar 24": {
    display: "1/4\" Rebar, 24\" length",
    diameter: "1/4\"",
    length: "24\"",
    uses: "Concrete reinforcement, light duty",
    tip: "Rebar should sit in the middle-to-lower third of the slab, not resting on the ground — use <a href=\"https://www.amazon.com/s?k=rebar+chairs&tag=truesizelumber-20\" target=\"_blank\" rel=\"nofollow sponsored noopener\">rebar chairs</a> or supports to hold it up during the pour."
  },
  "3/8 rebar 36": {
    display: "3/8\" Rebar, 36\" length",
    diameter: "3/8\"",
    length: "36\"",
    uses: "Concrete reinforcement, standard",
    tip: "3/8\" (#3) rebar is common for residential slabs and footings — check your local code or an engineer's spec for exact spacing before you pour."
  },
  "5/16 structural screw 4": {
    display: "5/16\" Structural Screw, 4\"",
    diameter: "5/16\"",
    length: "4\"",
    uses: "Ledger-to-rim attachment, multi-ply beam assembly",
    tip: "Code-rated <a href=\"https://www.amazon.com/s?k=structural+wood+screws&tag=truesizelumber-20\" target=\"_blank\" rel=\"nofollow sponsored noopener\">structural screws</a> (like GRK RSS or Simpson Strong-Drive SDWS) are engineered to replace lag bolts in many connections without a separate pilot hole and washer — check the product's code report (ESR number) for the actual load rating rather than assuming it matches a lag bolt of the same diameter."
  },
  "1/4 structural screw 6": {
    display: "1/4\" Structural Screw, 6\"",
    diameter: "1/4\"",
    length: "6\"",
    uses: "Multi-ply LVL/beam fastening, deck ledger connections",
    tip: "Structural screw brands publish load tables for specific connection types (face-to-face plies, ledger-to-band-joist, etc.) — don't substitute a generic deck screw of similar diameter, since the shank, thread, and head design are engineered for the rated load."
  }
};
