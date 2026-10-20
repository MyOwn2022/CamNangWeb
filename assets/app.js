/* Cẩm nang An Toàn Thông Tin — trình đọc lật trang (StPageFlip) */
(function () {
  "use strict";

  var BOOK = {
    pageCount: 50,
    pageWidth: 1240,
    pageHeight: 1754,
    spreadQuery: "(min-width: 1024px)",
    pagePath: function (n) { return "files/pages/p-" + String(n).padStart(2, "0") + ".webp"; },
    pageAlt: function (n) { return "Cẩm nang An Toàn Thông Tin — trang " + n; }
  };

  /* Mục lục — lấy từ trang 2 và các trang mở đầu chương của cẩm nang */
  var FRONT = [
    { title: "Trang bìa", page: 1 },
    { title: "Mục lục", page: 2 },
    { title: "Người đồng hành & cách sử dụng cẩm nang", page: 3 }
  ];
  var CHAPTERS = [
    {
      num: "01", title: "Bảo vệ thiết bị và dữ liệu cá nhân", page: 4, end: 14,
      points: [
        ["Điểm chạm 1", "Quản trị tài khoản và mật khẩu", 5],
        ["Điểm chạm 2", "Thiết lập máy tính cá nhân an toàn", 6],
        ["Điểm chạm 3", "Sử dụng thiết bị di động", 7],
        ["Điểm chạm 4", "Thiết bị lưu trữ: ổ cứng di động và USB", 8],
        ["Điểm chạm 5", "Bảo mật dữ liệu trên Cloud", 9],
        ["Điểm chạm 6", "Nhận diện và bảo vệ dữ liệu nhạy cảm", 10],
        ["Điểm chạm 7", "Sao lưu và khôi phục dữ liệu", 11],
        ["Điểm chạm 8", "Chia sẻ tệp tin và đường dẫn an toàn", 12],
        ["Điểm chạm 9", "Cập nhật phần mềm và phần mềm bản quyền", 13],
        ["Điểm chạm 10", "Quyền riêng tư trên thiết bị di động", 14]
      ]
    },
    {
      num: "02", title: "An toàn khi sử dụng Internet và dịch vụ trực tuyến", page: 15, end: 21,
      points: [
        ["Điểm chạm 1", "Sử dụng mạng Internet", 16],
        ["Điểm chạm 2", "Sử dụng mạng Wi-Fi", 17],
        ["Điểm chạm 3", "Sử dụng thư điện tử (Email)", 18],
        ["Điểm chạm 4", "Sử dụng mạng xã hội", 19],
        ["Điểm chạm 5", "Sử dụng dịch vụ lưu trữ đám mây", 20],
        ["Điểm chạm 6", "Sử dụng ứng dụng nhắn tin", 21]
      ]
    },
    {
      num: "03", title: "Nhận diện lừa đảo và tấn công trực tuyến", page: 22, end: 27,
      points: [
        ["Điểm chạm 1", "Lừa đảo trực tuyến (Phishing & Scams)", 23],
        ["Điểm chạm 2", "Tấn công email có chủ đích (Spear Phishing)", 24],
        ["Điểm chạm 3", "Mã độc tống tiền (Ransomware)", 25],
        ["Điểm chạm 4", "Cảnh báo và phát hiện tin giả (Fake News)", 26],
        ["Điểm chạm 5", "Lừa đảo qua kỹ nghệ xã hội và Deepfake", 27]
      ]
    },
    {
      num: "04", title: "Nhận biết rủi ro và xử lý sự cố", page: 28, end: 44,
      points: [
        ["Tổng quan", "Dấu hiệu nhận biết rủi ro bảo mật và biện pháp xử lý", 29],
        ["Điểm chạm 1", "Ưu tiên đổi mật khẩu từ website hoặc ứng dụng chính thức", 30],
        ["Điểm chạm 1", "Bật xác thực hai bước nếu có thể", 31],
        ["Điểm chạm 1", "Báo ngay cho bộ phận phụ trách nếu là tài khoản tổ chức", 32],
        ["Điểm chạm 1", "Sự cố liên quan đến mật khẩu và tài khoản", 33],
        ["Điểm chạm 1", "Nguyên tắc xử lý chung", 34],
        ["Điểm chạm 2", "Sự cố email lừa đảo (Phishing)", 35],
        ["Điểm chạm 3", "Thiết bị có dấu hiệu nhiễm mã độc", 36],
        ["Điểm chạm 4", "Mất thiết bị hoặc thất lạc dữ liệu", 37],
        ["Điểm chạm 5", "Sự cố Wi-Fi và mạng không an toàn", 38],
        ["Điểm chạm 6", "Cảnh báo trình duyệt và chứng chỉ bảo mật", 39],
        ["Điểm chạm 7", "Sự cố liên quan USB và thiết bị ngoại vi", 40],
        ["Điểm chạm 8", "Mất dữ liệu do Ransomware hoặc xóa nhầm", 41],
        ["Điểm chạm 9", "Cập nhật phần mềm và lỗi bảo mật", 42],
        ["Điểm chạm 10", "Mạng xã hội và ứng dụng nhắn tin bị chiếm quyền", 43],
        ["Điểm chạm 11", "Các lỗi “thói quen nguy hiểm” của người dùng", 44]
      ]
    },
    {
      num: "05", title: "An toàn thông tin trong kỷ nguyên AI", page: 45, end: 49,
      points: [
        ["Điểm chạm 1", "Nhận diện lừa đảo bằng công nghệ Deepfake", 46],
        ["Điểm chạm 2", "Bảo mật dữ liệu khi sử dụng Chatbot AI", 47],
        ["Điểm chạm 3", "Cảnh giác với mã độc và lừa đảo do AI tạo ra", 48],
        ["Điểm chạm 4", "Quyền riêng tư và dấu chân số trên mạng xã hội", 49]
      ]
    }
  ];
  var BACK = { title: "Lời kết — Chủ động hôm nay, an toàn ngày mai!", page: 50 };

  function chapterLabel(page) {
    if (page === 1) return "Trang bìa";
    if (page <= 3) return "Trước khi bắt đầu";
    if (page === BOOK.pageCount) return "Lời kết";
    for (var i = 0; i < CHAPTERS.length; i++) {
      var c = CHAPTERS[i];
      if (page >= c.page && page <= c.end) return "Chương " + Number(c.num) + " · Trạm bảo mật số " + Number(c.num);
    }
    return "";
  }

  /* ---------- DOM ---------- */
  var root = document.querySelector("[data-flipbook]");
  if (!root || !window.St || !window.St.PageFlip) return;

  var area = root.querySelector("[data-flipbook-area]");
  var book = root.querySelector("[data-flipbook-book]");
  var prevBtn = root.querySelector("[data-flipbook-prev]");
  var nextBtn = root.querySelector("[data-flipbook-next]");
  var counter = root.querySelector("[data-flipbook-counter]");
  var chapterEl = root.querySelector("[data-flipbook-chapter]");
  var loading = root.querySelector("[data-flipbook-loading]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var pages = [];
  var imgs = [];
  for (var n = 1; n <= BOOK.pageCount; n++) {
    var page = document.createElement("div");
    page.className = "flipbook__page";
    var img = document.createElement("img");
    img.src = BOOK.pagePath(n);
    img.alt = BOOK.pageAlt(n);
    img.width = BOOK.pageWidth;
    img.height = BOOK.pageHeight;
    img.loading = n <= 3 ? "eager" : "lazy";
    img.decoding = "async";
    img.draggable = false;
    page.appendChild(img);
    book.appendChild(page);
    pages.push(page);
    imgs.push(img);
  }

  var flip = null, layout = null;
  var current = pageFromHash();

  function pageFromHash() {
    var m = /trang-(\d+)/.exec(location.hash);
    var p = m ? parseInt(m[1], 10) : 1;
    return Math.min(Math.max(p, 1), BOOK.pageCount) - 1;
  }

  function measure() {
    var spread = window.matchMedia(BOOK.spreadQuery).matches;
    area.style.maxWidth = "";
    var r = area.getBoundingClientRect();
    var ratio = BOOK.pageHeight / BOOK.pageWidth;
    var cols = spread ? 2 : 1;
    var w = Math.max(1, Math.floor(Math.min(r.width / cols, r.height / ratio)));
    var res = { spread: spread, pageWidth: w, pageHeight: Math.floor(w * ratio), bookWidth: w * cols };
    area.style.maxWidth = res.bookWidth + "px";
    return res;
  }

  function visibleRange(i) {
    var spread = layout && layout.spread;
    if (!spread || i === 0) return [i, i];
    var left = i % 2 === 1 ? i : i - 1;            // trang lẻ (index) nằm bên trái khi có bìa đơn
    var right = Math.min(left + 1, BOOK.pageCount - 1);
    return [left, right];
  }

  function preload(i) {
    for (var k = Math.max(0, i - 2); k <= Math.min(BOOK.pageCount - 1, i + 5); k++) {
      if (imgs[k].loading !== "eager") imgs[k].loading = "eager";
    }
  }

  function update() {
    var range = visibleRange(current);
    var a = range[0] + 1, b = range[1] + 1;
    counter.textContent = "Trang " + (a === b ? a : a + "–" + b) + " / " + BOOK.pageCount;
    chapterEl.textContent = chapterLabel(a);
    prevBtn.disabled = range[0] <= 0;
    nextBtn.disabled = range[1] >= BOOK.pageCount - 1;
    preload(current);
    try { history.replaceState(null, "", current > 0 ? "#trang-" + (current + 1) : location.pathname + location.search); } catch (e) {}
    markToc(a);
  }

  function build(l) {
    if (!book.isConnected) area.appendChild(book);
    flip = new St.PageFlip(book, {
      width: l.pageWidth,
      height: l.pageHeight,
      size: "stretch",
      minWidth: l.pageWidth,
      maxWidth: l.pageWidth,
      minHeight: l.pageHeight,
      maxHeight: l.pageHeight,
      usePortrait: true,
      showCover: true,
      drawShadow: true,
      maxShadowOpacity: 0.45,
      flippingTime: reduceMotion ? 1 : 750,
      mobileScrollSupport: false,
      startPage: current
    });
    flip.on("flip", function (e) { current = e.data; update(); });
    flip.loadFromHTML(pages);
    layout = l;
    current = flip.getCurrentPageIndex();
    book.dataset.orientation = l.spread ? "landscape" : "portrait";
    book.dataset.ready = "true";
    if (loading && loading.parentNode) loading.parentNode.removeChild(loading);
    update();
  }

  function destroy() {
    if (flip) { flip.destroy(); }
    flip = null; layout = null;
  }

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(function () {
      var l = measure();
      if (layout && layout.spread === l.spread && layout.pageWidth === l.pageWidth) return;
      destroy(); build(l);
    }, 150);
  });

  function goTo(pageNum) {
    if (!flip) return;
    var idx = Math.min(Math.max(pageNum, 1), BOOK.pageCount) - 1;
    var range = visibleRange(current);
    if (idx >= range[0] && idx <= range[1]) return;
    if (!reduceMotion && Math.abs(idx - current) <= 2) {
      flip.flip(idx);
    } else {
      flip.turnToPage(idx);
      current = flip.getCurrentPageIndex();
      update();
    }
  }

  prevBtn.addEventListener("click", function () { if (flip) flip.flipPrev(); });
  nextBtn.addEventListener("click", function () { if (flip) flip.flipNext(); });

  window.addEventListener("keydown", function (e) {
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === "Escape" && tocOpen) { closeToc(); return; }
    if (tocOpen) return;
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); flip && flip.flipPrev(); }
    else if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); flip && flip.flipNext(); }
    else if (e.key === "Home") { e.preventDefault(); goTo(1); }
    else if (e.key === "End") { e.preventDefault(); goTo(BOOK.pageCount); }
  });

  window.addEventListener("hashchange", function () {
    var idx = pageFromHash();
    if (idx !== current) goTo(idx + 1);
  });

  /* ---------- Mục lục ---------- */
  var toc = document.getElementById("toc");
  var tocList = toc.querySelector("[data-toc-list]");
  var backdrop = document.querySelector(".toc-backdrop");
  var openBtn = document.querySelector("[data-toc-open]");
  var tocOpen = false;

  function el(tag, cls, text) {
    var x = document.createElement(tag);
    if (cls) x.className = cls;
    if (text != null) x.textContent = text;
    return x;
  }
  function row(label, title, page) {
    var b = el("button", "toc__row");
    b.type = "button";
    b.dataset.page = page;
    var t = el("span");
    if (label) t.appendChild(el("small", null, label));
    t.appendChild(document.createTextNode(title));
    b.appendChild(t);
    b.appendChild(el("span", "toc__page", String(page)));
    return b;
  }

  var front = el("div", "toc__chapter");
  FRONT.forEach(function (f) { front.appendChild(row(null, f.title, f.page)); });
  tocList.appendChild(front);

  CHAPTERS.forEach(function (c) {
    var wrap = el("section", "toc__chapter");
    var head = el("button", "toc__chapter-head");
    head.type = "button";
    head.dataset.page = c.page;
    head.appendChild(el("span", "toc__num", c.num));
    var mid = el("span");
    mid.appendChild(el("span", "toc__chapter-meta", "Chương " + Number(c.num) + " · " + c.points.length + " trang"));
    mid.appendChild(el("span", "toc__chapter-name", c.title));
    mid.lastChild.style.display = "block";
    head.appendChild(mid);
    head.appendChild(el("span", "toc__page", String(c.page)));
    wrap.appendChild(head);
    var ul = el("ul", "toc__list");
    c.points.forEach(function (p) {
      var li = el("li");
      li.appendChild(row(p[0], p[1], p[2]));
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    tocList.appendChild(wrap);
  });

  var back = el("div", "toc__chapter");
  back.appendChild(row(null, BACK.title, BACK.page));
  tocList.appendChild(back);

  var tocTargets = Array.prototype.slice.call(tocList.querySelectorAll("[data-page]"));

  function markToc(page) {
    tocTargets.forEach(function (b) {
      b.classList.toggle("is-current", Number(b.dataset.page) === page);
    });
  }

  tocList.addEventListener("click", function (e) {
    var b = e.target.closest("[data-page]");
    if (!b) return;
    closeToc();
    goTo(Number(b.dataset.page));
  });

  function openToc() {
    tocOpen = true;
    backdrop.hidden = false;
    requestAnimationFrame(function () { backdrop.classList.add("is-open"); });
    toc.classList.add("is-open");
    toc.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
    var cur = tocList.querySelector(".is-current");
    if (cur) cur.scrollIntoView({ block: "center" });
    toc.focus();
  }
  function closeToc() {
    if (!tocOpen) return;
    tocOpen = false;
    backdrop.classList.remove("is-open");
    toc.classList.remove("is-open");
    toc.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    setTimeout(function () { if (!tocOpen) backdrop.hidden = true; }, 260);
    openBtn.focus();
  }
  openBtn.addEventListener("click", function () { tocOpen ? closeToc() : openToc(); });
  Array.prototype.forEach.call(document.querySelectorAll("[data-toc-close]"), function (b) {
    b.addEventListener("click", closeToc);
  });

  /* ---------- Toàn màn hình ---------- */
  var fsBtn = document.querySelector("[data-fullscreen]");
  var docEl = document.documentElement;
  if (!docEl.requestFullscreen) {
    fsBtn.hidden = true;
  } else {
    fsBtn.addEventListener("click", function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else docEl.requestFullscreen().catch(function () {});
    });
  }

  requestAnimationFrame(function () { build(measure()); });
})();
