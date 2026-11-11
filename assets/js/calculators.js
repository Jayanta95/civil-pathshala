/* =========================================================
   Civil Pathshala — Construction Calculators
   Thumb-rule formulas commonly used in Indian construction.
   ========================================================= */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const num = (id) => Math.max(0, parseFloat($(id).value) || 0);
  const fmt = (n, d = 0) => (isFinite(n) ? n : 0).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
  const inr = (n) => "₹" + fmt(Math.round(n));
  const rows = (arr) => arr.map(([k, v, c]) => `<tr><td>${c ? `<span class="sw" style="background:${c}"></span>` : ""}${k}</td><td>${v}</td></tr>`).join("");
  const FT3_PER_M3 = 35.3147, M_PER_FT = 0.3048;

  /* ---------- Tabs (with URL hash) ---------- */
  const tabs = [...document.querySelectorAll(".calc-tab")];
  function show(name) {
    if (!$("panel-" + name)) name = "cost";
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document.querySelectorAll(".calc-panel").forEach((p) => p.classList.toggle("active", p.id === "panel-" + name));
  }
  tabs.forEach((t) => t.addEventListener("click", () => {
    show(t.dataset.tab);
    history.replaceState(null, "", "#" + t.dataset.tab);
    t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    if (innerWidth < 992) $("panel-" + t.dataset.tab).scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  addEventListener("hashchange", () => show(location.hash.slice(1)));
  show(location.hash.slice(1) || "cost");

  /* ---------- Construction cost ---------- */
  const SHARE = [
    ["Cement", 16.4, "#1d3fd8"], ["Sand", 12.3, "#ffc400"], ["Aggregate", 7.4, "#ff7a00"], ["Steel", 24.6, "#071040"],
    ["Bricks", 4.4, "#ff2d00"], ["Tiles", 8.0, "#0e8f5f"], ["Paint", 4.1, "#a855f7"], ["Doors & Windows", 6.4, "#06b6d4"],
    ["Plumbing & Sanitary", 9.6, "#5b7cff"], ["Electrical", 6.8, "#84cc16"],
  ];
  function cost() {
    const area = num("c-area"), floors = Math.max(1, num("c-floors"));
    const q = $("c-quality").value;
    $("c-custom-wrap").hidden = q !== "custom";
    const rate = q === "custom" ? num("c-rate") : +q;
    const built = area * floors, total = built * rate;
    $("c-total").textContent = inr(total);
    $("c-sqft").innerHTML = `<b style="color:var(--text)">${fmt(built)} sqft</b> built-up<br>@ ${inr(rate)} per sqft`;
    let acc = 0;
    $("c-donut").style.background = "conic-gradient(" + SHARE.map(([, p, c]) => { const s = acc; acc += p; return `${c} ${s}% ${acc}%`; }).join(",") + ")";
    $("c-table").innerHTML = rows(SHARE.map(([n, p, c]) => [`${n} <small style="color:var(--muted)">(${p}%)</small>`, inr(total * p / 100), c]));
    $("c-mat").innerHTML = rows([
      ["Cement", fmt(built * 0.4) + " bags"],
      ["Sand", fmt(built * 1.816) + " cft"],
      ["Aggregate", fmt(built * 1.35) + " cft"],
      ["Steel", fmt(built * 4) + " kg"],
      ["Bricks", fmt(built * 8) + " nos"],
      ["Paint", fmt(built * 0.18) + " litres"],
      ["Flooring tiles", fmt(built * 1.3) + " sqft"],
    ]);
  }

  /* ---------- Concrete ---------- */
  function concrete() {
    const k = $("k-unit").value === "ft" ? M_PER_FT : 1;
    const wet = num("k-l") * k * num("k-w") * k * num("k-d") * k;
    const [c, s, a] = $("k-grade").value.split(",").map(Number), sum = c + s + a;
    const dry = wet * 1.54;
    const cem = dry * c / sum, sand = dry * s / sum, agg = dry * a / sum;
    const bags = cem / 0.035;
    $("k-cement").textContent = fmt(bags, 1) + " bags";
    $("k-table").innerHTML = rows([
      ["Wet volume", `${fmt(wet, 3)} m³ (${fmt(wet * FT3_PER_M3, 1)} cft)`],
      ["Dry volume", `${fmt(dry, 3)} m³`],
      ["Cement", `${fmt(bags * 50)} kg`],
      ["Sand", `${fmt(sand, 3)} m³ (${fmt(sand * FT3_PER_M3, 1)} cft)`],
      ["Aggregate", `${fmt(agg, 3)} m³ (${fmt(agg * FT3_PER_M3, 1)} cft)`],
      ["Water (w/c 0.5)", `${fmt(bags * 50 * 0.5)} litres`],
    ]);
  }

  /* ---------- Brick ---------- */
  function brick() {
    const k = $("b-unit").value === "ft" ? M_PER_FT : 1;
    const vol = num("b-l") * k * num("b-h") * k * +$("b-t").value;
    const n = vol / 0.002;
    const wetMortar = Math.max(0, vol - n * 0.19 * 0.09 * 0.09);
    const dryMortar = wetMortar * 1.33, r = +$("b-ratio").value;
    const cem = dryMortar / (1 + r), sand = dryMortar * r / (1 + r);
    $("b-count").textContent = fmt(Math.ceil(n * 1.05)) + " bricks";
    $("b-table").innerHTML = rows([
      ["Wall volume", `${fmt(vol, 3)} m³ (${fmt(vol * FT3_PER_M3, 1)} cft)`],
      ["Bricks (without wastage)", fmt(Math.ceil(n))],
      ["Mortar (dry)", `${fmt(dryMortar, 3)} m³`],
      ["Cement", `${fmt(cem / 0.035, 1)} bags`],
      ["Sand", `${fmt(sand, 3)} m³ (${fmt(sand * FT3_PER_M3, 1)} cft)`],
    ]);
  }

  /* ---------- Steel ---------- */
  function steel() {
    const d = +$("s-dia").value, perM = d * d / 162;
    const total = perM * num("s-len") * num("s-n"), rate = num("s-rate");
    $("s-total").textContent = fmt(total, 2) + " kg";
    $("s-table").innerHTML = rows([
      ["Weight per metre", fmt(perM, 3) + " kg/m"],
      ["Weight per bar", fmt(perM * num("s-len"), 2) + " kg"],
      ["Total length", fmt(num("s-len") * num("s-n"), 1) + " m"],
      ["In tonnes", fmt(total / 1000, 3) + " t"],
      ["Approx. cost", rate ? inr(total * rate) : "—"],
    ]);
  }
  $("s-std").innerHTML = rows([6, 8, 10, 12, 16, 20, 25, 32].map((d) => [`${d} mm`, `${fmt(d * d / 162, 3)} kg/m • ${fmt(d * d / 162 * 12, 2)} kg per 12 m bar`]));

  /* ---------- Tile ---------- */
  let lastSize = "";
  function tile() {
    const [a, b, perBox] = $("t-size").value.split(",").map(Number);
    if ($("t-size").value !== lastSize) { $("t-box").value = perBox; lastSize = $("t-size").value; }
    const area = num("t-l") * num("t-w"), w = num("t-waste");
    const tiles = Math.ceil(area * (1 + w / 100) / (a * b));
    const boxes = Math.ceil(tiles / Math.max(1, num("t-box")));
    $("t-count").textContent = fmt(tiles) + " tiles";
    $("t-table").innerHTML = rows([
      ["Floor area", `${fmt(area, 1)} sqft (${fmt(area / 10.7639, 2)} m²)`],
      ["Area incl. wastage", `${fmt(area * (1 + w / 100), 1)} sqft`],
      ["Tile size", `${a} × ${b} ft`],
      ["Boxes required", `${fmt(boxes)} boxes`],
      ["Tile adhesive (approx)", `${fmt(Math.ceil(area / 50))} bags (20 kg)`],
    ]);
  }

  /* ---------- Paint ---------- */
  function paint() {
    const L = num("p-l"), W = num("p-w"), H = num("p-h");
    let area = 2 * (L + W) * H - num("p-doors") * 21 - num("p-win") * 15;
    if ($("p-ceil").checked) area += L * W;
    area = Math.max(0, area);
    const coats = Math.max(1, num("p-coats"));
    const paintL = area * coats / 120;
    $("p-total").textContent = fmt(paintL, 1) + " litres";
    $("p-table").innerHTML = rows([
      ["Paintable area", `${fmt(area, 1)} sqft`],
      ["Primer (1 coat)", `${fmt(area / 100, 1)} litres`],
      ["Wall putty (2 coats)", `${fmt(area / 15, 1)} kg`],
      ["Paint coats", coats],
    ]);
  }

  /* ---------- Units ---------- */
  const UNITS = [
    ["Square Feet (sqft)", 1], ["Square Metre (m²)", 10.7639], ["Square Yard / Gaj", 9], ["Square Inch", 1 / 144],
    ["Acre", 43560], ["Hectare", 107639.104], ["Cent", 435.6], ["Guntha", 1089], ["Marla", 272.25], ["Kanal", 5445], ["Ground (TN)", 2400],
  ];
  $("u-from").innerHTML = UNITS.map(([n], i) => `<option value="${i}">${n}</option>`).join("");
  function units() {
    const sqft = num("u-val") * UNITS[+$("u-from").value][1];
    $("u-table").innerHTML = rows(UNITS.map(([n, f]) => {
      const v = sqft / f;
      return [n, v >= 1 ? fmt(v, v >= 1000 ? 0 : 3) : fmt(v, 6)];
    }));
  }

  const calcs = { cost, concrete, brick, steel, tile, paint, units };
  Object.entries(calcs).forEach(([name, fn]) => {
    const panel = $("panel-" + name);
    panel.addEventListener("input", fn);
    panel.addEventListener("change", fn);
    fn();
  });
})();
