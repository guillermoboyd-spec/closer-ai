// --- GLOBAL BOYD: CLOSER AI - INFINITE ENGINE (V8 ELITE) ---

const APP_STATE = {
    lang: localStorage.getItem('via_lang') || 'es',
    tab: 'sales',
    tone: 'formal',
    inventory: JSON.parse(localStorage.getItem('via_inv')) || [],
    usage: parseInt(localStorage.getItem('via_usage')) || 0,
    isPremium: localStorage.getItem('via_premium') === 'true',
    apiKey: localStorage.getItem('via_api_key') || ''
};

const MASTER_DATA = {
    'es': {
        sales: "MASTER CLOSING", inventory: "DATABASE", premium: "ELITE ACCESS",
        placeholder: "Analizar mensaje del cliente...",
        btn_generate: "INITIATE STRATEGIC CLOSURE",
        credits: "ELITE STATUS", sales_made: " SALES",
        copy: "COPY", api_label: "INTEGRATION"
    },
    'en': {
        sales: "MASTER CLOSING", inventory: "DATABASE", premium: "ELITE ACCESS",
        placeholder: "Analyze client communication...",
        btn_generate: "INITIATE STRATEGIC CLOSURE",
        credits: "ELITE STATUS", sales_made: " SALES",
        copy: "COPY", api_label: "INTEGRATION"
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => { refreshUI(); setupNav(); });

function setupNav() {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTab(btn.dataset.tab);
        };
    });
}

function refreshUI() { renderTab(APP_STATE.tab); updateStatus(); }

function renderTab(tab) {
    APP_STATE.tab = tab;
    const main = document.getElementById('tab-content');
    const s = MASTER_DATA[APP_STATE.lang];
    
    switch(tab) {
        case 'sales': 
            main.innerHTML = `
                <div class="elite-card">
                    <div style="display:flex; gap:10px; margin-bottom:25px; justify-content:center">
                        <button onclick="setTone('formal')" style="background:${APP_STATE.tone==='formal'?'var(--primary)':'#000'}; color:${APP_STATE.tone==='formal'?'#000':'#555'}; border:1px solid #333; padding:12px 20px; border-radius:15px; cursor:pointer; font-weight:900">💎 ELITE</button>
                        <button onclick="setTone('direct')" style="background:${APP_STATE.tone==='direct'?'var(--primary)':'#000'}; color:${APP_STATE.tone==='direct'?'#000':'#555'}; border:1px solid #333; padding:12px 20px; border-radius:15px; cursor:pointer; font-weight:900">⚡ SPEED</button>
                        <button onclick="setTone('close')" style="background:${APP_STATE.tone==='close'?'var(--primary)':'#000'}; color:${APP_STATE.tone==='close'?'#000':'#555'}; border:1px solid #333; padding:12px 20px; border-radius:15px; cursor:pointer; font-weight:900">🤝 TRUST</button>
                    </div>
                    <textarea id="msgIn" rows="6" placeholder="${s.placeholder}" style="font-size:1.1rem; line-height:1.5; color:#fff"></textarea>
                    <button class="btn-gold" onclick="generateResponse()">${s.btn_generate}</button>
                </div>
                <div id="outBox" class="hidden"><div class="ai-glass-box"><div id="writer"></div></div></div>
            `;
            break;
        case 'inventory':
            main.innerHTML = `
                <div class="elite-card">
                    <h3>DATABASE SYNC</h3>
                    <input type="text" id="nIn" placeholder="Product Identifier">
                    <input type="text" id="pIn" placeholder="Value (USD/ARS)">
                    <button class="btn-gold" onclick="saveItem()">COMMIT TO BRAIN</button>
                </div>
                <div>
                    ${APP_STATE.inventory.map((p, i) => `
                        <div class="elite-card" style="padding:20px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center">
                            <div><b style="font-size:1.1rem">${p.name}</b><br><span style="color:var(--primary)">${p.price}</span></div>
                            <button onclick="delItem(${i})" style="background:none; border:none; color:#444"><i class="fa-solid fa-trash fa-lg"></i></button>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
        case 'account':
            main.innerHTML = `<div class="elite-card" style="text-align:center; padding:30px">
                <i class="fa-solid fa-cloud-bolt" style="font-size:3rem; color:var(--primary); margin-bottom:20px"></i>
                <h2>ELITE INTEGRATION</h2>
                <p style="margin-top:15px; font-size:0.8rem; color:#666">Enable Universal Intelligence by connecting your OpenAI API Key.</p>
                <input type="password" id="apiKeyIn" value="${APP_STATE.apiKey}" placeholder="sk-..." style="margin-top:20px; border-radius:10px; text-align:center">
                <button class="btn-gold" onclick="saveApiKey()">SAVE INTEGRATION</button>
                <hr style="margin:30px 0; border:0; border-top:1px solid #222">
                ${APP_STATE.isPremium ? '<b style="color:var(--primary)">ACCOUNT VERIFIED ✅</b>' : `<button class="btn-gold" style="background:#000; border:1px solid #fff; color:#fff" onclick="simulatePay()">RESTORE MASTER ACCESS</button>`}
            </div>`;
            break;
    }
}

