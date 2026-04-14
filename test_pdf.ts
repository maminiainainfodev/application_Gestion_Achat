import { generatePDFForDemandes, type DemandePDFData } from "./src/lib/pdf";
import fs from "fs";
import path from "path";

async function testPDF() {
    console.log("Starting PDF generation test...");

    const mockData: DemandePDFData[] = [
        {
            id: 1,
            numero: 123,
            type: "PAIEMENT",
            dateDepot: new Date(),
            reference: "NP-2026-001",
            statut: "VALIDEE",
            etapeActuelle: 6,
            dateFinalisation: new Date(),
            objet: "Test PAIEMENT",
            description: "Description test paiement",
            motif: "Motif test",
            quantite: 1,
            pu: 1000,
            montant: 1000,
            devis: null,
            justificationChoix: "Choix test",
            imputationComptable: "601100",
            activite: "ACTIVITE TEST",
            codeTIGER: "TIGER001",
            versQui: "TEST",
            auteur: {
                matricule: "M001",
                nom: "DOE",
                prenom: "John",
                fonction: { nomFonction: "Developpeur" },
                service: { nomService: "IT" },
                serviceAbbrev: "IT",
                telephone: "0340000000",
                email: "john.doe@example.com"
            },
            fournisseur: { nom: "FOURNISSEUR TEST" },
            historique: [
                { etape: 1, statut: "VALIDEE", dateValidation: new Date(), valideur: { matricule: "V001", nom: "Val", prenom: "Ide" } },
                { etape: 2, statut: "VALIDEE", dateValidation: new Date(), valideur: { matricule: "V002", nom: "Val", prenom: "Ide" } },
                { etape: 3, statut: "VALIDEE", dateValidation: new Date(), valideur: { matricule: "V003", nom: "Val", prenom: "Ide" } },
                { etape: 4, statut: "VALIDEE", dateValidation: new Date(), valideur: { matricule: "V004", nom: "Val", prenom: "Ide" } },
                { etape: 5, statut: "VALIDEE", dateValidation: new Date(), valideur: { matricule: "V005", nom: "Val", prenom: "Ide" } },
                { etape: 6, statut: "VALIDEE", dateValidation: new Date(), valideur: { matricule: "V006", nom: "Val", prenom: "Ide" } }
            ]
        }
    ];

    try {
        const pdfBytes = await generatePDFForDemandes(mockData);
        const outputPath = path.join(process.cwd(), "test-paiement.pdf");
        fs.writeFileSync(outputPath, Buffer.from(pdfBytes));
        console.log(`PDF successfully generated at ${outputPath}`);
    } catch (error) {
        console.error("Error during PDF generation:", error);
    }
}

testPDF();
