/* ═══════════════════════════════════════
   JS – ContainerGo-SNP Gantt Tracker v3
   Admin + Read-only + Drag/Resize
   ═══════════════════════════════════════ */

// ─── Admin Password (hardcoded) ───
const ADMIN_PASSWORD = 'admin@2026';

// ─── Configuration ───
const CFG = {
    projectStart: new Date('2026-02-11'),
    projectEnd: new Date('2026-03-31'),
    holidayStart: new Date('2026-02-14'),
    holidayEnd: new Date('2026-02-22'),
    dayWidth: 42,
    rowHeight: 44,
    storageKey: 'cogo_snp_gantt_v3',
    ghSettingsKey: 'cogo_snp_gantt_gh',
};

// ─── Milestones ───
const MILESTONES = [
    { id: 'M0', name: 'Spec & Security Freeze', date: '2026-02-13' },
    { id: 'M1', name: 'Dev Complete', date: '2026-03-13' },
    { id: 'M2', name: 'Integration Sign-off', date: '2026-03-20' },
    { id: 'M3', name: 'UAT Sign-off', date: '2026-03-27' },
    { id: 'M4', name: 'Go-live', date: '2026-03-31' },
];

// ─── Default Task Data ───
const DEFAULT_TASKS = [
    { type: 'phase', label: 'Phase 0 – Trước Tết (11/02 → 13/02)' },
    { id: 'P0-01', name: 'Kickoff + thống nhất phạm vi', owner: 'Joint', start: '2026-02-11', end: '2026-02-11', deliverable: 'Biên bản kickoff + scope confirm', dependency: '', critical: true },
    { id: 'P0-02', name: 'Chốt danh sách API trong scope', owner: 'Joint', start: '2026-02-11', end: '2026-02-12', deliverable: 'API list final (7 API + webhook)', dependency: 'P0-01', critical: true },
    { id: 'P0-03', name: 'Chốt field bắt buộc & mapping dữ liệu', owner: 'Joint', start: '2026-02-11', end: '2026-02-13', deliverable: 'Field mapping table v1.0', dependency: 'P0-02', critical: true },
    { id: 'P0-04', name: 'Chốt Error Code Catalog', owner: 'SNP', start: '2026-02-12', end: '2026-02-13', deliverable: 'Error code catalog v1.0', dependency: 'P0-02', critical: true },
    { id: 'P0-05', name: 'Chốt Webhook contract (GateIn/GateOut)', owner: 'Joint', start: '2026-02-12', end: '2026-02-13', deliverable: 'Webhook spec + retry rule', dependency: 'P0-02', critical: true },
    { id: 'P0-06', name: 'Security review – chốt yêu cầu', owner: 'Joint', start: '2026-02-11', end: '2026-02-13', deliverable: 'Security freeze (auth, token, IP, signature)', dependency: 'P0-01', critical: true },
    { type: 'milestone', id: 'M0', label: '◆ M0 – Spec & Security Freeze – 13/02/2026', date: '2026-02-13' },
    { type: 'phase', label: '🎉 NGHỈ TẾT ÂM LỊCH (14/02 → 22/02)' },
    { type: 'phase', label: 'Phase 1A – SNP Phát triển API (23/02 → 13/03)' },
    { id: 'P1-SNP-01', name: 'API Xác thực mã chủ hàng', owner: 'SNP', start: '2026-02-23', end: '2026-02-25', deliverable: 'Endpoint + validation rules', dependency: 'M0', critical: true },
    { id: 'P1-SNP-02', name: 'API Kiểm tra trạng thái cont (READY)', owner: 'SNP', start: '2026-02-23', end: '2026-02-28', deliverable: 'Endpoint + logic READY + error codes', dependency: 'M0', critical: true },
    { id: 'P1-SNP-03', name: 'API Check-in hộ', owner: 'SNP', start: '2026-02-26', end: '2026-03-04', deliverable: 'Endpoint nhận CheckinId + trả result', dependency: 'P1-SNP-01', critical: true },
    { id: 'P1-SNP-04', name: 'API Update Check-in hộ', owner: 'SNP', start: '2026-03-03', end: '2026-03-06', deliverable: 'Endpoint update theo CheckinId', dependency: 'P1-SNP-03', critical: true },
    { id: 'P1-SNP-05', name: 'API kiểm tra GateIn/GateOut', owner: 'SNP', start: '2026-03-05', end: '2026-03-09', deliverable: 'Endpoint query gate status', dependency: 'P1-SNP-03', critical: false },
    { id: 'P1-SNP-06', name: 'Webhook GateIn/GateOut + retry', owner: 'SNP', start: '2026-03-05', end: '2026-03-13', deliverable: 'Webhook caller + retry + logging', dependency: 'P0-05', critical: true },
    { type: 'phase', label: 'Phase 1B – CoGo Tích hợp (23/02 → 13/03)' },
    { id: 'P1-COGO-01', name: 'Xây module gọi API SNP + auth', owner: 'CoGo', start: '2026-02-23', end: '2026-02-27', deliverable: 'API client module + token handling', dependency: 'M0', critical: true },
    { id: 'P1-COGO-02', name: 'Tích hợp Container READY check', owner: 'CoGo', start: '2026-02-26', end: '2026-03-03', deliverable: 'READY gating logic + UI mapping', dependency: 'P1-COGO-01, P1-SNP-02', critical: true },
    { id: 'P1-COGO-03', name: 'Tích hợp Check-in hộ', owner: 'CoGo', start: '2026-03-03', end: '2026-03-07', deliverable: 'Create CheckinId + call SNP', dependency: 'P1-SNP-03', critical: true },
    { id: 'P1-COGO-04', name: 'Tích hợp Update Check-in', owner: 'CoGo', start: '2026-03-06', end: '2026-03-10', deliverable: 'Update flow + validation UI', dependency: 'P1-SNP-04', critical: true },
    { id: 'P1-COGO-05', name: 'Xây Webhook Receiver', owner: 'CoGo', start: '2026-03-06', end: '2026-03-11', deliverable: 'Endpoint nhận webhook + ACK + store', dependency: 'P1-SNP-06', critical: true },
    { id: 'P1-COGO-06', name: 'Logging/Monitoring cơ bản', owner: 'CoGo', start: '2026-03-09', end: '2026-03-13', deliverable: 'Log request/response + dashboard', dependency: 'P1-COGO-01', critical: false },
    { type: 'milestone', id: 'M1', label: '◆ M1 – Dev Complete – 13/03/2026', date: '2026-03-13' },
    { type: 'phase', label: 'Phase 2 – Integration Test (16/03 → 20/03)' },
    { id: 'P2-01', name: 'Chuẩn bị dữ liệu test + accounts', owner: 'Joint', start: '2026-03-16', end: '2026-03-16', deliverable: 'Test data pack', dependency: 'M1', critical: true },
    { id: 'P2-02', name: 'Test luồng Container READY', owner: 'Joint', start: '2026-03-16', end: '2026-03-17', deliverable: 'Test report READY', dependency: 'P2-01', critical: true },
    { id: 'P2-03', name: 'Test Check-in hộ + Update', owner: 'Joint', start: '2026-03-17', end: '2026-03-18', deliverable: 'Test report check-in/update', dependency: 'P2-01', critical: true },
    { id: 'P2-04', name: 'Test webhook GateIn/GateOut + retry', owner: 'Joint', start: '2026-03-18', end: '2026-03-20', deliverable: 'Webhook stability report', dependency: 'P2-01', critical: true },
    { type: 'milestone', id: 'M2', label: '◆ M2 – Integration Sign-off – 20/03/2026', date: '2026-03-20' },
    { type: 'phase', label: 'Phase 3 – UAT Nội bộ CoGo (23/03 → 27/03)' },
    { id: 'P3-01', name: 'UAT vận hành end-to-end', owner: 'CoGo', start: '2026-03-23', end: '2026-03-25', deliverable: 'UAT report + issues list', dependency: 'M2', critical: true },
    { id: 'P3-02', name: 'Fix bug P1/P2 + retest', owner: 'CoGo', start: '2026-03-25', end: '2026-03-27', deliverable: 'Bug closure report', dependency: 'P3-01', critical: true },
    { type: 'milestone', id: 'M3', label: '◆ M3 – UAT Sign-off – 27/03/2026', date: '2026-03-27' },
    { type: 'phase', label: 'Phase 4 – Go-Live (30/03 → 31/03)' },
    { id: 'P4-01', name: 'Cấu hình production + verify endpoint', owner: 'Joint', start: '2026-03-30', end: '2026-03-30', deliverable: 'Production config checklist', dependency: 'M3', critical: true },
    { id: 'P4-02', name: 'Go-live + monitoring 48h', owner: 'Joint', start: '2026-03-31', end: '2026-03-31', deliverable: 'Go-live confirmation + hypercare plan', dependency: 'P4-01', critical: true },
    { type: 'milestone', id: 'M4', label: '◆ M4 – Go-live – 31/03/2026', date: '2026-03-31' },
];