window.saveApiKey = function() {
    const k = document.getElementById('apiKeyIn').value;
    localStorage.setItem('via_api_key', k);
    APP_STATE.apiKey = k;
    showPop('API INTEGRATION SAVED ✅');
};

window.toggleL = function(l) { APP_STATE.lang = l; localStorage.setItem('via_lang', l); refreshUI(); };
window.setTone = function(t) { APP_STATE.tone = t; renderTab('sales'); };

// --- UNIVERSAL STRATEGIC ENGINE V8 ---
window.generateResponse = function() {
    if(APP_STATE.usage >= 5 && !APP_STATE.isPremium) { document.getElementById('paywall-modal').classList.remove('hidden'); return; }
    
    const input = document.getElementById('msgIn').value.toLowerCase();
    const l = APP_STATE.lang;
    const t = APP_STATE.tone;
    let draft = "";
    
    // Core Intent Mapping
    const p = APP_STATE.inventory.find(x => input.includes(x.name.toLowerCase()));
    const isNeg = input.includes('descuento') || input.includes('oferta') || input.includes('precio final') || input.includes('discount') || input.includes('lower');
    const isGrt = input.includes('hola') || input.includes('buen dia') || input.includes('hello') || input.includes('hi');

    if (p) {
        draft = hasProdDraft(p, l, t);
    } else if (isNeg) {
        draft = l==='es' ? "¡Hola! Respecto al valor del producto, estamos manejando una línea de precios de alta gama altamente competitiva. 🚀 Sin embargo, si cerramos su pedido ahora mismo, puedo consultar internamente por un beneficio exclusivo de envío o pack. ¿Qué volumen de compra tenía en mente?" : "Hello! Regarding the pricing, we maintain a highly competitive high-end pricing structure. 🚀 However, if we finalize your order right now, I can consult internally for an exclusive shipping or package benefit. What volume did you have in mind?";
    } else if (isGrt && input.length < 15) {
        draft = l==='es' ? "¡Hola! Es un placer saludarte. 👋 Bienvenido a la experiencia Global Boyd. ¿En qué podemos asesorarte hoy para potenciar tus objetivos comerciales? ✨" : "Hello! Pleasure to assist you. 👋 Welcome to the Global Boyd experience. How can we consult you today to maximize your business objectives? ✨";
    } else {
        // High-Level Consultant Fallback
        const generic_es = [
            "Estimado cliente, su consulta es muy importante. 🚀 Para brindarle la mejor asesoría técnica y comercial, ¿podría darnos más detalles sobre lo que está buscando alcanzar el día de hoy? Estaremos encantados de darle una solución de alto nivel.",
            "¡Excelente pregunta! ✨ En Global Boyd priorizamos la calidad personalizada. Por favor, amplíenos su consulta para que nuestro equipo le asigne la mejor propuesta disponible en nuestro catálogo privado hoy mismo.",
            "¡Gracias por contactarnos! 😊 Estamos procesando su solicitud de asesoramiento. Mientras tanto, ¿le gustaría conocer nuestros productos más destacados para esta temporada? Contamos con stock limitado y entrega inmediata."
        ];
        const generic_en = [
            "Dear client, your inquiry is highly valued. 🚀 To provide you with the best technical and commercial advice, could you provide more details regarding what you're looking to achieve today? We'd be delighted to offer you a high-level solution.",
            "Excellent question! ✨ At Global Boyd, we prioritize personalized quality. Please expand on your inquiry so our team can assign you the best available proposal from our private catalog today.",
            "Thank you for contacting us! 😊 we are processing your consultation request. Meanwhile, would you like to see our most featured products for this season? We have limited stock and immediate delivery available."
        ];
        draft = l==='es' ? generic_es[Math.floor(Math.random()*generic_es.length)] : generic_en[Math.floor(Math.random()*generic_en.length)];
    }

    document.getElementById('outBox').classList.remove('hidden');
    const w = document.getElementById('writer');
    w.innerText = "";
    let i = 0;
    function type() { if(i < draft.length) { w.innerText += draft.charAt(i); i++; setTimeout(type, 7); } }
    type();
    APP_STATE.usage++; updateStatus();
};

