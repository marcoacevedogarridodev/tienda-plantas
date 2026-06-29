require('dotenv').config();
const express = require('express');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

const PRODUCTOS_FALLBACK = [
    {
        id: 'planta-001',
        nombre: 'Monstera Deliciosa',
        precio: 15000,
        descripcion: 'Nivel de cuidado: Bajo. Planta tropical de interior con hojas grandes y perforadas. Ideal para principiantes.',
        imagen: '/assets/img/1.jpeg',
        stock: 0,
        categoria: 'Tropicales',
        origen: 'Centroamérica',
        toxicidad: 3,
        nivelCuidado: 2,
        agua: 3,
        luz: 3,
        solDirecto: 1,
        humedad: 3
    },
    {
        id: 'planta-002',
        nombre: 'Sansevieria Trifasciata',
        precio: 19000,
        descripcion: 'Nivel de cuidado: Medio. Lengua de suegra, resistente y purificadora de aire. Perfecta para oficinas.',
        imagen: '/assets/img/2.jpeg',
        stock: 8,
        categoria: 'Suculentas',
        origen: 'África',
        toxicidad: 4,
        nivelCuidado: 6,
        agua: 1,
        luz: 2,
        solDirecto: 1,
        humedad: 2
    },
    {
        id: 'planta-003',
        nombre: 'Ficus Lyrata',
        precio: 23000,
        descripcion: 'Nivel de cuidado: Alto. Higo de hoja de violín, elegancia y presencia en cualquier espacio.',
        imagen: '/assets/img/3.jpeg',
        stock: 5,
        categoria: 'Ficus',
        origen: 'África Occidental',
        toxicidad: 2,
        nivelCuidado: 4,
        agua: 2,
        luz: 3,
        solDirecto: 1,
        humedad: 2
    },
    {
        id: 'planta-004',
        nombre: 'Pothos Dorado',
        precio: 27000,
        descripcion: 'Nivel de cuidado: Bajo. Enredadera de interior fácil de cuidar. Purifica el aire y crece rápidamente.',
        imagen: '/assets/img/4.jpeg',
        stock: 12,
        categoria: 'Enredaderas',
        origen: 'Asia',
        toxicidad: 3,
        nivelCuidado: 1,
        agua: 4,
        luz: 2,
        solDirecto: 2,
        humedad: 2
    },
    {
        id: 'planta-005',
        nombre: 'Calathea Orbifolia',
        precio: 31000,
        descripcion: 'Nivel de cuidado: Medio. Hojas redondas con patrones únicos. Requiere humedad constante.',
        imagen: '/assets/img/5.jpeg',
        stock: 6,
        categoria: 'Calatheas',
        origen: 'Sudamérica',
        toxicidad: 2,
        nivelCuidado: 3,
        agua: 3,
        luz: 2,
        solDirecto: 1,
        humedad: 4
    },
    {
        id: 'planta-006',
        nombre: 'Aloe Vera',
        precio: 35000,
        descripcion: 'Nivel de cuidado: Alto. Planta medicinal con propiedades curativas. Necesita luz indirecta y riego moderado.',
        imagen: '/assets/img/6.jpeg',
        stock: 4,
        categoria: 'Suculentas',
        origen: 'Norte de África',
        toxicidad: 2,
        nivelCuidado: 2,
        agua: 1,
        luz: 4,
        solDirecto: 3,
        humedad: 1
    },
    {
        id: 'planta-007',
        nombre: 'Cactus San Pedro',
        precio: 39000,
        descripcion: 'Nivel de cuidado: Bajo. Cactus columnar de crecimiento rápido. Muy resistente a la sequía.',
        imagen: '/assets/img/7.jpeg',
        stock: 7,
        categoria: 'Cactus',
        origen: 'Perú',
        toxicidad: 1,
        nivelCuidado: 1,
        agua: 1,
        luz: 4,
        solDirecto: 4,
        humedad: 1
    },
    {
        id: 'planta-008',
        nombre: 'Orquídea Phalaenopsis',
        precio: 43000,
        descripcion: 'Nivel de cuidado: Medio. Orquídea elegante de floración duradera. Requiere cuidados específicos.',
        imagen: '/assets/img/8.jpeg',
        stock: 3,
        categoria: 'Orquídeas',
        origen: 'Sudeste Asiático',
        toxicidad: 2,
        nivelCuidado: 3,
        agua: 2,
        luz: 2,
        solDirecto: 1,
        humedad: 3
    },
    {
        id: 'planta-009',
        nombre: 'Bonsái Ficus',
        precio: 47000,
        descripcion: 'Nivel de cuidado: Alto. Árbol en miniatura que requiere poda y cuidados constantes. Arte vivo.',
        imagen: '/assets/img/9.jpeg',
        stock: 2,
        categoria: 'Bonsáis',
        origen: 'Japón',
        toxicidad: 4,
        nivelCuidado: 4,
        agua: 2,
        luz: 2,
        solDirecto: 1,
        humedad: 2
    },
    {
        id: 'planta-010',
        nombre: 'Helecho Nido de Ave',
        precio: 51000,
        descripcion: 'Nivel de cuidado: Bajo. Helecho de interior con hojas onduladas. Perfecto para baños con humedad.',
        imagen: '/assets/img/10.jpeg',
        stock: 9,
        categoria: 'Helechos',
        origen: 'Australia',
        toxicidad: 1,
        nivelCuidado: 2,
        agua: 4,
        luz: 2,
        solDirecto: 1,
        humedad: 4
    },
    {
        id: 'planta-011',
        nombre: 'Pilea Peperomioides',
        precio: 55000,
        descripcion: 'Nivel de cuidado: Medio. Planta china del dinero. Produce hijuelos que puedes regalar.',
        imagen: '/assets/img/11.jpeg',
        stock: 5,
        categoria: 'Suculentas',
        origen: 'China',
        toxicidad: 2,
        nivelCuidado: 2,
        agua: 3,
        luz: 3,
        solDirecto: 1,
        humedad: 3
    },
    {
        id: 'planta-012',
        nombre: 'Palma Areca',
        precio: 59000,
        descripcion: 'Nivel de cuidado: Alto. Palma de interior elegante que purifica el aire. Necesita luz brillante.',
        imagen: '/assets/img/12.jpeg',
        stock: 4,
        categoria: 'Palmas',
        origen: 'Madagascar',
        toxicidad: 2,
        nivelCuidado: 3,
        agua: 3,
        luz: 3,
        solDirecto: 2,
        humedad: 2
    }
];