// ─── Helpers ───
const daysBetween = (a, b) => Math.round((b - a) / 864e5);
const fmtDate = d => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
const fmtDateFull = d => `${fmtDate(d)}/${d.getFullYear()}`;
const fmtISO = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const parseDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

function generateDates(start, end) {
    const dates = [];
    const cur = new Date(start);
    while (cur <= end) { dates.push(new Date(cur)); cur.setDate(cur.getDate() + 1); }
    return dates;
}

// ─── State ───
let tasks = [];
let isAdmin = false;
let activeFilter = 'all';
let currentModalId = null;
let undoHistory = [];
let isDirty = false;
const MAX_UNDO = 30;

// DOM
const $ = id => document.getElementById(id);
const $milestonesTrack = $('milestones-track');
const $filters = $('filters');
const $taskCount = $('task-count');
const $sidebarBody = $('sidebar-body');
const $timelineHeader = $('timeline-header');
const $timelineBody = $('timeline-body');
const $holidayOverlay = $('holiday-overlay');
const $todayMarker = $('today-marker');
const $tooltip = $('tooltip');
const $modalBackdrop = $('modal-backdrop');
const $adminModalBackdrop = $('admin-modal-backdrop');
const $addTaskBackdrop = $('add-task-backdrop');
const $githubModalBackdrop = $('github-modal-backdrop');

const allDates = generateDates(CFG.projectStart, CFG.projectEnd);
const totalDays = allDates.length;

// ═══════════════════════
// INIT
// ═══════════════════════
async function init() {
    await loadTasks();
    renderMilestones();
    renderDateHeader();
    renderOverlays();
    renderGantt();
    bindEvents();
    updateAdminUI();
}

async function loadTasks() {
    // Try GitHub first
    const ghData = await loadFromGitHub();
    if (ghData) {
        tasks = ghData;
        saveTasks(false); // cache locally without marking dirty
        return;
    }
    // Fallback to localStorage
    const saved = localStorage.getItem(CFG.storageKey);
    if (saved) {
        tasks = JSON.parse(saved);
    } else {
        tasks = DEFAULT_TASKS.map(row => row.type ? { ...row } : { ...row, status: 'Planned', progress: 0 });
    }
}

