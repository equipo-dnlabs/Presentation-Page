/* D&N Labs — page behaviour. No dependencies. */
(function () {
  "use strict";

  /* ---------------- preloader ---------------- */
  var preloader = document.getElementById("preloader");
  if (preloader) {
    var hidePreloader = function () {
      preloader.classList.add("is-done");
      setTimeout(function () {
        preloader.remove();
      }, 600);
    };
    if (document.readyState === "complete") {
      setTimeout(hidePreloader, 600);
    } else {
      window.addEventListener("load", function () {
        setTimeout(hidePreloader, 600);
      });
    }
  }

  /* -------- header tone: the inverse of the section below -------- */
  var header = document.getElementById("header");
  var toneSections = Array.prototype.slice.call(document.querySelectorAll("[data-tone]"));

  if (header && toneSections.length) {
    var toneQueued = false;

    var syncTone = function () {
      toneQueued = false;

      var probe = document.elementFromPoint(1, header.offsetHeight + 1);
      var section = probe && probe.closest ? probe.closest("[data-tone]") : null;

      if (!section) return;
      header.classList.toggle("is-dark", section.getAttribute("data-tone") === "dark");
    };

    var queueTone = function () {
      if (toneQueued) return;
      toneQueued = true;
      window.requestAnimationFrame(syncTone);
    };

    window.addEventListener("scroll", queueTone, { passive: true });
    window.addEventListener("resize", queueTone);
    window.addEventListener("load", queueTone);
    syncTone();
  }

  /* ---------------- mobile menu ---------------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");

  if (nav && burger) {
    var lastFocus = null;

    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      document.body.style.overflow = open ? "hidden" : "";

      if (open) {
        lastFocus = document.activeElement;
        var first = nav.querySelector("a");
        if (first) first.focus();
      } else if (lastFocus) {
        lastFocus.focus();
        lastFocus = null;
      }
    };

    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setOpen(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && burger.getAttribute("aria-expanded") === "true") {
        setOpen(false);
      }
    });
  }

  /* ---------------- scroll reveals ---------------- */
  var reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && reveals.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------------- landing structure builder ---------------- */
  var SECTORS = {
    gastro: {
      note: "El orden que usamos para un local gastronómico:",
      items: [
        ["Propuesta y plato principal", "Qué cocinás y una foto que dé hambre. Es lo primero que se mira y lo que decide si sigue leyendo."],
        ["Menú con precios", "Sin PDF que hay que descargar. Se lee en el celular, con una mano y con luz baja."],
        ["Reserva directa", "WhatsApp o formulario de dos campos: día y hora. Cada campo extra cuesta reservas."],
        ["Horarios y cómo llegar", "Mapa, estacionamiento y si aceptan tarjeta. Las dudas chicas son las que hacen que alguien no vaya."],
        ["Reseñas de Google", "La prueba la ponen tus clientes, no un adjetivo nuestro. Se embeben solas y se actualizan solas."]
      ]
    },
    salud: {
      note: "El orden que usamos para un consultorio:",
      items: [
        ["Especialidad y profesional", "Quién te atiende, matrícula y formación. La confianza empieza antes del turno."],
        ["Pedir turno", "El botón principal, siempre a la vista. Con o sin orden médica, según el caso."],
        ["Obras sociales", "La lista concreta. \"Consultar\" es una respuesta que nadie quiere leer."],
        ["Sedes y horarios", "Cuál queda más cerca, a qué hora abre y dónde se estaciona."],
        ["Qué esperar en la primera consulta", "Cuánto dura, qué llevar y cómo sigue. Baja el miedo antes de que aparezca."]
      ]
    },
    servicio: {
      note: "El orden que usamos para un servicio técnico:",
      items: [
        ["Servicio y zona", "Qué arreglás y hasta dónde llegás. Acá se decide por cercanía, no por diseño."],
        ["Pedir presupuesto", "Un formulario de tres campos o un WhatsApp directo. Sin \"consulte por privado\"."],
        ["Garantía por escrito", "Qué cubre y por cuánto tiempo. Es el argumento que cierra la mayoría de las consultas."],
        ["Trabajos hechos", "Tres fotos de antes y después valen más que un párrafo sobre la experiencia."],
        ["Turnos y horarios", "Cuándo podés dejar el auto o el equipo, y cuándo lo retirás."]
      ]
    },
    profesional: {
      note: "El orden que usamos para un estudio profesional:",
      items: [
        ["Qué resolvés", "El problema del cliente en su idioma, no el nombre técnico de tu servicio."],
        ["Cómo trabajás", "Tres pasos concretos. A un estudio se lo elige por método, no por foto de oficina."],
        ["Un caso con números", "Un caso bien contado es más creíble que diez adjetivos sobre la trayectoria."],
        ["Honorarios", "Un rango o un \"desde\". Filtrar antes de la primera llamada te ahorra reuniones."],
        ["Contacto directo", "Email y agenda visibles. Sin formulario de nueve campos que nunca termina de enviarse."]
      ]
    }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".builder-tabs [role='tab']"));
  var list = document.getElementById("builderList");
  var note = document.getElementById("builderNote");
  var panel = document.getElementById("panel-estructura");

  function paint(sectorKey, activeTab) {
    var sector = SECTORS[sectorKey];
    if (!sector || !list) return;

    note.textContent = sector.note;
    list.textContent = "";

    sector.items.forEach(function (item, index) {
      var li = document.createElement("li");
      li.style.setProperty("--i", String(index));

      var title = document.createElement("b");
      title.textContent = item[0];

      var desc = document.createElement("span");
      desc.textContent = item[1];

      li.appendChild(title);
      li.appendChild(desc);
      list.appendChild(li);
    });

    tabs.forEach(function (tab) {
      var isActive = tab === activeTab;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    if (activeTab) panel.setAttribute("aria-labelledby", activeTab.id);
  }

  if (tabs.length && list && note) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { paint(tab.dataset.sector, tab); });

      tab.addEventListener("keydown", function (event) {
        var index = tabs.indexOf(tab);
        var next = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          next = tabs[(index + 1) % tabs.length];
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (event.key === "Home") {
          next = tabs[0];
        } else if (event.key === "End") {
          next = tabs[tabs.length - 1];
        }

        if (next) {
          event.preventDefault();
          next.focus();
          paint(next.dataset.sector, next);
        }
      });
    });

    paint("gastro", tabs[0]);
  }

  /* ---------------- contact form -> mailto ---------------- */
  var form = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");

  if (form && formNote) {
    var defaultNote = formNote.textContent;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nombre = form.nombre.value.trim();
      var negocio = form.negocio.value.trim();
      var mensaje = form.mensaje.value.trim();

      if (!nombre || !negocio || !mensaje) {
        formNote.textContent = "Completá los tres campos y volvé a intentar.";
        formNote.classList.add("is-error");
        var empty = [form.nombre, form.negocio, form.mensaje].filter(function (f) { return !f.value.trim(); })[0];
        if (empty) empty.focus();
        return;
      }

      formNote.textContent = defaultNote;
      formNote.classList.remove("is-error");

      var subject = "Proyecto — " + negocio;
      var body = [
        "Nombre: " + nombre,
        "Negocio: " + negocio,
        "",
        "Qué necesita:",
        mensaje,
        "",
        "— Enviado desde la web de D&N Labs"
      ].join("\n");

      window.location.href =
        "mailto:equipo.dnlabs@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }
})();
