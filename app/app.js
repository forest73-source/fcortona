/* App Arcani — Cortona Francesca
   Una carta al giorno, le 22 carte, il diario (solo sul telefono, con copia di salvataggio)
   e il cofanetto (libro e ascolti bloccati finché non arrivano i codici). */
(function () {
  'use strict';
  var A = window.ARCANI;
  var main = document.getElementById('main');
  var K = { lang: 'arcani.lang', today: 'arcani.oggi.v1', diary: 'arcani.diario.v1', noInstall: 'arcani.noinstall' };

  /* ——— Testi ——— */
  var T = {
    it: {
      tabToday: 'Oggi', tabArcani: 'Arcani', tabDiary: 'Diario', tabBox: 'Cofanetto',
      todayTitle: 'L’Arcano di oggi', tapHint: 'Tocca la carta per scoprirlo.', cardBackBy: 'Cortona Francesca',
      tomorrow: 'Domani ti aspetta un nuovo Arcano.', write: 'Scrivi nel diario', open: 'Apri la carta',
      arcaniTitle: 'I 22 Arcani', arcaniIntro: 'Ogni Arcano custodisce un nome, un simbolo e un messaggio nel viaggio della coscienza.',
      all: 'Tutti gli Arcani', prev: 'Precedente', next: 'Successivo',
      lockedChapter: 'Il capitolo completo di questo Arcano è nel libro «Arcani», incluso nel cofanetto.',
      diaryTitle: 'Il tuo diario', newNote: 'Nuova nota', arcano: 'Arcano', yourNote: 'La tua nota',
      placeholder: 'Cosa ti suscita questo Arcano?', save: 'Salva nota', cancel: 'Annulla', edit: 'Modifica', del: 'Elimina',
      confirmDel: 'Eliminare questa nota?', saved: 'Nota salvata.', deleted: 'Nota eliminata.', emptyNote: 'Scrivi qualcosa prima di salvare.',
      empty: 'Ancora nessuna nota. Scopri l’Arcano di oggi e scrivi cosa ti suscita.',
      localInfo: 'Le note restano solo su questo telefono. Salva una copia ogni tanto, così non le perdi se cambi telefono.',
      backupTitle: 'Copia del diario', backup: 'Salva una copia', restore: 'Ripristina da una copia',
      restored: function (n) { return n === 1 ? '1 nota ripristinata.' : n + ' note ripristinate.'; },
      nothingNew: 'Nessuna nota nuova: erano già tutte nel diario.', badFile: 'Questo file non è una copia del diario degli Arcani.',
      noNotes: 'Non ci sono ancora note da salvare.', copySaved: 'Copia salvata.',
      boxTitle: 'Il cofanetto degli Arcani',
      boxIntro: 'Con il cofanetto ricevi un codice personale che sblocca qui il libro e gli ascolti.',
      bookTitle: 'Il libro «Arcani»', bookDesc: 'In italiano e in inglese: i metodi di lettura e il capitolo completo di ogni Arcano.',
      audioTitle: 'Tre ascolti originali', audioDesc: 'Composizioni sonore di Francesca Cortona che accompagnano gli Arcani.',
      lockTag: 'Si sblocca con il codice del cofanetto', soon: 'Lo sblocco sarà attivo all’arrivo dei cofanetti.',
      reserve: 'Prenota il cofanetto', site: 'Visita cortonafrancesca.it',
      iosInstall: '<strong>Tienila come un’app:</strong> tocca Condividi e poi «Aggiungi alla schermata Home».',
      androidInstall: '<strong>Tienila come un’app</strong> sul telefono, con la sua icona.', installBtn: 'Installa', close: 'Chiudi',
      skip: 'Vai al contenuto', langLabel: 'Lingua'
    },
    en: {
      tabToday: 'Today', tabArcani: 'Arcana', tabDiary: 'Journal', tabBox: 'Box set',
      todayTitle: 'Today’s Arcanum', tapHint: 'Tap the card to reveal it.', cardBackBy: 'Cortona Francesca',
      tomorrow: 'A new Arcanum awaits you tomorrow.', write: 'Write in your journal', open: 'Open the card',
      arcaniTitle: 'The 22 Arcana', arcaniIntro: 'Each Arcanum holds a name, a symbol and a message on the journey of consciousness.',
      all: 'All the Arcana', prev: 'Previous', next: 'Next',
      lockedChapter: 'The full chapter on this Arcanum is in the book «Arcani», included in the box set.',
      diaryTitle: 'Your journal', newNote: 'New note', arcano: 'Arcanum', yourNote: 'Your note',
      placeholder: 'What does this Arcanum stir in you?', save: 'Save note', cancel: 'Cancel', edit: 'Edit', del: 'Delete',
      confirmDel: 'Delete this note?', saved: 'Note saved.', deleted: 'Note deleted.', emptyNote: 'Write something before saving.',
      empty: 'No notes yet. Reveal today’s Arcanum and write what it stirs in you.',
      localInfo: 'Your notes stay only on this phone. Save a copy now and then, so you don’t lose them if you change phone.',
      backupTitle: 'Journal copy', backup: 'Save a copy', restore: 'Restore from a copy',
      restored: function (n) { return n === 1 ? '1 note restored.' : n + ' notes restored.'; },
      nothingNew: 'No new notes: they were all already in the journal.', badFile: 'This file is not a copy of the Arcani journal.',
      noNotes: 'There are no notes to save yet.', copySaved: 'Copy saved.',
      boxTitle: 'The Arcani box set',
      boxIntro: 'The box set comes with a personal code that unlocks the book and the recordings here.',
      bookTitle: 'The book «Arcani»', bookDesc: 'In Italian and English: the reading methods and the full chapter on each Arcanum.',
      audioTitle: 'Three original recordings', audioDesc: 'Sound compositions by Francesca Cortona that accompany the Arcana.',
      lockTag: 'Unlocked with the box set code', soon: 'Unlocking opens when the box sets arrive.',
      reserve: 'Pre-order the box set', site: 'Visit cortonafrancesca.it',
      iosInstall: '<strong>Keep it as an app:</strong> tap Share, then «Add to Home Screen».',
      androidInstall: '<strong>Keep it as an app</strong> on your phone, with its own icon.', installBtn: 'Install', close: 'Close',
      skip: 'Skip to content', langLabel: 'Language'
    }
  };

  /* ——— Memoria del telefono (protetta: in modalità privata può non esserci) ——— */
  function get(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }

  var lang = get(K.lang, null) || ((navigator.language || 'it').slice(0, 2) === 'it' ? 'it' : 'en');
  function t(k) { return T[lang][k]; }

  /* ——— Utilità ——— */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function fmtDate(iso) {
    var p = iso.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]);
    try { return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(d); } catch (e) { return iso; }
  }
  function byN(n) { return A[n - 1]; }
  function numLabel(a) { return a.noNumber ? '' : pad(a.n); }
  function img(a, small) { return 'img/' + pad(a.n) + (small ? '-s' : '') + '.webp'; }
  function reservePath() { return lang === 'en' ? '../en/arcani.html#edizioni' : '../arcani.html#edizioni'; }
  var toastEl = document.getElementById('toast'), toastT;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2600); }
  var lockSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="1.2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>';
  var starSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg>';

  /* ——— Arcano del giorno: uno al giorno, diverso da quello di ieri ——— */
  function todayDraw() {
    var s = get(K.today, null), k = dayKey();
    if (s && s.day === k) return s;
    return { day: k, n: null, last: s ? s.n : null };
  }
  function draw() {
    var s = todayDraw(); if (s.n) return s;
    var n; do { n = 1 + Math.floor(Math.random() * A.length); } while (n === s.last && A.length > 1);
    s = { day: s.day, n: n }; set(K.today, s); return s;
  }

  /* ——— Diario ——— */
  function entries() { var e = get(K.diary, []); return Array.isArray(e) ? e : []; }
  function saveEntries(e) { return set(K.diary, e); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

  /* ——— Viste ——— */
  function viewToday() {
    var s = todayDraw(), a = s.n ? byN(s.n) : null, opened = !!a;
    main.innerHTML =
      '<section class="view today">' +
        '<h1>' + t('todayTitle') + '</h1>' +
        '<p class="date">' + esc(fmtDate(s.day)) + '</p>' +
        '<button class="flip' + (opened ? ' open' : '') + '" type="button" id="card"' + (opened ? ' disabled' : '') + ' aria-label="' + esc(t('open')) + '">' +
          '<span class="flip-in">' +
            '<span class="face back">' + starSvg + '<b>ARCANI</b><i>' + t('cardBackBy') + '</i></span>' +
            '<span class="face front">' + (a ? '<img src="' + img(a) + '" alt="' + esc(a.name) + '">' : '') + '</span>' +
          '</span>' +
        '</button>' +
        '<div id="txt">' + (a ? cardText(a, true) : '<p class="hint">' + t('tapHint') + '</p>') + '</div>' +
        installBox() +
      '</section>';
    var card = document.getElementById('card');
    if (!opened) card.addEventListener('click', function () {
      var r = draw(), b = byN(r.n);
      card.querySelector('.front').innerHTML = '<img src="' + img(b) + '" alt="' + esc(b.name) + '">';
      var im = card.querySelector('.front img');
      function go() {
        card.classList.add('open'); card.disabled = true;
        document.getElementById('txt').innerHTML = cardText(b, false);
        requestAnimationFrame(function () { requestAnimationFrame(function () { var rv = document.querySelector('.reveal'); if (rv) rv.classList.add('on'); }); });
      }
      if (im.complete) go(); else { im.onload = go; im.onerror = go; }
    });
    bindInstall();
  }
  function cardText(a, now) {
    return '<div class="reveal' + (now ? ' on now' : '') + '">' +
      (numLabel(a) ? '<p class="num">' + numLabel(a) + '</p>' : '') +
      '<h2 class="aname">' + esc(a.name) + '</h2>' +
      '<p class="kw">' + esc(a.kw[lang]) + '</p>' +
      '<p class="line">“' + esc(a.line[lang]) + '”</p>' +
      '<div class="row" style="justify-content:center"><a class="btn solid" href="#diario/nuova/' + a.n + '">' + t('write') + '</a></div>' +
      '<p class="tomorrow">' + t('tomorrow') + '</p>' +
    '</div>';
  }

  function viewArcani() {
    main.innerHTML = '<section class="view">' +
      '<div class="head"><h1>' + t('arcaniTitle') + '</h1><p class="intro">' + t('arcaniIntro') + '</p></div>' +
      '<ul class="grid">' + A.map(function (a) {
        return '<li><a href="#arcano/' + a.n + '"><img src="' + img(a, true) + '" alt="" loading="lazy" width="360" height="492">' +
          '<span>' + (numLabel(a) ? '<small>' + numLabel(a) + '</small>' : '') + esc(a.name) + '</span></a></li>';
      }).join('') + '</ul></section>';
  }

  function viewArcano(n) {
    var a = byN(n); if (!a) { location.hash = '#arcani'; return; }
    var p = byN(n === 1 ? A.length : n - 1), x = byN(n === A.length ? 1 : n + 1);
    main.innerHTML = '<section class="view detail">' +
      '<a class="back-link" href="#arcani">‹ ' + t('all') + '</a>' +
      '<figure><img src="' + img(a) + '" alt="' + esc(a.name) + '" width="825" height="1128"></figure>' +
      '<div class="txt">' +
        (numLabel(a) ? '<p class="num">' + numLabel(a) + '</p>' : '') +
        '<h1 class="aname">' + esc(a.name) + '</h1>' +
        '<p class="kw">' + esc(a.kw[lang]) + '</p>' +
        '<p class="line">“' + esc(a.line[lang]) + '”</p>' +
        '<a class="btn" href="#diario/nuova/' + a.n + '">' + t('write') + '</a>' +
      '</div>' +
      '<a class="locked-note" href="#cofanetto">' + lockSvg + '<span>' + t('lockedChapter') + '</span></a>' +
      '<div class="pager"><a class="btn quiet" href="#arcano/' + p.n + '">‹ ' + esc(p.name) + '</a><a class="btn quiet" href="#arcano/' + x.n + '">' + esc(x.name) + ' ›</a></div>' +
    '</section>';
    // scorrere col dito tra le carte
    var x0 = null, fig = main.querySelector('figure');
    fig.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    fig.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 60) location.hash = '#arcano/' + (dx < 0 ? x.n : p.n);
    });
  }

  function viewDiary(mode, arg) {
    var list = entries().sort(function (a, b) { return b.date < a.date ? -1 : 1; });
    var editing = mode === 'modifica' ? list.filter(function (e) { return e.id === arg; })[0] : null;
    var showForm = mode === 'nuova' || editing;
    var preN = editing ? editing.n : (+arg || todayDraw().n || 1);
    var form = showForm ? (
      '<form class="form" id="f">' +
        '<label>' + t('arcano') + '<select name="n">' + A.map(function (a) {
          return '<option value="' + a.n + '"' + (a.n === preN ? ' selected' : '') + '>' + (numLabel(a) ? numLabel(a) + ' · ' : '') + esc(a.name) + '</option>';
        }).join('') + '</select></label>' +
        '<label>' + t('yourNote') + '<textarea name="text" placeholder="' + esc(t('placeholder')) + '">' + (editing ? esc(editing.text) : '') + '</textarea></label>' +
        '<div class="row"><button class="btn solid" type="submit">' + t('save') + '</button><a class="btn quiet" href="#diario">' + t('cancel') + '</a></div>' +
      '</form>') : '<div class="row" style="margin-bottom:1.4rem"><a class="btn solid" href="#diario/nuova">' + t('newNote') + '</a></div>';
    main.innerHTML = '<section class="view">' +
      '<div class="head"><h1>' + t('diaryTitle') + '</h1><p class="info">' + t('localInfo') + '</p></div>' + form +
      (list.length ? '<ul class="entries">' + list.map(function (e) {
        var a = byN(e.n) || A[0];
        return '<li class="entry"><img src="' + img(a, true) + '" alt="" loading="lazy"><div>' +
          '<p class="meta">' + esc(fmtDate(e.day)) + '</p><h3>' + (numLabel(a) ? numLabel(a) + ' · ' : '') + esc(a.name) + '</h3>' +
          '<p>' + esc(e.text) + '</p>' +
          '<div class="row"><a class="btn quiet" href="#diario/modifica/' + e.id + '">' + t('edit') + '</a><button class="btn quiet" type="button" data-del="' + e.id + '">' + t('del') + '</button></div>' +
        '</div></li>';
      }).join('') + '</ul>' : '<p class="empty">' + t('empty') + '</p>') +
      '<div class="backup"><h2>' + t('backupTitle') + '</h2>' +
        '<div class="row"><button class="btn" type="button" id="bk">' + t('backup') + '</button>' +
        '<label class="btn quiet" for="rs">' + t('restore') + '</label><input type="file" id="rs" accept="application/json,.json" hidden></div></div>' +
    '</section>';

    var f = document.getElementById('f');
    if (f) {
      if (!editing) f.text.focus();
      f.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var txt = f.text.value.trim(); if (!txt) { toast(t('emptyNote')); return; }
        var all = entries();
        if (editing) { all.forEach(function (e) { if (e.id === editing.id) { e.text = txt; e.n = +f.n.value; } }); }
        else { var now = new Date(); all.push({ id: uid(), date: now.toISOString(), day: dayKey(now), n: +f.n.value, text: txt }); }
        saveEntries(all); toast(t('saved')); location.hash = '#diario';
      });
    }
    main.querySelectorAll('[data-del]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!confirm(t('confirmDel'))) return;
        saveEntries(entries().filter(function (e) { return e.id !== b.getAttribute('data-del'); }));
        toast(t('deleted')); route();
      });
    });
    document.getElementById('bk').addEventListener('click', backup);
    document.getElementById('rs').addEventListener('change', function (ev) { var file = ev.target.files[0]; if (file) restore(file); ev.target.value = ''; });
  }

  /* Copia del diario: file .json da tenere su iCloud, Drive o nel telefono */
  function backup() {
    var all = entries(); if (!all.length) { toast(t('noNotes')); return; }
    var data = JSON.stringify({ app: 'arcani-cortona-francesca', version: 1, exported: new Date().toISOString(), entries: all }, null, 1);
    var name = 'diario-arcani-' + dayKey() + '.json';
    var file;
    try { file = new File([data], name, { type: 'application/json' }); } catch (e) { file = null; }
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: name }).then(function () { toast(t('copySaved')); }).catch(function () {});
      return;
    }
    var url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
    var a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000); toast(t('copySaved'));
  }
  function restore(file) {
    var r = new FileReader();
    r.onload = function () {
      var d; try { d = JSON.parse(r.result); } catch (e) { d = null; }
      if (!d || d.app !== 'arcani-cortona-francesca' || !Array.isArray(d.entries)) { toast(t('badFile')); return; }
      var all = entries(), ids = {}; all.forEach(function (e) { ids[e.id] = 1; });
      var added = 0;
      d.entries.forEach(function (e) {
        if (!e || typeof e.text !== 'string' || !e.id || ids[e.id] || !(e.n >= 1 && e.n <= A.length)) return;
        all.push({ id: String(e.id), date: String(e.date || ''), day: String(e.day || dayKey()), n: +e.n, text: e.text }); ids[e.id] = 1; added++;
      });
      saveEntries(all); toast(added ? t('restored')(added) : t('nothingNew')); route();
    };
    r.readAsText(file);
  }

  function viewBox() {
    main.innerHTML = '<section class="view">' +
      '<div class="head"><h1>' + t('boxTitle') + '</h1><p class="intro">' + t('boxIntro') + '</p></div>' +
      '<div class="box-hero" aria-hidden="true"><img src="' + img(A[0], true) + '" alt=""><img src="' + img(A[1], true) + '" alt=""><img src="' + img(A[2], true) + '" alt=""></div>' +
      '<ul class="locked">' +
        '<li><span class="lockicon">' + lockSvg + '</span><div><h3>' + t('bookTitle') + '</h3><p>' + t('bookDesc') + '</p><span class="tag">' + t('lockTag') + '</span></div></li>' +
        '<li><span class="lockicon">' + lockSvg + '</span><div><h3>' + t('audioTitle') + '</h3><p>' + t('audioDesc') + '</p><span class="tag">' + t('lockTag') + '</span></div></li>' +
      '</ul>' +
      '<p class="soon">' + t('soon') + '</p>' +
      '<div class="row"><a class="btn solid" href="' + reservePath() + '">' + t('reserve') + '</a></div>' +
      '<p class="foot"><a href="' + (lang === 'en' ? '../en/' : '../') + '">' + t('site') + '</a><br>© Cortona Francesca</p>' +
    '</section>';
  }

  /* ——— Installazione sul telefono ——— */
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; if (/^#?(oggi)?$/.test(location.hash)) route(); });
  function standalone() { return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; }
  function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function installBox() {
    if (standalone() || get(K.noInstall, false)) return '';
    if (deferred) return '<div class="install" id="inst"><p>' + t('androidInstall') + '</p><button class="btn" type="button" id="instgo">' + t('installBtn') + '</button><button class="x" type="button" aria-label="' + t('close') + '" id="instx">×</button></div>';
    if (isIOS()) return '<div class="install" id="inst"><p>' + t('iosInstall') + '</p><button class="x" type="button" aria-label="' + t('close') + '" id="instx">×</button></div>';
    return '';
  }
  function bindInstall() {
    var x = document.getElementById('instx'), go = document.getElementById('instgo');
    if (x) x.addEventListener('click', function () { set(K.noInstall, true); document.getElementById('inst').remove(); });
    if (go) go.addEventListener('click', function () { deferred.prompt(); deferred.userChoice.finally(function () { deferred = null; var i = document.getElementById('inst'); if (i) i.remove(); }); });
  }

  /* ——— Lingua e navigazione ——— */
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = t(el.getAttribute('data-t')); });
    document.querySelectorAll('#lang [data-l]').forEach(function (el) { el.classList.toggle('on', el.getAttribute('data-l') === lang); });
    document.getElementById('lang').setAttribute('aria-label', t('langLabel') + ': ' + (lang === 'it' ? 'Italiano' : 'English'));
    document.querySelector('.skip').textContent = t('skip');
  }
  document.getElementById('lang').addEventListener('click', function () { lang = lang === 'it' ? 'en' : 'it'; set(K.lang, lang); applyLang(); route(); });

  var lastTab = null;
  function route() {
    var h = (location.hash || '#oggi').slice(1).split('/'), tab = h[0] || 'oggi';
    if (tab === 'arcano') { viewArcano(+h[1]); tab = 'arcani'; }
    else if (tab === 'arcani') viewArcani();
    else if (tab === 'diario') viewDiary(h[1], h[2]);
    else if (tab === 'cofanetto') viewBox();
    else { tab = 'oggi'; viewToday(); }
    document.querySelectorAll('.tabs a').forEach(function (a) {
      if (a.getAttribute('data-tab') === tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (lastTab !== null) window.scrollTo(0, 0);
    lastTab = tab;
  }
  window.addEventListener('hashchange', route);
  // a mezzanotte, se l'app resta aperta, la carta di oggi si rinnova al ritorno
  document.addEventListener('visibilitychange', function () { if (!document.hidden && /^#?(oggi)?$/.test(location.hash)) route(); });

  applyLang(); route();

  /* Funziona anche senza rete, dopo la prima apertura */
  if ('serviceWorker' in navigator) window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
})();