function saveTasks(markAsDirty = true) {
    localStorage.setItem(CFG.storageKey, JSON.stringify(tasks));
    if (markAsDirty) {
        isDirty = true;
        updateDirtyUI();
    }
}

function pushUndo() {
    undoHistory.push(JSON.stringify(tasks));
    if (undoHistory.length > MAX_UNDO) undoHistory.shift();
    updateUndoUI();
}

function undo() {
    if (!undoHistory.length) return;
    tasks = JSON.parse(undoHistory.pop());
    saveTasks();
    renderGantt();
    renderMilestones();
    updateUndoUI();
}

function updateUndoUI() {
    const btn = $('btn-undo');
    btn.disabled = undoHistory.length === 0;
}

function updateDirtyUI() {
    const btn = $('btn-save-github');
    if (isDirty) {
        btn.classList.add('has-changes');
        btn.textContent = '☁️ Lưu lên GitHub (•)';
    } else {
        btn.classList.remove('has-changes');
        btn.textContent = '☁️ Lưu lên GitHub';
    }
}

// ═══════════════════════
// ADMIN
// ═══════════════════════
function updateAdminUI() {
    const lbl = $('admin-label');
    const btn = $('admin-toggle');
    const adminEls = ['btn-add-task', 'btn-download-template', 'btn-import-json', 'btn-undo', 'btn-save-github', 'btn-github-settings'];

    if (isAdmin) {
        lbl.textContent = 'Admin ✓';
        btn.classList.add('active');
        btn.querySelector('span').previousSibling.textContent = '🔓 ';
        adminEls.forEach(id => $(id).classList.remove('hidden'));
    } else {
        lbl.textContent = 'Chế độ xem';
        btn.classList.remove('active');
        btn.querySelector('span').previousSibling.textContent = '🔒 ';
        adminEls.forEach(id => $(id).classList.add('hidden'));
    }

    // Re-render to apply readonly/editable states
    renderGantt();
}

function showAdminLogin() {
    if (isAdmin) {
        // Logout
        isAdmin = false;
        updateAdminUI();
        return;
    }
    $('admin-password').value = '';
    $('admin-error').classList.add('hidden');
    $adminModalBackdrop.classList.add('open');
    setTimeout(() => $('admin-password').focus(), 100);
}

function attemptLogin() {
    const pw = $('admin-password').value;
    if (pw === ADMIN_PASSWORD) {
        isAdmin = true;
        $adminModalBackdrop.classList.remove('open');
        updateAdminUI();
    } else {
        $('admin-error').classList.remove('hidden');
    }
}

// ═══════════════════════
// MILESTONES
// ═══════════════════════
function renderMilestones() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    $milestonesTrack.innerHTML = '';

    MILESTONES.forEach((ms, i) => {
        const msDate = parseDate(ms.date);
        const isDone = msDate < today;
        const isActive = !isDone && (i === 0 || parseDate(MILESTONES[i - 1].date) < today);

        const card = document.createElement('div');
        card.className = `ms-card${isDone ? ' done' : ''}${isActive ? ' active' : ''}`;
        card.innerHTML = `
            <div class="ms-diamond"><span class="ms-diamond-inner">${ms.id}</span></div>
            <div class="ms-info">
                <span class="ms-date">${fmtDateFull(msDate)}</span>
                <span class="ms-name">${ms.name}</span>
            </div>`;
        $milestonesTrack.appendChild(card);

        if (i < MILESTONES.length - 1) {
            const conn = document.createElement('div');
            conn.className = `milestone-connector${isDone ? ' done' : ''}`;
            $milestonesTrack.appendChild(conn);
        }
    });
}

// ═══════════════════════
// DATE HEADER
// ═══════════════════════
function renderDateHeader() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    $timelineHeader.innerHTML = allDates.map(d => {
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        const isToday = d.getTime() === today.getTime();
        let cls = 'date-cell';
        if (isWeekend) cls += ' weekend';
        if (isToday) cls += ' today';
        return `<div class="${cls}"><span class="day-name">${dayNames[d.getDay()]}</span><span class="day-num">${d.getDate()}</span></div>`;
    }).join('');
}

// ═══════════════════════
// OVERLAYS
// ═══════════════════════
function renderOverlays() {
    const hStart = daysBetween(CFG.projectStart, CFG.holidayStart);
    const hDur = daysBetween(CFG.holidayStart, CFG.holidayEnd) + 1;
    $holidayOverlay.style.left = `${hStart * CFG.dayWidth}px`;
    $holidayOverlay.style.width = `${hDur * CFG.dayWidth}px`;

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tOff = daysBetween(CFG.projectStart, today);
    if (tOff >= 0 && tOff < totalDays) {
        $todayMarker.style.left = `${tOff * CFG.dayWidth + CFG.dayWidth / 2}px`;
        $todayMarker.style.display = 'block';
    } else {
        $todayMarker.style.display = 'none';
    }
}

// ═══════════════════════
// GANTT
// ═══════════════════════
function renderGantt() {
    const filtered = filterTasks(tasks);
    $sidebarBody.innerHTML = '';
    // Remove only row elements, preserve overlays
    $timelineBody.querySelectorAll('.timeline-row').forEach(el => el.remove());
    let taskCount = 0;

    filtered.forEach(row => {
        if (row.type === 'phase') addPhaseRow(row.label);
        else if (row.type === 'milestone') addMilestoneRow(row);
        else { addTaskRow(row); taskCount++; }
    });

    $taskCount.textContent = `${taskCount} task${taskCount !== 1 ? 's' : ''}`;
    const totalWidth = totalDays * CFG.dayWidth;
    $timelineBody.style.width = totalWidth + 'px';
    $timelineHeader.style.width = totalWidth + 'px';

    // Re-run overlays to update positioning
    renderOverlays();
}

