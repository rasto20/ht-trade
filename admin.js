/* Admin mode – ?admin=1
   Rasto (flag, bal − offset, id DOT927.ras, no Reset)
   Demo (coin, full bal, real id, Reset)
   Same Deriv virtual account. Switch stops bots. No auto dvLogin. */
(function () {
  const SIDE_LEFT = "left";
  const SIDE_RIGHT = "right";
  const LABEL = { left: "Rasto", right: "Demo" };
  const RASTO_A_OFFSET = -9504.7;
  const RASTO_FAKE_ID = "DOT927.ras";

  const COIN_SVG =
    '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="currentColor"/><path d="M11.5 9.5h5a6.5 6.5 0 0 1 0 13h-5zM8 13.5h7M8 18.5h7" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const params = new URLSearchParams(location.search);
  const isAdmin =
    params.get("admin") === "1" || localStorage.getItem("ht_admin") === "1";
  if (!isAdmin) return;

  localStorage.setItem("ht_admin", "1");
  window.HT_ADMIN = true;
  window._adminGuest = false;
  window.HT_ADMIN_SIDE =
    localStorage.getItem("ht_admin_side") || SIDE_LEFT;

  var adminConnectOnce = false;

  if (params.get("admin") === "1") {
    params.delete("admin");
    history.replaceState(
      null,
      "",
      location.pathname +
        (params.toString() ? "?" + params.toString() : "") +
        location.hash
    );
  }

  console.log(
    "%cHT TRADES · Admin (Rasto | Demo)",
    "color:#f28c28;font-weight:bold"
  );

  function usdFlagHtml() {
    return '<img src="https://flagcdn.com/w40/us.png" alt="USD" width="20" height="20">';
  }

  function demoAcct() {
    if (typeof DV === "undefined" || !DV.accts) return null;
    return (
      DV.accts.find(function (a) {
        return a.virtual;
      }) || null
    );
  }

  function stopAllBots() {
    if (typeof BOTS !== "undefined") {
      for (const id in BOTS) {
        BOTS[id].on = false;
        BOTS[id].hold = 0;
      }
    }
    if (typeof CP !== "undefined") CP.on = false;
  }

  function rawDemoBal() {
    if (
      typeof DV !== "undefined" &&
      DV.on() &&
      DV.bal != null &&
      isFinite(+DV.bal)
    )
      return +DV.bal;
    const d = demoAcct();
    if (d && d.balance != null && isFinite(+d.balance)) return +d.balance;
    return null;
  }

  function balTxtAdmin() {
    var raw = rawDemoBal();
    if (raw == null) return "—";

    var side = window.HT_ADMIN_SIDE || SIDE_LEFT;
    if (side === SIDE_LEFT) raw = raw - RASTO_A_OFFSET;

    var cur =
      typeof DV !== "undefined" && DV.cur ? DV.cur : "USD";
    if (typeof f === "function") return f(raw) + " " + cur;
    return raw.toFixed(2) + " " + cur;
  }

  function renameTabs() {
    document.querySelectorAll(".at button").forEach(function (btn) {
      if (btn.dataset.t === "real") btn.textContent = LABEL.left;
      if (btn.dataset.t === "demo") btn.textContent = LABEL.right;
    });
  }

  function adminHdr() {
    const ab = document.getElementById("ab");
    const atg = document.getElementById("atg");
    const ak = document.getElementById("ak");
    const wn = document.getElementById("wn");
    if (!ab || !ak) return false;

    const side = window.HT_ADMIN_SIDE || SIDE_LEFT;
    const name = LABEL[side] || "Rasto";
    const d = demoAcct();

    ab.textContent = balTxtAdmin();
    if (atg) {
      atg.textContent =
        name +
        (d && typeof DV !== "undefined" && DV.on() && !DV.ok
          ? " · connecting…"
          : "");
    }

    if (side === SIDE_LEFT) {
      ak.className = "flag-circle";
      ak.innerHTML = usdFlagHtml();
      ak.title ="flag";
    } else {
      ak.className = "coin";
      ak.innerHTML =
        typeof COIN !== "undefined" && COIN ? COIN : COIN_SVG;
      ak.title = "coin";
    }

    if (wn) {
      const msg = d
        ? "<b>Trading involves risks.</b>"
        : "<b>Admin</b> — Log in with Deriv once to use Rasto / Demo.";
      if (wn.dataset.m !== msg) {
        wn.innerHTML = msg;
        wn.dataset.m = msg;
      }
      wn.className = "warn";
    }
    return true;
  }

  function adminPopAfter() {
    renameTabs();
    const side = window.HT_ADMIN_SIDE || SIDE_LEFT;

    document.querySelectorAll(".at button").forEach(function (btn) {
      const isLeft = btn.dataset.t === "real";
      const isRight = btn.dataset.t === "demo";
      btn.classList.toggle(
        "on",
        (isLeft && side === SIDE_LEFT) || (isRight && side === SIDE_RIGHT)
      );
    });

    const ad = document.getElementById("ad");
    const pft = document.getElementById("pft");
    const d = demoAcct();
    const realId = d ? d.id : "";
    const bal = balTxtAdmin();
    const name = LABEL[side] || "Rasto";
    const isRasto = side === SIDE_LEFT;
    const showId = isRasto ? RASTO_FAKE_ID : realId || "—";

    if (ad) {
      if (!d) {
        ad.innerHTML =
          '<div class="acb"><p class="sub">Log in with Deriv to load your Demo.</p>' +
          '<button type="button" class="btn b-or" id="admin-login">Log in with Deriv</button></div>';
        const lb = document.getElementById("admin-login");
        if (lb) {
          lb.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof dvLogin === "function") dvLogin();
          };
        }
      } else {
        ad.innerHTML =
          '<div class="acb on">' +
          '<button type="button" class="ar" data-a="' +
          realId +
          '">' +
          '<span class="ai2"><b>USD</b><small>' +
          name +
          " · " +
          showId +
          "</small></span>" +
          "<b>" +
          bal +
          "</b></button>" +
          (!isRasto
            ? '<button type="button" class="tbn" id="admin-rb">Reset balance</button>'
            : "") +
          "</div>";

        const rb = document.getElementById("admin-rb");
        if (rb) {
          rb.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof resetDemoBalance === "function") resetDemoBalance();
            else if (typeof dvTopup === "function") dvTopup();
          };
        }
      }
    }

    if (pft) {
      pft.innerHTML =
        'Looking for CFD accounts? <a href="#" id="traders-hub-link">Go to Trader\'s Hub</a>';
    }
  }

  function ensureDemoConnected() {
    if (!window.HT_ADMIN) return;
    const d = demoAcct();
    if (!d) return;

    window._adminGuest = false;
    if (typeof acct !== "undefined") acct = "demo";
    if (typeof atab !== "undefined")
      atab = window.HT_ADMIN_SIDE === SIDE_RIGHT ? "demo" : "real";

    if (typeof DV !== "undefined" && DV.id === d.id && DV.ok) {
      adminConnectOnce = true;
      return;
    }
    if (
      adminConnectOnce &&
      typeof DV !== "undefined" &&
      DV.id === d.id &&
      DV.want
    )
      return;

    adminConnectOnce = true;
    if (typeof switchTo === "function") switchTo(d.id);
    else if (typeof dvConnect === "function") dvConnect(d.id);
  }

  function setAdminSide(side) {
    if (side !== SIDE_LEFT && side !== SIDE_RIGHT) return;

    const prev = window.HT_ADMIN_SIDE;
    if (prev === side) {
      adminHdr();
      adminPopAfter();
      return;
    }

    stopAllBots();
    window.HT_ADMIN_SIDE = side;
    localStorage.setItem("ht_admin_side", side);
    window._adminGuest = false;

    const d = demoAcct();
    if (
      d &&
      typeof DV !== "undefined" &&
      DV.id === d.id &&
      DV.ok &&
      DV.ws &&
      DV.ws.readyState === 1
    ) {
      // keep socket
    } else {
      adminConnectOnce = false;
      ensureDemoConnected();
    }

    if (typeof toast === "function") {
      toast(LABEL[side] + " active");
    }

    adminHdr();
    if (typeof acctPop === "function") acctPop();
    else adminPopAfter();
    if (typeof render === "function") render();
  }

  window.htAdminSetSide = setAdminSide;

  window.htCanRunBot = function () {
    if (!window.HT_ADMIN) {
      if (typeof DV === "undefined") return true;
      return !DV.on() || !!DV.ok;
    }
    if (!demoAcct()) return false;
    return !!(typeof DV !== "undefined" && DV.ok);
  };

  document.addEventListener(
    "click",
    function (e) {
      if (!window.HT_ADMIN) return;
      const tab = e.target.closest(".at [data-t]");
      if (!tab) return;
      e.preventDefault();
      e.stopPropagation();
      if (tab.dataset.t === "real") setAdminSide(SIDE_LEFT);
      else if (tab.dataset.t === "demo") setAdminSide(SIDE_RIGHT);
    },
    true
  );

  function hook(name, wrap) {
    function tryIt() {
      if (typeof window[name] === "function" && !window[name]["_ad_" + name]) {
        wrap(window[name]);
        window[name]["_ad_" + name] = true;
      }
    }
    tryIt();
    [500, 1500, 3000].forEach(function (ms) {
      setTimeout(tryIt, ms);
    });
  }

  hook("acctPop", function (orig) {
    window.acctPop = function () {
      orig.apply(this, arguments);
      if (window.HT_ADMIN) adminPopAfter();
    };
  });

  hook("acctHdr", function (orig) {
    window.acctHdr = function () {
      if (window.HT_ADMIN && adminHdr()) return;
      orig.apply(this, arguments);
      if (window.HT_ADMIN) renameTabs();
    };
  });

  hook("switchTo", function (orig) {
    window.switchTo = function (id) {
      if (window.HT_ADMIN && typeof DV !== "undefined") {
        const a =
          DV.accts &&
          DV.accts.find(function (x) {
            return x.id === id;
          });
        if (a && !a.virtual) {
          const d = demoAcct();
          if (d) id = d.id;
          if (typeof toast === "function") toast("Use Rasto or Demo");
        }
        if (id === "guest") {
          const d = demoAcct();
          if (d) id = d.id;
        }
        window._adminGuest = false;
        if (typeof acct !== "undefined") acct = "demo";
      }
      return orig.call(this, id);
    };
  });

  hook("dvConnect", function (orig) {
    window.dvConnect = function (id) {
      if (window.HT_ADMIN) {
        const d = demoAcct();
        if (d) id = d.id;
        window._adminGuest = false;
      }
      return orig.apply(this, arguments);
    };
  });

  setInterval(function () {
    if (!window.HT_ADMIN) return;
    renameTabs();
    adminHdr();
  }, 1000);

  setTimeout(function () {
    renameTabs();
    window.HT_ADMIN_SIDE =
      localStorage.getItem("ht_admin_side") || SIDE_LEFT;
    adminHdr();
  }, 700);

  setTimeout(function () {
    if (typeof DV !== "undefined" && DV.on() && demoAcct()) {
      if (!DV.ok) {
        adminConnectOnce = false;
        ensureDemoConnected();
      }
    }
    adminHdr();
  }, 2500);

  var tries = 0;
  var iv = setInterval(function () {
    if (!window.HT_ADMIN) {
      clearInterval(iv);
      return;
    }
    tries++;
    adminHdr();
    if (
      demoAcct() &&
      typeof DV !== "undefined" &&
      !DV.ok &&
      !adminConnectOnce
    ) {
      ensureDemoConnected();
    }
    if (demoAcct() && typeof DV !== "undefined" && DV.ok) clearInterval(iv);
    if (tries > 10) clearInterval(iv);
  }, 1000);

  let lastA = 0;
  document.addEventListener("keydown", function (e) {
    if (e.key === "a" || e.key === "A") {
      const now = Date.now();
      if (now - lastA < 400) {
        localStorage.removeItem("ht_admin");
        localStorage.removeItem("ht_admin_side");
        window.HT_ADMIN = false;
        alert("Admin mode off. Refresh the page.");
      }
      lastA = now;
    }
  });
})();
 