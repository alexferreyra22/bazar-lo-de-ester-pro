/**
 * Bazar Lo de Ester - Motor Central de Datos y Estado Compartido
 * Dirección: Gato y Mancha 1129, Corrientes, Argentina
 * WhatsApp: 379 4662177 (5493794662177)
 */

const STORAGE_KEYS = {
  PRODUCTS: 'bazar_ester_products_v1',
  RATES: 'bazar_ester_rates_v1',
  REPAIRS: 'bazar_ester_repairs_v1',
  ANSES: 'bazar_ester_anses_v1',
  BUSINESSES: 'bazar_ester_businesses_v1',
  FINANCES: 'bazar_ester_finances_v1',
  AUTH: 'bazar_ester_auth_token_v1',
  PIN_HASH: 'bazar_ester_admin_pin_hash_v1'
};

// PIN por defecto: "123456" hasheado en SHA-256 (nunca en texto plano)
const DEFAULT_PIN_SHA256 = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Cargador Rápido 20W USB-C PD',
    category: 'Tecnología',
    price: 12500,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    description: 'Carga ultrarrápida para iPhone, Samsung y Motorola con protección contra sobrecalentamiento y picos de tensión.'
  },
  {
    id: 'prod-2',
    name: 'Auriculares Bluetooth TWS Pro',
    category: 'Audio & Móvil',
    price: 18900,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    description: 'Autonomía de 24hs con estuche de carga rápida, indicador digital de batería y micrófono manos libres de alta fidelidad.'
  },
  {
    id: 'prod-3',
    name: 'Cable Blindado Reforzado Tipo C / Lightning',
    category: 'Tecnología',
    price: 4200,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'Malla textil de nylon balístico antienredos, conectores de aluminio reforzado y 1.5 metros de longitud.'
  },
  {
    id: 'prod-4',
    name: 'Termo Acero 1L Engomado Doble Pared',
    category: 'Bazar Matero',
    price: 28500,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    description: 'Mantiene el agua caliente o fría por 24hs reales. Tapón cebador de precisión antiderrame y pintura engomada antideslizante.'
  },
  {
    id: 'prod-5',
    name: 'Mate Camionero Cuero & Alpaca',
    category: 'Bazar Matero',
    price: 14900,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80',
    description: 'Calabaza gruesa de primera selección forrada en cuero vacuno con 4 patas reforzadas y virola de alpaca cincelada.'
  },
  {
    id: 'prod-6',
    name: 'Bombilla Pico de Loro Desarmable',
    category: 'Bazar Matero',
    price: 5400,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80',
    description: 'Acero quirúrgico inoxidable 304 pulido espejo, filtro a rosca desmontable e incluye cepillo limpiador de cerdas finas.'
  },
  {
    id: 'prod-7',
    name: 'Jarro Térmico Hermético para Café',
    category: 'Hogar',
    price: 8200,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    description: 'Capacidad 450ml con tapa hermética antiderrame con botón click-open para llevar en auto, colectivo o la oficina.'
  },
  {
    id: 'prod-8',
    name: 'Soporte Articulado Magnético para Auto',
    category: 'Tecnología',
    price: 6500,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    description: '4 potentes imanes de neodimio que no dañan el celular, rotación omnidireccional 360° para rejilla de aire o tablero.'
  }
];

const DEFAULT_RATES = {
  fotocopias: {
    byn_simple: 200,
    color_simple: 400,
    sticker: 800,
    foto_hd: 900,
    doble_faz_factor: 1.8 // factor para fotocopias doble faz
  },
  lavado: {
    plaza_1: 7500,
    plaza_2: 9800,
    king: 12500
  },
  publicidad_mensual: 5000
};

