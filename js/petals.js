/**
 * VIỆT PHỤC REMIX - HIỆU ỨNG CÁNH SEN RƠI CANVAS 2D
 * Chuyển động vật lý tự nhiên: lơ lửng, uốn lượn theo gió, tương tác chuột nhẹ
 * Tối ưu hóa 60 FPS bằng requestAnimationFrame
 */

class LotusPetalSystem {
  constructor(canvasId = 'petals-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.maxPetals = 45;
    this.width = 0;
    this.height = 0;
    this.mouseX = -1000;
    this.mouseY = -1000;
    this.animId = null;

    // Bảng màu cánh sen hồng phấn thanh tao
    this.petalColors = [
      { start: 'rgba(255, 205, 210, 0.85)', end: 'rgba(244, 143, 177, 0.45)' },
      { start: 'rgba(252, 228, 236, 0.90)', end: 'rgba(240, 98, 146, 0.50)' },
      { start: 'rgba(248, 187, 208, 0.85)', end: 'rgba(233, 30, 99, 0.35)' },
      { start: 'rgba(255, 235, 238, 0.92)', end: 'rgba(244, 143, 177, 0.40)' }
    ];

    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    // Tạo các hạt cánh sen ban đầu
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.start();
  }

  handleResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
  }

  createPetal(randomY = false) {
    const size = 10 + Math.random() * 16;
    const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];

    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -20 - Math.random() * 50,
      size: size,
      aspectRatio: 1.6 + Math.random() * 0.8,
      speedY: 0.8 + Math.random() * 1.4,
      speedX: -0.3 + Math.random() * 0.6,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.025,
      oscillationSpeed: 0.015 + Math.random() * 0.02,
      oscillationDistance: 15 + Math.random() * 30,
      oscillationPhase: Math.random() * Math.PI * 2,
      flipSpeed: 0.02 + Math.random() * 0.03,
      flipPhase: Math.random() * Math.PI * 2,
      opacity: 0.5 + Math.random() * 0.45,
      color: color
    };
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.angle);

    // Hiệu ứng lật cánh 3D nhẹ (cos flip)
    const scaleY = Math.cos(p.flipPhase);
    this.ctx.scale(1, scaleY);

    const w = p.size;
    const h = p.size * p.aspectRatio;

    // Gradient màu cánh sen
    const grad = this.ctx.createRadialGradient(0, -h * 0.2, 1, 0, 0, h);
    grad.addColorStop(0, p.color.start);
    grad.addColorStop(1, p.color.end);

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();

    // Dáng cánh hoa sen nhọn đỉnh bầu đáy
    this.ctx.moveTo(0, -h * 0.8);
    this.ctx.bezierCurveTo(w * 0.7, -h * 0.4, w * 0.8, h * 0.3, 0, h * 0.6);
    this.ctx.bezierCurveTo(-w * 0.8, h * 0.3, -w * 0.7, -h * 0.4, 0, -h * 0.8);

    this.ctx.closePath();
    this.ctx.fill();

    // Gân cánh sen mờ ảo
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    this.ctx.lineWidth = 0.8;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -h * 0.7);
    this.ctx.lineTo(0, h * 0.4);
    this.ctx.stroke();

    this.ctx.restore();
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      // Dao động uốn lượn ngang theo sóng gió
      p.oscillationPhase += p.oscillationSpeed;
      const windX = Math.sin(p.oscillationPhase) * 0.8;

      p.y += p.speedY;
      p.x += p.speedX + windX;
      p.angle += p.angularSpeed;
      p.flipPhase += p.flipSpeed;

      // Đẩy nhẹ cánh sen khi chuột lướt gần (khoảng cách < 80px)
      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const dist = Math.hypot(dx, dy);
      if (dist < 80) {
        const force = (80 - dist) / 80;
        p.x += (dx / dist) * force * 3;
        p.y += (dy / dist) * force * 3;
        p.angle += 0.05;
      }

      this.drawPetal(p);

      // Tái tạo lại khi rơi khỏi màn hình
      if (p.y > this.height + 40 || p.x < -40 || p.x > this.width + 40) {
        this.petals[i] = this.createPetal(false);
      }
    }

    this.animId = requestAnimationFrame(() => this.update());
  }

  start() {
    if (!this.animId) {
      this.update();
    }
  }

  stop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }
}

// Tự động khởi chạy khi DOM tải xong
document.addEventListener('DOMContentLoaded', () => {
  window.petalSystem = new LotusPetalSystem('petals-canvas');
});
