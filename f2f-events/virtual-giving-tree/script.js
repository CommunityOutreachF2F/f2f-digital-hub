// Virtual Giving Tree behavior
// – handles ornament clicks, text updates, and chime

document.addEventListener("DOMContentLoaded", () => {
  const ornaments = document.querySelectorAll(".vgt-ornament");
  const titleEl = document.getElementById("vgt-detail-title");
  const amountEl = document.getElementById("vgt-detail-amount");
  const descEl = document.getElementById("vgt-detail-description");
  const donateBtn = document.getElementById("vgt-donate-button");
  const chime = document.getElementById("ornamentSound");

  if (!ornaments.length) return;

  // Gift copy for each ornament
  const GIFTS = {
    "give-heart": {
      title: "Give from the Heart",
      amount: "Custom amount",
      description:
        "Prefer a different amount? Choose your own gift and we will use it where it is needed most to support safe housing, essentials, and ongoing recovery support."
    },
    "warm-wishes": {
      title: "Warm Wishes",
      amount: "Suggested gift: $5",
      description:
        "Helps provide a holiday card and a small snack for someone in transitional housing. A simple reminder that they are seen and cared about."
    },
    "cozy-comfort": {
      title: "Cozy Comfort",
      amount: "Suggested gift: $10",
      description:
        "Helps provide warm socks, hygiene supplies, or other small essentials that bring comfort and dignity to someone in recovery."
    },
    "fresh-start-kit": {
      title: "Fresh Start Kit",
      amount: "Suggested gift: $25",
      description:
        "Helps stock basic hygiene kits for new arrivals. Clean socks, soap, shampoo, and other essentials help people feel human and hopeful on day one."
    },
    "hot-meal-hope": {
      title: "Hot Meal & Hope",
      amount: "Suggested gift: $50",
      description:
        "Helps provide hot meals and groceries so residents don’t have to choose between nutrition and necessities while they focus on getting well."
    },
    "bridge-stability": {
      title: "Bridge to Stability",
      amount: "Suggested gift: $100",
      description:
        "Helps pay for transportation passes or ID fees needed for job applications, appointments, and services. This gift can remove small but powerful barriers to stability."
    },
    "safe-housing": {
      title: "Safe Housing Support",
      amount: "Suggested gift: $250",
      description:
        "Helps support safe, stable housing for someone in early recovery so they are not returning to unsafe environments while rebuilding their life."
    }
  };

  // Optional: if you have a specific donation URL, put it here
  const BASE_DONATION_URL = ""; // e.g. "https://secure.qgiv.com/XXXX"
  let currentGiftId = null;

  function setGift(id) {
    const gift = GIFTS[id];
    if (!gift) return;

    currentGiftId = id;

    titleEl.textContent = gift.title;
    amountEl.textContent = gift.amount;
    descEl.textContent = gift.description;

    // active state on ornaments
    ornaments.forEach(btn => btn.classList.toggle("vgt-active", btn.dataset.id === id));
  }

  // Play chime safely (don’t blow up if user hasn’t interacted yet)
  function playChime() {
    if (!chime) return;
    try {
      chime.currentTime = 0;
      chime.play().catch(() => {});
    } catch (_) {}
  }

  // Ornament click & hover wiring
  ornaments.forEach(btn => {
    const id = btn.dataset.id;

    btn.addEventListener("click", () => {
      setGift(id);
      playChime();
    });

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setGift(id);
        playChime();
      }
    });
  });

  // Donate button — if BASE_DONATION_URL is set, you can customize per gift
  donateBtn.addEventListener("click", () => {
    if (!BASE_DONATION_URL) {
      // No URL configured yet — just do nothing special
      return;
    }

    // Example: append ?amount= or ?tag=… if you want to track which gift
    const url = new URL(BASE_DONATION_URL);
    if (currentGiftId && GIFTS[currentGiftId]) {
      url.searchParams.set("gift", currentGiftId);
    }
    window.open(url.toString(), "_blank");
  });

  // Initial state: prompt the user to click an ornament
  titleEl.textContent = "Choose a tag to see your impact";
  amountEl.textContent = "";
  // description text is already set in HTML
});
