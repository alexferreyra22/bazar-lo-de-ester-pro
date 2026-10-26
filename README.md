# 🏪 Bazar Lo de Ester - Polirrubro & Multiservicios

Sistema web interactivo y panel administrativo integral para **Bazar Lo de Ester**.

* **Dirección:** Gato y Mancha 1129, Corrientes, Argentina
* **WhatsApp de contacto y pedidos:** [379 4662177](https://wa.me/5493794662177)
* **Horarios de atención:** Lunes a Sábado de 8:30 a 20:30 hs | Domingos de 9:30 a 13:30 hs

---

## 🚀 Cómo Iniciar la Web en tu Computadora

### Opción 1: Servidor Local (Recomendado)
Abre una terminal en esta carpeta y ejecuta:
```bash
npm start
```
*(O también `node server.js`)*

Luego ingresa en tu navegador a:
👉 **[http://localhost:3000](http://localhost:3000)**

### Opción 2: Abrir directamente sin servidor
Puedes hacer doble clic en el archivo `index.html` para abrirlo directamente en Google Chrome, Microsoft Edge o tu navegador favorito.

---

## 🗺️ Mapa de Páginas y Funcionalidades

### 🌐 1. Cara al Público (Clientes)
* **`index.html` (Portada Principal)**:
  * Vidriera destacada de productos de bazar y tecnología.
  * Buscador rápido de reparaciones para consultar el estado del celular o electrodoméstico con el código.
  * Acceso directo a promociones de Comercios Amigos y ubicación en Gato y Mancha 1129.
  * Botón flotante directo a WhatsApp.
* **`catalogo.html` (Bazar & Tecnología)**:
  * Catálogo completo con stock en tiempo real (Mates camioneros, bombillas desarmables, termos de acero 1L doble pared, cargadores 20W USB-C, cables reforzados, auriculares TWS).
  * Carrito lateral interactivo con cálculo automático de 10% de descuento abonando en efectivo al retirar.
  * Botón directo para finalizar y encargar el pedido por WhatsApp.
* **`impresiones.html` (Centro de Impresiones & Copiado)**:
  * **Sin anillados** y **sin escalas ni descuentos por cantidad**.
  * Tarifas fijas transparentes: B&N ($200), Color ($400), Sticker ($800) y Fotográfico HD ($900).
  * Opciones de Simple Faz y Doble Faz con cotizador interactivo en vivo.
  * Botón de WhatsApp que envía la cotización exacta precalculada y permite adjuntar el archivo.
* **`reparaciones.html` (Taller Técnico & Rastreador)**:
  * Reparación de celulares, tablets, electrodomésticos (pavas eléctricas, microondas, ventiladores).
  * Lavado de acolchados (1 plaza $7.500, 2 plazas $9.800, King $12.500).
  * **Rastreador en Tiempo Real**: El cliente escribe su código (ejemplo: `#REP-1042`, `#REP-1045` o `#REP-1048`) y ve la barra de 5 etapas (*Recibido ➔ Diagnóstico ➔ En Reparación ➔ Pruebas ➔ ¡Listo para Retiro!*) con el saldo a abonar.
* **`tramites.html` (Trámites ANSES & Gestoría)**:
  * Turnos oficiales ANSES, Partidas de Nacimiento (Registro Civil) y Formularios para AUH / Pensiones.
  * **Campaña de temporada escolar (Ayuda Escolar / Libreta)**: Se activa o pausa automáticamente según lo que configure el administrador.
* **`comercios-amigos.html` (Red Barrial & Marketing)**:
  * Directorio de comercios recomendados con beneficios y descuentos exclusivos para vecinos.
  * Propuesta publicitaria barrial a **$5.000 mensual** con botón directo para contratar.

---

### 🔐 2. Panel de Administración Privado
* **`admin-login.html` (Portal de Acceso con Código PIN)**:
  * Teclado numérico virtual con 6 dígitos enmascarados.
  * Validación criptográfica segura por hash SHA-256 (el código nunca queda en texto plano en el HTML).
  * **PIN predeterminado de fábrica:** `123456` *(se puede cambiar desde el panel)*.
* **`admin.html` (Panel de Control General)**:
  * **Inventario y Stock:** Carga de nuevos productos con foto, precio y stock. Modificación rápida (+ / -) y borrado.
  * **Modificador de Tarifas:** Cambio en 1 clic de los precios de fotocopias, lavado de acolchados y publicidad mensual.
  * **Gestor y Tarifas de Trámites ANSES:** Modificación directa de precios de Turnos Oficiales, Partidas de Nacimiento, Formularios AUH/Pensiones y Ayuda Escolar, más interruptor ON/OFF para activar o pausar la campaña escolar.
  * **Gestor de Comercios Amigos:** Alta y baja de negocios publicitados.
  * **Seguridad:** Modificación del PIN de acceso.
* **`admin-taller.html` (Panel de Taller Técnico)**:
  * Carga de órdenes de celulares y electrodomésticos (`#REP-xxxx`).
  * Cambio de estado en vivo (el cliente lo ve al instante en la web).
  * **Botón de 1 Clic 📲 Enviar WhatsApp 'Equipo Listo'**: Abre WhatsApp al teléfono del cliente con el mensaje pre-armado indicando que su equipo ya está listo para retirar en Gato y Mancha 1129 y el saldo exacto a abonar.
* **`admin-finanzas.html` (Panel Contable & Ganancias)**:
  * Registro de Ingresos (ventas de bazar, cobro de reparaciones, fotocopias, publicidad).
  * Registro de Gastos y Egresos (luz DPEC, resmas de papel, repuestos técnicos, compras mayoristas).
  * Métricas automáticas en vivo: **Total Ingresos**, **Total Gastos**, **Ganancia Neta (Ingresos - Gastos)** y arqueo de caja diaria.

---

### 🗄️ 3. Arquitectura de Datos (`store.js`)
Todos los datos se guardan de forma reactiva y persistente en `localStorage`. Cuando el administrador modifica un precio, agrega un producto o cambia el estado de una reparación, todas las páginas del cliente se sincronizan inmediatamente sin necesidad de bases de datos complejas.
