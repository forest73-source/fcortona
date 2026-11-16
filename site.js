/* site.js — menu per cellulare e selettore lingua */
(function () {
  document.querySelectorAll('.js-header').forEach(function (h) {
    var t = h.querySelector('.menu-toggle');
    if (!t) return;
    t.addEventListener('click', function () {
      var open = h.classList.toggle('open');
      t.setAttribute('aria-expanded', open);
    });
    h.querySelectorAll('nav a').forEach(function (a) {
      if (a.parentNode.classList && a.parentNode.classList.contains('dd')) return;
      a.addEventListener('click', function () {
        h.classList.remove('open');
        t.setAttribute('aria-expanded', 'false');
      });
    });
  });
  document.querySelectorAll('.lang-switch').forEach(function (s) {
    var b = s.querySelector('.lang-btn');
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = s.classList.toggle('open');
      b.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.lang-switch.open').forEach(function (s) {
      s.classList.remove('open');
      s.querySelector('.lang-btn').setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.lang-switch.open, .js-header.open').forEach(function (el) { el.classList.remove('open'); });
  });

  /* Link a una sezione (es. opere.html#arcani-maggiori): quando la pagina ha finito di caricare,
     riporta la vista sulla sezione giusta anche se le immagini sopra hanno cambiato l'altezza */
  function goToHash() {
    if (!location.hash) return;
    var t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (t) t.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('load', function () { setTimeout(goToHash, 50); });
})();

/* Invio dei moduli (Contatti e Newsletter).
   Con la chiave Web3Forms il messaggio arriva direttamente nella mail di Francesca
   e chi scrive vede la conferma sulla pagina. Senza chiave si apre il programma di posta. */
var WEB3FORMS_KEY = 'c7d3a8ff-1bd2-4034-9028-22c1aad0d8ad';
var SITE_MAIL = 'cortonaitalianpainter@gmail.com';
(function () {
  var M = {
    it: { ok: 'Grazie! Il messaggio è stato inviato. Ti risponderò al più presto.', okNews: 'Grazie! Iscrizione ricevuta.', err: 'Invio non riuscito. Scrivimi direttamente a ', sending: 'Invio in corso…',
          nl: ['Iscrizione alla newsletter', 'Vorrei iscrivermi alla newsletter.\nLa mia email: '] },
    en: { ok: 'Thank you! Your message has been sent. I will reply as soon as possible.', okNews: 'Thank you! You are subscribed.', err: 'Sending failed. Please write to me directly at ', sending: 'Sending…',
          nl: ['Newsletter subscription', 'I would like to subscribe to the newsletter.\nMy email: '] },
    fr: { ok: 'Merci ! Votre message a bien été envoyé. Je vous répondrai au plus vite.', okNews: 'Merci ! Inscription reçue.', err: 'L’envoi a échoué. Écrivez-moi directement à ', sending: 'Envoi en cours…',
          nl: ['Inscription à la newsletter', 'Je souhaite m’inscrire à la newsletter.\nMon e-mail : '] },
    pt: { ok: 'Obrigada! A sua mensagem foi enviada. Responderei o mais breve possível.', okNews: 'Obrigada! Inscrição recebida.', err: 'O envio falhou. Escreva-me diretamente para ', sending: 'A enviar…',
          nl: ['Inscrição na newsletter', 'Gostaria de me inscrever na newsletter.\nMeu e-mail: '] },
    de: { ok: 'Danke! Deine Nachricht wurde gesendet. Ich antworte so bald wie möglich.', okNews: 'Danke! Anmeldung erhalten.', err: 'Senden fehlgeschlagen. Schreib mir direkt an ', sending: 'Wird gesendet…',
          nl: ['Newsletter-Anmeldung', 'Ich möchte den Newsletter abonnieren.\nMeine E-Mail: '] },
    zh: { ok: '谢谢！您的消息已发送，我会尽快回复。', okNews: '谢谢！订阅成功。', err: '发送失败，请直接写信至 ', sending: '发送中…',
          nl: ['订阅简报', '我想订阅简报。\n我的邮箱：'] }
  };
  var lang = (document.documentElement.lang || 'it').slice(0, 2);
  var t = M[lang] || M.it;

  function note(form, text, isErr) {
    var p = form.parentNode.querySelector('.form-note');
    if (!p) { p = document.createElement('p'); p.className = 'form-note'; p.setAttribute('role', 'status'); form.parentNode.insertBefore(p, form.nextSibling); }
    p.textContent = text;
    if (isErr) { var a = document.createElement('a'); a.href = 'mailto:' + SITE_MAIL; a.textContent = SITE_MAIL; p.appendChild(a); }
    p.classList.toggle('is-error', !!isErr);
  }

  /* subject: oggetto della mail; fields: dati del modulo; mailBody: testo per il programma di posta */
  window.cfSend = function (form, subject, fields, mailBody, okText) {
    if (!WEB3FORMS_KEY) {
      window.location.href = 'mailto:' + SITE_MAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailBody);
      return;
    }
    var btn = form.querySelector('[type="submit"]');
    if (btn) btn.disabled = true;
    note(form, t.sending);
    var data = { access_key: WEB3FORMS_KEY, subject: subject, from_name: 'Sito cortonafrancesca.it', lingua: lang };
    for (var k in fields) data[k] = fields[k];
    fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data)
    }).then(function (r) { return r.json(); }).then(function (r) {
      if (!r.success) throw new Error(r.message);
      form.reset(); form.style.display = 'none'; note(form, okText || t.ok);
    }).catch(function () {
      if (btn) btn.disabled = false; note(form, t.err, true);
    });
  };

  /* Resta in Contatto (newsletter) */
  document.querySelectorAll('.newsletter form, form.newsletter-form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = f.querySelector('input[type="email"]');
      if (!m || !m.value) return;
      window.cfSend(f, t.nl[0], { email: m.value, messaggio: t.nl[1] + m.value }, t.nl[1] + m.value, t.okNews);
    });
  });
})();


