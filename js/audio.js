/**
 * VIỆT PHỤC REMIX - HỆ THỐNG ÂM THANH NGŨ CUNG TỰ ĐỘNG (WEB AUDIO API)
 * Tổng hợp âm sắc Đàn Tranh, Sáo Trúc và Chuông Gió cổ truyền Việt Nam
 * Hoàn toàn chạy client-side, giai điệu ngũ cung (Hò, Xự, Xang, Xê, Cống), không vướng bản quyền.
 */

class NguCungAudioPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.masterGain = null;
    this.reverbNode = null;
    this.timerId = null;
    this.stepIndex = 0;

    // Thang âm Ngũ Cung truyền thống (Hò - Xự - Xang - Xê - Cống)
    // Tần số nốt (Hz): C4, D4, F4, G4, A4, C5, D5, F5, G5, A5
    this.pentatonicScale = [
      { name: 'Hò (C4)', freq: 261.63 },
      { name: 'Xự (D4)', freq: 293.66 },
      { name: 'Xang (F4)', freq: 349.23 },
      { name: 'Xê (G4)', freq: 392.00 },
      { name: 'Cống (A4)', freq: 440.00 },
      { name: 'Hò cao (C5)', freq: 523.25 },
      { name: 'Xự cao (D5)', freq: 587.33 },
      { name: 'Xang cao (F5)', freq: 698.46 },
      { name: 'Xê cao (G5)', freq: 783.99 },
      { name: 'Cống cao (A5)', freq: 880.00 }
    ];

    // Mô thức giai điệu nhã nhạc cổ truyền (Melodic motif steps)
    this.melodySequence = [
      0, 2, 3, 4, 5, 4, 3, 2, 
      1, 3, 4, 6, 5, 3, 2, 0,
      3, 5, 7, 6, 5, 4, 3, 2,
      4, 6, 8, 7, 5, 4, 2, 0
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Tạo Reverb không gian cung đình (Convolver với phản xạ ảo)
      this.setupReverb();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setupReverb() {
    try {
      const rate = this.ctx.sampleRate;
      const length = rate * 2.5; // Reverb đuôi 2.5s tạo độ vang trang nghiêm
      const decay = 2.0;
      const impulse = this.ctx.createBuffer(2, length, rate);
      const left = impulse.getChannelData(0);
      const right = impulse.getChannelData(1);

      for (let i = 0; i < length; i++) {
        const n = i / length;
        left[i] = (Math.random() * 2 - 1) * Math.pow(1 - n, decay);
        right[i] = (Math.random() * 2 - 1) * Math.pow(1 - n, decay);
      }

      this.reverbNode = this.ctx.createConvolver();
      this.reverbNode.buffer = impulse;

      const wetGain = this.ctx.createGain();
      wetGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

      this.reverbNode.connect(wetGain);
      wetGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Reverb setup error:', e);
    }
  }

  // Tiếng Đàn Tranh (Pluck zither string with vibrato/decay)
  playDanTranhNote(freq, time = null, duration = 1.8, velocity = 0.5) {
    if (!this.ctx || this.isMuted) return;
    const startTime = time || this.ctx.currentTime;

    // Dao động chính (Tone)
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Dạng sóng đàn tranh: Kết hợp Triangle và Sine với hòa âm nhẹ
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Kỹ thuật "rung ngón" (vibrato) đặc trưng của Đàn Tranh
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5.5, startTime); // 5.5 Hz rung nhẹ
    vibratoGain.gain.setValueAtTime(freq * 0.015, startTime); // Độ sâu rung
    vibrato.connect(osc.frequency);
    vibrato.start(startTime + 0.15); // Rung sau khi gảy
    vibrato.stop(startTime + duration);

    // Họa âm thứ cấp
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    // Bộ lọc Lowpass mô phỏng thùng đàn gỗ ngô đồng
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2500, startTime);
    filter.frequency.exponentialRampToValueAtTime(450, startTime + duration);

    // Biên độ Attack cực nhanh (tiếng gảy móng), Decay tự nhiên
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(velocity * 0.7, startTime + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(velocity * 0.25, startTime + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    if (this.reverbNode) {
      gainNode.connect(this.reverbNode);
    }

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  // Tiếng Sáo Trúc điểm xuyết (Mellow bamboo flute breath tone)
  playSaoTrucNote(freq, time = null, duration = 3.2) {
    if (!this.ctx || this.isMuted) return;
    const startTime = time || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Luyến nốt (glissando / bend)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.02, startTime + 0.3);
    osc.frequency.exponentialRampToValueAtTime(freq, startTime + 0.7);

    // Tiếng sáo vào êm dịu, giữ hơi và tan dần
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.4);
    gain.gain.setValueAtTime(0.18, startTime + duration * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    if (this.reverbNode) {
      gain.connect(this.reverbNode);
    }

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Tiếng Chuông Gió & Khánh Đồng ngân nga
  playBellNote(freq, time = null) {
    if (!this.ctx || this.isMuted) return;
    const startTime = time || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 3, startTime);

    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, startTime + 3.5);

    osc.connect(gain);
    if (this.reverbNode) {
      gain.connect(this.reverbNode);
    } else {
      gain.connect(this.masterGain);
    }

    osc.start(startTime);
    osc.stop(startTime + 3.5);
  }

  // Vòng lặp giai điệu ngũ cung tự động sinh liên tục
  tick() {
    if (!this.isPlaying) return;

    const noteIdx = this.melodySequence[this.stepIndex % this.melodySequence.length];
    const note = this.pentatonicScale[noteIdx] || this.pentatonicScale[0];

    // Gảy đàn tranh nốt chính
    this.playDanTranhNote(note.freq, this.ctx.currentTime, 2.0, 0.45);

    // Kỹ thuật gảy chùm âm (arpeggio / vuốt đàn) ngẫu nhiên tao nhã
    if (Math.random() > 0.6) {
      const graceIdx = (noteIdx + 2) % this.pentatonicScale.length;
      const graceNote = this.pentatonicScale[graceIdx];
      this.playDanTranhNote(graceNote.freq, this.ctx.currentTime + 0.18, 1.4, 0.28);
    }

    // Tiếng sáo điểm xuyết ở một số phách dài
    if (this.stepIndex % 8 === 0) {
      const fluteIdx = (noteIdx + 3) % this.pentatonicScale.length;
      this.playSaoTrucNote(this.pentatonicScale[fluteIdx].freq, this.ctx.currentTime + 0.2, 3.5);
    }

    // Tiếng khánh đồng ngân dài nhẹ nhàng
    if (this.stepIndex % 16 === 0) {
      this.playBellNote(this.pentatonicScale[0].freq, this.ctx.currentTime);
    }

    this.stepIndex++;

    // Nhịp điệu thong dong, thanh bình (khoảng 850ms - 1100ms mỗi nốt)
    const tempoDelay = 800 + Math.random() * 300;
    this.timerId = setTimeout(() => this.tick(), tempoDelay);
  }

  start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.tick();
    this.updateUI();
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.updateUI();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : 0.35,
        this.ctx.currentTime
      );
    }
    this.updateUI();
  }

  updateUI() {
    const btn = document.getElementById('music-toggle-btn');
    const wave = document.getElementById('music-wave');
    const label = document.getElementById('music-label');

    if (!btn) return;

    if (this.isPlaying && !this.isMuted) {
      btn.classList.add('playing');
      btn.setAttribute('aria-label', 'Tắt nhạc nền ngũ cung');
      if (wave) wave.classList.add('active');
      if (label) label.textContent = 'Nhạc Cổ Truyền: Đang Bật';
    } else {
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Bật nhạc nền ngũ cung');
      if (wave) wave.classList.remove('active');
      if (label) label.textContent = 'Nhạc Cổ Truyền: Tắt';
    }
  }
}

// Khởi tạo đối tượng toàn cục
window.audioPlayer = new NguCungAudioPlayer();
