#!/usr/bin/env node
/**
 * TrueSizeLumber Build Script v2
 * Generates all individual pages from data + templates for multiple categories
 * Categories: lumber, fasteners, pipe
 * 
 * Usage: node build.js
 */

const fs = require("fs");
const path = require("path");

// ===== Extract data from files =====
function extractDataObject(filename, objectName) {
  try {
    const content = fs.readFileSync(filename, "utf-8");
    const pattern = new RegExp(`const ${objectName} = ({[\\s\\S]*?});`);
    const match = content.match(pattern);
    if (!match) {
      console.error(`ERROR: Could not find ${objectName} in ${filename}`);
      return null;
    }
    return eval("(" + match[1] + ")");
  } catch (err) {
    console.error(`ERROR reading ${filename}:`, err.message);
    return null;
  }
}

// Load all data
const SIZES = extractDataObject("data.js", "SIZES");
const FASTENERS = extractDataObject("data/fasteners.js", "FASTENERS");
const PIPE = extractDataObject("data/pipe.js", "PIPE");

if (!SIZES || !FASTENERS || !PIPE) {
  process.exit(1);
}

// ===== Helper functions =====
function nominalLabel(key) {
  return key.replace("x", "×");
}

function actualLabel(s) {
  return `${s.tFrac}" × ${s.wFrac}"`;
}

function diagramSVG(s) {
  const maxDim = Math.max(s.t, s.w);
  const scale = 110 / maxDim;
  const w = s.w * scale;
  const t = s.t * scale;
  const cx = 150,
    cy = 90;
  const nomPad = 14;
  return `
  <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="${cx - w / 2 - nomPad}" y="${cy - t / 2 - nomPad}" width="${
    w + nomPad * 2
  }" height="${t + nomPad * 2}"
          fill="none" stroke="#3D5A73" stroke-width="2" stroke-dasharray="6,5"/>
    <rect x="${cx - w / 2}" y="${cy - t / 2}" width="${w}" height="${t}" fill="#E8622C" opacity="0.85"/>
    <text x="150" y="20" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#3D5A73">dashed = nominal</text>
    <text x="150" y="166" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" font-weight="600" fill="#C44E1F">solid = actual</text>
  </svg>`;
}

// ===== Build pages for a category =====
function buildCategory(name, data, templateFile, filenamePattern) {
  let template;
  try {
    template = fs.readFileSync(templateFile, "utf-8");
  } catch (err) {
    console.error(`ERROR: Could not read ${templateFile}`);
    return 0;
  }

  let generated = 0;
  const keys = Object.keys(data);

  keys.forEach((key) => {
    const item = data[key];
    const display = item.display || key;
    
    // Sanitize filename (replace / with -)
    const safeKey = key.replace(/\//g, "-").replace(/\s+/g, "-").toLowerCase();
    
    const relatedLinks = keys
      .map((k) => {
        const relatedItem = data[k];
        const relatedDisplay = relatedItem.display || k;
        const safeRelatedKey = k.replace(/\//g, "-").replace(/\s+/g, "-").toLowerCase();
        return `    <a class="related-link" href="${safeRelatedKey}-${name}.html">
      <span class="rl-nom">${relatedDisplay}</span>
    </a>`;
      })
      .join("\n");

    // Determine filename
    let html = template;
    
    // Replace common placeholders
    html = html.replace(/{{display}}/g, display);
    html = html.replace(/{{uses}}/g, item.uses || "");
    html = html.replace(/{{relatedLinks}}/g, relatedLinks);

    // Category-specific replacements
    if (name === "lumber") {
      const nominal = nominalLabel(key);
      const actual = actualLabel(item);
      html = html
        .replace(/{{nominalLabel}}/g, nominal)
        .replace(/{{actualDimensions}}/g, actual)
        .replace(/{{thickness}}/g, item.t)
        .replace(/{{width}}/g, item.w)
        .replace(/{{tFrac}}/g, item.tFrac)
        .replace(/{{wFrac}}/g, item.wFrac)
        .replace(/{{keyForScript}}/g, key)
        .replace(/{{diagramSVG}}/g, diagramSVG(item));
    } else if (name === "fastener") {
      html = html
        .replace(/{{specLabel1}}/g, item.diameter ? "Diameter" : item.gauge ? "Gauge" : "Size")
        .replace(/{{specValue1}}/g, item.diameter || item.gauge || "")
        .replace(/{{specLabel2}}/g, item.length ? "Length" : item.expandedDiameter ? "Expanded Dia" : "Spec")
        .replace(/{{specValue2}}/g, item.length || item.expandedDiameter || "");
    } else if (name === "pipe") {
      html = html
        .replace(/{{nominal}}/g, item.nominal || "")
        .replace(/{{actualOD}}/g, item.actualOD || "")
        .replace(/{{actualID}}/g, item.actualID || "")
        .replace(/{{material}}/g, item.material || "");
    }

    // Write file
    const filename = `${safeKey}-${name}.html`;
    try {
      fs.writeFileSync(filename, html, "utf-8");
      generated++;
    } catch (err) {
      console.error(`✗ Failed to write ${filename}: ${err.message}`);
    }
  });

  return generated;
}

// ===== Main build =====
console.log("🔨 Building TrueSizeLumber site...\n");

const lumberCount = buildCategory("lumber", SIZES, "templates/size-page.html", "{key}-actual-size.html");
console.log(`✓ Generated ${lumberCount} lumber pages`);

const fastenerCount = buildCategory("fastener", FASTENERS, "templates/fastener-page.html", "{key}-fastener.html");
console.log(`✓ Generated ${fastenerCount} fastener pages`);

const pipeCount = buildCategory("pipe", PIPE, "templates/pipe-page.html", "{key}-pipe.html");
console.log(`✓ Generated ${pipeCount} pipe pages`);

console.log(`\n✅ Total: ${lumberCount + fastenerCount + pipeCount} pages generated!`);
