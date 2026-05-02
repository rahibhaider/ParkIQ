// Centralized app styles so components can focus on behavior and markup.
export const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #ffffff;
    --paper: rgba(248, 250, 252, .96);
    --card: rgba(255, 255, 255, .98);
    --ink: #0f172a;
    --muted: #475569;
    --line: #cbd5e1;
    --brand: #0f766e;
    --brand-dark: #115e59;
    --logo-start: #0f766e;
    --logo-end: #115e59;
    --button-bg: #0f766e;
    --button-hover: #149487;
    --button-soft: #f8fafc;
    --button-soft-hover: #ecfdf5;
    --button-text: #ffffff;
    --brand-soft: #ecfdf5;
    --placeholder: #64748b;
    --info: #0f766e;
    --green: #166534;
    --red: #b91c1c;
    --success-text: #166534;
    --danger-text: #b91c1c;
    --success-soft: #f0fdf4;
    --success-line: #86efac;
    --danger-soft: #fef2f2;
    --danger-line: #fca5a5;
    --progress-track: #cbd5e1;
    --shadow: 0 14px 34px rgba(15, 23, 42, 0.14);
    --nav-bg: rgba(255, 255, 255, .96);
    --hero-bg: linear-gradient(135deg, rgba(236, 253, 245, .98), rgba(255, 255, 255, .97));
    --parking-art-opacity: .38;
    --parking-overlay: rgba(255, 255, 255, .58);
    --parking-overlay-mid: rgba(255, 255, 255, .34);
    --parking-overlay-end: rgba(255, 255, 255, .16);
    --edge: rgba(15, 23, 42, .08);
    --edge-strong: rgba(15, 23, 42, .14);
    --shadow-soft: 0 10px 26px rgba(15, 23, 42, .09);
    --shadow-lift: 0 18px 40px rgba(15, 23, 42, .14);
    --ring: rgba(15, 118, 110, .16);
    --surface-glow: rgba(255, 255, 255, .26);
    --surface-glow-soft: rgba(255, 255, 255, .22);
    --field-bg: rgba(255, 255, 255, .72);
    --field-bg-strong: rgba(255, 255, 255, .88);
    --raised-soft: rgba(255, 255, 255, .74);
    --field-shadow: 0 10px 22px rgba(15, 23, 42, .07);
    --field-inset: inset 0 1px 0 rgba(255, 255, 255, .38);
  }

  [data-theme="dark"] {
    --bg: #071019;
    --paper: rgba(11, 19, 30, .97);
    --card: rgba(14, 24, 36, .94);
    --ink: #e8f1f7;
    --muted: #8ca0b3;
    --line: #213347;
    --brand: #63e6cf;
    --brand-dark: #dffbf4;
    --logo-start: #12b5a6;
    --logo-end: #0d6d67;
    --button-bg: #11867d;
    --button-hover: #17a095;
    --button-soft: rgba(18, 29, 42, .88);
    --button-soft-hover: rgba(24, 41, 57, .96);
    --button-text: #f7fffd;
    --brand-soft: rgba(27, 184, 163, .14);
    --placeholder: #6f8498;
    --info: #86e7f5;
    --green: #79e0af;
    --red: #f2a4a8;
    --success-text: #d3fae6;
    --danger-text: #ffd8db;
    --success-soft: rgba(18, 75, 53, .38);
    --success-line: rgba(90, 223, 157, .28);
    --danger-soft: rgba(114, 29, 40, .34);
    --danger-line: rgba(242, 126, 137, .28);
    --progress-track: #162638;
    --shadow: 0 24px 54px rgba(0, 0, 0, .46);
    --nav-bg: rgba(6, 13, 22, .86);
    --hero-bg: linear-gradient(145deg, rgba(10, 28, 43, .96), rgba(8, 16, 27, .98) 55%, rgba(5, 11, 20, .99));
    --parking-art-opacity: .24;
    --parking-overlay: rgba(5, 11, 20, .88);
    --parking-overlay-mid: rgba(6, 13, 22, .76);
    --parking-overlay-end: rgba(8, 16, 27, .5);
    --edge: rgba(128, 154, 181, .1);
    --edge-strong: rgba(128, 154, 181, .18);
    --shadow-soft: 0 16px 30px rgba(0, 0, 0, .26);
    --shadow-lift: 0 28px 56px rgba(0, 0, 0, .42);
    --ring: rgba(99, 230, 207, .18);
    --surface-glow: rgba(117, 169, 219, .05);
    --surface-glow-soft: rgba(117, 169, 219, .035);
    --field-bg: rgba(9, 18, 29, .92);
    --field-bg-strong: rgba(13, 24, 37, .98);
    --raised-soft: rgba(12, 21, 33, .9);
    --field-shadow: 0 14px 28px rgba(0, 0, 0, .24);
    --field-inset: inset 0 1px 0 rgba(148, 163, 184, .04);
  }

  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; }
  html { width: 100%; overflow-x: hidden; }
  body {
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    color: var(--ink);
    font-family: 'Public Sans', sans-serif;
    background:
      radial-gradient(circle at top left, rgba(17, 134, 125, .12), transparent 28%),
      radial-gradient(circle at top right, rgba(38, 99, 235, .08), transparent 24%),
      var(--bg);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  body::before {
    content: "";
    position: fixed;
    inset: 64px 0 0 0;
    pointer-events: none;
    z-index: -1;
    opacity: var(--parking-art-opacity);
    background-image: var(--parking-bg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  body::after {
    content: "";
    position: fixed;
    inset: 64px 0 0 0;
    pointer-events: none;
    z-index: -1;
    background: linear-gradient(90deg, var(--parking-overlay) 0%, var(--parking-overlay-mid) 52%, var(--parking-overlay-end) 100%);
  }
  button, input, select { font: inherit; color: inherit; }
  button { border: 0; }
  button, a, input, select { max-width: 100%; }
  ::selection {
    background: rgba(15, 118, 110, .18);
    color: var(--ink);
  }
  :focus-visible {
    outline: 0;
    box-shadow: 0 0 0 4px var(--ring);
  }

  .display { font-family: 'Public Sans', sans-serif; letter-spacing: 0; }
  .mono { font-family: 'Public Sans', sans-serif; font-variant-numeric: tabular-nums; }
  main { min-height: calc(100vh - 64px); }
  .page { width: min(100%, 1320px); min-height: calc(100vh - 64px); margin: 0 auto; padding: .75rem 1.25rem; }
  .narrow-page { width: min(100%, 980px); min-height: calc(100vh - 64px); margin: 0 auto; padding: 1.6rem 2rem; }
  .shell {
    background:
      linear-gradient(180deg, var(--surface-glow), transparent),
      var(--hero-bg);
    border: 1px solid var(--edge-strong);
    box-shadow: var(--shadow-lift);
    backdrop-filter: blur(10px);
    overflow: hidden;
  }
  .card {
    background:
      linear-gradient(180deg, var(--surface-glow-soft), transparent),
      var(--card);
    border: 1px solid var(--edge);
    border-radius: 18px;
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(8px);
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
  }
  .section-title { font-size: clamp(1.85rem, 3.1vw, 2.7rem); line-height: 1.04; color: var(--ink); }
  .eyebrow { color: var(--brand); font-size: .76rem; font-weight: 800; text-transform: uppercase; letter-spacing: .14em; }
  .muted { color: var(--muted); }
  .divider { height: 1px; background: var(--line); }

  .btn-p, .btn-s, .btn-d {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .35rem;
    min-height: 38px;
    border-radius: 12px;
    padding: .58rem .92rem;
    font-weight: 800;
    font-size: .88rem;
    line-height: 1.1;
    letter-spacing: -.01em;
    cursor: pointer;
    white-space: nowrap;
    transition: transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease;
  }
  .btn-p {
    background: linear-gradient(180deg, rgba(255, 255, 255, .08), rgba(255, 255, 255, 0)), var(--button-bg);
    color: var(--button-text);
    box-shadow: 0 10px 22px rgba(15, 118, 110, .14);
    border: 1px solid rgba(255, 255, 255, .08);
  }
  .btn-p:hover {
    background: linear-gradient(180deg, rgba(255, 255, 255, .1), rgba(255, 255, 255, 0)), var(--button-hover);
    transform: translateY(-1px);
    box-shadow: 0 14px 24px rgba(15, 118, 110, .18);
  }
  .btn-s {
    background: var(--button-soft);
    color: var(--ink);
    border: 1px solid var(--edge-strong);
    box-shadow: 0 6px 14px rgba(15, 23, 42, .04);
  }
  .btn-s:hover {
    background: var(--button-soft-hover);
    transform: translateY(-1px);
    border-color: rgba(15, 118, 110, .22);
  }
  .btn-d {
    background: var(--danger-soft);
    color: var(--danger-text);
    border: 1px solid var(--danger-line);
    box-shadow: 0 6px 14px rgba(185, 28, 28, .06);
  }
  .btn-d:hover {
    background: color-mix(in srgb, var(--danger-soft) 82%, var(--danger-line));
    transform: translateY(-1px);
    border-color: var(--danger-line);
  }

  .inp {
    width: 100%;
    border: 1px solid var(--edge-strong);
    background: var(--field-bg);
    color: var(--ink);
    border-radius: 12px;
    padding: .85rem 1rem;
    outline: none;
    box-shadow: var(--field-inset), var(--field-shadow);
    transition: border .18s ease, box-shadow .18s ease, background .18s ease, transform .18s ease;
  }
  .inp:hover { border-color: var(--line); }
  .inp:focus { border-color: var(--brand); box-shadow: var(--field-inset), 0 0 0 4px var(--ring), var(--field-shadow); background: var(--field-bg-strong); }
  .inp::placeholder { color: var(--placeholder); }
  .inp::-webkit-calendar-picker-indicator { opacity: .75; }
  select.inp {
    appearance: none;
    cursor: pointer;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--ink);
    -webkit-box-shadow: 0 0 0 1000px var(--field-bg-strong) inset;
    transition: background-color 9999s ease-out 0s;
  }

  .search-box {
    width: 100%;
    display: flex;
    align-items: center;
    gap: .55rem;
    padding: .6rem .85rem;
    border: 1px solid var(--edge-strong);
    border-radius: 999px;
    background: var(--field-bg);
    color: var(--ink);
    box-shadow: var(--field-inset), var(--field-shadow);
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  }
  .search-box:focus-within { border-color: var(--brand); background: var(--field-bg-strong); box-shadow: var(--field-inset), 0 0 0 4px var(--ring), var(--field-shadow); }
  .search-box svg { flex: 0 0 auto; color: var(--muted); }
  .search-box input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--ink);
    font-size: .9rem;
  }
  .search-box input::placeholder { color: var(--placeholder); }
  .search-wrap {
    position: relative;
    width: min(34vw, 320px);
    min-width: 210px;
  }
  .search-suggestions {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    z-index: 30;
    display: grid;
    gap: 4px;
    padding: 6px;
    border: 1px solid var(--edge-strong);
    border-radius: 14px;
    background: var(--card);
    box-shadow: var(--shadow-lift);
  }
  .suggestion-btn {
    width: 100%;
    display: grid;
    gap: 2px;
    padding: .72rem .8rem;
    border-radius: 10px;
    background: transparent;
    color: var(--ink);
    text-align: left;
    cursor: pointer;
  }
  .suggestion-btn:hover {
    background: var(--brand-soft);
  }
  .suggestion-btn strong {
    font-size: .9rem;
    line-height: 1.2;
  }
  .suggestion-btn span {
    color: var(--muted);
    font-size: .78rem;
    line-height: 1.35;
  }

  .grid-loc { display: grid; grid-template-columns: repeat(auto-fit, minmax(235px, 1fr)); gap: .85rem; }
  .grid-stat { display: grid; grid-template-columns: repeat(3, 1fr); gap: .85rem; }
  .grid-slots { display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: .75rem; }
  .stat {
    padding: .9rem 1rem;
    border-radius: 18px;
    background:
      linear-gradient(180deg, var(--surface-glow-soft), transparent),
      var(--card);
    border: 1px solid var(--edge);
    box-shadow: var(--shadow-soft);
  }
  .animated-cards {
    overflow: hidden;
    border-radius: 18px;
    margin: .7rem 0 .85rem;
    border: 1px solid var(--edge);
    background: var(--card);
    box-shadow: var(--shadow-soft);
  }
  .motion-track {
    display: flex;
    width: 500%;
    animation: slideCards 18s ease-in-out infinite;
  }
  .motion-card {
    position: relative;
    width: 20%;
    min-height: 118px;
    padding: 1rem 1.1rem;
    overflow: hidden;
    background: transparent;
    border: 0;
    box-shadow: none;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: .9rem;
  }
  .motion-card::after {
    content: "";
    position: absolute;
    right: -26px;
    top: -26px;
    width: 82px;
    height: 82px;
    border-radius: 999px;
    background: var(--brand-soft);
    opacity: .9;
  }
  .motion-icon {
    width: 54px;
    height: 54px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--logo-start), var(--logo-end));
    color: #ffffff;
    border: 1px solid var(--line);
    font-weight: 900;
    font-size: 1.45rem;
    box-shadow: 0 12px 22px rgba(15, 118, 110, .22);
    position: relative;
    z-index: 1;
  }
  .motion-card h3 { font-size: 1.08rem; margin-bottom: .28rem; position: relative; z-index: 1; }
  .motion-card p { font-size: .88rem; line-height: 1.45; position: relative; z-index: 1; }
  .challan-checker {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    margin: 0 0 .85rem;
    border-radius: 16px;
    background:
      linear-gradient(180deg, var(--surface-glow-soft), transparent),
      var(--card);
    border: 1px solid var(--edge);
    box-shadow: var(--shadow-soft);
  }
  .challan-form {
    display: grid;
    grid-template-columns: minmax(180px, 1fr) auto;
    gap: .7rem;
    align-items: center;
    min-width: min(100%, 420px);
  }
  .challan-result {
    min-width: 260px;
    padding: .85rem;
    border-radius: 14px;
    background: var(--brand-soft);
    border: 1px solid var(--line);
  }
  .challan-result strong { display: block; margin-bottom: .25rem; }
  .challan-result span { display: block; color: var(--muted); font-size: .86rem; line-height: 1.45; }
  @keyframes slideCards {
    0%, 14% { transform: translateX(0); }
    20%, 34% { transform: translateX(-20%); }
    40%, 54% { transform: translateX(-40%); }
    60%, 74% { transform: translateX(-60%); }
    80%, 94% { transform: translateX(-80%); }
    100% { transform: translateX(0); }
  }

  .slot-av, .slot-bk {
    border-radius: 12px;
    padding: .85rem 0;
    text-align: center;
    user-select: none;
    border: 1px solid;
    transition: transform .18s ease, box-shadow .18s ease;
  }
  .slot-av { background: var(--success-soft); border-color: var(--success-line); color: var(--success-text); cursor: pointer; }
  .slot-av:hover { transform: translateY(-2px); box-shadow: 0 10px 18px rgba(21, 128, 61, .12); }
  .slot-bk { background: var(--danger-soft); border-color: var(--danger-line); color: var(--danger-text); cursor: not-allowed; opacity: .72; }

  .badge-ok, .badge-can, .badge-soft {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: .24rem .62rem;
    font-size: .7rem;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .badge-ok { color: var(--success-text); background: var(--success-soft); border: 1px solid var(--success-line); }
  .badge-can { color: var(--danger-text); background: var(--danger-soft); border: 1px solid var(--danger-line); }
  .badge-soft { color: var(--brand); background: var(--brand-soft); border: 1px solid var(--line); }

  .tab { padding: .9rem 1rem; cursor: pointer; color: var(--muted); font-weight: 800; border-bottom: 2px solid transparent; transition: color .18s ease, border-color .18s ease; }
  .tab-a { color: var(--brand); border-color: var(--brand); }
  .admin-page { padding-bottom: 2rem; }
  .admin-shell {
    display: grid;
    grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
    gap: 1rem;
    margin-top: 1.25rem;
    align-items: start;
  }
  .admin-sidebar {
    position: sticky;
    top: 84px;
    padding: .95rem;
    display: grid;
    gap: .85rem;
  }
  .admin-sidebar-head {
    display: grid;
    gap: .2rem;
    padding: .35rem .2rem .1rem;
  }
  .admin-sidebar-head strong {
    font-size: 1.02rem;
    line-height: 1.2;
  }
  .admin-sidebar-list {
    display: grid;
    gap: .45rem;
  }
  .admin-nav-item {
    width: 100%;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: .8rem;
    align-items: start;
    padding: .8rem .85rem;
    border-radius: 14px;
    background: transparent;
    color: var(--ink);
    border: 1px solid transparent;
    cursor: pointer;
    text-align: left;
    transition: background .18s ease, border-color .18s ease, transform .18s ease;
  }
  .admin-nav-item:hover {
    background: var(--brand-soft);
    border-color: var(--edge-strong);
    transform: translateX(2px);
  }
  .admin-nav-item-a {
    background: linear-gradient(135deg, rgba(15, 118, 110, .14), rgba(15, 118, 110, .04));
    border-color: rgba(15, 118, 110, .24);
  }
  .admin-nav-index {
    min-width: 34px;
    padding-top: .05rem;
    color: var(--brand);
    font-size: .74rem;
    font-weight: 900;
    letter-spacing: .12em;
  }
  .admin-nav-copy {
    display: grid;
    gap: .18rem;
  }
  .admin-nav-copy strong {
    font-size: .98rem;
    line-height: 1.2;
  }
  .admin-nav-copy small {
    color: var(--muted);
    font-size: .8rem;
    line-height: 1.35;
  }
  .admin-main {
    display: grid;
    gap: 1rem;
    min-width: 0;
  }
  .admin-panel-head {
    padding: 1.15rem 1.2rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: start;
    flex-wrap: wrap;
  }
  .admin-panel-meta {
    display: flex;
    gap: .55rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .admin-action-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: stretch;
  }
  .admin-pill {
    min-height: 38px;
    min-width: 88px;
    justify-content: center;
    text-align: center;
  }
  .admin-pill-btn {
    flex: 0 0 88px;
  }
  .admin-content {
    display: grid;
    gap: .9rem;
    min-width: 0;
  }
  .admin-summary-card {
    padding: 1.15rem 1.2rem;
  }
  .nav-left { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .quick-nav {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 4px;
    border: 1px solid var(--edge-strong);
    border-radius: 999px;
    background: var(--raised-soft);
    box-shadow: var(--field-inset), var(--field-shadow);
  }
  .quick-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: .52rem .85rem;
    border-radius: 999px;
    background: transparent;
    color: var(--ink);
    cursor: pointer;
    font-size: .84rem;
    font-weight: 800;
  }
  .quick-link:hover { background: var(--brand-soft); color: var(--brand-dark); }
  .card:hover {
    border-color: var(--edge-strong);
    box-shadow: var(--shadow-lift);
  }
  button.card:hover {
    transform: translateY(-3px);
  }
  .footer {
    margin-top: 2rem;
    background: var(--card);
    border-top: 1px solid var(--line);
    box-shadow: 0 -14px 34px rgba(15, 23, 42, .08);
  }
  .footer-inner { width: min(100%, 1320px); margin: 0 auto; padding: 2rem 1.25rem; }
  .faq-section { padding-bottom: 2rem; }
  .faq-list { display: grid; gap: .75rem; margin-top: 1.2rem; }
  .faq-item {
    border-radius: 12px;
    background: var(--paper);
    border: 1px solid var(--edge);
    overflow: hidden;
    transition: border-color .18s ease, transform .18s ease, background .18s ease;
  }
  .faq-item:hover { border-color: var(--edge-strong); background: var(--card); transform: translateY(-1px); }
  .faq-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.1rem;
    background: transparent;
    color: var(--ink);
    font-weight: 800;
    text-align: left;
    cursor: pointer;
  }
  .faq-row > span:first-child {
    min-width: 0;
    flex: 1 1 auto;
    line-height: 1.35;
  }
  .faq-row > span:last-child {
    flex: 0 0 2rem;
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: var(--field-bg);
    color: var(--ink);
    font-size: 1.15rem;
    line-height: 1;
  }
  .faq-answer {
    padding: 0 1.1rem 1rem;
    color: var(--muted);
    display: grid;
    gap: .35rem;
    font-size: .9rem;
    font-weight: 600;
    line-height: 1.45;
  }
  .faq-answer span {
    display: flex;
    align-items: flex-start;
    gap: .45rem;
  }
  .faq-answer span::before {
    content: "";
    flex: 0 0 .42rem;
    width: .42rem;
    height: .42rem;
    margin-top: .45rem;
    border-radius: 999px;
    background: var(--brand);
  }
  .footer-grid { display: grid; grid-template-columns: 1.1fr 1fr 1fr; gap: 2rem; align-items: start; }
  .footer-list { list-style: none; padding: 0; display: grid; gap: .65rem; color: var(--muted); font-weight: 600; font-size: .9rem; }
  .about-points { display: grid; gap: .5rem; margin-top: .85rem; color: var(--muted); font-size: .9rem; font-weight: 600; line-height: 1.45; }
  .about-points span::before { content: "- "; color: var(--brand); font-weight: 900; }
  .reach-us { margin-top: 1.8rem; display: grid; gap: 1rem; max-width: 620px; }
  .reach-row { display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: .8rem; align-items: start; color: var(--ink); }
  .reach-icon {
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    border-radius: 7px;
    background: var(--ink);
    color: var(--bg);
    font-size: .78rem;
    font-weight: 900;
  }
  .reach-row p { line-height: 1.55; }
  .reach-row strong { font-weight: 900; }
  .footer-social { display: flex; gap: .7rem; margin-top: 1rem; }
  .social-dot {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: var(--raised-soft);
    border: 1px solid var(--edge);
    color: var(--ink);
    cursor: pointer;
    transition: transform .18s ease, background .18s ease, border-color .18s ease;
  }
  .social-dot:hover { transform: translateY(-2px); background: var(--brand-soft); border-color: var(--edge-strong); }
  .social-dot svg { width: 18px; height: 18px; fill: currentColor; }
  .app-strip {
    margin-top: 1.6rem;
    min-height: 260px;
    padding: 2rem 2.2rem 1.8rem;
    border-radius: 0;
    border: 0;
    background: linear-gradient(110deg, #f8fffd 0%, #ddf8f1 50%, #b9ecdf 100%);
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, .78fr);
    gap: 2rem;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
  [data-theme="dark"] .app-strip { background: linear-gradient(110deg, #0a1722 0%, #102b35 52%, #0f4c53 100%); }
  [data-theme="dark"] .store-pill {
    background: rgba(6, 14, 23, .82);
    border: 1px solid rgba(148, 163, 184, .16);
    box-shadow: 0 14px 28px rgba(0, 0, 0, .22);
  }
  .download-copy { position: relative; z-index: 2; max-width: 620px; }
  .download-stats { display: flex; gap: 1.2rem; flex-wrap: wrap; margin-top: 1.2rem; }
  .download-stat { min-width: 110px; padding-right: 1.1rem; border-right: 1px solid var(--line); }
  .download-stat:last-child { border-right: 0; }
  .download-stat strong { display: block; font-size: 1.05rem; color: var(--ink); }
  .download-stat span { display: block; margin-top: .15rem; color: var(--muted); font-size: .72rem; font-weight: 700; }
  .store-row { display: flex; gap: .7rem; flex-wrap: wrap; margin-top: 1rem; }
  .store-pill {
    display: inline-flex;
    align-items: center;
    gap: .45rem;
    border-radius: 10px;
    background: #0f172a;
    color: #ffffff;
    padding: .48rem .72rem;
    font-weight: 900;
    font-size: .78rem;
    box-shadow: 0 12px 24px rgba(15, 23, 42, .16);
  }
  .store-pill small { display: block; font-size: .46rem; font-weight: 700; opacity: .82; line-height: 1; }
  .store-mark {
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 12px solid #22c55e;
  }
  .store-apple {
    width: 14px;
    height: 16px;
    border-radius: 50% 50% 45% 45%;
    background: #ffffff;
    display: inline-block;
  }
  .phone-stack { min-height: 300px; display: flex; gap: 2rem; align-items: end; justify-content: center; align-self: end; }
  .phone-card {
    width: 150px;
    aspect-ratio: 9 / 16;
    border-radius: 26px;
    background: #070b12;
    border: 4px solid #171717;
    box-shadow: 0 24px 40px rgba(15, 23, 42, .28);
    position: relative;
    overflow: hidden;
    transform: rotate(-2deg) translateY(10px);
  }
  .phone-card.phone-card-alt { width: 178px; transform: rotate(1deg) translateY(12px); }
  .phone-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 62px;
    height: 18px;
    border-radius: 0 0 12px 12px;
    background: #050505;
    transform: translateX(-50%);
    z-index: 2;
  }
  .phone-card::after {
    content: "";
    position: absolute;
    inset: 5px;
    border-radius: 21px;
    border: 1px solid rgba(255, 255, 255, .18);
    pointer-events: none;
    z-index: 3;
  }
  .phone-screen {
    position: absolute;
    inset: 6px;
    border-radius: 21px;
    padding: 1.35rem .55rem .55rem;
    background: #ffffff;
    color: #0f172a;
    overflow: hidden;
  }
  .phone-status { position: absolute; top: 8px; right: 10px; color: #64748b; font-size: .48rem; font-weight: 900; z-index: 4; }
  .phone-menu-top { display: flex; justify-content: space-between; align-items: center; gap: .5rem; font-size: .74rem; font-weight: 900; line-height: 1; }
  .phone-menu-top > span:last-child { flex: 0 0 auto; }
  .phone-search { margin-top: .75rem; border: 1px solid #e5e7eb; border-radius: 7px; padding: .45rem; color: #cbd5e1; font-size: .48rem; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .phone-section-title { margin-top: 1rem; font-size: .62rem; font-weight: 900; }
  .phone-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: .55rem .35rem; margin-top: .5rem; }
  .phone-app { display: grid; justify-items: center; gap: .18rem; font-size: .42rem; font-weight: 800; text-align: center; line-height: 1.1; }
  .phone-app-icon {
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center;
    border-radius: 9px;
    background: #ede9fe;
    color: #6d28d9;
    font-size: .62rem;
    box-shadow: 0 5px 10px rgba(109, 40, 217, .16);
  }
  [data-theme="dark"] .phone-app-icon {
    background: #dffaf4;
    color: #0f766e;
    box-shadow: 0 5px 10px rgba(15, 118, 110, .14);
  }
  .phone-info-cards { display: grid; grid-template-columns: 1fr 1fr; gap: .42rem; margin-top: .55rem; }
  .phone-info-card { min-height: 46px; border-radius: 8px; padding: .4rem; color: #ffffff; font-size: .52rem; font-weight: 900; line-height: 1.1; }
  .simple-phone-screen { display: grid; gap: .7rem; align-content: start; }
  .simple-phone-header { display: flex; align-items: center; justify-content: space-between; gap: .5rem; font-size: .64rem; font-weight: 900; line-height: 1; }
  .simple-phone-title { padding: .55rem; border: 1px solid #e5e7eb; border-radius: 12px; font-size: .72rem; font-weight: 900; line-height: 1.2; }
  .simple-phone-art {
    height: 70px;
    border-radius: 14px;
    background:
      radial-gradient(circle at 30% 35%, #6d28d9 0 8px, transparent 9px),
      linear-gradient(135deg, #eef2ff, #f8fafc);
    border: 1px solid #e5e7eb;
  }
  [data-theme="dark"] .simple-phone-art {
    background:
      radial-gradient(circle at 30% 35%, #0f766e 0 8px, transparent 9px),
      linear-gradient(135deg, #ecfeff, #f8fafc);
  }
  .simple-parking-card {
    border-radius: 14px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 10px 20px rgba(15, 23, 42, .12);
    padding: .65rem;
  }
  .simple-parking-card strong { display: block; font-size: .72rem; line-height: 1.2; }
  .simple-parking-card span { display: block; margin-top: .18rem; color: #64748b; font-size: .52rem; line-height: 1.35; }
  .simple-phone-actions { display: flex; align-items: center; justify-content: space-between; gap: .5rem; margin-top: .65rem; }
  .phone-price { font-size: .66rem; font-weight: 900; }
  .phone-book { border-radius: 8px; background: #6d28d9; color: #fff; padding: .48rem .62rem; font-size: .52rem; font-weight: 900; white-space: nowrap; }
  [data-theme="dark"] .phone-book { background: #0f8f86; }
  [data-theme="dark"] .phone-screen { background: #0b1622; color: #e8f1f7; }
  [data-theme="dark"] .phone-status { color: #8ca0b3; }
  [data-theme="dark"] .phone-search {
    border-color: #233649;
    background: #0d1c2b;
    color: #6f8498;
  }
  [data-theme="dark"] .simple-phone-title {
    border-color: #233649;
    background: #0d1c2b;
    color: #e8f1f7;
  }
  [data-theme="dark"] .simple-parking-card {
    background: #102130;
    border-color: #233649;
    box-shadow: 0 12px 22px rgba(0, 0, 0, .24);
  }
  [data-theme="dark"] .simple-parking-card span { color: #8ca0b3; }
  .copyright { background: var(--brand-dark); color: #ffffff; text-align: center; padding: 1rem; font-size: .86rem; }
  .fade { animation: fadeIn .34s ease both; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  @media (min-width: 1180px) {
    .page { padding: 1rem 2rem; }
    .grid-loc { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .grid-stat { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (max-width: 1024px) {
    body::before, body::after { inset-top: 92px; }
    nav > div {
      padding: .75rem 1rem !important;
      align-items: flex-start !important;
    }
    .nav-left {
      width: 100%;
      justify-content: space-between;
    }
    .search-wrap {
      width: min(46vw, 360px);
    }
    .shell {
      grid-template-columns: minmax(0, 1fr) minmax(220px, .72fr) !important;
    }
    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }
    .app-strip {
      grid-template-columns: minmax(0, 1fr);
    }
    .phone-stack {
      min-height: 250px;
    }
  }

  @media (max-width: 860px) {
    .page, .narrow-page { padding: 1.25rem 1rem; }
    .shell { grid-template-columns: 1fr !important; }
    .grid-stat { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .admin-shell {
      grid-template-columns: 1fr;
    }
    .admin-sidebar {
      position: static;
    }
    .admin-sidebar-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .admin-panel-head {
      padding: 1rem;
    }
    .challan-checker {
      grid-template-columns: 1fr;
      align-items: stretch;
    }
    .challan-form {
      grid-template-columns: minmax(0, 1fr) auto;
      min-width: 0;
    }
    .challan-result { min-width: 0; }
    .footer-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 720px) {
    body::before, body::after { inset-top: 156px; }
    main { min-height: calc(100vh - 140px); }
    nav { position: sticky; }
    nav > div {
      min-height: 0 !important;
      gap: .7rem !important;
      padding: .7rem .9rem !important;
    }
    .page, .narrow-page {
      min-height: auto;
      padding: 1rem .85rem;
    }
    .card, .shell, .stat, .animated-cards, .challan-checker {
      border-radius: 12px !important;
    }
    .section-title { font-size: clamp(1.9rem, 9vw, 2.45rem); }
    .shell { grid-template-columns: 1fr !important; }
    .grid-stat { grid-template-columns: 1fr; }
    .grid-loc { grid-template-columns: 1fr; }
    .grid-slots { grid-template-columns: repeat(auto-fill, minmax(58px, 1fr)); gap: .55rem; }
    .slot-av, .slot-bk { padding: .72rem 0; border-radius: 10px; }
    .motion-card { min-height: 132px; }
    .motion-icon { width: 46px; height: 46px; border-radius: 12px; font-size: 1.2rem; }
    .admin-sidebar-list {
      grid-template-columns: 1fr;
    }
    .admin-nav-item {
      padding: .72rem .78rem;
    }
    .challan-checker, .challan-form { grid-template-columns: 1fr; }
    .challan-result { min-width: 0; }
    .btn-p, .btn-s, .btn-d {
      min-height: 42px;
      padding: .68rem .9rem;
      white-space: normal;
    }
    .nav-left { gap: .65rem; }
    .nav-actions { gap: 6px !important; }
    .nav-actions .btn-s, .nav-actions .btn-p { padding: .58rem .75rem; font-size: .82rem; }
    .search-wrap { order: 3; width: 100%; min-width: 100%; }
    .quick-nav { width: 100%; order: 2; justify-content: space-between; }
    .quick-link { padding: .38rem .5rem; font-size: .78rem; }
    .footer-grid, .app-strip { grid-template-columns: 1fr; }
    .app-strip { min-height: auto; padding: 1.2rem .95rem; gap: 1rem; }
    .download-stats { gap: .7rem; }
    .download-stat { flex: 1 1 96px; min-width: 0; padding-right: .7rem; }
    .footer-inner { padding: 1.5rem .9rem; }
    .faq-row { padding: .9rem; align-items: flex-start; }
    .faq-answer { padding: 0 .9rem .9rem; }
    .phone-stack { display: none; }
  }

  @media (max-width: 520px) {
    body::before, body::after { inset-top: 190px; }
    nav > div {
      padding-inline: .75rem !important;
    }
    .nav-left > button:first-child {
      min-width: 0;
    }
    .nav-left > button:first-child span:last-child {
      font-size: 1.08rem !important;
    }
    .quick-link {
      flex: 1 1 0;
      min-width: 0;
      font-size: .72rem;
      padding: .42rem .3rem;
    }
    .nav-actions {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .nav-actions > span {
      flex: 1 1 100%;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .nav-actions .btn-s, .nav-actions .btn-p {
      flex: 1 1 auto;
    }
    .search-box {
      border-radius: 12px;
    }
    .search-suggestions {
      position: static;
      margin-top: .5rem;
    }
    .motion-card {
      grid-template-columns: 1fr;
      align-items: start;
      gap: .55rem;
      min-height: 170px;
      padding: .9rem;
    }
    .motion-card::after { width: 64px; height: 64px; }
    .challan-checker { padding: .85rem; }
    .store-pill { flex: 1 1 138px; justify-content: center; }
    .footer-social { flex-wrap: wrap; }
  }

  @media (max-width: 380px) {
    .page, .narrow-page { padding-inline: .65rem; }
    .section-title { font-size: 1.8rem; }
    .quick-link { font-size: .68rem; }
    .btn-p, .btn-s, .btn-d { width: 100%; }
    .nav-actions .btn-s, .nav-actions .btn-p { width: auto; }
    .grid-slots { grid-template-columns: repeat(auto-fill, minmax(52px, 1fr)); }
    .download-stat { flex-basis: 100%; border-right: 0; border-bottom: 1px solid var(--line); padding-bottom: .6rem; }
    .download-stat:last-child { border-bottom: 0; }
  }
`;

