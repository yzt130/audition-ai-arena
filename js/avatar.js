/**
 * VIỆT PHỤC REMIX - HỆ THỐNG DỰNG HÌNH NHÂN VẬT VECTOR SVG ĐA LỚP
 * Tái hiện nhân vật Nam / Nữ phong cách anime/chibi thanh lịch
 * Hỗ trợ các lớp: Bối cảnh, Thể trạng, Y phục trong, Thân phục chính, Mũ/Khăn, Phụ kiện, Giày hài
 * Hỗ trợ nhuộm màu Ngũ Hành trực tiếp lên y phục với hoa văn di sản.
 */

class AvatarRenderer {
  constructor(containerId = 'avatar-container') {
    this.container = document.getElementById(containerId);
    this.state = {
      gender: 'female',        // 'female' | 'male'
      skinTone: '#fae3d9',      // Tông da trắng hồng
      region: 'trung',         // 'bac' | 'trung' | 'nam'
      event: 'chup-tet',       // id sự kiện
      element: 'hoa',          // 'kim' | 'moc' | 'thuy' | 'hoa' | 'tho'
      outfit: 'nhat-binh',      // id trang phục
      headwear: 'khan-van-nu',  // id mũ/khăn
      accessory: 'quat-lua',   // id phụ kiện cầm tay
      footwear: 'hai-theu'      // id giày hài
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  // Lấy dữ liệu màu sắc ngũ hành hiện thời
  getCurrentElement() {
    const found = VIET_PHUC_DATA.elements.find(e => e.id === this.state.element);
    return found || VIET_PHUC_DATA.elements[3]; // mặc định Hỏa
  }

  render() {
    if (!this.container) return;
    const elem = this.getCurrentElement();
    const isFemale = this.state.gender === 'female';
    const reg = VIET_PHUC_DATA.regions[this.state.region] || VIET_PHUC_DATA.regions.trung;

    // Kích thước chuẩn sân khấu SVG 500x700
    const svgHTML = `
      <svg id="stage-svg" viewBox="0 0 500 700" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="viet-avatar-svg">
        <defs>
          <!-- Bộ lọc đổ bóng mềm -->
          <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="rgba(0,0,0,0.18)" />
          </filter>
          <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ffd54f" flood-opacity="0.7" />
          </filter>

          <!-- Gradient màu Ngũ Hành chính -->
          <linearGradient id="element-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${elem.hexSecondary}" />
            <stop offset="50%" stop-color="${elem.hexPrimary}" />
            <stop offset="100%" stop-color="${elem.hexBorder}" />
          </linearGradient>

          <linearGradient id="element-accent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${elem.accentColor}" />
            <stop offset="100%" stop-color="${elem.hexPrimary}" />
          </linearGradient>

          <!-- Gradient Kim loại Hoàng Kim -->
          <linearGradient id="gold-foil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff59d" />
            <stop offset="35%" stop-color="#d4af37" />
            <stop offset="70%" stop-color="#aa771c" />
            <stop offset="100%" stop-color="#ffd54f" />
          </linearGradient>

          <!-- Gradient Da mặt -->
          <linearGradient id="skin-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${this.state.skinTone}" />
            <stop offset="100%" stop-color="#f5cdbb" />
          </linearGradient>

          <!-- Pattern Hoa văn Trống Đồng Đông Sơn (Bắc) -->
          <pattern id="dong-son-pattern" width="60" height="60" patternUnits="userSpaceOnUse" opacity="0.12">
            <circle cx="30" cy="30" r="24" fill="none" stroke="#2c3e50" stroke-width="1.5" />
            <circle cx="30" cy="30" r="16" fill="none" stroke="#2c3e50" stroke-width="1" stroke-dasharray="3,2" />
            <circle cx="30" cy="30" r="6" fill="#2c3e50" />
            <path d="M 30,10 L 30,50 M 10,30 L 50,30 M 16,16 L 44,44 M 16,44 L 44,16" stroke="#2c3e50" stroke-width="1" />
          </pattern>

          <!-- Pattern Vân Mây Cung Đình Huế (Trung) -->
          <pattern id="van-may-pattern" width="80" height="50" patternUnits="userSpaceOnUse" opacity="0.15">
            <path d="M 10,30 C 15,15 35,15 40,25 C 45,15 65,15 70,30 C 75,40 60,45 50,42 C 40,46 20,44 10,30 Z" fill="none" stroke="#b71c1c" stroke-width="1.5" />
            <circle cx="40" cy="28" r="3" fill="#d4af37" />
          </pattern>

          <!-- Pattern Sóng Nước Thủy Ba (Nam) -->
          <pattern id="thuy-ba-pattern" width="70" height="40" patternUnits="userSpaceOnUse" opacity="0.15">
            <path d="M 0,20 Q 17.5,5 35,20 T 70,20 Q 87.5,35 105,20" fill="none" stroke="#00796b" stroke-width="2" />
            <path d="M 0,30 Q 17.5,15 35,30 T 70,30" fill="none" stroke="#004d40" stroke-width="1.5" />
          </pattern>
        </defs>

        <!-- LỚP 1: BỐI CẢNH DYNAMIC THEO VÙNG MIỀN & SỰ KIỆN -->
        ${this.renderBackground()}

        <!-- BỆ ĐÀI NGẮM PHỤC TRANG -->
        <g id="stage-pedestal" transform="translate(0, 580)">
          <ellipse cx="250" cy="40" rx="170" ry="25" fill="rgba(0,0,0,0.12)" filter="url(#soft-shadow)" />
          <ellipse cx="250" cy="35" rx="150" ry="20" fill="url(#gold-foil)" opacity="0.85" />
          <ellipse cx="250" cy="33" rx="142" ry="17" fill="#fffdf9" />
          <!-- Hoa văn cánh sen bệ ngọc -->
          <path d="M 150,33 Q 250,55 350,33" stroke="#d4af37" stroke-width="1.5" fill="none" />
        </g>

        <!-- LỚP 2: CƠ THỂ NHÂN VẬT (BASE AVATAR) -->
        <g id="character-base">
          <!-- Đôi chân / Quần lót lụa trong -->
          ${this.renderLegsAndInnerPants()}

          <!-- Thân người cơ bản -->
          ${this.renderBodyCore(isFemale)}

          <!-- Đầu, Cổ, Khuôn Mặt & Biểu Cảm -->
          ${this.renderHeadAndFace(isFemale)}
        </g>

        <!-- LỚP 3: Y PHỤC TRONG (Yếm đào / Áo lót cổ đứng) -->
        ${this.renderInnerGarment(isFemale)}

        <!-- LỚP 4: THÂN PHỤC CHÍNH (Áo Nhật Bình / Tấc / Giao Lĩnh...) -->
        <g id="main-garment-layer" filter="url(#soft-shadow)">
          ${this.renderMainOutfit(isFemale, elem)}
        </g>

        <!-- LỚP 5: MŨ & KHĂN ĐỘI ĐẦU -->
        <g id="headwear-layer">
          ${this.renderHeadwear(isFemale, elem)}
        </g>

        <!-- LỚP 6: TAY, PHỤ KIỆN CẦM TAY & GIÀY HÀI -->
        <g id="arms-and-accessories">
          ${this.renderArmsAndHands(isFemale)}
          ${this.renderAccessory(isFemale)}
          ${this.renderFootwear(isFemale)}
        </g>
      </svg>
    `;

    this.container.innerHTML = svgHTML;
  }

  // 1. Vẽ bối cảnh sân khấu
  renderBackground() {
    let patternRef = 'van-may-pattern';
    let gradientBg = 'linear-gradient(to bottom, #fff5eb, #fae3d9)';
    let motifTitle = 'Cung Đình Xứ Huế';

    if (this.state.region === 'bac') {
      patternRef = 'dong-son-pattern';
      motifTitle = 'Đông Đô Ngàn Năm';
    } else if (this.state.region === 'nam') {
      patternRef = 'thuy-ba-pattern';
      motifTitle = 'Sông Nước Cửu Long';
    }

    return `
      <g id="layer-background">
        <!-- Vòm cổng Nguyệt Môn (Cửa sổ tròn trăng tròn kiến trúc Việt) -->
        <rect width="500" height="700" fill="#fdfbf7" rx="16" />
        
        <!-- Khung tròn trung tâm phong cách tranh thủy mặc / cung đình -->
        <circle cx="250" cy="330" r="190" fill="#fbf5ee" stroke="#e8d5b5" stroke-width="2" />
        <circle cx="250" cy="330" r="190" fill="url(#${patternRef})" />
        
        <!-- Họa tiết vân mây trời góc -->
        <path d="M 80,120 Q 120,80 180,110 T 260,95" fill="none" stroke="#d4af37" stroke-width="1.5" opacity="0.4" />
        <path d="M 420,120 Q 380,80 320,110 T 240,95" fill="none" stroke="#d4af37" stroke-width="1.5" opacity="0.4" />
        
        <!-- Nhành đào / sen trang trí mờ hậu cảnh -->
        <g opacity="0.35">
          <circle cx="110" cy="180" r="12" fill="#f48fb1" />
          <circle cx="130" cy="165" r="9" fill="#f8bbd0" />
          <circle cx="390" cy="190" r="14" fill="#f48fb1" />
          <circle cx="370" cy="175" r="10" fill="#f8bbd0" />
        </g>
      </g>
    `;
  }

  // 2. Vẽ đôi chân & quần lót
  renderLegsAndInnerPants() {
    return `
      <!-- Quần lụa trắng dài buông thụng chuẩn phong cách cổ truyền -->
      <g id="inner-pants">
        <path d="M 215,410 L 205,580 L 235,582 L 248,460 L 262,460 L 275,582 L 305,580 L 295,410 Z" 
              fill="#ffffff" stroke="#e0e0e0" stroke-width="1" />
        <!-- Nếp gấp lụa quần -->
        <line x1="225" y1="440" x2="220" y2="575" stroke="#eceff1" stroke-width="1.5" />
        <line x1="285" y1="440" x2="290" y2="575" stroke="#eceff1" stroke-width="1.5" />
      </g>
    `;
  }

  // 3. Cơ thể cốt lõi
  renderBodyCore(isFemale) {
    return `
      <g id="body-core">
        <!-- Cổ nhân vật -->
        <rect x="238" y="195" width="24" height="35" rx="5" fill="url(#skin-gradient)" />
        <!-- Đổ bóng xương quai xanh mềm mại -->
        <path d="M 235,225 Q 250,232 265,225" stroke="#e6b8a2" stroke-width="1.5" fill="none" opacity="0.7" />
      </g>
    `;
  }

  // 4. Khuôn mặt thanh tú & Tóc
  renderHeadAndFace(isFemale) {
    const hairColor = '#212121';
    
    // Tóc nữ: búi cao cài trâm hoặc tóc buông lơi duyên dáng
    const femaleHair = `
      <!-- Tóc dài mềm mại buông tự nhiên sau lưng -->
      <path d="M 218,140 C 205,180 208,270 220,320 C 228,260 226,200 230,160 Z" fill="${hairColor}" />
      <path d="M 282,140 C 295,180 292,270 280,320 C 272,260 274,200 270,160 Z" fill="${hairColor}" />
      <!-- Búi tóc tròn trên đỉnh đầu nếu không đội mũ -->
      <circle cx="250" cy="115" r="28" fill="${hairColor}" />
    `;

    // Tóc nam: búi củ tỏi gọn gàng phía sau hoặc búi cao đĩnh đạc
    const maleHair = `
      <circle cx="250" cy="118" r="22" fill="${hairColor}" />
      <path d="M 215,145 Q 250,110 285,145 Q 295,185 285,195 Q 250,160 215,195 Z" fill="${hairColor}" />
    `;

    return `
      <g id="head-and-face">
        ${isFemale ? femaleHair : maleHair}

        <!-- Khuôn mặt trái xoan thanh tú -->
        <path d="M 218,150 C 218,125 282,125 282,150 C 282,185 268,208 250,210 C 232,208 218,185 218,150 Z" 
              fill="url(#skin-gradient)" filter="url(#soft-shadow)" />

        <!-- Đôi tai -->
        <ellipse cx="218" cy="162" rx="4" ry="7" fill="${this.state.skinTone}" />
        <ellipse cx="282" cy="162" rx="4" ry="7" fill="${this.state.skinTone}" />

        <!-- Má hồng e ấp -->
        <ellipse cx="230" cy="172" rx="7" ry="4" fill="#ff8a80" opacity="0.45" />
        <ellipse cx="270" cy="172" rx="7" ry="4" fill="#ff8a80" opacity="0.45" />

        <!-- Lông mày lá liễu mềm mại -->
        <path d="M 228,150 Q 237,146 244,151" stroke="#37474f" stroke-width="1.8" stroke-linecap="round" fill="none" />
        <path d="M 272,150 Q 263,146 256,151" stroke="#37474f" stroke-width="1.8" stroke-linecap="round" fill="none" />

        <!-- Đôi mắt bồ câu đen tuyền long lanh -->
        <g id="eyes">
          <!-- Mắt trái -->
          <ellipse cx="236" cy="160" rx="5" ry="6" fill="#1a1a1a" />
          <circle cx="234" cy="158" r="2" fill="#ffffff" />
          <circle cx="237" cy="162" r="1" fill="#ffffff" />
          <path d="M 230,157 Q 236,152 243,158" stroke="#212121" stroke-width="1.6" fill="none" />

          <!-- Mắt phải -->
          <ellipse cx="264" cy="160" rx="5" ry="6" fill="#1a1a1a" />
          <circle cx="262" cy="158" r="2" fill="#ffffff" />
          <circle cx="265" cy="162" r="1" fill="#ffffff" />
          <path d="M 270,157 Q 264,152 257,158" stroke="#212121" stroke-width="1.6" fill="none" />
        </g>

        <!-- Sống mũi thanh tú -->
        <path d="M 250,160 L 249,173 Q 251,174 253,173" stroke="#d7ccc8" stroke-width="1.5" stroke-linecap="round" fill="none" />

        <!-- Nụ cười duyên dáng chúm chím -->
        <path d="M 245,186 Q 250,191 255,186" stroke="#c62828" stroke-width="2" stroke-linecap="round" fill="none" />
        <path d="M 247,186 Q 250,188 253,186" stroke="#ef9a9a" stroke-width="1.2" fill="none" />

        <!-- Mái tóc phía trước trán -->
        <path d="M 220,140 Q 235,130 250,138 Q 265,130 280,140 Q 250,122 220,140 Z" fill="${hairColor}" />
      </g>
    `;
  }

  // 5. Y phục lót bên trong (Yếm hoặc áo cánh lót trắng)
  renderInnerGarment(isFemale) {
    if (isFemale) {
      return `
        <!-- Yếm lót hoa đào bên trong -->
        <g id="inner-yem">
          <path d="M 235,215 L 265,215 L 280,270 L 220,270 Z" fill="#f8bbd0" stroke="#f06292" stroke-width="1" />
          <!-- Cổ yếm thắt dây -->
          <path d="M 235,215 Q 250,225 265,215" stroke="#c2185b" stroke-width="2" fill="none" />
          <!-- Hoa sen thêu nhỏ trên yếm -->
          <circle cx="250" cy="245" r="4" fill="#e91e63" opacity="0.7" />
        </g>
      `;
    } else {
      return `
        <!-- Cổ áo cánh trắng lót nam thanh lịch -->
        <g id="inner-shirt">
          <path d="M 236,210 L 264,210 L 270,250 L 230,250 Z" fill="#ffffff" stroke="#cfd8dc" stroke-width="1" />
          <path d="M 242,210 L 258,230" stroke="#90a4ae" stroke-width="1.5" />
        </g>
      `;
    }
  }

  // 6. Thân phục chính (Main Robe) với màu ngũ hành
  renderMainOutfit(isFemale, elem) {
    const outfitId = this.state.outfit;

    switch (outfitId) {
      case 'nhat-binh':
        return this.svgNhatBinh(elem);
      case 'ao-tac-nu':
        return this.svgAoTacNu(elem);
      case 'ao-tac-nam':
        return this.svgAoTacNam(elem);
      case 'giao-linh':
        return this.svgGiaoLinh(elem);
      case 'doi-kham':
        return this.svgDoiKham(elem);
      case 'ngu-than-nam':
        return this.svgNguThanNam(elem);
      case 'tu-than':
        return this.svgTuThan(elem);
      case 'ao-ba-ba':
        return this.svgAoBaBa(elem);
      case 'ao-dai-tan-thoi':
        return this.svgAoDaiTanThoi(elem);
      case 'van-lang':
        return this.svgVanLang(elem);
      default:
        return this.svgNhatBinh(elem);
    }
  }

  // === ĐỒ HỌA VECTOR CÁC LOẠI Y PHỤC TRUYỀN THỐNG ===

  // 1. Áo Nhật Bình (Triều Nguyễn)
  svgNhatBinh(elem) {
    return `
      <g id="outfit-nhat-binh">
        <!-- Thân áo chính xòe rộng phủ gối -->
        <path d="M 200,230 L 140,360 L 180,380 L 195,300 L 190,520 L 310,520 L 305,300 L 320,380 L 360,360 L 300,230 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />

        <!-- Tay áo thụng rộng với dải màu ngũ sắc ngũ hành đặc trưng -->
        <!-- Tay trái -->
        <path d="M 140,360 L 180,380 L 175,410 L 130,385 Z" fill="#ffd54f" />
        <path d="M 130,385 L 175,410 L 170,425 L 125,400 Z" fill="#42a5f5" />
        <path d="M 125,400 L 170,425 L 165,440 L 120,415 Z" fill="#ef5350" />
        <path d="M 120,415 L 165,440 L 160,455 L 115,430 Z" fill="#66bb6a" />
        <!-- Tay phải -->
        <path d="M 360,360 L 320,380 L 325,410 L 370,385 Z" fill="#ffd54f" />
        <path d="M 370,385 L 325,410 L 330,425 L 375,400 Z" fill="#42a5f5" />
        <path d="M 375,400 L 330,425 L 335,440 L 380,415 Z" fill="#ef5350" />
        <path d="M 380,415 L 335,440 L 340,455 L 385,430 Z" fill="#66bb6a" />

        <!-- CỔ ÁO HÌNH CHỮ NHẬT NGŨ SẮC ĐẶC TRƯNG CỦA ÁO NHẬT BÌNH -->
        <path d="M 230,215 L 270,215 L 275,340 L 260,340 L 258,245 L 242,245 L 240,340 L 225,340 Z" 
              fill="#fff" stroke="#d4af37" stroke-width="1.5" />
        
        <!-- Các dải thêu ngũ sắc trên cổ hình chữ nhật -->
        <rect x="232" y="218" width="36" height="6" fill="#c62828" />
        <rect x="232" y="224" width="36" height="5" fill="#fbc02d" />
        <rect x="232" y="229" width="36" height="5" fill="#1565c0" />
        <rect x="232" y="234" width="36" height="5" fill="#2e7d32" />

        <!-- Dải kim khánh / nút gài ngọc giữa ngực -->
        <circle cx="250" cy="245" r="4.5" fill="url(#gold-foil)" stroke="#8e24aa" stroke-width="1" />
        <circle cx="250" cy="275" r="4" fill="url(#gold-foil)" />
        <circle cx="250" cy="305" r="4" fill="url(#gold-foil)" />

        <!-- Dải thùy lưu ngũ sắc buông dài trước vạt áo -->
        <rect x="245" y="340" width="10" height="150" fill="url(#gold-foil)" opacity="0.9" />
        <path d="M 245,490 L 250,510 L 255,490 Z" fill="#c62828" />

        <!-- Hoa văn phụng ổ tròn thêu chỉ vàng trước ngực -->
        <circle cx="250" cy="380" r="26" fill="none" stroke="url(#gold-foil)" stroke-width="2.5" />
        <circle cx="250" cy="380" r="21" fill="none" stroke="url(#gold-foil)" stroke-width="1" stroke-dasharray="3,2" />
        <!-- Chim phụng cách điệu -->
        <path d="M 245,372 Q 250,366 255,372 Q 258,380 250,388 Q 242,380 245,372 Z" fill="url(#gold-foil)" />

        <!-- Thủy ba sóng nước viền chân áo -->
        <g transform="translate(190, 495)">
          <path d="M 0,15 Q 15,0 30,15 T 60,15 T 90,15 T 120,15 L 120,25 L 0,25 Z" fill="#ffd54f" opacity="0.8" />
          <path d="M 0,20 Q 15,8 30,20 T 60,20 T 90,20 T 120,20" stroke="#c62828" stroke-width="2" fill="none" />
        </g>
      </g>
    `;
  }

  // 2. Áo Tấc Nữ (Tay thụng rộng)
  svgAoTacNu(elem) {
    return `
      <g id="outfit-ao-tac-nu">
        <!-- Thân áo dài kín đáo đoan trang -->
        <path d="M 205,220 L 130,340 L 165,370 L 195,290 L 185,530 L 315,530 L 305,290 L 335,370 L 370,340 L 295,220 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />
        
        <!-- Ống tay thụng buông thõng dài tới 1 tấc đặc trưng -->
        <path d="M 130,340 L 110,480 L 175,470 L 165,370 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />
        <path d="M 370,340 L 390,480 L 325,470 L 335,370 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />

        <!-- Cổ đứng cài khuy bên phải -->
        <path d="M 235,212 L 265,212 L 265,232 L 235,232 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />
        <circle cx="260" cy="222" r="3" fill="url(#gold-foil)" />
        <circle cx="264" cy="245" r="3" fill="url(#gold-foil)" />
        <circle cx="260" cy="275" r="3" fill="url(#gold-foil)" />

        <!-- Viền áo thêu lụa đồng màu trang nhã -->
        <path d="M 185,525 L 315,525" stroke="url(#gold-foil)" stroke-width="4" />
        <path d="M 110,475 L 175,465" stroke="url(#gold-foil)" stroke-width="3" />
        <path d="M 390,475 L 325,465" stroke="url(#gold-foil)" stroke-width="3" />
      </g>
    `;
  }

  // 3. Áo Tấc Nam (Lễ phục sĩ phu)
  svgAoTacNam(elem) {
    return `
      <g id="outfit-ao-tac-nam">
        <!-- Dáng áo nam đĩnh đạc, vai ngang vạt buông thẳng -->
        <path d="M 195,215 L 115,330 L 160,365 L 190,285 L 180,545 L 320,545 L 310,285 L 340,365 L 385,330 L 305,215 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />

        <!-- Ống tay rộng một tấc buông thẳng thênh thang -->
        <path d="M 115,330 L 95,490 L 170,480 L 160,365 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />
        <path d="M 385,330 L 405,490 L 330,480 L 340,365 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />

        <!-- Cổ đứng tôn nghiêm cài 5 khuy ngũ thường -->
        <rect x="234" y="208" width="32" height="25" rx="3" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />
        <!-- Khuy cài sang nách phải -->
        <path d="M 250,233 L 272,250 L 275,320" stroke="${elem.hexBorder}" stroke-width="1.5" fill="none" />
        <circle cx="262" cy="216" r="3.5" fill="url(#gold-foil)" />
        <circle cx="272" cy="250" r="3" fill="url(#gold-foil)" />
        <circle cx="274" cy="275" r="3" fill="url(#gold-foil)" />
        <circle cx="275" cy="305" r="3" fill="url(#gold-foil)" />

        <!-- Viền chân áo thêu chữ Thọ tròn mờ ẩn -->
        <circle cx="250" cy="460" r="22" fill="none" stroke="url(#gold-foil)" stroke-width="1.5" opacity="0.6" stroke-dasharray="4,3" />
      </g>
    `;
  }

  // 4. Áo Giao Lĩnh (Lý - Trần - Lê Sơ)
  svgGiaoLinh(elem) {
    return `
      <g id="outfit-giao-linh">
        <!-- Vạt chéo vắt sang phải đặc trưng thời Lý - Trần -->
        <path d="M 195,220 L 135,340 L 170,365 L 195,290 L 180,530 L 320,530 L 305,290 L 330,365 L 365,340 L 305,220 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />

        <!-- Nẹp cổ vạt chéo lớn hình chữ V -->
        <path d="M 220,212 L 270,300 L 255,308 L 205,220 Z" fill="#ffffff" stroke="#cfd8dc" stroke-width="1" />
        <path d="M 280,212 L 230,300 L 245,308 L 295,220 Z" fill="url(#element-accent)" stroke="${elem.hexBorder}" stroke-width="1.5" />

        <!-- Tay áo thụng uyển chuyển -->
        <path d="M 135,340 L 125,440 L 180,410 L 170,365 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" />
        <path d="M 365,340 L 375,440 L 320,410 L 330,365 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" />

        <!-- Dải thắt lưng lụa buộc nơ thả dài thướt tha -->
        <rect x="220" y="320" width="60" height="18" rx="4" fill="url(#gold-foil)" />
        <circle cx="250" cy="329" r="6" fill="#b71c1c" />
        <!-- Dải lụa buông hai bên -->
        <path d="M 245,335 L 235,460 L 245,455 L 248,335 Z" fill="url(#gold-foil)" />
        <path d="M 255,335 L 265,460 L 255,455 L 252,335 Z" fill="url(#gold-foil)" />
      </g>
    `;
  }

  // 5. Áo Đối Khâm (Hai vạt song song)
  svgDoiKham(elem) {
    return `
      <g id="outfit-doi-kham">
        <!-- Hai vạt buông thẳng song song để lộ yếm đào bên trong -->
        <path d="M 200,225 L 140,340 L 175,365 L 195,295 L 185,525 L 230,525 L 230,230 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />
        <path d="M 300,225 L 360,340 L 325,365 L 305,295 L 315,525 L 270,525 L 270,230 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />

        <!-- Nẹp vạt áo thêu cúc dây mạ vàng lộng lẫy -->
        <rect x="220" y="225" width="12" height="300" fill="url(#gold-foil)" stroke="${elem.hexBorder}" stroke-width="1" />
        <rect x="268" y="225" width="12" height="300" fill="url(#gold-foil)" stroke="${elem.hexBorder}" stroke-width="1" />

        <!-- Đai thắt lưng ngọc bội ngang ngực cao (phong cách Lý - Lê) -->
        <rect x="210" y="275" width="80" height="15" rx="3" fill="#e91e63" />
        <circle cx="250" cy="282" r="6" fill="url(#gold-foil)" stroke="#880e4f" stroke-width="1" />
      </g>
    `;
  }

  // 6. Áo Ngũ Thân Nam (Tay Chẽn)
  svgNguThanNam(elem) {
    return `
      <g id="outfit-ngu-than-nam">
        <!-- Vạt cong hình cánh cung, 5 thân kín đáo -->
        <path d="M 205,215 L 155,310 L 180,330 L 198,280 L 190,535 L 310,535 L 302,280 L 320,330 L 345,310 L 295,215 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />

        <!-- Ống tay chẽn gọn gàng ôm cánh tay quân tử -->
        <path d="M 155,310 L 138,420 L 160,425 L 180,330 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />
        <path d="M 345,310 L 362,420 L 340,425 L 320,330 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />

        <!-- Cổ đứng 3 phân ôm trọn khuy ngọc ngũ thường -->
        <path d="M 235,208 L 265,208 L 265,230 L 235,230 Z" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />
        
        <!-- Nẹp khuy cài 5 cúc tượng trưng Nhân - Lễ - Nghĩa - Trí - Tín -->
        <path d="M 252,228 L 270,245 L 273,340" stroke="${elem.hexBorder}" stroke-width="1.5" fill="none" />
        <circle cx="260" cy="216" r="3" fill="url(#gold-foil)" />
        <circle cx="270" cy="245" r="3" fill="url(#gold-foil)" />
        <circle cx="272" cy="275" r="3" fill="url(#gold-foil)" />
        <circle cx="273" cy="305" r="3" fill="url(#gold-foil)" />
        <circle cx="273" cy="335" r="3" fill="url(#gold-foil)" />

        <!-- Đường xẻ tà cong duyên dáng hai bên hông -->
        <path d="M 198,380 L 190,535" stroke="${elem.hexBorder}" stroke-width="1.5" />
        <path d="M 302,380 L 310,535" stroke="${elem.hexBorder}" stroke-width="1.5" />
      </g>
    `;
  }

  // 7. Áo Tứ Thân Kinh Bắc
  svgTuThan(elem) {
    return `
      <g id="outfit-tu-than">
        <!-- Vạt sau và hai vạt trước buông nhẹ nhàng -->
        <path d="M 205,225 L 150,330 L 175,350 L 195,290 L 180,520 L 220,520 L 230,340 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />
        <path d="M 295,225 L 350,330 L 325,350 L 305,290 L 320,520 L 280,520 L 270,340 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />

        <!-- Yếm đào đỏ hồng lộ rõ ở ngực áo -->
        <path d="M 230,220 L 270,220 L 265,310 L 235,310 Z" fill="#f06292" stroke="#e91e63" stroke-width="1" />

        <!-- Dải thắt lưng xanh màu lá mạ buộc nơ xinh xắn ở bụng -->
        <path d="M 215,310 Q 250,325 285,310 L 285,328 Q 250,345 215,328 Z" fill="#81c784" stroke="#2e7d32" stroke-width="1.5" />
        <!-- Hai dải lụa thắt buông trước bụng -->
        <path d="M 245,325 L 235,450 L 245,445 Z" fill="#81c784" />
        <path d="M 255,325 L 265,450 L 255,445 Z" fill="#81c784" />

        <!-- Hai vạt trước buộc túm điệu đà -->
        <circle cx="250" cy="335" r="7" fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="1.5" />
      </g>
    `;
  }

  // 8. Áo Bà Ba Nam Bộ
  svgAoBaBa(elem) {
    return `
      <g id="outfit-ao-ba-ba">
        <!-- Cổ tròn thanh thoát, xẻ tà hai bên hông mộc mạc -->
        <path d="M 215,225 L 165,320 L 190,335 L 202,280 L 195,430 L 225,430 L 235,410 L 265,410 L 275,430 L 305,430 L 298,280 L 310,335 L 335,320 L 285,225 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />

        <!-- Quần đen chấm gót ống rộng -->
        <path d="M 210,425 L 195,580 L 235,580 L 248,460 L 262,460 L 275,580 L 315,580 L 300,425 Z" 
              fill="#263238" stroke="#102027" stroke-width="1.5" />

        <!-- Hàng nút áo thẳng hàng trước ngực -->
        <line x1="250" y1="235" x2="250" y2="410" stroke="${elem.hexBorder}" stroke-width="1.5" />
        <circle cx="250" cy="250" r="3" fill="#ffffff" stroke="${elem.hexBorder}" stroke-width="1" />
        <circle cx="250" cy="285" r="3" fill="#ffffff" stroke="${elem.hexBorder}" stroke-width="1" />
        <circle cx="250" cy="320" r="3" fill="#ffffff" stroke="${elem.hexBorder}" stroke-width="1" />
        <circle cx="250" cy="355" r="3" fill="#ffffff" stroke="${elem.hexBorder}" stroke-width="1" />
        <circle cx="250" cy="390" r="3" fill="#ffffff" stroke="${elem.hexBorder}" stroke-width="1" />

        <!-- Hai túi vuông xinh xắn hai bên vạt trước -->
        <rect x="208" y="365" width="24" height="24" rx="2" fill="none" stroke="${elem.hexBorder}" stroke-width="1.5" />
        <rect x="268" y="365" width="24" height="24" rx="2" fill="none" stroke="${elem.hexBorder}" stroke-width="1.5" />
      </g>
    `;
  }

  // 9. Áo Dài Tân Thời / Lemur (TK 20)
  svgAoDaiTanThoi(elem) {
    return `
      <g id="outfit-ao-dai-tan-thoi">
        <!-- Tà áo dài tha thướt chấm mắt cá chân, chiết eo thon gọn -->
        <path d="M 215,225 L 175,320 L 195,335 L 205,280 Q 210,310 215,350 L 190,560 L 310,560 L 285,350 Q 290,310 295,280 L 305,335 L 325,320 L 285,225 Z" 
              fill="url(#element-primary)" stroke="${elem.hexBorder}" stroke-width="2" />

        <!-- Quần lụa trắng suông rộng thướt tha bên trong -->
        <path d="M 210,420 L 195,580 L 235,580 L 248,460 L 262,460 L 275,580 L 315,580 L 300,420 Z" 
              fill="#ffffff" stroke="#e0e0e0" stroke-width="1" />

        <!-- Cổ áo cách tân (Cổ sen hoặc cổ thuyền nhẹ nhàng) -->
        <path d="M 235,212 Q 250,225 265,212" stroke="url(#gold-foil)" stroke-width="3" fill="none" />

        <!-- Hoa sen vẽ tay hoặc thêu chìm bên sườn áo -->
        <g transform="translate(260, 420)">
          <path d="M 0,-15 C 8,-8 10,5 0,15 C -10,5 -8,-8 0,-15 Z" fill="#f48fb1" opacity="0.85" />
          <path d="M -8,0 C -12,8 -6,14 0,15" stroke="#4caf50" stroke-width="1.5" fill="none" />
        </g>
      </g>
    `;
  }

  // 10. Trang phục Văn Lang (Thời Hùng Vương)
  svgVanLang(elem) {
    return `
      <g id="outfit-van-lang">
        <!-- Áo giáp thổ cẩm vải gai đan chéo quấn quanh ngực -->
        <path d="M 210,230 L 290,230 L 295,310 L 205,310 Z" fill="#8d6e63" stroke="#4e342e" stroke-width="2" />
        <!-- Hoa văn ziczac kỷ hà chim Lạc Đông Sơn -->
        <path d="M 210,260 L 220,245 L 230,260 L 240,245 L 250,260 L 260,245 L 270,260 L 280,245 L 290,260" stroke="#ffd54f" stroke-width="2" fill="none" />

        <!-- Khố thổ cẩm hoặc váy quấn sợi đay -->
        <path d="M 205,310 L 295,310 L 305,480 L 195,480 Z" fill="#6d4c41" stroke="#3e2723" stroke-width="2" />
        <!-- Dải khố đính chuỗi hạt rủ trước bụng -->
        <rect x="238" y="310" width="24" height="190" fill="#a1887f" stroke="#ffd54f" stroke-width="1.5" />
        <circle cx="250" cy="350" r="5" fill="#ffd54f" />
        <circle cx="250" cy="390" r="5" fill="#ffd54f" />
        <circle cx="250" cy="430" r="5" fill="#ffd54f" />
        <circle cx="250" cy="470" r="5" fill="#ffd54f" />
      </g>
    `;
  }

  // 7. Mũ và Khăn đội đầu
  renderHeadwear(isFemale, elem) {
    const headId = this.state.headwear;

    switch (headId) {
      case 'khan-dong-nam':
        return `
          <!-- Khăn đóng / Khăn xếp nam nhiều nếp hình chữ Nhân (人) -->
          <g id="headwear-khan-dong" filter="url(#soft-shadow)">
            <ellipse cx="250" cy="120" rx="38" ry="14" fill="#1b1b1b" stroke="#333" stroke-width="1.5" />
            <path d="M 212,122 C 212,141 238,143 250,140 C 262,143 288,141 288,122" fill="#263238" stroke="#102027" stroke-width="2" />
            <!-- Nếp gập khăn chữ Nhân trước trán -->
            <path d="M 242,130 L 250,139 L 258,130" stroke="url(#gold-foil)" stroke-width="2" fill="none" />
            <ellipse cx="250" cy="115" rx="32" ry="8" fill="#37474f" />
          </g>
        `;

      case 'khan-van-nu':
        return `
          <!-- Khăn vấn vành nữ bằng nhung/gấm quý phái -->
          <g id="headwear-khan-van" filter="url(#soft-shadow)">
            <path d="M 212,138 C 210,102 290,102 288,138 C 288,143 270,140 250,140 C 230,140 212,143 212,138 Z" 
                  fill="${elem.hexBorder}" stroke="url(#gold-foil)" stroke-width="2" />
            <ellipse cx="250" cy="120" rx="34" ry="13" fill="${elem.hexPrimary}" />
            <ellipse cx="250" cy="118" rx="26" ry="9" fill="#212121" />
            <!-- Trâm cài tóc ngọc hoa sen -->
            <circle cx="280" cy="122" r="5" fill="url(#gold-foil)" />
            <path d="M 282,125 L 292,138" stroke="url(#gold-foil)" stroke-width="2" />
          </g>
        `;

      case 'non-quai-thao':
        return `
          <!-- Nón quai thao / Nón ba tầm trăng rằm quan họ -->
          <g id="headwear-non-quai-thao" transform="translate(0, 5)" filter="url(#soft-shadow)">
            <!-- Vành nón rộng phẳng như vầng trăng nằm sau đầu làm hào quang nền -->
            <ellipse cx="250" cy="145" rx="88" ry="30" fill="#fff9c4" stroke="#fbc02d" stroke-width="2" />
            <ellipse cx="250" cy="142" rx="82" ry="26" fill="#fffde7" />
            <circle cx="250" cy="138" r="16" fill="#fbc02d" opacity="0.4" />
            <!-- Dải quai thao bằng lụa rủ dài hai bên vai -->
            <path d="M 195,150 Q 185,240 205,330" stroke="#7b1fa2" stroke-width="3" fill="none" />
            <path d="M 305,150 Q 315,240 295,330" stroke="#7b1fa2" stroke-width="3" fill="none" />
          </g>
        `;

      case 'mu-phung':
        return `
          <!-- Mũ phụng dát vàng triều đình ngậm chuỗi ngọc -->
          <g id="headwear-mu-phung" filter="url(#gold-glow)">
            <!-- Thân mũ miện vàng chạm lọng -->
            <path d="M 215,138 Q 250,88 285,138 L 278,144 Q 250,122 222,144 Z" fill="url(#gold-foil)" stroke="#d4af37" stroke-width="1.5" />
            <!-- Đỉnh mũ chim phụng tung cánh -->
            <circle cx="250" cy="92" r="10" fill="url(#gold-foil)" />
            <path d="M 240,88 Q 225,68 215,78 Q 238,88 245,92" fill="url(#gold-foil)" />
            <path d="M 260,88 Q 275,68 285,78 Q 262,88 255,92" fill="url(#gold-foil)" />
            <!-- Chuỗi ngọc lưu ly rủ hai bên tai -->
            <g stroke="#ffd54f" stroke-width="2">
              <circle cx="218" cy="152" r="3.5" fill="#e91e63" />
              <circle cx="218" cy="165" r="3" fill="#42a5f5" />
              <circle cx="282" cy="152" r="3.5" fill="#e91e63" />
              <circle cx="282" cy="165" r="3" fill="#42a5f5" />
            </g>
          </g>
        `;

      case 'non-la':
        return `
          <!-- Nón lá chóp nhọn xứ Huế / bình dân thanh thoát -->
          <g id="headwear-non-la" transform="translate(0, 10)" filter="url(#soft-shadow)">
            <path d="M 250,60 L 175,138 L 325,138 Z" fill="#fff9c4" stroke="#fbc02d" stroke-width="1.5" />
            <ellipse cx="250" cy="138" rx="75" ry="12" fill="#fffde7" stroke="#fbc02d" stroke-width="1.5" />
            <!-- Các vành nan trúc nón lá -->
            <path d="M 195,118 Q 250,128 305,118" stroke="#fbc02d" stroke-width="1" fill="none" />
            <path d="M 215,95 Q 250,104 285,95" stroke="#fbc02d" stroke-width="1" fill="none" />
            <!-- Quai nón lụa hồng / tím -->
            <path d="M 210,138 Q 225,190 245,188" stroke="#ec407a" stroke-width="2.5" fill="none" />
            <path d="M 290,138 Q 275,190 245,188" stroke="#ec407a" stroke-width="2.5" fill="none" />
          </g>
        `;

      case 'mu-long-chim':
        return `
          <!-- Mũ lông chim Văn Lang thời Hùng Vương -->
          <g id="headwear-mu-long-chim">
            <ellipse cx="250" cy="142" rx="38" ry="14" fill="#5d4037" stroke="#ffd54f" stroke-width="2" />
            <!-- Hàng lông chim vươn cao kiêu hãnh -->
            <path d="M 230,140 Q 220,60 215,50 Q 230,70 235,138" fill="#d7ccc8" stroke="#4e342e" stroke-width="1" />
            <path d="M 250,138 Q 250,40 250,30 Q 255,50 255,138" fill="#efebe9" stroke="#b71c1c" stroke-width="1.5" />
            <path d="M 270,140 Q 280,60 285,50 Q 270,70 265,138" fill="#d7ccc8" stroke="#4e342e" stroke-width="1" />
          </g>
        `;

      default:
        // Không đội mũ: Trâm cài hoa sen nhẹ nhàng
        return `
          <g id="headwear-none">
            <circle cx="275" cy="120" r="4" fill="#ffd54f" />
            <path d="M 275,120 L 290,135" stroke="#ffd54f" stroke-width="2" />
          </g>
        `;
    }
  }

  // 8. Cánh tay & Bàn tay
  renderArmsAndHands(isFemale) {
    return `
      <g id="hands">
        <!-- Đôi bàn tay búp măng chắp trước bụng thanh lịch -->
        <ellipse cx="242" cy="335" rx="8" ry="6" fill="${this.state.skinTone}" stroke="#e6b8a2" stroke-width="1" />
        <ellipse cx="258" cy="335" rx="8" ry="6" fill="${this.state.skinTone}" stroke="#e6b8a2" stroke-width="1" />
      </g>
    `;
  }

  // 9. Phụ kiện cầm tay
  renderAccessory(isFemale) {
    const accId = this.state.accessory;

    switch (accId) {
      case 'quat-lua':
        return `
          <!-- Quạt xếp lụa thêu sen xòe duyên dáng -->
          <g id="acc-quat-lua" transform="translate(230, 290)">
            <path d="M 20,45 L -15,10 C 5,-8 35,-8 55,10 Z" fill="#fff9c4" stroke="#d4af37" stroke-width="1.5" />
            <!-- Nan trúc quạt -->
            <line x1="20" y1="45" x2="5" y2="0" stroke="#8d6e63" stroke-width="1" />
            <line x1="20" y1="45" x2="20" y2="-5" stroke="#8d6e63" stroke-width="1" />
            <line x1="20" y1="45" x2="35" y2="0" stroke="#8d6e63" stroke-width="1" />
            <!-- Bông sen nhỏ trên quạt -->
            <circle cx="20" cy="15" r="4" fill="#f06292" />
            <!-- Dải thùa ngọc bích buông đuôi quạt -->
            <line x1="20" y1="45" x2="20" y2="70" stroke="#c62828" stroke-width="2" />
            <circle cx="20" cy="70" r="3" fill="#4caf50" />
          </g>
        `;

      case 'the-bai':
        return `
          <!-- Thẻ bài bạch ngọc cát tường -->
          <g id="acc-the-bai" transform="translate(235, 330)">
            <rect x="10" y="0" width="10" height="25" rx="2" fill="#e0f2f1" stroke="url(#gold-foil)" stroke-width="1.5" />
            <line x1="15" y1="-8" x2="15" y2="0" stroke="#c62828" stroke-width="1.5" />
            <!-- Tua rua đỏ may mắn -->
            <line x1="15" y1="25" x2="15" y2="45" stroke="#c62828" stroke-width="2" />
          </g>
        `;

      case 'trap-go':
        return `
          <!-- Tráp trầu gỗ khảm xà cừ sơn then -->
          <g id="acc-trap-go" transform="translate(225, 320)">
            <rect x="0" y="10" width="50" height="24" rx="3" fill="#3e2723" stroke="#ffd54f" stroke-width="1.5" />
            <rect x="4" y="6" width="42" height="6" rx="2" fill="#4e342e" stroke="#ffd54f" stroke-width="1" />
            <!-- Hoa văn khảm ốc óng ánh -->
            <polygon points="25,14 30,22 20,22" fill="#80deea" />
          </g>
        `;

      case 'canh-sen':
        return `
          <!-- Búp sen hồng cung đình -->
          <g id="acc-canh-sen" transform="translate(255, 270)">
            <!-- Cành sen xanh biếc -->
            <path d="M 0,70 Q 5,30 20,0" stroke="#2e7d32" stroke-width="2.5" fill="none" />
            <!-- Búp sen hồng phấn nở hé -->
            <path d="M 20,0 C 10,-12 15,-22 22,-28 C 29,-22 34,-12 24,0 Z" fill="#f48fb1" stroke="#e91e63" stroke-width="1" />
          </g>
        `;

      default:
        return '';
    }
  }

  // 10. Giày hài & Guốc mộc
  renderFootwear(isFemale) {
    const footId = this.state.footwear;

    if (footId === 'hai-theu') {
      return `
        <!-- Đôi hài thêu mũi cong hoàng gia -->
        <g id="footwear-hai-theu">
          <!-- Hài trái -->
          <path d="M 205,580 Q 200,572 195,576 Q 192,586 215,586 L 235,586 L 235,580 Z" 
                fill="#c62828" stroke="url(#gold-foil)" stroke-width="1.5" />
          <!-- Hài phải -->
          <path d="M 295,580 Q 300,572 305,576 Q 308,586 285,586 L 265,586 L 265,580 Z" 
                fill="#c62828" stroke="url(#gold-foil)" stroke-width="1.5" />
        </g>
      `;
    } else {
      return `
        <!-- Guốc mộc quai nhung mộc mạc -->
        <g id="footwear-guoc-moc">
          <rect x="205" y="582" width="28" height="6" rx="2" fill="#8d6e63" stroke="#4e342e" stroke-width="1" />
          <path d="M 212,582 Q 219,574 226,582" stroke="#d81b60" stroke-width="2.5" fill="none" />

          <rect x="267" y="582" width="28" height="6" rx="2" fill="#8d6e63" stroke="#4e342e" stroke-width="1" />
          <path d="M 274,582 Q 281,574 288,582" stroke="#d81b60" stroke-width="2.5" fill="none" />
        </g>
      `;
    }
  }
}

// Khởi tạo đối tượng toàn cục
window.AvatarRenderer = AvatarRenderer;
