const seedVehicles = [
  { id: 1, name: 'Jeep Compass', year: 2024, type: 'SUV', category: 'Esportivo', km: 18400, price: 169900, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80', tag: 'DESTAQUE' },
  { id: 2, name: 'Toyota Corolla', year: 2023, type: 'Sedan', category: 'Esportivo', km: 27600, price: 142500, image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=900&q=80', tag: 'BAIXA KM' },
  { id: 3, name: 'Honda HR-V', year: 2024, type: 'SUV', category: 'Esportivo', km: 9200, price: 188900, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80', tag: 'NOVO ESTOQUE' },
  { id: 4, name: 'Volkswagen T-Cross', year: 2022, type: 'SUV', category: 'Esportivo', km: 43100, price: 119900, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80', tag: 'OPORTUNIDADE' },
  { id: 5, name: 'Fiat Toro Volcano', year: 2023, type: 'Pickup', category: 'Esportivo', km: 31500, price: 159900, image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=80', tag: 'DESTAQUE' },
  { id: 6, name: 'Hyundai HB20', year: 2021, type: 'Hatch', category: 'Esportivo', km: 52800, price: 78900, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80', tag: 'ENTRADA' },
  { id: 7, name: 'Nissan 350Z Midnight', year: 2008, type: 'Coupe', category: 'Classico tunado', km: 68400, price: 189900, image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=80', tag: 'JDM ICON' },
  { id: 8, name: 'Ford Mustang Fastback', year: 1968, type: 'Classico', category: 'Classico tunado', km: 42100, price: 329900, image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=900&q=80', tag: 'RESTOMOD' },
  { id: 9, name: 'BMW E30 M-Tech', year: 1990, type: 'Sedan', category: 'Classico tunado', km: 119800, price: 219900, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80', tag: 'GARAGE FIND' },
  { id: 10, name: 'Porsche 911 Carrera', year: 2017, type: 'Coupe', category: 'Esportivo', km: 24800, price: 579900, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80', tag: 'SIGNATURE' },
  { id: 11, name: 'Toyota Supra MK4', year: 1998, type: 'Coupe', category: 'Classico tunado', km: 90700, price: 489900, image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=900&q=80', tag: 'NFS LEGEND' },
  { id: 12, name: 'Chevrolet Opala SS', year: 1978, type: 'Coupe', category: 'Classico tunado', km: 75200, price: 149900, image: 'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&fit=crop&w=900&q=80', tag: 'BRASILIAN ICON' }
];
let vehicles = JSON.parse(localStorage.getItem('lionking-vehicles')) || seedVehicles;
let favorites = JSON.parse(localStorage.getItem('lionking-favorites')) || [];
let users = JSON.parse(localStorage.getItem('lionking-users')) || [{ name: 'Marcos Costa', email: 'admin@lionking.com', password: 'lionking' }];
let currentUser = JSON.parse(sessionStorage.getItem('lionking-session') || localStorage.getItem('lionking-session') || 'null');
let activeTab = 'home';
const $ = (selector) => document.querySelector(selector);
const money = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function renderVehicles() {
  const search = $('#searchInput').value.toLowerCase().trim();
  const category = $('#categoryFilter').value;
  const type = $('#typeFilter').value;
  const maxPrice = $('#priceFilter').value;
  let visible = vehicles.filter(vehicle => vehicle.name.toLowerCase().includes(search) && (category === 'all' || vehicle.category === category || (!vehicle.category && category === 'Esportivo')) && (type === 'all' || vehicle.type === type) && (maxPrice === 'all' || vehicle.price <= Number(maxPrice) * 1000));
  if (activeTab === 'favoritos') visible = visible.filter(vehicle => favorites.includes(vehicle.id));
  $('#vehicleTotal').textContent = String(visible.length).padStart(2, '0');
  $('#vehicleGrid').innerHTML = visible.map(vehicle => `
    <article class="vehicle-card">
      <div class="vehicle-image" style="background-image:url('${vehicle.image}')">
        <span class="vehicle-tag">${vehicle.tag || 'DISPONÍVEL'}</span>
        <button class="favorite ${favorites.includes(vehicle.id) ? 'selected' : ''}" data-favorite="${vehicle.id}" title="Favoritar" aria-label="Favoritar ${vehicle.name}">${favorites.includes(vehicle.id) ? '♥' : '♡'}</button>
      </div>
      <div class="vehicle-details"><h3>${vehicle.name}</h3><div class="vehicle-meta">${vehicle.year} &nbsp;·&nbsp; ${vehicle.type} &nbsp;·&nbsp; ${vehicle.km.toLocaleString('pt-BR')} km</div><div class="vehicle-footer"><div class="vehicle-price"><small>POR APENAS</small>${money(vehicle.price)}</div><button class="details-button" data-details="${vehicle.id}">Ver detalhes ↗</button></div></div>
    </article>`).join('');
  $('#emptyState').classList.toggle('hidden', visible.length > 0);
  $('#favoriteCount').textContent = favorites.length;
}

function switchTab(tab) {
  activeTab = tab;
  const catalogElements = ['#catalogo', '#catalogControls', '#catalogSectionTitle', '#vehicleGrid', '#emptyState'];
  catalogElements.forEach(selector => $(selector).classList.toggle('hidden', tab === 'gestao' || tab === 'home'));
  $('#home').classList.toggle('hidden', tab !== 'home');
  $('#gestao').classList.toggle('hidden', tab !== 'gestao');
  $('#catalogTitle').textContent = tab === 'favoritos' ? 'Seus veículos favoritos.' : 'Escolhas que falam por si.';
  document.querySelectorAll('[data-tab]').forEach(link => link.classList.toggle('active', link.dataset.tab === tab));
  $('.breadcrumb b').textContent = tab === 'gestao' ? 'GESTÃO DE VEÍCULOS' : tab.toUpperCase();
  if (tab !== 'gestao' && tab !== 'home') renderVehicles();
  $('.sidebar').classList.remove('open');
}

function openModal(id) { $(id).classList.remove('hidden'); }
function closeModal(id) { $(id).classList.add('hidden'); }
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2700); }
function updateAuthUI() {
  const isLoggedIn = Boolean(currentUser);
  const initials = isLoggedIn ? currentUser.name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase() : 'LK';
  $('#userName').textContent = isLoggedIn ? currentUser.name : 'Visitante';
  $('#userRole').textContent = isLoggedIn ? 'Conta conectada' : 'Não conectado';
  $('#userAvatar').textContent = initials;
  $('#topAvatar').textContent = initials;
  $('#topUserName').textContent = isLoggedIn ? currentUser.name : 'Entrar';
  $('#logoutButton').title = isLoggedIn ? 'Sair' : 'Entrar';
}

$('#vehicleGrid').addEventListener('click', (event) => {
  const favoriteButton = event.target.closest('[data-favorite]');
  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favorite);
    favorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    localStorage.setItem('lionking-favorites', JSON.stringify(favorites)); renderVehicles(); return;
  }
  const detailsButton = event.target.closest('[data-details]');
  if (detailsButton) showVehicleDetails(Number(detailsButton.dataset.details));
});
['searchInput', 'categoryFilter', 'typeFilter', 'priceFilter'].forEach(id => $(`#${id}`).addEventListener('input', renderVehicles));
$('#clearFilters').addEventListener('click', () => { $('#searchInput').value = ''; $('#typeFilter').value = 'all'; $('#priceFilter').value = 'all'; renderVehicles(); });
$('#sortButton').addEventListener('click', () => { vehicles.reverse(); renderVehicles(); showToast('Ordenação atualizada.'); });
document.querySelectorAll('[data-tab]').forEach(link => link.addEventListener('click', (event) => { event.preventDefault(); switchTab(link.dataset.tab); }));
$('#exploreButton').addEventListener('click', () => switchTab('catalogo'));
$('#addVehicleButton').addEventListener('click', () => openModal('#vehicleModal'));
$('#vehicleForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const vehicle = { id: Date.now(), name: $('#vehicleName').value, year: Number($('#vehicleYear').value), type: $('#vehicleType').value, km: Number($('#vehicleKm').value), price: Number($('#vehiclePrice').value), image: $('#vehicleImage').value || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80', tag: 'NOVO ESTOQUE' };
  vehicles = [vehicle, ...vehicles]; localStorage.setItem('lionking-vehicles', JSON.stringify(vehicles)); event.target.reset(); closeModal('#vehicleModal'); renderVehicles(); showToast('Veículo adicionado ao estoque.');
});
$('#profileButton').addEventListener('click', () => openModal('#loginModal'));
function showVehicleDetails(id) {
  const vehicle = vehicles.find(item => item.id === id);
  if (!vehicle) return;
  $('#detailsImage').style.backgroundImage = `url('${vehicle.image}')`;
  $('#detailsCategory').textContent = vehicle.category === 'Classico tunado' ? 'CLÁSSICO TUNADO' : 'ESPORTIVO';
  $('#detailsName').textContent = vehicle.name;
  $('#detailsDescription').textContent = vehicle.category === 'Classico tunado' ? 'Uma peça de garagem com presença, personalidade e preparação especial.' : 'Performance, tecnologia e acabamento selecionados pela curadoria Lion King.';
  $('#detailsYear').textContent = vehicle.year;
  $('#detailsKm').textContent = `${vehicle.km.toLocaleString('pt-BR')} km`;
  $('#detailsType').textContent = vehicle.type;
  $('#detailsPrice').textContent = money(vehicle.price);
  $('#detailsContact').dataset.vehicle = vehicle.name;
  openModal('#detailsModal');
}
$('#loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = $('#loginEmail').value.trim().toLowerCase();
  const user = users.find(item => item.email === email && item.password === $('#loginPassword').value);
  if (!user) { showToast('E-mail ou senha inválidos.'); return; }
  currentUser = { name: user.name, email: user.email };
  sessionStorage.setItem('lionking-session', JSON.stringify(currentUser));
  if ($('#keepConnected').checked) localStorage.setItem('lionking-session', JSON.stringify(currentUser));
  updateAuthUI();
  closeModal('#loginModal'); showToast(`Acesso autorizado. Bem-vindo, ${user.name.split(' ')[0]}.`);
});
$('#registerForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = $('#registerEmail').value.trim().toLowerCase();
  if (users.some(user => user.email === email)) { showToast('Este e-mail já está cadastrado.'); return; }
  const user = { name: $('#registerName').value.trim(), email, password: $('#registerPassword').value };
  users.push(user); localStorage.setItem('lionking-users', JSON.stringify(users));
  $('#loginEmail').value = email; $('#loginPassword').value = ''; closeModal('#registerModal'); openModal('#loginModal'); showToast('Conta criada. Entre para continuar.'); event.target.reset();
});
$('#showRegister').addEventListener('click', () => { closeModal('#loginModal'); openModal('#registerModal'); });
$('#showLogin').addEventListener('click', () => { closeModal('#registerModal'); openModal('#loginModal'); });
$('#detailsContact').addEventListener('click', () => { closeModal('#detailsModal'); showToast(`Interesse registrado em ${$('#detailsContact').dataset.vehicle}.`); });
$('#logoutButton').addEventListener('click', () => {
  if (!currentUser) { openModal('#loginModal'); return; }
  currentUser = null; sessionStorage.removeItem('lionking-session'); localStorage.removeItem('lionking-session'); updateAuthUI(); showToast('Você saiu da sua conta.');
});
$('#mobileMenu').addEventListener('click', () => $('.sidebar').classList.toggle('open'));
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => closeModal(`#${button.dataset.close}`)));
document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeModal(`#${backdrop.id}`); }));
updateAuthUI();
switchTab('home');