function filterTasks(all) {
    if (activeFilter === 'all') return all;
    const result = [];
    let lastPhase = null;
    let phaseHasMatch = false;

    for (const row of all) {
        if (row.type === 'phase') {
            lastPhase = row;
            phaseHasMatch = false;
            continue;
        }
        if (row.type === 'milestone') { result.push(row); continue; }
        let match = false;
        if (activeFilter === 'cogo') match = row.owner === 'CoGo';
        else if (activeFilter === 'snp') match = row.owner === 'SNP';
        else if (activeFilter === 'joint') match = row.owner === 'Joint';
        else if (activeFilter === 'critical') match = row.critical;

        if (match) {
            if (lastPhase && !phaseHasMatch) { result.push(lastPhase); phaseHasMatch = true; }
            result.push(row);
        }
    }
    return result;
}

function addPhaseRow(label) {
    const sRow = document.createElement('div');
    sRow.className = 'sidebar-row phase-header';
    sRow.textContent = label;
    $sidebarBody.appendChild(sRow);

    const tRow = document.createElement('div');
    tRow.className = 'timeline-row phase-header';
    $timelineBody.appendChild(tRow);
}

function addMilestoneRow(ms) {
    const sRow = document.createElement('div');
    sRow.className = 'sidebar-row milestone-row';
    sRow.innerHTML = `<span style="margin-right:.3rem">◆</span>${ms.label}`;
    $sidebarBody.appendChild(sRow);

    const tRow = document.createElement('div');
    tRow.className = 'timeline-row milestone-row';
    const msDate = parseDate(ms.date);
    const offset = daysBetween(CFG.projectStart, msDate);
    if (offset >= 0 && offset < totalDays) {
        const marker = document.createElement('div');
        marker.className = 'ms-marker';
        marker.style.left = `${offset * CFG.dayWidth + CFG.dayWidth / 2}px`;
        tRow.appendChild(marker);
    }
    $timelineBody.appendChild(tRow);
}

function addTaskRow(task) {
    const statusCls = { 'Planned': 'planned', 'In Progress': 'inprogress', 'Done': 'done', 'Blocked': 'blocked', 'Late': 'late' }[task.status] || 'planned';

    // Sidebar
    const sRow = document.createElement('div');
    sRow.className = 'sidebar-row';
    sRow.innerHTML = `
        <span class="status-dot ${statusCls}"></span>
        <span class="task-id-badge">${task.id}</span>
        <span class="task-name-label">${task.name}</span>
        ${task.critical ? '<span class="critical-icon">⚠️</span>' : ''}`;
    sRow.addEventListener('click', () => openModal(task.id));
    $sidebarBody.appendChild(sRow);

    // Timeline row
    const tRow = document.createElement('div');
    tRow.className = 'timeline-row';

    const startDate = parseDate(task.start);
    const endDate = parseDate(task.end);
    const startOff = daysBetween(CFG.projectStart, startDate);
    const duration = daysBetween(startDate, endDate) + 1;

    const bar = document.createElement('div');
    const ownerCls = 'owner-' + task.owner.toLowerCase();
    bar.className = `task-bar ${ownerCls}${task.critical ? ' is-critical' : ''}`;
    bar.style.left = `${startOff * CFG.dayWidth + 2}px`;
    bar.style.width = `${duration * CFG.dayWidth - 4}px`;

    // Progress fill
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.style.width = `${task.progress}%`;
    bar.appendChild(fill);

    // Text
    const txt = document.createElement('span');
    txt.className = 'bar-text';
    txt.textContent = (task.critical ? '⚠️ ' : '') + task.name;
    bar.appendChild(txt);

    // Admin: drag handles
    if (isAdmin) {
        const handleL = document.createElement('div');
        handleL.className = 'drag-handle-left';
        bar.appendChild(handleL);

        const handleR = document.createElement('div');
        handleR.className = 'drag-handle-right';
        bar.appendChild(handleR);

        // Drag to move (whole bar)
        setupDragMove(bar, task);
        // Resize left
        setupDragResize(handleL, task, 'left');
        // Resize right
        setupDragResize(handleR, task, 'right');
    }

    // Events
    bar.addEventListener('click', e => {
        if (e.defaultPrevented) return; // Ignore if drag happened
        openModal(task.id);
    });
    bar.addEventListener('mouseenter', e => showTooltip(e, task));
    bar.addEventListener('mousemove', e => moveTooltip(e));
    bar.addEventListener('mouseleave', hideTooltip);

    tRow.appendChild(bar);
    $timelineBody.appendChild(tRow);
}

