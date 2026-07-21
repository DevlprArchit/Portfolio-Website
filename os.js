/* =====================================================================
   ArchOS — Desktop OS Portfolio for Archit Sharma
   Vanilla JS, no build step, GitHub Pages friendly.
   ===================================================================== */
(() => {
  'use strict';

  /* ---------------------------------------------------------------
   * 0. Utilities
   * ------------------------------------------------------------- */
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const isMobile = () => window.matchMedia('(max-width:760px)').matches;
  const pad2 = n => String(n).padStart(2, '0');

  /* ---------------------------------------------------------------
   * 1. Content data — single source of truth
   * ------------------------------------------------------------- */
  const PROFILE = {
    name: 'Archit Sharma',
    role: 'Full-Stack Web Developer',
    location: 'Kangra, Himachal Pradesh, India',
    education: 'B.Tech in Computer Science & Engineering',
    email: 'work.with.archit04@gmail.com',
    academicEmail: 'archit.sharma04.cse@gmail.com',
    phone: '+91 9459956889',
    status: 'Open for Internships & Jobs',
    github: 'https://github.com/DevlprArchit',
    githubUser: 'DevlprArchit',
    linkedin: 'https://www.linkedin.com/in/archit-sharma-513689255',
    instagram: 'https://www.instagram.com/simp_frost',
    twitter: 'https://x.com/ArchitS07503713',
    photo1: 'Assets/IMG_20260503_222521_790.webp',
    photo2: 'Assets/IMG_20260210_002615_497.webp',
    photo3: 'Assets/IMG_20230620_185900_558.jpg',
    resumePdf: 'Assets/Archit_Sharma_Resume.pdf'
  };

  const TIMELINE = [
    { year: 'Now', title: 'B.Tech, Computer Science & Engineering', text: 'Focused on full-stack web development, clean component architecture and interactive UI engineering.' },
    { year: '2026', title: 'Organizer — Hack-O-Fest 2026', text: 'Helped run a campus hackathon end-to-end, from logistics to mentoring participant teams.' },
    { year: '2025', title: 'National Hackathon Participant', text: 'Competed in a national-level hackathon, building and pitching a working prototype under time pressure.' },
    { year: 'Ongoing', title: 'Building Social Circle', text: 'Designing and shipping a private squad community app with real-time chat, feeds and a virtual pet system.' }
  ];

  const TECH_STACK = ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Firebase', 'Bootstrap', 'Python', 'Git & GitHub'];

  const PROJECTS = [
    {
      id: 'social-circle',
      title: 'Social Circle App',
      badge: 'Featured Project',
      category: 'Full-Stack',
      tags: ['React.js', 'Firebase', 'Capacitor APK', 'Vite', 'Custom CSS Themes'],
      img: 'Assets/social_circle_mockup.png',
      desc: 'A premium, private squad community dashboard — real-time multi-channel chats, a snaps/meme feed with voting, a synchronized watch lounge, and "Biscuit," an interactive state-driven virtual pet.',
      live: 'https://team-rocket-hub.web.app',
      code: null
    },
    {
      id: 'sunrise-restaurant',
      title: 'The Sunrise Restaurant',
      badge: 'Food App',
      category: 'Frontend',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 4'],
      img: 'Assets/otp1.JPG',
      desc: 'A custom food-ordering and restaurant dashboard UI built during 5th semester — responsive listings, interactive cart updates, and a styled checkout flow.',
      live: 'https://github.com/DevlprArchit/The-Sunrise-Restaurant-Project-',
      code: 'https://github.com/DevlprArchit/The-Sunrise-Restaurant-Project-'
    },
    {
      id: 's8ul-gaming',
      title: 'S8UL Gaming Fan Website',
      badge: 'Esports Fan App',
      category: 'Frontend',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 4'],
      img: 'Assets/S8ul Otp 1.1.JPG',
      desc: 'A fanmade site for Indian esports org S8UL, completed during summer training — dynamic crew rosters, tournament logs, and media displays.',
      live: 'https://github.com/DevlprArchit/S8UL-Gaming-Website-Project-',
      code: 'https://github.com/DevlprArchit/S8UL-Gaming-Website-Project-'
    },
    {
      id: 'portfolio',
      title: 'Premium Personal Portfolio',
      badge: 'Portfolio',
      category: 'Frontend',
      tags: ['HTML5', 'CSS3 Variables', 'JavaScript ES6', 'Scroll-Reveal'],
      img: 'Assets/port 1.PNG',
      desc: 'The predecessor to ArchOS — a glassmorphism single-page portfolio with a theme engine and scroll-based reveals.',
      live: null,
      code: 'https://github.com/DevlprArchit/Portfolio-Website'
    }
  ];

  const SKILLS = [
    { cat: 'Frontend', items: [
      { name: 'HTML5', level: 95 }, { name: 'CSS3', level: 92 },
      { name: 'React.js', level: 80 }, { name: 'Bootstrap', level: 88 }
    ]},
    { cat: 'Backend & Tools', items: [
      { name: 'Firebase', level: 78 }, { name: 'Python', level: 70 },
      { name: 'Git & GitHub', level: 85 }
    ]},
    { cat: 'Design', items: [
      { name: 'Photoshop', level: 65 }, { name: 'Video Editing', level: 72 }
    ]}
  ];

  const CERTIFICATES = [
    { title: 'IIT Bombay Certification', org: 'IIT Bombay', icon: 'fa-graduation-cap' },
    { title: 'UniAthena Course Certificate', org: 'UniAthena', icon: 'fa-award' },
    { title: 'Python Programming', org: 'Course Certificate', icon: 'fa-python', fa5: 'fab' },
    { title: 'Web Development', org: 'Course Certificate', icon: 'fa-code' }
  ];

  const ACHIEVEMENTS = [
    'Organizer — Hack-O-Fest 2026',
    'National Hackathon Participant',
    'Built & shipped Social Circle'
  ];

  /* ---------------------------------------------------------------
   * 2. Settings (persisted)
   * ------------------------------------------------------------- */
  const DEFAULT_SETTINGS = { accent: 'blue', wallpaper: 'aurora', animations: true, sound: true };
  let settings = { ...DEFAULT_SETTINGS };
  try {
    const saved = JSON.parse(localStorage.getItem('archos-settings') || 'null');
    if (saved) settings = { ...DEFAULT_SETTINGS, ...saved };
  } catch (e) { /* ignore corrupt storage */ }

  const ACCENTS = {
    blue: ['#60a5fa', '#38bdf8'],
    cyan: ['#38bdf8', '#22d3ee'],
    green: ['#22c55e', '#38bdf8'],
    amber: ['#f59e0b', '#fbbf24'],
    red: ['#ef4444', '#f97316']
  };

  function applySettings() {
    const [a1, a2] = ACCENTS[settings.accent] || ACCENTS.blue;
    document.documentElement.style.setProperty('--accent', a1);
    document.documentElement.style.setProperty('--accent-2', a2);
    const rgb = hexToRgb(a1);
    document.documentElement.style.setProperty('--accent-rgb', `${rgb.r},${rgb.g},${rgb.b}`);
    const wp = qs('#wallpaperLayer');
    if (wp) wp.setAttribute('data-wallpaper', settings.wallpaper);
    document.documentElement.setAttribute('data-motion', settings.animations ? 'full' : 'reduced');
    persistSettings();
  }
  function persistSettings() {
    try { localStorage.setItem('archos-settings', JSON.stringify(settings)); } catch (e) { /* storage unavailable */ }
  }
  function hexToRgb(hex) {
    const m = hex.replace('#', '');
    const bigint = parseInt(m, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }

  /* ---------------------------------------------------------------
   * 3. Tiny sound engine (WebAudio, no external files)
   * ------------------------------------------------------------- */
  const Sound = (() => {
    let ctx;
    function ensureCtx() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) ctx = new AC();
      }
      return ctx;
    }
    function blip(freq = 660, dur = 0.06, type = 'sine', gain = 0.05) {
      if (!settings.sound) return;
      const c = ensureCtx();
      if (!c) return;
      if (c.state === 'suspended') c.resume();
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.value = gain;
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      osc.connect(g).connect(c.destination);
      osc.start();
      osc.stop(c.currentTime + dur);
    }
    return {
      click: () => blip(720, 0.05, 'sine', 0.04),
      open: () => blip(520, 0.09, 'triangle', 0.05),
      close: () => blip(340, 0.08, 'triangle', 0.04),
      error: () => blip(180, 0.15, 'square', 0.03),
      getCtx: ensureCtx
    };
  })();

  /* ---------------------------------------------------------------
   * 4. Ambient generative music player (no audio files needed)
   * ------------------------------------------------------------- */
  const AmbientPlayer = (() => {
    const TRACKS = [
      { name: 'Focus Flow', tag: 'ArchOS Ambient', chords: [220, 277.18, 329.63], tempo: 6 },
      { name: 'Night Drive', tag: 'ArchOS Ambient', chords: [196, 246.94, 293.66], tempo: 8 },
      { name: 'Deep Work', tag: 'ArchOS Ambient', chords: [174.61, 220, 261.63], tempo: 10 }
    ];
    let idx = 0, playing = false, ctx, gainNode, oscillators = [], loopTimer, startedAt = 0, elapsed = 0;
    const LOOP_SECONDS = 24;

    function ensureCtx() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        ctx = new AC();
        gainNode = ctx.createGain();
        gainNode.gain.value = 0.16;
        gainNode.connect(ctx.destination);
      }
      return ctx;
    }
    function stopOsc() {
      oscillators.forEach(o => { try { o.stop(); } catch (e) {} });
      oscillators = [];
    }
    function playChord() {
      const c = ensureCtx();
      stopOsc();
      const track = TRACKS[idx];
      track.chords.forEach((freq, i) => {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq;
        g.gain.value = 0;
        g.gain.linearRampToValueAtTime(0.5 / track.chords.length, c.currentTime + 1.2);
        osc.connect(g).connect(gainNode);
        osc.start();
        oscillators.push(osc);
      });
    }
    function play() {
      const c = ensureCtx();
      if (c.state === 'suspended') c.resume();
      playing = true;
      startedAt = c.currentTime - elapsed;
      playChord();
      clearInterval(loopTimer);
      loopTimer = setInterval(() => { if (playing) playChord(); }, TRACKS[idx].tempo * 1000);
      onTick();
    }
    function pause() {
      playing = false;
      stopOsc();
      clearInterval(loopTimer);
      if (ctx) elapsed = ctx.currentTime - startedAt;
    }
    function next() {
      idx = (idx + 1) % TRACKS.length;
      elapsed = 0;
      if (playing) play();
      renderUI();
    }
    let tickRAF;
    function onTick() {
      cancelAnimationFrame(tickRAF);
      const step = () => {
        if (!playing || !ctx) return;
        const t = (ctx.currentTime - startedAt) % LOOP_SECONDS;
        const fill = qs('#mpProgressFill');
        if (fill) fill.style.width = `${(t / LOOP_SECONDS) * 100}%`;
        tickRAF = requestAnimationFrame(step);
      };
      step();
    }
    function setVolume(v) { if (gainNode) gainNode.gain.value = v; }
    function renderUI() {
      const track = TRACKS[idx];
      const trackEl = qs('#mpTrack'), artistEl = qs('#mpArtist'), playBtn = qs('#mpPlayIcon');
      if (trackEl) trackEl.textContent = track.name;
      if (artistEl) artistEl.textContent = track.tag;
      if (playBtn) playBtn.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }
    function toggle() {
      if (playing) pause(); else play();
      renderUI();
    }
    return { toggle, next, setVolume, renderUI, isPlaying: () => playing };
  })();

  /* ---------------------------------------------------------------
   * 5. Boot sequence
   * ------------------------------------------------------------- */
  function runBoot() {
    const fill = qs('#bootBarFill');
    const status = qs('#bootStatus');
    const boot = qs('#bootScreen');
    const desktop = qs('#desktop');
    const steps = [
      'Initializing kernel modules…',
      'Mounting project directories…',
      'Loading skill matrix…',
      'Compiling résumé cache…',
      'Rendering desktop shell…',
      'Welcome, guest.'
    ];
    let i = 0;
    const total = steps.length;
    const tick = () => {
      i++;
      const pct = Math.round((i / total) * 100);
      if (fill) fill.style.width = pct + '%';
      if (status) status.textContent = steps[i - 1];
      if (i < total) {
        setTimeout(tick, 380 + Math.random() * 220);
      } else {
        setTimeout(() => {
          boot.classList.add('boot-out');
          setTimeout(() => {
            boot.hidden = true;
            desktop.hidden = false;
            initDesktopOnce();
          }, 650);
        }, 400);
      }
    };
    setTimeout(tick, 350);
  }

  /* ---------------------------------------------------------------
   * 6. Background particles
   * ------------------------------------------------------------- */
  function initParticles() {
    const canvas = qs('#bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function spawn() {
      const count = isMobile() ? 18 : 46;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vy: -(Math.random() * 0.25 + 0.05),
        vx: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.5 + 0.15
      }));
    }
    window.addEventListener('resize', () => { resize(); spawn(); });
    resize(); spawn();
    function frame() {
      if (settings.animations) {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
          if (p.x < -5) p.x = w + 5;
          if (p.x > w + 5) p.x = -5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148,197,255,${p.a})`;
          ctx.fill();
        });
      } else {
        ctx.clearRect(0, 0, w, h);
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ---------------------------------------------------------------
   * 7. Cursor glow + trail (desktop pointer only)
   * ------------------------------------------------------------- */
  function initCursorFx() {
    if (isMobile() || window.matchMedia('(pointer:coarse)').matches) return;
    const glow = qs('#cursorGlow');
    const dots = [];
    const desktop = qs('#desktop');
    for (let i = 0; i < 8; i++) {
      const d = document.createElement('div');
      d.className = 'cursor-trail-dot';
      d.style.opacity = String(0.5 - i * 0.05);
      desktop.appendChild(d);
      dots.push({ el: d, x: 0, y: 0 });
    }
    let mx = 0, my = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (glow) { glow.style.left = mx + 'px'; glow.style.top = my + 'px'; }
    });
    function loop() {
      let px = mx, py = my;
      dots.forEach((d, i) => {
        d.x += (px - d.x) * 0.32;
        d.y += (py - d.y) * 0.32;
        d.el.style.transform = `translate(${d.x}px, ${d.y}px)`;
        px = d.x; py = d.y;
      });
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------------------------------------------------------------
   * 8. Clock
   * ------------------------------------------------------------- */
  function initClock() {
    function tick() {
      const now = new Date();
      const time = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
      const date = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      const t = qs('#topbarTime'), d = qs('#topbarDate');
      if (t) t.textContent = time;
      if (d) d.textContent = date;
    }
    tick();
    setInterval(tick, 15000);
  }

  /* ---------------------------------------------------------------
   * 9. App registry
   * ------------------------------------------------------------- */
  const APPS = [
    { id: 'about', title: 'About Me', icon: 'fa-solid fa-user', w: 560, h: 460, render: renderAbout },
    { id: 'projects', title: 'Projects', icon: 'fa-solid fa-diagram-project', w: 640, h: 520, render: renderProjects },
    { id: 'skills', title: 'Skills', icon: 'fa-solid fa-layer-group', w: 480, h: 500, render: renderSkills },
    { id: 'resume', title: 'Resume', icon: 'fa-solid fa-file-lines', w: 520, h: 500, render: renderResume },
    { id: 'certificates', title: 'Certificates', icon: 'fa-solid fa-award', w: 520, h: 440, render: renderCertificates },
    { id: 'contact', title: 'Contact', icon: 'fa-solid fa-envelope', w: 600, h: 480, render: renderContact },
    { id: 'terminal', title: 'Terminal', icon: 'fa-solid fa-terminal', w: 560, h: 420, render: renderTerminal, noPad: true },
    { id: 'explorer', title: 'File Explorer', icon: 'fa-solid fa-folder-open', w: 620, h: 460, render: renderExplorer, noPad: true },
    { id: 'github', title: 'GitHub', icon: 'fa-brands fa-github', w: 480, h: 520, render: renderGithub },
    { id: 'settings', title: 'Settings', icon: 'fa-solid fa-gear', w: 460, h: 480, render: renderSettings }
  ];
  const PINNED = ['about', 'projects', 'skills', 'terminal', 'contact'];
  const appById = id => APPS.find(a => a.id === id);

  /* ---------------------------------------------------------------
   * 10. Window Manager
   * ------------------------------------------------------------- */
  const WM = (() => {
    const openWindows = new Map(); // id -> { el, appId, state }
    let zTop = 10;
    let recentApps = [];

    function focus(id) {
      const w = openWindows.get(id);
      if (!w) return;
      zTop += 1;
      w.el.style.zIndex = zTop;
      qsa('.app-window').forEach(el => el.classList.remove('focused'));
      w.el.classList.add('focused');
      qsa('.tb-run-btn').forEach(b => b.classList.toggle('active', b.dataset.id === id));
      qsa('.dock-btn').forEach(b => b.classList.toggle('running', openWindows.has(b.dataset.id)));
    }

    function open(id) {
      const app = appById(id);
      if (!app) return;
      recentApps = [id, ...recentApps.filter(a => a !== id)].slice(0, 4);

      if (openWindows.has(id)) {
        const w = openWindows.get(id);
        w.el.classList.remove('minimized');
        focus(id);
        return;
      }
      Sound.open();
      const el = document.createElement('div');
      el.className = 'app-window';
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-label', app.title);
      el.dataset.id = id;

      const mobile = isMobile();
      const winW = mobile ? window.innerWidth : app.w;
      const winH = mobile ? window.innerHeight : app.h;
      const left = mobile ? 0 : clamp(60 + openWindows.size * 26, 20, window.innerWidth - winW - 20);
      const top = mobile ? 0 : clamp(70 + openWindows.size * 24, 10, window.innerHeight - winH - 100);
      Object.assign(el.style, { width: winW + 'px', height: winH + 'px', left: left + 'px', top: top + 'px' });

      el.innerHTML = `
        <div class="win-header">
          <div class="win-title"><i class="${app.icon}"></i><span>${app.title}</span></div>
          <div class="win-controls">
            <button class="win-btn min" aria-label="Minimize ${app.title}" title="Minimize">&#9472;</button>
            <button class="win-btn max" aria-label="Maximize ${app.title}" title="Maximize">&#9723;</button>
            <button class="win-btn close" aria-label="Close ${app.title}" title="Close">&times;</button>
          </div>
        </div>
        <div class="win-body ${app.noPad ? 'no-pad' : ''}"></div>
        <div class="win-resize" aria-hidden="true"></div>
      `;
      qs('#windowsLayer').appendChild(el);
      openWindows.set(id, { el, appId: id });

      app.render(qs('.win-body', el), el);
      makeDraggable(el);
      makeResizable(el);
      el.addEventListener('mousedown', () => focus(id));
      el.addEventListener('touchstart', () => focus(id), { passive: true });

      qs('.win-btn.min', el).addEventListener('click', () => minimize(id));
      qs('.win-btn.max', el).addEventListener('click', () => toggleMaximize(id));
      qs('.win-btn.close', el).addEventListener('click', () => close(id));

      syncTaskbar();
      focus(id);
    }

    function close(id) {
      const w = openWindows.get(id);
      if (!w) return;
      Sound.close();
      w.el.classList.add('closing');
      setTimeout(() => { w.el.remove(); openWindows.delete(id); syncTaskbar(); }, 180);
    }
    function minimize(id) {
      const w = openWindows.get(id);
      if (!w) return;
      w.el.classList.add('minimized');
      syncTaskbar();
    }
    function toggleMaximize(id) {
      const w = openWindows.get(id);
      if (!w) return;
      w.el.classList.toggle('maximized');
    }
    function isOpen(id) { return openWindows.has(id); }

    function syncTaskbar() {
      const running = qs('#taskbarRunning');
      running.innerHTML = '';
      openWindows.forEach((w, id) => {
        const app = appById(id);
        const btn = document.createElement('button');
        btn.className = 'tb-run-btn';
        btn.dataset.id = id;
        btn.innerHTML = `<i class="${app.icon}"></i><span>${app.title}</span>`;
        btn.addEventListener('click', () => {
          if (w.el.classList.contains('minimized')) { w.el.classList.remove('minimized'); focus(id); }
          else if (w.el.classList.contains('focused')) minimize(id);
          else focus(id);
        });
        running.appendChild(btn);
      });
      qsa('.dock-btn').forEach(b => b.classList.toggle('running', openWindows.has(b.dataset.id)));
    }

    function makeDraggable(el) {
      const header = qs('.win-header', el);
      let sx, sy, ox, oy, dragging = false;
      const start = (x, y) => {
        if (el.classList.contains('maximized') || isMobile()) return;
        dragging = true; sx = x; sy = y;
        const r = el.getBoundingClientRect();
        ox = r.left; oy = r.top;
      };
      const move = (x, y) => {
        if (!dragging) return;
        const nx = clamp(ox + (x - sx), 0, window.innerWidth - 80);
        const ny = clamp(oy + (y - sy), 34, window.innerHeight - 60);
        el.style.left = nx + 'px'; el.style.top = ny + 'px';
      };
      const end = () => { dragging = false; };
      header.addEventListener('mousedown', e => { start(e.clientX, e.clientY); e.preventDefault(); });
      window.addEventListener('mousemove', e => move(e.clientX, e.clientY));
      window.addEventListener('mouseup', end);
      header.addEventListener('touchstart', e => { const t = e.touches[0]; start(t.clientX, t.clientY); }, { passive: true });
      window.addEventListener('touchmove', e => { const t = e.touches[0]; move(t.clientX, t.clientY); }, { passive: true });
      window.addEventListener('touchend', end);
      header.addEventListener('dblclick', () => toggleMaximize(el.dataset.id));
    }

    function makeResizable(el) {
      const handle = qs('.win-resize', el);
      let sx, sy, sw, sh, resizing = false;
      handle.addEventListener('mousedown', e => {
        if (isMobile()) return;
        resizing = true; sx = e.clientX; sy = e.clientY;
        const r = el.getBoundingClientRect(); sw = r.width; sh = r.height;
        e.preventDefault(); e.stopPropagation();
      });
      window.addEventListener('mousemove', e => {
        if (!resizing) return;
        el.style.width = clamp(sw + (e.clientX - sx), 320, window.innerWidth - 40) + 'px';
        el.style.height = clamp(sh + (e.clientY - sy), 240, window.innerHeight - 120) + 'px';
      });
      window.addEventListener('mouseup', () => { resizing = false; });
    }

    function topMostId() {
      let top = null, max = -1;
      openWindows.forEach((w, id) => {
        const z = parseInt(w.el.style.zIndex || '0', 10);
        if (!w.el.classList.contains('minimized') && z > max) { max = z; top = id; }
      });
      return top;
    }

    return { open, close, minimize, toggleMaximize, isOpen, syncTaskbar, topMostId, getRecent: () => recentApps };
  })();

  /* ---------------------------------------------------------------
   * 11. Desktop icons, dock, taskbar
   * ------------------------------------------------------------- */
  function buildDesktopChrome() {
    const iconsWrap = qs('#desktopIcons');
    const desktopApps = ['about', 'projects', 'skills', 'resume', 'certificates', 'contact', 'terminal', 'explorer'];
    desktopApps.forEach(id => {
      const app = appById(id);
      const btn = document.createElement('button');
      btn.className = 'dt-icon';
      btn.innerHTML = `<span class="dt-icon-glyph"><i class="${app.icon}"></i></span><span>${app.title}</span>`;
      btn.addEventListener('dblclick', () => WM.open(id));
      btn.addEventListener('click', (() => {
        let last = 0;
        return () => { const now = Date.now(); if (now - last < 400) WM.open(id); last = now; };
      })());
      iconsWrap.appendChild(btn);
    });

    const dock = qs('#dock');
    PINNED.forEach(id => {
      const app = appById(id);
      const btn = document.createElement('button');
      btn.className = 'dock-btn';
      btn.dataset.id = id;
      btn.title = app.title;
      btn.setAttribute('aria-label', 'Open ' + app.title);
      btn.innerHTML = `<i class="${app.icon}"></i>`;
      btn.addEventListener('click', () => { Sound.click(); WM.open(id); });
      dock.appendChild(btn);
    });
  }

  /* ---------------------------------------------------------------
   * 12. Start menu + Spotlight search
   * ------------------------------------------------------------- */
  function buildStartMenu() {
    const grid = qs('#startGrid');
    APPS.forEach(app => {
      const btn = document.createElement('button');
      btn.className = 'start-app';
      btn.innerHTML = `<i class="${app.icon}"></i><span>${app.title}</span>`;
      btn.addEventListener('click', () => { WM.open(app.id); closeStart(); });
      grid.appendChild(btn);
    });
  }
  function refreshRecent() {
    const wrap = qs('#startRecent');
    wrap.innerHTML = '';
    const recents = WM.getRecent();
    if (!recents.length) {
      wrap.innerHTML = '<p style="font-size:12px;color:var(--muted);margin:0;">Nothing opened yet — try Projects or About.</p>';
      return;
    }
    recents.forEach(id => {
      const app = appById(id);
      const btn = document.createElement('button');
      btn.className = 'start-recent-item';
      btn.innerHTML = `<i class="${app.icon}"></i> ${app.title}`;
      btn.addEventListener('click', () => { WM.open(id); closeStart(); });
      wrap.appendChild(btn);
    });
  }
  function openStart() {
    qs('#startMenu').hidden = false;
    qs('#scrim').hidden = false;
    refreshRecent();
    setTimeout(() => qs('#startSearchInput').focus(), 60);
  }
  function closeStart() {
    qs('#startMenu').hidden = true;
    if (qs('#spotlight').hidden) qs('#scrim').hidden = true;
  }
  function initStartMenu() {
    qs('#startBtn').addEventListener('click', () => {
      qs('#startMenu').hidden ? openStart() : closeStart();
    });
    qs('#startBrandBtn').addEventListener('click', () => {
      qs('#startMenu').hidden ? openStart() : closeStart();
    });
    qs('#scrim').addEventListener('click', () => { closeStart(); closeSpotlight(); });
    qs('#startSearchInput').addEventListener('input', e => {
      if (e.target.value.trim()) { closeStart(); openSpotlight(e.target.value); }
    });
    qs('#powerRefresh').addEventListener('click', () => location.reload());
    qs('#powerAbout').addEventListener('click', () => { WM.open('about'); closeStart(); });
    qs('#powerClassic').addEventListener('click', () => { window.location.href = 'index-classic.html'; });
  }

  const SEARCH_INDEX = (() => {
    const idx = [];
    APPS.forEach(a => idx.push({ type: 'App', label: a.title, sub: 'Open application', icon: a.icon, action: () => WM.open(a.id) }));
    PROJECTS.forEach(p => idx.push({ type: 'Project', label: p.title, sub: p.tags.join(', '), icon: 'fa-solid fa-diagram-project', action: () => { WM.open('projects'); setTimeout(() => openProjectModal(p.id), 250); } }));
    SKILLS.forEach(cat => cat.items.forEach(s => idx.push({ type: 'Skill', label: s.name, sub: cat.cat, icon: 'fa-solid fa-layer-group', action: () => WM.open('skills') })));
    CERTIFICATES.forEach(c => idx.push({ type: 'Certificate', label: c.title, sub: c.org, icon: 'fa-solid fa-award', action: () => WM.open('certificates') }));
    idx.push({ type: 'Page', label: 'Resume / CV', sub: 'Download or preview', icon: 'fa-solid fa-file-lines', action: () => WM.open('resume') });
    idx.push({ type: 'Page', label: 'Contact', sub: 'Email, phone, form', icon: 'fa-solid fa-envelope', action: () => WM.open('contact') });
    ['help', 'about', 'skills', 'projects', 'resume', 'contact', 'github', 'linkedin', 'clear', 'whoami', 'date', 'exit', 'ascii', 'theme'].forEach(cmd =>
      idx.push({ type: 'Command', label: cmd, sub: 'Terminal command', icon: 'fa-solid fa-terminal', action: () => WM.open('terminal') })
    );
    return idx;
  })();

  function openSpotlight(prefill) {
    qs('#scrim').hidden = false;
    qs('#spotlight').hidden = false;
    const input = qs('#spotlightInput');
    input.value = prefill || '';
    runSpotlightSearch(input.value);
    setTimeout(() => input.focus(), 30);
  }
  function closeSpotlight() {
    qs('#spotlight').hidden = true;
    if (qs('#startMenu').hidden) qs('#scrim').hidden = true;
  }
  function runSpotlightSearch(query) {
    const results = qs('#spotlightResults');
    results.innerHTML = '';
    const q = query.trim().toLowerCase();
    const matches = !q ? SEARCH_INDEX.slice(0, 8) : SEARCH_INDEX.filter(i =>
      i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q) || i.type.toLowerCase().includes(q)
    ).slice(0, 10);
    if (!matches.length) {
      results.innerHTML = '<div class="spotlight-empty">No matches. Try "projects", "skills", or a command name.</div>';
      return;
    }
    matches.forEach((m, i) => {
      const btn = document.createElement('button');
      btn.className = 'spotlight-item' + (i === 0 ? ' active' : '');
      btn.innerHTML = `<i class="${m.icon}"></i><div><div>${m.label}</div><small>${m.type} · ${m.sub}</small></div>`;
      btn.addEventListener('click', () => { m.action(); closeSpotlight(); });
      results.appendChild(btn);
    });
  }
  function initSpotlight() {
    qs('#searchTriggerBtn').addEventListener('click', () => openSpotlight(''));
    qs('#spotlightInput').addEventListener('input', e => runSpotlightSearch(e.target.value));
    window.addEventListener('keydown', e => {
      const meta = e.ctrlKey || e.metaKey;
      if (meta && e.key.toLowerCase() === 'k') { e.preventDefault(); qs('#spotlight').hidden ? openSpotlight('') : closeSpotlight(); }
      if (e.key === 'Escape') {
        if (!qs('#spotlight').hidden) closeSpotlight();
        else if (!qs('#startMenu').hidden) closeStart();
        else { const top = WM.topMostId(); if (top) WM.minimize(top); }
      }
    });
  }

  /* ---------------------------------------------------------------
   * 13. Notifications
   * ------------------------------------------------------------- */
  function toast(msg, kind = 'info', icon = 'fa-solid fa-circle-info') {
    const stack = qs('#toastStack');
    const el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.innerHTML = `<i class="${icon}"></i><span>${msg}</span>`;
    stack.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; setTimeout(() => el.remove(), 250); }, 3400);
    const dot = qs('#notifDot');
    if (dot) dot.hidden = false;
  }

  /* ---------------------------------------------------------------
   * 14. App renderers
   * ------------------------------------------------------------- */
  function renderAbout(body) {
    body.innerHTML = `
      <div class="app-eyebrow">About</div>
      <div class="about-hero">
        <div class="about-photo"><img src="${PROFILE.photo1}" alt="${PROFILE.name}"></div>
        <div>
          <h2 style="margin-bottom:2px;">${PROFILE.name}</h2>
          <p class="app-lead" style="margin-bottom:6px;">${PROFILE.role}</p>
          <div class="chip"><i class="fa-solid fa-location-dot" style="margin-right:6px;"></i>${PROFILE.location}</div>
          <div class="chip"><i class="fa-solid fa-graduation-cap" style="margin-right:6px;"></i>${PROFILE.education}</div>
        </div>
      </div>
      <p>I build web applications that solve real problems while still leaving a strong visual impression. My focus is clean component structure, fast load times, and layouts that feel organic across every viewport.</p>
      <div class="app-eyebrow" style="margin-top:18px;">Journey &amp; Timeline</div>
      <div class="timeline">
        ${TIMELINE.map(t => `<div class="timeline-item"><span>${t.year}</span><h4>${t.title}</h4><p style="margin:0;">${t.text}</p></div>`).join('')}
      </div>
      <div class="app-eyebrow" style="margin-top:18px;">Tech Stack</div>
      <div class="tech-stack-row">${TECH_STACK.map(t => `<span class="chip">${t}</span>`).join('')}</div>
      <div class="app-eyebrow" style="margin-top:18px;">Connect</div>
      <div class="tech-stack-row">
        <a class="btn btn-ghost" href="${PROFILE.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a>
        <a class="btn btn-ghost" href="${PROFILE.linkedin}" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
        <a class="btn btn-ghost" href="${PROFILE.instagram}" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i> Instagram</a>
        <a class="btn btn-ghost" href="${PROFILE.twitter}" target="_blank" rel="noopener"><i class="fa-brands fa-x-twitter"></i> X</a>
      </div>
    `;
  }

  function renderProjects(body) {
    const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
    body.innerHTML = `
      <div class="app-eyebrow">Projects</div>
      <p class="app-lead" style="margin-bottom:14px;">A collection of projects showcasing web engineering, API integrations, and UI craft.</p>
      <div class="filter-row">${categories.map((c, i) => `<button class="filter-chip${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>`).join('')}</div>
      <div class="project-grid" id="projectGrid"></div>
    `;
    const grid = qs('#projectGrid', body);
    function paint(cat) {
      const list = cat === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === cat);
      grid.innerHTML = list.map(p => `
        <div class="project-card" data-id="${p.id}">
          <div class="thumb"><span class="badge">${p.badge}</span><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
          <div class="pc-body">
            <h4>${p.title}</h4>
            <p>${p.tags.slice(0, 3).join(' · ')}</p>
          </div>
        </div>
      `).join('');
      qsa('.project-card', grid).forEach(card => card.addEventListener('click', () => openProjectModal(card.dataset.id)));
    }
    paint('All');
    qsa('.filter-chip', body).forEach(chip => chip.addEventListener('click', () => {
      qsa('.filter-chip', body).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      paint(chip.dataset.cat);
    }));
  }

  function openProjectModal(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;
    const scrim = document.createElement('div');
    scrim.className = 'modal-scrim';
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <button class="pm-close" aria-label="Close">&times;</button>
      <div class="thumb"><img src="${p.img}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;"></div>
      <div class="pm-body">
        <span class="chip">${p.badge}</span>
        <h2 style="margin:10px 0 8px;">${p.title}</h2>
        <p>${p.desc}</p>
        <div class="tech-stack-row">${p.tags.map(t => `<span class="chip">${t}</span>`).join('')}</div>
        <div class="resume-actions">
          ${p.live ? `<a class="btn btn-primary" href="${p.live}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live View</a>` : ''}
          ${p.code ? `<a class="btn btn-ghost" href="${p.code}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View Code</a>` : ''}
        </div>
      </div>
    `;
    document.body.appendChild(scrim);
    document.body.appendChild(modal);
    const cleanup = () => { scrim.remove(); modal.remove(); };
    scrim.addEventListener('click', cleanup);
    qs('.pm-close', modal).addEventListener('click', cleanup);
  }

  function renderSkills(body) {
    body.innerHTML = `
      <div class="app-eyebrow">Skills</div>
      <p class="app-lead" style="margin-bottom:14px;">Technologies and disciplines across the stack.</p>
      ${SKILLS.map(cat => `
        <div class="skill-cat">
          <h4>${cat.cat}</h4>
          ${cat.items.map(s => `
            <div class="skill-row">
              <div class="skill-row-top"><span>${s.name}</span><span>${s.level}%</span></div>
              <div class="skill-bar-track"><div class="skill-bar-fill" data-level="${s.level}"></div></div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    `;
    requestAnimationFrame(() => {
      qsa('.skill-bar-fill', body).forEach(el => { el.style.width = el.dataset.level + '%'; });
    });
  }

  function renderResume(body) {
    body.innerHTML = `
      <div class="app-eyebrow">Resume</div>
      <p class="app-lead" style="margin-bottom:14px;">Preview or download the latest résumé.</p>
      <div class="resume-frame-wrap" id="resumeFrameWrap">
        <div class="resume-fallback">
          <i class="fa-solid fa-file-circle-exclamation" style="font-size:26px;color:var(--muted);margin-bottom:10px;display:block;"></i>
          Checking for résumé file…
        </div>
      </div>
      <div class="resume-actions">
        <a class="btn btn-primary" id="resumeDownloadBtn" href="${PROFILE.resumePdf}" download><i class="fa-solid fa-download"></i> Download Résumé</a>
        <button class="btn btn-ghost" id="resumeEmailBtn"><i class="fa-solid fa-paper-plane"></i> Email me for a copy</button>
      </div>
    `;
    const wrap = qs('#resumeFrameWrap', body);
    fetch(PROFILE.resumePdf, { method: 'HEAD' }).then(res => {
      if (res.ok) {
        wrap.innerHTML = `<iframe src="${PROFILE.resumePdf}" title="Résumé preview"></iframe>`;
      } else {
        throw new Error('missing');
      }
    }).catch(() => {
      wrap.innerHTML = `<div class="resume-fallback">
        <i class="fa-solid fa-file-lines" style="font-size:26px;color:var(--accent-2);margin-bottom:10px;display:block;"></i>
        No résumé file found yet.<br>Add <code>${PROFILE.resumePdf}</code> to enable preview &amp; download.
      </div>`;
      const dl = qs('#resumeDownloadBtn', body);
      dl.addEventListener('click', e => { e.preventDefault(); toast('Résumé file not uploaded yet — email me for a copy.', 'error', 'fa-solid fa-triangle-exclamation'); });
    });
    qs('#resumeEmailBtn', body).addEventListener('click', () => { window.location.href = `mailto:${PROFILE.email}?subject=Resume%20Request`; });
  }

  function renderCertificates(body) {
    body.innerHTML = `
      <div class="app-eyebrow">Certificates &amp; Achievements</div>
      <div class="cert-grid">
        ${CERTIFICATES.map(c => `
          <div class="cert-card">
            <div class="cert-icon"><i class="${c.fa5 || 'fa-solid'} ${c.icon}"></i></div>
            <h4>${c.title}</h4>
            <p>${c.org}</p>
          </div>
        `).join('')}
      </div>
      <div class="app-eyebrow" style="margin-top:20px;">Achievements</div>
      <div class="card">
        <ul style="display:flex;flex-direction:column;gap:8px;">
          ${ACHIEVEMENTS.map(a => `<li style="font-size:13px;"><i class="fa-solid fa-trophy" style="color:var(--warning);margin-right:8px;"></i>${a}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  function renderContact(body) {
    body.innerHTML = `
      <div class="app-eyebrow">Contact</div>
      <div class="availability-pill">${PROFILE.status}</div>
      <div class="contact-grid">
        <div>
          <div class="contact-info-card"><i class="fa-solid fa-envelope"></i><div><h5>Email</h5><p>${PROFILE.email}</p></div></div>
          <div class="contact-info-card"><i class="fa-solid fa-phone"></i><div><h5>Phone</h5><p>${PROFILE.phone}</p></div></div>
          <div class="contact-info-card"><i class="fa-solid fa-location-dot"></i><div><h5>Location</h5><p>${PROFILE.location}</p></div></div>
          <div class="tech-stack-row" style="margin-top:14px;">
            <a class="btn btn-ghost" href="${PROFILE.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i></a>
            <a class="btn btn-ghost" href="${PROFILE.linkedin}" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin"></i></a>
            <a class="btn btn-ghost" href="${PROFILE.instagram}" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i></a>
            <a class="btn btn-ghost" href="${PROFILE.twitter}" target="_blank" rel="noopener"><i class="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>
        <div>
          <form id="contactForm" novalidate>
            <div class="field" id="fieldName">
              <label for="cfName">Your Name</label>
              <input type="text" id="cfName" autocomplete="name" required>
              <div class="error-msg">Please enter your name.</div>
            </div>
            <div class="field" id="fieldEmail">
              <label for="cfEmail">Email Address</label>
              <input type="email" id="cfEmail" autocomplete="email" required>
              <div class="error-msg">Please enter a valid email.</div>
            </div>
            <div class="field" id="fieldMessage">
              <label for="cfMessage">Message</label>
              <textarea id="cfMessage" rows="4" required></textarea>
              <div class="error-msg">Please write a short message.</div>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;" id="cfSubmit">
              <i class="fa-solid fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    `;
    const form = qs('#contactForm', body);
    const submitBtn = qs('#cfSubmit', body);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = qs('#cfName', body), email = qs('#cfEmail', body), msg = qs('#cfMessage', body);
      let valid = true;
      const setInvalid = (fieldId, ok) => {
        const f = qs('#' + fieldId, body);
        f.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      };
      setInvalid('fieldName', name.value.trim().length > 1);
      setInvalid('fieldEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
      setInvalid('fieldMessage', msg.value.trim().length > 4);
      if (!valid) { Sound.error(); toast('Please fix the highlighted fields.', 'error', 'fa-solid fa-triangle-exclamation'); return; }
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
        toast('Message sent — I\'ll get back to you shortly.', 'success', 'fa-solid fa-circle-check');
        setTimeout(() => { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message'; }, 2600);
      }, 1200);
    });
  }

  /* ---- Terminal ---- */
  function renderTerminal(body) {
    body.innerHTML = `
      <div class="terminal-body" id="termOutput"></div>
    `;
    const out = qs('#termOutput', body);
    const printLine = (text, cls = '') => {
      const line = document.createElement('div');
      line.className = 'term-line ' + cls;
      line.textContent = text;
      out.appendChild(line);
      out.scrollTop = out.scrollHeight;
    };
    const printHTML = (html, cls = '') => {
      const line = document.createElement('div');
      line.className = 'term-line ' + cls;
      line.innerHTML = html;
      out.appendChild(line);
      out.scrollTop = out.scrollHeight;
    };
    printLine(`ArchOS Terminal v1.0 — type "help" to see available commands.`);
    addPrompt();

    function addPrompt() {
      const row = document.createElement('div');
      row.className = 'term-input-row';
      row.innerHTML = `<span class="prompt">guest@archos:~$</span> <input class="term-input" type="text" autocomplete="off" spellcheck="false" aria-label="Terminal input">`;
      out.appendChild(row);
      const input = qs('.term-input', row);
      input.focus();
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const val = input.value.trim();
          row.classList.add('cmd');
          input.remove();
          row.querySelector('.prompt').insertAdjacentText('afterend', ' ' + val);
          runCommand(val.toLowerCase());
        }
      });
      out.scrollTop = out.scrollHeight;
    }

    function runCommand(cmd) {
      const [base] = cmd.split(' ');
      switch (base) {
        case '':
          break;
        case 'help':
          printLine('Available: help, about, skills, projects, resume, contact, github, linkedin, clear, whoami, date, exit, ascii, theme');
          break;
        case 'about':
          printLine(`${PROFILE.name} — ${PROFILE.role}. Based in ${PROFILE.location}.`);
          WM.open('about');
          break;
        case 'skills':
          printLine(SKILLS.map(c => c.items.map(s => s.name).join(', ')).join(' | '));
          WM.open('skills');
          break;
        case 'projects':
          PROJECTS.forEach(p => printLine(`• ${p.title} — ${p.tags.join(', ')}`));
          WM.open('projects');
          break;
        case 'resume':
          printLine('Opening résumé…');
          WM.open('resume');
          break;
        case 'contact':
          printLine(`Email: ${PROFILE.email} | Phone: ${PROFILE.phone}`);
          WM.open('contact');
          break;
        case 'github':
          printHTML(`Opening GitHub: <a href="${PROFILE.github}" target="_blank" rel="noopener">${PROFILE.github}</a>`);
          WM.open('github');
          break;
        case 'linkedin':
          printHTML(`Opening LinkedIn: <a href="${PROFILE.linkedin}" target="_blank" rel="noopener">${PROFILE.linkedin}</a>`);
          window.open(PROFILE.linkedin, '_blank', 'noopener');
          break;
        case 'clear':
          out.innerHTML = '';
          break;
        case 'whoami':
          printLine('guest — welcome to ArchOS.');
          break;
        case 'date':
          printLine(new Date().toString());
          break;
        case 'exit':
          printLine('Closing terminal…');
          setTimeout(() => WM.close('terminal'), 500);
          return;
        case 'ascii':
          printLine('   _             _     ___  ____ ');
          printLine('  / \\   _ __ ___| |__ / _ \\/ ___|');
          printLine(" / _ \\ | '__/ __| '_ \\ | | \\___ \\");
          printLine(' / ___ \\| | | (__| | | | |_| |___) |');
          printLine('/_/   \\_\\_|  \\___|_| |_|\\___/|____/ ');
          break;
        case 'theme':
          WM.open('settings');
          printLine('Opening settings — pick an accent color there.');
          break;
        default:
          printLine(`command not found: ${base} (try "help")`, 'err');
      }
      addPrompt();
    }

    body.addEventListener('click', () => { const i = qs('.term-input', body); if (i) i.focus(); });
  }

  /* ---- File Explorer ---- */
  function renderExplorer(body) {
    const folders = {
      Images: [
        { name: 'Profile 1', file: PROFILE.photo1 },
        { name: 'Profile 2', file: PROFILE.photo2 },
        { name: 'Profile 3', file: PROFILE.photo3 },
        { name: 'Social Circle', file: 'Assets/social_circle_mockup.png' },
        { name: 'Sunrise Restaurant', file: 'Assets/otp1.JPG' },
        { name: 'S8UL Gaming', file: 'Assets/S8ul Otp 1.1.JPG' },
        { name: 'Portfolio', file: 'Assets/port 1.PNG' }
      ],
      Projects: PROJECTS.map(p => ({ name: p.title, file: p.img, projectId: p.id })),
      Resume: [{ name: 'Archit_Sharma_Resume.pdf', file: PROFILE.resumePdf, isDoc: true }],
      Downloads: [{ name: 'Archit_Sharma_Resume.pdf', file: PROFILE.resumePdf, isDoc: true }]
    };
    body.innerHTML = `
      <div class="explorer-wrap">
        <div class="explorer-side">
          ${Object.keys(folders).map((f, i) => `<button class="explorer-folder${i === 0 ? ' active' : ''}" data-folder="${f}"><i class="fa-solid fa-folder"></i> ${f}</button>`).join('')}
        </div>
        <div class="explorer-main">
          <div class="explorer-breadcrumb">This PC &gt; <span id="expBreadcrumb">Images</span></div>
          <div class="explorer-grid" id="expGrid"></div>
          <div class="explorer-preview" id="expPreview" hidden></div>
        </div>
      </div>
    `;
    const grid = qs('#expGrid', body);
    const crumb = qs('#expBreadcrumb', body);
    const preview = qs('#expPreview', body);

    function paint(folder) {
      crumb.textContent = folder;
      const items = folders[folder];
      grid.innerHTML = items.map((it, i) => `
        <button class="explorer-file" data-i="${i}">
          <span class="ef-thumb">${it.isDoc ? '<i class="fa-solid fa-file-pdf"></i>' : `<img src="${it.file}" alt="${it.name}" loading="lazy">`}</span>
          <span>${it.name}</span>
        </button>
      `).join('');
      qsa('.explorer-file', grid).forEach(btn => {
        btn.addEventListener('click', () => {
          const it = items[+btn.dataset.i];
          preview.hidden = false;
          preview.innerHTML = `
            ${it.isDoc ? '<i class="fa-solid fa-file-pdf" style="font-size:32px;color:var(--error);"></i>' : `<img src="${it.file}" alt="${it.name}">`}
            <div>
              <div style="font-weight:600;font-size:12.5px;">${it.name}</div>
              <div style="font-size:11px;color:var(--muted);">${it.file}</div>
            </div>
          `;
        });
        btn.addEventListener('dblclick', () => {
          const it = items[+btn.dataset.i];
          if (it.projectId) openProjectModal(it.projectId);
          else if (it.isDoc) WM.open('resume');
          else window.open(it.file, '_blank');
        });
      });
    }
    paint('Images');
    qsa('.explorer-folder', body).forEach(f => f.addEventListener('click', () => {
      qsa('.explorer-folder', body).forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      preview.hidden = true;
      paint(f.dataset.folder);
    }));
  }

  /* ---- Settings ---- */
  function renderSettings(body) {
    body.innerHTML = `
      <div class="app-eyebrow">Settings</div>
      <div class="settings-row">
        <div><h5>Accent Color</h5><p>Pick the highlight color used across ArchOS.</p></div>
        <div class="swatch-row">
          ${Object.entries(ACCENTS).map(([key, [c1]]) => `<button class="swatch${settings.accent === key ? ' active' : ''}" style="background:${c1};" data-accent="${key}" aria-label="${key} accent"></button>`).join('')}
        </div>
      </div>
      <div class="settings-row">
        <div><h5>Wallpaper</h5><p>Choose the desktop background mood.</p></div>
        <div class="wallpaper-swatch-row">
          <button class="wp-swatch${settings.wallpaper === 'aurora' ? ' active' : ''}" data-wp="aurora" style="background:linear-gradient(135deg,#0f172a,#1d4ed8);"></button>
          <button class="wp-swatch${settings.wallpaper === 'mesh' ? ' active' : ''}" data-wp="mesh" style="background:linear-gradient(135deg,#1e293b,#dc2626);"></button>
          <button class="wp-swatch${settings.wallpaper === 'mono' ? ' active' : ''}" data-wp="mono" style="background:linear-gradient(135deg,#0b1020,#334155);"></button>
        </div>
      </div>
      <div class="settings-row">
        <div><h5>Animations</h5><p>Particle drift, transitions and motion.</p></div>
        <button class="toggle ${settings.animations ? 'on' : ''}" id="toggleAnimations" aria-pressed="${settings.animations}"></button>
      </div>
      <div class="settings-row">
        <div><h5>Sound Effects</h5><p>Subtle clicks for open, close and errors.</p></div>
        <button class="toggle ${settings.sound ? 'on' : ''}" id="toggleSound" aria-pressed="${settings.sound}"></button>
      </div>
      <div class="settings-row">
        <div><h5>Reset</h5><p>Restore ArchOS to its default look.</p></div>
        <button class="btn btn-ghost" id="resetSettingsBtn"><i class="fa-solid fa-rotate-left"></i> Reset</button>
      </div>
    `;
    qsa('.swatch', body).forEach(s => s.addEventListener('click', () => {
      settings.accent = s.dataset.accent;
      qsa('.swatch', body).forEach(x => x.classList.remove('active'));
      s.classList.add('active');
      applySettings();
      Sound.click();
    }));
    qsa('.wp-swatch', body).forEach(s => s.addEventListener('click', () => {
      settings.wallpaper = s.dataset.wp;
      qsa('.wp-swatch', body).forEach(x => x.classList.remove('active'));
      s.classList.add('active');
      applySettings();
      Sound.click();
    }));
    qs('#toggleAnimations', body).addEventListener('click', e => {
      settings.animations = !settings.animations;
      e.target.classList.toggle('on', settings.animations);
      e.target.setAttribute('aria-pressed', settings.animations);
      applySettings();
    });
    qs('#toggleSound', body).addEventListener('click', e => {
      settings.sound = !settings.sound;
      e.target.classList.toggle('on', settings.sound);
      e.target.setAttribute('aria-pressed', settings.sound);
      persistSettings();
      if (settings.sound) Sound.click();
    });
    qs('#resetSettingsBtn', body).addEventListener('click', () => {
      settings = { ...DEFAULT_SETTINGS };
      applySettings();
      WM.close('settings');
      WM.open('settings');
      toast('Settings reset to defaults.', 'success', 'fa-solid fa-circle-check');
    });
  }

  /* ---- GitHub ---- */
  function renderGithub(body) {
    body.innerHTML = `<div class="gh-loading"><i class="fa-solid fa-spinner fa-spin"></i> Fetching live GitHub data…</div>`;
    fetch(`https://api.github.com/users/${PROFILE.githubUser}`)
      .then(r => { if (!r.ok) throw new Error('profile'); return r.json(); })
      .then(profile => {
        fetch(`https://api.github.com/users/${PROFILE.githubUser}/repos?sort=updated&per_page=5`)
          .then(r => r.ok ? r.json() : [])
          .catch(() => [])
          .then(repos => {
            const accentHex = (ACCENTS[settings.accent] || ACCENTS.blue)[0].replace('#', '');
            body.innerHTML = `
              <div class="gh-profile">
                <img src="${profile.avatar_url}" alt="${profile.login}">
                <div>
                  <h3 style="margin:0 0 2px;">${profile.name || profile.login}</h3>
                  <p style="margin:0;font-size:12.5px;">@${profile.login}${profile.bio ? ' · ' + profile.bio : ''}</p>
                </div>
              </div>
              <div class="gh-stats-row">
                <div class="card gh-stat"><b>${profile.public_repos ?? '—'}</b><span>Repos</span></div>
                <div class="card gh-stat"><b>${profile.followers ?? '—'}</b><span>Followers</span></div>
                <div class="card gh-stat"><b>${profile.following ?? '—'}</b><span>Following</span></div>
              </div>
              <div class="app-eyebrow">Contribution Activity</div>
              <div class="gh-chart card"><img src="https://ghchart.rshah.org/${accentHex}/${PROFILE.githubUser}" alt="GitHub contribution chart" loading="lazy"></div>
              <div class="app-eyebrow" style="margin-top:16px;">Recent Repositories</div>
              ${(Array.isArray(repos) && repos.length ? repos : []).map(r => `
                <div class="card gh-repo">
                  <h5><i class="fa-solid fa-code-branch" style="color:var(--accent-2);margin-right:6px;"></i>${r.name}</h5>
                  <p>${r.description || 'No description provided.'} · <i class="fa-solid fa-star" style="color:var(--warning);"></i> ${r.stargazers_count}</p>
                </div>
              `).join('') || '<p style="font-size:12.5px;">No public repositories returned.</p>'}
              <a class="btn btn-primary" style="margin-top:8px;" href="${PROFILE.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View Full Profile</a>
            `;
          });
      })
      .catch(() => {
        body.innerHTML = `
          <div class="app-eyebrow">GitHub</div>
          <p>Live GitHub data couldn't be loaded right now (offline, or the API rate limit was hit).</p>
          <a class="btn btn-primary" href="${PROFILE.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Visit GitHub Profile</a>
        `;
      });
  }

  /* ---------------------------------------------------------------
   * 15. Music player wiring
   * ------------------------------------------------------------- */
  function initMusicPlayer() {
    qs('#mpPlayBtn').addEventListener('click', () => { AmbientPlayer.toggle(); });
    qs('#mpNextBtn').addEventListener('click', () => { AmbientPlayer.next(); });
    qs('#mpVolume').addEventListener('input', e => AmbientPlayer.setVolume(parseFloat(e.target.value)));
    qs('#mpToggleCollapse').addEventListener('click', () => qs('#musicPlayer').classList.toggle('collapsed'));
    AmbientPlayer.renderUI();
  }

  /* ---------------------------------------------------------------
   * 16. Boot / init
   * ------------------------------------------------------------- */
  let desktopInitialized = false;
  function initDesktopOnce() {
    if (desktopInitialized) return;
    desktopInitialized = true;
    applySettings();
    initParticles();
    initCursorFx();
    initClock();
    buildDesktopChrome();
    buildStartMenu();
    initStartMenu();
    initSpotlight();
    initMusicPlayer();
    WM.syncTaskbar();

    setTimeout(() => toast('Welcome to ArchOS — try Cmd/Ctrl + K to search.', 'info', 'fa-solid fa-wand-magic-sparkles'), 900);

    if (!isMobile()) WM.open('about');
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-motion', settings.animations ? 'full' : 'reduced');
    runBoot();
  });
})();
