/**
 * VIỆT PHỤC REMIX - ĐIỀU KHIỂN CHÍNH (MAIN CONTROLLER)
 * Kết nối các phân hệ: Thước phim lịch sử, Tủ đồ số, Âm thanh ngũ cung,
 * Bản đồ tương tác 3 miền, Bộ gợi ý văn hóa và Xuất thiệp Lookbook.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Khởi tạo Renderer Avatar & Advisory Engine
  const avatarRenderer = new AvatarRenderer('avatar-container');
  window.avatarRenderer = avatarRenderer;

  let currentTab = 'outfits'; // 'outfits' | 'elements' | 'headwears' | 'accessories'

  // 2. Khởi tạo Thước Phim Dòng Chảy Lịch Sử (Filmstrip Carousel)
  initFilmstrip();

  // 3. Khởi tạo Bản Đồ Việt Nam 3 Miền & Sự Kiện
  initMapAndEvents();

  // 4. Khởi tạo Tủ Đồ Phục Trang (Wardrobe Tabs & Grid)
  initWardrobeTabs();
  renderWardrobeGrid();

  // 5. Khởi tạo Nút Chuyển Đổi Giới Tính & Hành Động
  initActions();

  // 6. Khởi tạo Hệ Thống Âm Thanh & Bắt Sự Kiện Tương Tác Đầu Tiên
  initAudioControls();

  // 7. Render Avatar & Đánh giá văn hóa lần đầu
  avatarRenderer.render();
  window.advisoryEngine.updateInfoCard('outfit', avatarRenderer.state.outfit);
  window.advisoryEngine.evaluateCombination(avatarRenderer.state);

  // 8. Tải Lookbook lưu trữ nếu có
  initLookbookSection();

  // --- CÁC HÀM XỬ LÝ CHI TIẾT ---

  // 1. THƯỚC PHIM DÒNG CHẢY LỊCH SỬ
  function initFilmstrip() {
    const track = document.getElementById('filmstrip-track');
    if (!track) return;

    // Nhân đôi danh sách eras để tạo hiệu ứng cuộn vô tận (Infinite Filmstrip Roll)
    const allEras = [...VIET_PHUC_DATA.eras, ...VIET_PHUC_DATA.eras];

    track.innerHTML = allEras.map((era, idx) => `
      <div class="filmstrip-card" data-era-id="${era.id}">
        <div class="filmstrip-badge">${era.time}</div>
        <div class="filmstrip-thumb-box">
          <div class="filmstrip-icon-circle">${getEraIcon(era.id)}</div>
        </div>
        <h4 class="filmstrip-card-title">${era.period}</h4>
        <p class="filmstrip-card-desc">${era.title}</p>
        <button class="filmstrip-view-btn" data-era-id="${era.id}">Khám phá di sản</button>
      </div>
    `).join('');

    // Sự kiện click mở Modal Lịch Sử
    track.querySelectorAll('.filmstrip-card, .filmstrip-view-btn').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const eraId = elem.getAttribute('data-era-id');
        openEraModal(eraId);
      });
    });
  }

  function getEraIcon(eraId) {
    switch (eraId) {
      case 'hung-vuong': return '🪶';
      case 'ly-tran': return '🐉';
      case 'le-so': return '📜';
      case 'nguyen': return '👑';
      case 'the-ky-20': return '👒';
      case 'duong-dai': return '✨';
      default: return '👘';
    }
  }

  function openEraModal(eraId) {
    const era = VIET_PHUC_DATA.eras.find(e => e.id === eraId);
    if (!era) return;

    const modal = document.getElementById('era-modal');
    const content = document.getElementById('era-modal-body');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="era-modal-header">
        <span class="era-modal-tag">${era.time}</span>
        <h2 class="era-modal-title">${era.period}</h2>
        <h3 class="era-modal-subtitle">“${era.title}”</h3>
      </div>
      <div class="era-modal-content">
        <p class="era-full-desc">${era.desc}</p>
        <div class="era-highlights-title">Đặc trưng phục trang & mỹ thuật:</div>
        <ul class="era-highlights-list">
          ${era.highlights.map(h => `<li>✨ ${h}</li>`).join('')}
        </ul>
      </div>
      <div class="era-modal-footer">
        <button class="era-try-btn" data-silhouette="${era.silhouette}">Thử phong cách thời kỳ này</button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Nút thử phong cách
    const tryBtn = content.querySelector('.era-try-btn');
    if (tryBtn) {
      tryBtn.addEventListener('click', () => {
        applyEraOutfit(era.silhouette);
        closeEraModal();
        const dressingSection = document.getElementById('dressing-room-section');
        if (dressingSection) {
          dressingSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    const closeBtn = document.getElementById('close-era-modal-btn');
    if (closeBtn) {
      closeBtn.onclick = closeEraModal;
    }

    modal.onclick = (e) => {
      if (e.target === modal) closeEraModal();
    };
  }

  function closeEraModal() {
    const modal = document.getElementById('era-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function applyEraOutfit(silhouette) {
    let targetOutfit = 'nhat-binh';
    if (silhouette === 'van-lang') targetOutfit = 'van-lang';
    else if (silhouette === 'giao-linh') targetOutfit = 'giao-linh';
    else if (silhouette === 'doi-kham') targetOutfit = 'doi-kham';
    else if (silhouette === 'nhat-binh') targetOutfit = 'nhat-binh';
    else if (silhouette === 'ao-dai-lemur') targetOutfit = 'ao-dai-tan-thoi';
    else if (silhouette === 'ao-dai-hien-dai') targetOutfit = 'ao-dai-tan-thoi';

    avatarRenderer.setState({ outfit: targetOutfit });
    renderWardrobeGrid();
    window.advisoryEngine.updateInfoCard('outfit', targetOutfit);
    window.advisoryEngine.evaluateCombination(avatarRenderer.state);
  }

  // 2. BẢN ĐỒ VIỆT NAM 3 MIỀN & SỰ KIỆN
  function initMapAndEvents() {
    // Click chọn miền trên Bản đồ SVG
    const regionButtons = document.querySelectorAll('.map-region-btn, .map-path-region');
    regionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const regionId = btn.getAttribute('data-region');
        if (!regionId) return;

        // Cập nhật trạng thái
        avatarRenderer.setState({ region: regionId });

        // Cập nhật UI nút bản đồ
        document.querySelectorAll('.map-region-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-region') === regionId);
        });

        // Cập nhật thông tin vùng miền
        const regData = VIET_PHUC_DATA.regions[regionId];
        const regDescElem = document.getElementById('region-summary-text');
        if (regDescElem && regData) {
          regDescElem.innerHTML = `<strong>${regData.name}:</strong> ${regData.desc}`;
        }

        window.advisoryEngine.evaluateCombination(avatarRenderer.state);
      });
    });

    // Chọn sự kiện
    const eventSelect = document.getElementById('event-selector');
    if (eventSelect) {
      eventSelect.innerHTML = VIET_PHUC_DATA.events.map(ev => `
        <option value="${ev.id}">${ev.name}</option>
      `).join('');

      eventSelect.addEventListener('change', (e) => {
        const eventId = e.target.value;
        avatarRenderer.setState({ event: eventId });
        window.advisoryEngine.evaluateCombination(avatarRenderer.state);
      });
    }
  }

  // 3. TỦ ĐỒ & CÁC TAB
  function initWardrobeTabs() {
    const tabButtons = document.querySelectorAll('.wardrobe-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.getAttribute('data-tab');
        renderWardrobeGrid();
      });
    });
  }

  function renderWardrobeGrid() {
    const grid = document.getElementById('wardrobe-items-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const state = avatarRenderer.state;

    if (currentTab === 'outfits') {
      // Lọc danh sách áo theo giới tính
      const filtered = VIET_PHUC_DATA.outfits.filter(o => 
        o.gender === 'both' || o.gender === state.gender
      );

      grid.innerHTML = filtered.map(outfit => `
        <div class="wardrobe-card ${state.outfit === outfit.id ? 'selected' : ''}" data-type="outfit" data-id="${outfit.id}">
          <div class="wardrobe-icon-box">${outfit.icon}</div>
          <div class="wardrobe-info">
            <h5 class="wardrobe-name">${outfit.name}</h5>
            <span class="wardrobe-era">${outfit.era.split('(')[0].trim()}</span>
          </div>
        </div>
      `).join('');

    } else if (currentTab === 'elements') {
      // Bảng màu ngũ hành
      grid.innerHTML = VIET_PHUC_DATA.elements.map(elem => `
        <div class="wardrobe-card element-card ${state.element === elem.id ? 'selected' : ''}" data-type="element" data-id="${elem.id}">
          <div class="element-swatch" style="background: linear-gradient(135deg, ${elem.hexSecondary}, ${elem.hexPrimary}, ${elem.hexBorder});"></div>
          <div class="wardrobe-info">
            <h5 class="wardrobe-name">${elem.name}</h5>
            <span class="wardrobe-era">${elem.symbol}</span>
          </div>
        </div>
      `).join('');

    } else if (currentTab === 'headwears') {
      // Danh sách mũ / khăn
      const filtered = VIET_PHUC_DATA.headwears.filter(h => 
        h.gender === 'both' || h.gender === state.gender
      );

      grid.innerHTML = filtered.map(head => `
        <div class="wardrobe-card ${state.headwear === head.id ? 'selected' : ''}" data-type="headwear" data-id="${head.id}">
          <div class="wardrobe-icon-box">${head.icon}</div>
          <div class="wardrobe-info">
            <h5 class="wardrobe-name">${head.name}</h5>
          </div>
        </div>
      `).join('');

    } else if (currentTab === 'accessories') {
      // Phụ kiện cầm tay & giày
      grid.innerHTML = VIET_PHUC_DATA.accessories.map(acc => `
        <div class="wardrobe-card ${state.accessory === acc.id ? 'selected' : ''}" data-type="accessory" data-id="${acc.id}">
          <div class="wardrobe-icon-box">${acc.icon}</div>
          <div class="wardrobe-info">
            <h5 class="wardrobe-name">${acc.name}</h5>
          </div>
        </div>
      `).join('');
    }

    // Gán sự kiện click cho các item trong tủ đồ
    grid.querySelectorAll('.wardrobe-card').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        const id = card.getAttribute('data-id');

        if (type === 'outfit') avatarRenderer.setState({ outfit: id });
        else if (type === 'element') avatarRenderer.setState({ element: id });
        else if (type === 'headwear') avatarRenderer.setState({ headwear: id });
        else if (type === 'accessory') avatarRenderer.setState({ accessory: id });

        renderWardrobeGrid();
        window.advisoryEngine.updateInfoCard(type, id);
        window.advisoryEngine.evaluateCombination(avatarRenderer.state);
      });
    });
  }

  // 4. CÁC NÚT ĐIỀU KHIỂN & CHUYỂN GIỚI TÍNH
  function initActions() {
    // Chuyển đổi giới tính Nam / Nữ
    const genderBtns = document.querySelectorAll('.gender-toggle-btn');
    genderBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const gender = btn.getAttribute('data-gender');
        genderBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Đổi trang phục mặc định phù hợp với giới tính
        const defaultOutfit = gender === 'female' ? 'nhat-binh' : 'ao-tac-nam';
        const defaultHead = gender === 'female' ? 'khan-van-nu' : 'khan-dong-nam';

        avatarRenderer.setState({
          gender: gender,
          outfit: defaultOutfit,
          headwear: defaultHead
        });

        renderWardrobeGrid();
        window.advisoryEngine.updateInfoCard('outfit', defaultOutfit);
        window.advisoryEngine.evaluateCombination(avatarRenderer.state);
      });
    });

    // Sự kiện đổi màu Ngũ Hành trực tiếp trên sân khấu
    const swatchBtns = document.querySelectorAll('.element-swatch-btn');
    swatchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const elemId = btn.getAttribute('data-element');
        if (!elemId) return;

        swatchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        avatarRenderer.setState({ element: elemId });
        renderWardrobeGrid();
        window.advisoryEngine.updateInfoCard('element', elemId);
        window.advisoryEngine.evaluateCombination(avatarRenderer.state);
      });
    });

    function syncElementSwatches(currentElem) {
      document.querySelectorAll('.element-swatch-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-element') === currentElem);
      });
    }

    // Nút Ngẫu hứng (Randomize phối đồ)
    const randomBtn = document.getElementById('randomize-btn');
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const state = avatarRenderer.state;
        const availableOutfits = VIET_PHUC_DATA.outfits.filter(o => o.gender === 'both' || o.gender === state.gender);
        const availableHeads = VIET_PHUC_DATA.headwears.filter(h => h.gender === 'both' || h.gender === state.gender);

        const randOutfit = availableOutfits[Math.floor(Math.random() * availableOutfits.length)].id;
        const randElement = VIET_PHUC_DATA.elements[Math.floor(Math.random() * VIET_PHUC_DATA.elements.length)].id;
        const randHead = availableHeads[Math.floor(Math.random() * availableHeads.length)].id;
        const randAcc = VIET_PHUC_DATA.accessories[Math.floor(Math.random() * VIET_PHUC_DATA.accessories.length)].id;

        avatarRenderer.setState({
          outfit: randOutfit,
          element: randElement,
          headwear: randHead,
          accessory: randAcc
        });

        syncElementSwatches(randElement);
        renderWardrobeGrid();
        window.advisoryEngine.updateInfoCard('outfit', randOutfit);
        window.advisoryEngine.evaluateCombination(avatarRenderer.state);
      });
    }

    // Nút Đặt lại (Reset)
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const isFemale = avatarRenderer.state.gender === 'female';
        avatarRenderer.setState({
          outfit: isFemale ? 'nhat-binh' : 'ao-tac-nam',
          headwear: isFemale ? 'khan-van-nu' : 'khan-dong-nam',
          element: 'hoa',
          accessory: 'quat-lua',
          region: 'trung',
          event: 'chup-tet'
        });

        syncElementSwatches('hoa');
        renderWardrobeGrid();
        window.advisoryEngine.updateInfoCard('outfit', isFemale ? 'nhat-binh' : 'ao-tac-nam');
        window.advisoryEngine.evaluateCombination(avatarRenderer.state);
      });
    }

    // Nút Xuất Thiệp Bưu Thiếp Văn Hóa
    const exportBtn = document.getElementById('export-postcard-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        window.postcardGenerator.generatePostcard(avatarRenderer.state);
      });
    }
  }

  // 5. ĐIỀU KHIỂN ÂM THANH NGŨ CUNG
  function initAudioControls() {
    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        window.audioPlayer.toggle();
      });
    }

    // Bắt tương tác đầu tiên của người dùng để khởi tạo AudioContext không bị chặn
    const startAudioOnFirstClick = () => {
      window.audioPlayer.initContext();
      window.removeEventListener('click', startAudioOnFirstClick);
      window.removeEventListener('keydown', startAudioOnFirstClick);
    };
    window.addEventListener('click', startAudioOnFirstClick, { once: true });
    window.addEventListener('keydown', startAudioOnFirstClick, { once: true });
  }

  // 6. PHẦN LOOKBOOK LƯU TRỮ
  function initLookbookSection() {
    window.updateLookbookUI = renderSavedLookbook;
    renderSavedLookbook();
  }

  function renderSavedLookbook() {
    const lookbookContainer = document.getElementById('lookbook-gallery');
    if (!lookbookContainer) return;

    try {
      const list = JSON.parse(localStorage.getItem('viet_phuc_lookbook') || '[]');
      if (list.length === 0) {
        lookbookContainer.innerHTML = `
          <div class="lookbook-empty">
            <p>Chưa có mẫu phối nào trong Lookbook của bạn. Hãy bấm <strong>"Xuất Thiệp & Lưu Lookbook"</strong> ở tủ đồ để sưu tầm các bộ trang phục tuyệt đẹp nhé!</p>
          </div>
        `;
        return;
      }

      lookbookContainer.innerHTML = list.map(item => `
        <div class="lookbook-card">
          <div class="lookbook-img-wrap">
            <img src="${item.image}" alt="${item.title}" class="lookbook-img" />
          </div>
          <div class="lookbook-meta">
            <h5 class="lookbook-title">${item.title}</h5>
            <span class="lookbook-era">${item.era}</span>
            <span class="lookbook-date">${item.date}</span>
          </div>
        </div>
      `).join('');
    } catch (e) {
      console.warn('Lỗi đọc lookbook:', e);
    }
  }
});
