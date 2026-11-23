"""Reel 'L'Infinito': alterna ogni 2s volto (footage originale) e motion graphic."""
import math, random, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

S = "/tmp/claude-0/-home-user-fcortona/8166632e-ec4f-537c-b290-cfe1ba6e000c/scratchpad"
SRC = "/root/.claude/uploads/8166632e-ec4f-537c-b290-cfe1ba6e000c/18cbd433-video-infinito-instagram-reel.mp4"
OUT = sys.argv[1] if len(sys.argv) > 1 else "reel_infinito_motion.mp4"
ONLY = [int(x) for x in sys.argv[2].split(",")] if len(sys.argv) > 2 else None  # preview subset
W, H, FPS, SEG = 1080, 1920, 30, 60
SW, SH = 1440, 2560

GOLD = (217, 183, 122)
CREAM = (244, 236, 222)
SOFT = (200, 192, 180)

FD = "/usr/share/fonts/opentype/"
def F(name, size): return ImageFont.truetype(FD + name, size)
SERIF = "ebgaramond/EBGaramond12-Regular.otf"
SERIF_I = "ebgaramond/EBGaramond12-Italic.otf"
SANS = "montserrat/Montserrat-Medium.otf"
SANS_L = "montserrat/Montserrat-Light.otf"
SANS_SB = "montserrat/Montserrat-SemiBold.otf"

# ---------- easing ----------
def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def prog(t, a, b): return clamp((t - a) / (b - a))
def ease_out(x): return 1 - (1 - x) ** 3
def ease_inout(x): return 3 * x * x - 2 * x * x * x
def ease_back(x, s=1.70158):
    x -= 1
    return x * x * ((s + 1) * x + s) + 1

# ---------- assets ----------
bg_src = Image.open(f"{S}/gen/bg.jpg").convert("RGB")
BG = bg_src.resize((int(W * 1.18), int(H * 1.18)), Image.LANCZOS)

icons_sheet = Image.open(f"{S}/gen/icons.png").convert("RGBA")
ICON_NAMES = ["infinity", "palette", "frame", "calendar", "pin", "camera"]
ICONS = {}
for i, n in enumerate(ICON_NAMES):
    c = icons_sheet.crop(((i % 3) * 512, (i // 3) * 512, (i % 3 + 1) * 512, (i // 3 + 1) * 512))
    bb = c.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    c = c.crop((max(bb[0] - 24, 0), max(bb[1] - 24, 0), min(bb[2] + 24, 512), min(bb[3] + 24, 512)))
    ICONS[n] = c

def src_frame(t):
    p = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(t), "-i", SRC, "-frames:v", "1",
                        "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True, check=True).stdout
    return Image.frombytes("RGB", (SW, SH), p)

f_web = src_frame(3.5)
TILES = [f_web.crop(b) for b in [(60, 557, 675, 1177), (752, 557, 1376, 1177),
                                 (60, 1249, 675, 1869), (752, 1249, 1376, 1869)]]
PAINTING = src_frame(8.0).crop((228, 852, 1204, 1864))
ROOM = src_frame(10.5).crop((80, 1120, 1320, 2360))

# ---------- drawing helpers ----------
_text_cache = {}
def text_img(txt, font, size, fill, spacing=0):
    key = (txt, font, size, fill, spacing)
    if key in _text_cache: return _text_cache[key]
    f = F(font, size)
    if spacing:
        widths = [f.getlength(ch) for ch in txt]
        tw = int(sum(widths) + spacing * (len(txt) - 1)) + 10
    else:
        tw = int(f.getlength(txt)) + 10
    asc, desc = f.getmetrics()
    im = Image.new("RGBA", (tw, asc + desc + 10), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if spacing:
        x = 5
        for ch, w in zip(txt, widths):
            d.text((x, 5), ch, font=f, fill=fill); x += w + spacing
    else:
        d.text((5, 5), txt, font=f, fill=fill)
    im = im.crop(im.getbbox() or (0, 0, 1, 1))
    _text_cache[key] = im
    return im

def with_alpha(im, a):
    if a >= 0.999: return im
    im = im.copy()
    im.putalpha(im.getchannel("A").point(lambda v: int(v * a)))
    return im

def paste(canvas, im, cx, cy, alpha=1.0, scale=1.0, anchor="c"):
    if alpha <= 0.004: return
    if abs(scale - 1) > 1e-3:
        im = im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))), Image.LANCZOS)
    im = with_alpha(im, alpha)
    x = int(cx - im.width / 2) if anchor == "c" else int(cx) if anchor == "l" else int(cx - im.width)
    canvas.alpha_composite(im, (x, int(cy - im.height / 2))) if x >= 0 and cy - im.height / 2 >= 0 else canvas.paste(im, (x, int(cy - im.height / 2)), im)