/* Menu a tendina "Opere": su computer si apre col mouse, su telefono col primo tocco */
(function () {
  var mobile = window.matchMedia('(max-width:1024px)');
  document.querySelectorAll('.dd').forEach(function (d) {
    var link = d.querySelector(':scope > a'), btn = d.querySelector('.dd-toggle');
    function set(o) { d.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); }
    btn.addEventListener('click', function (e) { e.stopPropagation(); set(!d.classList.contains('open')); });
    link.addEventListener('click', function (e) {
      if (mobile.matches) { e.preventDefault(); set(!d.classList.contains('open')); }
    });
    d.addEventListener('mouseleave', function () { if (!mobile.matches) set(false); });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.dd.open').forEach(function (d) {
      if (!d.contains(e.target)) { d.classList.remove('open'); d.querySelector('.dd-toggle').setAttribute('aria-expanded', 'false'); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.dd.open').forEach(function (d) { d.classList.remove('open'); d.querySelector('.dd-toggle').setAttribute('aria-expanded', 'false'); });
  });

  /* Ingrandimento: link con classe zoom-img aprono l'immagine grande sopra la pagina */
  document.querySelectorAll('a.zoom-img').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var box = document.createElement('div');
      box.className = 'zoom-box';
      box.setAttribute('role', 'dialog');
      var row = a.closest('[data-close]');
      var btn = document.createElement('button');
      btn.type = 'button'; btn.textContent = '×';
      btn.setAttribute('aria-label', row ? row.getAttribute('data-close') : 'Chiudi');
      var img = document.createElement('img');
      img.src = a.getAttribute('href'); img.alt = a.getAttribute('data-cap') || '';
      var cap = document.createElement('p'); cap.textContent = a.getAttribute('data-cap') || '';
      box.appendChild(btn); box.appendChild(img); box.appendChild(cap);
      function close() { box.remove(); document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; a.focus(); }
      function onKey(ev) { if (ev.key === 'Escape') close(); }
      box.addEventListener('click', function (ev) { if (ev.target !== img) close(); });
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      document.body.appendChild(box); btn.focus();
    });
  });
})();

/* Protezione immagini: blocca tasto destro e trascinamento sulle immagini */
(function(){
  function isImg(t){return t && (t.tagName==='IMG' || (t.closest && t.closest('.zoom-box,.lightbox,.work,.zoom-img')));}
  document.addEventListener('contextmenu',function(e){ if(isImg(e.target)) e.preventDefault(); },{capture:true});
  document.addEventListener('dragstart',function(e){ if(e.target && e.target.tagName==='IMG') e.preventDefault(); },{capture:true});
})();
