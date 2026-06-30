/* Utilidades comunes para toda la web */

/* Almacenamiento tolerante: usa localStorage si esta disponible
   (web desplegada) y si no, memoria (vista previa local). Nunca lanza. */
const Store = (() => {
  let mem = {};
  let ok = false;
  try {
    const k = "__test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    ok = true;
  } catch (e) { ok = false; }
  return {
    get(key, def = null) {
      try {
        const raw = ok ? window.localStorage.getItem(key) : mem[key];
        return raw == null ? def : JSON.parse(raw);
      } catch (e) { return def; }
    },
    set(key, val) {
      try {
        const raw = JSON.stringify(val);
        if (ok) window.localStorage.setItem(key, raw); else mem[key] = raw;
      } catch (e) { /* ignorar */ }
    }
  };
})();

/* Tema claro / oscuro */
const Tema = {
  init() {
    const guardado = Store.get("tema");
    const prefiereOscuro = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const modo = guardado || (prefiereOscuro ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", modo);
    this.pintarIcono(modo);
  },
  alternar() {
    const actual = document.documentElement.getAttribute("data-theme");
    const nuevo = actual === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nuevo);
    Store.set("tema", nuevo);
    this.pintarIcono(nuevo);
  },
  pintarIcono(modo) {
    const btn = document.getElementById("btn-tema");
    if (btn) btn.innerHTML = '<i class="ti ' + (modo === "dark" ? "ti-sun" : "ti-moon") + '"></i>';
  }
};

/* Marca el enlace activo de la navegacion segun la pagina actual */
function marcarNav() {
  const pagina = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav a").forEach(a => {
    const destino = a.getAttribute("href");
    if (destino === pagina || (pagina === "" && destino === "index.html")) a.classList.add("is-active");
  });
}

/* Carga un JSON de /data con mensaje de error claro */
async function cargarJSON(ruta) {
  const resp = await fetch(ruta, { cache: "no-cache" });
  if (!resp.ok) throw new Error("HTTP " + resp.status);
  return resp.json();
}

/* Aviso cuando no se pueden cargar los datos (tipico al abrir con file://) */
function avisoDatos(contenedor) {
  contenedor.innerHTML =
    '<div class="aviso"><p><strong>No se han podido cargar los datos.</strong></p>' +
    '<p>Si has abierto el archivo directamente desde el disco, el navegador bloquea la lectura de los JSON. ' +
    'Funciona al publicarlo en GitHub Pages o sirviendolo en local, por ejemplo con ' +
    '<code>python -m http.server</code> dentro de la carpeta del proyecto.</p></div>';
}

/* Barajar (Fisher-Yates) */
function barajar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

document.addEventListener("DOMContentLoaded", () => {
  Tema.init();
  marcarNav();
  const btn = document.getElementById("btn-tema");
  if (btn) btn.addEventListener("click", () => Tema.alternar());
});