def text(canvas, txt, font, size, fill, cx, cy, t, t0, dur=0.45, rise=36, spacing=0, anchor="c"):
    p = ease_out(prog(t, t0, t0 + dur))
    if p <= 0: return
    paste(canvas, text_img(txt, font, size, fill, spacing), cx, cy + (1 - p) * rise, alpha=p, anchor=anchor)

def wipe(im, p, soft=60):
    """reveal left->right"""
    if p >= 1: return im
    w = im.width
    edge = int(-soft + (w + soft) * p)
    ramp = np.clip((edge - np.arange(w)) / soft, 0, 1)
    mask = Image.fromarray((np.tile(ramp, (im.height, 1)) * 255).astype(np.uint8))
    out = im.copy()
    out.putalpha(ImageChops.multiply(im.getchannel("A"), mask))
    return out

def gold_line(canvas, cx, cy, width, p, thick=2):
    if p <= 0: return
    w = int(width * ease_out(p))
    d = ImageDraw.Draw(canvas)
    d.rectangle([cx - w // 2, cy, cx + w // 2, cy + thick], fill=GOLD + (230,))

def border_draw(canvas, box, p, color=GOLD, width=4):
    """draws rectangle perimeter progressively, from top-left clockwise"""
    if p <= 0: return
    x0, y0, x1, y1 = box
    segs = [((x0, y0), (x1, y0)), ((x1, y0), (x1, y1)), ((x1, y1), (x0, y1)), ((x0, y1), (x0, y0))]
    total = 2 * (x1 - x0) + 2 * (y1 - y0)
    left = total * ease_inout(p)
    d = ImageDraw.Draw(canvas)
    for (a, b) in segs:
        L = abs(b[0] - a[0]) + abs(b[1] - a[1])
        if left <= 0: break
        f = min(1, left / L)
        e = (a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f)
        d.line([a, e], fill=color + (255,), width=width)
        left -= L

def round_mask(size, r):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], r, fill=255)
    return m

def card(photo, size, r=26, border=3, zoom=1.0):
    w, h = size
    pw, ph = photo.size
    cw, ch = pw / zoom, ph / zoom
    ph_ = photo.crop(((pw - cw) / 2, (ph - ch) / 2, (pw + cw) / 2, (ph + ch) / 2)).resize(size, Image.LANCZOS)
    out = Image.new("RGBA", (w + 2 * border, h + 2 * border), (0, 0, 0, 0))
    ImageDraw.Draw(out).rounded_rectangle([0, 0, w + 2 * border - 1, h + 2 * border - 1], r + border, fill=GOLD + (255,))
    ph_ = ph_.convert("RGBA"); ph_.putalpha(round_mask(size, r))
    out.alpha_composite(ph_, (border, border))
    return out

def shadow(im, blur=30, alpha=0.6, grow=10):
    a = im.getchannel("A").point(lambda v: int(v * alpha))
    sh = Image.new("RGBA", (im.width + grow * 4, im.height + grow * 4), (0, 0, 0, 0))
    blk = Image.new("RGBA", im.size, (0, 0, 0, 255)); blk.putalpha(a)
    sh.alpha_composite(blk, (grow * 2, grow * 2))
    return sh.filter(ImageFilter.GaussianBlur(blur))

random.seed(7)
PARTS = [(random.uniform(0, W), random.uniform(0, H), random.uniform(1.5, 4.5),
          random.uniform(20, 70), random.uniform(0, 6.28)) for _ in range(70)]
def particles(canvas, gt, strength=1.0):
    d = ImageDraw.Draw(canvas)
    for (x, y, r, sp, ph) in PARTS:
        yy = (y - gt * sp) % H
        xx = x + 14 * math.sin(gt * 0.9 + ph)
        a = int(strength * 255 * (0.35 + 0.65 * (0.5 + 0.5 * math.sin(gt * 3 + ph))))
        d.ellipse([xx - r, yy - r, xx + r, yy + r], fill=GOLD + (a,))

