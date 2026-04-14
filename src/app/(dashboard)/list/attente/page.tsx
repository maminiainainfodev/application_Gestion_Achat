import { Suspense } from "react";
import AttenteListClient from "./AttenteListClient";

// Force dynamic rendering for this page route
export const dynamic = 'force-dynamic';

export default function AttenteListPage() {
    return (
        <Suspense fallback={<div className="p-4 text-center text-gray-500">Chargement des paramètres...</div>}>
            <AttenteListClient />
        </Suspense>
    );
}