// ═══════════════════════
// DRAG & RESIZE (Admin)
// ═══════════════════════
function setupDragMove(bar, task) {
    let startX, origLeft, origStartOff, moved;

    bar.addEventListener('mousedown', e => {
        if (!isAdmin) return;
        if (e.target.classList.contains('drag-handle-left') || e.target.classList.contains('drag-handle-right')) return;

        e.preventDefault();
        moved = false;
        startX = e.clientX;
        origLeft = parseFloat(bar.style.left);
        const startDate = parseDate(task.start);
        origStartOff = daysBetween(CFG.projectStart, startDate);

        bar.classList.add('dragging');

        const onMove = ev => {
            const dx = ev.clientX - startX;
            if (Math.abs(dx) > 3) moved = true;
            const daysDelta = Math.round(dx / CFG.dayWidth);
            bar.style.left = `${(origStartOff + daysDelta) * CFG.dayWidth + 2}px`;
        };

        const onUp = ev => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            bar.classList.remove('dragging');

            if (moved) {
                ev.preventDefault();
                const dx = ev.clientX - startX;
                const daysDelta = Math.round(dx / CFG.dayWidth);
                if (daysDelta !== 0) {
                    pushUndo();
                    const sd = parseDate(task.start);
                    const ed = parseDate(task.end);
                    sd.setDate(sd.getDate() + daysDelta);
                    ed.setDate(ed.getDate() + daysDelta);
                    task.start = fmtISO(sd);
                    task.end = fmtISO(ed);
                    saveTasks();
                    renderGantt();
                }
            }
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });
}

function setupDragResize(handle, task, side) {
    handle.addEventListener('mousedown', e => {
        if (!isAdmin) return;
        e.preventDefault();
        e.stopPropagation();

        const startX = e.clientX;
        const bar = handle.parentElement;
        const origWidth = parseFloat(bar.style.width);
        const origLeft = parseFloat(bar.style.left);

        const startDate = parseDate(task.start);
        const endDate = parseDate(task.end);
        const origStartOff = daysBetween(CFG.projectStart, startDate);
        const origDuration = daysBetween(startDate, endDate) + 1;

        bar.classList.add('dragging');

        const onMove = ev => {
            const dx = ev.clientX - startX;
            const daysDelta = Math.round(dx / CFG.dayWidth);

            if (side === 'right') {
                const newDuration = Math.max(1, origDuration + daysDelta);
                bar.style.width = `${newDuration * CFG.dayWidth - 4}px`;
            } else {
                const newStartOff = origStartOff + daysDelta;
                const newDuration = Math.max(1, origDuration - daysDelta);
                bar.style.left = `${newStartOff * CFG.dayWidth + 2}px`;
                bar.style.width = `${newDuration * CFG.dayWidth - 4}px`;
            }
        };

        const onUp = ev => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            bar.classList.remove('dragging');

            const dx = ev.clientX - startX;
            const daysDelta = Math.round(dx / CFG.dayWidth);

            if (daysDelta !== 0) {
                pushUndo();
                if (side === 'right') {
                    const newDuration = Math.max(1, origDuration + daysDelta);
                    const ed = new Date(startDate);
                    ed.setDate(ed.getDate() + newDuration - 1);
                    task.end = fmtISO(ed);
                } else {
                    const newDuration = Math.max(1, origDuration - daysDelta);
                    const sd = new Date(startDate);
                    sd.setDate(sd.getDate() + daysDelta);
                    task.start = fmtISO(sd);
                    // Keep end or adjust if needed
                    const newEnd = new Date(sd);
                    newEnd.setDate(newEnd.getDate() + newDuration - 1);
                    task.end = fmtISO(newEnd);
                }
                saveTasks();
                renderGantt();
            }
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });
}

// ═══════════════════════
// TOOLTIP
// ═══════════════════════
function showTooltip(e, task) {
    const statusLabel = { 'Planned': 'Chưa bắt đầu', 'In Progress': 'Đang thực hiện', 'Done': 'Hoàn thành', 'Blocked': 'Bị chặn', 'Late': 'Trễ' }[task.status] || task.status;
    const statusCls = { 'Planned': 'planned', 'In Progress': 'inprogress', 'Done': 'done', 'Blocked': 'blocked', 'Late': 'late' }[task.status] || 'planned';

    $tooltip.innerHTML = `
        <div class="tt-title">${task.name}</div>
        <div class="tt-row"><span class="tt-label">Owner</span>${task.owner}</div>
        <div class="tt-row"><span class="tt-label">Thời gian</span>${fmtDate(parseDate(task.start))} → ${fmtDate(parseDate(task.end))}</div>
        <div class="tt-row"><span class="tt-label">Đầu ra</span>${task.deliverable}</div>
        <div class="tt-row"><span class="tt-label">Phụ thuộc</span>${task.dependency || '—'}</div>
        <div class="tt-row"><span class="tt-label">Trạng thái</span><span class="tt-status ${statusCls}">${statusLabel}</span></div>
        <div class="tt-row"><span class="tt-label">Tiến độ</span>${task.progress}%</div>`;
    $tooltip.classList.add('visible');
    moveTooltip(e);
}

function moveTooltip(e) {
    $tooltip.style.left = Math.min(e.clientX + 14, window.innerWidth - 320) + 'px';
    $tooltip.style.top = Math.min(e.clientY + 14, window.innerHeight - 220) + 'px';
}

function hideTooltip() { $tooltip.classList.remove('visible'); }