let productosCache = null;
let productosCacheTime = 0;
let refreshTimer = null;

function parseCsv(texto) {
    const filas = [];
    let fila = [];
    let valor = '';
    let entreComillas = false;

    for (let i = 0; i < texto.length; i++) {
        const caracter = texto[i];

        if (caracter === '"') {
            if (entreComillas && texto[i + 1] === '"') {
                valor += '"';
                i++;
            } else {
                entreComillas = !entreComillas;
            }
        } else if (caracter === ',' && !entreComillas) {
            fila.push(valor);
            valor = '';
        } else if ((caracter === '\n' || caracter === '\r') && !entreComillas) {
            if (caracter === '\r' && texto[i + 1] === '\n') {
                i++;
            }
            fila.push(valor);
            valor = '';
            if (fila.some(celda => celda.trim() !== '')) {
                filas.push(fila);
            }
            fila = [];
        } else {
            valor += caracter;
        }
    }

    if (valor.length > 0 || fila.length > 0) {
        fila.push(valor);
        if (fila.some(celda => celda.trim() !== '')) {
            filas.push(fila);
        }
    }

    return filas;
}

function leerValorCelda(celda) {
    if (celda == null) return '';
    if (typeof celda === 'object' && 'v' in celda) return celda.v ?? '';
    if (typeof celda === 'object' && 'f' in celda) return celda.f ?? '';
    return celda;
}

