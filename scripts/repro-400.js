async function testPost(data) {
    try {
        const response = await fetch('http://localhost:3000/api/fournisseur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'matricule=ADMIN; role=Administrateur' // Adjust as needed
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(`Status: ${response.status}`);
        console.log('Result:', result);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Scenario 1: Duplicate NIF
console.log('--- Scenario 1: Duplicate NIF (using ID 55 NIF) ---');
testPost({
    Nom: 'Test Duplicate',
    Adresse: 'Test Address',
    NomCheque: 'Test Cheque',
    NIF: '5002934662',
    CIN: '99999999999999999'
});

// Scenario 2: Duplicate CIN
console.log('\n--- Scenario 2: Duplicate CIN (using ID 55 CIN) ---');
testPost({
    Nom: 'Test Duplicate',
    Adresse: 'Test Address',
    NomCheque: 'Test Cheque',
    NIF: '9999999999',
    CIN: '47110212018000130'
});