// ═══════════════════════
// MODAL (Task Detail/Edit)
// ═══════════════════════
function openModal(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    currentModalId = id;

    $('modal-id').textContent = task.id;
    $('modal-title').textContent = task.name;

    // Read-only fields
    $('modal-owner').textContent = task.owner;
    $('modal-dates').textContent = `${fmtDateFull(parseDate(task.start))} → ${fmtDateFull(parseDate(task.end))}`;
    $('modal-dep').textContent = task.dependency || '—';
    $('modal-deliverable').textContent = task.deliverable;
    $('modal-name-display').textContent = task.name;

    // Select / range
    $('modal-status').value = task.status;
    $('modal-progress').value = task.progress;
    $('modal-progress-val').textContent = task.progress + '%';

    // Admin editable fields
    if (isAdmin) {
        // Show edit fields, hide readonly
        document.querySelectorAll('#modal .readonly').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('#modal .info-edit, #modal .date-edit').forEach(el => el.classList.remove('hidden'));
        $('btn-save').classList.remove('hidden');
        $('btn-delete').classList.remove('hidden');
        $('btn-cancel').textContent = 'Hủy';
        $('modal-status').disabled = false;
        $('modal-progress').disabled = false;

        // Populate edit fields
        $('modal-owner-edit').value = task.owner;
        $('modal-start-date').value = task.start;
        $('modal-end-date').value = task.end;
        $('modal-dep-edit').value = task.dependency || '';
        $('modal-deliverable-edit').value = task.deliverable;
        $('modal-name-edit').value = task.name;

        // Critical toggle
        $('modal-critical-toggle').classList.remove('hidden');
        $('modal-critical-display').classList.add('hidden');
        $('modal-critical').checked = task.critical;
    } else {
        // Read-only
        document.querySelectorAll('#modal .readonly').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('#modal .info-edit, #modal .date-edit').forEach(el => el.classList.add('hidden'));
        $('btn-save').classList.add('hidden');
        $('btn-delete').classList.add('hidden');
        $('btn-cancel').textContent = 'Đóng';
        $('modal-status').disabled = true;
        $('modal-progress').disabled = true;

        $('modal-critical-toggle').classList.add('hidden');
        $('modal-critical-display').classList.remove('hidden');
        $('modal-critical-display').textContent = task.critical ? '✅ Có' : '❌ Không';
    }

    $modalBackdrop.classList.add('open');
}

function closeModal() {
    $modalBackdrop.classList.remove('open');
    currentModalId = null;
}

function saveModal() {
    if (!currentModalId || !isAdmin) return;
    const task = tasks.find(t => t.id === currentModalId);
    if (!task) return;

    pushUndo();
    task.status = $('modal-status').value;
    task.progress = Number($('modal-progress').value);
    task.owner = $('modal-owner-edit').value;
    task.start = $('modal-start-date').value;
    task.end = $('modal-end-date').value;
    task.dependency = $('modal-dep-edit').value;
    task.deliverable = $('modal-deliverable-edit').value;
    task.name = $('modal-name-edit').value;
    task.critical = $('modal-critical').checked;

    saveTasks();
    renderGantt();
    renderMilestones();
    closeModal();
}

function deleteTask() {
    if (!currentModalId || !isAdmin) return;
    const task = tasks.find(t => t.id === currentModalId);
    if (!task) return;
    if (!confirm(`Bạn có chắc muốn xóa task "${task.name}" (${task.id})?`)) return;

    pushUndo();
    const idx = tasks.indexOf(task);
    if (idx !== -1) tasks.splice(idx, 1);

    saveTasks();
    renderGantt();
    closeModal();
}

// ═══════════════════════
// ADD TASK (Admin)
// ═══════════════════════
function showAddTask() {
    if (!isAdmin) return;
    $('new-task-id').value = '';
    $('new-task-name').value = '';
    $('new-task-owner').value = 'CoGo';
    $('new-task-start').value = '';
    $('new-task-end').value = '';
    $('new-task-deliverable').value = '';
    $('new-task-dep').value = '';
    $('new-task-critical').checked = false;
    $addTaskBackdrop.classList.add('open');
}

function saveNewTask() {
    const id = $('new-task-id').value.trim();
    const name = $('new-task-name').value.trim();
    const start = $('new-task-start').value;
    const end = $('new-task-end').value;

    if (!id || !name || !start || !end) {
        alert('Vui lòng điền đầy đủ: Mã task, Tên, Ngày bắt đầu, Ngày kết thúc.');
        return;
    }

    const newTask = {
        id,
        name,
        owner: $('new-task-owner').value,
        start,
        end,
        deliverable: $('new-task-deliverable').value.trim() || '—',
        dependency: $('new-task-dep').value.trim(),
        critical: $('new-task-critical').checked,
        status: 'Planned',
        progress: 0,
    };

    // --- Smart insertion: find the right position by ID prefix ---
    // Extract prefix from ID, e.g. "P1-SNP-07" → "P1-SNP", "P0-03" → "P0", "P2-05" → "P2"
    const getPrefix = (taskId) => {
        const parts = taskId.split('-');
        // If ID has 3+ parts like P1-SNP-01, prefix is first two: P1-SNP
        // If ID has 2 parts like P0-01, prefix is first part: P0
        if (parts.length >= 3) return parts.slice(0, 2).join('-');
        if (parts.length === 2) return parts[0];
        return taskId;
    };

    const newPrefix = getPrefix(id);
    let insertIdx = -1;

    // Find the last task with the same prefix
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (!tasks[i].type && tasks[i].id && getPrefix(tasks[i].id) === newPrefix) {
            insertIdx = i + 1; // Insert right after the last matching task
            break;
        }
    }

    if (insertIdx === -1) {
        // No matching prefix found → insert by date: find the first task whose start date > new task start
        const newStart = parseDate(start);
        for (let i = 0; i < tasks.length; i++) {
            if (!tasks[i].type && tasks[i].start) {
                const taskStart = parseDate(tasks[i].start);
                if (taskStart > newStart) {
                    insertIdx = i;
                    break;
                }
            }
        }
        // If still not found, insert before the last milestone
        if (insertIdx === -1) {
            const lastMsIdx = tasks.map((t, i) => t.type === 'milestone' ? i : -1).filter(i => i >= 0).pop();
            insertIdx = lastMsIdx !== undefined ? lastMsIdx : tasks.length;
        }
    }

    pushUndo();
    tasks.splice(insertIdx, 0, newTask);

    saveTasks();
    renderGantt();
    $addTaskBackdrop.classList.remove('open');
}