def background(t, dark=0.0, base_zoom=1.0):
    z = base_zoom * (1.0 + 0.05 * t / 2)
    cw, ch = BG.width / (1.18) / z * 1.0, BG.height / 1.18 / z
    cw, ch = W / z * 1.0, H / z
    # BG is 1.18x canvas; crop a W/z x H/z window centred, then scale to canvas
    cx, cy = BG.width / 2, BG.height / 2
    im = BG.crop((int(cx - cw / 2), int(cy - ch / 2), int(cx + cw / 2), int(cy + ch / 2))).resize((W, H), Image.BILINEAR)
    if dark > 0:
        im = Image.blend(im, Image.new("RGB", (W, H), (6, 7, 12)), dark)
    return im.convert("RGBA")

def transition_in(frame, t):
    """punch-in: scale 1.10 -> 1.0 in 0.25s + white flash"""
    p = ease_out(prog(t, 0, 0.25))
    s = 1.10 - 0.10 * p
    if s > 1.001:
        cw, ch = W / s, H / s
        frame = frame.crop((int((W - cw) / 2), int((H - ch) / 2), int((W + cw) / 2), int((H + ch) / 2))).resize((W, H), Image.BILINEAR)
    fl = 0.45 * (1 - prog(t, 0, 0.17))
    if fl > 0:
        frame = Image.blend(frame, Image.new(frame.mode, (W, H), (255, 246, 230) + ((255,) if frame.mode == "RGBA" else ())), fl)
    return frame

# ---------- motion graphic scenes (t = 0..2s local, gt = global time) ----------
def mg_infinito(t, gt):
    c = background(t, dark=0.05)
    particles(c, gt, 0.8)
    inf = ICONS["infinity"]
    paste(c, wipe(inf, ease_inout(prog(t, 0.05, 0.75))), W / 2, 360, scale=0.62)
    text(c, "RAW ROME ART WEEK  ·  2019", SANS, 30, GOLD, W / 2, 520, t, 0.15, spacing=7)
    text(c, "L'Infinito", SERIF, 170, CREAM, W / 2, 1330, t, 0.3, dur=0.55, rise=60)
    gold_line(c, W / 2, 1450, 420, prog(t, 0.55, 1.05))
    text(c, "Più vicini all'universo", SERIF_I, 64, SOFT, W / 2, 1530, t, 0.65)
    text(c, "dove annega il pensiero", SERIF_I, 64, SOFT, W / 2, 1610, t, 0.8)
    return c

def mg_opera(t, gt):
    c = background(t, dark=0.55)
    particles(c, gt, 0.5)
    text(c, "LA MIA OPERA", SANS, 30, GOLD, W / 2, 300, t, 0.1, spacing=9)
    p = ease_out(prog(t, 0.05, 0.6))
    pw, ph = 720, int(720 * PAINTING.height / PAINTING.width)
    zoom = 1.0 + 0.06 * t / 2
    cw, ch = PAINTING.width / zoom, PAINTING.height / zoom
    pimg = PAINTING.crop(((PAINTING.width - cw) / 2, (PAINTING.height - ch) / 2,
                          (PAINTING.width + cw) / 2, (PAINTING.height + ch) / 2)).resize((pw, ph), Image.LANCZOS).convert("RGBA")
    cy = 860
    sc = 0.86 + 0.14 * p
    paste(c, shadow(pimg, 40, 0.8), W / 2 + 10, cy + 20, alpha=p, scale=sc)
    paste(c, pimg, W / 2, cy, alpha=p, scale=sc)
    m = 26
    border_draw(c, (W / 2 - pw / 2 - m, cy - ph / 2 - m, W / 2 + pw / 2 + m, cy + ph / 2 + m), prog(t, 0.3, 1.1), width=3)
    pp = ease_back(prog(t, 0.55, 0.95))
    if pp > 0: paste(c, ICONS["palette"], W / 2 + pw / 2 - 10, cy - ph / 2 - 20, scale=0.42 * pp, alpha=min(1, pp))
    title_y = cy + ph / 2 + 150
    wa = text_img("Innocence", SERIF_I, 96, GOLD).width; wb = text_img("— Serie I", SERIF, 96, CREAM).width
    x0 = W / 2 - (wa + 26 + wb) / 2
    text(c, "Innocence", SERIF_I, 96, GOLD, x0, title_y, t, 0.6, anchor="l")
    text(c, "— Serie I", SERIF, 96, CREAM, x0 + wa + 26, title_y, t, 0.7, anchor="l")
    text(c, "Omaggio a Betina La Plante", SERIF_I, 52, SOFT, W / 2, title_y + 105, t, 0.85)
    text(c, "OLIO SU TELA  ·  50×50 CM", SANS_L, 30, GOLD, W / 2, title_y + 180, t, 0.95, spacing=6)
    return c

