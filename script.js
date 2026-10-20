

(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("main section[id]")];
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    menuToggle?.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        nav.classList.toggle("open", !isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation" : "Close navigation",
        );
    });

    navLinks.forEach((link) =>
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuToggle?.setAttribute("aria-expanded", "false");
            menuToggle?.setAttribute("aria-label", "Open navigation");
        }),
    );

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -25px 0px" },
        );
        document
            .querySelectorAll(".reveal")
            .forEach((el) => revealObserver.observe(el));

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.id;
                    navLinks.forEach((link) =>
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`,
                        ),
                    );
                });
            },
            { rootMargin: "-28% 0px -58% 0px", threshold: 0 },
        );
        sections.forEach((section) => sectionObserver.observe(section));
    } else {
        document
            .querySelectorAll(".reveal")
            .forEach((el) => el.classList.add("is-visible"));
    }

    document.getElementById("year").textContent = new Date().getFullYear();

    // This form uses the visitor's email application instead of pretending to store/send data.
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const message = String(data.get("message") || "").trim();
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Hi Rishabh,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`,
        );
        status.textContent = "Opening your email app…";
        window.location.href = `mailto:rishabhsoni2184@gmail.com?subject=${subject}&body=${body}`;
        window.setTimeout(() => {
            status.textContent =
                "If your email app did not open, email rishabhsoni2184@gmail.com directly. This website does not store submissions.";
        }, 1200);
    });
})();