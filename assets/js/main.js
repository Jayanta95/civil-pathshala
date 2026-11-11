/* =========================================================
   Civil Pathshala — Main Script
   Shared header/footer, animations, gallery, sliders, forms
   ========================================================= */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const page = document.body.dataset.page || "home";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const waLink = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

  const LOGO_SVG = `<svg viewBox="0 0 32 32" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15.5 16 4.5l13 11"/><path d="M6.5 13v14h19V13"/><path d="M13 27v-7h6v7"/><path d="M21 4.5v4"/></svg>`;
  window.CP_LOGO_SVG = LOGO_SVG;

  /* ---------------- Header / Drawer / Footer ---------------- */
  const NAV = [
    { href: "index.html", key: "home", label: "Home", icon: "fa-house" },
    {
      href: "designs.html", key: "designs", label: "House Designs", icon: "fa-building", dd: [
        { href: "designs.html?cat=elevation", label: "3D Front Elevation", icon: "fa-building" },
        { href: "designs.html?cat=duplex", label: "Duplex & Villa", icon: "fa-house-chimney" },
        { href: "designs.html?cat=floor-plan", label: "2D Floor Plans", icon: "fa-ruler-combined" },
        { href: "designs.html?cat=interior", label: "Interior Design", icon: "fa-couch" },
      ]
    },
    { href: "services.html", key: "services", label: "Services", icon: "fa-screwdriver-wrench" },
    { href: "calculators.html", key: "calculators", label: "Free Tools", icon: "fa-calculator" },
    { href: "videos.html", key: "videos", label: "Learn", icon: "fa-graduation-cap" },
    { href: "about.html", key: "about", label: "About", icon: "fa-circle-info" },
    { href: "contact.html", key: "contact", label: "Contact", icon: "fa-envelope" },
  ];

  const logoHTML = `<a href="index.html" class="logo" aria-label="${SITE.name} home"><span class="logo-mark"><img src="assets/img/logo.png" alt="Civil Pathshala logo" width="46" height="46"></span><span>Civil <b>Pathshala</b><small>${SITE.tagline}</small></span></a>`;

  function buildHeader() {
    const holder = $("#site-header");
    if (!holder) return;
    const links = NAV.map((n) => {
      const active = n.key === page ? "active" : "";
      if (!n.dd) return `<li><a href="${n.href}" class="${active}">${n.label}</a></li>`;
      return `<li class="has-dd"><a href="${n.href}" class="${active}">${n.label} <i class="fa-solid fa-chevron-down"></i></a>
        <div class="dropdown">${n.dd.map((d) => `<a href="${d.href}"><i class="fa-solid ${d.icon}"></i>${d.label}</a>`).join("")}</div></li>`;
    }).join("");

    holder.outerHTML = `
    <div class="scroll-progress" id="scrollProgress"></div>
    <div class="topbar"><div class="container">
      <div class="tb-left">
        <a href="tel:${SITE.phone.replace(/\s/g, "")}"><i class="fa-solid fa-phone"></i>${SITE.phone}</a>
        <a href="mailto:${SITE.email}" class="hide-md"><i class="fa-solid fa-envelope"></i>${SITE.email}</a>
        <span class="hide-md"><i class="fa-solid fa-location-dot"></i>Siliguri • Islampur (Uttar Dinajpur)</span>
      </div>
      <div class="tb-right">
        <a href="${SITE.youtube}" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        <a href="${SITE.social.instagram}" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="${SITE.social.facebook}" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      </div>
    </div></div>
    <header class="header" id="header"><div class="container nav">
      ${logoHTML}
      <ul class="nav-links">${links}</ul>
      <div class="nav-actions">
        <button class="icon-btn" id="themeToggle" data-theme-toggle aria-label="Toggle dark mode"><i class="fa-solid fa-moon"></i></button>
        <a class="icon-btn" href="designs.html?wishlist=1" aria-label="Wishlist"><i class="fa-regular fa-heart"></i><span class="count" id="wishCount" hidden>0</span></a>
        <a href="contact.html" class="btn btn-sm">Free Consultation <i class="fa-solid fa-arrow-right"></i></a>
        <button class="icon-btn burger" id="burger" aria-label="Open menu"><i class="fa-solid fa-bars-staggered"></i></button>
      </div>
    </div></header>
    <div class="drawer-overlay" id="drawerOverlay"></div>
    <aside class="drawer" id="drawer" aria-label="Mobile menu">
      <div class="drawer-head">${logoHTML}<button class="icon-btn" id="drawerClose" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button></div>
      <div class="drawer-tools">
        <button class="icon-btn" data-theme-toggle aria-label="Toggle dark mode"><i class="fa-solid fa-moon"></i></button>
        <a class="icon-btn" href="designs.html?wishlist=1"><i class="fa-regular fa-heart"></i> Wishlist <span class="wish-num"></span></a>
      </div>
      ${NAV.map((n) => `<a href="${n.href}" class="d-link ${n.key === page ? "active" : ""}"><i class="fa-solid ${n.icon}"></i>${n.label}</a>`).join("")}
      <a href="contact.html" class="btn">Get Free Consultation <i class="fa-solid fa-arrow-right"></i></a>
      <a href="${SITE.subscribeUrl}" target="_blank" rel="noopener" class="btn btn-yt"><i class="fa-brands fa-youtube"></i> Subscribe on YouTube</a>
      <div class="drawer-social socials">
        <a href="${SITE.social.facebook}" aria-label="Facebook" style="background:var(--soft);color:var(--text)"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="${SITE.social.instagram}" aria-label="Instagram" style="background:var(--soft);color:var(--text)"><i class="fa-brands fa-instagram"></i></a>
        <a href="${SITE.youtube}" aria-label="YouTube" style="background:var(--soft);color:var(--text)"><i class="fa-brands fa-youtube"></i></a>
        <a href="https://wa.me/${SITE.whatsapp}" aria-label="WhatsApp" style="background:var(--soft);color:var(--text)"><i class="fa-brands fa-whatsapp"></i></a>
      </div>
    </aside>`;
  }

  function buildFooter() {
    const holder = $("#site-footer");
    if (!holder) return;
    holder.outerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            ${logoHTML}
            <p>Civil Pathshala is an engineering consultancy led by ${SITE.founder}, ${SITE.founderTitle}. We plan, design and supervise better homes — and teach civil engineering for free on YouTube.</p>
            <div class="socials">
              <a href="${SITE.youtube}" class="yt" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
              <a href="${SITE.social.facebook}" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="${SITE.social.instagram}" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="${SITE.social.twitter}" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="${SITE.social.pinterest}" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
              <a href="https://wa.me/${SITE.whatsapp}" class="wa" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
          <div>
            <h4>Our Services</h4>
            <ul>
              <li><a href="services.html#floor-plan"><i class="fa-solid fa-chevron-right"></i>2D & 3D Floor Plan</a></li>
              <li><a href="services.html#elevation"><i class="fa-solid fa-chevron-right"></i>3D Exterior & Interior</a></li>
              <li><a href="services.html#structural"><i class="fa-solid fa-chevron-right"></i>Structural Drawing</a></li>
              <li><a href="services.html#estimate"><i class="fa-solid fa-chevron-right"></i>Estimation Details</a></li>
              <li><a href="services.html#landscape"><i class="fa-solid fa-chevron-right"></i>Landscape</a></li>
              <li><a href="services.html#approval"><i class="fa-solid fa-chevron-right"></i>Approval Plan</a></li>
              <li><a href="services.html#supervision"><i class="fa-solid fa-chevron-right"></i>Building Supervision</a></li>
              <li><a href="services.html#mep"><i class="fa-solid fa-chevron-right"></i>Elec. & Plumbing Drawing</a></li>
            </ul>
          </div>
          <div>
            <h4>Free Tools</h4>
            <ul>
              <li><a href="calculators.html#cost"><i class="fa-solid fa-chevron-right"></i>Construction Cost</a></li>
              <li><a href="calculators.html#concrete"><i class="fa-solid fa-chevron-right"></i>Concrete Calculator</a></li>
              <li><a href="calculators.html#brick"><i class="fa-solid fa-chevron-right"></i>Brick Calculator</a></li>
              <li><a href="calculators.html#steel"><i class="fa-solid fa-chevron-right"></i>Steel Weight</a></li>
              <li><a href="calculators.html#tile"><i class="fa-solid fa-chevron-right"></i>Tile Calculator</a></li>
              <li><a href="calculators.html#paint"><i class="fa-solid fa-chevron-right"></i>Paint Calculator</a></li>
            </ul>
          </div>
          <div>
            <h4>Get In Touch</h4>
            <ul class="f-contact">
              <li><i class="fa-solid fa-phone"></i><a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a></li>
              <li><i class="fa-solid fa-envelope"></i><a href="mailto:${SITE.email}">${SITE.email}</a></li>
              ${SITE.offices.map((o) => `<li><i class="fa-solid fa-location-dot"></i><span><b style="color:#fff;font-weight:500">${o.label}:</b> ${o.address}</span></li>`).join("")}
            </ul>
            <p style="margin-top:18px">Get new design ideas & video updates:</p>
            <form class="newsletter" id="newsletter">
              <input type="email" placeholder="Your email address" required aria-label="Email">
              <button type="submit" aria-label="Subscribe"><i class="fa-solid fa-paper-plane"></i></button>
            </form>
          </div>
        </div>
        <div class="big-word">CIVIL PATHSHALA</div>
        <div class="footer-bottom">
          <span>© <span id="year"></span> Civil Pathshala. All rights reserved.</span>
          <div class="fb-links"><a href="about.html">About</a><a href="contact.html">Contact</a><a href="#">Privacy Policy</a><a href="#">Terms</a></div>
        </div>
      </div>
    </footer>
    <div class="float-btns">
      <a href="${SITE.subscribeUrl}" class="fb-yt" target="_blank" rel="noopener" aria-label="Subscribe on YouTube"><i class="fa-brands fa-youtube"></i></a>
      <a href="https://wa.me/${SITE.whatsapp}" class="fb-wa" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      <button class="fb-top" id="toTop" aria-label="Back to top"><svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="25"/></svg><i class="fa-solid fa-arrow-up"></i></button>
    </div>
    <div class="toast" id="toast"><i class="fa-solid fa-circle-check"></i><span></span></div>
    <div class="modal" id="modal" aria-hidden="true"><div class="modal-backdrop" data-close></div><div class="modal-box"><button class="modal-close" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button><div class="modal-content"></div></div></div>`;
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  buildHeader();
  buildFooter();

  /* ---------------- Toast & Modal ---------------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.querySelector("span").textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }
  window.cpToast = toast;

  const modal = $("#modal");
  function openModal(html, cls = "") {
    if (!modal) return;
    modal.className = "modal open " + cls;
    modal.querySelector(".modal-content").innerHTML = html;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => { if (!modal.classList.contains("open")) modal.querySelector(".modal-content").innerHTML = ""; }, 400);
  }
  modal && modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });

  /* ---------------- Theme ---------------- */
  const themeBtns = $$("[data-theme-toggle]");
  function setThemeIcon() {
    const dark = document.documentElement.dataset.theme === "dark";
    themeBtns.forEach((b) => {
      b.innerHTML = `<i class="fa-solid ${dark ? "fa-sun" : "fa-moon"}"></i>` + (b.closest(".drawer") ? (dark ? " Light mode" : " Dark mode") : "");
    });
  }
  setThemeIcon();
  themeBtns.forEach((b) => b.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme === "dark";
    document.documentElement.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("cp-theme", dark ? "light" : "dark"); } catch (e) { }
    setThemeIcon();
  }));

  /* ---------------- Drawer ---------------- */
  const toggleDrawer = (open) => document.body.classList.toggle("drawer-open", open);
  $("#burger") && $("#burger").addEventListener("click", () => toggleDrawer(true));
  $("#drawerClose") && $("#drawerClose").addEventListener("click", () => toggleDrawer(false));
  $("#drawerOverlay") && $("#drawerOverlay").addEventListener("click", () => toggleDrawer(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { toggleDrawer(false); closeModal(); } });

  /* ---------------- Preloader ---------------- */
  window.addEventListener("load", () => {
    const pl = $(".preloader");
    if (pl) setTimeout(() => pl.classList.add("hide"), 350);
  });
  setTimeout(() => { const pl = $(".preloader"); pl && pl.classList.add("hide"); }, 4000);

  /* ---------------- Scroll effects ---------------- */
  const header = $("#header"), bar = $("#scrollProgress"), toTop = $("#toTop");
  const ring = toTop && toTop.querySelector("circle");
  function onScroll() {
    const st = window.scrollY;
    const h = document.documentElement.scrollHeight - innerHeight;
    const p = h > 0 ? st / h : 0;
    header && header.classList.toggle("scrolled", st > 20);
    if (bar) bar.style.width = p * 100 + "%";
    if (toTop) {
      toTop.classList.toggle("show", st > 500);
      ring.style.strokeDashoffset = 157 - 157 * p;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop && toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------- Reveal on scroll ---------------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const d = en.target.dataset.delay;
        if (d) en.target.style.transitionDelay = d + "ms";
        en.target.classList.add("in");
        revealIO.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  const observeReveals = (root = document) => $$("[data-reveal]:not(.in)", root).forEach((el) => revealIO.observe(el));
  observeReveals();

  /* ---------------- Counters ---------------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, target = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length;
      const suffix = el.dataset.suffix || "", dur = 2000, t0 = performance.now();
      const tick = (t) => {
        const k = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - k, 4);
        el.textContent = (target * eased).toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------------- Typing effect ---------------- */
  const typed = $(".typed");
  if (typed) {
    const words = JSON.parse(typed.dataset.words || "[]");
    let wi = 0, ci = 0, del = false;
    const loop = () => {
      const w = words[wi];
      typed.textContent = w.slice(0, ci);
      if (!del && ci < w.length) { ci++; setTimeout(loop, 85); }
      else if (!del) { del = true; setTimeout(loop, 1800); }
      else if (ci > 0) { ci--; setTimeout(loop, 40); }
      else { del = false; wi = (wi + 1) % words.length; setTimeout(loop, 300); }
    };
    words.length && loop();
  }

  /* ---------------- Hero particles ---------------- */
  const cv = $("#particles");
  if (cv && !reduceMotion) {
    const ctx = cv.getContext("2d");
    let W, H, pts = [], running = true;
    const resize = () => {
      W = cv.width = cv.offsetWidth * devicePixelRatio;
      H = cv.height = cv.offsetHeight * devicePixelRatio;
      const n = Math.min(70, Math.floor(cv.offsetWidth / 18));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4 * devicePixelRatio, vy: (Math.random() - .5) * .4 * devicePixelRatio }));
    };
    resize();
    addEventListener("resize", resize);
    new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) requestAnimationFrame(draw); }).observe(cv);
    const maxD = 130 * devicePixelRatio;
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.fillStyle = "rgba(255,155,60,.7)";
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < maxD) {
            ctx.strokeStyle = `rgba(255,255,255,${.12 * (1 - d / maxD)})`;
            ctx.lineWidth = devicePixelRatio;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
  }

  /* ---------------- Tilt ---------------- */
  if (matchMedia("(hover: hover)").matches && !reduceMotion) {
    $$("[data-tilt]").forEach((el) => {
      el.style.transition = "transform .3s ease-out";
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  /* ---------------- Image fallback ---------------- */
  const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a1931"/><stop offset="1" stop-color="#1d3a6b"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><g fill="none" stroke="#ff7b00" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"><path d="M130 160 200 100l70 60"/><path d="M148 146v64h104v-64"/><path d="M186 210v-36h28v36"/></g></svg>`);
  document.addEventListener("error", (e) => {
    const t = e.target;
    if (t.tagName === "IMG" && !t.dataset.fb) { t.dataset.fb = 1; t.src = FALLBACK; }
  }, true);

  /* ---------------- Floor plan blueprint generator ---------------- */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  let planUid = 0;
  function planSVG(d) {
    const [pw, pl] = d.plot.split("x").map(Number);
    const rand = rng(d.seed || d.id * 7);
    const s = Math.min(320 / pw, 210 / pl);
    const w = pw * s, h = pl * s, x0 = (400 - w) / 2, y0 = (300 - h) / 2 + 4;
    const leaves = [];
    (function split(r, depth) {
      if (depth <= 0 || (r.w < 60 && r.h < 60)) { leaves.push(r); return; }
      const vert = r.w > r.h * 1.1 ? true : r.h > r.w * 1.1 ? false : rand() > .5;
      const k = .36 + rand() * .28;
      let a, b;
      if (vert) { a = { x: r.x, y: r.y, w: r.w * k, h: r.h }; b = { x: r.x + a.w, y: r.y, w: r.w - a.w, h: r.h }; }
      else { a = { x: r.x, y: r.y, w: r.w, h: r.h * k }; b = { x: r.x, y: r.y + a.h, w: r.w, h: r.h - a.h }; }
      split(a, depth - 1 - (rand() < .22 ? 1 : 0));
      split(b, depth - 1 - (rand() < .22 ? 1 : 0));
    })({ x: x0, y: y0, w, h }, 3);

    const labels = ["Living Room", "Master Bed", "Kitchen", d.beds >= 2 ? "Bedroom 2" : "Study", "Dining", d.beds >= 3 ? "Bedroom 3" : "Parking", "Toilet", "Pooja", "Store", "Wash"];
    const sorted = [...leaves].sort((p, q) => q.w * q.h - p.w * p.h);
    const uid = "pg" + (++planUid);
    let rooms = "";
    sorted.forEach((r, i) => {
      const fs = Math.max(6, Math.min(11, r.w / 7.5, r.h / 3.2));
      const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
      const ft = `${Math.round(r.w / s)}'x${Math.round(r.h / s)}'`;
      rooms += `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="rgba(255,255,255,${i === 0 ? .06 : .02})" stroke="#e8f1ff" stroke-width="2"/>`;
      if (r.w > 34 && r.h > 34) rooms += `<path d="M${r.x + 6} ${r.y + r.h - 1} v-14 a14 14 0 0 1 14 14" fill="none" stroke="#ffc400" stroke-width="1"/>`;
      rooms += `<text x="${cx}" y="${cy - 1}" font-size="${fs}" fill="#fff" text-anchor="middle" font-weight="600">${labels[i] || "Room"}</text>`;
      rooms += `<text x="${cx}" y="${cy + fs + 1}" font-size="${fs * .8}" fill="#ffc400" text-anchor="middle">${ft}</text>`;
    });
    return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, sans-serif" role="img" aria-label="${d.title} floor plan">
      <defs><pattern id="${uid}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="rgba(255,255,255,.07)" stroke-width=".6"/></pattern></defs>
      <rect width="400" height="300" fill="#0b1f73"/><rect width="400" height="300" fill="url(#${uid})"/>
      ${rooms}
      <rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="4"/>
      <g stroke="#9fc3ff" stroke-width=".8" fill="#9fc3ff" font-size="8">
        <line x1="${x0}" y1="${y0 - 9}" x2="${x0 + w}" y2="${y0 - 9}"/><line x1="${x0}" y1="${y0 - 13}" x2="${x0}" y2="${y0 - 5}"/><line x1="${x0 + w}" y1="${y0 - 13}" x2="${x0 + w}" y2="${y0 - 5}"/>
        <text x="${x0 + w / 2}" y="${y0 - 12}" text-anchor="middle" stroke="none">${pw}'-0"</text>
        <line x1="${x0 - 9}" y1="${y0}" x2="${x0 - 9}" y2="${y0 + h}"/><line x1="${x0 - 13}" y1="${y0}" x2="${x0 - 5}" y2="${y0}"/><line x1="${x0 - 13}" y1="${y0 + h}" x2="${x0 - 5}" y2="${y0 + h}"/>
        <text x="${x0 - 12}" y="${y0 + h / 2}" text-anchor="middle" stroke="none" transform="rotate(-90 ${x0 - 12} ${y0 + h / 2})">${pl}'-0"</text>
      </g>
      <g transform="translate(378 22)"><circle r="11" fill="none" stroke="#ffc400" stroke-width="1"/><path d="M0 -9 L4 4 L0 1 L-4 4Z" fill="#ffc400"/><text y="-14" font-size="8" fill="#ffc400" text-anchor="middle">N</text></g>
      <text x="12" y="292" font-size="8" fill="rgba(255,255,255,.55)" letter-spacing="1.5">CIVIL PATHSHALA • ${d.plot} • ${d.facing.toUpperCase()} FACING</text>
    </svg>`;
  }
  window.cpPlanSVG = planSVG;

  /* ---------------- Wishlist ---------------- */
  let wish = [];
  try { wish = JSON.parse(localStorage.getItem("cp-wish") || "[]"); } catch (e) { }
  const saveWish = () => { try { localStorage.setItem("cp-wish", JSON.stringify(wish)); } catch (e) { } updateWishCount(); };
  function updateWishCount() {
    const c = $("#wishCount");
    if (!c) return;
    c.textContent = wish.length;
    c.hidden = !wish.length;
    $$(".wish-num").forEach((n) => (n.textContent = wish.length ? `(${wish.length})` : ""));
  }
  updateWishCount();
  function toggleWish(id) {
    const i = wish.indexOf(id);
    if (i > -1) { wish.splice(i, 1); toast("Removed from wishlist"); }
    else { wish.push(id); toast("Added to wishlist ❤"); }
    saveWish();
    $$(`[data-wish="${id}"]`).forEach((b) => {
      b.classList.toggle("liked", wish.includes(id));
      b.innerHTML = `<i class="fa-${wish.includes(id) ? "solid" : "regular"} fa-heart"></i>`;
    });
    document.dispatchEvent(new CustomEvent("wishchange"));
  }

  /* ---------------- Designs gallery ---------------- */
  const media = (d) => d.img ? `<img src="${d.img}" alt="${d.title}" loading="lazy">` : planSVG(d);
  const enquireMsg = (d) => `Hello Civil Pathshala, I'm interested in design CP-${String(d.id).padStart(3, "0")}: ${d.title} (${d.plot}). Please share details.`;

  function cardHTML(d, i) {
    const liked = wish.includes(d.id);
    return `<article class="design-card" style="animation-delay:${(i % 9) * 60}ms">
      <div class="dc-media" data-qv="${d.id}">
        ${media(d)}
        <span class="dc-badge">${d.tag}</span>
        <div class="dc-actions">
          <button data-wish="${d.id}" class="${liked ? "liked" : ""}" aria-label="Add to wishlist"><i class="fa-${liked ? "solid" : "regular"} fa-heart"></i></button>
          <button data-qv="${d.id}" aria-label="Quick view"><i class="fa-regular fa-eye"></i></button>
        </div>
        <span class="dc-view btn btn-sm btn-light">Quick View</span>
      </div>
      <div class="dc-body">
        <h3>${d.title}</h3>
        <div class="dc-meta">
          <span><i class="fa-solid fa-vector-square"></i>${d.plot} ft</span>
          <span><i class="fa-solid fa-maximize"></i>${d.area.toLocaleString("en-IN")} sqft</span>
          ${d.beds ? `<span><i class="fa-solid fa-bed"></i>${d.beds} Bed</span>` : ""}
          ${d.floors !== "—" ? `<span><i class="fa-solid fa-layer-group"></i>${d.floors}</span>` : `<span><i class="fa-solid fa-couch"></i>Interior</span>`}
        </div>
        <div class="dc-foot">
          <span class="from">Starting from<b>${inr(d.price)}</b></span>
          <a href="${waLink(enquireMsg(d))}" target="_blank" rel="noopener" class="btn btn-sm">Enquire <i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
    </article>`;
  }

  function quickView(id) {
    const d = DESIGNS.find((x) => x.id === id);
    if (!d) return;
    const liked = wish.includes(d.id);
    const desc = d.cat === "interior"
      ? `A thoughtfully planned ${CATEGORIES[d.cat].label.toLowerCase()} concept with balanced lighting, smart storage and a premium material palette. Customised to your room size and budget.`
      : `A practical, Vastu-friendly design for a ${d.plot} ft ${d.facing.toLowerCase()} facing plot with ${d.beds} bedroom${d.beds > 1 ? "s" : ""}. Includes ventilation-focused room placement and can be fully customised to your needs.`;
    openModal(`<div class="qv">
      <div class="qv-media">${media(d)}</div>
      <div class="qv-info">
        <span class="eyebrow">${CATEGORIES[d.cat].label}</span>
        <h3>${d.title}</h3>
        <p>${desc}</p>
        <div class="spec-list">
          <div>Design ID<b>CP-${String(d.id).padStart(3, "0")}</b></div>
          <div>Plot Size<b>${d.plot} ft</b></div>
          <div>Area<b>${d.area.toLocaleString("en-IN")} sqft</b></div>
          <div>Floors<b>${d.floors}</b></div>
          <div>Bedrooms<b>${d.beds || "—"}</b></div>
          <div>Facing<b>${d.facing}</b></div>
        </div>
        <div class="dc-foot" style="margin-bottom:20px"><span class="from">Starting from<b>${inr(d.price)}</b></span></div>
        <div class="qv-actions">
          <a href="${waLink(enquireMsg(d))}" target="_blank" rel="noopener" class="btn btn-wa"><i class="fa-brands fa-whatsapp"></i> Enquire on WhatsApp</a>
          <button class="btn btn-outline ${liked ? "liked" : ""}" data-wish="${d.id}" aria-label="Toggle wishlist"><i class="fa-${liked ? "solid" : "regular"} fa-heart"></i></button>
        </div>
      </div></div>`);
  }

  document.addEventListener("click", (e) => {
    const w = e.target.closest("[data-wish]");
    if (w) { e.stopPropagation(); toggleWish(+w.dataset.wish); return; }
    const q = e.target.closest("[data-qv]");
    if (q) quickView(+q.dataset.qv);
  });

  function initGallery(root) {
    const grid = $(".design-grid", root);
    const chipsWrap = $(".chips", root);
    const search = $(".search-box input", root);
    const moreBtn = $(".load-more", root);
    const full = root.dataset.mode === "full";
    const step = full ? 9 : 6;
    const params = new URLSearchParams(location.search);
    let cat = params.get("cat") || "all";
    let onlyWish = params.get("wishlist") === "1";
    let shown = step;
    if (!CATEGORIES[cat]) cat = "all";

    const cats = Object.keys(CATEGORIES);
    chipsWrap.innerHTML = cats.map((c) => `<button class="chip" data-cat="${c}"><i class="fa-solid ${CATEGORIES[c].icon}"></i>${CATEGORIES[c].label}</button>`).join("")
      + (full ? `<button class="chip" data-cat="wish"><i class="fa-solid fa-heart"></i>Wishlist</button>` : "");

    function list() {
      let l = DESIGNS.filter((d) => (onlyWish ? wish.includes(d.id) : cat === "all" || d.cat === cat));
      const q = search ? search.value.trim().toLowerCase() : "";
      if (q) l = l.filter((d) => `${d.title} ${d.plot} ${d.facing} ${d.cat} ${d.floors} ${d.beds}bhk`.toLowerCase().includes(q));
      return l;
    }
    function render() {
      $$(".chip", chipsWrap).forEach((c) => c.classList.toggle("active", onlyWish ? c.dataset.cat === "wish" : c.dataset.cat === cat));
      const l = list();
      grid.innerHTML = l.length ? l.slice(0, shown).map(cardHTML).join("")
        : `<div class="empty-state"><i class="fa-regular fa-folder-open"></i><h3>No designs found</h3><p>${onlyWish ? "Your wishlist is empty — tap the ♡ on any design to save it." : "Try another search or category."}</p></div>`;
      if (moreBtn) moreBtn.style.display = full && l.length > shown ? "" : "none";
      const count = $(".result-count", root);
      if (count) count.textContent = `Showing ${Math.min(shown, l.length)} of ${l.length} designs`;
    }
    chipsWrap.addEventListener("click", (e) => {
      const c = e.target.closest(".chip");
      if (!c) return;
      onlyWish = c.dataset.cat === "wish";
      if (!onlyWish) cat = c.dataset.cat;
      shown = step;
      render();
    });
    search && search.addEventListener("input", () => { shown = step; render(); });
    moreBtn && moreBtn.addEventListener("click", () => { shown += step; render(); });
    document.addEventListener("wishchange", () => { if (onlyWish) render(); });
    render();
  }
  $$(".gallery").forEach(initGallery);

  /* ---------------- Videos ---------------- */
  function videoCard(v) {
    if (v.id) {
      return `<a href="https://www.youtube.com/watch?v=${v.id}" class="video-card" data-video="${v.id}">
        <div class="vc-thumb has-img"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy"><span class="play-btn"><i class="fa-solid fa-play"></i></span></div>
        <div class="vc-body"><h4>${v.title}</h4><span><i class="fa-brands fa-youtube"></i>${v.topic} • Civil Pathshala</span></div></a>`;
    }
    return `<a href="${SITE.youtube}" target="_blank" rel="noopener" class="video-card">
      <div class="vc-thumb"><div class="vc-art" style="background:radial-gradient(circle at 80% 20%, ${v.c2}, transparent 60%), linear-gradient(135deg, ${v.c1}, ${v.c2})"></div>
        <i class="fa-solid ${v.icon}" style="position:absolute;right:18px;bottom:14px;font-size:3.6rem;opacity:.18"></i>
        <div class="vc-title"><small>${v.topic}</small>${v.title}</div><span class="play-btn"><i class="fa-solid fa-play"></i></span></div>
      <div class="vc-body"><h4>${v.title}</h4><span><i class="fa-brands fa-youtube"></i>Watch on Civil Pathshala</span></div></a>`;
  }
  $$("[data-videos]").forEach((g) => {
    const lim = +g.dataset.videos || VIDEOS.length;
    g.innerHTML = VIDEOS.slice(0, lim).map(videoCard).join("");
  });
  document.addEventListener("click", (e) => {
    const v = e.target.closest("[data-video]");
    if (!v) return;
    e.preventDefault();
    openModal(`<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.video}?autoplay=1&rel=0" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`, "video-modal");
  });

  /* ---------------- Testimonials slider ---------------- */
  $$(".testi-wrap").forEach((wrap) => {
    const track = $(".testi-track", wrap), slides = $$(".testi-slide", track);
    const dotsWrap = $(".dots-nav", wrap.parentElement);
    let idx = 0, timer;
    const per = () => (innerWidth <= 640 ? 1 : innerWidth <= 991 ? 2 : 3);
    const maxIdx = () => Math.max(0, slides.length - per());
    function go(i) {
      idx = i > maxIdx() ? 0 : i < 0 ? maxIdx() : i;
      track.style.transform = `translateX(-${idx * (100 / per())}%)`;
      $$("button", dotsWrap).forEach((d, k) => d.classList.toggle("active", k === idx));
    }
    function buildDots() {
      dotsWrap.innerHTML = Array.from({ length: maxIdx() + 1 }, (_, k) => `<button aria-label="Slide ${k + 1}"></button>`).join("");
      $$("button", dotsWrap).forEach((d, k) => d.addEventListener("click", () => { go(k); restart(); }));
      go(Math.min(idx, maxIdx()));
    }
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(idx + 1), 5000); };
    const nav = wrap.parentElement;
    $(".prev", nav) && $(".prev", nav).addEventListener("click", () => { go(idx - 1); restart(); });
    $(".next", nav) && $(".next", nav).addEventListener("click", () => { go(idx + 1); restart(); });
    let sx = 0;
    track.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) { go(idx + (dx < 0 ? 1 : -1)); restart(); }
    });
    wrap.addEventListener("mouseenter", () => clearInterval(timer));
    wrap.addEventListener("mouseleave", restart);
    addEventListener("resize", buildDots);
    buildDots();
    restart();
  });

  /* ---------------- FAQ ---------------- */
  $$(".faq-item").forEach((item) => {
    const q = $(".faq-q", item), a = $(".faq-a", item);
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      $$(".faq-item.open", item.parentElement).forEach((o) => { o.classList.remove("open"); $(".faq-a", o).style.maxHeight = null; });
      if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });
  const firstFaq = $(".faq-item.open .faq-a");
  if (firstFaq) firstFaq.style.maxHeight = firstFaq.scrollHeight + "px";

  /* ---------------- Quick cost estimator (home) ---------------- */
  const est = $("#estimator");
  if (est) {
    const area = $("#estArea", est), out = $("#estAreaOut", est);
    const RATES = { basic: 1700, standard: 2100, premium: 2700 };
    const SPLIT = [["Cement", 16], ["Steel", 24], ["Sand & Aggregate", 20], ["Finishing (tiles, paint, doors)", 22], ["Plumbing & Electrical", 18]];
    const calc = () => {
      const a = +area.value, fl = +$("input[name=estFloors]:checked", est).value, q = $("input[name=estQuality]:checked", est).value;
      out.textContent = a.toLocaleString("en-IN") + " sqft";
      const total = a * fl * RATES[q];
      $("#estTotal").textContent = inr(total);
      $("#estRate").textContent = `${(a * fl).toLocaleString("en-IN")} sqft built-up × ${inr(RATES[q])}/sqft`;
      $("#estBreak").innerHTML = SPLIT.map(([n, p]) => `<div><div class="row"><span>${n}</span><b>${inr(total * p / 100)}</b></div><div class="bar"><span style="width:0" data-w="${p * 3.2}%"></span></div></div>`).join("");
      requestAnimationFrame(() => setTimeout(() => $$("#estBreak .bar span").forEach((b) => (b.style.width = b.dataset.w)), 30));
    };
    est.addEventListener("input", calc);
    calc();
  }

  /* ---------------- Forms → WhatsApp ---------------- */
  $$("form[data-wa-form]").forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(f);
      const lines = [];
      fd.forEach((v, k) => { if (String(v).trim()) lines.push(`${k}: ${v}`); });
      const msg = "Hello Civil Pathshala! New enquiry from the website:\n" + lines.join("\n");
      window.open(waLink(msg), "_blank", "noopener");
      toast("Thank you! Opening WhatsApp to send your enquiry…");
      f.reset();
    });
  });
  const nl = $("#newsletter");
  nl && nl.addEventListener("submit", (e) => { e.preventDefault(); nl.reset(); toast("Subscribed! Thanks for joining Civil Pathshala 🎉"); });

  /* ---------------- Fill site info placeholders ---------------- */
  $$("[data-site]").forEach((el) => {
    const k = el.dataset.site;
    if (k === "phone") { el.textContent = SITE.phone; if (el.tagName === "A") el.href = "tel:" + SITE.phone.replace(/\s/g, ""); }
    else if (k === "email") { el.textContent = SITE.email; if (el.tagName === "A") el.href = "mailto:" + SITE.email; }
    else if (k === "whatsapp") { el.href = "https://wa.me/" + SITE.whatsapp; }
    else if (k === "youtube") { el.href = SITE.youtube; }
    else if (k === "subscribe") { el.href = SITE.subscribeUrl; }
    else if (k === "address") { el.textContent = SITE.address; }
    else if (k === "founder") { el.textContent = SITE.founder; }
    else if (k === "hours") { el.innerHTML = SITE.hours.map(([d, t]) => `<li><span>${d}</span><b>${t}</b></li>`).join(""); }
    else if (k === "map") { el.src = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=12&output=embed`; }
  });

  observeReveals();
})();