function limpiarTexto(valor) {
    return String(valor ?? '').trim();
}

function obtenerValorPorClaves(valores, claves) {
    for (const clave of claves) {
        const valor = valores[clave];
        if (valor !== undefined && valor !== null && String(valor).trim() !== '') {
            return valor;
        }
    }
    return undefined;
}

function normalizarClave(valor) {
    return String(valor ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '');
}

function limpiarNumero(valor, fallback = 0) {
    const numero = Number(String(valor ?? '').replace(/[^\d.-]/g, ''));
    return Number.isFinite(numero) ? numero : fallback;
}

function construirProductoDesdeFila(fila, headers) {
    const valores = headers.reduce((acumulador, header, index) => {
        acumulador[normalizarClave(header)] = leerValorCelda(fila[index]);
        return acumulador;
    }, {});

    const nombre = limpiarTexto(valores.nombre || valores.planta || valores.titulo);
    if (!nombre) return null;

    const slug = nombre
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const solDirecto = obtenerValorPorClaves(valores, ['soldirecto', 'sundirecto', 'sundirect', 'sol', 'soldirecta']);

    return {
        id: limpiarTexto(valores.id || slug || 'producto'),
        nombre,
        precio: limpiarNumero(valores.precio || valores.price, 0),
        descripcion: limpiarTexto(valores.descripcion || valores.description || 'Sin descripción'),
        imagen: limpiarTexto(valores.imagen || valores.image || '/assets/img/default.jpg'),
        stock: Math.max(0, limpiarNumero(valores.stock || valores.disponibilidad, 0)),
        categoria: limpiarTexto(valores.categoria || valores.category || 'Sin categoría'),
        origen: limpiarTexto(valores.origen || valores.origin || ''),
        toxicidad: limpiarNumero(valores.toxicidad || valores.toxicity, 0),
        nivelCuidado: limpiarNumero(valores.nivelcuidado || valores.cuidado || valores.care, 0),
        agua: limpiarNumero(valores.agua || valores.water, 0),
        luz: limpiarNumero(valores.luz || valores.light, 0),
        solDirecto: limpiarNumero(solDirecto, 0),
        humedad: limpiarNumero(valores.humedad || valores.humidity, 0)
    };
}

async function obtenerProductosDesdeGoogleSheets() {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) {
        throw new Error('Falta GOOGLE_SHEET_ID en el archivo .env');
    }

    const endpoints = [
        process.env.GOOGLE_SHEET_URL,
        `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=0`,
        `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`
    ].filter(Boolean);

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                continue;
            }

            const texto = await response.text();
            const contentType = response.headers.get('content-type') || '';

            if (contentType.includes('application/json') || endpoint.includes('gviz')) {
                const match = texto.match(/google\.visualization\.Query\.setResponse\((([\s\S]*))\)\s*;/);
                if (!match) {
                    continue;
                }

                const datos = JSON.parse(match[1]);
                const headers = (datos.table?.cols || []).map(col => (col.label || '').trim().toLowerCase());
                const filas = (datos.table?.rows || []).map(fila => fila.c || []);

                const productos = filas
                    .map(fila => construirProductoDesdeFila(fila, headers))
                    .filter(Boolean);

                if (productos.length > 0) {
                    return productos;
                }
            }

            if (contentType.includes('text/csv') || endpoint.includes('export')) {
                const filas = parseCsv(texto);
                if (filas.length < 2) {
                    continue;
                }

                const headers = filas[0].map(celda => String(celda || '').trim().toLowerCase());
                const productos = filas.slice(1)
                    .map(fila => construirProductoDesdeFila(fila, headers))
                    .filter(Boolean);

                if (productos.length > 0) {
                    return productos;
                }
            }
        } catch (error) {
            console.warn(`No se pudo leer ${endpoint}:`, error.message);
        }
    }

    throw new Error('No se pudo leer ninguna fuente de Google Sheets');
}

