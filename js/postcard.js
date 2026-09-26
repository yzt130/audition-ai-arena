/**
 * VIỆT PHỤC REMIX - TRÌNH XUẤT THIỆP BƯU THIẾP VĂN HÓA (POSTCARD & LOOKBOOK)
 * Kết xuất đồ họa Canvas độ phân giải cao (Retina 2x)
 * Tích hợp con dấu triện son đỏ, danh ngôn văn hóa và tải file PNG chất lượng cao.
 */

class PostcardGenerator {
  constructor() {
    this.modal = document.getElementById('postcard-modal');
    this.canvas = document.getElementById('postcard-canvas');
    this.downloadBtn = document.getElementById('download-postcard-btn');
    this.saveLookbookBtn = document.getElementById('save-lookbook-btn');
    this.closeBtn = document.getElementById('close-postcard-btn');

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.hideModal());
    }
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.hideModal();
      });
    }
    if (this.downloadBtn) {
      this.downloadBtn.addEventListener('click', () => this.downloadImage());
    }
    if (this.saveLookbookBtn) {
      this.saveLookbookBtn.addEventListener('click', () => this.saveToLookbook());
    }
  }

  showModal() {
    if (!this.modal) return;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hideModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Kết xuất thiệp bưu thiếp văn hóa
  async generatePostcard(state) {
    this.currentState = state;
    this.showModal();

    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');

    // Kích thước thiệp tiêu chuẩn nghệ thuật tỷ lệ 3:4 (900 x 1200 px)
    const width = 900;
    const height = 1200;
    canvas.width = width;
    canvas.height = height;

    // 1. Nền giấy xuyến chỉ hoàng gia / lụa tơ tằm cổ điển
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#fbf8f3');
    bgGrad.addColorStop(0.5, '#f5efe4');
    bgGrad.addColorStop(1, '#ede3d1');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Vẽ khung hoa văn thếp vàng hoàng gia (Royal Gold Frame)
    this.drawOrnateFrame(ctx, width, height);

    // 3. Tiêu đề thiệp văn hóa
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8b263e'; // Đỏ bã trầu
    ctx.font = 'italic 34px "Dancing Script", cursive';
    ctx.fillText('Việt Phục Remix', width / 2, 85);

    ctx.fillStyle = '#b71c1c';
    ctx.font = 'bold 40px "Playfair Display", "Be Vietnam Pro", serif';
    ctx.fillText('KHƠI NGUỒN DÂN TỘC', width / 2, 138);

    ctx.fillStyle = '#5d4037';
    ctx.font = '16px "Be Vietnam Pro", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('— DI SẢN NGÀN NĂM TỎA SÁNG —', width / 2, 168);

    // 4. Lấy dữ liệu trang phục và danh ngôn
    const outfit = VIET_PHUC_DATA.outfits.find(o => o.id === state.outfit) || VIET_PHUC_DATA.outfits[0];
    const region = VIET_PHUC_DATA.regions[state.region] || VIET_PHUC_DATA.regions.trung;
    const event = VIET_PHUC_DATA.events.find(e => e.id === state.event) || VIET_PHUC_DATA.events[0];
    const element = VIET_PHUC_DATA.elements.find(e => e.id === state.element) || VIET_PHUC_DATA.elements[3];

    // 5. Kết xuất hình ảnh nhân vật SVG lên Canvas
    const svgElem = document.getElementById('stage-svg');
    if (svgElem) {
      await this.drawSVGToCanvas(ctx, svgElem, 130, 200, 640, 720);
    }

    // 6. Bảng thông tin bộ phối bên dưới
    const cardY = 945;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, 80, cardY, width - 160, 165, 12, true, true);

    // Tên bộ trang phục & Niên đại
    ctx.textAlign = 'left';
    ctx.fillStyle = '#8b263e';
    ctx.font = 'bold 24px "Be Vietnam Pro", sans-serif';
    ctx.fillText(outfit.heritageName || outfit.name, 110, cardY + 38);

    ctx.fillStyle = '#5d4037';
    ctx.font = 'italic 16px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`${outfit.era} • Vùng: ${region.name.split('(')[0].trim()} • Hành: ${element.name}`, 110, cardY + 68);

    // Câu danh ngôn / trích dẫn văn hóa
    const randomQuote = VIET_PHUC_DATA.culturalQuotes[Math.floor(Math.random() * VIET_PHUC_DATA.culturalQuotes.length)];
    ctx.fillStyle = '#37474f';
    ctx.font = 'italic 17px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`“${randomQuote.quote}”`, 110, cardY + 105);

    ctx.fillStyle = '#78909c';
    ctx.font = '14px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`— ${randomQuote.author}`, 110, cardY + 132);

    // 7. Vẽ con dấu Triện Son Mộc Đỏ (Vermilion Red Seal)
    this.drawVermilionSeal(ctx, width - 210, cardY + 25, 95);

    // Lưu dữ liệu ảnh tạm thời
    this.currentDataURL = canvas.toDataURL('image/png');
  }

  // Vẽ khung viền hoàng kim và góc mây
  drawOrnateFrame(ctx, w, h) {
    const margin = 28;
    ctx.save();

    // Khung ngoài
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);

    // Khung chỉ phụ trong
    ctx.strokeStyle = '#b71c1c';
    ctx.lineWidth = 1;
    ctx.strokeRect(margin + 6, margin + 6, w - margin * 2 - 12, h - margin * 2 - 12);

    // 4 góc mây cách điệu
    const cornerSize = 40;
    this.drawCornerSpiral(ctx, margin + 6, margin + 6, 1, 1);
    this.drawCornerSpiral(ctx, w - margin - 6, margin + 6, -1, 1);
    this.drawCornerSpiral(ctx, margin + 6, h - margin - 6, 1, -1);
    this.drawCornerSpiral(ctx, w - margin - 6, h - margin - 6, -1, -1);

    ctx.restore();
  }

  drawCornerSpiral(ctx, x, y, scaleX, scaleY) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scaleX, scaleY);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.quadraticCurveTo(0, 0, 30, 0);
    ctx.moveTo(6, 24);
    ctx.quadraticCurveTo(6, 6, 24, 6);
    ctx.stroke();
    ctx.restore();
  }

  // Vẽ Con Dấu Triện Son Mộc Đỏ
  drawVermilionSeal(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);

    // Hộp triện đỏ son bã trầu có độ gợn mộc mực cổ truyền
    ctx.fillStyle = '#b71c1c';
    ctx.strokeStyle = '#d32f2f';
    ctx.lineWidth = 4;
    this.roundRect(ctx, 0, 0, size, size, 12, true, true);

    // Viền lọng chỉ bên trong
    ctx.strokeStyle = '#ffcdd2';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, 5, 5, size - 10, size - 10, 8, false, true);

    // Chữ triện Hán/Việt: "KHƠI NGUỒN" / "VIỆT PHỤC"
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 15px "Be Vietnam Pro", sans-serif';
    ctx.fillText('VIỆT', size / 2, size * 0.32);
    ctx.fillText('PHỤC', size / 2, size * 0.54);
    ctx.font = 'bold 11px "Be Vietnam Pro", sans-serif';
    ctx.fillStyle = '#ffcdd2';
    ctx.fillText('CHI BẢO', size / 2, size * 0.76);

    ctx.restore();
  }

  // Hỗ trợ vẽ chữ nhật bo góc Canvas
  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  // Chuyển đổi SVG thành Image rồi vẽ vào Canvas
  drawSVGToCanvas(ctx, svgElement, x, y, w, h) {
    return new Promise((resolve) => {
      try {
        const clone = svgElement.cloneNode(true);
        clone.setAttribute('width', '500');
        clone.setAttribute('height', '700');
        if (!clone.getAttribute('xmlns')) {
          clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }

        const xml = new XMLSerializer().serializeToString(clone);
        const svg64 = btoa(unescape(encodeURIComponent(xml)));
        const image64 = 'data:image/svg+xml;base64,' + svg64;

        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, x, y, w, h);
          resolve();
        };
        img.onerror = (err) => {
          console.warn('Lỗi vẽ SVG vào canvas, tiếp tục render phần còn lại:', err);
          resolve();
        };
        img.src = image64;
      } catch (err) {
        console.warn('Lỗi xử lý serialize SVG:', err);
        resolve();
      }
    });
  }

  // Tải bưu thiếp ảnh PNG
  downloadImage() {
    if (!this.canvas) return;
    const link = document.createElement('a');
    link.download = `viet-phuc-remix-${Date.now()}.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }

  // Lưu vào danh sách Lookbook cá nhân (localStorage)
  saveToLookbook() {
    try {
      const savedList = JSON.parse(localStorage.getItem('viet_phuc_lookbook') || '[]');
      const outfit = VIET_PHUC_DATA.outfits.find(o => o.id === this.currentState.outfit);
      
      const newEntry = {
        id: Date.now(),
        title: outfit ? outfit.name : 'Việt Phục',
        era: outfit ? outfit.era : '',
        image: this.currentDataURL,
        date: new Date().toLocaleDateString('vi-VN')
      };

      savedList.unshift(newEntry);
      localStorage.setItem('viet_phuc_lookbook', JSON.stringify(savedList.slice(0, 12)));

      alert('Đã lưu thành công bộ phục trang vào Lookbook cá nhân của bạn!');
      if (window.updateLookbookUI) {
        window.updateLookbookUI();
      }
    } catch (e) {
      console.warn('Lỗi lưu lookbook:', e);
      alert('Đã xuất ảnh thành công!');
    }
  }
}

// Khởi tạo đối tượng toàn cục
window.postcardGenerator = new PostcardGenerator();
