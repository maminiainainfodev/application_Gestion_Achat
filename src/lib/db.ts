/**
 * Couche d'accès aux données (Data Access Layer)
 * 
 * Ce fichier remplace l'ancienne dépendance à Prisma.
 * Il utilise désormais exclusivement le client Mock basé sur JSON.
 */

import mockany from './mock-prisma';

// On exporte le client mock sous le nom 'db'
const db = mockany;

export default db;
