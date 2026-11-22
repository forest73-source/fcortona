/* App Arcani — Cortona Francesca
   Una carta al giorno, le 22 carte, il diario (solo sul telefono, con copia di salvataggio)
   e il cofanetto (libro e ascolti bloccati finché non arrivano i codici). */
(function () {
  'use strict';
  var A = window.ARCANI;
  var main = document.getElementById('main');
  var K = { lang: 'arcani.lang', today: 'arcani.oggi.v1', diary: 'arcani.diario.v1', noInstall: 'arcani.noinstall', code: 'arcani.codice' };

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
      skip: 'Vai al contenuto', langLabel: 'Lingua',
      tabSpread: 'Stesa', spreadTitle: 'La stesa', spreadIntro: 'I metodi di lettura dal libro «Arcani».',
      methodsTitle: 'I quattro metodi', allMethods: 'Tutti i metodi', layoutTitle: 'Lo schema', positionsTitle: 'Significato delle posizioni',
      howtoTitle: 'Come usarla', beforeTitle: 'Prima di iniziare', doVirtual: 'Fai la stesa con l’app', doReal: 'Ho le carte vere',
      question: 'La tua domanda (facoltativa)', shuffle: 'Mescola e disponi le carte',
      tapToTurn: function (n) { return 'Tocca le carte per girarle, dalla 1 alla ' + n + '.'; },
      turnAll: 'Gira tutte', newSpread: 'Nuova stesa', saveSpread: 'Salva nel diario', spreadNote: 'Una nota sulla stesa (facoltativa)',
      spreadSaved: 'Stesa salvata nel diario.', pickCards: 'Fai la stesa con il tuo mazzo, poi scegli la carta uscita in ogni posizione.',
      read: 'Leggi la stesa', choose: 'Scegli…', missing: 'Scegli una carta per ogni posizione.', dup: 'Ogni carta può comparire una sola volta.',
      position: 'Posizione', reading: 'La lettura', extRhythm: 'Ritmo esterno', intRhythm: 'Ritmo interno', hidden: 'Numero nascosto',
      track: 'Traccia ritmica', noCenter: 'Nessun numero al centro: anche il vuoto è ritmo.',
      repeat: function (n) { return n === 1 ? 'Ripeti il ritmo una volta.' : 'Ripeti il ritmo ' + n + ' volte.'; },
      listen: 'Ascolta il ritmo', stop: 'Ferma', silence: 'silenzio', seeArcano: 'Vedi l’Arcano',
      offline: 'Per aprire la stesa la prima volta serve la connessione a internet.', lockedSpread: 'I metodi di lettura si sbloccano con il codice del cofanetto.',
      stepOf: 'Tappa', yourQuestion: 'La tua domanda', spreadLabel: 'Stesa', loading: 'Un momento…',
      audioList: 'Sequenza 3 6 9 – Unione · 3 9 6 – Spirito · 9 6 3 – Materia',
      codeLabel: 'Hai il codice?', unlock: 'Sblocca', checking: 'Controllo il codice…',
      badCode: 'Codice non valido. Controlla le lettere e riprova.', netErr: 'Serve la connessione a internet per aprire il cofanetto.',
      openIntro: 'Il cofanetto è aperto su questo telefono: qui trovi il libro e gli ascolti.',
      readIt: 'Leggi in italiano', readEn: 'Read in English', bookNote: 'Il libro si apre in una nuova pagina; da lì puoi anche salvarlo.',
      onYouTube: 'Apri su YouTube', listen: 'Ascolto', relock: 'Blocca di nuovo su questo telefono', retry: 'Riprova'
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
      skip: 'Skip to content', langLabel: 'Language',
      tabSpread: 'Spread', spreadTitle: 'The spread', spreadIntro: 'The reading methods from the book «Arcani».',
      methodsTitle: 'The four methods', allMethods: 'All the methods', layoutTitle: 'The layout', positionsTitle: 'Meaning of the positions',
      howtoTitle: 'How to use it', beforeTitle: 'Before starting', doVirtual: 'Do the spread in the app', doReal: 'I have the real cards',
      question: 'Your question (optional)', shuffle: 'Shuffle and lay out the cards',
      tapToTurn: function (n) { return 'Tap the cards to turn them, from 1 to ' + n + '.'; },
      turnAll: 'Turn all', newSpread: 'New spread', saveSpread: 'Save to journal', spreadNote: 'A note on the spread (optional)',
      spreadSaved: 'Spread saved to your journal.', pickCards: 'Lay out the spread with your deck, then choose the card that came out in each position.',
      read: 'Read the spread', choose: 'Choose…', missing: 'Choose a card for every position.', dup: 'Each card can appear only once.',
      position: 'Position', reading: 'The reading', extRhythm: 'External rhythm', intRhythm: 'Internal rhythm', hidden: 'Hidden number',
      track: 'Rhythmic track', noCenter: 'No number at the center: even emptiness is rhythm.',
      repeat: function (n) { return n === 1 ? 'Repeat the rhythm once.' : 'Repeat the rhythm ' + n + ' times.'; },
      listen: 'Listen to the rhythm', stop: 'Stop', silence: 'silence', seeArcano: 'See the Arcanum',
      offline: 'You need an internet connection to open the spread the first time.', lockedSpread: 'The reading methods are unlocked with the box set code.',
      stepOf: 'Step', yourQuestion: 'Your question', spreadLabel: 'Spread', loading: 'One moment…',
      audioList: 'Sequence 3 6 9 – Unity · 3 9 6 – Spirit · 9 6 3 – Matter',
      codeLabel: 'Do you have the code?', unlock: 'Unlock', checking: 'Checking the code…',
      badCode: 'Invalid code. Check the letters and try again.', netErr: 'You need an internet connection to open the box set.',
      openIntro: 'The box set is open on this phone: here are the book and the recordings.',
      readIt: 'Leggi in italiano', readEn: 'Read in English', bookNote: 'The book opens in a new page; from there you can also save it.',
      onYouTube: 'Open on YouTube', listen: 'Recording', relock: 'Lock again on this phone', retry: 'Try again'
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
  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
  function numLabel(a) { return a.noNumber ? '' : ROMAN[a.n]; }

  /* Aura: i colori dell'acquerello della carta si diffondono sullo schermo */
  var rootStyle = document.documentElement.style;
  function rgba(hex, al) { var h = hex.replace('#', ''); return 'rgba(' + parseInt(h.slice(0, 2), 16) + ',' + parseInt(h.slice(2, 4), 16) + ',' + parseInt(h.slice(4, 6), 16) + ',' + al + ')'; }
  function setAura(a, strong) {
    if (a && a.aura) { rootStyle.setProperty('--a1', rgba(a.aura[0], strong ? .34 : .24)); rootStyle.setProperty('--a2', rgba(a.aura[1], strong ? .26 : .18)); }
    else { rootStyle.setProperty('--a1', 'rgba(197,160,89,.10)'); rootStyle.setProperty('--a2', 'rgba(74,86,150,.12)'); }
  }

  /* Dorso della carta: geometria 3–6–9 (triangolo, esagono, stella a nove punte) */
  function poly(k, r, rot, step) {
    var pts = [], cx = 50, cy = 64; step = step || 1;
    for (var i = 0; i < k; i++) { var an = (rot + i * step * 360 / k) * Math.PI / 180; pts.push((cx + r * Math.sin(an)).toFixed(2) + ',' + (cy - r * Math.cos(an)).toFixed(2)); }
    return pts.join(' ');
  }
  var BACK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 137" fill="none" stroke="#C5A059">' +
    '<rect x="5" y="5" width="90" height="127" rx="3" stroke-opacity=".55" stroke-width=".6"/>' +
    '<rect x="8" y="8" width="84" height="121" rx="2" stroke-opacity=".25" stroke-width=".4"/>' +
    '<circle cx="50" cy="64" r="30" stroke-opacity=".35" stroke-width=".4"/>' +
    '<polygon points="' + poly(9, 30, 0, 4) + '" stroke-opacity=".32" stroke-width=".4"/>' +
    '<polygon points="' + poly(6, 21, 30) + '" stroke-opacity=".5" stroke-width=".5"/>' +
    '<polygon points="' + poly(3, 21, 0) + '" stroke-opacity=".75" stroke-width=".6"/>' +
    '<circle cx="50" cy="64" r="10.5" stroke-opacity=".4" stroke-width=".4"/>' +
    '<path d="M50 56.5 51.6 62.4 57.5 64 51.6 65.6 50 71.5 48.4 65.6 42.5 64 48.4 62.4Z" fill="#E6CA85" stroke="none"/>' +
    '</svg>';
  rootStyle.setProperty('--back', 'url("data:image/svg+xml,' + encodeURIComponent(BACK_SVG) + '")');
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

  var MNAME = { aspirale: { it: 'Aspirale', en: 'Aspiral' }, antenna: { it: 'Antenna', en: 'Antenna' }, ritmo: { it: 'Ritmo', en: 'Rhythm' }, frequenza: { it: 'Frequenza', en: 'Frequency' } };

  /* ——— Viste ——— */
  function viewToday() {
    var s = todayDraw(), a = s.n ? byN(s.n) : null, opened = !!a;
    main.innerHTML =
      '<section class="view today">' +
        '<p class="date">' + esc(fmtDate(s.day)) + '</p>' +
        '<h1>' + t('todayTitle') + '</h1>' +
        '<button class="flip' + (opened ? ' open' : '') + '" type="button" id="card"' + (opened ? ' disabled' : '') + ' aria-label="' + esc(t('open')) + '">' +
          '<span class="flip-in">' +
            '<span class="face back"><span class="back-art"></span><b>ARCANI</b><i>' + t('cardBackBy') + '</i></span>' +
            '<span class="face front">' + (a ? '<img src="' + img(a) + '" alt="' + esc(a.name) + '">' : '') + '</span>' +
          '</span>' +
        '</button>' +
        '<div id="txt">' + (a ? cardText(a, true) : '<p class="hint">' + t('tapHint') + '</p>') + '</div>' +
        installBox() +
      '</section>';
    var card = document.getElementById('card');
    setAura(a, true);
    if (!opened) card.addEventListener('click', function () {
      var r = draw(), b = byN(r.n);
      card.querySelector('.front').innerHTML = '<img src="' + img(b) + '" alt="' + esc(b.name) + '">';
      var im = card.querySelector('.front img');
      function go() {
        card.classList.add('open'); card.disabled = true;
        setTimeout(function () { setAura(b, true); }, 450);
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
    setAura(a, true);
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
        (editing && editing.spread ? '<input type="hidden" name="n" value="' + editing.n + '">' :
        '<label>' + t('arcano') + '<select name="n">' + A.map(function (a) {
          return '<option value="' + a.n + '"' + (a.n === preN ? ' selected' : '') + '>' + (numLabel(a) ? numLabel(a) + ' · ' : '') + esc(a.name) + '</option>';
        }).join('') + '</select></label>') +
        '<label>' + t('yourNote') + '<textarea name="text" placeholder="' + esc(t('placeholder')) + '">' + (editing ? esc(editing.text) : '') + '</textarea></label>' +
        '<div class="row"><button class="btn solid" type="submit">' + t('save') + '</button><a class="btn quiet" href="#diario">' + t('cancel') + '</a></div>' +
      '</form>') : '<div class="row" style="margin-bottom:1.4rem"><a class="btn solid" href="#diario/nuova">' + t('newNote') + '</a></div>';
    main.innerHTML = '<section class="view">' +
      '<div class="head"><h1>' + t('diaryTitle') + '</h1><p class="info">' + t('localInfo') + '</p></div>' + form +
      (list.length ? '<ul class="entries">' + list.map(function (e) {
        var a = byN(e.n) || A[0], sp = e.spread && MNAME[e.spread.m] ? e.spread : null;
        var head = sp ? t('spreadLabel') + ' · ' + MNAME[sp.m][lang] : (numLabel(a) ? numLabel(a) + ' · ' : '') + esc(a.name);
        var extra = sp ? (sp.q ? '<p class="meta">“' + esc(sp.q) + '”</p>' : '') +
          '<div class="minis">' + sp.cards.map(function (c, i) { var b2 = byN(c); return b2 ? '<a href="#arcano/' + c + '" title="' + (i + 1) + ' · ' + esc(b2.name) + '"><img src="' + img(b2, true) + '" alt="' + (i + 1) + ' · ' + esc(b2.name) + '" loading="lazy"><small>' + (i + 1) + '</small></a>' : ''; }).join('') + '</div>' : '';
        return '<li class="entry' + (sp ? ' is-spread' : '') + '"><img src="' + img(a, true) + '" alt="" loading="lazy"><div>' +
          '<p class="meta">' + esc(fmtDate(e.day)) + '</p><h3>' + head + '</h3>' + extra +
          (e.text ? '<p>' + esc(e.text) + '</p>' : '') +
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
        var txt = f.text.value.trim(); if (!txt && !(editing && editing.spread)) { toast(t('emptyNote')); return; }
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
        var item = { id: String(e.id), date: String(e.date || ''), day: String(e.day || dayKey()), n: +e.n, text: e.text };
        var s = e.spread;
        if (s && MNAME[s.m] && Array.isArray(s.cards) && s.cards.every(function (c) { return c >= 1 && c <= A.length; }))
          item.spread = { m: s.m, cards: s.cards.map(Number), q: typeof s.q === 'string' ? s.q : '' };
        all.push(item); ids[e.id] = 1; added++;
      });
      saveEntries(all); toast(added ? t('restored')(added) : t('nothingNew')); route();
    };
    r.readAsText(file);
  }

  /* ——— Cofanetto: libro e ascolti si aprono con il codice; il codice resta solo su questo telefono ——— */
  var BOX_API = 'https://arcani.forest73.workers.dev';
  var boxData = null;
  function boxHead(intro) {
    return '<div class="head"><h1>' + t('boxTitle') + '</h1><p class="intro">' + intro + '</p></div>';
  }
  function boxFoot() {
    return '<p class="foot"><a href="' + (lang === 'en' ? '../en/' : '../') + '">' + t('site') + '</a><br>© Cortona Francesca</p>';
  }
  function checkCode(code) {
    return fetch(BOX_API + '/cofanetto', { headers: { 'X-Arcani-Code': code }, cache: 'no-store' }).then(function (r) {
      if (r.status === 401) return 'bad';
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    });
  }
  function audioName(a, i) {
    var parts = String(a.title || '').replace(/[\s-]+$/, '').split(/\s+-\s+/).filter(Boolean);
    if (parts.length < 2) return { name: a.title || (t('listen') + ' ' + (i + 1)), sub: '' };
    var name = parts[0].charAt(0) + parts[0].slice(1).toLowerCase() + ' · ' + parts[1].charAt(0) + parts[1].slice(1).toLowerCase();
    return { name: name, sub: parts[lang === 'en' ? 3 : 2] || '' };
  }
  function viewBoxOpen(code, d) {
    var k = encodeURIComponent(code);
    var book = '<div class="open-box"><h2>' + t('bookTitle') + '</h2><p>' + t('bookDesc') + '</p><div class="row">' +
      (d.book.it ? '<a class="btn solid" href="' + BOX_API + '/libro?lang=it&k=' + k + '" target="_blank" rel="noopener">' + t('readIt') + '</a>' : '') +
      (d.book.en ? '<a class="btn" href="' + BOX_API + '/libro?lang=en&k=' + k + '" target="_blank" rel="noopener">' + t('readEn') + '</a>' : '') +
      '</div><p class="small">' + t('bookNote') + '</p></div>';
    var audio = '<div class="open-box"><h2>' + t('audioTitle') + '</h2><p>' + t('audioDesc') + '</p>' + d.audio.map(function (a, i) {
      var n = audioName(a, i), id = encodeURIComponent(a.id);
      return '<figure class="yt"><figcaption><b>' + esc(n.name) + '</b>' + (n.sub ? '<span>' + esc(n.sub) + '</span>' : '') + '</figcaption>' +
        '<div class="yt-frame"><iframe src="https://www.youtube-nocookie.com/embed/' + id + '?rel=0&playsinline=1" title="' + esc(n.name) + '" loading="lazy" ' +
        'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>' +
        '<a href="https://youtu.be/' + id + '" target="_blank" rel="noopener">' + t('onYouTube') + '</a></figure>';
    }).join('') + '</div>';
    main.innerHTML = '<section class="view">' + boxHead(t('openIntro')) + book + audio +
      '<p class="relock"><button type="button" class="linkish" id="relock">' + t('relock') + '</button></p>' + boxFoot() + '</section>';
    document.getElementById('relock').addEventListener('click', function () { set(K.code, ''); boxData = null; viewBox(); });
  }
  function viewBoxLocked(msg, isErr) {
    main.innerHTML = '<section class="view">' + boxHead(t('boxIntro')) +
      '<div class="box-hero" aria-hidden="true"><img src="' + img(A[0], true) + '" alt=""><img src="' + img(A[1], true) + '" alt=""><img src="' + img(A[2], true) + '" alt=""></div>' +
      '<form class="unlock" id="unlock" novalidate><label for="boxcode">' + t('codeLabel') + '</label>' +
        '<div class="unlock-row"><input id="boxcode" name="boxcode" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" placeholder="XXXX-XXXX" maxlength="24">' +
        '<button class="btn solid" type="submit">' + t('unlock') + '</button></div>' +
        '<p class="unlock-msg' + (isErr ? ' err' : '') + '" id="unlockmsg" role="status">' + (msg || '') + '</p></form>' +
      '<ul class="locked">' +
        '<li><span class="lockicon">' + lockSvg + '</span><div><h3>' + t('bookTitle') + '</h3><p>' + t('bookDesc') + '</p><span class="tag">' + t('lockTag') + '</span></div></li>' +
        '<li><span class="lockicon">' + lockSvg + '</span><div><h3>' + t('audioTitle') + '</h3><p>' + t('audioDesc') + '</p><p>' + t('audioList') + '</p><span class="tag">' + t('lockTag') + '</span></div></li>' +
      '</ul>' +
      '<div class="row"><a class="btn" href="' + reservePath() + '">' + t('reserve') + '</a></div>' + boxFoot() + '</section>';
    var form = document.getElementById('unlock'), input = document.getElementById('boxcode'), out = document.getElementById('unlockmsg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var code = input.value.trim();
      if (!code) { input.focus(); return; }
      out.className = 'unlock-msg'; out.textContent = t('checking');
      checkCode(code).then(function (d) {
        if (d === 'bad') { out.className = 'unlock-msg err'; out.textContent = t('badCode'); input.select(); return; }
        set(K.code, code); boxData = d; viewBoxOpen(code, d);
      }).catch(function () { out.className = 'unlock-msg err'; out.textContent = t('netErr'); });
    });
  }
  function viewBox() {
    var code = get(K.code, '');
    if (!code) { viewBoxLocked(); return; }
    if (boxData) { viewBoxOpen(code, boxData); return; }
    main.innerHTML = '<section class="view">' + boxHead(t('loading')) + '</section>';
    checkCode(code).then(function (d) {
      if (location.hash !== '#cofanetto') return;
      if (d === 'bad') { set(K.code, ''); viewBoxLocked(t('badCode'), true); return; }
      boxData = d; viewBoxOpen(code, d);
    }).catch(function () {
      if (location.hash !== '#cofanetto') return;
      main.innerHTML = '<section class="view">' + boxHead(t('netErr')) + '<div class="row"><button type="button" class="btn" id="boxretry">' + t('retry') + '</button></div>' + boxFoot() + '</section>';
      document.getElementById('boxretry').addEventListener('click', viewBox);
    });
  }

  /* ——— Stesa: i testi arrivano dal servizio privato su Cloudflare, mai dal sito pubblico ——— */
  var API = 'https://arcani.forest73.workers.dev';
  var stesaCache = {};
  function loadStesa() {
    if (stesaCache[lang]) return Promise.resolve(stesaCache[lang]);
    var l = lang;
    return fetch(API + '/stesa?lang=' + l, { cache: 'no-store' }).then(function (r) {
      if (r.status === 401) return { locked: true };
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    }).then(function (d) {
      if (d.locked) return 'locked';
      stesaCache[l] = d.content; set('arcani.stesa.' + l, d.content); return d.content;
    }).catch(function () {
      var c = get('arcani.stesa.' + l, null); if (c) { stesaCache[l] = c; return c; }
      return 'offline';
    });
  }

  /* Schemi come stampati nel libro (unità del disegno: larghezza w, altezza h, carta larga cw) */
  var LAYOUTS = {
    aspirale: { w: 100, h: 170, cw: 16, slots: [[1, 50, 158], [2, 50, 135], [3, 50, 112], [4, 30, 92], [5, 70, 76], [6, 30, 60], [7, 70, 44], [8, 30, 28], [9, 70, 12]],
      lines: [[1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]] },
    antenna: { w: 100, h: 172, cw: 16, slots: [[1, 30, 160], [2, 70, 144], [3, 30, 128], [4, 70, 112], [5, 30, 96], [6, 70, 80], [7, 50, 58], [8, 50, 35], [9, 50, 12]],
      lines: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 9]] },
    ritmo: { w: 100, h: 46, cw: 19, slots: [[1, 10.25, 30], [2, 29.75, 30], [3, 50, 30], [4, 69.75, 30], [5, 89.25, 30]], lines: [] },
    frequenza: { w: 100, h: 40, cw: 11, wide: true, slots: [[1, 7, 20], [2, 19, 20], [3, 31, 20], [4, 45, 9], [5, 52, 31], [6, 62, 9], [7, 69, 31], [8, 79, 9], [9, 86, 31]],
      lines: [[1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]] }
  };
  var ORDER = ['aspirale', 'antenna', 'ritmo', 'frequenza'];
  var FREQ_GROUP = { 1: 0, 2: 0, 3: 0, 4: 2, 6: 2, 8: 2, 5: 1, 7: 1, 9: 1 }; // indice in groups: presente, ottava bassa, ottava alta

  /* Ritmo: numeri romani sui margini (sinistra–centro–destra), come nell'esempio del libro.
     Da verificare sulle carte stampate: numeri di una lettera (I, V, X) e di 4–5 lettere (VIII, XIII, XVII, XVIII). */
  function split(n) {
    var a = byN(n); if (!a || a.noNumber) return ['', '', ''];
    var r = ROMAN[n];
    if (r.length === 1) return ['', r, ''];
    if (r.length === 2) return [r[0], '', r[1]];
    if (r.length === 3) return [r[0], r[1], r[2]];
    return [r[0], r.slice(1, -1), r[r.length - 1]];
  }
  function romanVal(s) { var v = { I: 1, V: 5, X: 10 }, t = 0; for (var i = 0; i < s.length; i++) { var c = v[s[i]], nx = v[s[i + 1]] || 0; t += c < nx ? -c : c; } return t; }
  function reduce(n) { while (n > 9) n = String(n).split('').reduce(function (a, d) { return a + +d; }, 0); return n; }
  function calcRitmo(cards) {
    var p = cards.map(split), edges = [p[0][0]];
    for (var i = 0; i < 4; i++) edges.push(p[i][2] + p[i + 1][0]);
    edges.push(p[4][2]);
    var beats = edges.map(function (s) { var v = s ? romanVal(s) : 0; return { r: s, v: v, d: reduce(v) }; });
    var centers = p.map(function (x) { return x[1]; }).filter(Boolean).map(function (s) { var v = romanVal(s); return { r: s, v: v, d: reduce(v) }; });
    var sum = centers.reduce(function (a, c) { return a + c.d; }, 0);
    return { parts: p, beats: beats, centers: centers, sum: sum, hidden: sum ? reduce(sum) : 0 };
  }

  /* Suono del ritmo: 1 = DO … 7 = SI (accordatura La = 432 Hz); 8 e 9 un tocco, 0 silenzio */
  var audioCtx = null, playing = null;
  function stopRhythm() { if (playing) { playing.forEach(function (o) { try { o.stop(); } catch (e) {} }); playing = null; } }
  function playRhythm(beats, times, onEnd) {
    stopRhythm();
    try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    var ctx = audioCtx, t = ctx.currentTime + .15, step = .5, nodes = [];
    var midi = [0, 60, 62, 64, 65, 67, 69, 71];
    for (var r = 0; r < Math.max(1, times); r++) {
      beats.forEach(function (b) {
        if (b.d >= 1) {
          var o = ctx.createOscillator(), g = ctx.createGain();
          if (b.d <= 7) { o.type = 'sine'; o.frequency.value = 432 * Math.pow(2, (midi[b.d] - 69) / 12); }
          else { o.type = 'triangle'; o.frequency.value = 160; }
          g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(b.d <= 7 ? .25 : .18, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + (b.d <= 7 ? .42 : .12));
          o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + .45); nodes.push(o);
        }
        t += step;
      });
      t += .7;
    }
    playing = nodes;
    var last = nodes[nodes.length - 1]; if (last) last.onended = function () { if (playing === nodes) { playing = null; onEnd && onEnd(); } }; else onEnd && onEnd();
  }

  var cur = null; // stesa in corso: { m, cards, open:{}, q, real }
  function newSpread(m, real) { return { m: m, cards: [], open: {}, q: '', real: !!real }; }
  function shuffleCards(k) { var a = A.map(function (x) { return x.n; }); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t2 = a[i]; a[i] = a[j]; a[j] = t2; } return a.slice(0, k); }

  function layoutHtml(m, cards, open, interactive) {
    var L = LAYOUTS[m], ch = L.cw * 1128 / 825, P = {};
    L.slots.forEach(function (s) { P[s[0]] = s; });
    var lines = L.lines.map(function (l) { var a = P[l[0]], b = P[l[1]]; return '<line x1="' + a[1] + '" y1="' + a[2] + '" x2="' + b[1] + '" y2="' + b[2] + '"/>'; }).join('');
    var rit = (m === 'ritmo' && cards.length === 5 && L.slots.every(function (s) { return open[s[0]]; })) ? calcRitmo(cards) : null;
    var html = '<div class="layout' + (L.wide ? ' wide' : '') + '" style="aspect-ratio:' + L.w + '/' + L.h + '">' +
      '<svg class="ly-lines" viewBox="0 0 ' + L.w + ' ' + L.h + '" preserveAspectRatio="none" aria-hidden="true">' + lines + '</svg>';
    L.slots.forEach(function (s, i) {
      var n = s[0], c = cards[i], up = !!(c && open[n]), a = up ? byN(c) : null;
      var style = 'left:' + ((s[1] - L.cw / 2) / L.w * 100) + '%;top:' + ((s[2] - ch / 2) / L.h * 100) + '%;width:' + (L.cw / L.w * 100) + '%' +
        (up && a.aura ? ';--glow:' + rgba(a.aura[0], .5) : '');
      var inner = up ? '<img src="' + img(a, true) + '" alt="' + esc(a.name) + '">' : '<span class="slot-back"></span>';
      if (up && m === 'ritmo') { var sp = split(c); inner += '<span class="rl"><i>' + sp[0] + '</i><i>' + sp[1] + '</i><i>' + sp[2] + '</i></span>'; }
      html += (interactive && c && !up)
        ? '<button class="slot" type="button" data-p="' + n + '" style="' + style + '" aria-label="' + t('position') + ' ' + n + '">' + inner + '<span class="slot-n">' + n + '</span></button>'
        : (up && interactive
          ? '<button class="slot up" type="button" data-go="' + n + '" style="' + style + '" aria-label="' + t('position') + ' ' + n + ': ' + esc(a.name) + '">' + inner + '<span class="slot-n">' + n + '</span></button>'
          : '<span class="slot' + (up ? ' up' : ' empty') + '" style="' + style + '">' + inner + '<span class="slot-n">' + n + '</span></span>');
    });
    if (rit) {
      var xs = [0].concat(L.slots.slice(0, 4).map(function (s) { return s[1] + L.cw / 2; })).concat([100]);
      xs[0] = L.slots[0][1] - L.cw / 2; xs[5] = L.slots[4][1] + L.cw / 2;
      rit.beats.forEach(function (b, i) {
        html += '<span class="beat" style="left:' + xs[i] + '%">' + (b.r || '·') + '</span>';
      });
    }
    return html + '</div>';
  }

  function stesaShell(inner) { return '<section class="view stesa">' + inner + '</section>'; }
  function para(arr) { return arr.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''); }

  function viewStesa(m, mode) {
    main.innerHTML = stesaShell('<p class="hint" style="padding:2rem 0">' + t('loading') + '</p>');
    var want = location.hash;
    loadStesa().then(function (C) {
      if (location.hash !== want) return;
      if (C === 'locked') { main.innerHTML = stesaShell('<div class="head"><h1>' + t('spreadTitle') + '</h1></div><a class="locked-note" href="#cofanetto">' + lockSvg + '<span>' + t('lockedSpread') + '</span></a>'); return; }
      if (C === 'offline') { main.innerHTML = stesaShell('<div class="head"><h1>' + t('spreadTitle') + '</h1><p class="info">' + t('offline') + '</p></div>'); return; }
      if (!m || !C.methods[m]) return stesaHome(C);
      if (mode === 'fai' || mode === 'vere') return stesaDo(C, m, mode === 'vere');
      return stesaMethod(C, m);
    });
  }

  function stesaHome(C) {
    var R = C.recommended, P = C.prep;
    main.innerHTML = stesaShell(
      '<div class="head"><h1>' + t('spreadTitle') + '</h1><p class="intro">' + t('spreadIntro') + '</p></div>' +
      '<details class="box" open><summary>' + esc(P.title) + '</summary>' +
        '<p class="lead">' + esc(P.levelsLead) + '</p><ul class="levels">' + P.levels.map(function (l) { return '<li><b>' + esc(l[0]) + '</b>: ' + esc(l[1]) + '</li>'; }).join('') + '</ul>' +
        para(P.paras) + '</details>' +
      '<h2 class="h2">' + esc(R.title) + '</h2><p class="sub">' + esc(R.sub) + '</p><p class="body">' + esc(R.intro) + '</p>' +
      '<ol class="steps">' + R.steps.map(function (s, i) {
        var mm = C.methods[s.method];
        return '<li><a href="#stesa/' + s.method + '"><span class="step-n">' + (i + 1) + '</span><span><b>' + esc(s.name) + '</b> <em>(' + esc(mm.name) + ')</em><br>' + esc(s.text) + '</span></a></li>';
      }).join('') + '</ol>' +
      '<p class="motto">' + esc(R.motto) + '</p>' +
      '<h2 class="h2">' + t('methodsTitle') + '</h2>' +
      '<ul class="methods">' + ORDER.map(function (k) { var mm = C.methods[k]; return '<li><a href="#stesa/' + k + '"><b>' + esc(mm.name) + '</b><span>' + esc(mm.short) + '</span><i>›</i></a></li>'; }).join('') + '</ul>'
    );
  }

  function positionsList(M, m) {
    if (M.positions) return '<ol class="poslist">' + M.positions.map(function (p) { return '<li><span class="pn">' + p.n + '</span><div><b>' + esc(p.title) + '</b><p>' + esc(p.q) + '</p></div></li>'; }).join('') + '</ol>';
    return '';
  }
  function groupsList(M) {
    return (M.groups || []).map(function (g) { return '<div class="grp"><span class="range">' + esc(g.range) + '</span><div><b>' + esc(g.title) + '</b><p>' + esc(g.text) + '</p></div></div>'; }).join('');
  }

  function stesaMethod(C, m) {
    var M = C.methods[m], L = LAYOUTS[m], n = L.slots.length, h = '';
    h += '<a class="back-link" href="#stesa">‹ ' + t('allMethods') + '</a>';
    h += '<div class="head"><h1>' + esc(M.name) + '</h1><p class="intro">' + esc(M.short) + '</p></div>';
    h += '<div class="body">' + para(M.intro) + '</div>';
    if (M.before) h += '<div class="box"><h3>' + t('beforeTitle') + '</h3><p>' + esc(M.before.lead) + '</p><ul class="qs">' + M.before.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ul></div>';
    if (M.rule) h += '<div class="box"><h3>' + esc(M.rule.title) + '</h3><p>' + esc(M.rule.text) + '</p></div>';
    if (M.steps) h += M.steps.map(function (s, i) { return '<div class="box"><h3>' + (i + 1) + ') ' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div>'; }).join('');
    h += '<h2 class="h2">' + t('layoutTitle') + '</h2>' + (L.wide ? '<div class="ly-scroll">' : '') + layoutHtml(m, [], {}, false) + (L.wide ? '</div>' : '');
    h += '<div class="row cta"><a class="btn solid" href="#stesa/' + m + '/fai">' + t('doVirtual') + '</a><a class="btn" href="#stesa/' + m + '/vere">' + t('doReal') + '</a></div>';
    if (M.groups) h += '<h2 class="h2">' + t('positionsTitle') + '</h2>' + groupsList(M);
    h += positionsList(M, m);
    if (M.remember) h += '<p class="motto">' + esc(M.remember) + '</p>';
    if (M.howto) h += '<h2 class="h2">' + t('howtoTitle') + '</h2><ul class="howto">' + M.howto.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    if (M.melodies) h += '<h2 class="h2">' + esc(M.melodies.title) + '</h2><div class="body">' + para(M.melodies.paras) + '</div>' +
      '<ul class="seqs">' + M.melodies.sequences.map(function (s) { return '<li><span class="code">' + esc(s.code) + '</span><div><b>' + esc(s.name) + '</b><p>' + esc(s.text) + '</p><a class="tag" href="#cofanetto">' + lockSvg + t('lockTag') + '</a></div></li>'; }).join('') + '</ul>';
    main.innerHTML = stesaShell(h);
  }

  function stesaDo(C, m, real) {
    var M = C.methods[m], L = LAYOUTS[m], k = L.slots.length;
    if (!cur || cur.m !== m || cur.real !== real) cur = newSpread(m, real);
    var h = '<a class="back-link" href="#stesa/' + m + '">‹ ' + esc(M.name) + '</a>';
    h += '<div class="head"><h1>' + esc(M.name) + '</h1></div>';
    if (!cur.cards.length) {
      if (real) {
        h += '<p class="body">' + t('pickCards') + '</p><form class="form" id="pick">' +
          '<label>' + t('question') + '<textarea name="q" rows="2" style="min-height:4rem"></textarea></label>' +
          L.slots.map(function (s) {
            var p = M.positions ? M.positions[s[0] - 1] : null;
            return '<label>' + t('position') + ' ' + s[0] + (p ? ' — ' + esc(p.title) : '') + '<select name="c' + s[0] + '"><option value="">' + t('choose') + '</option>' +
              A.map(function (a) { return '<option value="' + a.n + '">' + (numLabel(a) ? numLabel(a) + ' · ' : '') + esc(a.name) + '</option>'; }).join('') + '</select></label>';
          }).join('') +
          '<button class="btn solid" type="submit">' + t('read') + '</button></form>';
      } else {
        h += (M.before ? '<p class="body">' + esc(M.before.lead) + '</p>' : '<div class="body">' + para(M.intro.slice(0, 1)) + '</div>') +
          '<form class="form" id="go"><label>' + t('question') + '<textarea name="q" rows="2" style="min-height:4rem"></textarea></label>' +
          '<button class="btn solid" type="submit">' + t('shuffle') + '</button></form>';
      }
      main.innerHTML = stesaShell(h);
      var f = document.getElementById(real ? 'pick' : 'go');
      f.addEventListener('submit', function (ev) {
        ev.preventDefault(); cur.q = f.q.value.trim();
        if (real) {
          var cs = L.slots.map(function (s) { return +f['c' + s[0]].value; });
          if (cs.some(function (x) { return !x; })) { toast(t('missing')); return; }
          if (new Set(cs).size !== cs.length) { toast(t('dup')); return; }
          cur.cards = cs; L.slots.forEach(function (s) { cur.open[s[0]] = true; });
        } else cur.cards = shuffleCards(k);
        stesaDo(C, m, real); window.scrollTo(0, 0);
      });
      return;
    }
    var allOpen = L.slots.every(function (s) { return cur.open[s[0]]; });
    if (cur.q) h += '<p class="myq"><span>' + t('yourQuestion') + '</span>“' + esc(cur.q) + '”</p>';
    if (!allOpen) h += '<p class="hint">' + t('tapToTurn')(k) + '</p>';
    h += (L.wide ? '<div class="ly-scroll">' : '') + layoutHtml(m, cur.cards, cur.open, true) + (L.wide ? '</div>' : '');
    h += '<div class="row cta">' + (!allOpen ? '<button class="btn" type="button" id="all">' + t('turnAll') + '</button>' : '') +
      '<button class="btn quiet" type="button" id="again">' + t('newSpread') + '</button></div>';
    // lettura
    var items = L.slots.filter(function (s) { return cur.open[s[0]]; }).map(function (s) {
      var i = L.slots.indexOf(s), a = byN(cur.cards[i]), p = M.positions ? M.positions[s[0] - 1] : null, g = m === 'frequenza' ? M.groups[FREQ_GROUP[s[0]]] : null;
      return '<li class="read-item" id="pos-' + s[0] + '"><span class="pn">' + s[0] + '</span><div>' +
        (p ? '<b class="ptitle">' + esc(p.title) + '</b><p class="pq">' + esc(p.q) + '</p>' : (g ? '<b class="ptitle">' + esc(g.title) + '</b>' : '')) +
        '<a class="read-card" href="#arcano/' + a.n + '"><img src="' + img(a, true) + '" alt=""><span>' + (numLabel(a) ? '<small>' + numLabel(a) + '</small> ' : '') + '<b>' + esc(a.name) + '</b><em>' + esc(a.kw[lang]) + '</em><q>' + esc(a.line[lang]) + '</q></span></a>' +
      '</div></li>';
    });
    if (items.length) h += '<h2 class="h2">' + t('reading') + '</h2><ol class="reading">' + items.join('') + '</ol>';
    if (m === 'ritmo' && allOpen) h += ritmoBox(calcRitmo(cur.cards));
    if (allOpen && M.howto) h += '<div class="box"><h3>' + t('howtoTitle') + '</h3><ul class="howto">' + M.howto.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
    if (allOpen && M.remember) h += '<p class="motto">' + esc(M.remember) + '</p>';
    if (allOpen) h += '<form class="form" id="save"><label>' + t('spreadNote') + '<textarea name="note" rows="3" style="min-height:5rem" placeholder="' + esc(t('placeholder')) + '"></textarea></label><button class="btn solid" type="submit">' + t('saveSpread') + '</button></form>';
    main.innerHTML = stesaShell(h);

    main.querySelectorAll('button.slot[data-p]').forEach(function (b) {
      b.addEventListener('click', function () { cur.open[+b.getAttribute('data-p')] = true; var y = window.scrollY; stesaDo(C, m, real); window.scrollTo(0, y); });
    });
    main.querySelectorAll('button.slot[data-go]').forEach(function (b) {
      b.addEventListener('click', function () { var el = document.getElementById('pos-' + b.getAttribute('data-go')); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    });
    var all = document.getElementById('all'); if (all) all.addEventListener('click', function () { L.slots.forEach(function (s) { cur.open[s[0]] = true; }); var y = window.scrollY; stesaDo(C, m, real); window.scrollTo(0, y); });
    document.getElementById('again').addEventListener('click', function () { stopRhythm(); cur = newSpread(m, real); stesaDo(C, m, real); window.scrollTo(0, 0); });
    var lis = document.getElementById('listen');
    if (lis) lis.addEventListener('click', function () {
      if (playing) { stopRhythm(); lis.textContent = t('listen'); return; }
      var r = calcRitmo(cur.cards); lis.textContent = t('stop');
      playRhythm(r.beats, r.hidden || 1, function () { lis.textContent = t('listen'); });
    });
    var sv = document.getElementById('save');
    if (sv) sv.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var now = new Date(), all2 = entries();
      all2.push({ id: uid(), date: now.toISOString(), day: dayKey(now), n: cur.cards[0], text: sv.note.value.trim(), spread: { m: m, cards: cur.cards.slice(), q: cur.q } });
      saveEntries(all2); toast(t('spreadSaved')); location.hash = '#diario';
    });
  }

  function ritmoBox(r) {
    var notes = ['', 'DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'];
    var beats = r.beats.map(function (b) {
      return '<li><span class="rn">' + (b.r || '·') + '</span><span class="rv">' + (b.r ? b.v + (b.v > 9 ? ' → ' + b.d : '') : t('silence')) + '</span>' +
        '<span class="dots">' + (b.d ? new Array(b.d + 1).join('•') : '') + '</span>' + (notes[b.d] ? '<span class="note">' + notes[b.d] + '</span>' : '') + '</li>';
    }).join('');
    var trk = r.beats.map(function (b) { return b.d || '·'; }).join(' – ');
    var cen = r.centers.length ? r.centers.map(function (c) { return c.r + ' = ' + c.v + (c.v > 9 ? ' → ' + c.d : ''); }).join(' · ') + ' → ' + r.centers.map(function (c) { return c.d; }).join(' + ') + ' = ' + r.sum + (r.sum > 9 ? ' → ' + r.hidden : '') : t('noCenter');
    var ha = r.hidden ? byN(r.hidden) : null;
    return '<div class="box ritmo"><h3>' + t('extRhythm') + '</h3><ol class="beats">' + beats + '</ol>' +
      '<p class="trk"><span>' + t('track') + '</span>' + trk + '</p>' +
      '<h3>' + t('intRhythm') + '</h3><p>' + cen + '</p>' +
      (r.hidden ? '<p class="hid"><span>' + t('hidden') + '</span><b>' + r.hidden + '</b> <a href="#arcano/' + ha.n + '">' + t('seeArcano') + ': ' + esc(ha.name) + '</a></p><p>' + t('repeat')(r.hidden) + '</p>' : '') +
      '<button class="btn" type="button" id="listen">' + t('listen') + '</button></div>';
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
    setAura(null);
    if (tab === 'arcano') { viewArcano(+h[1]); tab = 'arcani'; }
    else if (tab === 'arcani') viewArcani();
    else if (tab === 'diario') viewDiary(h[1], h[2]);
    else if (tab === 'stesa') { if (!h[2]) stopRhythm(); viewStesa(h[1], h[2]); }
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
