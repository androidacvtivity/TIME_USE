// Autosumă COL1..COL10 pentru capitolul 10004 — optimizată (incremental)
(() => {
    const CAP = "10004";
    const TOTAL_MDID = "111507";           // ← schimbă dacă Total are alt MDID
    const MAX_COL = 10;                    // calculăm pentru coloanele 1..10
    const ID_PREFIX = `102_${CAP}_`;
    const EVENT_NAME = "change";           // 'change' = performant; pune 'input' dacă vrei live

    // Sume pe coloane (indexate 1..10)
    const sums = Array.from({ length: MAX_COL + 1 }, () => 0);

    // Helpers
    const isTotalId = (id) => id.includes("_Total_") || /(^|[_-])TOT([_-]|$)/i.test(id);

    const getColFromId = (id) => {
        // extrage sufixul _<col> (la final)
        const m = id.match(/_(\d{1,2})$/);
        if (!m) return 0;
        const c = parseInt(m[1], 10);
        return c >= 1 && c <= MAX_COL ? c : 0;
    };

    const isTargetInput = (el) =>
        el instanceof HTMLInputElement &&
        !el.disabled &&
        !el.readOnly &&
        el.id.startsWith(ID_PREFIX) &&
        !isTotalId(el.id) &&
        getColFromId(el.id) > 0;

    const toInt = (v) => {
        const s = (v ?? "").trim();
        if (s === "") return 0;
        const n = parseInt(s, 10);
        return Number.isFinite(n) ? n : 0;
    };

    const totalIdForCol = (col) => `102_${CAP}_${TOTAL_MDID}_Total_${col}`;

    const setTotal = (col) => {
        const totalEl = document.getElementById(totalIdForCol(col));
        if (totalEl) {
            totalEl.readOnly = true;
            const val = sums[col];
            totalEl.value = (val === 0 ? "" : String(val));
        }
    };

    // Înregistrează un input într-o singură coloană (o singură dată)
    const register = (el) => {
        if (!isTargetInput(el) || el.dataset.c10004Bound === "1") return;
        const col = getColFromId(el.id);
        const v = toInt(el.value);
        el.dataset.prev = String(v);
        el.dataset.c10004Bound = "1";
        sums[col] += v;
    };

    // Scan inițial (o singură dată)
    const initialScan = () => {
        const nodes = document.querySelectorAll(`input[id^="${ID_PREFIX}"]:not([type="button"])`);
        nodes.forEach((el) => register(el));
        for (let c = 1; c <= MAX_COL; c++) setTotal(c);
    };

    // Update incremental pentru un singur câmp
    const onFieldEvent = (el) => {
        if (!isTargetInput(el)) return;

        // dacă e nou (dinamic) – îl înregistrăm și setăm totalul coloanei
        if (el.dataset.c10004Bound !== "1") {
            register(el);
            setTotal(getColFromId(el.id));
            return;
        }

        const col = getColFromId(el.id);
        const prev = toInt(el.dataset.prev);
        const now = toInt(el.value);
        if (prev === now) return;

        sums[col] += (now - prev);
        el.dataset.prev = String(now);
        setTotal(col);
    };

    // Delegare globală — un singur listener
    document.addEventListener(EVENT_NAME, (e) => {
        const el = e.target;
        if (el instanceof HTMLInputElement) onFieldEvent(el);
    }, true);

    // Interceptează rânduri dinamice (fără rescanări globale)
    const mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
            m.addedNodes && m.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;

                // dacă nodul adăugat este chiar un input țintă
                if (node.matches?.(`input[id^="${ID_PREFIX}"]`) && node instanceof HTMLInputElement) {
                    if (isTargetInput(node)) {
                        const before = getColFromId(node.id);
                        register(node);
                        if (before) setTotal(before);
                    }
                }

                // dacă are descendenți input țintă
                const inputs = node.querySelectorAll?.(`input[id^="${ID_PREFIX}"]`);
                inputs && inputs.forEach((el) => {
                    if (isTargetInput(el)) {
                        const before = getColFromId(el.id);
                        register(el);
                        if (before) setTotal(before);
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
