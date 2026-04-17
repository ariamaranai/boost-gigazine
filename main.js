addEventListener("DOMContentLoaded", () => {
  for(let g = document.images, p, s, i = 0; i < g.length; ++i)
    (s = (p = g[i]).dataset.src) && (p.src = s);
}, { once: !0 });