const DEFAULT_REPAIRS = [
  {
    code: 'REP-1042',
    client: 'Carlos Ramírez',
    phone: '3794112233',
    device: 'Motorola Moto G20',
    issue: 'Cambio de módulo display y pin de carga',
    status: 'listo', // 'recibido', 'diagnostico', 'reparacion', 'pruebas', 'listo', 'entregado'
    cost: 26000,
    date: '2026-10-24',
    notes: 'Equipo verificado y probado. Listo para retirar en Gato y Mancha 1129.'
  },
  {
    code: 'REP-1045',
    client: 'Marta Gómez',
    phone: '3794556677',
    device: 'Pava Eléctrica Philips 1.7L',
    issue: 'No calienta / Base sulfatada',
    status: 'reparacion',
    cost: 9500,
    date: '2026-10-25',
    notes: 'Se reemplazó termostato bimetálico. En fase de ajuste.'
  },
  {
    code: 'REP-1048',
    client: 'Jorge Almirón',
    phone: '3794889900',
    device: 'Samsung Galaxy A14',
    issue: 'Falla en botón de encendido y limpieza interna por sulfato',
    status: 'diagnostico',
    cost: 14000,
    date: '2026-10-26',
    notes: 'En banco de pruebas técnicas para diagnóstico de placa.'
  }
];

const DEFAULT_ANSES = {
  ayudaEscolarActive: true,
  ayudaEscolarPrice: 2000,
  tramites: [
    {
      id: 'anses-1',
      title: 'Turnos Oficiales ANSES',
      badge: 'Trámite Frecuente',
      description: 'Gestión inmediata de turnos para jubilaciones, asignaciones familiares, pensiones, créditos y atención presencial en UDAI Corrientes.',
      price: 2500,
      requisitos: 'DNI del titular y número de CUIL'
    },
    {
      id: 'anses-2',
      title: 'Partidas de Nacimiento & Registro Civil',
      badge: 'Documentación Oficial',
      description: 'Solicitud, gestión y entrega legalizada de actas de nacimiento, matrimonio y defunción del Registro Provincial de las Personas.',
      price: 3200,
      requisitos: 'Datos completos del titular, fecha y lugar de nacimiento o acta previa'
    },
    {
      id: 'anses-3',
      title: 'Formularios Asignación / Pensión',
      badge: 'Gestión Digital',
      description: 'Descarga, llenado digitalizado prolijo e impresión en alta definición de formularios oficiales (AUH, asignación por embarazo, apoderados).',
      price: 1800,
      requisitos: 'DNI titular y DNI de los menores a cargo'
    }
  ]
};

const DEFAULT_BUSINESSES = [
  {
    id: 'biz-1',
    name: 'Verdulería & Frutería Don José',
    category: 'Almacén & Frescos',
    description: 'Frutas y verduras de quinta frescas todos los días. Envíos en el barrio sin cargo.',
    benefit: '10% de descuento abonando en efectivo presentando el cupón de Bazar Lo de Ester',
    whatsapp: '3794123456',
    instagram: '@verduleriadonjose',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    active: true
  },
  {
    id: 'biz-2',
    name: 'Panadería & Confitería La Espiga',
    category: 'Panadería & Pastelería',
    description: 'Facturas calentitas a la mañana y a la tarde, chipá tradicional correntino y tortas artesanales.',
    benefit: '2 medialunas de regalo con la compra de 1 docena de facturas surtidas',
    whatsapp: '3794654321',
    instagram: '@laespigacorrientes',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    active: true
  },
  {
    id: 'biz-3',
    name: 'Barbería & Peluquería Urbana',
    category: 'Estética & Cuidado',
    description: 'Cortes clásicos, degradados modernos, perfilado de barba con toalla caliente y diseño de cejas.',
    benefit: '$1.000 de descuento en tu primer corte mencionando Bazar Lo de Ester',
    whatsapp: '3794998877',
    instagram: '@barberiaurbana.ctes',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    active: true
  },
  {
    id: 'biz-4',
    name: 'Veterinaria & Pet Shop Huellitas',
    category: 'Mascotas & Salud',
    description: 'Alimentos balanceados por bolsa o suelto, pipetas, accesorios, juguetes y atención clínica.',
    benefit: '15% de descuento en collares, correas y juguetes para mascotas',
    whatsapp: '3794332211',
    instagram: '@huellitascorrientes',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
    active: true
  }
];