function hasProdDraft(p, l, t) {
    if(l === 'es') {
        if(t === 'formal') return `Estimado cliente, es un honor saludarle. Respecto al **${p.name}**, su valor es de **${p.price}**. ✅ Disponemos de stock limitado para entrega inmediata garantizada. ¿Desea que procedamos con su reserva oficial hoy mismo? ✨`;
        if(t === 'direct') return `¡Hola! Sí, el **${p.name}** está a **${p.price}**. ✅ Nos quedan poquitos hoy y se agotan rápido. 🚀 ¿Te lo reservo ahora mismo para que no te quedes fuera?`;
        return `¡Qué buena elección! El **${p.name}** es de lo más pedido y cuesta **${p.price}**. 😊 ¿Te ayudo a cerrar tu pedido ahora y así asegurar que lo recibas lo antes posible? ✨`;
    } else {
        if(t === 'formal') return `Distinguished client, it is an absolute pleasure. Regarding the **${p.name}**, the investment is **${p.price}**. ✅ Availability is restricted. Should we move forward with securing your unit for immediate fulfillment today? ✨`;
        if(t === 'direct') return `Hi! Yes, the **${p.name}** is **${p.price}**. ✅ Moving fast today, almost gone. 🚀 Should I lock in your order right now before it sells out?`;
        return `Great choice! The **${p.name}** is a top favorite at **${p.price}**. 😊 Ready to grab yours now and start enjoying its benefits? ✨`;
    }
}

function updateStatus() {
    const b = document.getElementById('usage-status');
    const r = 5 - APP_STATE.usage;
    b.innerText = APP_STATE.isPremium ? 'ELITE STATUS: MASTER UNLIMITED ✅' : `STATUS: ${Math.max(0,r)} / 5 SESSIONS REMAINING`;
}

window.saveItem = function() {
    const n = document.getElementById('nIn').value; const p = document.getElementById('pIn').value;
    if(!n || !p) return;
    APP_STATE.inventory.push({name:n, price:p});
    localStorage.setItem('via_inv', JSON.stringify(APP_STATE.inventory));
    refreshUI();
};

window.delItem = function(i) {
    APP_STATE.inventory.splice(i,1);
    localStorage.setItem('via_inv', JSON.stringify(APP_STATE.inventory));
    refreshUI();
};

window.simulatePay = function() { localStorage.setItem('via_premium', 'true'); APP_STATE.isPremium = true; refreshUI(); };
window.closePaywall = function() { document.getElementById('paywall-modal').classList.add('hidden'); };
function showPop(m) { const t = document.getElementById('toast'); t.innerText = m; t.classList.remove('hidden'); setTimeout(() => t.classList.add('hidden'), 3000); }