// ═══════════════════════
// DOWNLOAD TEMPLATE / IMPORT JSON
// ═══════════════════════
function downloadTemplate() {
    const template = [
        {
            "_comment": "Mẫu JSON để import task. Xóa dòng _comment này trước khi import.",
            "id": "P1-SNP-07",
            "name": "Tên task mẫu",
            "owner": "CoGo | SNP | Joint",
            "start": "2026-03-01",
            "end": "2026-03-05",
            "deliverable": "Đầu ra của task",
            "dependency": "P1-SNP-06",
            "critical": false
        },
        {
            "id": "P2-05",
            "name": "Task thứ hai",
            "owner": "Joint",
            "start": "2026-03-10",
            "end": "2026-03-12",
            "deliverable": "Test report",
            "dependency": "P2-01",
            "critical": true
        }
    ];

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task_template.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importJSON() {
    $('import-file-input').click();
}

function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
        try {
            const imported = JSON.parse(evt.target.result);
            if (!Array.isArray(imported)) {
                alert('File JSON không hợp lệ. Cần một mảng (array) các task.');
                return;
            }

            const requiredFields = ['id', 'name', 'owner', 'start', 'end'];
            const errors = [];
            const validTasks = [];

            imported.forEach((item, idx) => {
                // Skip comment-only entries
                if (item._comment && !item.id) return;

                const missing = requiredFields.filter(f => !item[f]);
                if (missing.length) {
                    errors.push(`Task #${idx + 1}: thiếu ${missing.join(', ')}`);
                    return;
                }

                // Check for duplicate ID
                if (tasks.find(t => t.id === item.id)) {
                    errors.push(`Task "${item.id}": ID đã tồn tại, bỏ qua`);
                    return;
                }

                validTasks.push({
                    id: item.id,
                    name: item.name,
                    owner: item.owner,
                    start: item.start,
                    end: item.end,
                    deliverable: item.deliverable || '—',
                    dependency: item.dependency || '',
                    critical: !!item.critical,
                    status: 'Planned',
                    progress: 0,
                });
            });

            if (errors.length) {
                alert('Cảnh báo:\n' + errors.join('\n'));
            }

            if (!validTasks.length) {
                alert('Không có task hợp lệ nào để import.');
                return;
            }

            // Smart insert each task by prefix
            pushUndo();
            const getPrefix = (taskId) => {
                const parts = taskId.split('-');
                if (parts.length >= 3) return parts.slice(0, 2).join('-');
                if (parts.length === 2) return parts[0];
                return taskId;
            };

            validTasks.forEach(newTask => {
                const newPrefix = getPrefix(newTask.id);
                let insertIdx = -1;

                for (let i = tasks.length - 1; i >= 0; i--) {
                    if (!tasks[i].type && tasks[i].id && getPrefix(tasks[i].id) === newPrefix) {
                        insertIdx = i + 1;
                        break;
                    }
                }

                if (insertIdx === -1) {
                    const newStart = parseDate(newTask.start);
                    for (let i = 0; i < tasks.length; i++) {
                        if (!tasks[i].type && tasks[i].start) {
                            if (parseDate(tasks[i].start) > newStart) { insertIdx = i; break; }
                        }
                    }
                    if (insertIdx === -1) {
                        const lastMs = tasks.map((t, i) => t.type === 'milestone' ? i : -1).filter(i => i >= 0).pop();
                        insertIdx = lastMs !== undefined ? lastMs : tasks.length;
                    }
                }

                tasks.splice(insertIdx, 0, newTask);
            });

            saveTasks();
            renderGantt();
            alert(`✅ Import thành công ${validTasks.length} task!`);

        } catch (err) {
            alert('Lỗi đọc file JSON: ' + err.message);
        }
    };

    reader.readAsText(file);
    // Reset input so same file can be re-imported
    e.target.value = '';
}

