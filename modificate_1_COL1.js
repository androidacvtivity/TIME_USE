// Autosumă COL1 pentru capitolul 10004 — optimizată (incremental, fără normalizări)
(() => {
  const CAP = "10004";
  const TOTAL_ID = "102_10004_111507_Total_1"; // ajustează dacă e alt ID
  const ID_PREFIX = `102_${CAP}_`;
  const ID_SUFFIX = `_1`;

  // dacă vrei actualizare doar la pierderea focusului, pune 'change'
  const EVENT_NAME = 'change'; // 'input' sau 'change'

  let sum = 0;

  // Filtre rapide
  const isTotalId = (id) => id.includes("_Total_") || /(^|[_-])TOT([_-]|$)/i.test(id);
  const isTargetId = (id) => id.startsWith(ID_PREFIX) && id.endsWith(ID_SUFFIX) && !isTotalId(id);

  // Citire întregi (fără normalizări)
  const toInt = (v) => {
    const s = (v ?? "").trim();
    if (s === "") return 0;
    const n = parseInt(s, 10);
    return Number.isFinite(n) ? n : 0;
  };

  // Setează totalul o singură operație DOM
  const setTotal = () => {
    const totalEl = document.getElementById(TOTAL_ID);
    if (totalEl) {
      totalEl.readOnly = true;
      totalEl.value = (sum === 0 ? "" : String(sum));
    }
  };

  // Înregistrează un input în sumă (o singură dată)
  const register = (el) => {
    if (!el || el.dataset.c10004Bound === "1" || el.disabled || el.readOnly) return;
    const v = toInt(el.value);
    el.dataset.prev = v;              // memorăm ultima valoare
    el.dataset.c10004Bound = "1";     // marcare pentru a nu-l reînregistra
    sum += v;
  };

  // Scan inițială — o singură dată
  const initialScan = () => {
    const nodes = document.querySelectorAll(
      `input[id^="${ID_PREFIX}"][id$="${ID_SUFFIX}"]:not([type="button"])`
    );
    nodes.forEach((el) => {
      if (isTotalId(el.id)) return;
      register(el);
    });
    setTotal();
  };

  // Update incremental pe un singur câmp
  const onFieldEvent = (el) => {
    if (!isTargetId(el.id) || el.disabled || el.readOnly) return;

    // primul contact cu elementul (poate fi dinamic)
    if (el.dataset.c10004Bound !== "1") {
      register(el);
      setTotal();
      return;
    }

    const prev = toInt(el.dataset.prev);
    const now  = toInt(el.value);
    if (prev === now) return;

    sum += (now - prev);
    el.dataset.prev = now;
    setTotal();
  };

  // Delegare de evenimente (un singur listener global)
  document.addEventListener(EVENT_NAME, (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    onFieldEvent(el);
  }, true);

  // Interceptare rânduri dinamice (fără rescanări globale)
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes && m.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;

        // Dacă însuși nodul e un input țintă
        if (node.matches?.(`input[id^="${ID_PREFIX}"][id$="${ID_SUFFIX}"]`) && !isTotalId(node.id)) {
          register(node);
          setTotal();
        }

        // Dacă are descendenți input țintă
        const inputs = node.querySelectorAll?.(`input[id^="${ID_PREFIX}"][id$="${ID_SUFFIX}"]`);
        inputs && inputs.forEach((el) => {
          if (!isTotalId(el.id)) {
            register(el);
            setTotal();
          }
        });
      });
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  // Start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialScan);
  } else {
    initialScan();
  }
})();
