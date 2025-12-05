// Simple config for each angel tag
const TAGS = {
  "custom-heart": {
    title: "Give from the Heart",
    amountLabel: "",
    blurb:
      "Choose any amount that fits your budget. We’ll combine your gift with others to fully cover as many Angel Gift Lists as possible and make sure every resident feels remembered.",
    // main page – custom amount lives here
    url: "https://secure.qgiv.com/for/virtualgivingtree/"
  },
  "angel-30": {
    title: "Angel for One Resident",
    amountLabel: "Suggested gift: $30",
    blurb:
      "Helps cover one resident’s Angel Gift List — often a clothing item like a hoodie, shoes, or pajamas, plus a small treat or gift card chosen just for them.",
    url: "https://secure.qgiv.com/for/virtualgivingtree/amount/1710557/onetime"
  },
  "angel-60": {
    title: "Angel for Two Residents",
    amountLabel: "Suggested gift: $60",
    blurb:
      "Helps cover Angel Gift Lists for two residents. This might mean two clothing items, or a mix of shoes, self-care items, and gift cards so each person feels seen.",
    url: "https://secure.qgiv.com/for/virtualgivingtree/amount/1710558/onetime"
  },
  "angel-90": {
    title: "Angel for Three Residents",
    amountLabel: "Suggested gift: $90",
    blurb:
      "Helps cover Angel Gift Lists for three residents, filling their bags with a mix of clothing, self-care, and small extras that bring comfort and joy during a hard season.",
    url: "https://secure.qgiv.com/for/virtualgivingtree/amount/1710559/onetime"
  },
  "angel-150": {
    title: "Angel for Five Residents",
    amountLabel: "Suggested gift: $150",
    blurb:
      "Helps provide Angel Gifts for five residents in our recovery housing programs — a great level for families or small groups who want to make a big impact together.",
    url: "https://secure.qgiv.com/for/virtualgivingtree/amount/1710560/onetime"
  },
  "angel-300": {
    title: "Angel for Ten Residents",
    amountLabel: "Suggested gift: $300",
    blurb:
      "Helps provide Angel Gifts for ten residents. This is a powerful choice for churches, businesses, or clubs who want to surround our community with hope and support.",
    url: "https://secure.qgiv.com/for/virtualgivingtree/amount/1710562/onetime"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const tagButtons = Array.from(document.querySelectorAll(".vgt-tag"));
  const titleEl = document.getElementById("vgt-detail-title");
  const amountEl = document.getElementById("vgt-detail-amount");
  const descEl = document.getElementById("vgt-detail-description");
  const sound = document.getElementById("tagSound");

  if (sound) {
    sound.volume = 0.75; // tweak between 0.5 and 1.0 if needed
  }

  let activeId = "angel-150"; // default selection

  function applyState(id) {
    const cfg = TAGS[id];
    if (!cfg) return;

    activeId = id;

    // Toggle active class for glow
    tagButtons.forEach(btn => {
      btn.classList.toggle(
        "vgt-tag--active",
        btn.getAttribute("data-id") === id
      );
    });

    // Update text content
    titleEl.textContent = cfg.title;
    amountEl.textContent = cfg.amountLabel || "";
    descEl.textContent = cfg.blurb;
  }

  // Attach handlers
  tagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const cfg = TAGS[id];
      applyState(id);

      // sparkle burst on the clicked tag
      btn.classList.remove("vgt-tag--sparkle"); // reset if spam-clicked
      // force reflow so the animation can restart
      void btn.offsetWidth;
      btn.classList.add("vgt-tag--sparkle");

      // play chime
      try {
        if (sound) {
          sound.currentTime = 0;
          sound.play();
        }
      } catch (e) {
        // no-op
      }

      // After a short delay (let sparkle start), go to the Qgiv link for that tag
      if (cfg && cfg.url) {
        setTimeout(() => {
          try {
            // If we're inside an iframe (Qgiv embed), navigate the TOP window
            if (window.top && window.top !== window.self) {
              window.top.location.href = cfg.url;
            } else {
              // Standalone (GitHub preview, etc.) – open in a new tab
              window.open(cfg.url, "_blank");
            }
          } catch (e) {
            // Fallback: same-window navigation
            window.location.href = cfg.url;
          }
        }, 400); // 0.4s so the sparkle + chime are noticeable
      }
    });
  });

  // Initialize default state
  applyState(activeId);
});