// ═══════════════════════
// EVENTS
// ═══════════════════════
function bindEvents() {
    // Filters
    $filters.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        activeFilter = btn.dataset.filter;
        $filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGantt();
    });

    // Admin toggle
    $('admin-toggle').addEventListener('click', showAdminLogin);
    $('admin-modal-close').addEventListener('click', () => $adminModalBackdrop.classList.remove('open'));
    $('admin-cancel').addEventListener('click', () => $adminModalBackdrop.classList.remove('open'));
    $('admin-login-btn').addEventListener('click', attemptLogin);
    $('admin-password').addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });
    $adminModalBackdrop.addEventListener('click', e => { if (e.target === $adminModalBackdrop) $adminModalBackdrop.classList.remove('open'); });

    // Task modal
    $('modal-close').addEventListener('click', closeModal);
    $('btn-cancel').addEventListener('click', closeModal);
    $('btn-save').addEventListener('click', saveModal);
    $('btn-delete').addEventListener('click', deleteTask);
    $modalBackdrop.addEventListener('click', e => { if (e.target === $modalBackdrop) closeModal(); });

    // Progress slider label
    $('modal-progress').addEventListener('input', e => {
        $('modal-progress-val').textContent = e.target.value + '%';
    });

    // Add task
    $('btn-add-task').addEventListener('click', showAddTask);
    $('add-task-close').addEventListener('click', () => $addTaskBackdrop.classList.remove('open'));
    $('add-task-cancel').addEventListener('click', () => $addTaskBackdrop.classList.remove('open'));
    $('add-task-save').addEventListener('click', saveNewTask);

    // Download / Import
    $('btn-download-template').addEventListener('click', downloadTemplate);
    $('btn-import-json').addEventListener('click', importJSON);
    $('import-file-input').addEventListener('change', handleImportFile);
    $addTaskBackdrop.addEventListener('click', e => { if (e.target === $addTaskBackdrop) $addTaskBackdrop.classList.remove('open'); });

    // Undo
    $('btn-undo').addEventListener('click', undo);

    // GitHub
    $('btn-save-github').addEventListener('click', saveToGitHub);
    $('btn-github-settings').addEventListener('click', openGitHubSettings);
    $('github-modal-close').addEventListener('click', () => $githubModalBackdrop.classList.remove('open'));
    $('gh-cancel').addEventListener('click', () => $githubModalBackdrop.classList.remove('open'));
    $('gh-save-settings').addEventListener('click', saveGitHubSettings);
    $githubModalBackdrop.addEventListener('click', e => { if (e.target === $githubModalBackdrop) $githubModalBackdrop.classList.remove('open'); });

    // Sync scroll
    const timeline = $('gantt-timeline');
    const sidebar = $('sidebar-body');
    timeline.addEventListener('scroll', () => { sidebar.scrollTop = timeline.scrollTop; });
    sidebar.addEventListener('scroll', () => { timeline.scrollTop = sidebar.scrollTop; });

    // Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal();
            $adminModalBackdrop.classList.remove('open');
            $addTaskBackdrop.classList.remove('open');
            $githubModalBackdrop.classList.remove('open');
        }
    });

    // Ctrl+Z undo
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 'z' && isAdmin) { e.preventDefault(); undo(); }
    });
}

// ═══════════════════════
// GITHUB SYNC
// ═══════════════════════
function getGitHubSettings() {
    const saved = localStorage.getItem(CFG.ghSettingsKey);
    if (saved) return JSON.parse(saved);
    return {
        token: '',
        repo: 'hungpx2008/master-plan-web',
        branch: 'main',
        filepath: 'data.json',
    };
}

function openGitHubSettings() {
    const s = getGitHubSettings();
    $('gh-token').value = s.token;
    $('gh-repo').value = s.repo;
    $('gh-branch').value = s.branch;
    $('gh-filepath').value = s.filepath;
    $('gh-status').className = 'gh-status';
    $('gh-status').textContent = '';
    $githubModalBackdrop.classList.add('open');
}

function saveGitHubSettings() {
    const settings = {
        token: $('gh-token').value.trim(),
        repo: $('gh-repo').value.trim(),
        branch: $('gh-branch').value.trim(),
        filepath: $('gh-filepath').value.trim(),
    };
    localStorage.setItem(CFG.ghSettingsKey, JSON.stringify(settings));
    $('gh-status').className = 'gh-status success';
    $('gh-status').textContent = '✅ Đã lưu cài đặt!';
    setTimeout(() => $githubModalBackdrop.classList.remove('open'), 800);
}

async function loadFromGitHub() {
    const s = getGitHubSettings();
    if (!s.repo || !s.filepath) return null;
    try {
        const url = `https://api.github.com/repos/${s.repo}/contents/${s.filepath}?ref=${s.branch}&t=${Date.now()}`;
        const headers = { 'Accept': 'application/vnd.github.v3+json' };
        if (s.token) headers['Authorization'] = `Bearer ${s.token}`;
        const res = await fetch(url, { headers });
        if (!res.ok) return null;
        const json = await res.json();
        const content = atob(json.content.replace(/\n/g, ''));
        return JSON.parse(content);
    } catch {
        return null;
    }
}

async function saveToGitHub() {
    const s = getGitHubSettings();
    if (!s.token) {
        alert('Chưa có GitHub Token. Vui lòng vào ⚙️ Cài đặt để nhập token.');
        openGitHubSettings();
        return;
    }

    const btn = $('btn-save-github');
    btn.classList.add('saving');
    btn.textContent = '☁️ Đang lưu...';

    try {
        // Get current file SHA (needed for update)
        const getUrl = `https://api.github.com/repos/${s.repo}/contents/${s.filepath}?ref=${s.branch}`;
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `Bearer ${s.token}`,
        };

        let sha = '';
        const getRes = await fetch(getUrl, { headers });
        if (getRes.ok) {
            const getJson = await getRes.json();
            sha = getJson.sha;
        }

        // Commit updated data
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(tasks, null, 2))));
        const putUrl = `https://api.github.com/repos/${s.repo}/contents/${s.filepath}`;
        const body = {
            message: `[Gantt] Update tasks - ${new Date().toLocaleString('vi-VN')}`,
            content,
            branch: s.branch,
        };
        if (sha) body.sha = sha;

        const putRes = await fetch(putUrl, {
            method: 'PUT',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (putRes.ok) {
            isDirty = false;
            updateDirtyUI();
            btn.classList.remove('saving');
            alert('✅ Đã lưu lên GitHub thành công!');
        } else {
            const err = await putRes.json();
            throw new Error(err.message || 'API error');
        }
    } catch (err) {
        btn.classList.remove('saving');
        updateDirtyUI();
        alert('❌ Lỗi lưu lên GitHub: ' + err.message);
    }
}

// ─── GO ───
document.addEventListener('DOMContentLoaded', init);