def mg_roma(t, gt):
    c = background(t, dark=0.5)
    particles(c, gt, 0.6)
    text(c, "L'INFINITO", SANS, 30, GOLD, W / 2, 230, t, 0.05, spacing=9)
    text(c, "Più vicini all'universo.", SERIF_I, 84, CREAM, W / 2, 330, t, 0.15)
    p = ease_out(prog(t, 0.0, 0.6))
    cd = card(ROOM, (800, 800), zoom=1.0 + 0.08 * t / 2)
    cy = 880 + (1 - p) * 260
    paste(c, shadow(cd, 40, 0.8), W / 2 + 10, cy + 24, alpha=p)
    paste(c, cd, W / 2, cy, alpha=p)
    rows = [("pin", "Residenze Monticello", "Roma", 0.55, 1420), ("calendar", "23–25 ottobre 2019", "ore 17:00", 0.75, 1640)]
    for ic, a, b, t0, y in rows:
        q = ease_out(prog(t, t0, t0 + 0.45)); qb = ease_back(prog(t, t0, t0 + 0.4))
        if q <= 0: continue
        x = 210 - (1 - q) * 120
        paste(c, ICONS[ic], x, y, scale=0.33 * max(qb, 0.01), alpha=q)
        paste(c, text_img(a, SERIF, 62, CREAM), x + 110, y - 28, alpha=q, anchor="l")
        paste(c, text_img(b.upper(), SANS_L, 28, GOLD, 6), x + 112, y + 42, alpha=q, anchor="l")
    return c

def mg_raw(t, gt):
    c = background(t, dark=0.45)
    particles(c, gt, 0.6)
    fp = ease_back(prog(t, 0.0, 0.4))
    if fp > 0: paste(c, ICONS["frame"], W / 2, 250, scale=0.36 * fp, alpha=min(1, fp))
    text(c, "RAW ROME ART WEEK", SANS, 30, GOLD, W / 2, 390, t, 0.1, spacing=9)
    text(c, "Quarta Edizione", SERIF, 96, CREAM, W / 2, 480, t, 0.2)
    ts = 410; gap = 24
    origins = [(-500, -300, -12), (500, -300, 12), (-500, 300, 10), (500, 300, -10)]
    cx0, cy0 = W / 2, 1080
    for i, tile in enumerate(TILES):
        q = ease_out(prog(t, 0.15 + i * 0.12, 0.65 + i * 0.12))
        if q <= 0: continue
        dx = (-1 if i % 2 == 0 else 1) * (ts + gap) / 2
        dy = (-1 if i < 2 else 1) * (ts + gap) / 2
        ox, oy, rot = origins[i]
        z = 1.0 + 0.05 * t / 2
        tw, th = tile.width / z, tile.height / z
        tim = card(tile, (ts, ts), r=18, border=3, zoom=z)
        r = rot * (1 - q)
        if abs(r) > 0.1: tim = tim.rotate(r, resample=Image.BICUBIC, expand=True)
        paste(c, tim, cx0 + dx + ox * (1 - q), cy0 + dy + oy * (1 - q), alpha=q)
    gold_line(c, W / 2, 1585, 380, prog(t, 0.8, 1.2))
    text(c, "Un ricordo che resta.", SERIF_I, 70, CREAM, W / 2, 1680, t, 0.9)
    return c

def mg_end(t, gt):
    c = background(t, dark=0.1, base_zoom=1.02)
    particles(c, gt, 0.9)
    text(c, "CORTONA FRANCESCA", SANS_L, 58, GOLD, W / 2, 330, t, 0.05, spacing=12, rise=0)
    text(c, "ARTISTA", SANS, 24, SOFT, W / 2, 410, t, 0.15, spacing=10)
    gold_line(c, W / 2, 470, 160, prog(t, 0.2, 0.6))
    text(c, "L'Infinito", SERIF, 112, CREAM, W / 2, 570, t, 0.25)
    text(c, "a cura di Roberta Melasecca", SERIF_I, 50, SOFT, W / 2, 1330, t, 0.45)
    text(c, "RAW Rome Art Week  ·  Residenze Monticello, Roma", SERIF, 38, SOFT, W / 2, 1400, t, 0.55)
    q = ease_back(prog(t, 0.6, 1.0)); qa = ease_out(prog(t, 0.6, 1.0))
    if qa > 0:
        handle = text_img("@cortona.francesca.arcani", SANS_SB, 50, CREAM)
        ic_w = 0.3 * ICONS["camera"].width
        total = ic_w + 30 + handle.width
        x0 = W / 2 - total / 2
        paste(c, ICONS["camera"], x0 + ic_w / 2, 1540, scale=0.3 * max(q, 0.01), alpha=qa)
        paste(c, handle, x0 + ic_w + 30, 1540, alpha=qa, anchor="l")
    text(c, "CORTONAFRANCESCA.IT", SANS, 30, GOLD, W / 2, 1625, t, 0.8, spacing=8)
    return c

