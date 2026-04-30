/**
 * SITTA Front-End Logic
 * Menangani semua interaksi DOM, validasi, dan manipulasi data.
 */

// ==========================================
// 1. UTILITIES (Alert & Modals)
// ==========================================

function showCustomAlert(message, type = 'danger') {
  const alertBox = document.getElementById('customAlert');
  const alertIcon = document.getElementById('alertIcon');
  const alertMessage = document.getElementById('alertMessage');
  
  if(!alertBox) return;

  alertMessage.innerText = message;
  
  if (type === 'success') {
    alertBox.classList.add('success');
    alertIcon.innerText = '✅';
  } else {
    alertBox.classList.remove('success');
    alertIcon.innerText = '⚠️';
  }

  alertBox.classList.add('show');

  // Hide after 3.5 seconds
  setTimeout(() => {
    alertBox.classList.remove('show');
  }, 3500);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if(modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if(modal) modal.classList.remove('active');
}

// Menutup modal jika klik di luar area konten
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

function showDevAlert(e) {
  e.preventDefault();
  showCustomAlert('Fitur ini masih dalam tahap pengembangan.', 'warning');
}

// Sidebar Toggle untuk layar kecil
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });
}

// ==========================================
// 2. AUTHENTICATION (Login, Register)
// ==========================================

function handleLogin(e) {
  e.preventDefault();
  
  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;
  
  // Mencari data pengguna pada data.js (array dataPengguna)
  // Memastikan array dataPengguna tersedia
  if (typeof dataPengguna !== 'undefined') {
    const user = dataPengguna.find(u => u.email === emailInput && u.password === passwordInput);
    
    if (user) {
      showCustomAlert('Login Berhasil! Mengalihkan...', 'success');
      
      // Simpan session sementara menggunakan sessionStorage
      sessionStorage.setItem('sitta_user', JSON.stringify(user));
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      showCustomAlert('Email / password yang anda masukkan salah.', 'danger');
    }
  } else {
    showCustomAlert('Terjadi kesalahan pada sistem data.', 'danger');
  }
}

function handleForgotPassword(e) {
  e.preventDefault();
  showCustomAlert('Link reset password telah dikirim ke email Anda!', 'success');
  closeModal('forgotModal');
  e.target.reset();
}

function handleRegister(e) {
  e.preventDefault();
  showCustomAlert('Pendaftaran berhasil! Silakan login.', 'success');
  closeModal('registerModal');
  e.target.reset();
}

function handleLogout() {
  sessionStorage.removeItem('sitta_user');
  window.location.href = 'login.html';
}

function checkAuth() {
  // Hanya mengecek di halaman selain login/index
  const isLoginPage = window.location.pathname.includes('login.html') || window.location.pathname.endsWith('/');
  if (!isLoginPage) {
    const user = sessionStorage.getItem('sitta_user');
    if (!user) {
      window.location.href = 'login.html';
    }
  }
}

// ==========================================
// 3. DASHBOARD FEATURES
// ==========================================

function updateGreeting() {
  const greetingEl = document.getElementById('greetingMessage');
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let greetingText = 'Selamat Pagi';

  if (hour >= 10 && hour < 15) {
    greetingText = 'Selamat Siang';
  } else if (hour >= 15 && hour < 18) {
    greetingText = 'Selamat Sore';
  } else if (hour >= 18 || hour < 4) {
    greetingText = 'Selamat Malam';
  }

  // Ambil nama user
  const userObj = sessionStorage.getItem('sitta_user');
  if (userObj) {
    const user = JSON.parse(userObj);
    greetingText += `, ${user.nama.split(' ')[0]}!`; // Ambil nama panggilan
  }

  greetingEl.innerText = greetingText;
}

function displayUserInfo() {
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userAvatar = document.getElementById('userAvatar');
  
  if (!userNameDisplay || !userAvatar) return;

  const userObj = sessionStorage.getItem('sitta_user');
  if (userObj) {
    const user = JSON.parse(userObj);
    userNameDisplay.innerText = user.nama;
    userAvatar.innerText = user.nama.charAt(0).toUpperCase();
  }
}

// ==========================================
// 4. TRACKING PENGIRIMAN
// ==========================================

