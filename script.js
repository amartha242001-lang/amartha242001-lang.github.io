// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== AOS (Animate On Scroll) =====
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navItems.forEach(a => a.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ===== LANGUAGE BAR ANIMATION =====
function animateLangBars() {
  const bars = document.querySelectorAll('.lang-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.style.width;
        target.style.width = '0';
        setTimeout(() => { target.style.width = width; }, 100);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  animateLangBars();
  updateActiveNav();
});

// ===== CERTIFICATE MODAL =====
const certData = {
  'cert-accurate': {
    title: 'Pelatihan Accurate Online Dasar',
    issuer: 'Smartcounting Academy Training Center & Research',
    color: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    icon: 'fas fa-chart-bar',
    date: '19 Januari 2025',
    period: '13–15 Januari 2025',
    number: '00580/ACD-SA/I/2025',
    grade: null,
    verifyUrl: 'https://lp.smartcounting.id/certificate/SAA-25I5XQBY',
    topics: [
      'Pembuatan Database dan Set Up Awal Database',
      'Modul Transaksi Pembelian (Purchase Module)',
      'Modul Transaksi Penjualan (Sales Module)',
      'Modul Transaksi Persediaan (Inventory Module)',
      'Modul Transaksi Aset Tetap (Fixed Asset Module)',
      'Modul Transaksi Kas Bank (Cash Bank Module)',
      'Modul Transaksi Jurnal Umum (General Ledger Module)',
      'Penyajian Laporan Keuangan',
    ]
  },
  'cert-zahir': {
    title: 'Zahir Accounting 6',
    issuer: 'PT Zahir Internasional — UIN Sunan Kalijaga Yogyakarta',
    color: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    icon: 'fas fa-chart-line',
    date: '23 Agustus 2023',
    period: null,
    number: '17611/ZHR-WRK/VIII/2023',
    grade: 'Cukup Baik',
    verifyUrl: null,
    topics: [
      'Data Master & Saldo Awal',
      'Kasus Transaksi Perusahaan Dagang & Jasa',
      'Analisa & Laporan Keuangan',
    ]
  },
  'cert-magang': {
    title: 'Praktikum Profesi Magang',
    issuer: 'Kantor Kementerian Agama Kota Yogyakarta',
    color: 'linear-gradient(135deg, #dc2626, #ef4444)',
    icon: 'fas fa-briefcase',
    date: '22 Februari 2023',
    period: '02 Januari 2023 – 10 Februari 2023',
    number: '1059/Kk.12.05/HM.01/02/2023',
    grade: 'Baik',
    verifyUrl: null,
    topics: [
      'Penyusunan Rencana Anggaran Biaya (RAB)',
      'Pembuatan Laporan Pertanggungjawaban (LPJ)',
      'Pencatatan & Pengelolaan Data Keuangan',
      'Penyiapan Data Keuangan untuk Pelaporan',
      'Pengelolaan Administrasi via SIMBI',
    ]
  }
};

function openModal(id) {
  const data = certData[id];
  if (!data) return;

  const topicsHtml = data.topics.map(t =>
    `<div class="modal-topic-item"><i class="fas fa-check-circle"></i>${t}</div>`
  ).join('');

  const gradeHtml = data.grade
    ? `<div class="modal-detail-item"><span class="label">Nilai</span><span class="value" style="color:#10b981">${data.grade}</span></div>`
    : '';

  const periodHtml = data.period
    ? `<div class="modal-detail-item"><span class="label">Periode</span><span class="value">${data.period}</span></div>`
    : '';

  const verifyHtml = data.verifyUrl
    ? `<a href="${data.verifyUrl}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Verifikasi Sertifikat</a>`
    : '';

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-cert-header">
      <div class="modal-cert-icon" style="background:${data.color}">
        <i class="${data.icon}"></i>
      </div>
      <div>
        <h3>${data.title}</h3>
        <p>${data.issuer}</p>
      </div>
    </div>
    <div class="modal-cert-details">
      <div class="modal-detail-item">
        <span class="label">Tanggal Terbit</span>
        <span class="value">${data.date}</span>
      </div>
      <div class="modal-detail-item">
        <span class="label">Nomor Sertifikat</span>
        <span class="value" style="font-size:.8rem">${data.number}</span>
      </div>
      ${periodHtml}
      ${gradeHtml}
    </div>
    <div class="modal-cert-topics">
      <h4><i class="fas fa-list-check" style="color:var(--primary);margin-right:.4rem"></i>Materi / Kegiatan</h4>
      <div class="modal-topic-list">${topicsHtml}</div>
    </div>
    <div class="modal-cert-actions">
      ${verifyHtml}
      <button class="btn btn-outline" style="color:var(--text);border-color:var(--border)" onclick="closeModal()">
        <i class="fas fa-times"></i> Tutup
      </button>
    </div>
  `;

  document.getElementById('certModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('certModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
