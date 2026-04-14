// import fetch from 'node-fetch'; // Using native fetch in Node 18


const BASE_URL = 'http://localhost:3001/api';

// Users involved in the workflow
const REQUESTER = { matricule: 'PCRS 0150', role: 'Collaborateur' }; // Responsable Informatique
const CHEF_SERVICE = { matricule: 'PCRS 0046', role: 'ChefService' };
const ASSISTANTE = { matricule: 'PCRS 0038', role: 'AssistanteLogistique' }; // Or use a test user if this one lacks role
// Using our seeded test users for the rest
const CHARGEE_ACHAT = { matricule: 'CA001', role: 'ChargeeAchat' };
const RESP_FINANCIER = { matricule: 'RF001', role: 'ResponsableFinancier' };
const CONTROLEUR = { matricule: 'CG001', role: 'ControleurGestion' };
const DIRECTRICE = { matricule: 'DPR', role: 'Directrice' }; // Assuming DPR exists based on previous query

async function callApi(method: string, path: string, user: { matricule: string, role: string }, body?: any) {
    const headers: any = {
        'Content-Type': 'application/json',
        'Cookie': `matricule=${user.matricule}; role=${user.role}`
    };

    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });

    const data: any = await response.json();
    return { status: response.status, data };
}

async function run() {
    console.log('--- STARTING WORKFLOW VERIFICATION ---');

    // 1. Create Request
    console.log(`\n1. Creating Request as ${REQUESTER.matricule} (Responsable Informatique)...`);
    const createRes = await callApi('POST', '/demandeur', REQUESTER, {
        type: 'NAV-ACH', // ACHAT
        items: [{
            type: 'NAV-ACH',
            objet: 'Test Workflow Automated',
            motif: 'Verification',
            qte: 1,
            puHt: 100000,
            montant: 100000,
            description: 'Test Item'
        }]
    });

    if (createRes.status !== 201) {
        console.error('Failed to create request:', createRes.data);
        process.exit(1);
    }

    const demande = createRes.data.data[0].demande;
    const demandeId = demande.id;
    console.log(`✅ Request Created! ID: ${demandeId}, Ref: ${demande.reference}`);
    console.log(`   Initial Status: ${demande.statut}, Etape: ${demande.etapeActuelle}, VersQui: ${demande.versQui}`);

    // 2. Validate Step 1 (Chef Service)
    console.log(`\n2. Validating Step 1 (Chef Service - ${CHEF_SERVICE.matricule})...`);
    let v1 = await callApi('POST', `/demandeur/${demandeId}/validate`, CHEF_SERVICE, { action: 'valider' });
    if (!v1.data.success) { console.error('Failed Step 1:', v1.data); process.exit(1); }
    console.log(`✅ Step 1 Validated! Next: ${v1.data.data.prochaineEtape} (${v1.data.data.prochainRole})`);

    // 3. Validate Step 2 (Assistante Logistique)
    console.log(`\n3. Validating Step 2 (Assistante Logistique - ${ASSISTANTE.matricule})...`);
    let v2 = await callApi('POST', `/demandeur/${demandeId}/validate`, ASSISTANTE, { action: 'valider' });
    if (!v2.data.success) { console.error('Failed Step 2:', v2.data); process.exit(1); }
    console.log(`✅ Step 2 Validated! Next: ${v2.data.data.prochaineEtape} (${v2.data.data.prochainRole})`);

    // 4. Validate Step 3 (Chargée Achat)
    console.log(`\n4. Validating Step 3 (Chargée Achat - ${CHARGEE_ACHAT.matricule})...`);
    let v3 = await callApi('POST', `/demandeur/${demandeId}/validate`, CHARGEE_ACHAT, { action: 'valider' });
    if (!v3.data.success) { console.error('Failed Step 3:', v3.data); process.exit(1); }
    console.log(`✅ Step 3 Validated! Next: ${v3.data.data.prochaineEtape} (${v3.data.data.prochainRole})`);

    // 5. Validate Step 4 (Responsable Financier)
    console.log(`\n5. Validating Step 4 (Responsable Financier - ${RESP_FINANCIER.matricule})...`);
    let v4 = await callApi('POST', `/demandeur/${demandeId}/validate`, RESP_FINANCIER, { action: 'valider' });
    if (!v4.data.success) { console.error('Failed Step 4:', v4.data); process.exit(1); }
    console.log(`✅ Step 4 Validated! Next: ${v4.data.data.prochaineEtape} (${v4.data.data.prochainRole})`);

    // 6. Validate Step 5 (Contrôleur de Gestion)
    console.log(`\n6. Validating Step 5 (Contrôleur de Gestion - ${CONTROLEUR.matricule})...`);
    let v5 = await callApi('POST', `/demandeur/${demandeId}/validate`, CONTROLEUR, { action: 'valider' });
    if (!v5.data.success) { console.error('Failed Step 5:', v5.data); process.exit(1); }
    console.log(`✅ Step 5 Validated! Next: ${v5.data.data.prochaineEtape} (${v5.data.data.prochainRole})`);

    // 7. Validate Step 6 (Directrice)
    console.log(`\n7. Validating Step 6 (Directrice - ${DIRECTRICE.matricule})...`);
    let v6 = await callApi('POST', `/demandeur/${demandeId}/validate`, DIRECTRICE, { action: 'valider' });
    if (!v6.data.success) { console.error('Failed Step 6:', v6.data); process.exit(1); }
    console.log(`✅ Step 6 Validated! Next: ${v6.data.data.prochaineEtape} (${v6.data.data.prochainRole})`);

    // 8. Validate Step 7 (Chargée Achat - Finalisation / BC)
    console.log(`\n8. Validating Step 7 (Chargée Achat - Finalisation)...`);
    // Note: Step 7 for Achat is "Chargée Achat" again for BC generation.
    // Wait, does validate move it to VALIDEE or just next step?
    // Step 7 is the last step in DB (ID: 7).
    // Next Step check matching etape > 7? There is none.
    // So validation should return action: "validee_finale".

    let v7 = await callApi('POST', `/demandeur/${demandeId}/validate`, CHARGEE_ACHAT, { action: 'valider' });
    if (!v7.data.success) { console.error('Failed Step 7:', v7.data); process.exit(1); }

    if (v7.data.data.action === 'validee_finale') {
        console.log(`✅ Step 7 Validated! Status: ${v7.data.data.demande.statut}`);
        console.log(`🎉 WORKFLOW COMPLETED SUCCESSFULLY!`);
    } else {
        console.log(`✅ Step 7 Validated! Data:`, v7.data);
    }

}

run().catch(console.error);
