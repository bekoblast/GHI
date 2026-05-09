/* ==========================================================================
   GEZIRA HILA IMPEX — Main JS
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Loader ---------- */
  function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-done'), 500);
    });
    // Fallback in case `load` doesn't fire promptly
    setTimeout(() => loader.classList.add('is-done'), 2200);
  }

  /* ---------- Header scroll state + active link ---------- */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('is-active');
      }
    });

    // Mobile toggle
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-links');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('is-open');
        menu.classList.toggle('is-open');
        document.body.style.overflow = menu.classList.contains('is-open') ? 'hidden' : '';
      });
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      }));
    }
  }

  /* ---------- Word splitting for animated headings ---------- */
  function splitWords(el) {
    if (el.dataset.split === 'done') return;
    const text = el.textContent.trim();
    el.innerHTML = '';
    const words = text.split(/\s+/);
    let charIdx = 0;
    words.forEach((word, wi) => {
      const wrap = document.createElement('span');
      wrap.className = 'word';
      const inner = document.createElement('span');
      inner.textContent = word;
      inner.style.setProperty('--i', wi);
      wrap.appendChild(inner);
      el.appendChild(wrap);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.dataset.split = 'done';
  }

  function initWordReveals() {
    document.querySelectorAll('.reveal-words').forEach(splitWords);
  }

  /* ---------- IntersectionObserver Reveals ---------- */
  function initReveals() {
    const reveals = document.querySelectorAll('[data-reveal], .reveal-words, .img-reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- Counter animation ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || el.textContent);
    if (isNaN(target)) return;
    const duration = parseInt(el.dataset.duration || '1800', 10);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const v = target * ease(t);
      el.textContent = decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString();
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------- Custom cursor ---------- */
  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    let x = 0, y = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
    function loop() {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    const interactive = 'a, button, .product-card, .gallery-item, .video-showcase, .grade, .product-row';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(interactive)) cursor.classList.add('is-active');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(interactive)) cursor.classList.remove('is-active');
    });
  }

  /* ---------- Video showcase player ---------- */
  function initVideoShowcase() {
    document.querySelectorAll('.video-showcase').forEach(showcase => {
      const video = showcase.querySelector('video');
      if (!video) return;
      const play = () => {
        showcase.classList.add('is-playing');
        video.play();
      };
      showcase.addEventListener('click', () => {
        if (showcase.classList.contains('is-playing')) {
          if (video.paused) video.play(); else video.pause();
        } else {
          play();
        }
      });
    });
  }

  /* ---------- Gallery filter & lightbox ---------- */
  function initGallery() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;

    // Filter
    const buttons = document.querySelectorAll('.filter-btn');
    const items = Array.from(grid.querySelectorAll('.gallery-item'));
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        items.forEach(it => {
          const matches = filter === 'all' || it.dataset.category === filter;
          it.classList.toggle('is-hidden', !matches);
        });
      });
    });

    // Lightbox
    const lightbox = document.querySelector('.lightbox');
    const lbImg = lightbox?.querySelector('.lightbox-img');
    const lbCounter = lightbox?.querySelector('.lightbox-counter');
    if (!lightbox || !lbImg) return;
    let currentIdx = 0;
    let visible = items;

    function open(idx) {
      visible = items.filter(i => !i.classList.contains('is-hidden'));
      currentIdx = idx;
      const item = visible[idx];
      const src = item.dataset.full || item.querySelector('img').src;
      lbImg.src = src;
      if (lbCounter) lbCounter.textContent = `${idx + 1} / ${visible.length}`;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function nav(dir) {
      currentIdx = (currentIdx + dir + visible.length) % visible.length;
      const item = visible[currentIdx];
      const src = item.dataset.full || item.querySelector('img').src;
      lbImg.src = src;
      if (lbCounter) lbCounter.textContent = `${currentIdx + 1} / ${visible.length}`;
    }
    items.forEach((item, idx) => item.addEventListener('click', () => {
      const visIdx = items.filter(i => !i.classList.contains('is-hidden')).indexOf(item);
      open(visIdx);
    }));
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
    lightbox.querySelector('.lightbox-nav.prev')?.addEventListener('click', () => nav(-1));
    lightbox.querySelector('.lightbox-nav.next')?.addEventListener('click', () => nav(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') nav(-1);
      if (e.key === 'ArrowRight') nav(1);
    });
  }

  /* ---------- Subtle parallax for elements with data-parallax ---------- */
  function initParallax() {
    const els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;
    let ticking = false;
    function update() {
      const vh = window.innerHeight;
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * speed * -1;
        el.style.setProperty('--py', `${offset}px`);
        const target = el.querySelector('.bg, img, video');
        if (target) target.style.transform = `translateY(${offset}px) scale(1.08)`;
      });
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Marquee duplicate (for seamless loop) ---------- */
  function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
      const html = track.innerHTML;
      track.innerHTML = html + html;
    });
  }

  /* ---------- Form (basic feedback only) ---------- */
  function initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      setTimeout(() => {
        if (btn) { btn.textContent = 'Message Sent ✓'; btn.style.background = 'var(--green-mid)'; btn.style.color = 'var(--cream-light)'; }
        form.reset();
        setTimeout(() => {
          if (btn) { btn.disabled = false; btn.textContent = original; btn.style.background = ''; btn.style.color = ''; }
        }, 2400);
      }, 800);
    });
  }

  /* ---------- Year auto-fill in footer ---------- */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initHeader();
    initWordReveals();
    initReveals();
    initCounters();
    initCursor();
    initVideoShowcase();
    initGallery();
    initParallax();
    initMarquee();
    initForm();
    initYear();
  });
})();