# ---------- face segments ----------
class Reader:
    def __init__(self, start, n):
        self.p = subprocess.Popen(["ffmpeg", "-v", "error", "-ss", str(start), "-i", SRC, "-frames:v", str(n),
                                   "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
        self.idx = -1; self.cur = None
    def get(self, i):
        while self.idx < i:
            b = self.p.stdout.read(SW * SH * 3)
            if len(b) < SW * SH * 3: break
            self.cur = Image.frombytes("RGB", (SW, SH), b); self.idx += 1
        return self.cur
    def close(self):
        self.p.stdout.close(); self.p.wait()

def face_seg(start, src_dur, center, z0, z1, label=None):
    def gen(gt0):
        n_src = int(round(src_dur * FPS)) + 1
        r = Reader(start, n_src)
        for k in range(SEG):
            t = k / FPS
            fr = r.get(min(int(k * src_dur / 2.0), n_src - 1))
            z = z0 + (z1 - z0) * ease_inout(k / (SEG - 1))
            cw, ch = SW / z, SH / z
            cx = clamp(center[0], cw / 2, SW - cw / 2); cy = clamp(center[1], ch / 2, SH - ch / 2)
            im = fr.crop((int(cx - cw / 2), int(cy - ch / 2), int(cx + cw / 2), int(cy + ch / 2))).resize((W, H), Image.BILINEAR)
            if label:
                im = im.convert("RGBA")
                # chip in basso con icona infinito
                q = ease_out(prog(t, 0.2, 0.6)) * (1 - prog(t, 1.75, 2.0))
                if q > 0:
                    txt = text_img(label, SANS, 30, CREAM, 6)
                    bw = txt.width + 150
                    chip = Image.new("RGBA", (bw, 84), (0, 0, 0, 0))
                    ImageDraw.Draw(chip).rounded_rectangle([0, 0, bw - 1, 83], 42, fill=(12, 12, 18, 170), outline=GOLD + (220,), width=2)
                    ic = ICONS["infinity"].resize((int(ICONS["infinity"].width * 0.17), int(ICONS["infinity"].height * 0.17)), Image.LANCZOS)
                    chip.alpha_composite(ic, (22, 42 - ic.height // 2))
                    chip.alpha_composite(txt, (40 + ic.width, 42 - txt.height // 2))
                    paste(im, chip, W / 2, 1640 + (1 - q) * 40, alpha=q)
            yield transition_in(im.convert("RGB"), t) if k < 8 else im.convert("RGB")
        r.close()
    return gen

def mg_seg(fn):
    def gen(gt0):
        for k in range(SEG):
            t = k / FPS
            yield transition_in(fn(t, gt0 + t), t).convert("RGB")
    return gen

TIMELINE = [
    face_seg(0.0, 2.0, (720, 1280), 1.00, 1.06),
    mg_seg(mg_infinito),
    face_seg(12.45, 1.75, (720, 1300), 1.00, 1.08, "IO E INNOCENCE"),
    mg_seg(mg_opera),
    face_seg(14.6, 2.0, (680, 1400), 1.00, 1.08, "UN RICORDO CHE RESTA"),
    mg_seg(mg_roma),
    face_seg(0.4, 2.0, (1100, 1480), 1.85, 2.00),
    mg_seg(mg_raw),
    face_seg(14.9, 2.0, (680, 1640), 1.60, 1.72),
    mg_seg(mg_end),
]

if __name__ == "__main__":
    # ordine scelto: 2-4, 0-2, 14-16, 6-8, 4-6, 10-12, 8-10, 18-20 (tolti i doppioni 12-14 e 16-18)
    ORDER = [1, 0, 7, 3, 2, 5, 4, 9]
    segs = ONLY if ONLY is not None else ORDER
    enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                            "-r", str(FPS), "-i", "-", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
                            "-shortest", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
                            "-profile:v", "high", "-movflags", "+faststart", "-c:a", "aac", "-b:a", "128k", OUT],
                           stdin=subprocess.PIPE)
    for pos, si in enumerate(segs):
        for fr in TIMELINE[si](pos * 2.0):
            enc.stdin.write(fr.tobytes())
        print("segment", si, "done", flush=True)
    enc.stdin.close(); enc.wait()
    print("OK", OUT)