function handleTrackingSearch(e) {
  e.preventDefault();
  const doNumber = document.getElementById('doNumber').value.trim();
  
  if (typeof dataTracking === 'undefined') return;

  const resultContainer = document.getElementById('trackingResult');
  const emptyState = document.getElementById('emptyState');
  
  const result = dataTracking[doNumber];

  if (result) {
    // Hide empty state and show results
    emptyState.classList.add('d-none');
    resultContainer.classList.remove('d-none');
    
    // Update basic info
    document.getElementById('trackName').innerText = result.nama;
    document.getElementById('trackDO').innerText = `DO: ${result.nomorDO}`;
    
    // Status Badge
    const badge = document.getElementById('trackStatusBadge');
    badge.innerText = result.status;
    if(result.status.toLowerCase() === 'selesai' || result.status.toLowerCase() === 'dikirim') {
      badge.classList.add('success');
    } else {
      badge.classList.remove('success');
    }

    document.getElementById('trackEkspedisi').innerText = result.ekspedisi;
    document.getElementById('trackDate').innerText = result.tanggalKirim;
    document.getElementById('trackTotal').innerText = result.total;

    // Build timeline
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = ''; // Clear previous

    if (result.perjalanan && result.perjalanan.length > 0) {
      // Reverse array to show newest at top visually, or keep sequential
      // Let's display sequential (top to bottom = oldest to newest)
      result.perjalanan.forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
          <div class="timeline-date">${item.waktu}</div>
          <div class="timeline-content">${item.keterangan}</div>
        `;
        timelineContainer.appendChild(div);
      });
    } else {
      timelineContainer.innerHTML = '<p class="text-muted">Detail perjalanan belum tersedia.</p>';
    }

  } else {
    // Not found
    showCustomAlert(`Nomor DO ${doNumber} tidak ditemukan!`, 'danger');
    resultContainer.classList.add('d-none');
    emptyState.classList.remove('d-none');
    emptyState.querySelector('h3').innerText = "Data Tidak Ditemukan";
    emptyState.querySelector('p').innerText = "Mohon periksa kembali Nomor Delivery Order Anda.";
  }
}

// ==========================================
// 5. STOK BAHAN AJAR
// ==========================================

function renderStokTable() {
  const tbody = document.getElementById('stokTableBody');
  if (!tbody || typeof dataBahanAjar === 'undefined') return;

  tbody.innerHTML = '';

  dataBahanAjar.forEach(item => {
    appendRowToTable(tbody, item);
  });
}

function appendRowToTable(tbody, item) {
  const tr = document.createElement('tr');
  
  // Default image if missing
  const coverSrc = item.cover ? item.cover : 'asset/img/placeholder.png';
  
  tr.innerHTML = `
    <td>
      <img src="${coverSrc}" alt="Cover ${item.namaBarang}" class="cover-img" onerror="this.src='https://via.placeholder.com/60x80?text=No+Cover'">
    </td>
    <td><span class="status-badge">${item.kodeLokasi}</span></td>
    <td style="font-weight: 500;">${item.kodeBarang}</td>
    <td>${item.namaBarang}</td>
    <td>${item.jenisBarang}</td>
    <td>${item.edisi}</td>
    <td><strong>${item.stok}</strong></td>
  `;
  tbody.appendChild(tr);
}

function handleAddStok(e) {
  e.preventDefault();
  
  const lokasi = document.getElementById('inputKodeLokasi').value;
  const kode = document.getElementById('inputKodeBarang').value;
  const nama = document.getElementById('inputNamaBarang').value;
  const jenis = document.getElementById('inputJenis').value;
  const edisi = document.getElementById('inputEdisi').value;
  const stok = document.getElementById('inputStok').value;

  const newItem = {
    kodeLokasi: lokasi,
    kodeBarang: kode,
    namaBarang: nama,
    jenisBarang: jenis,
    edisi: edisi,
    stok: parseInt(stok),
    cover: '' // Placeholder akan ditangani di render
  };

  // Tambahkan ke array di data.js agar tersimpan sementara di memori
  if (typeof dataBahanAjar !== 'undefined') {
    dataBahanAjar.push(newItem);
  }

  // Tambahkan langsung ke DOM Tabel tanpa reload
  const tbody = document.getElementById('stokTableBody');
  if(tbody) {
    appendRowToTable(tbody, newItem);
  }

  showCustomAlert('Data stok berhasil ditambahkan!', 'success');
  closeModal('addStokModal');
  e.target.reset();
}
