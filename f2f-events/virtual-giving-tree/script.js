// ================================
// Virtual Giving Tree – Angel Tags
// ================================

// TODO: set this to your actual Qgiv donation form URL
const QGIV_DONATION_URL = "https://secure.qgiv.com/for/f2f/placeholder-virtual-giving-tree";

const TAG_CONFIG = {
  "give-heart": {
    title: "Give from the Heart",
    amountLabel: "Custom amount",
    description:
      "Prefer a different amount? Choose your own gift and we’ll combine it with others to fully cover Angel Gift Lists for our residents.",
    presetAmount: null
  },
  "angel-one": {
    title: "Angel for One Resident",
    amountLabel: "$30",
    description:
      "Helps cover one resident’s Angel Gift List — things like a hoodie, shoes, pajamas, headphones, a gift card, and a small treat.",
    presetAmount: 30
  },
  "angel-two": {
    title: "Angel for Two Residents",
    amountLabel: "$60",
    description:
      "Helps provide Angel Gifts for two residents in our housing programs. Your generosity fills two wish lists with clothing, self care items, and extras.",
    presetAmount: 60
  },
  "angel-three": {
    title: "Angel for Three Residents",
    amountLabel: "$90",
    description:
      "Sponsors Angel Gift Lists for three residents, making sure more people feel remembered and cared for this Christmas.",
    presetAmount: 90
  },
  "angel-five": {
    title: "Angel for Five Residents",
    amountLabel: "$150",
    description:
      "Helps provide Angel Gifts for five residents in our recovery housing programs — a great level for families or small groups.",
    presetAmount: 150
  },
  "angel-ten": {
    title: "Angel for Ten Residents",
    amountLabel: "$300",
    description:
      "Sponsors Angel Gift Lists for ten residents. Perfect for churches, businesses, or community groups who want to make a big impact.",
    presetAmount: 300
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const tags = Array.from(document.querySelectorAll(".vgt-tag"));
  const detailTitle = document.getElementById("vgt-detail-title");
  const detailAmount = document.getElementById("vgt-detail-amount");
  const detailDescription = document.getElementById("vgt-detail-description");
  const donateButton = document.getElementById("vgt-donate-button");
  const chime = document.getElementById("ornamentSound");

  let currentTagId = null;

  function playChime() {
    if (!chime) return;
    try {
      chime.currentTime = 0;
      chime.play().catch(() => {});
    } catch (_) {}
  }

  function selectTag(tagId) {
    currentTagId = tagId;

    // visual states
    tags.forEach(btn => btn.classList.toggle("vgt-active", btn.dataset.id === tagId));

    const config = TAG_CONFIG[tagId];
    if (!config) return;

    // text content
    detailTitle.textContent = config.title;
    detailAmount.textContent =
      config.amountLabel && config.amountLabel !== "Custom amount"
        ? `Suggested gift: ${config.amountLabel}`
        : "";
    detailDescription.textContent = config.description;

    // simple analytics hook (safe if gtag isn't defined)
    if (typeof gtag === "function") {
      gtag("event", "vgt_tag_click", {
        tag_id: tagId,
        tag_title: config.title,
        value: config.presetAmount || 0
      });
    }
  }

  // click on each tag
  tags.forEach(btn => {
    btn.addEventListener("click", () => {
      const tagId = btn.dataset.id;
      playChime();
      selectTag(tagId);
    });
  });

  // donate button – send to Qgiv (same URL for all tags, preset handled on Qgiv side)
  donateButton.addEventListener("click", () => {
    if (!QGIV_DONATION_URL || QGIV_DONATION_URL === "https://secure.qgiv.com/for/f2f/placeholder-virtual-giving-tree") {
      console.warn("Set QGIV_DONATION_URL in script.js to your real donation form URL.");
    }
    // open in new tab so people can keep admiring your tree 😎
    window.open(QGIV_DONATION_URL, "_blank");
  });

  // Start with neutral “tap a tag” message (no preselected tag)
  // (HTML already has that text, so we don't need to set anything here)
});
