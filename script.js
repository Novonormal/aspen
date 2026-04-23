(function () {
  var whatsappNumber = "5567982146868";

  function openWhatsApp(message) {
    var text = encodeURIComponent(message || "Olá! Quero falar com a Aspen Construtora sobre execução de obras no MS.");
    window.open("https://wa.me/" + whatsappNumber + "?text=" + text, "_blank", "noopener,noreferrer");
  }

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  var lastScrollY = window.scrollY;
  var desktopParallax = window.matchMedia("(min-width: 921px)");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  window.addEventListener(
    "scroll",
    function () {
      var currentY = window.scrollY;

      if (header) {
        header.classList.toggle("is-scrolled", currentY > 18);

        if (currentY > 240 && currentY > lastScrollY) {
          header.classList.add("is-hidden");
        } else {
          header.classList.remove("is-hidden");
        }
      }

      document.querySelectorAll(".parallax").forEach(function (el) {
        if (desktopParallax.matches) {
          var speed = Number(el.getAttribute("data-speed") || 0.05);
          el.style.transform = "translateY(" + currentY * speed * -1 + "px)";
        } else {
          el.style.transform = "none";
        }
      });

      lastScrollY = currentY;
    },
    { passive: true }
  );

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = Number(entry.target.getAttribute("data-delay") || 0);
          setTimeout(function () {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px"
    }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll(".js-whatsapp").forEach(function (button) {
    button.addEventListener("click", function (event) {
      var message = button.getAttribute("data-message") || "Olá! Quero falar com a Aspen Construtora.";
      event.preventDefault();
      openWhatsApp(message);
    });
  });

  var form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nome = (form.querySelector("[name='nome']") || {}).value || "";
      var telefone = (form.querySelector("[name='telefone']") || {}).value || "";
      var empresa = (form.querySelector("[name='empresa']") || {}).value || "";
      var servico = (form.querySelector("[name='servico']") || {}).value || "";
      var mensagem = (form.querySelector("[name='mensagem']") || {}).value || "";

      var texto = [
        "Olá Aspen Construtora! Quero solicitar contato.",
        "",
        "Nome: " + nome,
        "Telefone: " + telefone,
        "Empresa: " + empresa,
        "Serviço de interesse: " + servico,
        "Mensagem: " + mensagem
      ].join("\n");

      openWhatsApp(texto);

      var feedback = document.getElementById("form-feedback");
      if (feedback) {
        feedback.textContent = "Redirecionando para o WhatsApp com sua mensagem pronta.";
      }

      form.reset();
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  window.addEventListener("resize", function () {
    if (!desktopParallax.matches) {
      document.querySelectorAll(".parallax").forEach(function (el) {
        el.style.transform = "none";
      });
    }
  });
})();