const DEFAULT_FINANCES = {
  transactions: [
    { id: 'tx-1', type: 'ingreso', concept: 'Venta Bazar: Termo Acero + Mate Camionero', amount: 43400, date: '2026-10-26', category: 'Bazar' },
    { id: 'tx-2', type: 'ingreso', concept: 'Cobro Reparación #REP-1042 Motorola G20', amount: 26000, date: '2026-10-26', category: 'Taller' },
    { id: 'tx-3', type: 'ingreso', concept: 'Centro de Copiado: 85 copias color y B&N', amount: 22000, date: '2026-10-26', category: 'Fotocopias' },
    { id: 'tx-4', type: 'ingreso', concept: 'Abono Publicidad Comercios Amigos (Don José)', amount: 5000, date: '2026-10-25', category: 'Publicidad' },
    { id: 'tx-5', type: 'gasto', concept: 'Factura Servicio Luz DPEC (Local Comercial)', amount: 32000, date: '2026-10-25', category: 'Servicios' },
    { id: 'tx-6', type: 'gasto', concept: 'Compra Mayorista Resmas Papel A4 x 5 cajas', amount: 48000, date: '2026-10-24', category: 'Insumos' },
    { id: 'tx-7', type: 'gasto', concept: 'Repuestos Módulos Celulares Moto G20 y pines', amount: 14500, date: '2026-10-24', category: 'Taller' }
  ]
};

