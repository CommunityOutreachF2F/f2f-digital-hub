// ====== Angel tag configuration ======

const TAG_CONFIG = {
  "angel-heart": {
    title: "Give from the Heart",
    amount: "Custom amount",
    description:
      "Choose any amount that feels right. We’ll combine your gift with others to fully cover as many Angel Gift Lists as possible, making sure every resident has something special waiting for them this Christmas."
  },
  "angel-30": {
    title: "Angel for One Resident",
    amount: "Suggested gift: $30",
    description:
      "Helps provide an Angel Gift for one resident in our recovery housing programs. This might include a clothing item (like a hoodie, shoes, or pajamas), a small self-care item, and a treat or gift card chosen from their wish list."
  },
  "angel-60": {
    title: "Angel for Two Residents",
    amount: "Suggested gift: $60",
    description:
      "Helps provide Angel Gifts for two residents. Your gift helps us shop for clothing, self-care items, and gift cards so that more people in our programs feel remembered and cared for this Christmas."
  },
  "angel-90": {
    title: "Angel for Three Residents",
    amount: "Suggested gift: $90",
    description:
      "Helps provide Angel Gifts for three residents, filling their bags with a mix of clothing, comfort items, and small extras that bring joy during a hard season of life."
  },
  "angel-150": {
    title: "Angel for Five Residents",
    amount: "Suggested gift: $150",
    description:
      "Helps provide Angel Gifts for five residents in our recovery housing programs — a great level for families or small groups who want to make a meaningful impact together."
  },
  "angel-300": {
    title: "Angel for Ten Residents",
    amount: "Suggested gift: $300",
    description:
      "Helps provide Angel Gifts for ten residents. This is an ideal level for businesses, churches, or community groups who want to wrap many people in encouragement, warmth, and practical support."
  }
};

// If you have a single Qgiv form URL, put it here once.
const DONATION_URL = "https://www.qgiv.com/"; // <-- replace with your real Qgiv form URL

// ====== DOM references ======

const tagButtons = Array.from(document.querySelectorAll(".vgt-tag"));
const titleEl = document.getElementById("vgt-detail-title");
const amountEl = document.getElementById("vgt-detail-amount");
const descEl = document.getElementById("vgt-detail-description");
const donateBtn = document.getElementById("vgt-donate-button");
const soundEl = document.getElementById("tagSound");

// ====== Helpers ======

function setInitialState() {
  titleEl.textContent = "Choose a tag to see your impact";
  amountEl.textContent = "";
  descEl.textContent =
    "Tap an angel tag on the tree to choose how many residents you’d like to bless this Christmas. Each $30 Angel Gift helps our “F2F elves” shop for one person’s wish list with care.";
  donateBtn.onclick = () => {
    if (DONATION_URL) {
      window.open(DONATION_URL, "_blank");
    }
  };
}

function activateTag(tagId) {
  const config = TAG_CONFIG[tagId];
  if (!config) return;

  // visual state
  tagButtons.forEach(btn =>
    btn.classList.toggle("vgt-active", btn.dataset.id === tagId)
  );

  // text content
  titleEl.textContent = config.title;
  amountEl.textContent = config.amount;
  descEl.textContent = config.description;

  // donate button action
  donateBtn.onclick = () => {
    if (!DONATION_URL) return;
    // If later you add per-level URLs or query params, you can switch on tagId here.
    window.open(DONATION_URL, "_blank");
  };

  // chime
  if (soundEl) {
    try {
      soundEl.currentTime = 0;
      soundEl.play().catch(() => {});
    } catch (e) {
      // ignore audio errors silently
    }
  }
}

// ====== Event wiring ======

tagButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    activateTag(id);
  });
});

// Initialize
setInitialState();
