/**
 * Couche d'accès aux données (Data Access Layer).
 * Ce fichier remplace l'ancienne dépendance à Prisma.
 * Il utilise désormais exclusivement le client Mock (JSON).
 */

import mockany from './mock-prisma';

// On exporte le client mock sous le nom générique 'prisma' pour éviter de casser les imports existants,
// mais il est désormais totalement indépendant du paquet @prisma/client.
const prisma = mockany;

export default prisma;