async function obtenerProductos() {
    const ahora = Date.now();
    const refreshMs = Number(process.env.GOOGLE_SHEET_REFRESH_MS || 30000);

    if (productosCache && ahora - productosCacheTime < refreshMs) {
        return productosCache;
    }

    try {
        const productosDesdeSheet = await obtenerProductosDesdeGoogleSheets();
        productosCache = productosDesdeSheet;
        productosCacheTime = ahora;
        return productosCache;
    } catch (error) {
        console.warn('No se pudieron cargar productos desde Google Sheets, usando datos locales:', error.message);
        if (!productosCache) {
            productosCache = PRODUCTOS_FALLBACK;
            productosCacheTime = ahora;
        }
        return productosCache;
    }
}

function iniciarActualizacionAutomatica() {
    const refreshMs = Number(process.env.GOOGLE_SHEET_REFRESH_MS || 30000);
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }

    refreshTimer = setInterval(async () => {
        try {
            const productosDesdeSheet = await obtenerProductosDesdeGoogleSheets();
            productosCache = productosDesdeSheet;
            productosCacheTime = Date.now();
            console.log('Productos refrescados desde Google Sheets');
        } catch (error) {
            console.warn('No se pudo refrescar Google Sheets automáticamente:', error.message);
        }
    }, refreshMs);
}

// Obtener catálogo
app.get('/api/productos', async (req, res) => {
    const productos = await obtenerProductos();
    res.json(productos);
});

app.get('/api/producto/:id', async (req, res) => {
    const productos = await obtenerProductos();
    const producto = productos.find(p => p.id === req.params.id);
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
});

app.post('/api/verificar-stock', async (req, res) => {
    const { items } = req.body;
    const productos = await obtenerProductos();
    const errores = [];

    items.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (!producto) {
            errores.push({ id: item.id, error: 'Producto no encontrado' });
        } else if (producto.stock < item.cantidad) {
            errores.push({ 
                id: item.id, 
                error: `Stock insuficiente. Disponible: ${producto.stock}` 
            });
        }
    });

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }
    res.json({ ok: true });
});

app.get('/api/refresh', async (req, res) => {
    try {
        const productosDesdeSheet = await obtenerProductosDesdeGoogleSheets();
        productosCache = productosDesdeSheet;
        productosCacheTime = Date.now();
        res.json({ ok: true, cantidad: productosDesdeSheet.length });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

app.post('/api/checkout-carrito', async (req, res) => {
    try {
        const { items } = req.body;
        const productos = await obtenerProductos();

        const errores = [];
        items.forEach(item => {
            const producto = productos.find(p => p.id === item.id);
            if (!producto) {
                errores.push({ id: item.id, error: 'Producto no encontrado' });
            } else if (producto.stock < item.cantidad) {
                errores.push({ 
                    id: item.id, 
                    error: `Stock insuficiente. Disponible: ${producto.stock}` 
                });
            }
        });

        if (errores.length > 0) {
            return res.status(400).json({ errores });
        }

        const line_items = items.map(item => {
            const producto = productos.find(p => p.id === item.id);
            const imagenProducto = producto.imagen.startsWith('http')
                ? producto.imagen
                : `${req.protocol}://${req.get('host')}${producto.imagen}`;

            return {
                price_data: {
                    currency: 'clp',
                    product_data: {
                        name: producto.nombre,
                        description: producto.descripcion,
                        images: [imagenProducto]
                    },
                    unit_amount: producto.precio,
                },
                quantity: item.cantidad,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${req.headers.origin}/exito.html`,
            cancel_url: `${req.headers.origin}/cancelado.html`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error en checkout carrito:', error);
        res.status(500).json({ error: 'Error al procesar el pago' });
    }
});

// 🔥 NUEVO: Ruta de prueba para verificar que el servidor funciona
app.get('/get', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// ─── EXPORTAR PARA VERCEL ───
module.exports = app;

// ─── PARA DESARROLLO LOCAL ───
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    async function iniciarServidor() {
        await obtenerProductos();
        iniciarActualizacionAutomatica();

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    }
    iniciarServidor();
}