// Objeto de Almacenamiento Centralizado
const Store = {
  // Inicialización con datos por defecto
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RATES)) {
      localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(DEFAULT_RATES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REPAIRS)) {
      localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(DEFAULT_REPAIRS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ANSES)) {
      localStorage.setItem(STORAGE_KEYS.ANSES, JSON.stringify(DEFAULT_ANSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BUSINESSES)) {
      localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(DEFAULT_BUSINESSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FINANCES)) {
      localStorage.setItem(STORAGE_KEYS.FINANCES, JSON.stringify(DEFAULT_FINANCES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PIN_HASH)) {
      localStorage.setItem(STORAGE_KEYS.PIN_HASH, DEFAULT_PIN_SHA256);
    }
  },

  // Productos
  getProducts() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
  },
  saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },
  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: 'prod-' + Date.now(),
      ...product
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  },
  updateProduct(id, updatedFields) {
    const products = this.getProducts().map(p => p.id === id ? { ...p, ...updatedFields } : p);
    this.saveProducts(products);
  },
  deleteProduct(id) {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
  },

  // Tarifas
  getRates() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RATES) || JSON.stringify(DEFAULT_RATES));
  },
  saveRates(rates) {
    localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(rates));
  },

  // Taller de Reparaciones
  getRepairs() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REPAIRS) || '[]');
  },
  saveRepairs(repairs) {
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(repairs));
  },
  findRepair(code) {
    if (!code) return null;
    const cleanCode = code.trim().toUpperCase().replace('#', '');
    const repairs = this.getRepairs();
    return repairs.find(r => r.code.toUpperCase().replace('#', '') === cleanCode) || null;
  },
  addRepair(repair) {
    const repairs = this.getRepairs();
    const newRepair = {
      code: repair.code ? repair.code.toUpperCase() : 'REP-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      status: repair.status || 'recibido',
      ...repair
    };
    repairs.unshift(newRepair);
    this.saveRepairs(repairs);
    return newRepair;
  },
  updateRepair(code, fields) {
    const cleanCode = code.trim().toUpperCase().replace('#', '');
    const repairs = this.getRepairs().map(r => {
      if (r.code.toUpperCase().replace('#', '') === cleanCode) {
        return { ...r, ...fields };
      }
      return r;
    });
    this.saveRepairs(repairs);
  },
  deleteRepair(code) {
    const cleanCode = code.trim().toUpperCase().replace('#', '');
    const repairs = this.getRepairs().filter(r => r.code.toUpperCase().replace('#', '') !== cleanCode);
    this.saveRepairs(repairs);
  },

  // Trámites ANSES
  getAnses() {
    this.init();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANSES) || JSON.stringify(DEFAULT_ANSES));
    if (data.ayudaEscolarPrice === undefined) {
      data.ayudaEscolarPrice = 2000;
    }
    return data;
  },
  saveAnses(anses) {
    localStorage.setItem(STORAGE_KEYS.ANSES, JSON.stringify(anses));
  },
  toggleAyudaEscolar(isActive) {
    const anses = this.getAnses();
    anses.ayudaEscolarActive = isActive;
    this.saveAnses(anses);
  },
  updateAnsesPrices(prices) {
    const anses = this.getAnses();
    anses.tramites.forEach(t => {
      if (prices[t.id] !== undefined) {
        t.price = Number(prices[t.id]);
      }
    });
    if (prices.ayudaEscolarPrice !== undefined) {
      anses.ayudaEscolarPrice = Number(prices.ayudaEscolarPrice);
    }
    this.saveAnses(anses);
  },

  // Comercios Amigos
  getBusinesses() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BUSINESSES) || '[]');
  },
  saveBusinesses(businesses) {
    localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(businesses));
  },
  addBusiness(biz) {
    const businesses = this.getBusinesses();
    const newBiz = {
      id: 'biz-' + Date.now(),
      active: true,
      ...biz
    };
    businesses.unshift(newBiz);
    this.saveBusinesses(businesses);
    return newBiz;
  },
  deleteBusiness(id) {
    const businesses = this.getBusinesses().filter(b => b.id !== id);
    this.saveBusinesses(businesses);
  },

  // Finanzas & Caja
  getFinances() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FINANCES) || JSON.stringify(DEFAULT_FINANCES));
  },
  saveFinances(finances) {
    localStorage.setItem(STORAGE_KEYS.FINANCES, JSON.stringify(finances));
  },
  addTransaction(tx) {
    const finances = this.getFinances();
    const newTx = {
      id: 'tx-' + Date.now(),
      date: tx.date || new Date().toISOString().split('T')[0],
      amount: Number(tx.amount),
      ...tx
    };
    finances.transactions.unshift(newTx);
    this.saveFinances(finances);
    return newTx;
  },
  deleteTransaction(id) {
    const finances = this.getFinances();
    finances.transactions = finances.transactions.filter(t => t.id !== id);
    this.saveFinances(finances);
  },
  getFinanceSummary() {
    const finances = this.getFinances();
    let totalIngresos = 0;
    let totalGastos = 0;
    finances.transactions.forEach(t => {
      if (t.type === 'ingreso') {
        totalIngresos += Number(t.amount);
      } else {
        totalGastos += Number(t.amount);
      }
    });
    return {
      totalIngresos,
      totalGastos,
      gananciaNeta: totalIngresos - totalGastos,
      transaccionesCount: finances.transactions.length
    };
  },

  // Seguridad & Autenticación de Administrador
  async sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },
  async verifyPin(enteredPin) {
    this.init();
    const currentHash = localStorage.getItem(STORAGE_KEYS.PIN_HASH) || DEFAULT_PIN_SHA256;
    const enteredHash = await this.sha256(enteredPin);
    if (enteredHash === currentHash) {
      // Generar sesión por 4 horas
      const session = {
        authenticated: true,
        expiresAt: Date.now() + 4 * 60 * 60 * 1000
      };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(session));
      return true;
    }
    return false;
  },
  async changePin(oldPin, newPin) {
    const isValid = await this.verifyPin(oldPin);
    if (!isValid) return false;
    const newHash = await this.sha256(newPin);
    localStorage.setItem(STORAGE_KEYS.PIN_HASH, newHash);
    return true;
  },
  isAuthenticated() {
    try {
      const sessionRaw = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (!sessionRaw) return false;
      const session = JSON.parse(sessionRaw);
      if (session.authenticated && session.expiresAt > Date.now()) {
        return true;
      }
      this.logout();
      return false;
    } catch (e) {
      return false;
    }
  },
  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  // Carrito de compras en el cliente
  getCart() {
    try {
      return JSON.parse(localStorage.getItem('bazar_ester_cart_v1') || '[]');
    } catch (e) {
      return [];
    }
  },
  saveCart(cart) {
    localStorage.setItem('bazar_ester_cart_v1', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart_updated'));
  },
  addToCart(productId, qty = 1) {
    const products = this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        qty: qty
      });
    }
    this.saveCart(cart);
  },
  removeFromCart(productId) {
    const cart = this.getCart().filter(i => i.id !== productId);
    this.saveCart(cart);
  },
  clearCart() {
    this.saveCart([]);
  },
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }
};

// Inicializar inmediatamente
Store.init();

// Exportar globalmente
window.Store = Store;
