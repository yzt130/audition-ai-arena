/**
 * VIỆT PHỤC REMIX - BỘ NHẬN DIỆN VĂN HÓA & CẢNH BÁO TƯ PHONG
 * Cung cấp thẻ tri thức văn hóa (Heritage Info Card) cho từng món đồ
 * và hệ thống phản hồi nhã nhặn (Cultural Gentle Reminder) khi phối trang phục.
 */

class CulturalAdvisoryEngine {
  constructor() {
    this.infoCardContainer = document.getElementById('heritage-info-card');
    this.reminderContainer = document.getElementById('cultural-gentle-reminder');
  }

  // Cập nhật thẻ tri thức văn hóa khi người dùng chọn trang phục/phụ kiện
  updateInfoCard(itemType, itemId) {
    if (!this.infoCardContainer) return;

    let itemData = null;
    let categoryName = '';

    if (itemType === 'outfit') {
      itemData = VIET_PHUC_DATA.outfits.find(o => o.id === itemId);
      categoryName = 'Thân Phục Chính';
    } else if (itemType === 'headwear') {
      itemData = VIET_PHUC_DATA.headwears.find(h => h.id === itemId);
      categoryName = 'Mũ / Khăn Đội Đầu';
    } else if (itemType === 'accessory') {
      itemData = VIET_PHUC_DATA.accessories.find(a => a.id === itemId);
      categoryName = 'Phụ Kiện Cầm Tay';
    } else if (itemType === 'element') {
      itemData = VIET_PHUC_DATA.elements.find(e => e.id === itemId);
      categoryName = 'Ngũ Hành Nhuộm Sắc';
    }

    if (!itemData) return;

    // Render thẻ tri thức sang trọng với hoa văn di sản
    this.infoCardContainer.innerHTML = `
      <div class="heritage-badge">${categoryName}</div>
      <div class="heritage-header">
        <h4 class="heritage-title">${itemData.heritageName || itemData.name}</h4>
        ${itemData.era ? `<span class="heritage-era">⏳ ${itemData.era}</span>` : ''}
      </div>
      <p class="heritage-desc">${itemData.desc || itemData.meaning || ''}</p>
      ${itemData.patterns ? `
        <div class="heritage-patterns">
          <div class="pattern-label"><strong>✨ Họa tiết & Biểu tượng:</strong></div>
          <div class="pattern-content">${itemData.patterns}</div>
        </div>
      ` : ''}
      ${itemData.symbol ? `
        <div class="element-symbol-tag"><strong>Sắc diện:</strong> ${itemData.symbol}</div>
      ` : ''}
    `;

    // Hiệu ứng xuất hiện mượt mà
    this.infoCardContainer.classList.remove('fade-in');
    void this.infoCardContainer.offsetWidth; // trigger reflow
    this.infoCardContainer.classList.add('fade-in');
  }

  // Đánh giá sự kết hợp trang phục và bối cảnh (Advisory Rules)
  evaluateCombination(state) {
    if (!this.reminderContainer) return;

    // Duyệt qua các luật tư vấn văn hóa
    let matchedRule = null;
    for (const rule of VIET_PHUC_DATA.advisoryRules) {
      if (rule.condition(state)) {
        matchedRule = rule;
        break; // Lấy luật ưu tiên đầu tiên
      }
    }

    if (matchedRule) {
      const isWarning = matchedRule.type === 'warning';
      const icon = isWarning ? '💡' : '🌸';
      const badgeClass = isWarning ? 'badge-warning' : 'badge-praise';
      const badgeText = isWarning ? 'Gợi Ý Nhã Nhặn' : 'Khí Chất Cổ Truyền';

      this.reminderContainer.className = `cultural-reminder-box active ${matchedRule.type}`;
      this.reminderContainer.innerHTML = `
        <div class="reminder-icon">${icon}</div>
        <div class="reminder-content">
          <div class="reminder-badge ${badgeClass}">${badgeText}</div>
          <div class="reminder-text">${matchedRule.message}</div>
        </div>
      `;
    } else {
      // Khi phối đồ hài hòa thông thường
      const currentOutfit = VIET_PHUC_DATA.outfits.find(o => o.id === state.outfit);
      const currentEvent = VIET_PHUC_DATA.events.find(e => e.id === state.event);

      this.reminderContainer.className = 'cultural-reminder-box active neutral';
      this.reminderContainer.innerHTML = `
        <div class="reminder-icon">✨</div>
        <div class="reminder-content">
          <div class="reminder-badge badge-neutral">Phối Đồ Hài Hòa</div>
          <div class="reminder-text">
            Tà ${currentOutfit ? currentOutfit.name : 'Việt phục'} tôn nghiêm, hòa cùng không khí "${currentEvent ? currentEvent.name : 'lễ hội'}", vừa lưu giữ nét xưa lại vừa rạng ngời cốt cách hôm nay.
          </div>
        </div>
      `;
    }
  }
}

// Khởi tạo đối tượng toàn cục
window.advisoryEngine = new CulturalAdvisoryEngine();
