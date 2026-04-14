const fetch = require('node-fetch');

async function testPost(data, label) {
    try {
        const response = await fetch('http://localhost:3000/api/fournisseur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(`${label} - Status: ${response.status}`);
        console.log('Result:', result.message || result.error);
        return response.ok;
    } catch (error) {
        console.error(`Fetch error for ${label}:`, error);
        return false;
    }
}

async function runTests() {
    const testData = {
        Nom: 'Test Duplicate ' + Date.now(),
        Adresse: 'Test Address',
        NomCheque: 'Test Cheque',
        NIF: 'DUPE_NIF_TEST',
        CIN: 'DUPE_CIN_TEST'
    };

    console.log('--- Phase 1: Creating first supplier ---');
    await testPost(testData, 'First creation');

    console.log('\n--- Phase 2: Creating second supplier with SAME NIF/CIN ---');
    const success = await testPost(testData, 'Second creation');

    if (success) {
        console.log('\nSUCCESS: Duplicates allowed!');
    } else {
        console.log('\nFAILURE: Duplicates still blocked.');
    }
}

runTests();
