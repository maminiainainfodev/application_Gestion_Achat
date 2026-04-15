
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Fournisseur
 * 
 */
export type Fournisseur = $Result.DefaultSelection<Prisma.$FournisseurPayload>
/**
 * Model Fonction
 * 
 */
export type Fonction = $Result.DefaultSelection<Prisma.$FonctionPayload>
/**
 * Model Collaborateur
 * 
 */
export type Collaborateur = $Result.DefaultSelection<Prisma.$CollaborateurPayload>
/**
 * Model ComptesUtilisateurs
 * 
 */
export type ComptesUtilisateurs = $Result.DefaultSelection<Prisma.$ComptesUtilisateursPayload>
/**
 * Model Roles
 * 
 */
export type Roles = $Result.DefaultSelection<Prisma.$RolesPayload>
/**
 * Model CollaborateurRoles
 * 
 */
export type CollaborateurRoles = $Result.DefaultSelection<Prisma.$CollaborateurRolesPayload>
/**
 * Model Budget
 * 
 */
export type Budget = $Result.DefaultSelection<Prisma.$BudgetPayload>
/**
 * Model WorkflowEtapes
 * 
 */
export type WorkflowEtapes = $Result.DefaultSelection<Prisma.$WorkflowEtapesPayload>
/**
 * Model Demandeur
 * 
 */
export type Demandeur = $Result.DefaultSelection<Prisma.$DemandeurPayload>
/**
 * Model HistoriqueValidation
 * 
 */
export type HistoriqueValidation = $Result.DefaultSelection<Prisma.$HistoriqueValidationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Civilite: {
  HOMME: 'HOMME',
  FEMME: 'FEMME'
};

export type Civilite = (typeof Civilite)[keyof typeof Civilite]


export const TypeNavette: {
  ACHAT: 'ACHAT',
  PAIEMENT: 'PAIEMENT',
  NOTE_FRAIS: 'NOTE_FRAIS',
  DRFMS: 'DRFMS',
  DRFME: 'DRFME'
};

export type TypeNavette = (typeof TypeNavette)[keyof typeof TypeNavette]


export const StatutDemande: {
  EN_ATTENTE: 'EN_ATTENTE',
  REFUSEE: 'REFUSEE',
  VALIDEE: 'VALIDEE',
  EN_MAGASIN: 'EN_MAGASIN'
};

export type StatutDemande = (typeof StatutDemande)[keyof typeof StatutDemande]


export const StatutValidation: {
  VALIDEE: 'VALIDEE',
  REFUSEE: 'REFUSEE',
  EN_ATTENTE: 'EN_ATTENTE',
  MIS_A_JOUR: 'MIS_A_JOUR'
};

export type StatutValidation = (typeof StatutValidation)[keyof typeof StatutValidation]

}

export type Civilite = $Enums.Civilite

export const Civilite: typeof $Enums.Civilite

export type TypeNavette = $Enums.TypeNavette

export const TypeNavette: typeof $Enums.TypeNavette

export type StatutDemande = $Enums.StatutDemande

export const StatutDemande: typeof $Enums.StatutDemande

export type StatutValidation = $Enums.StatutValidation

export const StatutValidation: typeof $Enums.StatutValidation

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Services
 * const services = await prisma.service.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Services
   * const services = await prisma.service.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fournisseur`: Exposes CRUD operations for the **Fournisseur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fournisseurs
    * const fournisseurs = await prisma.fournisseur.findMany()
    * ```
    */
  get fournisseur(): Prisma.FournisseurDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fonction`: Exposes CRUD operations for the **Fonction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fonctions
    * const fonctions = await prisma.fonction.findMany()
    * ```
    */
  get fonction(): Prisma.FonctionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.collaborateur`: Exposes CRUD operations for the **Collaborateur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Collaborateurs
    * const collaborateurs = await prisma.collaborateur.findMany()
    * ```
    */
  get collaborateur(): Prisma.CollaborateurDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comptesUtilisateurs`: Exposes CRUD operations for the **ComptesUtilisateurs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComptesUtilisateurs
    * const comptesUtilisateurs = await prisma.comptesUtilisateurs.findMany()
    * ```
    */
  get comptesUtilisateurs(): Prisma.ComptesUtilisateursDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roles`: Exposes CRUD operations for the **Roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.roles.findMany()
    * ```
    */
  get roles(): Prisma.RolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.collaborateurRoles`: Exposes CRUD operations for the **CollaborateurRoles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CollaborateurRoles
    * const collaborateurRoles = await prisma.collaborateurRoles.findMany()
    * ```
    */
  get collaborateurRoles(): Prisma.CollaborateurRolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.budget`: Exposes CRUD operations for the **Budget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Budgets
    * const budgets = await prisma.budget.findMany()
    * ```
    */
  get budget(): Prisma.BudgetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowEtapes`: Exposes CRUD operations for the **WorkflowEtapes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowEtapes
    * const workflowEtapes = await prisma.workflowEtapes.findMany()
    * ```
    */
  get workflowEtapes(): Prisma.WorkflowEtapesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.demandeur`: Exposes CRUD operations for the **Demandeur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Demandeurs
    * const demandeurs = await prisma.demandeur.findMany()
    * ```
    */
  get demandeur(): Prisma.DemandeurDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.historiqueValidation`: Exposes CRUD operations for the **HistoriqueValidation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HistoriqueValidations
    * const historiqueValidations = await prisma.historiqueValidation.findMany()
    * ```
    */
  get historiqueValidation(): Prisma.HistoriqueValidationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Service: 'Service',
    Fournisseur: 'Fournisseur',
    Fonction: 'Fonction',
    Collaborateur: 'Collaborateur',
    ComptesUtilisateurs: 'ComptesUtilisateurs',
    Roles: 'Roles',
    CollaborateurRoles: 'CollaborateurRoles',
    Budget: 'Budget',
    WorkflowEtapes: 'WorkflowEtapes',
    Demandeur: 'Demandeur',
    HistoriqueValidation: 'HistoriqueValidation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "service" | "fournisseur" | "fonction" | "collaborateur" | "comptesUtilisateurs" | "roles" | "collaborateurRoles" | "budget" | "workflowEtapes" | "demandeur" | "historiqueValidation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Fournisseur: {
        payload: Prisma.$FournisseurPayload<ExtArgs>
        fields: Prisma.FournisseurFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FournisseurFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FournisseurPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FournisseurFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FournisseurPayload>
          }
          findFirst: {
            args: Prisma.FournisseurFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FournisseurPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FournisseurFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FournisseurPayload>
          }
          findMany: {
            args: Prisma.FournisseurFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FournisseurPayload>[]
          }
          create: {
            args: Prisma.FournisseurCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FournisseurPayload>
          }
          createMany: {
            args: Prisma.FournisseurCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FournisseurDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FournisseurPayload>
          }
          update: {
            args: Prisma.FournisseurUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FournisseurPayload>
          }
          deleteMany: {
            args: Prisma.FournisseurDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FournisseurUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FournisseurUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FournisseurPayload>
          }
          aggregate: {
            args: Prisma.FournisseurAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFournisseur>
          }
          groupBy: {
            args: Prisma.FournisseurGroupByArgs<ExtArgs>
            result: $Utils.Optional<FournisseurGroupByOutputType>[]
          }
          count: {
            args: Prisma.FournisseurCountArgs<ExtArgs>
            result: $Utils.Optional<FournisseurCountAggregateOutputType> | number
          }
        }
      }
      Fonction: {
        payload: Prisma.$FonctionPayload<ExtArgs>
        fields: Prisma.FonctionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FonctionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FonctionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FonctionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FonctionPayload>
          }
          findFirst: {
            args: Prisma.FonctionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FonctionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FonctionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FonctionPayload>
          }
          findMany: {
            args: Prisma.FonctionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FonctionPayload>[]
          }
          create: {
            args: Prisma.FonctionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FonctionPayload>
          }
          createMany: {
            args: Prisma.FonctionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FonctionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FonctionPayload>
          }
          update: {
            args: Prisma.FonctionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FonctionPayload>
          }
          deleteMany: {
            args: Prisma.FonctionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FonctionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FonctionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FonctionPayload>
          }
          aggregate: {
            args: Prisma.FonctionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFonction>
          }
          groupBy: {
            args: Prisma.FonctionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FonctionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FonctionCountArgs<ExtArgs>
            result: $Utils.Optional<FonctionCountAggregateOutputType> | number
          }
        }
      }
      Collaborateur: {
        payload: Prisma.$CollaborateurPayload<ExtArgs>
        fields: Prisma.CollaborateurFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollaborateurFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollaborateurFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurPayload>
          }
          findFirst: {
            args: Prisma.CollaborateurFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollaborateurFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurPayload>
          }
          findMany: {
            args: Prisma.CollaborateurFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurPayload>[]
          }
          create: {
            args: Prisma.CollaborateurCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurPayload>
          }
          createMany: {
            args: Prisma.CollaborateurCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CollaborateurDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurPayload>
          }
          update: {
            args: Prisma.CollaborateurUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurPayload>
          }
          deleteMany: {
            args: Prisma.CollaborateurDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollaborateurUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CollaborateurUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurPayload>
          }
          aggregate: {
            args: Prisma.CollaborateurAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollaborateur>
          }
          groupBy: {
            args: Prisma.CollaborateurGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollaborateurGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollaborateurCountArgs<ExtArgs>
            result: $Utils.Optional<CollaborateurCountAggregateOutputType> | number
          }
        }
      }
      ComptesUtilisateurs: {
        payload: Prisma.$ComptesUtilisateursPayload<ExtArgs>
        fields: Prisma.ComptesUtilisateursFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComptesUtilisateursFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComptesUtilisateursPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComptesUtilisateursFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComptesUtilisateursPayload>
          }
          findFirst: {
            args: Prisma.ComptesUtilisateursFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComptesUtilisateursPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComptesUtilisateursFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComptesUtilisateursPayload>
          }
          findMany: {
            args: Prisma.ComptesUtilisateursFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComptesUtilisateursPayload>[]
          }
          create: {
            args: Prisma.ComptesUtilisateursCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComptesUtilisateursPayload>
          }
          createMany: {
            args: Prisma.ComptesUtilisateursCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ComptesUtilisateursDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComptesUtilisateursPayload>
          }
          update: {
            args: Prisma.ComptesUtilisateursUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComptesUtilisateursPayload>
          }
          deleteMany: {
            args: Prisma.ComptesUtilisateursDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComptesUtilisateursUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComptesUtilisateursUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComptesUtilisateursPayload>
          }
          aggregate: {
            args: Prisma.ComptesUtilisateursAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComptesUtilisateurs>
          }
          groupBy: {
            args: Prisma.ComptesUtilisateursGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComptesUtilisateursGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComptesUtilisateursCountArgs<ExtArgs>
            result: $Utils.Optional<ComptesUtilisateursCountAggregateOutputType> | number
          }
        }
      }
      Roles: {
        payload: Prisma.$RolesPayload<ExtArgs>
        fields: Prisma.RolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          findFirst: {
            args: Prisma.RolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          findMany: {
            args: Prisma.RolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>[]
          }
          create: {
            args: Prisma.RolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          createMany: {
            args: Prisma.RolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          update: {
            args: Prisma.RolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          deleteMany: {
            args: Prisma.RolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolesPayload>
          }
          aggregate: {
            args: Prisma.RolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoles>
          }
          groupBy: {
            args: Prisma.RolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolesCountArgs<ExtArgs>
            result: $Utils.Optional<RolesCountAggregateOutputType> | number
          }
        }
      }
      CollaborateurRoles: {
        payload: Prisma.$CollaborateurRolesPayload<ExtArgs>
        fields: Prisma.CollaborateurRolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollaborateurRolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurRolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollaborateurRolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurRolesPayload>
          }
          findFirst: {
            args: Prisma.CollaborateurRolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurRolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollaborateurRolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurRolesPayload>
          }
          findMany: {
            args: Prisma.CollaborateurRolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurRolesPayload>[]
          }
          create: {
            args: Prisma.CollaborateurRolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurRolesPayload>
          }
          createMany: {
            args: Prisma.CollaborateurRolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CollaborateurRolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurRolesPayload>
          }
          update: {
            args: Prisma.CollaborateurRolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurRolesPayload>
          }
          deleteMany: {
            args: Prisma.CollaborateurRolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollaborateurRolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CollaborateurRolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaborateurRolesPayload>
          }
          aggregate: {
            args: Prisma.CollaborateurRolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollaborateurRoles>
          }
          groupBy: {
            args: Prisma.CollaborateurRolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollaborateurRolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollaborateurRolesCountArgs<ExtArgs>
            result: $Utils.Optional<CollaborateurRolesCountAggregateOutputType> | number
          }
        }
      }
      Budget: {
        payload: Prisma.$BudgetPayload<ExtArgs>
        fields: Prisma.BudgetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BudgetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BudgetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findFirst: {
            args: Prisma.BudgetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BudgetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          findMany: {
            args: Prisma.BudgetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>[]
          }
          create: {
            args: Prisma.BudgetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          createMany: {
            args: Prisma.BudgetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BudgetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          update: {
            args: Prisma.BudgetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          deleteMany: {
            args: Prisma.BudgetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BudgetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BudgetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetPayload>
          }
          aggregate: {
            args: Prisma.BudgetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudget>
          }
          groupBy: {
            args: Prisma.BudgetGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetGroupByOutputType>[]
          }
          count: {
            args: Prisma.BudgetCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetCountAggregateOutputType> | number
          }
        }
      }
      WorkflowEtapes: {
        payload: Prisma.$WorkflowEtapesPayload<ExtArgs>
        fields: Prisma.WorkflowEtapesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowEtapesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEtapesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowEtapesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEtapesPayload>
          }
          findFirst: {
            args: Prisma.WorkflowEtapesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEtapesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowEtapesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEtapesPayload>
          }
          findMany: {
            args: Prisma.WorkflowEtapesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEtapesPayload>[]
          }
          create: {
            args: Prisma.WorkflowEtapesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEtapesPayload>
          }
          createMany: {
            args: Prisma.WorkflowEtapesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WorkflowEtapesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEtapesPayload>
          }
          update: {
            args: Prisma.WorkflowEtapesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEtapesPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowEtapesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowEtapesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkflowEtapesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEtapesPayload>
          }
          aggregate: {
            args: Prisma.WorkflowEtapesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowEtapes>
          }
          groupBy: {
            args: Prisma.WorkflowEtapesGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowEtapesGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowEtapesCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowEtapesCountAggregateOutputType> | number
          }
        }
      }
      Demandeur: {
        payload: Prisma.$DemandeurPayload<ExtArgs>
        fields: Prisma.DemandeurFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DemandeurFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeurPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DemandeurFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeurPayload>
          }
          findFirst: {
            args: Prisma.DemandeurFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeurPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DemandeurFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeurPayload>
          }
          findMany: {
            args: Prisma.DemandeurFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeurPayload>[]
          }
          create: {
            args: Prisma.DemandeurCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeurPayload>
          }
          createMany: {
            args: Prisma.DemandeurCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DemandeurDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeurPayload>
          }
          update: {
            args: Prisma.DemandeurUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeurPayload>
          }
          deleteMany: {
            args: Prisma.DemandeurDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DemandeurUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DemandeurUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeurPayload>
          }
          aggregate: {
            args: Prisma.DemandeurAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDemandeur>
          }
          groupBy: {
            args: Prisma.DemandeurGroupByArgs<ExtArgs>
            result: $Utils.Optional<DemandeurGroupByOutputType>[]
          }
          count: {
            args: Prisma.DemandeurCountArgs<ExtArgs>
            result: $Utils.Optional<DemandeurCountAggregateOutputType> | number
          }
        }
      }
      HistoriqueValidation: {
        payload: Prisma.$HistoriqueValidationPayload<ExtArgs>
        fields: Prisma.HistoriqueValidationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HistoriqueValidationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoriqueValidationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HistoriqueValidationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoriqueValidationPayload>
          }
          findFirst: {
            args: Prisma.HistoriqueValidationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoriqueValidationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HistoriqueValidationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoriqueValidationPayload>
          }
          findMany: {
            args: Prisma.HistoriqueValidationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoriqueValidationPayload>[]
          }
          create: {
            args: Prisma.HistoriqueValidationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoriqueValidationPayload>
          }
          createMany: {
            args: Prisma.HistoriqueValidationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HistoriqueValidationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoriqueValidationPayload>
          }
          update: {
            args: Prisma.HistoriqueValidationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoriqueValidationPayload>
          }
          deleteMany: {
            args: Prisma.HistoriqueValidationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HistoriqueValidationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HistoriqueValidationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoriqueValidationPayload>
          }
          aggregate: {
            args: Prisma.HistoriqueValidationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHistoriqueValidation>
          }
          groupBy: {
            args: Prisma.HistoriqueValidationGroupByArgs<ExtArgs>
            result: $Utils.Optional<HistoriqueValidationGroupByOutputType>[]
          }
          count: {
            args: Prisma.HistoriqueValidationCountArgs<ExtArgs>
            result: $Utils.Optional<HistoriqueValidationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    service?: ServiceOmit
    fournisseur?: FournisseurOmit
    fonction?: FonctionOmit
    collaborateur?: CollaborateurOmit
    comptesUtilisateurs?: ComptesUtilisateursOmit
    roles?: RolesOmit
    collaborateurRoles?: CollaborateurRolesOmit
    budget?: BudgetOmit
    workflowEtapes?: WorkflowEtapesOmit
    demandeur?: DemandeurOmit
    historiqueValidation?: HistoriqueValidationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    budgets: number
    collaborateurs: number
    fonctions: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | ServiceCountOutputTypeCountBudgetsArgs
    collaborateurs?: boolean | ServiceCountOutputTypeCountCollaborateursArgs
    fonctions?: boolean | ServiceCountOutputTypeCountFonctionsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountCollaborateursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaborateurWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountFonctionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FonctionWhereInput
  }


  /**
   * Count Type FournisseurCountOutputType
   */

  export type FournisseurCountOutputType = {
    demandes: number
  }

  export type FournisseurCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandes?: boolean | FournisseurCountOutputTypeCountDemandesArgs
  }

  // Custom InputTypes
  /**
   * FournisseurCountOutputType without action
   */
  export type FournisseurCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FournisseurCountOutputType
     */
    select?: FournisseurCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FournisseurCountOutputType without action
   */
  export type FournisseurCountOutputTypeCountDemandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DemandeurWhereInput
  }


  /**
   * Count Type FonctionCountOutputType
   */

  export type FonctionCountOutputType = {
    collaborateurs: number
  }

  export type FonctionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborateurs?: boolean | FonctionCountOutputTypeCountCollaborateursArgs
  }

  // Custom InputTypes
  /**
   * FonctionCountOutputType without action
   */
  export type FonctionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FonctionCountOutputType
     */
    select?: FonctionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FonctionCountOutputType without action
   */
  export type FonctionCountOutputTypeCountCollaborateursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaborateurWhereInput
  }


  /**
   * Count Type CollaborateurCountOutputType
   */

  export type CollaborateurCountOutputType = {
    collaborateurRoles: number
    demandes: number
    fonctionsChef: number
    historiqueValide: number
    servicesChef: number
  }

  export type CollaborateurCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborateurRoles?: boolean | CollaborateurCountOutputTypeCountCollaborateurRolesArgs
    demandes?: boolean | CollaborateurCountOutputTypeCountDemandesArgs
    fonctionsChef?: boolean | CollaborateurCountOutputTypeCountFonctionsChefArgs
    historiqueValide?: boolean | CollaborateurCountOutputTypeCountHistoriqueValideArgs
    servicesChef?: boolean | CollaborateurCountOutputTypeCountServicesChefArgs
  }

  // Custom InputTypes
  /**
   * CollaborateurCountOutputType without action
   */
  export type CollaborateurCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurCountOutputType
     */
    select?: CollaborateurCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CollaborateurCountOutputType without action
   */
  export type CollaborateurCountOutputTypeCountCollaborateurRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaborateurRolesWhereInput
  }

  /**
   * CollaborateurCountOutputType without action
   */
  export type CollaborateurCountOutputTypeCountDemandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DemandeurWhereInput
  }

  /**
   * CollaborateurCountOutputType without action
   */
  export type CollaborateurCountOutputTypeCountFonctionsChefArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FonctionWhereInput
  }

  /**
   * CollaborateurCountOutputType without action
   */
  export type CollaborateurCountOutputTypeCountHistoriqueValideArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistoriqueValidationWhereInput
  }

  /**
   * CollaborateurCountOutputType without action
   */
  export type CollaborateurCountOutputTypeCountServicesChefArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Count Type RolesCountOutputType
   */

  export type RolesCountOutputType = {
    collaborateurRoles: number
  }

  export type RolesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborateurRoles?: boolean | RolesCountOutputTypeCountCollaborateurRolesArgs
  }

  // Custom InputTypes
  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolesCountOutputType
     */
    select?: RolesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeCountCollaborateurRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaborateurRolesWhereInput
  }


  /**
   * Count Type BudgetCountOutputType
   */

  export type BudgetCountOutputType = {
    demandes: number
  }

  export type BudgetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandes?: boolean | BudgetCountOutputTypeCountDemandesArgs
  }

  // Custom InputTypes
  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetCountOutputType
     */
    select?: BudgetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BudgetCountOutputType without action
   */
  export type BudgetCountOutputTypeCountDemandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DemandeurWhereInput
  }


  /**
   * Count Type DemandeurCountOutputType
   */

  export type DemandeurCountOutputType = {
    historique: number
  }

  export type DemandeurCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    historique?: boolean | DemandeurCountOutputTypeCountHistoriqueArgs
  }

  // Custom InputTypes
  /**
   * DemandeurCountOutputType without action
   */
  export type DemandeurCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeurCountOutputType
     */
    select?: DemandeurCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DemandeurCountOutputType without action
   */
  export type DemandeurCountOutputTypeCountHistoriqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistoriqueValidationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    id: number | null
  }

  export type ServiceSumAggregateOutputType = {
    id: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: number | null
    nomService: string | null
    abreviation: string | null
    chefServiceMatricule: string | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: number | null
    nomService: string | null
    abreviation: string | null
    chefServiceMatricule: string | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    nomService: number
    abreviation: number
    chefServiceMatricule: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    id?: true
  }

  export type ServiceSumAggregateInputType = {
    id?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    nomService?: true
    abreviation?: true
    chefServiceMatricule?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    nomService?: true
    abreviation?: true
    chefServiceMatricule?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    nomService?: true
    abreviation?: true
    chefServiceMatricule?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: number
    nomService: string
    abreviation: string | null
    chefServiceMatricule: string | null
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomService?: boolean
    abreviation?: boolean
    chefServiceMatricule?: boolean
    budgets?: boolean | Service$budgetsArgs<ExtArgs>
    collaborateurs?: boolean | Service$collaborateursArgs<ExtArgs>
    fonctions?: boolean | Service$fonctionsArgs<ExtArgs>
    chef?: boolean | Service$chefArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>



  export type ServiceSelectScalar = {
    id?: boolean
    nomService?: boolean
    abreviation?: boolean
    chefServiceMatricule?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nomService" | "abreviation" | "chefServiceMatricule", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    budgets?: boolean | Service$budgetsArgs<ExtArgs>
    collaborateurs?: boolean | Service$collaborateursArgs<ExtArgs>
    fonctions?: boolean | Service$fonctionsArgs<ExtArgs>
    chef?: boolean | Service$chefArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      budgets: Prisma.$BudgetPayload<ExtArgs>[]
      collaborateurs: Prisma.$CollaborateurPayload<ExtArgs>[]
      fonctions: Prisma.$FonctionPayload<ExtArgs>[]
      chef: Prisma.$CollaborateurPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nomService: string
      abreviation: string | null
      chefServiceMatricule: string | null
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    budgets<T extends Service$budgetsArgs<ExtArgs> = {}>(args?: Subset<T, Service$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    collaborateurs<T extends Service$collaborateursArgs<ExtArgs> = {}>(args?: Subset<T, Service$collaborateursArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fonctions<T extends Service$fonctionsArgs<ExtArgs> = {}>(args?: Subset<T, Service$fonctionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chef<T extends Service$chefArgs<ExtArgs> = {}>(args?: Subset<T, Service$chefArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'Int'>
    readonly nomService: FieldRef<"Service", 'String'>
    readonly abreviation: FieldRef<"Service", 'String'>
    readonly chefServiceMatricule: FieldRef<"Service", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.budgets
   */
  export type Service$budgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    cursor?: BudgetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Service.collaborateurs
   */
  export type Service$collaborateursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    where?: CollaborateurWhereInput
    orderBy?: CollaborateurOrderByWithRelationInput | CollaborateurOrderByWithRelationInput[]
    cursor?: CollaborateurWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CollaborateurScalarFieldEnum | CollaborateurScalarFieldEnum[]
  }

  /**
   * Service.fonctions
   */
  export type Service$fonctionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    where?: FonctionWhereInput
    orderBy?: FonctionOrderByWithRelationInput | FonctionOrderByWithRelationInput[]
    cursor?: FonctionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FonctionScalarFieldEnum | FonctionScalarFieldEnum[]
  }

  /**
   * Service.chef
   */
  export type Service$chefArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    where?: CollaborateurWhereInput
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model Fournisseur
   */

  export type AggregateFournisseur = {
    _count: FournisseurCountAggregateOutputType | null
    _avg: FournisseurAvgAggregateOutputType | null
    _sum: FournisseurSumAggregateOutputType | null
    _min: FournisseurMinAggregateOutputType | null
    _max: FournisseurMaxAggregateOutputType | null
  }

  export type FournisseurAvgAggregateOutputType = {
    id: number | null
  }

  export type FournisseurSumAggregateOutputType = {
    id: number | null
  }

  export type FournisseurMinAggregateOutputType = {
    id: number | null
    nom: string | null
    adresse: string | null
    nomCheque: string | null
    nif: string | null
    cin: string | null
  }

  export type FournisseurMaxAggregateOutputType = {
    id: number | null
    nom: string | null
    adresse: string | null
    nomCheque: string | null
    nif: string | null
    cin: string | null
  }

  export type FournisseurCountAggregateOutputType = {
    id: number
    nom: number
    adresse: number
    nomCheque: number
    nif: number
    cin: number
    _all: number
  }


  export type FournisseurAvgAggregateInputType = {
    id?: true
  }

  export type FournisseurSumAggregateInputType = {
    id?: true
  }

  export type FournisseurMinAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    nomCheque?: true
    nif?: true
    cin?: true
  }

  export type FournisseurMaxAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    nomCheque?: true
    nif?: true
    cin?: true
  }

  export type FournisseurCountAggregateInputType = {
    id?: true
    nom?: true
    adresse?: true
    nomCheque?: true
    nif?: true
    cin?: true
    _all?: true
  }

  export type FournisseurAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fournisseur to aggregate.
     */
    where?: FournisseurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fournisseurs to fetch.
     */
    orderBy?: FournisseurOrderByWithRelationInput | FournisseurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FournisseurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fournisseurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fournisseurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fournisseurs
    **/
    _count?: true | FournisseurCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FournisseurAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FournisseurSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FournisseurMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FournisseurMaxAggregateInputType
  }

  export type GetFournisseurAggregateType<T extends FournisseurAggregateArgs> = {
        [P in keyof T & keyof AggregateFournisseur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFournisseur[P]>
      : GetScalarType<T[P], AggregateFournisseur[P]>
  }




  export type FournisseurGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FournisseurWhereInput
    orderBy?: FournisseurOrderByWithAggregationInput | FournisseurOrderByWithAggregationInput[]
    by: FournisseurScalarFieldEnum[] | FournisseurScalarFieldEnum
    having?: FournisseurScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FournisseurCountAggregateInputType | true
    _avg?: FournisseurAvgAggregateInputType
    _sum?: FournisseurSumAggregateInputType
    _min?: FournisseurMinAggregateInputType
    _max?: FournisseurMaxAggregateInputType
  }

  export type FournisseurGroupByOutputType = {
    id: number
    nom: string | null
    adresse: string | null
    nomCheque: string | null
    nif: string | null
    cin: string | null
    _count: FournisseurCountAggregateOutputType | null
    _avg: FournisseurAvgAggregateOutputType | null
    _sum: FournisseurSumAggregateOutputType | null
    _min: FournisseurMinAggregateOutputType | null
    _max: FournisseurMaxAggregateOutputType | null
  }

  type GetFournisseurGroupByPayload<T extends FournisseurGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FournisseurGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FournisseurGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FournisseurGroupByOutputType[P]>
            : GetScalarType<T[P], FournisseurGroupByOutputType[P]>
        }
      >
    >


  export type FournisseurSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    adresse?: boolean
    nomCheque?: boolean
    nif?: boolean
    cin?: boolean
    demandes?: boolean | Fournisseur$demandesArgs<ExtArgs>
    _count?: boolean | FournisseurCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fournisseur"]>



  export type FournisseurSelectScalar = {
    id?: boolean
    nom?: boolean
    adresse?: boolean
    nomCheque?: boolean
    nif?: boolean
    cin?: boolean
  }

  export type FournisseurOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "adresse" | "nomCheque" | "nif" | "cin", ExtArgs["result"]["fournisseur"]>
  export type FournisseurInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandes?: boolean | Fournisseur$demandesArgs<ExtArgs>
    _count?: boolean | FournisseurCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FournisseurPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fournisseur"
    objects: {
      demandes: Prisma.$DemandeurPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nom: string | null
      adresse: string | null
      nomCheque: string | null
      nif: string | null
      cin: string | null
    }, ExtArgs["result"]["fournisseur"]>
    composites: {}
  }

  type FournisseurGetPayload<S extends boolean | null | undefined | FournisseurDefaultArgs> = $Result.GetResult<Prisma.$FournisseurPayload, S>

  type FournisseurCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FournisseurFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FournisseurCountAggregateInputType | true
    }

  export interface FournisseurDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fournisseur'], meta: { name: 'Fournisseur' } }
    /**
     * Find zero or one Fournisseur that matches the filter.
     * @param {FournisseurFindUniqueArgs} args - Arguments to find a Fournisseur
     * @example
     * // Get one Fournisseur
     * const fournisseur = await prisma.fournisseur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FournisseurFindUniqueArgs>(args: SelectSubset<T, FournisseurFindUniqueArgs<ExtArgs>>): Prisma__FournisseurClient<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fournisseur that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FournisseurFindUniqueOrThrowArgs} args - Arguments to find a Fournisseur
     * @example
     * // Get one Fournisseur
     * const fournisseur = await prisma.fournisseur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FournisseurFindUniqueOrThrowArgs>(args: SelectSubset<T, FournisseurFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FournisseurClient<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fournisseur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FournisseurFindFirstArgs} args - Arguments to find a Fournisseur
     * @example
     * // Get one Fournisseur
     * const fournisseur = await prisma.fournisseur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FournisseurFindFirstArgs>(args?: SelectSubset<T, FournisseurFindFirstArgs<ExtArgs>>): Prisma__FournisseurClient<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fournisseur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FournisseurFindFirstOrThrowArgs} args - Arguments to find a Fournisseur
     * @example
     * // Get one Fournisseur
     * const fournisseur = await prisma.fournisseur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FournisseurFindFirstOrThrowArgs>(args?: SelectSubset<T, FournisseurFindFirstOrThrowArgs<ExtArgs>>): Prisma__FournisseurClient<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fournisseurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FournisseurFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fournisseurs
     * const fournisseurs = await prisma.fournisseur.findMany()
     * 
     * // Get first 10 Fournisseurs
     * const fournisseurs = await prisma.fournisseur.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fournisseurWithIdOnly = await prisma.fournisseur.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FournisseurFindManyArgs>(args?: SelectSubset<T, FournisseurFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fournisseur.
     * @param {FournisseurCreateArgs} args - Arguments to create a Fournisseur.
     * @example
     * // Create one Fournisseur
     * const Fournisseur = await prisma.fournisseur.create({
     *   data: {
     *     // ... data to create a Fournisseur
     *   }
     * })
     * 
     */
    create<T extends FournisseurCreateArgs>(args: SelectSubset<T, FournisseurCreateArgs<ExtArgs>>): Prisma__FournisseurClient<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fournisseurs.
     * @param {FournisseurCreateManyArgs} args - Arguments to create many Fournisseurs.
     * @example
     * // Create many Fournisseurs
     * const fournisseur = await prisma.fournisseur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FournisseurCreateManyArgs>(args?: SelectSubset<T, FournisseurCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Fournisseur.
     * @param {FournisseurDeleteArgs} args - Arguments to delete one Fournisseur.
     * @example
     * // Delete one Fournisseur
     * const Fournisseur = await prisma.fournisseur.delete({
     *   where: {
     *     // ... filter to delete one Fournisseur
     *   }
     * })
     * 
     */
    delete<T extends FournisseurDeleteArgs>(args: SelectSubset<T, FournisseurDeleteArgs<ExtArgs>>): Prisma__FournisseurClient<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fournisseur.
     * @param {FournisseurUpdateArgs} args - Arguments to update one Fournisseur.
     * @example
     * // Update one Fournisseur
     * const fournisseur = await prisma.fournisseur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FournisseurUpdateArgs>(args: SelectSubset<T, FournisseurUpdateArgs<ExtArgs>>): Prisma__FournisseurClient<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fournisseurs.
     * @param {FournisseurDeleteManyArgs} args - Arguments to filter Fournisseurs to delete.
     * @example
     * // Delete a few Fournisseurs
     * const { count } = await prisma.fournisseur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FournisseurDeleteManyArgs>(args?: SelectSubset<T, FournisseurDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fournisseurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FournisseurUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fournisseurs
     * const fournisseur = await prisma.fournisseur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FournisseurUpdateManyArgs>(args: SelectSubset<T, FournisseurUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Fournisseur.
     * @param {FournisseurUpsertArgs} args - Arguments to update or create a Fournisseur.
     * @example
     * // Update or create a Fournisseur
     * const fournisseur = await prisma.fournisseur.upsert({
     *   create: {
     *     // ... data to create a Fournisseur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fournisseur we want to update
     *   }
     * })
     */
    upsert<T extends FournisseurUpsertArgs>(args: SelectSubset<T, FournisseurUpsertArgs<ExtArgs>>): Prisma__FournisseurClient<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fournisseurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FournisseurCountArgs} args - Arguments to filter Fournisseurs to count.
     * @example
     * // Count the number of Fournisseurs
     * const count = await prisma.fournisseur.count({
     *   where: {
     *     // ... the filter for the Fournisseurs we want to count
     *   }
     * })
    **/
    count<T extends FournisseurCountArgs>(
      args?: Subset<T, FournisseurCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FournisseurCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fournisseur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FournisseurAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FournisseurAggregateArgs>(args: Subset<T, FournisseurAggregateArgs>): Prisma.PrismaPromise<GetFournisseurAggregateType<T>>

    /**
     * Group by Fournisseur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FournisseurGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FournisseurGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FournisseurGroupByArgs['orderBy'] }
        : { orderBy?: FournisseurGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FournisseurGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFournisseurGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fournisseur model
   */
  readonly fields: FournisseurFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fournisseur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FournisseurClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    demandes<T extends Fournisseur$demandesArgs<ExtArgs> = {}>(args?: Subset<T, Fournisseur$demandesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fournisseur model
   */
  interface FournisseurFieldRefs {
    readonly id: FieldRef<"Fournisseur", 'Int'>
    readonly nom: FieldRef<"Fournisseur", 'String'>
    readonly adresse: FieldRef<"Fournisseur", 'String'>
    readonly nomCheque: FieldRef<"Fournisseur", 'String'>
    readonly nif: FieldRef<"Fournisseur", 'String'>
    readonly cin: FieldRef<"Fournisseur", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Fournisseur findUnique
   */
  export type FournisseurFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    /**
     * Filter, which Fournisseur to fetch.
     */
    where: FournisseurWhereUniqueInput
  }

  /**
   * Fournisseur findUniqueOrThrow
   */
  export type FournisseurFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    /**
     * Filter, which Fournisseur to fetch.
     */
    where: FournisseurWhereUniqueInput
  }

  /**
   * Fournisseur findFirst
   */
  export type FournisseurFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    /**
     * Filter, which Fournisseur to fetch.
     */
    where?: FournisseurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fournisseurs to fetch.
     */
    orderBy?: FournisseurOrderByWithRelationInput | FournisseurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fournisseurs.
     */
    cursor?: FournisseurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fournisseurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fournisseurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fournisseurs.
     */
    distinct?: FournisseurScalarFieldEnum | FournisseurScalarFieldEnum[]
  }

  /**
   * Fournisseur findFirstOrThrow
   */
  export type FournisseurFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    /**
     * Filter, which Fournisseur to fetch.
     */
    where?: FournisseurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fournisseurs to fetch.
     */
    orderBy?: FournisseurOrderByWithRelationInput | FournisseurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fournisseurs.
     */
    cursor?: FournisseurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fournisseurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fournisseurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fournisseurs.
     */
    distinct?: FournisseurScalarFieldEnum | FournisseurScalarFieldEnum[]
  }

  /**
   * Fournisseur findMany
   */
  export type FournisseurFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    /**
     * Filter, which Fournisseurs to fetch.
     */
    where?: FournisseurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fournisseurs to fetch.
     */
    orderBy?: FournisseurOrderByWithRelationInput | FournisseurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fournisseurs.
     */
    cursor?: FournisseurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fournisseurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fournisseurs.
     */
    skip?: number
    distinct?: FournisseurScalarFieldEnum | FournisseurScalarFieldEnum[]
  }

  /**
   * Fournisseur create
   */
  export type FournisseurCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    /**
     * The data needed to create a Fournisseur.
     */
    data?: XOR<FournisseurCreateInput, FournisseurUncheckedCreateInput>
  }

  /**
   * Fournisseur createMany
   */
  export type FournisseurCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fournisseurs.
     */
    data: FournisseurCreateManyInput | FournisseurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fournisseur update
   */
  export type FournisseurUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    /**
     * The data needed to update a Fournisseur.
     */
    data: XOR<FournisseurUpdateInput, FournisseurUncheckedUpdateInput>
    /**
     * Choose, which Fournisseur to update.
     */
    where: FournisseurWhereUniqueInput
  }

  /**
   * Fournisseur updateMany
   */
  export type FournisseurUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fournisseurs.
     */
    data: XOR<FournisseurUpdateManyMutationInput, FournisseurUncheckedUpdateManyInput>
    /**
     * Filter which Fournisseurs to update
     */
    where?: FournisseurWhereInput
    /**
     * Limit how many Fournisseurs to update.
     */
    limit?: number
  }

  /**
   * Fournisseur upsert
   */
  export type FournisseurUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    /**
     * The filter to search for the Fournisseur to update in case it exists.
     */
    where: FournisseurWhereUniqueInput
    /**
     * In case the Fournisseur found by the `where` argument doesn't exist, create a new Fournisseur with this data.
     */
    create: XOR<FournisseurCreateInput, FournisseurUncheckedCreateInput>
    /**
     * In case the Fournisseur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FournisseurUpdateInput, FournisseurUncheckedUpdateInput>
  }

  /**
   * Fournisseur delete
   */
  export type FournisseurDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    /**
     * Filter which Fournisseur to delete.
     */
    where: FournisseurWhereUniqueInput
  }

  /**
   * Fournisseur deleteMany
   */
  export type FournisseurDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fournisseurs to delete
     */
    where?: FournisseurWhereInput
    /**
     * Limit how many Fournisseurs to delete.
     */
    limit?: number
  }

  /**
   * Fournisseur.demandes
   */
  export type Fournisseur$demandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    where?: DemandeurWhereInput
    orderBy?: DemandeurOrderByWithRelationInput | DemandeurOrderByWithRelationInput[]
    cursor?: DemandeurWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DemandeurScalarFieldEnum | DemandeurScalarFieldEnum[]
  }

  /**
   * Fournisseur without action
   */
  export type FournisseurDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
  }


  /**
   * Model Fonction
   */

  export type AggregateFonction = {
    _count: FonctionCountAggregateOutputType | null
    _avg: FonctionAvgAggregateOutputType | null
    _sum: FonctionSumAggregateOutputType | null
    _min: FonctionMinAggregateOutputType | null
    _max: FonctionMaxAggregateOutputType | null
  }

  export type FonctionAvgAggregateOutputType = {
    id: number | null
    serviceId: number | null
  }

  export type FonctionSumAggregateOutputType = {
    id: number | null
    serviceId: number | null
  }

  export type FonctionMinAggregateOutputType = {
    id: number | null
    nomFonction: string | null
    abreviation: string | null
    serviceId: number | null
    chefMatricule: string | null
  }

  export type FonctionMaxAggregateOutputType = {
    id: number | null
    nomFonction: string | null
    abreviation: string | null
    serviceId: number | null
    chefMatricule: string | null
  }

  export type FonctionCountAggregateOutputType = {
    id: number
    nomFonction: number
    abreviation: number
    serviceId: number
    chefMatricule: number
    _all: number
  }


  export type FonctionAvgAggregateInputType = {
    id?: true
    serviceId?: true
  }

  export type FonctionSumAggregateInputType = {
    id?: true
    serviceId?: true
  }

  export type FonctionMinAggregateInputType = {
    id?: true
    nomFonction?: true
    abreviation?: true
    serviceId?: true
    chefMatricule?: true
  }

  export type FonctionMaxAggregateInputType = {
    id?: true
    nomFonction?: true
    abreviation?: true
    serviceId?: true
    chefMatricule?: true
  }

  export type FonctionCountAggregateInputType = {
    id?: true
    nomFonction?: true
    abreviation?: true
    serviceId?: true
    chefMatricule?: true
    _all?: true
  }

  export type FonctionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fonction to aggregate.
     */
    where?: FonctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fonctions to fetch.
     */
    orderBy?: FonctionOrderByWithRelationInput | FonctionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FonctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fonctions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fonctions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fonctions
    **/
    _count?: true | FonctionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FonctionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FonctionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FonctionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FonctionMaxAggregateInputType
  }

  export type GetFonctionAggregateType<T extends FonctionAggregateArgs> = {
        [P in keyof T & keyof AggregateFonction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFonction[P]>
      : GetScalarType<T[P], AggregateFonction[P]>
  }




  export type FonctionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FonctionWhereInput
    orderBy?: FonctionOrderByWithAggregationInput | FonctionOrderByWithAggregationInput[]
    by: FonctionScalarFieldEnum[] | FonctionScalarFieldEnum
    having?: FonctionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FonctionCountAggregateInputType | true
    _avg?: FonctionAvgAggregateInputType
    _sum?: FonctionSumAggregateInputType
    _min?: FonctionMinAggregateInputType
    _max?: FonctionMaxAggregateInputType
  }

  export type FonctionGroupByOutputType = {
    id: number
    nomFonction: string
    abreviation: string | null
    serviceId: number | null
    chefMatricule: string | null
    _count: FonctionCountAggregateOutputType | null
    _avg: FonctionAvgAggregateOutputType | null
    _sum: FonctionSumAggregateOutputType | null
    _min: FonctionMinAggregateOutputType | null
    _max: FonctionMaxAggregateOutputType | null
  }

  type GetFonctionGroupByPayload<T extends FonctionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FonctionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FonctionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FonctionGroupByOutputType[P]>
            : GetScalarType<T[P], FonctionGroupByOutputType[P]>
        }
      >
    >


  export type FonctionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomFonction?: boolean
    abreviation?: boolean
    serviceId?: boolean
    chefMatricule?: boolean
    collaborateurs?: boolean | Fonction$collaborateursArgs<ExtArgs>
    chef?: boolean | Fonction$chefArgs<ExtArgs>
    service?: boolean | Fonction$serviceArgs<ExtArgs>
    _count?: boolean | FonctionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fonction"]>



  export type FonctionSelectScalar = {
    id?: boolean
    nomFonction?: boolean
    abreviation?: boolean
    serviceId?: boolean
    chefMatricule?: boolean
  }

  export type FonctionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nomFonction" | "abreviation" | "serviceId" | "chefMatricule", ExtArgs["result"]["fonction"]>
  export type FonctionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborateurs?: boolean | Fonction$collaborateursArgs<ExtArgs>
    chef?: boolean | Fonction$chefArgs<ExtArgs>
    service?: boolean | Fonction$serviceArgs<ExtArgs>
    _count?: boolean | FonctionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FonctionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fonction"
    objects: {
      collaborateurs: Prisma.$CollaborateurPayload<ExtArgs>[]
      chef: Prisma.$CollaborateurPayload<ExtArgs> | null
      service: Prisma.$ServicePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nomFonction: string
      abreviation: string | null
      serviceId: number | null
      chefMatricule: string | null
    }, ExtArgs["result"]["fonction"]>
    composites: {}
  }

  type FonctionGetPayload<S extends boolean | null | undefined | FonctionDefaultArgs> = $Result.GetResult<Prisma.$FonctionPayload, S>

  type FonctionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FonctionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FonctionCountAggregateInputType | true
    }

  export interface FonctionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fonction'], meta: { name: 'Fonction' } }
    /**
     * Find zero or one Fonction that matches the filter.
     * @param {FonctionFindUniqueArgs} args - Arguments to find a Fonction
     * @example
     * // Get one Fonction
     * const fonction = await prisma.fonction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FonctionFindUniqueArgs>(args: SelectSubset<T, FonctionFindUniqueArgs<ExtArgs>>): Prisma__FonctionClient<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fonction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FonctionFindUniqueOrThrowArgs} args - Arguments to find a Fonction
     * @example
     * // Get one Fonction
     * const fonction = await prisma.fonction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FonctionFindUniqueOrThrowArgs>(args: SelectSubset<T, FonctionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FonctionClient<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fonction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FonctionFindFirstArgs} args - Arguments to find a Fonction
     * @example
     * // Get one Fonction
     * const fonction = await prisma.fonction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FonctionFindFirstArgs>(args?: SelectSubset<T, FonctionFindFirstArgs<ExtArgs>>): Prisma__FonctionClient<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fonction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FonctionFindFirstOrThrowArgs} args - Arguments to find a Fonction
     * @example
     * // Get one Fonction
     * const fonction = await prisma.fonction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FonctionFindFirstOrThrowArgs>(args?: SelectSubset<T, FonctionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FonctionClient<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fonctions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FonctionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fonctions
     * const fonctions = await prisma.fonction.findMany()
     * 
     * // Get first 10 Fonctions
     * const fonctions = await prisma.fonction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fonctionWithIdOnly = await prisma.fonction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FonctionFindManyArgs>(args?: SelectSubset<T, FonctionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fonction.
     * @param {FonctionCreateArgs} args - Arguments to create a Fonction.
     * @example
     * // Create one Fonction
     * const Fonction = await prisma.fonction.create({
     *   data: {
     *     // ... data to create a Fonction
     *   }
     * })
     * 
     */
    create<T extends FonctionCreateArgs>(args: SelectSubset<T, FonctionCreateArgs<ExtArgs>>): Prisma__FonctionClient<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fonctions.
     * @param {FonctionCreateManyArgs} args - Arguments to create many Fonctions.
     * @example
     * // Create many Fonctions
     * const fonction = await prisma.fonction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FonctionCreateManyArgs>(args?: SelectSubset<T, FonctionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Fonction.
     * @param {FonctionDeleteArgs} args - Arguments to delete one Fonction.
     * @example
     * // Delete one Fonction
     * const Fonction = await prisma.fonction.delete({
     *   where: {
     *     // ... filter to delete one Fonction
     *   }
     * })
     * 
     */
    delete<T extends FonctionDeleteArgs>(args: SelectSubset<T, FonctionDeleteArgs<ExtArgs>>): Prisma__FonctionClient<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fonction.
     * @param {FonctionUpdateArgs} args - Arguments to update one Fonction.
     * @example
     * // Update one Fonction
     * const fonction = await prisma.fonction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FonctionUpdateArgs>(args: SelectSubset<T, FonctionUpdateArgs<ExtArgs>>): Prisma__FonctionClient<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fonctions.
     * @param {FonctionDeleteManyArgs} args - Arguments to filter Fonctions to delete.
     * @example
     * // Delete a few Fonctions
     * const { count } = await prisma.fonction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FonctionDeleteManyArgs>(args?: SelectSubset<T, FonctionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fonctions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FonctionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fonctions
     * const fonction = await prisma.fonction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FonctionUpdateManyArgs>(args: SelectSubset<T, FonctionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Fonction.
     * @param {FonctionUpsertArgs} args - Arguments to update or create a Fonction.
     * @example
     * // Update or create a Fonction
     * const fonction = await prisma.fonction.upsert({
     *   create: {
     *     // ... data to create a Fonction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fonction we want to update
     *   }
     * })
     */
    upsert<T extends FonctionUpsertArgs>(args: SelectSubset<T, FonctionUpsertArgs<ExtArgs>>): Prisma__FonctionClient<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fonctions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FonctionCountArgs} args - Arguments to filter Fonctions to count.
     * @example
     * // Count the number of Fonctions
     * const count = await prisma.fonction.count({
     *   where: {
     *     // ... the filter for the Fonctions we want to count
     *   }
     * })
    **/
    count<T extends FonctionCountArgs>(
      args?: Subset<T, FonctionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FonctionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fonction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FonctionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FonctionAggregateArgs>(args: Subset<T, FonctionAggregateArgs>): Prisma.PrismaPromise<GetFonctionAggregateType<T>>

    /**
     * Group by Fonction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FonctionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FonctionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FonctionGroupByArgs['orderBy'] }
        : { orderBy?: FonctionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FonctionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFonctionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fonction model
   */
  readonly fields: FonctionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fonction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FonctionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collaborateurs<T extends Fonction$collaborateursArgs<ExtArgs> = {}>(args?: Subset<T, Fonction$collaborateursArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chef<T extends Fonction$chefArgs<ExtArgs> = {}>(args?: Subset<T, Fonction$chefArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    service<T extends Fonction$serviceArgs<ExtArgs> = {}>(args?: Subset<T, Fonction$serviceArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fonction model
   */
  interface FonctionFieldRefs {
    readonly id: FieldRef<"Fonction", 'Int'>
    readonly nomFonction: FieldRef<"Fonction", 'String'>
    readonly abreviation: FieldRef<"Fonction", 'String'>
    readonly serviceId: FieldRef<"Fonction", 'Int'>
    readonly chefMatricule: FieldRef<"Fonction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Fonction findUnique
   */
  export type FonctionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    /**
     * Filter, which Fonction to fetch.
     */
    where: FonctionWhereUniqueInput
  }

  /**
   * Fonction findUniqueOrThrow
   */
  export type FonctionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    /**
     * Filter, which Fonction to fetch.
     */
    where: FonctionWhereUniqueInput
  }

  /**
   * Fonction findFirst
   */
  export type FonctionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    /**
     * Filter, which Fonction to fetch.
     */
    where?: FonctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fonctions to fetch.
     */
    orderBy?: FonctionOrderByWithRelationInput | FonctionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fonctions.
     */
    cursor?: FonctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fonctions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fonctions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fonctions.
     */
    distinct?: FonctionScalarFieldEnum | FonctionScalarFieldEnum[]
  }

  /**
   * Fonction findFirstOrThrow
   */
  export type FonctionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    /**
     * Filter, which Fonction to fetch.
     */
    where?: FonctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fonctions to fetch.
     */
    orderBy?: FonctionOrderByWithRelationInput | FonctionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fonctions.
     */
    cursor?: FonctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fonctions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fonctions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fonctions.
     */
    distinct?: FonctionScalarFieldEnum | FonctionScalarFieldEnum[]
  }

  /**
   * Fonction findMany
   */
  export type FonctionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    /**
     * Filter, which Fonctions to fetch.
     */
    where?: FonctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fonctions to fetch.
     */
    orderBy?: FonctionOrderByWithRelationInput | FonctionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fonctions.
     */
    cursor?: FonctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fonctions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fonctions.
     */
    skip?: number
    distinct?: FonctionScalarFieldEnum | FonctionScalarFieldEnum[]
  }

  /**
   * Fonction create
   */
  export type FonctionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    /**
     * The data needed to create a Fonction.
     */
    data: XOR<FonctionCreateInput, FonctionUncheckedCreateInput>
  }

  /**
   * Fonction createMany
   */
  export type FonctionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fonctions.
     */
    data: FonctionCreateManyInput | FonctionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fonction update
   */
  export type FonctionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    /**
     * The data needed to update a Fonction.
     */
    data: XOR<FonctionUpdateInput, FonctionUncheckedUpdateInput>
    /**
     * Choose, which Fonction to update.
     */
    where: FonctionWhereUniqueInput
  }

  /**
   * Fonction updateMany
   */
  export type FonctionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fonctions.
     */
    data: XOR<FonctionUpdateManyMutationInput, FonctionUncheckedUpdateManyInput>
    /**
     * Filter which Fonctions to update
     */
    where?: FonctionWhereInput
    /**
     * Limit how many Fonctions to update.
     */
    limit?: number
  }

  /**
   * Fonction upsert
   */
  export type FonctionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    /**
     * The filter to search for the Fonction to update in case it exists.
     */
    where: FonctionWhereUniqueInput
    /**
     * In case the Fonction found by the `where` argument doesn't exist, create a new Fonction with this data.
     */
    create: XOR<FonctionCreateInput, FonctionUncheckedCreateInput>
    /**
     * In case the Fonction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FonctionUpdateInput, FonctionUncheckedUpdateInput>
  }

  /**
   * Fonction delete
   */
  export type FonctionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    /**
     * Filter which Fonction to delete.
     */
    where: FonctionWhereUniqueInput
  }

  /**
   * Fonction deleteMany
   */
  export type FonctionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fonctions to delete
     */
    where?: FonctionWhereInput
    /**
     * Limit how many Fonctions to delete.
     */
    limit?: number
  }

  /**
   * Fonction.collaborateurs
   */
  export type Fonction$collaborateursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    where?: CollaborateurWhereInput
    orderBy?: CollaborateurOrderByWithRelationInput | CollaborateurOrderByWithRelationInput[]
    cursor?: CollaborateurWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CollaborateurScalarFieldEnum | CollaborateurScalarFieldEnum[]
  }

  /**
   * Fonction.chef
   */
  export type Fonction$chefArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    where?: CollaborateurWhereInput
  }

  /**
   * Fonction.service
   */
  export type Fonction$serviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
  }

  /**
   * Fonction without action
   */
  export type FonctionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
  }


  /**
   * Model Collaborateur
   */

  export type AggregateCollaborateur = {
    _count: CollaborateurCountAggregateOutputType | null
    _avg: CollaborateurAvgAggregateOutputType | null
    _sum: CollaborateurSumAggregateOutputType | null
    _min: CollaborateurMinAggregateOutputType | null
    _max: CollaborateurMaxAggregateOutputType | null
  }

  export type CollaborateurAvgAggregateOutputType = {
    id: number | null
  }

  export type CollaborateurSumAggregateOutputType = {
    id: number | null
  }

  export type CollaborateurMinAggregateOutputType = {
    id: number | null
    matricule: string | null
    nom: string | null
    prenom: string | null
    prenomUsuelle: string | null
    civilite: $Enums.Civilite | null
    fonctionAbbrev: string | null
    serviceAbbrev: string | null
    telephone: string | null
    mailPro: string | null
    photo: string | null
  }

  export type CollaborateurMaxAggregateOutputType = {
    id: number | null
    matricule: string | null
    nom: string | null
    prenom: string | null
    prenomUsuelle: string | null
    civilite: $Enums.Civilite | null
    fonctionAbbrev: string | null
    serviceAbbrev: string | null
    telephone: string | null
    mailPro: string | null
    photo: string | null
  }

  export type CollaborateurCountAggregateOutputType = {
    id: number
    matricule: number
    nom: number
    prenom: number
    prenomUsuelle: number
    civilite: number
    fonctionAbbrev: number
    serviceAbbrev: number
    telephone: number
    mailPro: number
    photo: number
    _all: number
  }


  export type CollaborateurAvgAggregateInputType = {
    id?: true
  }

  export type CollaborateurSumAggregateInputType = {
    id?: true
  }

  export type CollaborateurMinAggregateInputType = {
    id?: true
    matricule?: true
    nom?: true
    prenom?: true
    prenomUsuelle?: true
    civilite?: true
    fonctionAbbrev?: true
    serviceAbbrev?: true
    telephone?: true
    mailPro?: true
    photo?: true
  }

  export type CollaborateurMaxAggregateInputType = {
    id?: true
    matricule?: true
    nom?: true
    prenom?: true
    prenomUsuelle?: true
    civilite?: true
    fonctionAbbrev?: true
    serviceAbbrev?: true
    telephone?: true
    mailPro?: true
    photo?: true
  }

  export type CollaborateurCountAggregateInputType = {
    id?: true
    matricule?: true
    nom?: true
    prenom?: true
    prenomUsuelle?: true
    civilite?: true
    fonctionAbbrev?: true
    serviceAbbrev?: true
    telephone?: true
    mailPro?: true
    photo?: true
    _all?: true
  }

  export type CollaborateurAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collaborateur to aggregate.
     */
    where?: CollaborateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborateurs to fetch.
     */
    orderBy?: CollaborateurOrderByWithRelationInput | CollaborateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollaborateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Collaborateurs
    **/
    _count?: true | CollaborateurCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CollaborateurAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CollaborateurSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollaborateurMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollaborateurMaxAggregateInputType
  }

  export type GetCollaborateurAggregateType<T extends CollaborateurAggregateArgs> = {
        [P in keyof T & keyof AggregateCollaborateur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollaborateur[P]>
      : GetScalarType<T[P], AggregateCollaborateur[P]>
  }




  export type CollaborateurGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaborateurWhereInput
    orderBy?: CollaborateurOrderByWithAggregationInput | CollaborateurOrderByWithAggregationInput[]
    by: CollaborateurScalarFieldEnum[] | CollaborateurScalarFieldEnum
    having?: CollaborateurScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollaborateurCountAggregateInputType | true
    _avg?: CollaborateurAvgAggregateInputType
    _sum?: CollaborateurSumAggregateInputType
    _min?: CollaborateurMinAggregateInputType
    _max?: CollaborateurMaxAggregateInputType
  }

  export type CollaborateurGroupByOutputType = {
    id: number
    matricule: string
    nom: string | null
    prenom: string | null
    prenomUsuelle: string | null
    civilite: $Enums.Civilite | null
    fonctionAbbrev: string | null
    serviceAbbrev: string | null
    telephone: string | null
    mailPro: string | null
    photo: string | null
    _count: CollaborateurCountAggregateOutputType | null
    _avg: CollaborateurAvgAggregateOutputType | null
    _sum: CollaborateurSumAggregateOutputType | null
    _min: CollaborateurMinAggregateOutputType | null
    _max: CollaborateurMaxAggregateOutputType | null
  }

  type GetCollaborateurGroupByPayload<T extends CollaborateurGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollaborateurGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollaborateurGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollaborateurGroupByOutputType[P]>
            : GetScalarType<T[P], CollaborateurGroupByOutputType[P]>
        }
      >
    >


  export type CollaborateurSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matricule?: boolean
    nom?: boolean
    prenom?: boolean
    prenomUsuelle?: boolean
    civilite?: boolean
    fonctionAbbrev?: boolean
    serviceAbbrev?: boolean
    telephone?: boolean
    mailPro?: boolean
    photo?: boolean
    collaborateurRoles?: boolean | Collaborateur$collaborateurRolesArgs<ExtArgs>
    fonction?: boolean | Collaborateur$fonctionArgs<ExtArgs>
    service?: boolean | Collaborateur$serviceArgs<ExtArgs>
    comptes?: boolean | Collaborateur$comptesArgs<ExtArgs>
    demandes?: boolean | Collaborateur$demandesArgs<ExtArgs>
    fonctionsChef?: boolean | Collaborateur$fonctionsChefArgs<ExtArgs>
    historiqueValide?: boolean | Collaborateur$historiqueValideArgs<ExtArgs>
    servicesChef?: boolean | Collaborateur$servicesChefArgs<ExtArgs>
    _count?: boolean | CollaborateurCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collaborateur"]>



  export type CollaborateurSelectScalar = {
    id?: boolean
    matricule?: boolean
    nom?: boolean
    prenom?: boolean
    prenomUsuelle?: boolean
    civilite?: boolean
    fonctionAbbrev?: boolean
    serviceAbbrev?: boolean
    telephone?: boolean
    mailPro?: boolean
    photo?: boolean
  }

  export type CollaborateurOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matricule" | "nom" | "prenom" | "prenomUsuelle" | "civilite" | "fonctionAbbrev" | "serviceAbbrev" | "telephone" | "mailPro" | "photo", ExtArgs["result"]["collaborateur"]>
  export type CollaborateurInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborateurRoles?: boolean | Collaborateur$collaborateurRolesArgs<ExtArgs>
    fonction?: boolean | Collaborateur$fonctionArgs<ExtArgs>
    service?: boolean | Collaborateur$serviceArgs<ExtArgs>
    comptes?: boolean | Collaborateur$comptesArgs<ExtArgs>
    demandes?: boolean | Collaborateur$demandesArgs<ExtArgs>
    fonctionsChef?: boolean | Collaborateur$fonctionsChefArgs<ExtArgs>
    historiqueValide?: boolean | Collaborateur$historiqueValideArgs<ExtArgs>
    servicesChef?: boolean | Collaborateur$servicesChefArgs<ExtArgs>
    _count?: boolean | CollaborateurCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CollaborateurPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Collaborateur"
    objects: {
      collaborateurRoles: Prisma.$CollaborateurRolesPayload<ExtArgs>[]
      fonction: Prisma.$FonctionPayload<ExtArgs> | null
      service: Prisma.$ServicePayload<ExtArgs> | null
      comptes: Prisma.$ComptesUtilisateursPayload<ExtArgs> | null
      demandes: Prisma.$DemandeurPayload<ExtArgs>[]
      fonctionsChef: Prisma.$FonctionPayload<ExtArgs>[]
      historiqueValide: Prisma.$HistoriqueValidationPayload<ExtArgs>[]
      servicesChef: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      matricule: string
      nom: string | null
      prenom: string | null
      prenomUsuelle: string | null
      civilite: $Enums.Civilite | null
      fonctionAbbrev: string | null
      serviceAbbrev: string | null
      telephone: string | null
      mailPro: string | null
      photo: string | null
    }, ExtArgs["result"]["collaborateur"]>
    composites: {}
  }

  type CollaborateurGetPayload<S extends boolean | null | undefined | CollaborateurDefaultArgs> = $Result.GetResult<Prisma.$CollaborateurPayload, S>

  type CollaborateurCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollaborateurFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollaborateurCountAggregateInputType | true
    }

  export interface CollaborateurDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Collaborateur'], meta: { name: 'Collaborateur' } }
    /**
     * Find zero or one Collaborateur that matches the filter.
     * @param {CollaborateurFindUniqueArgs} args - Arguments to find a Collaborateur
     * @example
     * // Get one Collaborateur
     * const collaborateur = await prisma.collaborateur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollaborateurFindUniqueArgs>(args: SelectSubset<T, CollaborateurFindUniqueArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Collaborateur that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollaborateurFindUniqueOrThrowArgs} args - Arguments to find a Collaborateur
     * @example
     * // Get one Collaborateur
     * const collaborateur = await prisma.collaborateur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollaborateurFindUniqueOrThrowArgs>(args: SelectSubset<T, CollaborateurFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collaborateur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurFindFirstArgs} args - Arguments to find a Collaborateur
     * @example
     * // Get one Collaborateur
     * const collaborateur = await prisma.collaborateur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollaborateurFindFirstArgs>(args?: SelectSubset<T, CollaborateurFindFirstArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collaborateur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurFindFirstOrThrowArgs} args - Arguments to find a Collaborateur
     * @example
     * // Get one Collaborateur
     * const collaborateur = await prisma.collaborateur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollaborateurFindFirstOrThrowArgs>(args?: SelectSubset<T, CollaborateurFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Collaborateurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Collaborateurs
     * const collaborateurs = await prisma.collaborateur.findMany()
     * 
     * // Get first 10 Collaborateurs
     * const collaborateurs = await prisma.collaborateur.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const collaborateurWithIdOnly = await prisma.collaborateur.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CollaborateurFindManyArgs>(args?: SelectSubset<T, CollaborateurFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Collaborateur.
     * @param {CollaborateurCreateArgs} args - Arguments to create a Collaborateur.
     * @example
     * // Create one Collaborateur
     * const Collaborateur = await prisma.collaborateur.create({
     *   data: {
     *     // ... data to create a Collaborateur
     *   }
     * })
     * 
     */
    create<T extends CollaborateurCreateArgs>(args: SelectSubset<T, CollaborateurCreateArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Collaborateurs.
     * @param {CollaborateurCreateManyArgs} args - Arguments to create many Collaborateurs.
     * @example
     * // Create many Collaborateurs
     * const collaborateur = await prisma.collaborateur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollaborateurCreateManyArgs>(args?: SelectSubset<T, CollaborateurCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Collaborateur.
     * @param {CollaborateurDeleteArgs} args - Arguments to delete one Collaborateur.
     * @example
     * // Delete one Collaborateur
     * const Collaborateur = await prisma.collaborateur.delete({
     *   where: {
     *     // ... filter to delete one Collaborateur
     *   }
     * })
     * 
     */
    delete<T extends CollaborateurDeleteArgs>(args: SelectSubset<T, CollaborateurDeleteArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Collaborateur.
     * @param {CollaborateurUpdateArgs} args - Arguments to update one Collaborateur.
     * @example
     * // Update one Collaborateur
     * const collaborateur = await prisma.collaborateur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollaborateurUpdateArgs>(args: SelectSubset<T, CollaborateurUpdateArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Collaborateurs.
     * @param {CollaborateurDeleteManyArgs} args - Arguments to filter Collaborateurs to delete.
     * @example
     * // Delete a few Collaborateurs
     * const { count } = await prisma.collaborateur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollaborateurDeleteManyArgs>(args?: SelectSubset<T, CollaborateurDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collaborateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Collaborateurs
     * const collaborateur = await prisma.collaborateur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollaborateurUpdateManyArgs>(args: SelectSubset<T, CollaborateurUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Collaborateur.
     * @param {CollaborateurUpsertArgs} args - Arguments to update or create a Collaborateur.
     * @example
     * // Update or create a Collaborateur
     * const collaborateur = await prisma.collaborateur.upsert({
     *   create: {
     *     // ... data to create a Collaborateur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Collaborateur we want to update
     *   }
     * })
     */
    upsert<T extends CollaborateurUpsertArgs>(args: SelectSubset<T, CollaborateurUpsertArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Collaborateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurCountArgs} args - Arguments to filter Collaborateurs to count.
     * @example
     * // Count the number of Collaborateurs
     * const count = await prisma.collaborateur.count({
     *   where: {
     *     // ... the filter for the Collaborateurs we want to count
     *   }
     * })
    **/
    count<T extends CollaborateurCountArgs>(
      args?: Subset<T, CollaborateurCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollaborateurCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Collaborateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CollaborateurAggregateArgs>(args: Subset<T, CollaborateurAggregateArgs>): Prisma.PrismaPromise<GetCollaborateurAggregateType<T>>

    /**
     * Group by Collaborateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CollaborateurGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollaborateurGroupByArgs['orderBy'] }
        : { orderBy?: CollaborateurGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CollaborateurGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollaborateurGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Collaborateur model
   */
  readonly fields: CollaborateurFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Collaborateur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollaborateurClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collaborateurRoles<T extends Collaborateur$collaborateurRolesArgs<ExtArgs> = {}>(args?: Subset<T, Collaborateur$collaborateurRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fonction<T extends Collaborateur$fonctionArgs<ExtArgs> = {}>(args?: Subset<T, Collaborateur$fonctionArgs<ExtArgs>>): Prisma__FonctionClient<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    service<T extends Collaborateur$serviceArgs<ExtArgs> = {}>(args?: Subset<T, Collaborateur$serviceArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    comptes<T extends Collaborateur$comptesArgs<ExtArgs> = {}>(args?: Subset<T, Collaborateur$comptesArgs<ExtArgs>>): Prisma__ComptesUtilisateursClient<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    demandes<T extends Collaborateur$demandesArgs<ExtArgs> = {}>(args?: Subset<T, Collaborateur$demandesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fonctionsChef<T extends Collaborateur$fonctionsChefArgs<ExtArgs> = {}>(args?: Subset<T, Collaborateur$fonctionsChefArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FonctionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    historiqueValide<T extends Collaborateur$historiqueValideArgs<ExtArgs> = {}>(args?: Subset<T, Collaborateur$historiqueValideArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    servicesChef<T extends Collaborateur$servicesChefArgs<ExtArgs> = {}>(args?: Subset<T, Collaborateur$servicesChefArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Collaborateur model
   */
  interface CollaborateurFieldRefs {
    readonly id: FieldRef<"Collaborateur", 'Int'>
    readonly matricule: FieldRef<"Collaborateur", 'String'>
    readonly nom: FieldRef<"Collaborateur", 'String'>
    readonly prenom: FieldRef<"Collaborateur", 'String'>
    readonly prenomUsuelle: FieldRef<"Collaborateur", 'String'>
    readonly civilite: FieldRef<"Collaborateur", 'Civilite'>
    readonly fonctionAbbrev: FieldRef<"Collaborateur", 'String'>
    readonly serviceAbbrev: FieldRef<"Collaborateur", 'String'>
    readonly telephone: FieldRef<"Collaborateur", 'String'>
    readonly mailPro: FieldRef<"Collaborateur", 'String'>
    readonly photo: FieldRef<"Collaborateur", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Collaborateur findUnique
   */
  export type CollaborateurFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    /**
     * Filter, which Collaborateur to fetch.
     */
    where: CollaborateurWhereUniqueInput
  }

  /**
   * Collaborateur findUniqueOrThrow
   */
  export type CollaborateurFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    /**
     * Filter, which Collaborateur to fetch.
     */
    where: CollaborateurWhereUniqueInput
  }

  /**
   * Collaborateur findFirst
   */
  export type CollaborateurFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    /**
     * Filter, which Collaborateur to fetch.
     */
    where?: CollaborateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborateurs to fetch.
     */
    orderBy?: CollaborateurOrderByWithRelationInput | CollaborateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collaborateurs.
     */
    cursor?: CollaborateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collaborateurs.
     */
    distinct?: CollaborateurScalarFieldEnum | CollaborateurScalarFieldEnum[]
  }

  /**
   * Collaborateur findFirstOrThrow
   */
  export type CollaborateurFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    /**
     * Filter, which Collaborateur to fetch.
     */
    where?: CollaborateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborateurs to fetch.
     */
    orderBy?: CollaborateurOrderByWithRelationInput | CollaborateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collaborateurs.
     */
    cursor?: CollaborateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collaborateurs.
     */
    distinct?: CollaborateurScalarFieldEnum | CollaborateurScalarFieldEnum[]
  }

  /**
   * Collaborateur findMany
   */
  export type CollaborateurFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    /**
     * Filter, which Collaborateurs to fetch.
     */
    where?: CollaborateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborateurs to fetch.
     */
    orderBy?: CollaborateurOrderByWithRelationInput | CollaborateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Collaborateurs.
     */
    cursor?: CollaborateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborateurs.
     */
    skip?: number
    distinct?: CollaborateurScalarFieldEnum | CollaborateurScalarFieldEnum[]
  }

  /**
   * Collaborateur create
   */
  export type CollaborateurCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    /**
     * The data needed to create a Collaborateur.
     */
    data: XOR<CollaborateurCreateInput, CollaborateurUncheckedCreateInput>
  }

  /**
   * Collaborateur createMany
   */
  export type CollaborateurCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Collaborateurs.
     */
    data: CollaborateurCreateManyInput | CollaborateurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collaborateur update
   */
  export type CollaborateurUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    /**
     * The data needed to update a Collaborateur.
     */
    data: XOR<CollaborateurUpdateInput, CollaborateurUncheckedUpdateInput>
    /**
     * Choose, which Collaborateur to update.
     */
    where: CollaborateurWhereUniqueInput
  }

  /**
   * Collaborateur updateMany
   */
  export type CollaborateurUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Collaborateurs.
     */
    data: XOR<CollaborateurUpdateManyMutationInput, CollaborateurUncheckedUpdateManyInput>
    /**
     * Filter which Collaborateurs to update
     */
    where?: CollaborateurWhereInput
    /**
     * Limit how many Collaborateurs to update.
     */
    limit?: number
  }

  /**
   * Collaborateur upsert
   */
  export type CollaborateurUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    /**
     * The filter to search for the Collaborateur to update in case it exists.
     */
    where: CollaborateurWhereUniqueInput
    /**
     * In case the Collaborateur found by the `where` argument doesn't exist, create a new Collaborateur with this data.
     */
    create: XOR<CollaborateurCreateInput, CollaborateurUncheckedCreateInput>
    /**
     * In case the Collaborateur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollaborateurUpdateInput, CollaborateurUncheckedUpdateInput>
  }

  /**
   * Collaborateur delete
   */
  export type CollaborateurDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    /**
     * Filter which Collaborateur to delete.
     */
    where: CollaborateurWhereUniqueInput
  }

  /**
   * Collaborateur deleteMany
   */
  export type CollaborateurDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collaborateurs to delete
     */
    where?: CollaborateurWhereInput
    /**
     * Limit how many Collaborateurs to delete.
     */
    limit?: number
  }

  /**
   * Collaborateur.collaborateurRoles
   */
  export type Collaborateur$collaborateurRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    where?: CollaborateurRolesWhereInput
    orderBy?: CollaborateurRolesOrderByWithRelationInput | CollaborateurRolesOrderByWithRelationInput[]
    cursor?: CollaborateurRolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CollaborateurRolesScalarFieldEnum | CollaborateurRolesScalarFieldEnum[]
  }

  /**
   * Collaborateur.fonction
   */
  export type Collaborateur$fonctionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    where?: FonctionWhereInput
  }

  /**
   * Collaborateur.service
   */
  export type Collaborateur$serviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
  }

  /**
   * Collaborateur.comptes
   */
  export type Collaborateur$comptesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    where?: ComptesUtilisateursWhereInput
  }

  /**
   * Collaborateur.demandes
   */
  export type Collaborateur$demandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    where?: DemandeurWhereInput
    orderBy?: DemandeurOrderByWithRelationInput | DemandeurOrderByWithRelationInput[]
    cursor?: DemandeurWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DemandeurScalarFieldEnum | DemandeurScalarFieldEnum[]
  }

  /**
   * Collaborateur.fonctionsChef
   */
  export type Collaborateur$fonctionsChefArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fonction
     */
    select?: FonctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fonction
     */
    omit?: FonctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FonctionInclude<ExtArgs> | null
    where?: FonctionWhereInput
    orderBy?: FonctionOrderByWithRelationInput | FonctionOrderByWithRelationInput[]
    cursor?: FonctionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FonctionScalarFieldEnum | FonctionScalarFieldEnum[]
  }

  /**
   * Collaborateur.historiqueValide
   */
  export type Collaborateur$historiqueValideArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    where?: HistoriqueValidationWhereInput
    orderBy?: HistoriqueValidationOrderByWithRelationInput | HistoriqueValidationOrderByWithRelationInput[]
    cursor?: HistoriqueValidationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistoriqueValidationScalarFieldEnum | HistoriqueValidationScalarFieldEnum[]
  }

  /**
   * Collaborateur.servicesChef
   */
  export type Collaborateur$servicesChefArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Collaborateur without action
   */
  export type CollaborateurDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
  }


  /**
   * Model ComptesUtilisateurs
   */

  export type AggregateComptesUtilisateurs = {
    _count: ComptesUtilisateursCountAggregateOutputType | null
    _min: ComptesUtilisateursMinAggregateOutputType | null
    _max: ComptesUtilisateursMaxAggregateOutputType | null
  }

  export type ComptesUtilisateursMinAggregateOutputType = {
    matricule_collaborateur: string | null
    motDePasse: string | null
  }

  export type ComptesUtilisateursMaxAggregateOutputType = {
    matricule_collaborateur: string | null
    motDePasse: string | null
  }

  export type ComptesUtilisateursCountAggregateOutputType = {
    matricule_collaborateur: number
    motDePasse: number
    _all: number
  }


  export type ComptesUtilisateursMinAggregateInputType = {
    matricule_collaborateur?: true
    motDePasse?: true
  }

  export type ComptesUtilisateursMaxAggregateInputType = {
    matricule_collaborateur?: true
    motDePasse?: true
  }

  export type ComptesUtilisateursCountAggregateInputType = {
    matricule_collaborateur?: true
    motDePasse?: true
    _all?: true
  }

  export type ComptesUtilisateursAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComptesUtilisateurs to aggregate.
     */
    where?: ComptesUtilisateursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComptesUtilisateurs to fetch.
     */
    orderBy?: ComptesUtilisateursOrderByWithRelationInput | ComptesUtilisateursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComptesUtilisateursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComptesUtilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComptesUtilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComptesUtilisateurs
    **/
    _count?: true | ComptesUtilisateursCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComptesUtilisateursMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComptesUtilisateursMaxAggregateInputType
  }

  export type GetComptesUtilisateursAggregateType<T extends ComptesUtilisateursAggregateArgs> = {
        [P in keyof T & keyof AggregateComptesUtilisateurs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComptesUtilisateurs[P]>
      : GetScalarType<T[P], AggregateComptesUtilisateurs[P]>
  }




  export type ComptesUtilisateursGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComptesUtilisateursWhereInput
    orderBy?: ComptesUtilisateursOrderByWithAggregationInput | ComptesUtilisateursOrderByWithAggregationInput[]
    by: ComptesUtilisateursScalarFieldEnum[] | ComptesUtilisateursScalarFieldEnum
    having?: ComptesUtilisateursScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComptesUtilisateursCountAggregateInputType | true
    _min?: ComptesUtilisateursMinAggregateInputType
    _max?: ComptesUtilisateursMaxAggregateInputType
  }

  export type ComptesUtilisateursGroupByOutputType = {
    matricule_collaborateur: string
    motDePasse: string
    _count: ComptesUtilisateursCountAggregateOutputType | null
    _min: ComptesUtilisateursMinAggregateOutputType | null
    _max: ComptesUtilisateursMaxAggregateOutputType | null
  }

  type GetComptesUtilisateursGroupByPayload<T extends ComptesUtilisateursGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComptesUtilisateursGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComptesUtilisateursGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComptesUtilisateursGroupByOutputType[P]>
            : GetScalarType<T[P], ComptesUtilisateursGroupByOutputType[P]>
        }
      >
    >


  export type ComptesUtilisateursSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    matricule_collaborateur?: boolean
    motDePasse?: boolean
    collaborateur?: boolean | CollaborateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comptesUtilisateurs"]>



  export type ComptesUtilisateursSelectScalar = {
    matricule_collaborateur?: boolean
    motDePasse?: boolean
  }

  export type ComptesUtilisateursOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"matricule_collaborateur" | "motDePasse", ExtArgs["result"]["comptesUtilisateurs"]>
  export type ComptesUtilisateursInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborateur?: boolean | CollaborateurDefaultArgs<ExtArgs>
  }

  export type $ComptesUtilisateursPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComptesUtilisateurs"
    objects: {
      collaborateur: Prisma.$CollaborateurPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      matricule_collaborateur: string
      motDePasse: string
    }, ExtArgs["result"]["comptesUtilisateurs"]>
    composites: {}
  }

  type ComptesUtilisateursGetPayload<S extends boolean | null | undefined | ComptesUtilisateursDefaultArgs> = $Result.GetResult<Prisma.$ComptesUtilisateursPayload, S>

  type ComptesUtilisateursCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComptesUtilisateursFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComptesUtilisateursCountAggregateInputType | true
    }

  export interface ComptesUtilisateursDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComptesUtilisateurs'], meta: { name: 'ComptesUtilisateurs' } }
    /**
     * Find zero or one ComptesUtilisateurs that matches the filter.
     * @param {ComptesUtilisateursFindUniqueArgs} args - Arguments to find a ComptesUtilisateurs
     * @example
     * // Get one ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComptesUtilisateursFindUniqueArgs>(args: SelectSubset<T, ComptesUtilisateursFindUniqueArgs<ExtArgs>>): Prisma__ComptesUtilisateursClient<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComptesUtilisateurs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComptesUtilisateursFindUniqueOrThrowArgs} args - Arguments to find a ComptesUtilisateurs
     * @example
     * // Get one ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComptesUtilisateursFindUniqueOrThrowArgs>(args: SelectSubset<T, ComptesUtilisateursFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComptesUtilisateursClient<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComptesUtilisateurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComptesUtilisateursFindFirstArgs} args - Arguments to find a ComptesUtilisateurs
     * @example
     * // Get one ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComptesUtilisateursFindFirstArgs>(args?: SelectSubset<T, ComptesUtilisateursFindFirstArgs<ExtArgs>>): Prisma__ComptesUtilisateursClient<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComptesUtilisateurs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComptesUtilisateursFindFirstOrThrowArgs} args - Arguments to find a ComptesUtilisateurs
     * @example
     * // Get one ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComptesUtilisateursFindFirstOrThrowArgs>(args?: SelectSubset<T, ComptesUtilisateursFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComptesUtilisateursClient<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComptesUtilisateurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComptesUtilisateursFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.findMany()
     * 
     * // Get first 10 ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.findMany({ take: 10 })
     * 
     * // Only select the `matricule_collaborateur`
     * const comptesUtilisateursWithMatricule_collaborateurOnly = await prisma.comptesUtilisateurs.findMany({ select: { matricule_collaborateur: true } })
     * 
     */
    findMany<T extends ComptesUtilisateursFindManyArgs>(args?: SelectSubset<T, ComptesUtilisateursFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComptesUtilisateurs.
     * @param {ComptesUtilisateursCreateArgs} args - Arguments to create a ComptesUtilisateurs.
     * @example
     * // Create one ComptesUtilisateurs
     * const ComptesUtilisateurs = await prisma.comptesUtilisateurs.create({
     *   data: {
     *     // ... data to create a ComptesUtilisateurs
     *   }
     * })
     * 
     */
    create<T extends ComptesUtilisateursCreateArgs>(args: SelectSubset<T, ComptesUtilisateursCreateArgs<ExtArgs>>): Prisma__ComptesUtilisateursClient<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComptesUtilisateurs.
     * @param {ComptesUtilisateursCreateManyArgs} args - Arguments to create many ComptesUtilisateurs.
     * @example
     * // Create many ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComptesUtilisateursCreateManyArgs>(args?: SelectSubset<T, ComptesUtilisateursCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ComptesUtilisateurs.
     * @param {ComptesUtilisateursDeleteArgs} args - Arguments to delete one ComptesUtilisateurs.
     * @example
     * // Delete one ComptesUtilisateurs
     * const ComptesUtilisateurs = await prisma.comptesUtilisateurs.delete({
     *   where: {
     *     // ... filter to delete one ComptesUtilisateurs
     *   }
     * })
     * 
     */
    delete<T extends ComptesUtilisateursDeleteArgs>(args: SelectSubset<T, ComptesUtilisateursDeleteArgs<ExtArgs>>): Prisma__ComptesUtilisateursClient<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComptesUtilisateurs.
     * @param {ComptesUtilisateursUpdateArgs} args - Arguments to update one ComptesUtilisateurs.
     * @example
     * // Update one ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComptesUtilisateursUpdateArgs>(args: SelectSubset<T, ComptesUtilisateursUpdateArgs<ExtArgs>>): Prisma__ComptesUtilisateursClient<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComptesUtilisateurs.
     * @param {ComptesUtilisateursDeleteManyArgs} args - Arguments to filter ComptesUtilisateurs to delete.
     * @example
     * // Delete a few ComptesUtilisateurs
     * const { count } = await prisma.comptesUtilisateurs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComptesUtilisateursDeleteManyArgs>(args?: SelectSubset<T, ComptesUtilisateursDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComptesUtilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComptesUtilisateursUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComptesUtilisateursUpdateManyArgs>(args: SelectSubset<T, ComptesUtilisateursUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ComptesUtilisateurs.
     * @param {ComptesUtilisateursUpsertArgs} args - Arguments to update or create a ComptesUtilisateurs.
     * @example
     * // Update or create a ComptesUtilisateurs
     * const comptesUtilisateurs = await prisma.comptesUtilisateurs.upsert({
     *   create: {
     *     // ... data to create a ComptesUtilisateurs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComptesUtilisateurs we want to update
     *   }
     * })
     */
    upsert<T extends ComptesUtilisateursUpsertArgs>(args: SelectSubset<T, ComptesUtilisateursUpsertArgs<ExtArgs>>): Prisma__ComptesUtilisateursClient<$Result.GetResult<Prisma.$ComptesUtilisateursPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComptesUtilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComptesUtilisateursCountArgs} args - Arguments to filter ComptesUtilisateurs to count.
     * @example
     * // Count the number of ComptesUtilisateurs
     * const count = await prisma.comptesUtilisateurs.count({
     *   where: {
     *     // ... the filter for the ComptesUtilisateurs we want to count
     *   }
     * })
    **/
    count<T extends ComptesUtilisateursCountArgs>(
      args?: Subset<T, ComptesUtilisateursCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComptesUtilisateursCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComptesUtilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComptesUtilisateursAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComptesUtilisateursAggregateArgs>(args: Subset<T, ComptesUtilisateursAggregateArgs>): Prisma.PrismaPromise<GetComptesUtilisateursAggregateType<T>>

    /**
     * Group by ComptesUtilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComptesUtilisateursGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComptesUtilisateursGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComptesUtilisateursGroupByArgs['orderBy'] }
        : { orderBy?: ComptesUtilisateursGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComptesUtilisateursGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComptesUtilisateursGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComptesUtilisateurs model
   */
  readonly fields: ComptesUtilisateursFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComptesUtilisateurs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComptesUtilisateursClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collaborateur<T extends CollaborateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollaborateurDefaultArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComptesUtilisateurs model
   */
  interface ComptesUtilisateursFieldRefs {
    readonly matricule_collaborateur: FieldRef<"ComptesUtilisateurs", 'String'>
    readonly motDePasse: FieldRef<"ComptesUtilisateurs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ComptesUtilisateurs findUnique
   */
  export type ComptesUtilisateursFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    /**
     * Filter, which ComptesUtilisateurs to fetch.
     */
    where: ComptesUtilisateursWhereUniqueInput
  }

  /**
   * ComptesUtilisateurs findUniqueOrThrow
   */
  export type ComptesUtilisateursFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    /**
     * Filter, which ComptesUtilisateurs to fetch.
     */
    where: ComptesUtilisateursWhereUniqueInput
  }

  /**
   * ComptesUtilisateurs findFirst
   */
  export type ComptesUtilisateursFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    /**
     * Filter, which ComptesUtilisateurs to fetch.
     */
    where?: ComptesUtilisateursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComptesUtilisateurs to fetch.
     */
    orderBy?: ComptesUtilisateursOrderByWithRelationInput | ComptesUtilisateursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComptesUtilisateurs.
     */
    cursor?: ComptesUtilisateursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComptesUtilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComptesUtilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComptesUtilisateurs.
     */
    distinct?: ComptesUtilisateursScalarFieldEnum | ComptesUtilisateursScalarFieldEnum[]
  }

  /**
   * ComptesUtilisateurs findFirstOrThrow
   */
  export type ComptesUtilisateursFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    /**
     * Filter, which ComptesUtilisateurs to fetch.
     */
    where?: ComptesUtilisateursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComptesUtilisateurs to fetch.
     */
    orderBy?: ComptesUtilisateursOrderByWithRelationInput | ComptesUtilisateursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComptesUtilisateurs.
     */
    cursor?: ComptesUtilisateursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComptesUtilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComptesUtilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComptesUtilisateurs.
     */
    distinct?: ComptesUtilisateursScalarFieldEnum | ComptesUtilisateursScalarFieldEnum[]
  }

  /**
   * ComptesUtilisateurs findMany
   */
  export type ComptesUtilisateursFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    /**
     * Filter, which ComptesUtilisateurs to fetch.
     */
    where?: ComptesUtilisateursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComptesUtilisateurs to fetch.
     */
    orderBy?: ComptesUtilisateursOrderByWithRelationInput | ComptesUtilisateursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComptesUtilisateurs.
     */
    cursor?: ComptesUtilisateursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComptesUtilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComptesUtilisateurs.
     */
    skip?: number
    distinct?: ComptesUtilisateursScalarFieldEnum | ComptesUtilisateursScalarFieldEnum[]
  }

  /**
   * ComptesUtilisateurs create
   */
  export type ComptesUtilisateursCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    /**
     * The data needed to create a ComptesUtilisateurs.
     */
    data: XOR<ComptesUtilisateursCreateInput, ComptesUtilisateursUncheckedCreateInput>
  }

  /**
   * ComptesUtilisateurs createMany
   */
  export type ComptesUtilisateursCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComptesUtilisateurs.
     */
    data: ComptesUtilisateursCreateManyInput | ComptesUtilisateursCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComptesUtilisateurs update
   */
  export type ComptesUtilisateursUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    /**
     * The data needed to update a ComptesUtilisateurs.
     */
    data: XOR<ComptesUtilisateursUpdateInput, ComptesUtilisateursUncheckedUpdateInput>
    /**
     * Choose, which ComptesUtilisateurs to update.
     */
    where: ComptesUtilisateursWhereUniqueInput
  }

  /**
   * ComptesUtilisateurs updateMany
   */
  export type ComptesUtilisateursUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComptesUtilisateurs.
     */
    data: XOR<ComptesUtilisateursUpdateManyMutationInput, ComptesUtilisateursUncheckedUpdateManyInput>
    /**
     * Filter which ComptesUtilisateurs to update
     */
    where?: ComptesUtilisateursWhereInput
    /**
     * Limit how many ComptesUtilisateurs to update.
     */
    limit?: number
  }

  /**
   * ComptesUtilisateurs upsert
   */
  export type ComptesUtilisateursUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    /**
     * The filter to search for the ComptesUtilisateurs to update in case it exists.
     */
    where: ComptesUtilisateursWhereUniqueInput
    /**
     * In case the ComptesUtilisateurs found by the `where` argument doesn't exist, create a new ComptesUtilisateurs with this data.
     */
    create: XOR<ComptesUtilisateursCreateInput, ComptesUtilisateursUncheckedCreateInput>
    /**
     * In case the ComptesUtilisateurs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComptesUtilisateursUpdateInput, ComptesUtilisateursUncheckedUpdateInput>
  }

  /**
   * ComptesUtilisateurs delete
   */
  export type ComptesUtilisateursDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
    /**
     * Filter which ComptesUtilisateurs to delete.
     */
    where: ComptesUtilisateursWhereUniqueInput
  }

  /**
   * ComptesUtilisateurs deleteMany
   */
  export type ComptesUtilisateursDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComptesUtilisateurs to delete
     */
    where?: ComptesUtilisateursWhereInput
    /**
     * Limit how many ComptesUtilisateurs to delete.
     */
    limit?: number
  }

  /**
   * ComptesUtilisateurs without action
   */
  export type ComptesUtilisateursDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComptesUtilisateurs
     */
    select?: ComptesUtilisateursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComptesUtilisateurs
     */
    omit?: ComptesUtilisateursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComptesUtilisateursInclude<ExtArgs> | null
  }


  /**
   * Model Roles
   */

  export type AggregateRoles = {
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  export type RolesAvgAggregateOutputType = {
    id: number | null
  }

  export type RolesSumAggregateOutputType = {
    id: number | null
  }

  export type RolesMinAggregateOutputType = {
    id: number | null
    nomRole: string | null
  }

  export type RolesMaxAggregateOutputType = {
    id: number | null
    nomRole: string | null
  }

  export type RolesCountAggregateOutputType = {
    id: number
    nomRole: number
    _all: number
  }


  export type RolesAvgAggregateInputType = {
    id?: true
  }

  export type RolesSumAggregateInputType = {
    id?: true
  }

  export type RolesMinAggregateInputType = {
    id?: true
    nomRole?: true
  }

  export type RolesMaxAggregateInputType = {
    id?: true
    nomRole?: true
  }

  export type RolesCountAggregateInputType = {
    id?: true
    nomRole?: true
    _all?: true
  }

  export type RolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to aggregate.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolesMaxAggregateInputType
  }

  export type GetRolesAggregateType<T extends RolesAggregateArgs> = {
        [P in keyof T & keyof AggregateRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoles[P]>
      : GetScalarType<T[P], AggregateRoles[P]>
  }




  export type RolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolesWhereInput
    orderBy?: RolesOrderByWithAggregationInput | RolesOrderByWithAggregationInput[]
    by: RolesScalarFieldEnum[] | RolesScalarFieldEnum
    having?: RolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolesCountAggregateInputType | true
    _avg?: RolesAvgAggregateInputType
    _sum?: RolesSumAggregateInputType
    _min?: RolesMinAggregateInputType
    _max?: RolesMaxAggregateInputType
  }

  export type RolesGroupByOutputType = {
    id: number
    nomRole: string
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  type GetRolesGroupByPayload<T extends RolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolesGroupByOutputType[P]>
            : GetScalarType<T[P], RolesGroupByOutputType[P]>
        }
      >
    >


  export type RolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomRole?: boolean
    collaborateurRoles?: boolean | Roles$collaborateurRolesArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roles"]>



  export type RolesSelectScalar = {
    id?: boolean
    nomRole?: boolean
  }

  export type RolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nomRole", ExtArgs["result"]["roles"]>
  export type RolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborateurRoles?: boolean | Roles$collaborateurRolesArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Roles"
    objects: {
      collaborateurRoles: Prisma.$CollaborateurRolesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nomRole: string
    }, ExtArgs["result"]["roles"]>
    composites: {}
  }

  type RolesGetPayload<S extends boolean | null | undefined | RolesDefaultArgs> = $Result.GetResult<Prisma.$RolesPayload, S>

  type RolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolesCountAggregateInputType | true
    }

  export interface RolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Roles'], meta: { name: 'Roles' } }
    /**
     * Find zero or one Roles that matches the filter.
     * @param {RolesFindUniqueArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolesFindUniqueArgs>(args: SelectSubset<T, RolesFindUniqueArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Roles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolesFindUniqueOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolesFindUniqueOrThrowArgs>(args: SelectSubset<T, RolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindFirstArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolesFindFirstArgs>(args?: SelectSubset<T, RolesFindFirstArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindFirstOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolesFindFirstOrThrowArgs>(args?: SelectSubset<T, RolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.roles.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.roles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolesWithIdOnly = await prisma.roles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolesFindManyArgs>(args?: SelectSubset<T, RolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Roles.
     * @param {RolesCreateArgs} args - Arguments to create a Roles.
     * @example
     * // Create one Roles
     * const Roles = await prisma.roles.create({
     *   data: {
     *     // ... data to create a Roles
     *   }
     * })
     * 
     */
    create<T extends RolesCreateArgs>(args: SelectSubset<T, RolesCreateArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RolesCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolesCreateManyArgs>(args?: SelectSubset<T, RolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Roles.
     * @param {RolesDeleteArgs} args - Arguments to delete one Roles.
     * @example
     * // Delete one Roles
     * const Roles = await prisma.roles.delete({
     *   where: {
     *     // ... filter to delete one Roles
     *   }
     * })
     * 
     */
    delete<T extends RolesDeleteArgs>(args: SelectSubset<T, RolesDeleteArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Roles.
     * @param {RolesUpdateArgs} args - Arguments to update one Roles.
     * @example
     * // Update one Roles
     * const roles = await prisma.roles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolesUpdateArgs>(args: SelectSubset<T, RolesUpdateArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RolesDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.roles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolesDeleteManyArgs>(args?: SelectSubset<T, RolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolesUpdateManyArgs>(args: SelectSubset<T, RolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Roles.
     * @param {RolesUpsertArgs} args - Arguments to update or create a Roles.
     * @example
     * // Update or create a Roles
     * const roles = await prisma.roles.upsert({
     *   create: {
     *     // ... data to create a Roles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Roles we want to update
     *   }
     * })
     */
    upsert<T extends RolesUpsertArgs>(args: SelectSubset<T, RolesUpsertArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.roles.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RolesCountArgs>(
      args?: Subset<T, RolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolesAggregateArgs>(args: Subset<T, RolesAggregateArgs>): Prisma.PrismaPromise<GetRolesAggregateType<T>>

    /**
     * Group by Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolesGroupByArgs['orderBy'] }
        : { orderBy?: RolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Roles model
   */
  readonly fields: RolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Roles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collaborateurRoles<T extends Roles$collaborateurRolesArgs<ExtArgs> = {}>(args?: Subset<T, Roles$collaborateurRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Roles model
   */
  interface RolesFieldRefs {
    readonly id: FieldRef<"Roles", 'Int'>
    readonly nomRole: FieldRef<"Roles", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Roles findUnique
   */
  export type RolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles findUniqueOrThrow
   */
  export type RolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles findFirst
   */
  export type RolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * Roles findFirstOrThrow
   */
  export type RolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * Roles findMany
   */
  export type RolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * Roles create
   */
  export type RolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The data needed to create a Roles.
     */
    data: XOR<RolesCreateInput, RolesUncheckedCreateInput>
  }

  /**
   * Roles createMany
   */
  export type RolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RolesCreateManyInput | RolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Roles update
   */
  export type RolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The data needed to update a Roles.
     */
    data: XOR<RolesUpdateInput, RolesUncheckedUpdateInput>
    /**
     * Choose, which Roles to update.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles updateMany
   */
  export type RolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RolesUpdateManyMutationInput, RolesUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RolesWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Roles upsert
   */
  export type RolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The filter to search for the Roles to update in case it exists.
     */
    where: RolesWhereUniqueInput
    /**
     * In case the Roles found by the `where` argument doesn't exist, create a new Roles with this data.
     */
    create: XOR<RolesCreateInput, RolesUncheckedCreateInput>
    /**
     * In case the Roles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolesUpdateInput, RolesUncheckedUpdateInput>
  }

  /**
   * Roles delete
   */
  export type RolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter which Roles to delete.
     */
    where: RolesWhereUniqueInput
  }

  /**
   * Roles deleteMany
   */
  export type RolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RolesWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Roles.collaborateurRoles
   */
  export type Roles$collaborateurRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    where?: CollaborateurRolesWhereInput
    orderBy?: CollaborateurRolesOrderByWithRelationInput | CollaborateurRolesOrderByWithRelationInput[]
    cursor?: CollaborateurRolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CollaborateurRolesScalarFieldEnum | CollaborateurRolesScalarFieldEnum[]
  }

  /**
   * Roles without action
   */
  export type RolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Roles
     */
    omit?: RolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolesInclude<ExtArgs> | null
  }


  /**
   * Model CollaborateurRoles
   */

  export type AggregateCollaborateurRoles = {
    _count: CollaborateurRolesCountAggregateOutputType | null
    _avg: CollaborateurRolesAvgAggregateOutputType | null
    _sum: CollaborateurRolesSumAggregateOutputType | null
    _min: CollaborateurRolesMinAggregateOutputType | null
    _max: CollaborateurRolesMaxAggregateOutputType | null
  }

  export type CollaborateurRolesAvgAggregateOutputType = {
    roleID: number | null
  }

  export type CollaborateurRolesSumAggregateOutputType = {
    roleID: number | null
  }

  export type CollaborateurRolesMinAggregateOutputType = {
    matricule: string | null
    roleID: number | null
  }

  export type CollaborateurRolesMaxAggregateOutputType = {
    matricule: string | null
    roleID: number | null
  }

  export type CollaborateurRolesCountAggregateOutputType = {
    matricule: number
    roleID: number
    _all: number
  }


  export type CollaborateurRolesAvgAggregateInputType = {
    roleID?: true
  }

  export type CollaborateurRolesSumAggregateInputType = {
    roleID?: true
  }

  export type CollaborateurRolesMinAggregateInputType = {
    matricule?: true
    roleID?: true
  }

  export type CollaborateurRolesMaxAggregateInputType = {
    matricule?: true
    roleID?: true
  }

  export type CollaborateurRolesCountAggregateInputType = {
    matricule?: true
    roleID?: true
    _all?: true
  }

  export type CollaborateurRolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CollaborateurRoles to aggregate.
     */
    where?: CollaborateurRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CollaborateurRoles to fetch.
     */
    orderBy?: CollaborateurRolesOrderByWithRelationInput | CollaborateurRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollaborateurRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CollaborateurRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CollaborateurRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CollaborateurRoles
    **/
    _count?: true | CollaborateurRolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CollaborateurRolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CollaborateurRolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollaborateurRolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollaborateurRolesMaxAggregateInputType
  }

  export type GetCollaborateurRolesAggregateType<T extends CollaborateurRolesAggregateArgs> = {
        [P in keyof T & keyof AggregateCollaborateurRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollaborateurRoles[P]>
      : GetScalarType<T[P], AggregateCollaborateurRoles[P]>
  }




  export type CollaborateurRolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaborateurRolesWhereInput
    orderBy?: CollaborateurRolesOrderByWithAggregationInput | CollaborateurRolesOrderByWithAggregationInput[]
    by: CollaborateurRolesScalarFieldEnum[] | CollaborateurRolesScalarFieldEnum
    having?: CollaborateurRolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollaborateurRolesCountAggregateInputType | true
    _avg?: CollaborateurRolesAvgAggregateInputType
    _sum?: CollaborateurRolesSumAggregateInputType
    _min?: CollaborateurRolesMinAggregateInputType
    _max?: CollaborateurRolesMaxAggregateInputType
  }

  export type CollaborateurRolesGroupByOutputType = {
    matricule: string
    roleID: number
    _count: CollaborateurRolesCountAggregateOutputType | null
    _avg: CollaborateurRolesAvgAggregateOutputType | null
    _sum: CollaborateurRolesSumAggregateOutputType | null
    _min: CollaborateurRolesMinAggregateOutputType | null
    _max: CollaborateurRolesMaxAggregateOutputType | null
  }

  type GetCollaborateurRolesGroupByPayload<T extends CollaborateurRolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollaborateurRolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollaborateurRolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollaborateurRolesGroupByOutputType[P]>
            : GetScalarType<T[P], CollaborateurRolesGroupByOutputType[P]>
        }
      >
    >


  export type CollaborateurRolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    matricule?: boolean
    roleID?: boolean
    collaborateur?: boolean | CollaborateurDefaultArgs<ExtArgs>
    role?: boolean | RolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collaborateurRoles"]>



  export type CollaborateurRolesSelectScalar = {
    matricule?: boolean
    roleID?: boolean
  }

  export type CollaborateurRolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"matricule" | "roleID", ExtArgs["result"]["collaborateurRoles"]>
  export type CollaborateurRolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborateur?: boolean | CollaborateurDefaultArgs<ExtArgs>
    role?: boolean | RolesDefaultArgs<ExtArgs>
  }

  export type $CollaborateurRolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CollaborateurRoles"
    objects: {
      collaborateur: Prisma.$CollaborateurPayload<ExtArgs>
      role: Prisma.$RolesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      matricule: string
      roleID: number
    }, ExtArgs["result"]["collaborateurRoles"]>
    composites: {}
  }

  type CollaborateurRolesGetPayload<S extends boolean | null | undefined | CollaborateurRolesDefaultArgs> = $Result.GetResult<Prisma.$CollaborateurRolesPayload, S>

  type CollaborateurRolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollaborateurRolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollaborateurRolesCountAggregateInputType | true
    }

  export interface CollaborateurRolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CollaborateurRoles'], meta: { name: 'CollaborateurRoles' } }
    /**
     * Find zero or one CollaborateurRoles that matches the filter.
     * @param {CollaborateurRolesFindUniqueArgs} args - Arguments to find a CollaborateurRoles
     * @example
     * // Get one CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollaborateurRolesFindUniqueArgs>(args: SelectSubset<T, CollaborateurRolesFindUniqueArgs<ExtArgs>>): Prisma__CollaborateurRolesClient<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CollaborateurRoles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollaborateurRolesFindUniqueOrThrowArgs} args - Arguments to find a CollaborateurRoles
     * @example
     * // Get one CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollaborateurRolesFindUniqueOrThrowArgs>(args: SelectSubset<T, CollaborateurRolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollaborateurRolesClient<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CollaborateurRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurRolesFindFirstArgs} args - Arguments to find a CollaborateurRoles
     * @example
     * // Get one CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollaborateurRolesFindFirstArgs>(args?: SelectSubset<T, CollaborateurRolesFindFirstArgs<ExtArgs>>): Prisma__CollaborateurRolesClient<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CollaborateurRoles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurRolesFindFirstOrThrowArgs} args - Arguments to find a CollaborateurRoles
     * @example
     * // Get one CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollaborateurRolesFindFirstOrThrowArgs>(args?: SelectSubset<T, CollaborateurRolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollaborateurRolesClient<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CollaborateurRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurRolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.findMany()
     * 
     * // Get first 10 CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.findMany({ take: 10 })
     * 
     * // Only select the `matricule`
     * const collaborateurRolesWithMatriculeOnly = await prisma.collaborateurRoles.findMany({ select: { matricule: true } })
     * 
     */
    findMany<T extends CollaborateurRolesFindManyArgs>(args?: SelectSubset<T, CollaborateurRolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CollaborateurRoles.
     * @param {CollaborateurRolesCreateArgs} args - Arguments to create a CollaborateurRoles.
     * @example
     * // Create one CollaborateurRoles
     * const CollaborateurRoles = await prisma.collaborateurRoles.create({
     *   data: {
     *     // ... data to create a CollaborateurRoles
     *   }
     * })
     * 
     */
    create<T extends CollaborateurRolesCreateArgs>(args: SelectSubset<T, CollaborateurRolesCreateArgs<ExtArgs>>): Prisma__CollaborateurRolesClient<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CollaborateurRoles.
     * @param {CollaborateurRolesCreateManyArgs} args - Arguments to create many CollaborateurRoles.
     * @example
     * // Create many CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollaborateurRolesCreateManyArgs>(args?: SelectSubset<T, CollaborateurRolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CollaborateurRoles.
     * @param {CollaborateurRolesDeleteArgs} args - Arguments to delete one CollaborateurRoles.
     * @example
     * // Delete one CollaborateurRoles
     * const CollaborateurRoles = await prisma.collaborateurRoles.delete({
     *   where: {
     *     // ... filter to delete one CollaborateurRoles
     *   }
     * })
     * 
     */
    delete<T extends CollaborateurRolesDeleteArgs>(args: SelectSubset<T, CollaborateurRolesDeleteArgs<ExtArgs>>): Prisma__CollaborateurRolesClient<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CollaborateurRoles.
     * @param {CollaborateurRolesUpdateArgs} args - Arguments to update one CollaborateurRoles.
     * @example
     * // Update one CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollaborateurRolesUpdateArgs>(args: SelectSubset<T, CollaborateurRolesUpdateArgs<ExtArgs>>): Prisma__CollaborateurRolesClient<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CollaborateurRoles.
     * @param {CollaborateurRolesDeleteManyArgs} args - Arguments to filter CollaborateurRoles to delete.
     * @example
     * // Delete a few CollaborateurRoles
     * const { count } = await prisma.collaborateurRoles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollaborateurRolesDeleteManyArgs>(args?: SelectSubset<T, CollaborateurRolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CollaborateurRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurRolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollaborateurRolesUpdateManyArgs>(args: SelectSubset<T, CollaborateurRolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CollaborateurRoles.
     * @param {CollaborateurRolesUpsertArgs} args - Arguments to update or create a CollaborateurRoles.
     * @example
     * // Update or create a CollaborateurRoles
     * const collaborateurRoles = await prisma.collaborateurRoles.upsert({
     *   create: {
     *     // ... data to create a CollaborateurRoles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CollaborateurRoles we want to update
     *   }
     * })
     */
    upsert<T extends CollaborateurRolesUpsertArgs>(args: SelectSubset<T, CollaborateurRolesUpsertArgs<ExtArgs>>): Prisma__CollaborateurRolesClient<$Result.GetResult<Prisma.$CollaborateurRolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CollaborateurRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurRolesCountArgs} args - Arguments to filter CollaborateurRoles to count.
     * @example
     * // Count the number of CollaborateurRoles
     * const count = await prisma.collaborateurRoles.count({
     *   where: {
     *     // ... the filter for the CollaborateurRoles we want to count
     *   }
     * })
    **/
    count<T extends CollaborateurRolesCountArgs>(
      args?: Subset<T, CollaborateurRolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollaborateurRolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CollaborateurRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurRolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CollaborateurRolesAggregateArgs>(args: Subset<T, CollaborateurRolesAggregateArgs>): Prisma.PrismaPromise<GetCollaborateurRolesAggregateType<T>>

    /**
     * Group by CollaborateurRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaborateurRolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CollaborateurRolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollaborateurRolesGroupByArgs['orderBy'] }
        : { orderBy?: CollaborateurRolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CollaborateurRolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollaborateurRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CollaborateurRoles model
   */
  readonly fields: CollaborateurRolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CollaborateurRoles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollaborateurRolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collaborateur<T extends CollaborateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollaborateurDefaultArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RolesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RolesDefaultArgs<ExtArgs>>): Prisma__RolesClient<$Result.GetResult<Prisma.$RolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CollaborateurRoles model
   */
  interface CollaborateurRolesFieldRefs {
    readonly matricule: FieldRef<"CollaborateurRoles", 'String'>
    readonly roleID: FieldRef<"CollaborateurRoles", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CollaborateurRoles findUnique
   */
  export type CollaborateurRolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    /**
     * Filter, which CollaborateurRoles to fetch.
     */
    where: CollaborateurRolesWhereUniqueInput
  }

  /**
   * CollaborateurRoles findUniqueOrThrow
   */
  export type CollaborateurRolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    /**
     * Filter, which CollaborateurRoles to fetch.
     */
    where: CollaborateurRolesWhereUniqueInput
  }

  /**
   * CollaborateurRoles findFirst
   */
  export type CollaborateurRolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    /**
     * Filter, which CollaborateurRoles to fetch.
     */
    where?: CollaborateurRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CollaborateurRoles to fetch.
     */
    orderBy?: CollaborateurRolesOrderByWithRelationInput | CollaborateurRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CollaborateurRoles.
     */
    cursor?: CollaborateurRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CollaborateurRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CollaborateurRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CollaborateurRoles.
     */
    distinct?: CollaborateurRolesScalarFieldEnum | CollaborateurRolesScalarFieldEnum[]
  }

  /**
   * CollaborateurRoles findFirstOrThrow
   */
  export type CollaborateurRolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    /**
     * Filter, which CollaborateurRoles to fetch.
     */
    where?: CollaborateurRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CollaborateurRoles to fetch.
     */
    orderBy?: CollaborateurRolesOrderByWithRelationInput | CollaborateurRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CollaborateurRoles.
     */
    cursor?: CollaborateurRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CollaborateurRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CollaborateurRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CollaborateurRoles.
     */
    distinct?: CollaborateurRolesScalarFieldEnum | CollaborateurRolesScalarFieldEnum[]
  }

  /**
   * CollaborateurRoles findMany
   */
  export type CollaborateurRolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    /**
     * Filter, which CollaborateurRoles to fetch.
     */
    where?: CollaborateurRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CollaborateurRoles to fetch.
     */
    orderBy?: CollaborateurRolesOrderByWithRelationInput | CollaborateurRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CollaborateurRoles.
     */
    cursor?: CollaborateurRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CollaborateurRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CollaborateurRoles.
     */
    skip?: number
    distinct?: CollaborateurRolesScalarFieldEnum | CollaborateurRolesScalarFieldEnum[]
  }

  /**
   * CollaborateurRoles create
   */
  export type CollaborateurRolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    /**
     * The data needed to create a CollaborateurRoles.
     */
    data: XOR<CollaborateurRolesCreateInput, CollaborateurRolesUncheckedCreateInput>
  }

  /**
   * CollaborateurRoles createMany
   */
  export type CollaborateurRolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CollaborateurRoles.
     */
    data: CollaborateurRolesCreateManyInput | CollaborateurRolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CollaborateurRoles update
   */
  export type CollaborateurRolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    /**
     * The data needed to update a CollaborateurRoles.
     */
    data: XOR<CollaborateurRolesUpdateInput, CollaborateurRolesUncheckedUpdateInput>
    /**
     * Choose, which CollaborateurRoles to update.
     */
    where: CollaborateurRolesWhereUniqueInput
  }

  /**
   * CollaborateurRoles updateMany
   */
  export type CollaborateurRolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CollaborateurRoles.
     */
    data: XOR<CollaborateurRolesUpdateManyMutationInput, CollaborateurRolesUncheckedUpdateManyInput>
    /**
     * Filter which CollaborateurRoles to update
     */
    where?: CollaborateurRolesWhereInput
    /**
     * Limit how many CollaborateurRoles to update.
     */
    limit?: number
  }

  /**
   * CollaborateurRoles upsert
   */
  export type CollaborateurRolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    /**
     * The filter to search for the CollaborateurRoles to update in case it exists.
     */
    where: CollaborateurRolesWhereUniqueInput
    /**
     * In case the CollaborateurRoles found by the `where` argument doesn't exist, create a new CollaborateurRoles with this data.
     */
    create: XOR<CollaborateurRolesCreateInput, CollaborateurRolesUncheckedCreateInput>
    /**
     * In case the CollaborateurRoles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollaborateurRolesUpdateInput, CollaborateurRolesUncheckedUpdateInput>
  }

  /**
   * CollaborateurRoles delete
   */
  export type CollaborateurRolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
    /**
     * Filter which CollaborateurRoles to delete.
     */
    where: CollaborateurRolesWhereUniqueInput
  }

  /**
   * CollaborateurRoles deleteMany
   */
  export type CollaborateurRolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CollaborateurRoles to delete
     */
    where?: CollaborateurRolesWhereInput
    /**
     * Limit how many CollaborateurRoles to delete.
     */
    limit?: number
  }

  /**
   * CollaborateurRoles without action
   */
  export type CollaborateurRolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaborateurRoles
     */
    select?: CollaborateurRolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CollaborateurRoles
     */
    omit?: CollaborateurRolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurRolesInclude<ExtArgs> | null
  }


  /**
   * Model Budget
   */

  export type AggregateBudget = {
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  export type BudgetAvgAggregateOutputType = {
    id: number | null
    montantDisponible: Decimal | null
    serviceId: number | null
  }

  export type BudgetSumAggregateOutputType = {
    id: number | null
    montantDisponible: Decimal | null
    serviceId: number | null
  }

  export type BudgetMinAggregateOutputType = {
    id: number | null
    codeBudgetaire: string | null
    montantDisponible: Decimal | null
    serviceId: number | null
  }

  export type BudgetMaxAggregateOutputType = {
    id: number | null
    codeBudgetaire: string | null
    montantDisponible: Decimal | null
    serviceId: number | null
  }

  export type BudgetCountAggregateOutputType = {
    id: number
    codeBudgetaire: number
    montantDisponible: number
    serviceId: number
    _all: number
  }


  export type BudgetAvgAggregateInputType = {
    id?: true
    montantDisponible?: true
    serviceId?: true
  }

  export type BudgetSumAggregateInputType = {
    id?: true
    montantDisponible?: true
    serviceId?: true
  }

  export type BudgetMinAggregateInputType = {
    id?: true
    codeBudgetaire?: true
    montantDisponible?: true
    serviceId?: true
  }

  export type BudgetMaxAggregateInputType = {
    id?: true
    codeBudgetaire?: true
    montantDisponible?: true
    serviceId?: true
  }

  export type BudgetCountAggregateInputType = {
    id?: true
    codeBudgetaire?: true
    montantDisponible?: true
    serviceId?: true
    _all?: true
  }

  export type BudgetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budget to aggregate.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Budgets
    **/
    _count?: true | BudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetMaxAggregateInputType
  }

  export type GetBudgetAggregateType<T extends BudgetAggregateArgs> = {
        [P in keyof T & keyof AggregateBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudget[P]>
      : GetScalarType<T[P], AggregateBudget[P]>
  }




  export type BudgetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetWhereInput
    orderBy?: BudgetOrderByWithAggregationInput | BudgetOrderByWithAggregationInput[]
    by: BudgetScalarFieldEnum[] | BudgetScalarFieldEnum
    having?: BudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetCountAggregateInputType | true
    _avg?: BudgetAvgAggregateInputType
    _sum?: BudgetSumAggregateInputType
    _min?: BudgetMinAggregateInputType
    _max?: BudgetMaxAggregateInputType
  }

  export type BudgetGroupByOutputType = {
    id: number
    codeBudgetaire: string
    montantDisponible: Decimal
    serviceId: number | null
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  type GetBudgetGroupByPayload<T extends BudgetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetGroupByOutputType[P]>
        }
      >
    >


  export type BudgetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codeBudgetaire?: boolean
    montantDisponible?: boolean
    serviceId?: boolean
    service?: boolean | Budget$serviceArgs<ExtArgs>
    demandes?: boolean | Budget$demandesArgs<ExtArgs>
    _count?: boolean | BudgetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budget"]>



  export type BudgetSelectScalar = {
    id?: boolean
    codeBudgetaire?: boolean
    montantDisponible?: boolean
    serviceId?: boolean
  }

  export type BudgetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codeBudgetaire" | "montantDisponible" | "serviceId", ExtArgs["result"]["budget"]>
  export type BudgetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | Budget$serviceArgs<ExtArgs>
    demandes?: boolean | Budget$demandesArgs<ExtArgs>
    _count?: boolean | BudgetCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BudgetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Budget"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs> | null
      demandes: Prisma.$DemandeurPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      codeBudgetaire: string
      montantDisponible: Prisma.Decimal
      serviceId: number | null
    }, ExtArgs["result"]["budget"]>
    composites: {}
  }

  type BudgetGetPayload<S extends boolean | null | undefined | BudgetDefaultArgs> = $Result.GetResult<Prisma.$BudgetPayload, S>

  type BudgetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BudgetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BudgetCountAggregateInputType | true
    }

  export interface BudgetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Budget'], meta: { name: 'Budget' } }
    /**
     * Find zero or one Budget that matches the filter.
     * @param {BudgetFindUniqueArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetFindUniqueArgs>(args: SelectSubset<T, BudgetFindUniqueArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Budget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BudgetFindUniqueOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetFindUniqueOrThrowArgs>(args: SelectSubset<T, BudgetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Budget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetFindFirstArgs>(args?: SelectSubset<T, BudgetFindFirstArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Budget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetFindFirstOrThrowArgs>(args?: SelectSubset<T, BudgetFindFirstOrThrowArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budget.findMany()
     * 
     * // Get first 10 Budgets
     * const budgets = await prisma.budget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetWithIdOnly = await prisma.budget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BudgetFindManyArgs>(args?: SelectSubset<T, BudgetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Budget.
     * @param {BudgetCreateArgs} args - Arguments to create a Budget.
     * @example
     * // Create one Budget
     * const Budget = await prisma.budget.create({
     *   data: {
     *     // ... data to create a Budget
     *   }
     * })
     * 
     */
    create<T extends BudgetCreateArgs>(args: SelectSubset<T, BudgetCreateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Budgets.
     * @param {BudgetCreateManyArgs} args - Arguments to create many Budgets.
     * @example
     * // Create many Budgets
     * const budget = await prisma.budget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BudgetCreateManyArgs>(args?: SelectSubset<T, BudgetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Budget.
     * @param {BudgetDeleteArgs} args - Arguments to delete one Budget.
     * @example
     * // Delete one Budget
     * const Budget = await prisma.budget.delete({
     *   where: {
     *     // ... filter to delete one Budget
     *   }
     * })
     * 
     */
    delete<T extends BudgetDeleteArgs>(args: SelectSubset<T, BudgetDeleteArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Budget.
     * @param {BudgetUpdateArgs} args - Arguments to update one Budget.
     * @example
     * // Update one Budget
     * const budget = await prisma.budget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BudgetUpdateArgs>(args: SelectSubset<T, BudgetUpdateArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Budgets.
     * @param {BudgetDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BudgetDeleteManyArgs>(args?: SelectSubset<T, BudgetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BudgetUpdateManyArgs>(args: SelectSubset<T, BudgetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Budget.
     * @param {BudgetUpsertArgs} args - Arguments to update or create a Budget.
     * @example
     * // Update or create a Budget
     * const budget = await prisma.budget.upsert({
     *   create: {
     *     // ... data to create a Budget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budget we want to update
     *   }
     * })
     */
    upsert<T extends BudgetUpsertArgs>(args: SelectSubset<T, BudgetUpsertArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budget.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
    **/
    count<T extends BudgetCountArgs>(
      args?: Subset<T, BudgetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetAggregateArgs>(args: Subset<T, BudgetAggregateArgs>): Prisma.PrismaPromise<GetBudgetAggregateType<T>>

    /**
     * Group by Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetGroupByArgs['orderBy'] }
        : { orderBy?: BudgetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Budget model
   */
  readonly fields: BudgetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Budget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends Budget$serviceArgs<ExtArgs> = {}>(args?: Subset<T, Budget$serviceArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    demandes<T extends Budget$demandesArgs<ExtArgs> = {}>(args?: Subset<T, Budget$demandesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Budget model
   */
  interface BudgetFieldRefs {
    readonly id: FieldRef<"Budget", 'Int'>
    readonly codeBudgetaire: FieldRef<"Budget", 'String'>
    readonly montantDisponible: FieldRef<"Budget", 'Decimal'>
    readonly serviceId: FieldRef<"Budget", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Budget findUnique
   */
  export type BudgetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findUniqueOrThrow
   */
  export type BudgetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget findFirst
   */
  export type BudgetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findFirstOrThrow
   */
  export type BudgetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budget to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     */
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget findMany
   */
  export type BudgetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter, which Budgets to fetch.
     */
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     */
    orderBy?: BudgetOrderByWithRelationInput | BudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Budgets.
     */
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     */
    skip?: number
    distinct?: BudgetScalarFieldEnum | BudgetScalarFieldEnum[]
  }

  /**
   * Budget create
   */
  export type BudgetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to create a Budget.
     */
    data: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
  }

  /**
   * Budget createMany
   */
  export type BudgetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Budgets.
     */
    data: BudgetCreateManyInput | BudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Budget update
   */
  export type BudgetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The data needed to update a Budget.
     */
    data: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
    /**
     * Choose, which Budget to update.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget updateMany
   */
  export type BudgetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Budgets.
     */
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    /**
     * Filter which Budgets to update
     */
    where?: BudgetWhereInput
    /**
     * Limit how many Budgets to update.
     */
    limit?: number
  }

  /**
   * Budget upsert
   */
  export type BudgetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * The filter to search for the Budget to update in case it exists.
     */
    where: BudgetWhereUniqueInput
    /**
     * In case the Budget found by the `where` argument doesn't exist, create a new Budget with this data.
     */
    create: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
    /**
     * In case the Budget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
  }

  /**
   * Budget delete
   */
  export type BudgetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    /**
     * Filter which Budget to delete.
     */
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget deleteMany
   */
  export type BudgetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Budgets to delete
     */
    where?: BudgetWhereInput
    /**
     * Limit how many Budgets to delete.
     */
    limit?: number
  }

  /**
   * Budget.service
   */
  export type Budget$serviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
  }

  /**
   * Budget.demandes
   */
  export type Budget$demandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    where?: DemandeurWhereInput
    orderBy?: DemandeurOrderByWithRelationInput | DemandeurOrderByWithRelationInput[]
    cursor?: DemandeurWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DemandeurScalarFieldEnum | DemandeurScalarFieldEnum[]
  }

  /**
   * Budget without action
   */
  export type BudgetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowEtapes
   */

  export type AggregateWorkflowEtapes = {
    _count: WorkflowEtapesCountAggregateOutputType | null
    _avg: WorkflowEtapesAvgAggregateOutputType | null
    _sum: WorkflowEtapesSumAggregateOutputType | null
    _min: WorkflowEtapesMinAggregateOutputType | null
    _max: WorkflowEtapesMaxAggregateOutputType | null
  }

  export type WorkflowEtapesAvgAggregateOutputType = {
    id: number | null
    etape: number | null
  }

  export type WorkflowEtapesSumAggregateOutputType = {
    id: number | null
    etape: number | null
  }

  export type WorkflowEtapesMinAggregateOutputType = {
    id: number | null
    type: $Enums.TypeNavette | null
    etape: number | null
    roleRequis: string | null
    description: string | null
  }

  export type WorkflowEtapesMaxAggregateOutputType = {
    id: number | null
    type: $Enums.TypeNavette | null
    etape: number | null
    roleRequis: string | null
    description: string | null
  }

  export type WorkflowEtapesCountAggregateOutputType = {
    id: number
    type: number
    etape: number
    roleRequis: number
    description: number
    _all: number
  }


  export type WorkflowEtapesAvgAggregateInputType = {
    id?: true
    etape?: true
  }

  export type WorkflowEtapesSumAggregateInputType = {
    id?: true
    etape?: true
  }

  export type WorkflowEtapesMinAggregateInputType = {
    id?: true
    type?: true
    etape?: true
    roleRequis?: true
    description?: true
  }

  export type WorkflowEtapesMaxAggregateInputType = {
    id?: true
    type?: true
    etape?: true
    roleRequis?: true
    description?: true
  }

  export type WorkflowEtapesCountAggregateInputType = {
    id?: true
    type?: true
    etape?: true
    roleRequis?: true
    description?: true
    _all?: true
  }

  export type WorkflowEtapesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowEtapes to aggregate.
     */
    where?: WorkflowEtapesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEtapes to fetch.
     */
    orderBy?: WorkflowEtapesOrderByWithRelationInput | WorkflowEtapesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowEtapesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEtapes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEtapes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowEtapes
    **/
    _count?: true | WorkflowEtapesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowEtapesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowEtapesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowEtapesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowEtapesMaxAggregateInputType
  }

  export type GetWorkflowEtapesAggregateType<T extends WorkflowEtapesAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowEtapes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowEtapes[P]>
      : GetScalarType<T[P], AggregateWorkflowEtapes[P]>
  }




  export type WorkflowEtapesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowEtapesWhereInput
    orderBy?: WorkflowEtapesOrderByWithAggregationInput | WorkflowEtapesOrderByWithAggregationInput[]
    by: WorkflowEtapesScalarFieldEnum[] | WorkflowEtapesScalarFieldEnum
    having?: WorkflowEtapesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowEtapesCountAggregateInputType | true
    _avg?: WorkflowEtapesAvgAggregateInputType
    _sum?: WorkflowEtapesSumAggregateInputType
    _min?: WorkflowEtapesMinAggregateInputType
    _max?: WorkflowEtapesMaxAggregateInputType
  }

  export type WorkflowEtapesGroupByOutputType = {
    id: number
    type: $Enums.TypeNavette
    etape: number
    roleRequis: string
    description: string | null
    _count: WorkflowEtapesCountAggregateOutputType | null
    _avg: WorkflowEtapesAvgAggregateOutputType | null
    _sum: WorkflowEtapesSumAggregateOutputType | null
    _min: WorkflowEtapesMinAggregateOutputType | null
    _max: WorkflowEtapesMaxAggregateOutputType | null
  }

  type GetWorkflowEtapesGroupByPayload<T extends WorkflowEtapesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowEtapesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowEtapesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowEtapesGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowEtapesGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowEtapesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    etape?: boolean
    roleRequis?: boolean
    description?: boolean
  }, ExtArgs["result"]["workflowEtapes"]>



  export type WorkflowEtapesSelectScalar = {
    id?: boolean
    type?: boolean
    etape?: boolean
    roleRequis?: boolean
    description?: boolean
  }

  export type WorkflowEtapesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "etape" | "roleRequis" | "description", ExtArgs["result"]["workflowEtapes"]>

  export type $WorkflowEtapesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowEtapes"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: $Enums.TypeNavette
      etape: number
      roleRequis: string
      description: string | null
    }, ExtArgs["result"]["workflowEtapes"]>
    composites: {}
  }

  type WorkflowEtapesGetPayload<S extends boolean | null | undefined | WorkflowEtapesDefaultArgs> = $Result.GetResult<Prisma.$WorkflowEtapesPayload, S>

  type WorkflowEtapesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowEtapesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowEtapesCountAggregateInputType | true
    }

  export interface WorkflowEtapesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowEtapes'], meta: { name: 'WorkflowEtapes' } }
    /**
     * Find zero or one WorkflowEtapes that matches the filter.
     * @param {WorkflowEtapesFindUniqueArgs} args - Arguments to find a WorkflowEtapes
     * @example
     * // Get one WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowEtapesFindUniqueArgs>(args: SelectSubset<T, WorkflowEtapesFindUniqueArgs<ExtArgs>>): Prisma__WorkflowEtapesClient<$Result.GetResult<Prisma.$WorkflowEtapesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowEtapes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowEtapesFindUniqueOrThrowArgs} args - Arguments to find a WorkflowEtapes
     * @example
     * // Get one WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowEtapesFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowEtapesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowEtapesClient<$Result.GetResult<Prisma.$WorkflowEtapesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowEtapes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEtapesFindFirstArgs} args - Arguments to find a WorkflowEtapes
     * @example
     * // Get one WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowEtapesFindFirstArgs>(args?: SelectSubset<T, WorkflowEtapesFindFirstArgs<ExtArgs>>): Prisma__WorkflowEtapesClient<$Result.GetResult<Prisma.$WorkflowEtapesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowEtapes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEtapesFindFirstOrThrowArgs} args - Arguments to find a WorkflowEtapes
     * @example
     * // Get one WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowEtapesFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowEtapesFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowEtapesClient<$Result.GetResult<Prisma.$WorkflowEtapesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowEtapes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEtapesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.findMany()
     * 
     * // Get first 10 WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowEtapesWithIdOnly = await prisma.workflowEtapes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowEtapesFindManyArgs>(args?: SelectSubset<T, WorkflowEtapesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowEtapesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowEtapes.
     * @param {WorkflowEtapesCreateArgs} args - Arguments to create a WorkflowEtapes.
     * @example
     * // Create one WorkflowEtapes
     * const WorkflowEtapes = await prisma.workflowEtapes.create({
     *   data: {
     *     // ... data to create a WorkflowEtapes
     *   }
     * })
     * 
     */
    create<T extends WorkflowEtapesCreateArgs>(args: SelectSubset<T, WorkflowEtapesCreateArgs<ExtArgs>>): Prisma__WorkflowEtapesClient<$Result.GetResult<Prisma.$WorkflowEtapesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowEtapes.
     * @param {WorkflowEtapesCreateManyArgs} args - Arguments to create many WorkflowEtapes.
     * @example
     * // Create many WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowEtapesCreateManyArgs>(args?: SelectSubset<T, WorkflowEtapesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WorkflowEtapes.
     * @param {WorkflowEtapesDeleteArgs} args - Arguments to delete one WorkflowEtapes.
     * @example
     * // Delete one WorkflowEtapes
     * const WorkflowEtapes = await prisma.workflowEtapes.delete({
     *   where: {
     *     // ... filter to delete one WorkflowEtapes
     *   }
     * })
     * 
     */
    delete<T extends WorkflowEtapesDeleteArgs>(args: SelectSubset<T, WorkflowEtapesDeleteArgs<ExtArgs>>): Prisma__WorkflowEtapesClient<$Result.GetResult<Prisma.$WorkflowEtapesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowEtapes.
     * @param {WorkflowEtapesUpdateArgs} args - Arguments to update one WorkflowEtapes.
     * @example
     * // Update one WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowEtapesUpdateArgs>(args: SelectSubset<T, WorkflowEtapesUpdateArgs<ExtArgs>>): Prisma__WorkflowEtapesClient<$Result.GetResult<Prisma.$WorkflowEtapesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowEtapes.
     * @param {WorkflowEtapesDeleteManyArgs} args - Arguments to filter WorkflowEtapes to delete.
     * @example
     * // Delete a few WorkflowEtapes
     * const { count } = await prisma.workflowEtapes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowEtapesDeleteManyArgs>(args?: SelectSubset<T, WorkflowEtapesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowEtapes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEtapesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowEtapesUpdateManyArgs>(args: SelectSubset<T, WorkflowEtapesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkflowEtapes.
     * @param {WorkflowEtapesUpsertArgs} args - Arguments to update or create a WorkflowEtapes.
     * @example
     * // Update or create a WorkflowEtapes
     * const workflowEtapes = await prisma.workflowEtapes.upsert({
     *   create: {
     *     // ... data to create a WorkflowEtapes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowEtapes we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowEtapesUpsertArgs>(args: SelectSubset<T, WorkflowEtapesUpsertArgs<ExtArgs>>): Prisma__WorkflowEtapesClient<$Result.GetResult<Prisma.$WorkflowEtapesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowEtapes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEtapesCountArgs} args - Arguments to filter WorkflowEtapes to count.
     * @example
     * // Count the number of WorkflowEtapes
     * const count = await prisma.workflowEtapes.count({
     *   where: {
     *     // ... the filter for the WorkflowEtapes we want to count
     *   }
     * })
    **/
    count<T extends WorkflowEtapesCountArgs>(
      args?: Subset<T, WorkflowEtapesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowEtapesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowEtapes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEtapesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkflowEtapesAggregateArgs>(args: Subset<T, WorkflowEtapesAggregateArgs>): Prisma.PrismaPromise<GetWorkflowEtapesAggregateType<T>>

    /**
     * Group by WorkflowEtapes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEtapesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkflowEtapesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowEtapesGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowEtapesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkflowEtapesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowEtapesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowEtapes model
   */
  readonly fields: WorkflowEtapesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowEtapes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowEtapesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkflowEtapes model
   */
  interface WorkflowEtapesFieldRefs {
    readonly id: FieldRef<"WorkflowEtapes", 'Int'>
    readonly type: FieldRef<"WorkflowEtapes", 'TypeNavette'>
    readonly etape: FieldRef<"WorkflowEtapes", 'Int'>
    readonly roleRequis: FieldRef<"WorkflowEtapes", 'String'>
    readonly description: FieldRef<"WorkflowEtapes", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowEtapes findUnique
   */
  export type WorkflowEtapesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowEtapes to fetch.
     */
    where: WorkflowEtapesWhereUniqueInput
  }

  /**
   * WorkflowEtapes findUniqueOrThrow
   */
  export type WorkflowEtapesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowEtapes to fetch.
     */
    where: WorkflowEtapesWhereUniqueInput
  }

  /**
   * WorkflowEtapes findFirst
   */
  export type WorkflowEtapesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowEtapes to fetch.
     */
    where?: WorkflowEtapesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEtapes to fetch.
     */
    orderBy?: WorkflowEtapesOrderByWithRelationInput | WorkflowEtapesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowEtapes.
     */
    cursor?: WorkflowEtapesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEtapes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEtapes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowEtapes.
     */
    distinct?: WorkflowEtapesScalarFieldEnum | WorkflowEtapesScalarFieldEnum[]
  }

  /**
   * WorkflowEtapes findFirstOrThrow
   */
  export type WorkflowEtapesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowEtapes to fetch.
     */
    where?: WorkflowEtapesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEtapes to fetch.
     */
    orderBy?: WorkflowEtapesOrderByWithRelationInput | WorkflowEtapesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowEtapes.
     */
    cursor?: WorkflowEtapesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEtapes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEtapes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowEtapes.
     */
    distinct?: WorkflowEtapesScalarFieldEnum | WorkflowEtapesScalarFieldEnum[]
  }

  /**
   * WorkflowEtapes findMany
   */
  export type WorkflowEtapesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowEtapes to fetch.
     */
    where?: WorkflowEtapesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEtapes to fetch.
     */
    orderBy?: WorkflowEtapesOrderByWithRelationInput | WorkflowEtapesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowEtapes.
     */
    cursor?: WorkflowEtapesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEtapes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEtapes.
     */
    skip?: number
    distinct?: WorkflowEtapesScalarFieldEnum | WorkflowEtapesScalarFieldEnum[]
  }

  /**
   * WorkflowEtapes create
   */
  export type WorkflowEtapesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
    /**
     * The data needed to create a WorkflowEtapes.
     */
    data: XOR<WorkflowEtapesCreateInput, WorkflowEtapesUncheckedCreateInput>
  }

  /**
   * WorkflowEtapes createMany
   */
  export type WorkflowEtapesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowEtapes.
     */
    data: WorkflowEtapesCreateManyInput | WorkflowEtapesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowEtapes update
   */
  export type WorkflowEtapesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
    /**
     * The data needed to update a WorkflowEtapes.
     */
    data: XOR<WorkflowEtapesUpdateInput, WorkflowEtapesUncheckedUpdateInput>
    /**
     * Choose, which WorkflowEtapes to update.
     */
    where: WorkflowEtapesWhereUniqueInput
  }

  /**
   * WorkflowEtapes updateMany
   */
  export type WorkflowEtapesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowEtapes.
     */
    data: XOR<WorkflowEtapesUpdateManyMutationInput, WorkflowEtapesUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowEtapes to update
     */
    where?: WorkflowEtapesWhereInput
    /**
     * Limit how many WorkflowEtapes to update.
     */
    limit?: number
  }

  /**
   * WorkflowEtapes upsert
   */
  export type WorkflowEtapesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
    /**
     * The filter to search for the WorkflowEtapes to update in case it exists.
     */
    where: WorkflowEtapesWhereUniqueInput
    /**
     * In case the WorkflowEtapes found by the `where` argument doesn't exist, create a new WorkflowEtapes with this data.
     */
    create: XOR<WorkflowEtapesCreateInput, WorkflowEtapesUncheckedCreateInput>
    /**
     * In case the WorkflowEtapes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowEtapesUpdateInput, WorkflowEtapesUncheckedUpdateInput>
  }

  /**
   * WorkflowEtapes delete
   */
  export type WorkflowEtapesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
    /**
     * Filter which WorkflowEtapes to delete.
     */
    where: WorkflowEtapesWhereUniqueInput
  }

  /**
   * WorkflowEtapes deleteMany
   */
  export type WorkflowEtapesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowEtapes to delete
     */
    where?: WorkflowEtapesWhereInput
    /**
     * Limit how many WorkflowEtapes to delete.
     */
    limit?: number
  }

  /**
   * WorkflowEtapes without action
   */
  export type WorkflowEtapesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEtapes
     */
    select?: WorkflowEtapesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowEtapes
     */
    omit?: WorkflowEtapesOmit<ExtArgs> | null
  }


  /**
   * Model Demandeur
   */

  export type AggregateDemandeur = {
    _count: DemandeurCountAggregateOutputType | null
    _avg: DemandeurAvgAggregateOutputType | null
    _sum: DemandeurSumAggregateOutputType | null
    _min: DemandeurMinAggregateOutputType | null
    _max: DemandeurMaxAggregateOutputType | null
  }

  export type DemandeurAvgAggregateOutputType = {
    id: number | null
    etapeActuelle: number | null
    numero: number | null
    quantite: number | null
    fournisseurID: number | null
    pu: Decimal | null
    montant: Decimal | null
    budgetID: number | null
  }

  export type DemandeurSumAggregateOutputType = {
    id: number | null
    etapeActuelle: number | null
    numero: number | null
    quantite: number | null
    fournisseurID: number | null
    pu: Decimal | null
    montant: Decimal | null
    budgetID: number | null
  }

  export type DemandeurMinAggregateOutputType = {
    id: number | null
    auteurMatricule: string | null
    type: $Enums.TypeNavette | null
    etapeActuelle: number | null
    numero: number | null
    objet: string | null
    description: string | null
    motif: string | null
    quantite: number | null
    fournisseurID: number | null
    pu: Decimal | null
    montant: Decimal | null
    devis: string | null
    pieceJointe: string | null
    justificationChoix: string | null
    imputationComptable: string | null
    activite: string | null
    codeTIGER: string | null
    modePaiement: string | null
    paiementDetail: string | null
    numeroBonCommande: string | null
    dateLivraison: Date | null
    versQui: string | null
    statut: $Enums.StatutDemande | null
    budgetID: number | null
    dateDepot: Date | null
    dateFinalisation: Date | null
    isAPGenere: boolean | null
    isBCGenere: boolean | null
    isAPExporte: boolean | null
    reference: string | null
  }

  export type DemandeurMaxAggregateOutputType = {
    id: number | null
    auteurMatricule: string | null
    type: $Enums.TypeNavette | null
    etapeActuelle: number | null
    numero: number | null
    objet: string | null
    description: string | null
    motif: string | null
    quantite: number | null
    fournisseurID: number | null
    pu: Decimal | null
    montant: Decimal | null
    devis: string | null
    pieceJointe: string | null
    justificationChoix: string | null
    imputationComptable: string | null
    activite: string | null
    codeTIGER: string | null
    modePaiement: string | null
    paiementDetail: string | null
    numeroBonCommande: string | null
    dateLivraison: Date | null
    versQui: string | null
    statut: $Enums.StatutDemande | null
    budgetID: number | null
    dateDepot: Date | null
    dateFinalisation: Date | null
    isAPGenere: boolean | null
    isBCGenere: boolean | null
    isAPExporte: boolean | null
    reference: string | null
  }

  export type DemandeurCountAggregateOutputType = {
    id: number
    auteurMatricule: number
    type: number
    etapeActuelle: number
    numero: number
    objet: number
    description: number
    motif: number
    quantite: number
    fournisseurID: number
    pu: number
    montant: number
    devis: number
    pieceJointe: number
    justificationChoix: number
    imputationComptable: number
    activite: number
    codeTIGER: number
    modePaiement: number
    paiementDetail: number
    numeroBonCommande: number
    dateLivraison: number
    versQui: number
    statut: number
    budgetID: number
    dateDepot: number
    dateFinalisation: number
    isAPGenere: number
    isBCGenere: number
    isAPExporte: number
    reference: number
    _all: number
  }


  export type DemandeurAvgAggregateInputType = {
    id?: true
    etapeActuelle?: true
    numero?: true
    quantite?: true
    fournisseurID?: true
    pu?: true
    montant?: true
    budgetID?: true
  }

  export type DemandeurSumAggregateInputType = {
    id?: true
    etapeActuelle?: true
    numero?: true
    quantite?: true
    fournisseurID?: true
    pu?: true
    montant?: true
    budgetID?: true
  }

  export type DemandeurMinAggregateInputType = {
    id?: true
    auteurMatricule?: true
    type?: true
    etapeActuelle?: true
    numero?: true
    objet?: true
    description?: true
    motif?: true
    quantite?: true
    fournisseurID?: true
    pu?: true
    montant?: true
    devis?: true
    pieceJointe?: true
    justificationChoix?: true
    imputationComptable?: true
    activite?: true
    codeTIGER?: true
    modePaiement?: true
    paiementDetail?: true
    numeroBonCommande?: true
    dateLivraison?: true
    versQui?: true
    statut?: true
    budgetID?: true
    dateDepot?: true
    dateFinalisation?: true
    isAPGenere?: true
    isBCGenere?: true
    isAPExporte?: true
    reference?: true
  }

  export type DemandeurMaxAggregateInputType = {
    id?: true
    auteurMatricule?: true
    type?: true
    etapeActuelle?: true
    numero?: true
    objet?: true
    description?: true
    motif?: true
    quantite?: true
    fournisseurID?: true
    pu?: true
    montant?: true
    devis?: true
    pieceJointe?: true
    justificationChoix?: true
    imputationComptable?: true
    activite?: true
    codeTIGER?: true
    modePaiement?: true
    paiementDetail?: true
    numeroBonCommande?: true
    dateLivraison?: true
    versQui?: true
    statut?: true
    budgetID?: true
    dateDepot?: true
    dateFinalisation?: true
    isAPGenere?: true
    isBCGenere?: true
    isAPExporte?: true
    reference?: true
  }

  export type DemandeurCountAggregateInputType = {
    id?: true
    auteurMatricule?: true
    type?: true
    etapeActuelle?: true
    numero?: true
    objet?: true
    description?: true
    motif?: true
    quantite?: true
    fournisseurID?: true
    pu?: true
    montant?: true
    devis?: true
    pieceJointe?: true
    justificationChoix?: true
    imputationComptable?: true
    activite?: true
    codeTIGER?: true
    modePaiement?: true
    paiementDetail?: true
    numeroBonCommande?: true
    dateLivraison?: true
    versQui?: true
    statut?: true
    budgetID?: true
    dateDepot?: true
    dateFinalisation?: true
    isAPGenere?: true
    isBCGenere?: true
    isAPExporte?: true
    reference?: true
    _all?: true
  }

  export type DemandeurAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Demandeur to aggregate.
     */
    where?: DemandeurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Demandeurs to fetch.
     */
    orderBy?: DemandeurOrderByWithRelationInput | DemandeurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DemandeurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Demandeurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Demandeurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Demandeurs
    **/
    _count?: true | DemandeurCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DemandeurAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DemandeurSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DemandeurMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DemandeurMaxAggregateInputType
  }

  export type GetDemandeurAggregateType<T extends DemandeurAggregateArgs> = {
        [P in keyof T & keyof AggregateDemandeur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDemandeur[P]>
      : GetScalarType<T[P], AggregateDemandeur[P]>
  }




  export type DemandeurGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DemandeurWhereInput
    orderBy?: DemandeurOrderByWithAggregationInput | DemandeurOrderByWithAggregationInput[]
    by: DemandeurScalarFieldEnum[] | DemandeurScalarFieldEnum
    having?: DemandeurScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DemandeurCountAggregateInputType | true
    _avg?: DemandeurAvgAggregateInputType
    _sum?: DemandeurSumAggregateInputType
    _min?: DemandeurMinAggregateInputType
    _max?: DemandeurMaxAggregateInputType
  }

  export type DemandeurGroupByOutputType = {
    id: number
    auteurMatricule: string | null
    type: $Enums.TypeNavette
    etapeActuelle: number
    numero: number | null
    objet: string | null
    description: string | null
    motif: string | null
    quantite: number | null
    fournisseurID: number | null
    pu: Decimal | null
    montant: Decimal | null
    devis: string | null
    pieceJointe: string | null
    justificationChoix: string | null
    imputationComptable: string | null
    activite: string | null
    codeTIGER: string | null
    modePaiement: string | null
    paiementDetail: string | null
    numeroBonCommande: string | null
    dateLivraison: Date | null
    versQui: string | null
    statut: $Enums.StatutDemande
    budgetID: number | null
    dateDepot: Date
    dateFinalisation: Date | null
    isAPGenere: boolean
    isBCGenere: boolean
    isAPExporte: boolean
    reference: string | null
    _count: DemandeurCountAggregateOutputType | null
    _avg: DemandeurAvgAggregateOutputType | null
    _sum: DemandeurSumAggregateOutputType | null
    _min: DemandeurMinAggregateOutputType | null
    _max: DemandeurMaxAggregateOutputType | null
  }

  type GetDemandeurGroupByPayload<T extends DemandeurGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DemandeurGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DemandeurGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DemandeurGroupByOutputType[P]>
            : GetScalarType<T[P], DemandeurGroupByOutputType[P]>
        }
      >
    >


  export type DemandeurSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auteurMatricule?: boolean
    type?: boolean
    etapeActuelle?: boolean
    numero?: boolean
    objet?: boolean
    description?: boolean
    motif?: boolean
    quantite?: boolean
    fournisseurID?: boolean
    pu?: boolean
    montant?: boolean
    devis?: boolean
    pieceJointe?: boolean
    justificationChoix?: boolean
    imputationComptable?: boolean
    activite?: boolean
    codeTIGER?: boolean
    modePaiement?: boolean
    paiementDetail?: boolean
    numeroBonCommande?: boolean
    dateLivraison?: boolean
    versQui?: boolean
    statut?: boolean
    budgetID?: boolean
    dateDepot?: boolean
    dateFinalisation?: boolean
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: boolean
    auteur?: boolean | Demandeur$auteurArgs<ExtArgs>
    budget?: boolean | Demandeur$budgetArgs<ExtArgs>
    fournisseur?: boolean | Demandeur$fournisseurArgs<ExtArgs>
    historique?: boolean | Demandeur$historiqueArgs<ExtArgs>
    _count?: boolean | DemandeurCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demandeur"]>



  export type DemandeurSelectScalar = {
    id?: boolean
    auteurMatricule?: boolean
    type?: boolean
    etapeActuelle?: boolean
    numero?: boolean
    objet?: boolean
    description?: boolean
    motif?: boolean
    quantite?: boolean
    fournisseurID?: boolean
    pu?: boolean
    montant?: boolean
    devis?: boolean
    pieceJointe?: boolean
    justificationChoix?: boolean
    imputationComptable?: boolean
    activite?: boolean
    codeTIGER?: boolean
    modePaiement?: boolean
    paiementDetail?: boolean
    numeroBonCommande?: boolean
    dateLivraison?: boolean
    versQui?: boolean
    statut?: boolean
    budgetID?: boolean
    dateDepot?: boolean
    dateFinalisation?: boolean
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: boolean
  }

  export type DemandeurOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "auteurMatricule" | "type" | "etapeActuelle" | "numero" | "objet" | "description" | "motif" | "quantite" | "fournisseurID" | "pu" | "montant" | "devis" | "pieceJointe" | "justificationChoix" | "imputationComptable" | "activite" | "codeTIGER" | "modePaiement" | "paiementDetail" | "numeroBonCommande" | "dateLivraison" | "versQui" | "statut" | "budgetID" | "dateDepot" | "dateFinalisation" | "isAPGenere" | "isBCGenere" | "isAPExporte" | "reference", ExtArgs["result"]["demandeur"]>
  export type DemandeurInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auteur?: boolean | Demandeur$auteurArgs<ExtArgs>
    budget?: boolean | Demandeur$budgetArgs<ExtArgs>
    fournisseur?: boolean | Demandeur$fournisseurArgs<ExtArgs>
    historique?: boolean | Demandeur$historiqueArgs<ExtArgs>
    _count?: boolean | DemandeurCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $DemandeurPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Demandeur"
    objects: {
      auteur: Prisma.$CollaborateurPayload<ExtArgs> | null
      budget: Prisma.$BudgetPayload<ExtArgs> | null
      fournisseur: Prisma.$FournisseurPayload<ExtArgs> | null
      historique: Prisma.$HistoriqueValidationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      auteurMatricule: string | null
      type: $Enums.TypeNavette
      etapeActuelle: number
      numero: number | null
      objet: string | null
      description: string | null
      motif: string | null
      quantite: number | null
      fournisseurID: number | null
      pu: Prisma.Decimal | null
      montant: Prisma.Decimal | null
      devis: string | null
      pieceJointe: string | null
      justificationChoix: string | null
      imputationComptable: string | null
      activite: string | null
      codeTIGER: string | null
      modePaiement: string | null
      paiementDetail: string | null
      numeroBonCommande: string | null
      dateLivraison: Date | null
      versQui: string | null
      statut: $Enums.StatutDemande
      budgetID: number | null
      dateDepot: Date
      dateFinalisation: Date | null
      isAPGenere: boolean
      isBCGenere: boolean
      isAPExporte: boolean
      reference: string | null
    }, ExtArgs["result"]["demandeur"]>
    composites: {}
  }

  type DemandeurGetPayload<S extends boolean | null | undefined | DemandeurDefaultArgs> = $Result.GetResult<Prisma.$DemandeurPayload, S>

  type DemandeurCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DemandeurFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DemandeurCountAggregateInputType | true
    }

  export interface DemandeurDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Demandeur'], meta: { name: 'Demandeur' } }
    /**
     * Find zero or one Demandeur that matches the filter.
     * @param {DemandeurFindUniqueArgs} args - Arguments to find a Demandeur
     * @example
     * // Get one Demandeur
     * const demandeur = await prisma.demandeur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DemandeurFindUniqueArgs>(args: SelectSubset<T, DemandeurFindUniqueArgs<ExtArgs>>): Prisma__DemandeurClient<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Demandeur that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DemandeurFindUniqueOrThrowArgs} args - Arguments to find a Demandeur
     * @example
     * // Get one Demandeur
     * const demandeur = await prisma.demandeur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DemandeurFindUniqueOrThrowArgs>(args: SelectSubset<T, DemandeurFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DemandeurClient<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Demandeur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeurFindFirstArgs} args - Arguments to find a Demandeur
     * @example
     * // Get one Demandeur
     * const demandeur = await prisma.demandeur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DemandeurFindFirstArgs>(args?: SelectSubset<T, DemandeurFindFirstArgs<ExtArgs>>): Prisma__DemandeurClient<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Demandeur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeurFindFirstOrThrowArgs} args - Arguments to find a Demandeur
     * @example
     * // Get one Demandeur
     * const demandeur = await prisma.demandeur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DemandeurFindFirstOrThrowArgs>(args?: SelectSubset<T, DemandeurFindFirstOrThrowArgs<ExtArgs>>): Prisma__DemandeurClient<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Demandeurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeurFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Demandeurs
     * const demandeurs = await prisma.demandeur.findMany()
     * 
     * // Get first 10 Demandeurs
     * const demandeurs = await prisma.demandeur.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const demandeurWithIdOnly = await prisma.demandeur.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DemandeurFindManyArgs>(args?: SelectSubset<T, DemandeurFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Demandeur.
     * @param {DemandeurCreateArgs} args - Arguments to create a Demandeur.
     * @example
     * // Create one Demandeur
     * const Demandeur = await prisma.demandeur.create({
     *   data: {
     *     // ... data to create a Demandeur
     *   }
     * })
     * 
     */
    create<T extends DemandeurCreateArgs>(args: SelectSubset<T, DemandeurCreateArgs<ExtArgs>>): Prisma__DemandeurClient<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Demandeurs.
     * @param {DemandeurCreateManyArgs} args - Arguments to create many Demandeurs.
     * @example
     * // Create many Demandeurs
     * const demandeur = await prisma.demandeur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DemandeurCreateManyArgs>(args?: SelectSubset<T, DemandeurCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Demandeur.
     * @param {DemandeurDeleteArgs} args - Arguments to delete one Demandeur.
     * @example
     * // Delete one Demandeur
     * const Demandeur = await prisma.demandeur.delete({
     *   where: {
     *     // ... filter to delete one Demandeur
     *   }
     * })
     * 
     */
    delete<T extends DemandeurDeleteArgs>(args: SelectSubset<T, DemandeurDeleteArgs<ExtArgs>>): Prisma__DemandeurClient<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Demandeur.
     * @param {DemandeurUpdateArgs} args - Arguments to update one Demandeur.
     * @example
     * // Update one Demandeur
     * const demandeur = await prisma.demandeur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DemandeurUpdateArgs>(args: SelectSubset<T, DemandeurUpdateArgs<ExtArgs>>): Prisma__DemandeurClient<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Demandeurs.
     * @param {DemandeurDeleteManyArgs} args - Arguments to filter Demandeurs to delete.
     * @example
     * // Delete a few Demandeurs
     * const { count } = await prisma.demandeur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DemandeurDeleteManyArgs>(args?: SelectSubset<T, DemandeurDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Demandeurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeurUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Demandeurs
     * const demandeur = await prisma.demandeur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DemandeurUpdateManyArgs>(args: SelectSubset<T, DemandeurUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Demandeur.
     * @param {DemandeurUpsertArgs} args - Arguments to update or create a Demandeur.
     * @example
     * // Update or create a Demandeur
     * const demandeur = await prisma.demandeur.upsert({
     *   create: {
     *     // ... data to create a Demandeur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Demandeur we want to update
     *   }
     * })
     */
    upsert<T extends DemandeurUpsertArgs>(args: SelectSubset<T, DemandeurUpsertArgs<ExtArgs>>): Prisma__DemandeurClient<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Demandeurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeurCountArgs} args - Arguments to filter Demandeurs to count.
     * @example
     * // Count the number of Demandeurs
     * const count = await prisma.demandeur.count({
     *   where: {
     *     // ... the filter for the Demandeurs we want to count
     *   }
     * })
    **/
    count<T extends DemandeurCountArgs>(
      args?: Subset<T, DemandeurCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DemandeurCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Demandeur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeurAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DemandeurAggregateArgs>(args: Subset<T, DemandeurAggregateArgs>): Prisma.PrismaPromise<GetDemandeurAggregateType<T>>

    /**
     * Group by Demandeur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeurGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DemandeurGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DemandeurGroupByArgs['orderBy'] }
        : { orderBy?: DemandeurGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DemandeurGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDemandeurGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Demandeur model
   */
  readonly fields: DemandeurFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Demandeur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DemandeurClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auteur<T extends Demandeur$auteurArgs<ExtArgs> = {}>(args?: Subset<T, Demandeur$auteurArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    budget<T extends Demandeur$budgetArgs<ExtArgs> = {}>(args?: Subset<T, Demandeur$budgetArgs<ExtArgs>>): Prisma__BudgetClient<$Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    fournisseur<T extends Demandeur$fournisseurArgs<ExtArgs> = {}>(args?: Subset<T, Demandeur$fournisseurArgs<ExtArgs>>): Prisma__FournisseurClient<$Result.GetResult<Prisma.$FournisseurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    historique<T extends Demandeur$historiqueArgs<ExtArgs> = {}>(args?: Subset<T, Demandeur$historiqueArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Demandeur model
   */
  interface DemandeurFieldRefs {
    readonly id: FieldRef<"Demandeur", 'Int'>
    readonly auteurMatricule: FieldRef<"Demandeur", 'String'>
    readonly type: FieldRef<"Demandeur", 'TypeNavette'>
    readonly etapeActuelle: FieldRef<"Demandeur", 'Int'>
    readonly numero: FieldRef<"Demandeur", 'Int'>
    readonly objet: FieldRef<"Demandeur", 'String'>
    readonly description: FieldRef<"Demandeur", 'String'>
    readonly motif: FieldRef<"Demandeur", 'String'>
    readonly quantite: FieldRef<"Demandeur", 'Int'>
    readonly fournisseurID: FieldRef<"Demandeur", 'Int'>
    readonly pu: FieldRef<"Demandeur", 'Decimal'>
    readonly montant: FieldRef<"Demandeur", 'Decimal'>
    readonly devis: FieldRef<"Demandeur", 'String'>
    readonly pieceJointe: FieldRef<"Demandeur", 'String'>
    readonly justificationChoix: FieldRef<"Demandeur", 'String'>
    readonly imputationComptable: FieldRef<"Demandeur", 'String'>
    readonly activite: FieldRef<"Demandeur", 'String'>
    readonly codeTIGER: FieldRef<"Demandeur", 'String'>
    readonly modePaiement: FieldRef<"Demandeur", 'String'>
    readonly paiementDetail: FieldRef<"Demandeur", 'String'>
    readonly numeroBonCommande: FieldRef<"Demandeur", 'String'>
    readonly dateLivraison: FieldRef<"Demandeur", 'DateTime'>
    readonly versQui: FieldRef<"Demandeur", 'String'>
    readonly statut: FieldRef<"Demandeur", 'StatutDemande'>
    readonly budgetID: FieldRef<"Demandeur", 'Int'>
    readonly dateDepot: FieldRef<"Demandeur", 'DateTime'>
    readonly dateFinalisation: FieldRef<"Demandeur", 'DateTime'>
    readonly isAPGenere: FieldRef<"Demandeur", 'Boolean'>
    readonly isBCGenere: FieldRef<"Demandeur", 'Boolean'>
    readonly isAPExporte: FieldRef<"Demandeur", 'Boolean'>
    readonly reference: FieldRef<"Demandeur", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Demandeur findUnique
   */
  export type DemandeurFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    /**
     * Filter, which Demandeur to fetch.
     */
    where: DemandeurWhereUniqueInput
  }

  /**
   * Demandeur findUniqueOrThrow
   */
  export type DemandeurFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    /**
     * Filter, which Demandeur to fetch.
     */
    where: DemandeurWhereUniqueInput
  }

  /**
   * Demandeur findFirst
   */
  export type DemandeurFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    /**
     * Filter, which Demandeur to fetch.
     */
    where?: DemandeurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Demandeurs to fetch.
     */
    orderBy?: DemandeurOrderByWithRelationInput | DemandeurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Demandeurs.
     */
    cursor?: DemandeurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Demandeurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Demandeurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Demandeurs.
     */
    distinct?: DemandeurScalarFieldEnum | DemandeurScalarFieldEnum[]
  }

  /**
   * Demandeur findFirstOrThrow
   */
  export type DemandeurFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    /**
     * Filter, which Demandeur to fetch.
     */
    where?: DemandeurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Demandeurs to fetch.
     */
    orderBy?: DemandeurOrderByWithRelationInput | DemandeurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Demandeurs.
     */
    cursor?: DemandeurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Demandeurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Demandeurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Demandeurs.
     */
    distinct?: DemandeurScalarFieldEnum | DemandeurScalarFieldEnum[]
  }

  /**
   * Demandeur findMany
   */
  export type DemandeurFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    /**
     * Filter, which Demandeurs to fetch.
     */
    where?: DemandeurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Demandeurs to fetch.
     */
    orderBy?: DemandeurOrderByWithRelationInput | DemandeurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Demandeurs.
     */
    cursor?: DemandeurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Demandeurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Demandeurs.
     */
    skip?: number
    distinct?: DemandeurScalarFieldEnum | DemandeurScalarFieldEnum[]
  }

  /**
   * Demandeur create
   */
  export type DemandeurCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    /**
     * The data needed to create a Demandeur.
     */
    data: XOR<DemandeurCreateInput, DemandeurUncheckedCreateInput>
  }

  /**
   * Demandeur createMany
   */
  export type DemandeurCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Demandeurs.
     */
    data: DemandeurCreateManyInput | DemandeurCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Demandeur update
   */
  export type DemandeurUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    /**
     * The data needed to update a Demandeur.
     */
    data: XOR<DemandeurUpdateInput, DemandeurUncheckedUpdateInput>
    /**
     * Choose, which Demandeur to update.
     */
    where: DemandeurWhereUniqueInput
  }

  /**
   * Demandeur updateMany
   */
  export type DemandeurUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Demandeurs.
     */
    data: XOR<DemandeurUpdateManyMutationInput, DemandeurUncheckedUpdateManyInput>
    /**
     * Filter which Demandeurs to update
     */
    where?: DemandeurWhereInput
    /**
     * Limit how many Demandeurs to update.
     */
    limit?: number
  }

  /**
   * Demandeur upsert
   */
  export type DemandeurUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    /**
     * The filter to search for the Demandeur to update in case it exists.
     */
    where: DemandeurWhereUniqueInput
    /**
     * In case the Demandeur found by the `where` argument doesn't exist, create a new Demandeur with this data.
     */
    create: XOR<DemandeurCreateInput, DemandeurUncheckedCreateInput>
    /**
     * In case the Demandeur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DemandeurUpdateInput, DemandeurUncheckedUpdateInput>
  }

  /**
   * Demandeur delete
   */
  export type DemandeurDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
    /**
     * Filter which Demandeur to delete.
     */
    where: DemandeurWhereUniqueInput
  }

  /**
   * Demandeur deleteMany
   */
  export type DemandeurDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Demandeurs to delete
     */
    where?: DemandeurWhereInput
    /**
     * Limit how many Demandeurs to delete.
     */
    limit?: number
  }

  /**
   * Demandeur.auteur
   */
  export type Demandeur$auteurArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    where?: CollaborateurWhereInput
  }

  /**
   * Demandeur.budget
   */
  export type Demandeur$budgetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Budget
     */
    select?: BudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Budget
     */
    omit?: BudgetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetInclude<ExtArgs> | null
    where?: BudgetWhereInput
  }

  /**
   * Demandeur.fournisseur
   */
  export type Demandeur$fournisseurArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fournisseur
     */
    select?: FournisseurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fournisseur
     */
    omit?: FournisseurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FournisseurInclude<ExtArgs> | null
    where?: FournisseurWhereInput
  }

  /**
   * Demandeur.historique
   */
  export type Demandeur$historiqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    where?: HistoriqueValidationWhereInput
    orderBy?: HistoriqueValidationOrderByWithRelationInput | HistoriqueValidationOrderByWithRelationInput[]
    cursor?: HistoriqueValidationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistoriqueValidationScalarFieldEnum | HistoriqueValidationScalarFieldEnum[]
  }

  /**
   * Demandeur without action
   */
  export type DemandeurDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demandeur
     */
    select?: DemandeurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demandeur
     */
    omit?: DemandeurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeurInclude<ExtArgs> | null
  }


  /**
   * Model HistoriqueValidation
   */

  export type AggregateHistoriqueValidation = {
    _count: HistoriqueValidationCountAggregateOutputType | null
    _avg: HistoriqueValidationAvgAggregateOutputType | null
    _sum: HistoriqueValidationSumAggregateOutputType | null
    _min: HistoriqueValidationMinAggregateOutputType | null
    _max: HistoriqueValidationMaxAggregateOutputType | null
  }

  export type HistoriqueValidationAvgAggregateOutputType = {
    id: number | null
    demandeurID: number | null
    etape: number | null
    id_navette: number | null
  }

  export type HistoriqueValidationSumAggregateOutputType = {
    id: number | null
    demandeurID: number | null
    etape: number | null
    id_navette: number | null
  }

  export type HistoriqueValidationMinAggregateOutputType = {
    id: number | null
    demandeurID: number | null
    etape: number | null
    valideurMatricule: string | null
    statut: $Enums.StatutValidation | null
    motifRefus: string | null
    dateValidation: Date | null
    id_navette: number | null
    reference_navette: string | null
  }

  export type HistoriqueValidationMaxAggregateOutputType = {
    id: number | null
    demandeurID: number | null
    etape: number | null
    valideurMatricule: string | null
    statut: $Enums.StatutValidation | null
    motifRefus: string | null
    dateValidation: Date | null
    id_navette: number | null
    reference_navette: string | null
  }

  export type HistoriqueValidationCountAggregateOutputType = {
    id: number
    demandeurID: number
    etape: number
    valideurMatricule: number
    statut: number
    motifRefus: number
    dateValidation: number
    id_navette: number
    reference_navette: number
    _all: number
  }


  export type HistoriqueValidationAvgAggregateInputType = {
    id?: true
    demandeurID?: true
    etape?: true
    id_navette?: true
  }

  export type HistoriqueValidationSumAggregateInputType = {
    id?: true
    demandeurID?: true
    etape?: true
    id_navette?: true
  }

  export type HistoriqueValidationMinAggregateInputType = {
    id?: true
    demandeurID?: true
    etape?: true
    valideurMatricule?: true
    statut?: true
    motifRefus?: true
    dateValidation?: true
    id_navette?: true
    reference_navette?: true
  }

  export type HistoriqueValidationMaxAggregateInputType = {
    id?: true
    demandeurID?: true
    etape?: true
    valideurMatricule?: true
    statut?: true
    motifRefus?: true
    dateValidation?: true
    id_navette?: true
    reference_navette?: true
  }

  export type HistoriqueValidationCountAggregateInputType = {
    id?: true
    demandeurID?: true
    etape?: true
    valideurMatricule?: true
    statut?: true
    motifRefus?: true
    dateValidation?: true
    id_navette?: true
    reference_navette?: true
    _all?: true
  }

  export type HistoriqueValidationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistoriqueValidation to aggregate.
     */
    where?: HistoriqueValidationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoriqueValidations to fetch.
     */
    orderBy?: HistoriqueValidationOrderByWithRelationInput | HistoriqueValidationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HistoriqueValidationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoriqueValidations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoriqueValidations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HistoriqueValidations
    **/
    _count?: true | HistoriqueValidationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HistoriqueValidationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HistoriqueValidationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HistoriqueValidationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HistoriqueValidationMaxAggregateInputType
  }

  export type GetHistoriqueValidationAggregateType<T extends HistoriqueValidationAggregateArgs> = {
        [P in keyof T & keyof AggregateHistoriqueValidation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHistoriqueValidation[P]>
      : GetScalarType<T[P], AggregateHistoriqueValidation[P]>
  }




  export type HistoriqueValidationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistoriqueValidationWhereInput
    orderBy?: HistoriqueValidationOrderByWithAggregationInput | HistoriqueValidationOrderByWithAggregationInput[]
    by: HistoriqueValidationScalarFieldEnum[] | HistoriqueValidationScalarFieldEnum
    having?: HistoriqueValidationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HistoriqueValidationCountAggregateInputType | true
    _avg?: HistoriqueValidationAvgAggregateInputType
    _sum?: HistoriqueValidationSumAggregateInputType
    _min?: HistoriqueValidationMinAggregateInputType
    _max?: HistoriqueValidationMaxAggregateInputType
  }

  export type HistoriqueValidationGroupByOutputType = {
    id: number
    demandeurID: number
    etape: number
    valideurMatricule: string | null
    statut: $Enums.StatutValidation
    motifRefus: string | null
    dateValidation: Date
    id_navette: number | null
    reference_navette: string | null
    _count: HistoriqueValidationCountAggregateOutputType | null
    _avg: HistoriqueValidationAvgAggregateOutputType | null
    _sum: HistoriqueValidationSumAggregateOutputType | null
    _min: HistoriqueValidationMinAggregateOutputType | null
    _max: HistoriqueValidationMaxAggregateOutputType | null
  }

  type GetHistoriqueValidationGroupByPayload<T extends HistoriqueValidationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HistoriqueValidationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HistoriqueValidationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HistoriqueValidationGroupByOutputType[P]>
            : GetScalarType<T[P], HistoriqueValidationGroupByOutputType[P]>
        }
      >
    >


  export type HistoriqueValidationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    demandeurID?: boolean
    etape?: boolean
    valideurMatricule?: boolean
    statut?: boolean
    motifRefus?: boolean
    dateValidation?: boolean
    id_navette?: boolean
    reference_navette?: boolean
    demandeur?: boolean | DemandeurDefaultArgs<ExtArgs>
    valideur?: boolean | HistoriqueValidation$valideurArgs<ExtArgs>
  }, ExtArgs["result"]["historiqueValidation"]>



  export type HistoriqueValidationSelectScalar = {
    id?: boolean
    demandeurID?: boolean
    etape?: boolean
    valideurMatricule?: boolean
    statut?: boolean
    motifRefus?: boolean
    dateValidation?: boolean
    id_navette?: boolean
    reference_navette?: boolean
  }

  export type HistoriqueValidationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "demandeurID" | "etape" | "valideurMatricule" | "statut" | "motifRefus" | "dateValidation" | "id_navette" | "reference_navette", ExtArgs["result"]["historiqueValidation"]>
  export type HistoriqueValidationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demandeur?: boolean | DemandeurDefaultArgs<ExtArgs>
    valideur?: boolean | HistoriqueValidation$valideurArgs<ExtArgs>
  }

  export type $HistoriqueValidationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HistoriqueValidation"
    objects: {
      demandeur: Prisma.$DemandeurPayload<ExtArgs>
      valideur: Prisma.$CollaborateurPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      demandeurID: number
      etape: number
      valideurMatricule: string | null
      statut: $Enums.StatutValidation
      motifRefus: string | null
      dateValidation: Date
      id_navette: number | null
      reference_navette: string | null
    }, ExtArgs["result"]["historiqueValidation"]>
    composites: {}
  }

  type HistoriqueValidationGetPayload<S extends boolean | null | undefined | HistoriqueValidationDefaultArgs> = $Result.GetResult<Prisma.$HistoriqueValidationPayload, S>

  type HistoriqueValidationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HistoriqueValidationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HistoriqueValidationCountAggregateInputType | true
    }

  export interface HistoriqueValidationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HistoriqueValidation'], meta: { name: 'HistoriqueValidation' } }
    /**
     * Find zero or one HistoriqueValidation that matches the filter.
     * @param {HistoriqueValidationFindUniqueArgs} args - Arguments to find a HistoriqueValidation
     * @example
     * // Get one HistoriqueValidation
     * const historiqueValidation = await prisma.historiqueValidation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HistoriqueValidationFindUniqueArgs>(args: SelectSubset<T, HistoriqueValidationFindUniqueArgs<ExtArgs>>): Prisma__HistoriqueValidationClient<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HistoriqueValidation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HistoriqueValidationFindUniqueOrThrowArgs} args - Arguments to find a HistoriqueValidation
     * @example
     * // Get one HistoriqueValidation
     * const historiqueValidation = await prisma.historiqueValidation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HistoriqueValidationFindUniqueOrThrowArgs>(args: SelectSubset<T, HistoriqueValidationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HistoriqueValidationClient<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HistoriqueValidation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoriqueValidationFindFirstArgs} args - Arguments to find a HistoriqueValidation
     * @example
     * // Get one HistoriqueValidation
     * const historiqueValidation = await prisma.historiqueValidation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HistoriqueValidationFindFirstArgs>(args?: SelectSubset<T, HistoriqueValidationFindFirstArgs<ExtArgs>>): Prisma__HistoriqueValidationClient<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HistoriqueValidation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoriqueValidationFindFirstOrThrowArgs} args - Arguments to find a HistoriqueValidation
     * @example
     * // Get one HistoriqueValidation
     * const historiqueValidation = await prisma.historiqueValidation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HistoriqueValidationFindFirstOrThrowArgs>(args?: SelectSubset<T, HistoriqueValidationFindFirstOrThrowArgs<ExtArgs>>): Prisma__HistoriqueValidationClient<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HistoriqueValidations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoriqueValidationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HistoriqueValidations
     * const historiqueValidations = await prisma.historiqueValidation.findMany()
     * 
     * // Get first 10 HistoriqueValidations
     * const historiqueValidations = await prisma.historiqueValidation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const historiqueValidationWithIdOnly = await prisma.historiqueValidation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HistoriqueValidationFindManyArgs>(args?: SelectSubset<T, HistoriqueValidationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HistoriqueValidation.
     * @param {HistoriqueValidationCreateArgs} args - Arguments to create a HistoriqueValidation.
     * @example
     * // Create one HistoriqueValidation
     * const HistoriqueValidation = await prisma.historiqueValidation.create({
     *   data: {
     *     // ... data to create a HistoriqueValidation
     *   }
     * })
     * 
     */
    create<T extends HistoriqueValidationCreateArgs>(args: SelectSubset<T, HistoriqueValidationCreateArgs<ExtArgs>>): Prisma__HistoriqueValidationClient<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HistoriqueValidations.
     * @param {HistoriqueValidationCreateManyArgs} args - Arguments to create many HistoriqueValidations.
     * @example
     * // Create many HistoriqueValidations
     * const historiqueValidation = await prisma.historiqueValidation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HistoriqueValidationCreateManyArgs>(args?: SelectSubset<T, HistoriqueValidationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a HistoriqueValidation.
     * @param {HistoriqueValidationDeleteArgs} args - Arguments to delete one HistoriqueValidation.
     * @example
     * // Delete one HistoriqueValidation
     * const HistoriqueValidation = await prisma.historiqueValidation.delete({
     *   where: {
     *     // ... filter to delete one HistoriqueValidation
     *   }
     * })
     * 
     */
    delete<T extends HistoriqueValidationDeleteArgs>(args: SelectSubset<T, HistoriqueValidationDeleteArgs<ExtArgs>>): Prisma__HistoriqueValidationClient<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HistoriqueValidation.
     * @param {HistoriqueValidationUpdateArgs} args - Arguments to update one HistoriqueValidation.
     * @example
     * // Update one HistoriqueValidation
     * const historiqueValidation = await prisma.historiqueValidation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HistoriqueValidationUpdateArgs>(args: SelectSubset<T, HistoriqueValidationUpdateArgs<ExtArgs>>): Prisma__HistoriqueValidationClient<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HistoriqueValidations.
     * @param {HistoriqueValidationDeleteManyArgs} args - Arguments to filter HistoriqueValidations to delete.
     * @example
     * // Delete a few HistoriqueValidations
     * const { count } = await prisma.historiqueValidation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HistoriqueValidationDeleteManyArgs>(args?: SelectSubset<T, HistoriqueValidationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HistoriqueValidations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoriqueValidationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HistoriqueValidations
     * const historiqueValidation = await prisma.historiqueValidation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HistoriqueValidationUpdateManyArgs>(args: SelectSubset<T, HistoriqueValidationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HistoriqueValidation.
     * @param {HistoriqueValidationUpsertArgs} args - Arguments to update or create a HistoriqueValidation.
     * @example
     * // Update or create a HistoriqueValidation
     * const historiqueValidation = await prisma.historiqueValidation.upsert({
     *   create: {
     *     // ... data to create a HistoriqueValidation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HistoriqueValidation we want to update
     *   }
     * })
     */
    upsert<T extends HistoriqueValidationUpsertArgs>(args: SelectSubset<T, HistoriqueValidationUpsertArgs<ExtArgs>>): Prisma__HistoriqueValidationClient<$Result.GetResult<Prisma.$HistoriqueValidationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HistoriqueValidations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoriqueValidationCountArgs} args - Arguments to filter HistoriqueValidations to count.
     * @example
     * // Count the number of HistoriqueValidations
     * const count = await prisma.historiqueValidation.count({
     *   where: {
     *     // ... the filter for the HistoriqueValidations we want to count
     *   }
     * })
    **/
    count<T extends HistoriqueValidationCountArgs>(
      args?: Subset<T, HistoriqueValidationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HistoriqueValidationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HistoriqueValidation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoriqueValidationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HistoriqueValidationAggregateArgs>(args: Subset<T, HistoriqueValidationAggregateArgs>): Prisma.PrismaPromise<GetHistoriqueValidationAggregateType<T>>

    /**
     * Group by HistoriqueValidation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoriqueValidationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HistoriqueValidationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HistoriqueValidationGroupByArgs['orderBy'] }
        : { orderBy?: HistoriqueValidationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HistoriqueValidationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistoriqueValidationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HistoriqueValidation model
   */
  readonly fields: HistoriqueValidationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HistoriqueValidation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HistoriqueValidationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    demandeur<T extends DemandeurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DemandeurDefaultArgs<ExtArgs>>): Prisma__DemandeurClient<$Result.GetResult<Prisma.$DemandeurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    valideur<T extends HistoriqueValidation$valideurArgs<ExtArgs> = {}>(args?: Subset<T, HistoriqueValidation$valideurArgs<ExtArgs>>): Prisma__CollaborateurClient<$Result.GetResult<Prisma.$CollaborateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HistoriqueValidation model
   */
  interface HistoriqueValidationFieldRefs {
    readonly id: FieldRef<"HistoriqueValidation", 'Int'>
    readonly demandeurID: FieldRef<"HistoriqueValidation", 'Int'>
    readonly etape: FieldRef<"HistoriqueValidation", 'Int'>
    readonly valideurMatricule: FieldRef<"HistoriqueValidation", 'String'>
    readonly statut: FieldRef<"HistoriqueValidation", 'StatutValidation'>
    readonly motifRefus: FieldRef<"HistoriqueValidation", 'String'>
    readonly dateValidation: FieldRef<"HistoriqueValidation", 'DateTime'>
    readonly id_navette: FieldRef<"HistoriqueValidation", 'Int'>
    readonly reference_navette: FieldRef<"HistoriqueValidation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * HistoriqueValidation findUnique
   */
  export type HistoriqueValidationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    /**
     * Filter, which HistoriqueValidation to fetch.
     */
    where: HistoriqueValidationWhereUniqueInput
  }

  /**
   * HistoriqueValidation findUniqueOrThrow
   */
  export type HistoriqueValidationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    /**
     * Filter, which HistoriqueValidation to fetch.
     */
    where: HistoriqueValidationWhereUniqueInput
  }

  /**
   * HistoriqueValidation findFirst
   */
  export type HistoriqueValidationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    /**
     * Filter, which HistoriqueValidation to fetch.
     */
    where?: HistoriqueValidationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoriqueValidations to fetch.
     */
    orderBy?: HistoriqueValidationOrderByWithRelationInput | HistoriqueValidationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistoriqueValidations.
     */
    cursor?: HistoriqueValidationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoriqueValidations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoriqueValidations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistoriqueValidations.
     */
    distinct?: HistoriqueValidationScalarFieldEnum | HistoriqueValidationScalarFieldEnum[]
  }

  /**
   * HistoriqueValidation findFirstOrThrow
   */
  export type HistoriqueValidationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    /**
     * Filter, which HistoriqueValidation to fetch.
     */
    where?: HistoriqueValidationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoriqueValidations to fetch.
     */
    orderBy?: HistoriqueValidationOrderByWithRelationInput | HistoriqueValidationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistoriqueValidations.
     */
    cursor?: HistoriqueValidationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoriqueValidations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoriqueValidations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistoriqueValidations.
     */
    distinct?: HistoriqueValidationScalarFieldEnum | HistoriqueValidationScalarFieldEnum[]
  }

  /**
   * HistoriqueValidation findMany
   */
  export type HistoriqueValidationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    /**
     * Filter, which HistoriqueValidations to fetch.
     */
    where?: HistoriqueValidationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoriqueValidations to fetch.
     */
    orderBy?: HistoriqueValidationOrderByWithRelationInput | HistoriqueValidationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HistoriqueValidations.
     */
    cursor?: HistoriqueValidationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoriqueValidations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoriqueValidations.
     */
    skip?: number
    distinct?: HistoriqueValidationScalarFieldEnum | HistoriqueValidationScalarFieldEnum[]
  }

  /**
   * HistoriqueValidation create
   */
  export type HistoriqueValidationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    /**
     * The data needed to create a HistoriqueValidation.
     */
    data: XOR<HistoriqueValidationCreateInput, HistoriqueValidationUncheckedCreateInput>
  }

  /**
   * HistoriqueValidation createMany
   */
  export type HistoriqueValidationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HistoriqueValidations.
     */
    data: HistoriqueValidationCreateManyInput | HistoriqueValidationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HistoriqueValidation update
   */
  export type HistoriqueValidationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    /**
     * The data needed to update a HistoriqueValidation.
     */
    data: XOR<HistoriqueValidationUpdateInput, HistoriqueValidationUncheckedUpdateInput>
    /**
     * Choose, which HistoriqueValidation to update.
     */
    where: HistoriqueValidationWhereUniqueInput
  }

  /**
   * HistoriqueValidation updateMany
   */
  export type HistoriqueValidationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HistoriqueValidations.
     */
    data: XOR<HistoriqueValidationUpdateManyMutationInput, HistoriqueValidationUncheckedUpdateManyInput>
    /**
     * Filter which HistoriqueValidations to update
     */
    where?: HistoriqueValidationWhereInput
    /**
     * Limit how many HistoriqueValidations to update.
     */
    limit?: number
  }

  /**
   * HistoriqueValidation upsert
   */
  export type HistoriqueValidationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    /**
     * The filter to search for the HistoriqueValidation to update in case it exists.
     */
    where: HistoriqueValidationWhereUniqueInput
    /**
     * In case the HistoriqueValidation found by the `where` argument doesn't exist, create a new HistoriqueValidation with this data.
     */
    create: XOR<HistoriqueValidationCreateInput, HistoriqueValidationUncheckedCreateInput>
    /**
     * In case the HistoriqueValidation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HistoriqueValidationUpdateInput, HistoriqueValidationUncheckedUpdateInput>
  }

  /**
   * HistoriqueValidation delete
   */
  export type HistoriqueValidationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
    /**
     * Filter which HistoriqueValidation to delete.
     */
    where: HistoriqueValidationWhereUniqueInput
  }

  /**
   * HistoriqueValidation deleteMany
   */
  export type HistoriqueValidationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistoriqueValidations to delete
     */
    where?: HistoriqueValidationWhereInput
    /**
     * Limit how many HistoriqueValidations to delete.
     */
    limit?: number
  }

  /**
   * HistoriqueValidation.valideur
   */
  export type HistoriqueValidation$valideurArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborateur
     */
    select?: CollaborateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborateur
     */
    omit?: CollaborateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaborateurInclude<ExtArgs> | null
    where?: CollaborateurWhereInput
  }

  /**
   * HistoriqueValidation without action
   */
  export type HistoriqueValidationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoriqueValidation
     */
    select?: HistoriqueValidationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistoriqueValidation
     */
    omit?: HistoriqueValidationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoriqueValidationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    nomService: 'nomService',
    abreviation: 'abreviation',
    chefServiceMatricule: 'chefServiceMatricule'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const FournisseurScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    adresse: 'adresse',
    nomCheque: 'nomCheque',
    nif: 'nif',
    cin: 'cin'
  };

  export type FournisseurScalarFieldEnum = (typeof FournisseurScalarFieldEnum)[keyof typeof FournisseurScalarFieldEnum]


  export const FonctionScalarFieldEnum: {
    id: 'id',
    nomFonction: 'nomFonction',
    abreviation: 'abreviation',
    serviceId: 'serviceId',
    chefMatricule: 'chefMatricule'
  };

  export type FonctionScalarFieldEnum = (typeof FonctionScalarFieldEnum)[keyof typeof FonctionScalarFieldEnum]


  export const CollaborateurScalarFieldEnum: {
    id: 'id',
    matricule: 'matricule',
    nom: 'nom',
    prenom: 'prenom',
    prenomUsuelle: 'prenomUsuelle',
    civilite: 'civilite',
    fonctionAbbrev: 'fonctionAbbrev',
    serviceAbbrev: 'serviceAbbrev',
    telephone: 'telephone',
    mailPro: 'mailPro',
    photo: 'photo'
  };

  export type CollaborateurScalarFieldEnum = (typeof CollaborateurScalarFieldEnum)[keyof typeof CollaborateurScalarFieldEnum]


  export const ComptesUtilisateursScalarFieldEnum: {
    matricule_collaborateur: 'matricule_collaborateur',
    motDePasse: 'motDePasse'
  };

  export type ComptesUtilisateursScalarFieldEnum = (typeof ComptesUtilisateursScalarFieldEnum)[keyof typeof ComptesUtilisateursScalarFieldEnum]


  export const RolesScalarFieldEnum: {
    id: 'id',
    nomRole: 'nomRole'
  };

  export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum]


  export const CollaborateurRolesScalarFieldEnum: {
    matricule: 'matricule',
    roleID: 'roleID'
  };

  export type CollaborateurRolesScalarFieldEnum = (typeof CollaborateurRolesScalarFieldEnum)[keyof typeof CollaborateurRolesScalarFieldEnum]


  export const BudgetScalarFieldEnum: {
    id: 'id',
    codeBudgetaire: 'codeBudgetaire',
    montantDisponible: 'montantDisponible',
    serviceId: 'serviceId'
  };

  export type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum]


  export const WorkflowEtapesScalarFieldEnum: {
    id: 'id',
    type: 'type',
    etape: 'etape',
    roleRequis: 'roleRequis',
    description: 'description'
  };

  export type WorkflowEtapesScalarFieldEnum = (typeof WorkflowEtapesScalarFieldEnum)[keyof typeof WorkflowEtapesScalarFieldEnum]


  export const DemandeurScalarFieldEnum: {
    id: 'id',
    auteurMatricule: 'auteurMatricule',
    type: 'type',
    etapeActuelle: 'etapeActuelle',
    numero: 'numero',
    objet: 'objet',
    description: 'description',
    motif: 'motif',
    quantite: 'quantite',
    fournisseurID: 'fournisseurID',
    pu: 'pu',
    montant: 'montant',
    devis: 'devis',
    pieceJointe: 'pieceJointe',
    justificationChoix: 'justificationChoix',
    imputationComptable: 'imputationComptable',
    activite: 'activite',
    codeTIGER: 'codeTIGER',
    modePaiement: 'modePaiement',
    paiementDetail: 'paiementDetail',
    numeroBonCommande: 'numeroBonCommande',
    dateLivraison: 'dateLivraison',
    versQui: 'versQui',
    statut: 'statut',
    budgetID: 'budgetID',
    dateDepot: 'dateDepot',
    dateFinalisation: 'dateFinalisation',
    isAPGenere: 'isAPGenere',
    isBCGenere: 'isBCGenere',
    isAPExporte: 'isAPExporte',
    reference: 'reference'
  };

  export type DemandeurScalarFieldEnum = (typeof DemandeurScalarFieldEnum)[keyof typeof DemandeurScalarFieldEnum]


  export const HistoriqueValidationScalarFieldEnum: {
    id: 'id',
    demandeurID: 'demandeurID',
    etape: 'etape',
    valideurMatricule: 'valideurMatricule',
    statut: 'statut',
    motifRefus: 'motifRefus',
    dateValidation: 'dateValidation',
    id_navette: 'id_navette',
    reference_navette: 'reference_navette'
  };

  export type HistoriqueValidationScalarFieldEnum = (typeof HistoriqueValidationScalarFieldEnum)[keyof typeof HistoriqueValidationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ServiceOrderByRelevanceFieldEnum: {
    nomService: 'nomService',
    abreviation: 'abreviation',
    chefServiceMatricule: 'chefServiceMatricule'
  };

  export type ServiceOrderByRelevanceFieldEnum = (typeof ServiceOrderByRelevanceFieldEnum)[keyof typeof ServiceOrderByRelevanceFieldEnum]


  export const FournisseurOrderByRelevanceFieldEnum: {
    nom: 'nom',
    adresse: 'adresse',
    nomCheque: 'nomCheque',
    nif: 'nif',
    cin: 'cin'
  };

  export type FournisseurOrderByRelevanceFieldEnum = (typeof FournisseurOrderByRelevanceFieldEnum)[keyof typeof FournisseurOrderByRelevanceFieldEnum]


  export const FonctionOrderByRelevanceFieldEnum: {
    nomFonction: 'nomFonction',
    abreviation: 'abreviation',
    chefMatricule: 'chefMatricule'
  };

  export type FonctionOrderByRelevanceFieldEnum = (typeof FonctionOrderByRelevanceFieldEnum)[keyof typeof FonctionOrderByRelevanceFieldEnum]


  export const CollaborateurOrderByRelevanceFieldEnum: {
    matricule: 'matricule',
    nom: 'nom',
    prenom: 'prenom',
    prenomUsuelle: 'prenomUsuelle',
    fonctionAbbrev: 'fonctionAbbrev',
    serviceAbbrev: 'serviceAbbrev',
    telephone: 'telephone',
    mailPro: 'mailPro',
    photo: 'photo'
  };

  export type CollaborateurOrderByRelevanceFieldEnum = (typeof CollaborateurOrderByRelevanceFieldEnum)[keyof typeof CollaborateurOrderByRelevanceFieldEnum]


  export const ComptesUtilisateursOrderByRelevanceFieldEnum: {
    matricule_collaborateur: 'matricule_collaborateur',
    motDePasse: 'motDePasse'
  };

  export type ComptesUtilisateursOrderByRelevanceFieldEnum = (typeof ComptesUtilisateursOrderByRelevanceFieldEnum)[keyof typeof ComptesUtilisateursOrderByRelevanceFieldEnum]


  export const RolesOrderByRelevanceFieldEnum: {
    nomRole: 'nomRole'
  };

  export type RolesOrderByRelevanceFieldEnum = (typeof RolesOrderByRelevanceFieldEnum)[keyof typeof RolesOrderByRelevanceFieldEnum]


  export const CollaborateurRolesOrderByRelevanceFieldEnum: {
    matricule: 'matricule'
  };

  export type CollaborateurRolesOrderByRelevanceFieldEnum = (typeof CollaborateurRolesOrderByRelevanceFieldEnum)[keyof typeof CollaborateurRolesOrderByRelevanceFieldEnum]


  export const BudgetOrderByRelevanceFieldEnum: {
    codeBudgetaire: 'codeBudgetaire'
  };

  export type BudgetOrderByRelevanceFieldEnum = (typeof BudgetOrderByRelevanceFieldEnum)[keyof typeof BudgetOrderByRelevanceFieldEnum]


  export const WorkflowEtapesOrderByRelevanceFieldEnum: {
    roleRequis: 'roleRequis',
    description: 'description'
  };

  export type WorkflowEtapesOrderByRelevanceFieldEnum = (typeof WorkflowEtapesOrderByRelevanceFieldEnum)[keyof typeof WorkflowEtapesOrderByRelevanceFieldEnum]


  export const DemandeurOrderByRelevanceFieldEnum: {
    auteurMatricule: 'auteurMatricule',
    objet: 'objet',
    description: 'description',
    motif: 'motif',
    devis: 'devis',
    pieceJointe: 'pieceJointe',
    justificationChoix: 'justificationChoix',
    imputationComptable: 'imputationComptable',
    activite: 'activite',
    codeTIGER: 'codeTIGER',
    modePaiement: 'modePaiement',
    paiementDetail: 'paiementDetail',
    numeroBonCommande: 'numeroBonCommande',
    versQui: 'versQui',
    reference: 'reference'
  };

  export type DemandeurOrderByRelevanceFieldEnum = (typeof DemandeurOrderByRelevanceFieldEnum)[keyof typeof DemandeurOrderByRelevanceFieldEnum]


  export const HistoriqueValidationOrderByRelevanceFieldEnum: {
    valideurMatricule: 'valideurMatricule',
    motifRefus: 'motifRefus',
    reference_navette: 'reference_navette'
  };

  export type HistoriqueValidationOrderByRelevanceFieldEnum = (typeof HistoriqueValidationOrderByRelevanceFieldEnum)[keyof typeof HistoriqueValidationOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Civilite'
   */
  export type EnumCiviliteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Civilite'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'TypeNavette'
   */
  export type EnumTypeNavetteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeNavette'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'StatutDemande'
   */
  export type EnumStatutDemandeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutDemande'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'StatutValidation'
   */
  export type EnumStatutValidationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutValidation'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: IntFilter<"Service"> | number
    nomService?: StringFilter<"Service"> | string
    abreviation?: StringNullableFilter<"Service"> | string | null
    chefServiceMatricule?: StringNullableFilter<"Service"> | string | null
    budgets?: BudgetListRelationFilter
    collaborateurs?: CollaborateurListRelationFilter
    fonctions?: FonctionListRelationFilter
    chef?: XOR<CollaborateurNullableScalarRelationFilter, CollaborateurWhereInput> | null
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    nomService?: SortOrder
    abreviation?: SortOrderInput | SortOrder
    chefServiceMatricule?: SortOrderInput | SortOrder
    budgets?: BudgetOrderByRelationAggregateInput
    collaborateurs?: CollaborateurOrderByRelationAggregateInput
    fonctions?: FonctionOrderByRelationAggregateInput
    chef?: CollaborateurOrderByWithRelationInput
    _relevance?: ServiceOrderByRelevanceInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nomService?: string
    abreviation?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    chefServiceMatricule?: StringNullableFilter<"Service"> | string | null
    budgets?: BudgetListRelationFilter
    collaborateurs?: CollaborateurListRelationFilter
    fonctions?: FonctionListRelationFilter
    chef?: XOR<CollaborateurNullableScalarRelationFilter, CollaborateurWhereInput> | null
  }, "id" | "nomService" | "abreviation">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    nomService?: SortOrder
    abreviation?: SortOrderInput | SortOrder
    chefServiceMatricule?: SortOrderInput | SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Service"> | number
    nomService?: StringWithAggregatesFilter<"Service"> | string
    abreviation?: StringNullableWithAggregatesFilter<"Service"> | string | null
    chefServiceMatricule?: StringNullableWithAggregatesFilter<"Service"> | string | null
  }

  export type FournisseurWhereInput = {
    AND?: FournisseurWhereInput | FournisseurWhereInput[]
    OR?: FournisseurWhereInput[]
    NOT?: FournisseurWhereInput | FournisseurWhereInput[]
    id?: IntFilter<"Fournisseur"> | number
    nom?: StringNullableFilter<"Fournisseur"> | string | null
    adresse?: StringNullableFilter<"Fournisseur"> | string | null
    nomCheque?: StringNullableFilter<"Fournisseur"> | string | null
    nif?: StringNullableFilter<"Fournisseur"> | string | null
    cin?: StringNullableFilter<"Fournisseur"> | string | null
    demandes?: DemandeurListRelationFilter
  }

  export type FournisseurOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrderInput | SortOrder
    adresse?: SortOrderInput | SortOrder
    nomCheque?: SortOrderInput | SortOrder
    nif?: SortOrderInput | SortOrder
    cin?: SortOrderInput | SortOrder
    demandes?: DemandeurOrderByRelationAggregateInput
    _relevance?: FournisseurOrderByRelevanceInput
  }

  export type FournisseurWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FournisseurWhereInput | FournisseurWhereInput[]
    OR?: FournisseurWhereInput[]
    NOT?: FournisseurWhereInput | FournisseurWhereInput[]
    nom?: StringNullableFilter<"Fournisseur"> | string | null
    adresse?: StringNullableFilter<"Fournisseur"> | string | null
    nomCheque?: StringNullableFilter<"Fournisseur"> | string | null
    nif?: StringNullableFilter<"Fournisseur"> | string | null
    cin?: StringNullableFilter<"Fournisseur"> | string | null
    demandes?: DemandeurListRelationFilter
  }, "id">

  export type FournisseurOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrderInput | SortOrder
    adresse?: SortOrderInput | SortOrder
    nomCheque?: SortOrderInput | SortOrder
    nif?: SortOrderInput | SortOrder
    cin?: SortOrderInput | SortOrder
    _count?: FournisseurCountOrderByAggregateInput
    _avg?: FournisseurAvgOrderByAggregateInput
    _max?: FournisseurMaxOrderByAggregateInput
    _min?: FournisseurMinOrderByAggregateInput
    _sum?: FournisseurSumOrderByAggregateInput
  }

  export type FournisseurScalarWhereWithAggregatesInput = {
    AND?: FournisseurScalarWhereWithAggregatesInput | FournisseurScalarWhereWithAggregatesInput[]
    OR?: FournisseurScalarWhereWithAggregatesInput[]
    NOT?: FournisseurScalarWhereWithAggregatesInput | FournisseurScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Fournisseur"> | number
    nom?: StringNullableWithAggregatesFilter<"Fournisseur"> | string | null
    adresse?: StringNullableWithAggregatesFilter<"Fournisseur"> | string | null
    nomCheque?: StringNullableWithAggregatesFilter<"Fournisseur"> | string | null
    nif?: StringNullableWithAggregatesFilter<"Fournisseur"> | string | null
    cin?: StringNullableWithAggregatesFilter<"Fournisseur"> | string | null
  }

  export type FonctionWhereInput = {
    AND?: FonctionWhereInput | FonctionWhereInput[]
    OR?: FonctionWhereInput[]
    NOT?: FonctionWhereInput | FonctionWhereInput[]
    id?: IntFilter<"Fonction"> | number
    nomFonction?: StringFilter<"Fonction"> | string
    abreviation?: StringNullableFilter<"Fonction"> | string | null
    serviceId?: IntNullableFilter<"Fonction"> | number | null
    chefMatricule?: StringNullableFilter<"Fonction"> | string | null
    collaborateurs?: CollaborateurListRelationFilter
    chef?: XOR<CollaborateurNullableScalarRelationFilter, CollaborateurWhereInput> | null
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
  }

  export type FonctionOrderByWithRelationInput = {
    id?: SortOrder
    nomFonction?: SortOrder
    abreviation?: SortOrderInput | SortOrder
    serviceId?: SortOrderInput | SortOrder
    chefMatricule?: SortOrderInput | SortOrder
    collaborateurs?: CollaborateurOrderByRelationAggregateInput
    chef?: CollaborateurOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
    _relevance?: FonctionOrderByRelevanceInput
  }

  export type FonctionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nomFonction?: string
    abreviation?: string
    AND?: FonctionWhereInput | FonctionWhereInput[]
    OR?: FonctionWhereInput[]
    NOT?: FonctionWhereInput | FonctionWhereInput[]
    serviceId?: IntNullableFilter<"Fonction"> | number | null
    chefMatricule?: StringNullableFilter<"Fonction"> | string | null
    collaborateurs?: CollaborateurListRelationFilter
    chef?: XOR<CollaborateurNullableScalarRelationFilter, CollaborateurWhereInput> | null
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
  }, "id" | "nomFonction" | "abreviation">

  export type FonctionOrderByWithAggregationInput = {
    id?: SortOrder
    nomFonction?: SortOrder
    abreviation?: SortOrderInput | SortOrder
    serviceId?: SortOrderInput | SortOrder
    chefMatricule?: SortOrderInput | SortOrder
    _count?: FonctionCountOrderByAggregateInput
    _avg?: FonctionAvgOrderByAggregateInput
    _max?: FonctionMaxOrderByAggregateInput
    _min?: FonctionMinOrderByAggregateInput
    _sum?: FonctionSumOrderByAggregateInput
  }

  export type FonctionScalarWhereWithAggregatesInput = {
    AND?: FonctionScalarWhereWithAggregatesInput | FonctionScalarWhereWithAggregatesInput[]
    OR?: FonctionScalarWhereWithAggregatesInput[]
    NOT?: FonctionScalarWhereWithAggregatesInput | FonctionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Fonction"> | number
    nomFonction?: StringWithAggregatesFilter<"Fonction"> | string
    abreviation?: StringNullableWithAggregatesFilter<"Fonction"> | string | null
    serviceId?: IntNullableWithAggregatesFilter<"Fonction"> | number | null
    chefMatricule?: StringNullableWithAggregatesFilter<"Fonction"> | string | null
  }

  export type CollaborateurWhereInput = {
    AND?: CollaborateurWhereInput | CollaborateurWhereInput[]
    OR?: CollaborateurWhereInput[]
    NOT?: CollaborateurWhereInput | CollaborateurWhereInput[]
    id?: IntFilter<"Collaborateur"> | number
    matricule?: StringFilter<"Collaborateur"> | string
    nom?: StringNullableFilter<"Collaborateur"> | string | null
    prenom?: StringNullableFilter<"Collaborateur"> | string | null
    prenomUsuelle?: StringNullableFilter<"Collaborateur"> | string | null
    civilite?: EnumCiviliteNullableFilter<"Collaborateur"> | $Enums.Civilite | null
    fonctionAbbrev?: StringNullableFilter<"Collaborateur"> | string | null
    serviceAbbrev?: StringNullableFilter<"Collaborateur"> | string | null
    telephone?: StringNullableFilter<"Collaborateur"> | string | null
    mailPro?: StringNullableFilter<"Collaborateur"> | string | null
    photo?: StringNullableFilter<"Collaborateur"> | string | null
    collaborateurRoles?: CollaborateurRolesListRelationFilter
    fonction?: XOR<FonctionNullableScalarRelationFilter, FonctionWhereInput> | null
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
    comptes?: XOR<ComptesUtilisateursNullableScalarRelationFilter, ComptesUtilisateursWhereInput> | null
    demandes?: DemandeurListRelationFilter
    fonctionsChef?: FonctionListRelationFilter
    historiqueValide?: HistoriqueValidationListRelationFilter
    servicesChef?: ServiceListRelationFilter
  }

  export type CollaborateurOrderByWithRelationInput = {
    id?: SortOrder
    matricule?: SortOrder
    nom?: SortOrderInput | SortOrder
    prenom?: SortOrderInput | SortOrder
    prenomUsuelle?: SortOrderInput | SortOrder
    civilite?: SortOrderInput | SortOrder
    fonctionAbbrev?: SortOrderInput | SortOrder
    serviceAbbrev?: SortOrderInput | SortOrder
    telephone?: SortOrderInput | SortOrder
    mailPro?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    collaborateurRoles?: CollaborateurRolesOrderByRelationAggregateInput
    fonction?: FonctionOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
    comptes?: ComptesUtilisateursOrderByWithRelationInput
    demandes?: DemandeurOrderByRelationAggregateInput
    fonctionsChef?: FonctionOrderByRelationAggregateInput
    historiqueValide?: HistoriqueValidationOrderByRelationAggregateInput
    servicesChef?: ServiceOrderByRelationAggregateInput
    _relevance?: CollaborateurOrderByRelevanceInput
  }

  export type CollaborateurWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    matricule?: string
    AND?: CollaborateurWhereInput | CollaborateurWhereInput[]
    OR?: CollaborateurWhereInput[]
    NOT?: CollaborateurWhereInput | CollaborateurWhereInput[]
    nom?: StringNullableFilter<"Collaborateur"> | string | null
    prenom?: StringNullableFilter<"Collaborateur"> | string | null
    prenomUsuelle?: StringNullableFilter<"Collaborateur"> | string | null
    civilite?: EnumCiviliteNullableFilter<"Collaborateur"> | $Enums.Civilite | null
    fonctionAbbrev?: StringNullableFilter<"Collaborateur"> | string | null
    serviceAbbrev?: StringNullableFilter<"Collaborateur"> | string | null
    telephone?: StringNullableFilter<"Collaborateur"> | string | null
    mailPro?: StringNullableFilter<"Collaborateur"> | string | null
    photo?: StringNullableFilter<"Collaborateur"> | string | null
    collaborateurRoles?: CollaborateurRolesListRelationFilter
    fonction?: XOR<FonctionNullableScalarRelationFilter, FonctionWhereInput> | null
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
    comptes?: XOR<ComptesUtilisateursNullableScalarRelationFilter, ComptesUtilisateursWhereInput> | null
    demandes?: DemandeurListRelationFilter
    fonctionsChef?: FonctionListRelationFilter
    historiqueValide?: HistoriqueValidationListRelationFilter
    servicesChef?: ServiceListRelationFilter
  }, "id" | "matricule">

  export type CollaborateurOrderByWithAggregationInput = {
    id?: SortOrder
    matricule?: SortOrder
    nom?: SortOrderInput | SortOrder
    prenom?: SortOrderInput | SortOrder
    prenomUsuelle?: SortOrderInput | SortOrder
    civilite?: SortOrderInput | SortOrder
    fonctionAbbrev?: SortOrderInput | SortOrder
    serviceAbbrev?: SortOrderInput | SortOrder
    telephone?: SortOrderInput | SortOrder
    mailPro?: SortOrderInput | SortOrder
    photo?: SortOrderInput | SortOrder
    _count?: CollaborateurCountOrderByAggregateInput
    _avg?: CollaborateurAvgOrderByAggregateInput
    _max?: CollaborateurMaxOrderByAggregateInput
    _min?: CollaborateurMinOrderByAggregateInput
    _sum?: CollaborateurSumOrderByAggregateInput
  }

  export type CollaborateurScalarWhereWithAggregatesInput = {
    AND?: CollaborateurScalarWhereWithAggregatesInput | CollaborateurScalarWhereWithAggregatesInput[]
    OR?: CollaborateurScalarWhereWithAggregatesInput[]
    NOT?: CollaborateurScalarWhereWithAggregatesInput | CollaborateurScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Collaborateur"> | number
    matricule?: StringWithAggregatesFilter<"Collaborateur"> | string
    nom?: StringNullableWithAggregatesFilter<"Collaborateur"> | string | null
    prenom?: StringNullableWithAggregatesFilter<"Collaborateur"> | string | null
    prenomUsuelle?: StringNullableWithAggregatesFilter<"Collaborateur"> | string | null
    civilite?: EnumCiviliteNullableWithAggregatesFilter<"Collaborateur"> | $Enums.Civilite | null
    fonctionAbbrev?: StringNullableWithAggregatesFilter<"Collaborateur"> | string | null
    serviceAbbrev?: StringNullableWithAggregatesFilter<"Collaborateur"> | string | null
    telephone?: StringNullableWithAggregatesFilter<"Collaborateur"> | string | null
    mailPro?: StringNullableWithAggregatesFilter<"Collaborateur"> | string | null
    photo?: StringNullableWithAggregatesFilter<"Collaborateur"> | string | null
  }

  export type ComptesUtilisateursWhereInput = {
    AND?: ComptesUtilisateursWhereInput | ComptesUtilisateursWhereInput[]
    OR?: ComptesUtilisateursWhereInput[]
    NOT?: ComptesUtilisateursWhereInput | ComptesUtilisateursWhereInput[]
    matricule_collaborateur?: StringFilter<"ComptesUtilisateurs"> | string
    motDePasse?: StringFilter<"ComptesUtilisateurs"> | string
    collaborateur?: XOR<CollaborateurScalarRelationFilter, CollaborateurWhereInput>
  }

  export type ComptesUtilisateursOrderByWithRelationInput = {
    matricule_collaborateur?: SortOrder
    motDePasse?: SortOrder
    collaborateur?: CollaborateurOrderByWithRelationInput
    _relevance?: ComptesUtilisateursOrderByRelevanceInput
  }

  export type ComptesUtilisateursWhereUniqueInput = Prisma.AtLeast<{
    matricule_collaborateur?: string
    AND?: ComptesUtilisateursWhereInput | ComptesUtilisateursWhereInput[]
    OR?: ComptesUtilisateursWhereInput[]
    NOT?: ComptesUtilisateursWhereInput | ComptesUtilisateursWhereInput[]
    motDePasse?: StringFilter<"ComptesUtilisateurs"> | string
    collaborateur?: XOR<CollaborateurScalarRelationFilter, CollaborateurWhereInput>
  }, "matricule_collaborateur">

  export type ComptesUtilisateursOrderByWithAggregationInput = {
    matricule_collaborateur?: SortOrder
    motDePasse?: SortOrder
    _count?: ComptesUtilisateursCountOrderByAggregateInput
    _max?: ComptesUtilisateursMaxOrderByAggregateInput
    _min?: ComptesUtilisateursMinOrderByAggregateInput
  }

  export type ComptesUtilisateursScalarWhereWithAggregatesInput = {
    AND?: ComptesUtilisateursScalarWhereWithAggregatesInput | ComptesUtilisateursScalarWhereWithAggregatesInput[]
    OR?: ComptesUtilisateursScalarWhereWithAggregatesInput[]
    NOT?: ComptesUtilisateursScalarWhereWithAggregatesInput | ComptesUtilisateursScalarWhereWithAggregatesInput[]
    matricule_collaborateur?: StringWithAggregatesFilter<"ComptesUtilisateurs"> | string
    motDePasse?: StringWithAggregatesFilter<"ComptesUtilisateurs"> | string
  }

  export type RolesWhereInput = {
    AND?: RolesWhereInput | RolesWhereInput[]
    OR?: RolesWhereInput[]
    NOT?: RolesWhereInput | RolesWhereInput[]
    id?: IntFilter<"Roles"> | number
    nomRole?: StringFilter<"Roles"> | string
    collaborateurRoles?: CollaborateurRolesListRelationFilter
  }

  export type RolesOrderByWithRelationInput = {
    id?: SortOrder
    nomRole?: SortOrder
    collaborateurRoles?: CollaborateurRolesOrderByRelationAggregateInput
    _relevance?: RolesOrderByRelevanceInput
  }

  export type RolesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nomRole?: string
    AND?: RolesWhereInput | RolesWhereInput[]
    OR?: RolesWhereInput[]
    NOT?: RolesWhereInput | RolesWhereInput[]
    collaborateurRoles?: CollaborateurRolesListRelationFilter
  }, "id" | "nomRole">

  export type RolesOrderByWithAggregationInput = {
    id?: SortOrder
    nomRole?: SortOrder
    _count?: RolesCountOrderByAggregateInput
    _avg?: RolesAvgOrderByAggregateInput
    _max?: RolesMaxOrderByAggregateInput
    _min?: RolesMinOrderByAggregateInput
    _sum?: RolesSumOrderByAggregateInput
  }

  export type RolesScalarWhereWithAggregatesInput = {
    AND?: RolesScalarWhereWithAggregatesInput | RolesScalarWhereWithAggregatesInput[]
    OR?: RolesScalarWhereWithAggregatesInput[]
    NOT?: RolesScalarWhereWithAggregatesInput | RolesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Roles"> | number
    nomRole?: StringWithAggregatesFilter<"Roles"> | string
  }

  export type CollaborateurRolesWhereInput = {
    AND?: CollaborateurRolesWhereInput | CollaborateurRolesWhereInput[]
    OR?: CollaborateurRolesWhereInput[]
    NOT?: CollaborateurRolesWhereInput | CollaborateurRolesWhereInput[]
    matricule?: StringFilter<"CollaborateurRoles"> | string
    roleID?: IntFilter<"CollaborateurRoles"> | number
    collaborateur?: XOR<CollaborateurScalarRelationFilter, CollaborateurWhereInput>
    role?: XOR<RolesScalarRelationFilter, RolesWhereInput>
  }

  export type CollaborateurRolesOrderByWithRelationInput = {
    matricule?: SortOrder
    roleID?: SortOrder
    collaborateur?: CollaborateurOrderByWithRelationInput
    role?: RolesOrderByWithRelationInput
    _relevance?: CollaborateurRolesOrderByRelevanceInput
  }

  export type CollaborateurRolesWhereUniqueInput = Prisma.AtLeast<{
    matricule_roleID?: CollaborateurRolesMatriculeRoleIDCompoundUniqueInput
    AND?: CollaborateurRolesWhereInput | CollaborateurRolesWhereInput[]
    OR?: CollaborateurRolesWhereInput[]
    NOT?: CollaborateurRolesWhereInput | CollaborateurRolesWhereInput[]
    matricule?: StringFilter<"CollaborateurRoles"> | string
    roleID?: IntFilter<"CollaborateurRoles"> | number
    collaborateur?: XOR<CollaborateurScalarRelationFilter, CollaborateurWhereInput>
    role?: XOR<RolesScalarRelationFilter, RolesWhereInput>
  }, "matricule_roleID">

  export type CollaborateurRolesOrderByWithAggregationInput = {
    matricule?: SortOrder
    roleID?: SortOrder
    _count?: CollaborateurRolesCountOrderByAggregateInput
    _avg?: CollaborateurRolesAvgOrderByAggregateInput
    _max?: CollaborateurRolesMaxOrderByAggregateInput
    _min?: CollaborateurRolesMinOrderByAggregateInput
    _sum?: CollaborateurRolesSumOrderByAggregateInput
  }

  export type CollaborateurRolesScalarWhereWithAggregatesInput = {
    AND?: CollaborateurRolesScalarWhereWithAggregatesInput | CollaborateurRolesScalarWhereWithAggregatesInput[]
    OR?: CollaborateurRolesScalarWhereWithAggregatesInput[]
    NOT?: CollaborateurRolesScalarWhereWithAggregatesInput | CollaborateurRolesScalarWhereWithAggregatesInput[]
    matricule?: StringWithAggregatesFilter<"CollaborateurRoles"> | string
    roleID?: IntWithAggregatesFilter<"CollaborateurRoles"> | number
  }

  export type BudgetWhereInput = {
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    id?: IntFilter<"Budget"> | number
    codeBudgetaire?: StringFilter<"Budget"> | string
    montantDisponible?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    serviceId?: IntNullableFilter<"Budget"> | number | null
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
    demandes?: DemandeurListRelationFilter
  }

  export type BudgetOrderByWithRelationInput = {
    id?: SortOrder
    codeBudgetaire?: SortOrder
    montantDisponible?: SortOrder
    serviceId?: SortOrderInput | SortOrder
    service?: ServiceOrderByWithRelationInput
    demandes?: DemandeurOrderByRelationAggregateInput
    _relevance?: BudgetOrderByRelevanceInput
  }

  export type BudgetWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    codeBudgetaire?: string
    AND?: BudgetWhereInput | BudgetWhereInput[]
    OR?: BudgetWhereInput[]
    NOT?: BudgetWhereInput | BudgetWhereInput[]
    montantDisponible?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    serviceId?: IntNullableFilter<"Budget"> | number | null
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
    demandes?: DemandeurListRelationFilter
  }, "id" | "codeBudgetaire">

  export type BudgetOrderByWithAggregationInput = {
    id?: SortOrder
    codeBudgetaire?: SortOrder
    montantDisponible?: SortOrder
    serviceId?: SortOrderInput | SortOrder
    _count?: BudgetCountOrderByAggregateInput
    _avg?: BudgetAvgOrderByAggregateInput
    _max?: BudgetMaxOrderByAggregateInput
    _min?: BudgetMinOrderByAggregateInput
    _sum?: BudgetSumOrderByAggregateInput
  }

  export type BudgetScalarWhereWithAggregatesInput = {
    AND?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    OR?: BudgetScalarWhereWithAggregatesInput[]
    NOT?: BudgetScalarWhereWithAggregatesInput | BudgetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Budget"> | number
    codeBudgetaire?: StringWithAggregatesFilter<"Budget"> | string
    montantDisponible?: DecimalWithAggregatesFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    serviceId?: IntNullableWithAggregatesFilter<"Budget"> | number | null
  }

  export type WorkflowEtapesWhereInput = {
    AND?: WorkflowEtapesWhereInput | WorkflowEtapesWhereInput[]
    OR?: WorkflowEtapesWhereInput[]
    NOT?: WorkflowEtapesWhereInput | WorkflowEtapesWhereInput[]
    id?: IntFilter<"WorkflowEtapes"> | number
    type?: EnumTypeNavetteFilter<"WorkflowEtapes"> | $Enums.TypeNavette
    etape?: IntFilter<"WorkflowEtapes"> | number
    roleRequis?: StringFilter<"WorkflowEtapes"> | string
    description?: StringNullableFilter<"WorkflowEtapes"> | string | null
  }

  export type WorkflowEtapesOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    etape?: SortOrder
    roleRequis?: SortOrder
    description?: SortOrderInput | SortOrder
    _relevance?: WorkflowEtapesOrderByRelevanceInput
  }

  export type WorkflowEtapesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    unique_type_etape?: WorkflowEtapesUnique_type_etapeCompoundUniqueInput
    AND?: WorkflowEtapesWhereInput | WorkflowEtapesWhereInput[]
    OR?: WorkflowEtapesWhereInput[]
    NOT?: WorkflowEtapesWhereInput | WorkflowEtapesWhereInput[]
    type?: EnumTypeNavetteFilter<"WorkflowEtapes"> | $Enums.TypeNavette
    etape?: IntFilter<"WorkflowEtapes"> | number
    roleRequis?: StringFilter<"WorkflowEtapes"> | string
    description?: StringNullableFilter<"WorkflowEtapes"> | string | null
  }, "id" | "unique_type_etape">

  export type WorkflowEtapesOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    etape?: SortOrder
    roleRequis?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: WorkflowEtapesCountOrderByAggregateInput
    _avg?: WorkflowEtapesAvgOrderByAggregateInput
    _max?: WorkflowEtapesMaxOrderByAggregateInput
    _min?: WorkflowEtapesMinOrderByAggregateInput
    _sum?: WorkflowEtapesSumOrderByAggregateInput
  }

  export type WorkflowEtapesScalarWhereWithAggregatesInput = {
    AND?: WorkflowEtapesScalarWhereWithAggregatesInput | WorkflowEtapesScalarWhereWithAggregatesInput[]
    OR?: WorkflowEtapesScalarWhereWithAggregatesInput[]
    NOT?: WorkflowEtapesScalarWhereWithAggregatesInput | WorkflowEtapesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WorkflowEtapes"> | number
    type?: EnumTypeNavetteWithAggregatesFilter<"WorkflowEtapes"> | $Enums.TypeNavette
    etape?: IntWithAggregatesFilter<"WorkflowEtapes"> | number
    roleRequis?: StringWithAggregatesFilter<"WorkflowEtapes"> | string
    description?: StringNullableWithAggregatesFilter<"WorkflowEtapes"> | string | null
  }

  export type DemandeurWhereInput = {
    AND?: DemandeurWhereInput | DemandeurWhereInput[]
    OR?: DemandeurWhereInput[]
    NOT?: DemandeurWhereInput | DemandeurWhereInput[]
    id?: IntFilter<"Demandeur"> | number
    auteurMatricule?: StringNullableFilter<"Demandeur"> | string | null
    type?: EnumTypeNavetteFilter<"Demandeur"> | $Enums.TypeNavette
    etapeActuelle?: IntFilter<"Demandeur"> | number
    numero?: IntNullableFilter<"Demandeur"> | number | null
    objet?: StringNullableFilter<"Demandeur"> | string | null
    description?: StringNullableFilter<"Demandeur"> | string | null
    motif?: StringNullableFilter<"Demandeur"> | string | null
    quantite?: IntNullableFilter<"Demandeur"> | number | null
    fournisseurID?: IntNullableFilter<"Demandeur"> | number | null
    pu?: DecimalNullableFilter<"Demandeur"> | Decimal | DecimalJsLike | number | string | null
    montant?: DecimalNullableFilter<"Demandeur"> | Decimal | DecimalJsLike | number | string | null
    devis?: StringNullableFilter<"Demandeur"> | string | null
    pieceJointe?: StringNullableFilter<"Demandeur"> | string | null
    justificationChoix?: StringNullableFilter<"Demandeur"> | string | null
    imputationComptable?: StringNullableFilter<"Demandeur"> | string | null
    activite?: StringNullableFilter<"Demandeur"> | string | null
    codeTIGER?: StringNullableFilter<"Demandeur"> | string | null
    modePaiement?: StringNullableFilter<"Demandeur"> | string | null
    paiementDetail?: StringNullableFilter<"Demandeur"> | string | null
    numeroBonCommande?: StringNullableFilter<"Demandeur"> | string | null
    dateLivraison?: DateTimeNullableFilter<"Demandeur"> | Date | string | null
    versQui?: StringNullableFilter<"Demandeur"> | string | null
    statut?: EnumStatutDemandeFilter<"Demandeur"> | $Enums.StatutDemande
    budgetID?: IntNullableFilter<"Demandeur"> | number | null
    dateDepot?: DateTimeFilter<"Demandeur"> | Date | string
    dateFinalisation?: DateTimeNullableFilter<"Demandeur"> | Date | string | null
    isAPGenere?: BoolFilter<"Demandeur"> | boolean
    isBCGenere?: BoolFilter<"Demandeur"> | boolean
    isAPExporte?: BoolFilter<"Demandeur"> | boolean
    reference?: StringNullableFilter<"Demandeur"> | string | null
    auteur?: XOR<CollaborateurNullableScalarRelationFilter, CollaborateurWhereInput> | null
    budget?: XOR<BudgetNullableScalarRelationFilter, BudgetWhereInput> | null
    fournisseur?: XOR<FournisseurNullableScalarRelationFilter, FournisseurWhereInput> | null
    historique?: HistoriqueValidationListRelationFilter
  }

  export type DemandeurOrderByWithRelationInput = {
    id?: SortOrder
    auteurMatricule?: SortOrderInput | SortOrder
    type?: SortOrder
    etapeActuelle?: SortOrder
    numero?: SortOrderInput | SortOrder
    objet?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    motif?: SortOrderInput | SortOrder
    quantite?: SortOrderInput | SortOrder
    fournisseurID?: SortOrderInput | SortOrder
    pu?: SortOrderInput | SortOrder
    montant?: SortOrderInput | SortOrder
    devis?: SortOrderInput | SortOrder
    pieceJointe?: SortOrderInput | SortOrder
    justificationChoix?: SortOrderInput | SortOrder
    imputationComptable?: SortOrderInput | SortOrder
    activite?: SortOrderInput | SortOrder
    codeTIGER?: SortOrderInput | SortOrder
    modePaiement?: SortOrderInput | SortOrder
    paiementDetail?: SortOrderInput | SortOrder
    numeroBonCommande?: SortOrderInput | SortOrder
    dateLivraison?: SortOrderInput | SortOrder
    versQui?: SortOrderInput | SortOrder
    statut?: SortOrder
    budgetID?: SortOrderInput | SortOrder
    dateDepot?: SortOrder
    dateFinalisation?: SortOrderInput | SortOrder
    isAPGenere?: SortOrder
    isBCGenere?: SortOrder
    isAPExporte?: SortOrder
    reference?: SortOrderInput | SortOrder
    auteur?: CollaborateurOrderByWithRelationInput
    budget?: BudgetOrderByWithRelationInput
    fournisseur?: FournisseurOrderByWithRelationInput
    historique?: HistoriqueValidationOrderByRelationAggregateInput
    _relevance?: DemandeurOrderByRelevanceInput
  }

  export type DemandeurWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DemandeurWhereInput | DemandeurWhereInput[]
    OR?: DemandeurWhereInput[]
    NOT?: DemandeurWhereInput | DemandeurWhereInput[]
    auteurMatricule?: StringNullableFilter<"Demandeur"> | string | null
    type?: EnumTypeNavetteFilter<"Demandeur"> | $Enums.TypeNavette
    etapeActuelle?: IntFilter<"Demandeur"> | number
    numero?: IntNullableFilter<"Demandeur"> | number | null
    objet?: StringNullableFilter<"Demandeur"> | string | null
    description?: StringNullableFilter<"Demandeur"> | string | null
    motif?: StringNullableFilter<"Demandeur"> | string | null
    quantite?: IntNullableFilter<"Demandeur"> | number | null
    fournisseurID?: IntNullableFilter<"Demandeur"> | number | null
    pu?: DecimalNullableFilter<"Demandeur"> | Decimal | DecimalJsLike | number | string | null
    montant?: DecimalNullableFilter<"Demandeur"> | Decimal | DecimalJsLike | number | string | null
    devis?: StringNullableFilter<"Demandeur"> | string | null
    pieceJointe?: StringNullableFilter<"Demandeur"> | string | null
    justificationChoix?: StringNullableFilter<"Demandeur"> | string | null
    imputationComptable?: StringNullableFilter<"Demandeur"> | string | null
    activite?: StringNullableFilter<"Demandeur"> | string | null
    codeTIGER?: StringNullableFilter<"Demandeur"> | string | null
    modePaiement?: StringNullableFilter<"Demandeur"> | string | null
    paiementDetail?: StringNullableFilter<"Demandeur"> | string | null
    numeroBonCommande?: StringNullableFilter<"Demandeur"> | string | null
    dateLivraison?: DateTimeNullableFilter<"Demandeur"> | Date | string | null
    versQui?: StringNullableFilter<"Demandeur"> | string | null
    statut?: EnumStatutDemandeFilter<"Demandeur"> | $Enums.StatutDemande
    budgetID?: IntNullableFilter<"Demandeur"> | number | null
    dateDepot?: DateTimeFilter<"Demandeur"> | Date | string
    dateFinalisation?: DateTimeNullableFilter<"Demandeur"> | Date | string | null
    isAPGenere?: BoolFilter<"Demandeur"> | boolean
    isBCGenere?: BoolFilter<"Demandeur"> | boolean
    isAPExporte?: BoolFilter<"Demandeur"> | boolean
    reference?: StringNullableFilter<"Demandeur"> | string | null
    auteur?: XOR<CollaborateurNullableScalarRelationFilter, CollaborateurWhereInput> | null
    budget?: XOR<BudgetNullableScalarRelationFilter, BudgetWhereInput> | null
    fournisseur?: XOR<FournisseurNullableScalarRelationFilter, FournisseurWhereInput> | null
    historique?: HistoriqueValidationListRelationFilter
  }, "id">

  export type DemandeurOrderByWithAggregationInput = {
    id?: SortOrder
    auteurMatricule?: SortOrderInput | SortOrder
    type?: SortOrder
    etapeActuelle?: SortOrder
    numero?: SortOrderInput | SortOrder
    objet?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    motif?: SortOrderInput | SortOrder
    quantite?: SortOrderInput | SortOrder
    fournisseurID?: SortOrderInput | SortOrder
    pu?: SortOrderInput | SortOrder
    montant?: SortOrderInput | SortOrder
    devis?: SortOrderInput | SortOrder
    pieceJointe?: SortOrderInput | SortOrder
    justificationChoix?: SortOrderInput | SortOrder
    imputationComptable?: SortOrderInput | SortOrder
    activite?: SortOrderInput | SortOrder
    codeTIGER?: SortOrderInput | SortOrder
    modePaiement?: SortOrderInput | SortOrder
    paiementDetail?: SortOrderInput | SortOrder
    numeroBonCommande?: SortOrderInput | SortOrder
    dateLivraison?: SortOrderInput | SortOrder
    versQui?: SortOrderInput | SortOrder
    statut?: SortOrder
    budgetID?: SortOrderInput | SortOrder
    dateDepot?: SortOrder
    dateFinalisation?: SortOrderInput | SortOrder
    isAPGenere?: SortOrder
    isBCGenere?: SortOrder
    isAPExporte?: SortOrder
    reference?: SortOrderInput | SortOrder
    _count?: DemandeurCountOrderByAggregateInput
    _avg?: DemandeurAvgOrderByAggregateInput
    _max?: DemandeurMaxOrderByAggregateInput
    _min?: DemandeurMinOrderByAggregateInput
    _sum?: DemandeurSumOrderByAggregateInput
  }

  export type DemandeurScalarWhereWithAggregatesInput = {
    AND?: DemandeurScalarWhereWithAggregatesInput | DemandeurScalarWhereWithAggregatesInput[]
    OR?: DemandeurScalarWhereWithAggregatesInput[]
    NOT?: DemandeurScalarWhereWithAggregatesInput | DemandeurScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Demandeur"> | number
    auteurMatricule?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    type?: EnumTypeNavetteWithAggregatesFilter<"Demandeur"> | $Enums.TypeNavette
    etapeActuelle?: IntWithAggregatesFilter<"Demandeur"> | number
    numero?: IntNullableWithAggregatesFilter<"Demandeur"> | number | null
    objet?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    description?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    motif?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    quantite?: IntNullableWithAggregatesFilter<"Demandeur"> | number | null
    fournisseurID?: IntNullableWithAggregatesFilter<"Demandeur"> | number | null
    pu?: DecimalNullableWithAggregatesFilter<"Demandeur"> | Decimal | DecimalJsLike | number | string | null
    montant?: DecimalNullableWithAggregatesFilter<"Demandeur"> | Decimal | DecimalJsLike | number | string | null
    devis?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    pieceJointe?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    justificationChoix?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    imputationComptable?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    activite?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    codeTIGER?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    modePaiement?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    paiementDetail?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    numeroBonCommande?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    dateLivraison?: DateTimeNullableWithAggregatesFilter<"Demandeur"> | Date | string | null
    versQui?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
    statut?: EnumStatutDemandeWithAggregatesFilter<"Demandeur"> | $Enums.StatutDemande
    budgetID?: IntNullableWithAggregatesFilter<"Demandeur"> | number | null
    dateDepot?: DateTimeWithAggregatesFilter<"Demandeur"> | Date | string
    dateFinalisation?: DateTimeNullableWithAggregatesFilter<"Demandeur"> | Date | string | null
    isAPGenere?: BoolWithAggregatesFilter<"Demandeur"> | boolean
    isBCGenere?: BoolWithAggregatesFilter<"Demandeur"> | boolean
    isAPExporte?: BoolWithAggregatesFilter<"Demandeur"> | boolean
    reference?: StringNullableWithAggregatesFilter<"Demandeur"> | string | null
  }

  export type HistoriqueValidationWhereInput = {
    AND?: HistoriqueValidationWhereInput | HistoriqueValidationWhereInput[]
    OR?: HistoriqueValidationWhereInput[]
    NOT?: HistoriqueValidationWhereInput | HistoriqueValidationWhereInput[]
    id?: IntFilter<"HistoriqueValidation"> | number
    demandeurID?: IntFilter<"HistoriqueValidation"> | number
    etape?: IntFilter<"HistoriqueValidation"> | number
    valideurMatricule?: StringNullableFilter<"HistoriqueValidation"> | string | null
    statut?: EnumStatutValidationFilter<"HistoriqueValidation"> | $Enums.StatutValidation
    motifRefus?: StringNullableFilter<"HistoriqueValidation"> | string | null
    dateValidation?: DateTimeFilter<"HistoriqueValidation"> | Date | string
    id_navette?: IntNullableFilter<"HistoriqueValidation"> | number | null
    reference_navette?: StringNullableFilter<"HistoriqueValidation"> | string | null
    demandeur?: XOR<DemandeurScalarRelationFilter, DemandeurWhereInput>
    valideur?: XOR<CollaborateurNullableScalarRelationFilter, CollaborateurWhereInput> | null
  }

  export type HistoriqueValidationOrderByWithRelationInput = {
    id?: SortOrder
    demandeurID?: SortOrder
    etape?: SortOrder
    valideurMatricule?: SortOrderInput | SortOrder
    statut?: SortOrder
    motifRefus?: SortOrderInput | SortOrder
    dateValidation?: SortOrder
    id_navette?: SortOrderInput | SortOrder
    reference_navette?: SortOrderInput | SortOrder
    demandeur?: DemandeurOrderByWithRelationInput
    valideur?: CollaborateurOrderByWithRelationInput
    _relevance?: HistoriqueValidationOrderByRelevanceInput
  }

  export type HistoriqueValidationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HistoriqueValidationWhereInput | HistoriqueValidationWhereInput[]
    OR?: HistoriqueValidationWhereInput[]
    NOT?: HistoriqueValidationWhereInput | HistoriqueValidationWhereInput[]
    demandeurID?: IntFilter<"HistoriqueValidation"> | number
    etape?: IntFilter<"HistoriqueValidation"> | number
    valideurMatricule?: StringNullableFilter<"HistoriqueValidation"> | string | null
    statut?: EnumStatutValidationFilter<"HistoriqueValidation"> | $Enums.StatutValidation
    motifRefus?: StringNullableFilter<"HistoriqueValidation"> | string | null
    dateValidation?: DateTimeFilter<"HistoriqueValidation"> | Date | string
    id_navette?: IntNullableFilter<"HistoriqueValidation"> | number | null
    reference_navette?: StringNullableFilter<"HistoriqueValidation"> | string | null
    demandeur?: XOR<DemandeurScalarRelationFilter, DemandeurWhereInput>
    valideur?: XOR<CollaborateurNullableScalarRelationFilter, CollaborateurWhereInput> | null
  }, "id">

  export type HistoriqueValidationOrderByWithAggregationInput = {
    id?: SortOrder
    demandeurID?: SortOrder
    etape?: SortOrder
    valideurMatricule?: SortOrderInput | SortOrder
    statut?: SortOrder
    motifRefus?: SortOrderInput | SortOrder
    dateValidation?: SortOrder
    id_navette?: SortOrderInput | SortOrder
    reference_navette?: SortOrderInput | SortOrder
    _count?: HistoriqueValidationCountOrderByAggregateInput
    _avg?: HistoriqueValidationAvgOrderByAggregateInput
    _max?: HistoriqueValidationMaxOrderByAggregateInput
    _min?: HistoriqueValidationMinOrderByAggregateInput
    _sum?: HistoriqueValidationSumOrderByAggregateInput
  }

  export type HistoriqueValidationScalarWhereWithAggregatesInput = {
    AND?: HistoriqueValidationScalarWhereWithAggregatesInput | HistoriqueValidationScalarWhereWithAggregatesInput[]
    OR?: HistoriqueValidationScalarWhereWithAggregatesInput[]
    NOT?: HistoriqueValidationScalarWhereWithAggregatesInput | HistoriqueValidationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HistoriqueValidation"> | number
    demandeurID?: IntWithAggregatesFilter<"HistoriqueValidation"> | number
    etape?: IntWithAggregatesFilter<"HistoriqueValidation"> | number
    valideurMatricule?: StringNullableWithAggregatesFilter<"HistoriqueValidation"> | string | null
    statut?: EnumStatutValidationWithAggregatesFilter<"HistoriqueValidation"> | $Enums.StatutValidation
    motifRefus?: StringNullableWithAggregatesFilter<"HistoriqueValidation"> | string | null
    dateValidation?: DateTimeWithAggregatesFilter<"HistoriqueValidation"> | Date | string
    id_navette?: IntNullableWithAggregatesFilter<"HistoriqueValidation"> | number | null
    reference_navette?: StringNullableWithAggregatesFilter<"HistoriqueValidation"> | string | null
  }

  export type ServiceCreateInput = {
    nomService: string
    abreviation?: string | null
    budgets?: BudgetCreateNestedManyWithoutServiceInput
    collaborateurs?: CollaborateurCreateNestedManyWithoutServiceInput
    fonctions?: FonctionCreateNestedManyWithoutServiceInput
    chef?: CollaborateurCreateNestedOneWithoutServicesChefInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: number
    nomService: string
    abreviation?: string | null
    chefServiceMatricule?: string | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutServiceInput
    collaborateurs?: CollaborateurUncheckedCreateNestedManyWithoutServiceInput
    fonctions?: FonctionUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    budgets?: BudgetUpdateManyWithoutServiceNestedInput
    collaborateurs?: CollaborateurUpdateManyWithoutServiceNestedInput
    fonctions?: FonctionUpdateManyWithoutServiceNestedInput
    chef?: CollaborateurUpdateOneWithoutServicesChefNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    chefServiceMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    budgets?: BudgetUncheckedUpdateManyWithoutServiceNestedInput
    collaborateurs?: CollaborateurUncheckedUpdateManyWithoutServiceNestedInput
    fonctions?: FonctionUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: number
    nomService: string
    abreviation?: string | null
    chefServiceMatricule?: string | null
  }

  export type ServiceUpdateManyMutationInput = {
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    chefServiceMatricule?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FournisseurCreateInput = {
    nom?: string | null
    adresse?: string | null
    nomCheque?: string | null
    nif?: string | null
    cin?: string | null
    demandes?: DemandeurCreateNestedManyWithoutFournisseurInput
  }

  export type FournisseurUncheckedCreateInput = {
    id?: number
    nom?: string | null
    adresse?: string | null
    nomCheque?: string | null
    nif?: string | null
    cin?: string | null
    demandes?: DemandeurUncheckedCreateNestedManyWithoutFournisseurInput
  }

  export type FournisseurUpdateInput = {
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    nomCheque?: NullableStringFieldUpdateOperationsInput | string | null
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    demandes?: DemandeurUpdateManyWithoutFournisseurNestedInput
  }

  export type FournisseurUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    nomCheque?: NullableStringFieldUpdateOperationsInput | string | null
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    demandes?: DemandeurUncheckedUpdateManyWithoutFournisseurNestedInput
  }

  export type FournisseurCreateManyInput = {
    id?: number
    nom?: string | null
    adresse?: string | null
    nomCheque?: string | null
    nif?: string | null
    cin?: string | null
  }

  export type FournisseurUpdateManyMutationInput = {
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    nomCheque?: NullableStringFieldUpdateOperationsInput | string | null
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FournisseurUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    nomCheque?: NullableStringFieldUpdateOperationsInput | string | null
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FonctionCreateInput = {
    nomFonction: string
    abreviation?: string | null
    collaborateurs?: CollaborateurCreateNestedManyWithoutFonctionInput
    chef?: CollaborateurCreateNestedOneWithoutFonctionsChefInput
    service?: ServiceCreateNestedOneWithoutFonctionsInput
  }

  export type FonctionUncheckedCreateInput = {
    id?: number
    nomFonction: string
    abreviation?: string | null
    serviceId?: number | null
    chefMatricule?: string | null
    collaborateurs?: CollaborateurUncheckedCreateNestedManyWithoutFonctionInput
  }

  export type FonctionUpdateInput = {
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurs?: CollaborateurUpdateManyWithoutFonctionNestedInput
    chef?: CollaborateurUpdateOneWithoutFonctionsChefNestedInput
    service?: ServiceUpdateOneWithoutFonctionsNestedInput
  }

  export type FonctionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: NullableIntFieldUpdateOperationsInput | number | null
    chefMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurs?: CollaborateurUncheckedUpdateManyWithoutFonctionNestedInput
  }

  export type FonctionCreateManyInput = {
    id?: number
    nomFonction: string
    abreviation?: string | null
    serviceId?: number | null
    chefMatricule?: string | null
  }

  export type FonctionUpdateManyMutationInput = {
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FonctionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: NullableIntFieldUpdateOperationsInput | number | null
    chefMatricule?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CollaborateurCreateInput = {
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesCreateNestedManyWithoutCollaborateurInput
    fonction?: FonctionCreateNestedOneWithoutCollaborateursInput
    service?: ServiceCreateNestedOneWithoutCollaborateursInput
    comptes?: ComptesUtilisateursCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceCreateNestedManyWithoutChefInput
  }

  export type CollaborateurUncheckedCreateInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesUncheckedCreateNestedManyWithoutCollaborateurInput
    comptes?: ComptesUtilisateursUncheckedCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurUncheckedCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionUncheckedCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationUncheckedCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceUncheckedCreateNestedManyWithoutChefInput
  }

  export type CollaborateurUpdateInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUpdateManyWithoutCollaborateurNestedInput
    fonction?: FonctionUpdateOneWithoutCollaborateursNestedInput
    service?: ServiceUpdateOneWithoutCollaborateursNestedInput
    comptes?: ComptesUtilisateursUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurNestedInput
    comptes?: ComptesUtilisateursUncheckedUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUncheckedUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUncheckedUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUncheckedUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUncheckedUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurCreateManyInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
  }

  export type CollaborateurUpdateManyMutationInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CollaborateurUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComptesUtilisateursCreateInput = {
    motDePasse: string
    collaborateur: CollaborateurCreateNestedOneWithoutComptesInput
  }

  export type ComptesUtilisateursUncheckedCreateInput = {
    matricule_collaborateur: string
    motDePasse: string
  }

  export type ComptesUtilisateursUpdateInput = {
    motDePasse?: StringFieldUpdateOperationsInput | string
    collaborateur?: CollaborateurUpdateOneRequiredWithoutComptesNestedInput
  }

  export type ComptesUtilisateursUncheckedUpdateInput = {
    matricule_collaborateur?: StringFieldUpdateOperationsInput | string
    motDePasse?: StringFieldUpdateOperationsInput | string
  }

  export type ComptesUtilisateursCreateManyInput = {
    matricule_collaborateur: string
    motDePasse: string
  }

  export type ComptesUtilisateursUpdateManyMutationInput = {
    motDePasse?: StringFieldUpdateOperationsInput | string
  }

  export type ComptesUtilisateursUncheckedUpdateManyInput = {
    matricule_collaborateur?: StringFieldUpdateOperationsInput | string
    motDePasse?: StringFieldUpdateOperationsInput | string
  }

  export type RolesCreateInput = {
    nomRole: string
    collaborateurRoles?: CollaborateurRolesCreateNestedManyWithoutRoleInput
  }

  export type RolesUncheckedCreateInput = {
    id?: number
    nomRole: string
    collaborateurRoles?: CollaborateurRolesUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RolesUpdateInput = {
    nomRole?: StringFieldUpdateOperationsInput | string
    collaborateurRoles?: CollaborateurRolesUpdateManyWithoutRoleNestedInput
  }

  export type RolesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomRole?: StringFieldUpdateOperationsInput | string
    collaborateurRoles?: CollaborateurRolesUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RolesCreateManyInput = {
    id?: number
    nomRole: string
  }

  export type RolesUpdateManyMutationInput = {
    nomRole?: StringFieldUpdateOperationsInput | string
  }

  export type RolesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomRole?: StringFieldUpdateOperationsInput | string
  }

  export type CollaborateurRolesCreateInput = {
    collaborateur: CollaborateurCreateNestedOneWithoutCollaborateurRolesInput
    role: RolesCreateNestedOneWithoutCollaborateurRolesInput
  }

  export type CollaborateurRolesUncheckedCreateInput = {
    matricule: string
    roleID: number
  }

  export type CollaborateurRolesUpdateInput = {
    collaborateur?: CollaborateurUpdateOneRequiredWithoutCollaborateurRolesNestedInput
    role?: RolesUpdateOneRequiredWithoutCollaborateurRolesNestedInput
  }

  export type CollaborateurRolesUncheckedUpdateInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    roleID?: IntFieldUpdateOperationsInput | number
  }

  export type CollaborateurRolesCreateManyInput = {
    matricule: string
    roleID: number
  }

  export type CollaborateurRolesUpdateManyMutationInput = {

  }

  export type CollaborateurRolesUncheckedUpdateManyInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    roleID?: IntFieldUpdateOperationsInput | number
  }

  export type BudgetCreateInput = {
    codeBudgetaire: string
    montantDisponible?: Decimal | DecimalJsLike | number | string
    service?: ServiceCreateNestedOneWithoutBudgetsInput
    demandes?: DemandeurCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUncheckedCreateInput = {
    id?: number
    codeBudgetaire: string
    montantDisponible?: Decimal | DecimalJsLike | number | string
    serviceId?: number | null
    demandes?: DemandeurUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUpdateInput = {
    codeBudgetaire?: StringFieldUpdateOperationsInput | string
    montantDisponible?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    service?: ServiceUpdateOneWithoutBudgetsNestedInput
    demandes?: DemandeurUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    codeBudgetaire?: StringFieldUpdateOperationsInput | string
    montantDisponible?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    serviceId?: NullableIntFieldUpdateOperationsInput | number | null
    demandes?: DemandeurUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetCreateManyInput = {
    id?: number
    codeBudgetaire: string
    montantDisponible?: Decimal | DecimalJsLike | number | string
    serviceId?: number | null
  }

  export type BudgetUpdateManyMutationInput = {
    codeBudgetaire?: StringFieldUpdateOperationsInput | string
    montantDisponible?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type BudgetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    codeBudgetaire?: StringFieldUpdateOperationsInput | string
    montantDisponible?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    serviceId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WorkflowEtapesCreateInput = {
    type: $Enums.TypeNavette
    etape: number
    roleRequis: string
    description?: string | null
  }

  export type WorkflowEtapesUncheckedCreateInput = {
    id?: number
    type: $Enums.TypeNavette
    etape: number
    roleRequis: string
    description?: string | null
  }

  export type WorkflowEtapesUpdateInput = {
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etape?: IntFieldUpdateOperationsInput | number
    roleRequis?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowEtapesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etape?: IntFieldUpdateOperationsInput | number
    roleRequis?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowEtapesCreateManyInput = {
    id?: number
    type: $Enums.TypeNavette
    etape: number
    roleRequis: string
    description?: string | null
  }

  export type WorkflowEtapesUpdateManyMutationInput = {
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etape?: IntFieldUpdateOperationsInput | number
    roleRequis?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowEtapesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etape?: IntFieldUpdateOperationsInput | number
    roleRequis?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DemandeurCreateInput = {
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
    auteur?: CollaborateurCreateNestedOneWithoutDemandesInput
    budget?: BudgetCreateNestedOneWithoutDemandesInput
    fournisseur?: FournisseurCreateNestedOneWithoutDemandesInput
    historique?: HistoriqueValidationCreateNestedManyWithoutDemandeurInput
  }

  export type DemandeurUncheckedCreateInput = {
    id?: number
    auteurMatricule?: string | null
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    fournisseurID?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    budgetID?: number | null
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
    historique?: HistoriqueValidationUncheckedCreateNestedManyWithoutDemandeurInput
  }

  export type DemandeurUpdateInput = {
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    auteur?: CollaborateurUpdateOneWithoutDemandesNestedInput
    budget?: BudgetUpdateOneWithoutDemandesNestedInput
    fournisseur?: FournisseurUpdateOneWithoutDemandesNestedInput
    historique?: HistoriqueValidationUpdateManyWithoutDemandeurNestedInput
  }

  export type DemandeurUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    auteurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    fournisseurID?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    budgetID?: NullableIntFieldUpdateOperationsInput | number | null
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    historique?: HistoriqueValidationUncheckedUpdateManyWithoutDemandeurNestedInput
  }

  export type DemandeurCreateManyInput = {
    id?: number
    auteurMatricule?: string | null
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    fournisseurID?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    budgetID?: number | null
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
  }

  export type DemandeurUpdateManyMutationInput = {
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DemandeurUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    auteurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    fournisseurID?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    budgetID?: NullableIntFieldUpdateOperationsInput | number | null
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HistoriqueValidationCreateInput = {
    etape: number
    statut: $Enums.StatutValidation
    motifRefus?: string | null
    dateValidation?: Date | string
    id_navette?: number | null
    reference_navette?: string | null
    demandeur: DemandeurCreateNestedOneWithoutHistoriqueInput
    valideur?: CollaborateurCreateNestedOneWithoutHistoriqueValideInput
  }

  export type HistoriqueValidationUncheckedCreateInput = {
    id?: number
    demandeurID: number
    etape: number
    valideurMatricule?: string | null
    statut: $Enums.StatutValidation
    motifRefus?: string | null
    dateValidation?: Date | string
    id_navette?: number | null
    reference_navette?: string | null
  }

  export type HistoriqueValidationUpdateInput = {
    etape?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
    demandeur?: DemandeurUpdateOneRequiredWithoutHistoriqueNestedInput
    valideur?: CollaborateurUpdateOneWithoutHistoriqueValideNestedInput
  }

  export type HistoriqueValidationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    demandeurID?: IntFieldUpdateOperationsInput | number
    etape?: IntFieldUpdateOperationsInput | number
    valideurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HistoriqueValidationCreateManyInput = {
    id?: number
    demandeurID: number
    etape: number
    valideurMatricule?: string | null
    statut: $Enums.StatutValidation
    motifRefus?: string | null
    dateValidation?: Date | string
    id_navette?: number | null
    reference_navette?: string | null
  }

  export type HistoriqueValidationUpdateManyMutationInput = {
    etape?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HistoriqueValidationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    demandeurID?: IntFieldUpdateOperationsInput | number
    etape?: IntFieldUpdateOperationsInput | number
    valideurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BudgetListRelationFilter = {
    every?: BudgetWhereInput
    some?: BudgetWhereInput
    none?: BudgetWhereInput
  }

  export type CollaborateurListRelationFilter = {
    every?: CollaborateurWhereInput
    some?: CollaborateurWhereInput
    none?: CollaborateurWhereInput
  }

  export type FonctionListRelationFilter = {
    every?: FonctionWhereInput
    some?: FonctionWhereInput
    none?: FonctionWhereInput
  }

  export type CollaborateurNullableScalarRelationFilter = {
    is?: CollaborateurWhereInput | null
    isNot?: CollaborateurWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BudgetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CollaborateurOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FonctionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelevanceInput = {
    fields: ServiceOrderByRelevanceFieldEnum | ServiceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    nomService?: SortOrder
    abreviation?: SortOrder
    chefServiceMatricule?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    nomService?: SortOrder
    abreviation?: SortOrder
    chefServiceMatricule?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    nomService?: SortOrder
    abreviation?: SortOrder
    chefServiceMatricule?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DemandeurListRelationFilter = {
    every?: DemandeurWhereInput
    some?: DemandeurWhereInput
    none?: DemandeurWhereInput
  }

  export type DemandeurOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FournisseurOrderByRelevanceInput = {
    fields: FournisseurOrderByRelevanceFieldEnum | FournisseurOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FournisseurCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    nomCheque?: SortOrder
    nif?: SortOrder
    cin?: SortOrder
  }

  export type FournisseurAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FournisseurMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    nomCheque?: SortOrder
    nif?: SortOrder
    cin?: SortOrder
  }

  export type FournisseurMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    adresse?: SortOrder
    nomCheque?: SortOrder
    nif?: SortOrder
    cin?: SortOrder
  }

  export type FournisseurSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ServiceNullableScalarRelationFilter = {
    is?: ServiceWhereInput | null
    isNot?: ServiceWhereInput | null
  }

  export type FonctionOrderByRelevanceInput = {
    fields: FonctionOrderByRelevanceFieldEnum | FonctionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FonctionCountOrderByAggregateInput = {
    id?: SortOrder
    nomFonction?: SortOrder
    abreviation?: SortOrder
    serviceId?: SortOrder
    chefMatricule?: SortOrder
  }

  export type FonctionAvgOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
  }

  export type FonctionMaxOrderByAggregateInput = {
    id?: SortOrder
    nomFonction?: SortOrder
    abreviation?: SortOrder
    serviceId?: SortOrder
    chefMatricule?: SortOrder
  }

  export type FonctionMinOrderByAggregateInput = {
    id?: SortOrder
    nomFonction?: SortOrder
    abreviation?: SortOrder
    serviceId?: SortOrder
    chefMatricule?: SortOrder
  }

  export type FonctionSumOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumCiviliteNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Civilite | EnumCiviliteFieldRefInput<$PrismaModel> | null
    in?: $Enums.Civilite[] | null
    notIn?: $Enums.Civilite[] | null
    not?: NestedEnumCiviliteNullableFilter<$PrismaModel> | $Enums.Civilite | null
  }

  export type CollaborateurRolesListRelationFilter = {
    every?: CollaborateurRolesWhereInput
    some?: CollaborateurRolesWhereInput
    none?: CollaborateurRolesWhereInput
  }

  export type FonctionNullableScalarRelationFilter = {
    is?: FonctionWhereInput | null
    isNot?: FonctionWhereInput | null
  }

  export type ComptesUtilisateursNullableScalarRelationFilter = {
    is?: ComptesUtilisateursWhereInput | null
    isNot?: ComptesUtilisateursWhereInput | null
  }

  export type HistoriqueValidationListRelationFilter = {
    every?: HistoriqueValidationWhereInput
    some?: HistoriqueValidationWhereInput
    none?: HistoriqueValidationWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type CollaborateurRolesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HistoriqueValidationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CollaborateurOrderByRelevanceInput = {
    fields: CollaborateurOrderByRelevanceFieldEnum | CollaborateurOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CollaborateurCountOrderByAggregateInput = {
    id?: SortOrder
    matricule?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    prenomUsuelle?: SortOrder
    civilite?: SortOrder
    fonctionAbbrev?: SortOrder
    serviceAbbrev?: SortOrder
    telephone?: SortOrder
    mailPro?: SortOrder
    photo?: SortOrder
  }

  export type CollaborateurAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CollaborateurMaxOrderByAggregateInput = {
    id?: SortOrder
    matricule?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    prenomUsuelle?: SortOrder
    civilite?: SortOrder
    fonctionAbbrev?: SortOrder
    serviceAbbrev?: SortOrder
    telephone?: SortOrder
    mailPro?: SortOrder
    photo?: SortOrder
  }

  export type CollaborateurMinOrderByAggregateInput = {
    id?: SortOrder
    matricule?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    prenomUsuelle?: SortOrder
    civilite?: SortOrder
    fonctionAbbrev?: SortOrder
    serviceAbbrev?: SortOrder
    telephone?: SortOrder
    mailPro?: SortOrder
    photo?: SortOrder
  }

  export type CollaborateurSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumCiviliteNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Civilite | EnumCiviliteFieldRefInput<$PrismaModel> | null
    in?: $Enums.Civilite[] | null
    notIn?: $Enums.Civilite[] | null
    not?: NestedEnumCiviliteNullableWithAggregatesFilter<$PrismaModel> | $Enums.Civilite | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCiviliteNullableFilter<$PrismaModel>
    _max?: NestedEnumCiviliteNullableFilter<$PrismaModel>
  }

  export type CollaborateurScalarRelationFilter = {
    is?: CollaborateurWhereInput
    isNot?: CollaborateurWhereInput
  }

  export type ComptesUtilisateursOrderByRelevanceInput = {
    fields: ComptesUtilisateursOrderByRelevanceFieldEnum | ComptesUtilisateursOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ComptesUtilisateursCountOrderByAggregateInput = {
    matricule_collaborateur?: SortOrder
    motDePasse?: SortOrder
  }

  export type ComptesUtilisateursMaxOrderByAggregateInput = {
    matricule_collaborateur?: SortOrder
    motDePasse?: SortOrder
  }

  export type ComptesUtilisateursMinOrderByAggregateInput = {
    matricule_collaborateur?: SortOrder
    motDePasse?: SortOrder
  }

  export type RolesOrderByRelevanceInput = {
    fields: RolesOrderByRelevanceFieldEnum | RolesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RolesCountOrderByAggregateInput = {
    id?: SortOrder
    nomRole?: SortOrder
  }

  export type RolesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolesMaxOrderByAggregateInput = {
    id?: SortOrder
    nomRole?: SortOrder
  }

  export type RolesMinOrderByAggregateInput = {
    id?: SortOrder
    nomRole?: SortOrder
  }

  export type RolesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolesScalarRelationFilter = {
    is?: RolesWhereInput
    isNot?: RolesWhereInput
  }

  export type CollaborateurRolesOrderByRelevanceInput = {
    fields: CollaborateurRolesOrderByRelevanceFieldEnum | CollaborateurRolesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CollaborateurRolesMatriculeRoleIDCompoundUniqueInput = {
    matricule: string
    roleID: number
  }

  export type CollaborateurRolesCountOrderByAggregateInput = {
    matricule?: SortOrder
    roleID?: SortOrder
  }

  export type CollaborateurRolesAvgOrderByAggregateInput = {
    roleID?: SortOrder
  }

  export type CollaborateurRolesMaxOrderByAggregateInput = {
    matricule?: SortOrder
    roleID?: SortOrder
  }

  export type CollaborateurRolesMinOrderByAggregateInput = {
    matricule?: SortOrder
    roleID?: SortOrder
  }

  export type CollaborateurRolesSumOrderByAggregateInput = {
    roleID?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BudgetOrderByRelevanceInput = {
    fields: BudgetOrderByRelevanceFieldEnum | BudgetOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BudgetCountOrderByAggregateInput = {
    id?: SortOrder
    codeBudgetaire?: SortOrder
    montantDisponible?: SortOrder
    serviceId?: SortOrder
  }

  export type BudgetAvgOrderByAggregateInput = {
    id?: SortOrder
    montantDisponible?: SortOrder
    serviceId?: SortOrder
  }

  export type BudgetMaxOrderByAggregateInput = {
    id?: SortOrder
    codeBudgetaire?: SortOrder
    montantDisponible?: SortOrder
    serviceId?: SortOrder
  }

  export type BudgetMinOrderByAggregateInput = {
    id?: SortOrder
    codeBudgetaire?: SortOrder
    montantDisponible?: SortOrder
    serviceId?: SortOrder
  }

  export type BudgetSumOrderByAggregateInput = {
    id?: SortOrder
    montantDisponible?: SortOrder
    serviceId?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumTypeNavetteFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeNavette | EnumTypeNavetteFieldRefInput<$PrismaModel>
    in?: $Enums.TypeNavette[]
    notIn?: $Enums.TypeNavette[]
    not?: NestedEnumTypeNavetteFilter<$PrismaModel> | $Enums.TypeNavette
  }

  export type WorkflowEtapesOrderByRelevanceInput = {
    fields: WorkflowEtapesOrderByRelevanceFieldEnum | WorkflowEtapesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WorkflowEtapesUnique_type_etapeCompoundUniqueInput = {
    type: $Enums.TypeNavette
    etape: number
  }

  export type WorkflowEtapesCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    etape?: SortOrder
    roleRequis?: SortOrder
    description?: SortOrder
  }

  export type WorkflowEtapesAvgOrderByAggregateInput = {
    id?: SortOrder
    etape?: SortOrder
  }

  export type WorkflowEtapesMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    etape?: SortOrder
    roleRequis?: SortOrder
    description?: SortOrder
  }

  export type WorkflowEtapesMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    etape?: SortOrder
    roleRequis?: SortOrder
    description?: SortOrder
  }

  export type WorkflowEtapesSumOrderByAggregateInput = {
    id?: SortOrder
    etape?: SortOrder
  }

  export type EnumTypeNavetteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeNavette | EnumTypeNavetteFieldRefInput<$PrismaModel>
    in?: $Enums.TypeNavette[]
    notIn?: $Enums.TypeNavette[]
    not?: NestedEnumTypeNavetteWithAggregatesFilter<$PrismaModel> | $Enums.TypeNavette
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeNavetteFilter<$PrismaModel>
    _max?: NestedEnumTypeNavetteFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumStatutDemandeFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutDemande | EnumStatutDemandeFieldRefInput<$PrismaModel>
    in?: $Enums.StatutDemande[]
    notIn?: $Enums.StatutDemande[]
    not?: NestedEnumStatutDemandeFilter<$PrismaModel> | $Enums.StatutDemande
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BudgetNullableScalarRelationFilter = {
    is?: BudgetWhereInput | null
    isNot?: BudgetWhereInput | null
  }

  export type FournisseurNullableScalarRelationFilter = {
    is?: FournisseurWhereInput | null
    isNot?: FournisseurWhereInput | null
  }

  export type DemandeurOrderByRelevanceInput = {
    fields: DemandeurOrderByRelevanceFieldEnum | DemandeurOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type DemandeurCountOrderByAggregateInput = {
    id?: SortOrder
    auteurMatricule?: SortOrder
    type?: SortOrder
    etapeActuelle?: SortOrder
    numero?: SortOrder
    objet?: SortOrder
    description?: SortOrder
    motif?: SortOrder
    quantite?: SortOrder
    fournisseurID?: SortOrder
    pu?: SortOrder
    montant?: SortOrder
    devis?: SortOrder
    pieceJointe?: SortOrder
    justificationChoix?: SortOrder
    imputationComptable?: SortOrder
    activite?: SortOrder
    codeTIGER?: SortOrder
    modePaiement?: SortOrder
    paiementDetail?: SortOrder
    numeroBonCommande?: SortOrder
    dateLivraison?: SortOrder
    versQui?: SortOrder
    statut?: SortOrder
    budgetID?: SortOrder
    dateDepot?: SortOrder
    dateFinalisation?: SortOrder
    isAPGenere?: SortOrder
    isBCGenere?: SortOrder
    isAPExporte?: SortOrder
    reference?: SortOrder
  }

  export type DemandeurAvgOrderByAggregateInput = {
    id?: SortOrder
    etapeActuelle?: SortOrder
    numero?: SortOrder
    quantite?: SortOrder
    fournisseurID?: SortOrder
    pu?: SortOrder
    montant?: SortOrder
    budgetID?: SortOrder
  }

  export type DemandeurMaxOrderByAggregateInput = {
    id?: SortOrder
    auteurMatricule?: SortOrder
    type?: SortOrder
    etapeActuelle?: SortOrder
    numero?: SortOrder
    objet?: SortOrder
    description?: SortOrder
    motif?: SortOrder
    quantite?: SortOrder
    fournisseurID?: SortOrder
    pu?: SortOrder
    montant?: SortOrder
    devis?: SortOrder
    pieceJointe?: SortOrder
    justificationChoix?: SortOrder
    imputationComptable?: SortOrder
    activite?: SortOrder
    codeTIGER?: SortOrder
    modePaiement?: SortOrder
    paiementDetail?: SortOrder
    numeroBonCommande?: SortOrder
    dateLivraison?: SortOrder
    versQui?: SortOrder
    statut?: SortOrder
    budgetID?: SortOrder
    dateDepot?: SortOrder
    dateFinalisation?: SortOrder
    isAPGenere?: SortOrder
    isBCGenere?: SortOrder
    isAPExporte?: SortOrder
    reference?: SortOrder
  }

  export type DemandeurMinOrderByAggregateInput = {
    id?: SortOrder
    auteurMatricule?: SortOrder
    type?: SortOrder
    etapeActuelle?: SortOrder
    numero?: SortOrder
    objet?: SortOrder
    description?: SortOrder
    motif?: SortOrder
    quantite?: SortOrder
    fournisseurID?: SortOrder
    pu?: SortOrder
    montant?: SortOrder
    devis?: SortOrder
    pieceJointe?: SortOrder
    justificationChoix?: SortOrder
    imputationComptable?: SortOrder
    activite?: SortOrder
    codeTIGER?: SortOrder
    modePaiement?: SortOrder
    paiementDetail?: SortOrder
    numeroBonCommande?: SortOrder
    dateLivraison?: SortOrder
    versQui?: SortOrder
    statut?: SortOrder
    budgetID?: SortOrder
    dateDepot?: SortOrder
    dateFinalisation?: SortOrder
    isAPGenere?: SortOrder
    isBCGenere?: SortOrder
    isAPExporte?: SortOrder
    reference?: SortOrder
  }

  export type DemandeurSumOrderByAggregateInput = {
    id?: SortOrder
    etapeActuelle?: SortOrder
    numero?: SortOrder
    quantite?: SortOrder
    fournisseurID?: SortOrder
    pu?: SortOrder
    montant?: SortOrder
    budgetID?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumStatutDemandeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutDemande | EnumStatutDemandeFieldRefInput<$PrismaModel>
    in?: $Enums.StatutDemande[]
    notIn?: $Enums.StatutDemande[]
    not?: NestedEnumStatutDemandeWithAggregatesFilter<$PrismaModel> | $Enums.StatutDemande
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutDemandeFilter<$PrismaModel>
    _max?: NestedEnumStatutDemandeFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumStatutValidationFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutValidation | EnumStatutValidationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutValidation[]
    notIn?: $Enums.StatutValidation[]
    not?: NestedEnumStatutValidationFilter<$PrismaModel> | $Enums.StatutValidation
  }

  export type DemandeurScalarRelationFilter = {
    is?: DemandeurWhereInput
    isNot?: DemandeurWhereInput
  }

  export type HistoriqueValidationOrderByRelevanceInput = {
    fields: HistoriqueValidationOrderByRelevanceFieldEnum | HistoriqueValidationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type HistoriqueValidationCountOrderByAggregateInput = {
    id?: SortOrder
    demandeurID?: SortOrder
    etape?: SortOrder
    valideurMatricule?: SortOrder
    statut?: SortOrder
    motifRefus?: SortOrder
    dateValidation?: SortOrder
    id_navette?: SortOrder
    reference_navette?: SortOrder
  }

  export type HistoriqueValidationAvgOrderByAggregateInput = {
    id?: SortOrder
    demandeurID?: SortOrder
    etape?: SortOrder
    id_navette?: SortOrder
  }

  export type HistoriqueValidationMaxOrderByAggregateInput = {
    id?: SortOrder
    demandeurID?: SortOrder
    etape?: SortOrder
    valideurMatricule?: SortOrder
    statut?: SortOrder
    motifRefus?: SortOrder
    dateValidation?: SortOrder
    id_navette?: SortOrder
    reference_navette?: SortOrder
  }

  export type HistoriqueValidationMinOrderByAggregateInput = {
    id?: SortOrder
    demandeurID?: SortOrder
    etape?: SortOrder
    valideurMatricule?: SortOrder
    statut?: SortOrder
    motifRefus?: SortOrder
    dateValidation?: SortOrder
    id_navette?: SortOrder
    reference_navette?: SortOrder
  }

  export type HistoriqueValidationSumOrderByAggregateInput = {
    id?: SortOrder
    demandeurID?: SortOrder
    etape?: SortOrder
    id_navette?: SortOrder
  }

  export type EnumStatutValidationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutValidation | EnumStatutValidationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutValidation[]
    notIn?: $Enums.StatutValidation[]
    not?: NestedEnumStatutValidationWithAggregatesFilter<$PrismaModel> | $Enums.StatutValidation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutValidationFilter<$PrismaModel>
    _max?: NestedEnumStatutValidationFilter<$PrismaModel>
  }

  export type BudgetCreateNestedManyWithoutServiceInput = {
    create?: XOR<BudgetCreateWithoutServiceInput, BudgetUncheckedCreateWithoutServiceInput> | BudgetCreateWithoutServiceInput[] | BudgetUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutServiceInput | BudgetCreateOrConnectWithoutServiceInput[]
    createMany?: BudgetCreateManyServiceInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type CollaborateurCreateNestedManyWithoutServiceInput = {
    create?: XOR<CollaborateurCreateWithoutServiceInput, CollaborateurUncheckedCreateWithoutServiceInput> | CollaborateurCreateWithoutServiceInput[] | CollaborateurUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: CollaborateurCreateOrConnectWithoutServiceInput | CollaborateurCreateOrConnectWithoutServiceInput[]
    createMany?: CollaborateurCreateManyServiceInputEnvelope
    connect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
  }

  export type FonctionCreateNestedManyWithoutServiceInput = {
    create?: XOR<FonctionCreateWithoutServiceInput, FonctionUncheckedCreateWithoutServiceInput> | FonctionCreateWithoutServiceInput[] | FonctionUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: FonctionCreateOrConnectWithoutServiceInput | FonctionCreateOrConnectWithoutServiceInput[]
    createMany?: FonctionCreateManyServiceInputEnvelope
    connect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
  }

  export type CollaborateurCreateNestedOneWithoutServicesChefInput = {
    create?: XOR<CollaborateurCreateWithoutServicesChefInput, CollaborateurUncheckedCreateWithoutServicesChefInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutServicesChefInput
    connect?: CollaborateurWhereUniqueInput
  }

  export type BudgetUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<BudgetCreateWithoutServiceInput, BudgetUncheckedCreateWithoutServiceInput> | BudgetCreateWithoutServiceInput[] | BudgetUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutServiceInput | BudgetCreateOrConnectWithoutServiceInput[]
    createMany?: BudgetCreateManyServiceInputEnvelope
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
  }

  export type CollaborateurUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<CollaborateurCreateWithoutServiceInput, CollaborateurUncheckedCreateWithoutServiceInput> | CollaborateurCreateWithoutServiceInput[] | CollaborateurUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: CollaborateurCreateOrConnectWithoutServiceInput | CollaborateurCreateOrConnectWithoutServiceInput[]
    createMany?: CollaborateurCreateManyServiceInputEnvelope
    connect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
  }

  export type FonctionUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<FonctionCreateWithoutServiceInput, FonctionUncheckedCreateWithoutServiceInput> | FonctionCreateWithoutServiceInput[] | FonctionUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: FonctionCreateOrConnectWithoutServiceInput | FonctionCreateOrConnectWithoutServiceInput[]
    createMany?: FonctionCreateManyServiceInputEnvelope
    connect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BudgetUpdateManyWithoutServiceNestedInput = {
    create?: XOR<BudgetCreateWithoutServiceInput, BudgetUncheckedCreateWithoutServiceInput> | BudgetCreateWithoutServiceInput[] | BudgetUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutServiceInput | BudgetCreateOrConnectWithoutServiceInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutServiceInput | BudgetUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: BudgetCreateManyServiceInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutServiceInput | BudgetUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutServiceInput | BudgetUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type CollaborateurUpdateManyWithoutServiceNestedInput = {
    create?: XOR<CollaborateurCreateWithoutServiceInput, CollaborateurUncheckedCreateWithoutServiceInput> | CollaborateurCreateWithoutServiceInput[] | CollaborateurUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: CollaborateurCreateOrConnectWithoutServiceInput | CollaborateurCreateOrConnectWithoutServiceInput[]
    upsert?: CollaborateurUpsertWithWhereUniqueWithoutServiceInput | CollaborateurUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: CollaborateurCreateManyServiceInputEnvelope
    set?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    disconnect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    delete?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    connect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    update?: CollaborateurUpdateWithWhereUniqueWithoutServiceInput | CollaborateurUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: CollaborateurUpdateManyWithWhereWithoutServiceInput | CollaborateurUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: CollaborateurScalarWhereInput | CollaborateurScalarWhereInput[]
  }

  export type FonctionUpdateManyWithoutServiceNestedInput = {
    create?: XOR<FonctionCreateWithoutServiceInput, FonctionUncheckedCreateWithoutServiceInput> | FonctionCreateWithoutServiceInput[] | FonctionUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: FonctionCreateOrConnectWithoutServiceInput | FonctionCreateOrConnectWithoutServiceInput[]
    upsert?: FonctionUpsertWithWhereUniqueWithoutServiceInput | FonctionUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: FonctionCreateManyServiceInputEnvelope
    set?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    disconnect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    delete?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    connect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    update?: FonctionUpdateWithWhereUniqueWithoutServiceInput | FonctionUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: FonctionUpdateManyWithWhereWithoutServiceInput | FonctionUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: FonctionScalarWhereInput | FonctionScalarWhereInput[]
  }

  export type CollaborateurUpdateOneWithoutServicesChefNestedInput = {
    create?: XOR<CollaborateurCreateWithoutServicesChefInput, CollaborateurUncheckedCreateWithoutServicesChefInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutServicesChefInput
    upsert?: CollaborateurUpsertWithoutServicesChefInput
    disconnect?: CollaborateurWhereInput | boolean
    delete?: CollaborateurWhereInput | boolean
    connect?: CollaborateurWhereUniqueInput
    update?: XOR<XOR<CollaborateurUpdateToOneWithWhereWithoutServicesChefInput, CollaborateurUpdateWithoutServicesChefInput>, CollaborateurUncheckedUpdateWithoutServicesChefInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BudgetUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<BudgetCreateWithoutServiceInput, BudgetUncheckedCreateWithoutServiceInput> | BudgetCreateWithoutServiceInput[] | BudgetUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BudgetCreateOrConnectWithoutServiceInput | BudgetCreateOrConnectWithoutServiceInput[]
    upsert?: BudgetUpsertWithWhereUniqueWithoutServiceInput | BudgetUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: BudgetCreateManyServiceInputEnvelope
    set?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    disconnect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    delete?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    connect?: BudgetWhereUniqueInput | BudgetWhereUniqueInput[]
    update?: BudgetUpdateWithWhereUniqueWithoutServiceInput | BudgetUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: BudgetUpdateManyWithWhereWithoutServiceInput | BudgetUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
  }

  export type CollaborateurUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<CollaborateurCreateWithoutServiceInput, CollaborateurUncheckedCreateWithoutServiceInput> | CollaborateurCreateWithoutServiceInput[] | CollaborateurUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: CollaborateurCreateOrConnectWithoutServiceInput | CollaborateurCreateOrConnectWithoutServiceInput[]
    upsert?: CollaborateurUpsertWithWhereUniqueWithoutServiceInput | CollaborateurUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: CollaborateurCreateManyServiceInputEnvelope
    set?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    disconnect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    delete?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    connect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    update?: CollaborateurUpdateWithWhereUniqueWithoutServiceInput | CollaborateurUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: CollaborateurUpdateManyWithWhereWithoutServiceInput | CollaborateurUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: CollaborateurScalarWhereInput | CollaborateurScalarWhereInput[]
  }

  export type FonctionUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<FonctionCreateWithoutServiceInput, FonctionUncheckedCreateWithoutServiceInput> | FonctionCreateWithoutServiceInput[] | FonctionUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: FonctionCreateOrConnectWithoutServiceInput | FonctionCreateOrConnectWithoutServiceInput[]
    upsert?: FonctionUpsertWithWhereUniqueWithoutServiceInput | FonctionUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: FonctionCreateManyServiceInputEnvelope
    set?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    disconnect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    delete?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    connect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    update?: FonctionUpdateWithWhereUniqueWithoutServiceInput | FonctionUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: FonctionUpdateManyWithWhereWithoutServiceInput | FonctionUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: FonctionScalarWhereInput | FonctionScalarWhereInput[]
  }

  export type DemandeurCreateNestedManyWithoutFournisseurInput = {
    create?: XOR<DemandeurCreateWithoutFournisseurInput, DemandeurUncheckedCreateWithoutFournisseurInput> | DemandeurCreateWithoutFournisseurInput[] | DemandeurUncheckedCreateWithoutFournisseurInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutFournisseurInput | DemandeurCreateOrConnectWithoutFournisseurInput[]
    createMany?: DemandeurCreateManyFournisseurInputEnvelope
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
  }

  export type DemandeurUncheckedCreateNestedManyWithoutFournisseurInput = {
    create?: XOR<DemandeurCreateWithoutFournisseurInput, DemandeurUncheckedCreateWithoutFournisseurInput> | DemandeurCreateWithoutFournisseurInput[] | DemandeurUncheckedCreateWithoutFournisseurInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutFournisseurInput | DemandeurCreateOrConnectWithoutFournisseurInput[]
    createMany?: DemandeurCreateManyFournisseurInputEnvelope
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
  }

  export type DemandeurUpdateManyWithoutFournisseurNestedInput = {
    create?: XOR<DemandeurCreateWithoutFournisseurInput, DemandeurUncheckedCreateWithoutFournisseurInput> | DemandeurCreateWithoutFournisseurInput[] | DemandeurUncheckedCreateWithoutFournisseurInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutFournisseurInput | DemandeurCreateOrConnectWithoutFournisseurInput[]
    upsert?: DemandeurUpsertWithWhereUniqueWithoutFournisseurInput | DemandeurUpsertWithWhereUniqueWithoutFournisseurInput[]
    createMany?: DemandeurCreateManyFournisseurInputEnvelope
    set?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    disconnect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    delete?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    update?: DemandeurUpdateWithWhereUniqueWithoutFournisseurInput | DemandeurUpdateWithWhereUniqueWithoutFournisseurInput[]
    updateMany?: DemandeurUpdateManyWithWhereWithoutFournisseurInput | DemandeurUpdateManyWithWhereWithoutFournisseurInput[]
    deleteMany?: DemandeurScalarWhereInput | DemandeurScalarWhereInput[]
  }

  export type DemandeurUncheckedUpdateManyWithoutFournisseurNestedInput = {
    create?: XOR<DemandeurCreateWithoutFournisseurInput, DemandeurUncheckedCreateWithoutFournisseurInput> | DemandeurCreateWithoutFournisseurInput[] | DemandeurUncheckedCreateWithoutFournisseurInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutFournisseurInput | DemandeurCreateOrConnectWithoutFournisseurInput[]
    upsert?: DemandeurUpsertWithWhereUniqueWithoutFournisseurInput | DemandeurUpsertWithWhereUniqueWithoutFournisseurInput[]
    createMany?: DemandeurCreateManyFournisseurInputEnvelope
    set?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    disconnect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    delete?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    update?: DemandeurUpdateWithWhereUniqueWithoutFournisseurInput | DemandeurUpdateWithWhereUniqueWithoutFournisseurInput[]
    updateMany?: DemandeurUpdateManyWithWhereWithoutFournisseurInput | DemandeurUpdateManyWithWhereWithoutFournisseurInput[]
    deleteMany?: DemandeurScalarWhereInput | DemandeurScalarWhereInput[]
  }

  export type CollaborateurCreateNestedManyWithoutFonctionInput = {
    create?: XOR<CollaborateurCreateWithoutFonctionInput, CollaborateurUncheckedCreateWithoutFonctionInput> | CollaborateurCreateWithoutFonctionInput[] | CollaborateurUncheckedCreateWithoutFonctionInput[]
    connectOrCreate?: CollaborateurCreateOrConnectWithoutFonctionInput | CollaborateurCreateOrConnectWithoutFonctionInput[]
    createMany?: CollaborateurCreateManyFonctionInputEnvelope
    connect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
  }

  export type CollaborateurCreateNestedOneWithoutFonctionsChefInput = {
    create?: XOR<CollaborateurCreateWithoutFonctionsChefInput, CollaborateurUncheckedCreateWithoutFonctionsChefInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutFonctionsChefInput
    connect?: CollaborateurWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutFonctionsInput = {
    create?: XOR<ServiceCreateWithoutFonctionsInput, ServiceUncheckedCreateWithoutFonctionsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutFonctionsInput
    connect?: ServiceWhereUniqueInput
  }

  export type CollaborateurUncheckedCreateNestedManyWithoutFonctionInput = {
    create?: XOR<CollaborateurCreateWithoutFonctionInput, CollaborateurUncheckedCreateWithoutFonctionInput> | CollaborateurCreateWithoutFonctionInput[] | CollaborateurUncheckedCreateWithoutFonctionInput[]
    connectOrCreate?: CollaborateurCreateOrConnectWithoutFonctionInput | CollaborateurCreateOrConnectWithoutFonctionInput[]
    createMany?: CollaborateurCreateManyFonctionInputEnvelope
    connect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
  }

  export type CollaborateurUpdateManyWithoutFonctionNestedInput = {
    create?: XOR<CollaborateurCreateWithoutFonctionInput, CollaborateurUncheckedCreateWithoutFonctionInput> | CollaborateurCreateWithoutFonctionInput[] | CollaborateurUncheckedCreateWithoutFonctionInput[]
    connectOrCreate?: CollaborateurCreateOrConnectWithoutFonctionInput | CollaborateurCreateOrConnectWithoutFonctionInput[]
    upsert?: CollaborateurUpsertWithWhereUniqueWithoutFonctionInput | CollaborateurUpsertWithWhereUniqueWithoutFonctionInput[]
    createMany?: CollaborateurCreateManyFonctionInputEnvelope
    set?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    disconnect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    delete?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    connect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    update?: CollaborateurUpdateWithWhereUniqueWithoutFonctionInput | CollaborateurUpdateWithWhereUniqueWithoutFonctionInput[]
    updateMany?: CollaborateurUpdateManyWithWhereWithoutFonctionInput | CollaborateurUpdateManyWithWhereWithoutFonctionInput[]
    deleteMany?: CollaborateurScalarWhereInput | CollaborateurScalarWhereInput[]
  }

  export type CollaborateurUpdateOneWithoutFonctionsChefNestedInput = {
    create?: XOR<CollaborateurCreateWithoutFonctionsChefInput, CollaborateurUncheckedCreateWithoutFonctionsChefInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutFonctionsChefInput
    upsert?: CollaborateurUpsertWithoutFonctionsChefInput
    disconnect?: CollaborateurWhereInput | boolean
    delete?: CollaborateurWhereInput | boolean
    connect?: CollaborateurWhereUniqueInput
    update?: XOR<XOR<CollaborateurUpdateToOneWithWhereWithoutFonctionsChefInput, CollaborateurUpdateWithoutFonctionsChefInput>, CollaborateurUncheckedUpdateWithoutFonctionsChefInput>
  }

  export type ServiceUpdateOneWithoutFonctionsNestedInput = {
    create?: XOR<ServiceCreateWithoutFonctionsInput, ServiceUncheckedCreateWithoutFonctionsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutFonctionsInput
    upsert?: ServiceUpsertWithoutFonctionsInput
    disconnect?: ServiceWhereInput | boolean
    delete?: ServiceWhereInput | boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutFonctionsInput, ServiceUpdateWithoutFonctionsInput>, ServiceUncheckedUpdateWithoutFonctionsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CollaborateurUncheckedUpdateManyWithoutFonctionNestedInput = {
    create?: XOR<CollaborateurCreateWithoutFonctionInput, CollaborateurUncheckedCreateWithoutFonctionInput> | CollaborateurCreateWithoutFonctionInput[] | CollaborateurUncheckedCreateWithoutFonctionInput[]
    connectOrCreate?: CollaborateurCreateOrConnectWithoutFonctionInput | CollaborateurCreateOrConnectWithoutFonctionInput[]
    upsert?: CollaborateurUpsertWithWhereUniqueWithoutFonctionInput | CollaborateurUpsertWithWhereUniqueWithoutFonctionInput[]
    createMany?: CollaborateurCreateManyFonctionInputEnvelope
    set?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    disconnect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    delete?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    connect?: CollaborateurWhereUniqueInput | CollaborateurWhereUniqueInput[]
    update?: CollaborateurUpdateWithWhereUniqueWithoutFonctionInput | CollaborateurUpdateWithWhereUniqueWithoutFonctionInput[]
    updateMany?: CollaborateurUpdateManyWithWhereWithoutFonctionInput | CollaborateurUpdateManyWithWhereWithoutFonctionInput[]
    deleteMany?: CollaborateurScalarWhereInput | CollaborateurScalarWhereInput[]
  }

  export type CollaborateurRolesCreateNestedManyWithoutCollaborateurInput = {
    create?: XOR<CollaborateurRolesCreateWithoutCollaborateurInput, CollaborateurRolesUncheckedCreateWithoutCollaborateurInput> | CollaborateurRolesCreateWithoutCollaborateurInput[] | CollaborateurRolesUncheckedCreateWithoutCollaborateurInput[]
    connectOrCreate?: CollaborateurRolesCreateOrConnectWithoutCollaborateurInput | CollaborateurRolesCreateOrConnectWithoutCollaborateurInput[]
    createMany?: CollaborateurRolesCreateManyCollaborateurInputEnvelope
    connect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
  }

  export type FonctionCreateNestedOneWithoutCollaborateursInput = {
    create?: XOR<FonctionCreateWithoutCollaborateursInput, FonctionUncheckedCreateWithoutCollaborateursInput>
    connectOrCreate?: FonctionCreateOrConnectWithoutCollaborateursInput
    connect?: FonctionWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutCollaborateursInput = {
    create?: XOR<ServiceCreateWithoutCollaborateursInput, ServiceUncheckedCreateWithoutCollaborateursInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutCollaborateursInput
    connect?: ServiceWhereUniqueInput
  }

  export type ComptesUtilisateursCreateNestedOneWithoutCollaborateurInput = {
    create?: XOR<ComptesUtilisateursCreateWithoutCollaborateurInput, ComptesUtilisateursUncheckedCreateWithoutCollaborateurInput>
    connectOrCreate?: ComptesUtilisateursCreateOrConnectWithoutCollaborateurInput
    connect?: ComptesUtilisateursWhereUniqueInput
  }

  export type DemandeurCreateNestedManyWithoutAuteurInput = {
    create?: XOR<DemandeurCreateWithoutAuteurInput, DemandeurUncheckedCreateWithoutAuteurInput> | DemandeurCreateWithoutAuteurInput[] | DemandeurUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutAuteurInput | DemandeurCreateOrConnectWithoutAuteurInput[]
    createMany?: DemandeurCreateManyAuteurInputEnvelope
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
  }

  export type FonctionCreateNestedManyWithoutChefInput = {
    create?: XOR<FonctionCreateWithoutChefInput, FonctionUncheckedCreateWithoutChefInput> | FonctionCreateWithoutChefInput[] | FonctionUncheckedCreateWithoutChefInput[]
    connectOrCreate?: FonctionCreateOrConnectWithoutChefInput | FonctionCreateOrConnectWithoutChefInput[]
    createMany?: FonctionCreateManyChefInputEnvelope
    connect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
  }

  export type HistoriqueValidationCreateNestedManyWithoutValideurInput = {
    create?: XOR<HistoriqueValidationCreateWithoutValideurInput, HistoriqueValidationUncheckedCreateWithoutValideurInput> | HistoriqueValidationCreateWithoutValideurInput[] | HistoriqueValidationUncheckedCreateWithoutValideurInput[]
    connectOrCreate?: HistoriqueValidationCreateOrConnectWithoutValideurInput | HistoriqueValidationCreateOrConnectWithoutValideurInput[]
    createMany?: HistoriqueValidationCreateManyValideurInputEnvelope
    connect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutChefInput = {
    create?: XOR<ServiceCreateWithoutChefInput, ServiceUncheckedCreateWithoutChefInput> | ServiceCreateWithoutChefInput[] | ServiceUncheckedCreateWithoutChefInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutChefInput | ServiceCreateOrConnectWithoutChefInput[]
    createMany?: ServiceCreateManyChefInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type CollaborateurRolesUncheckedCreateNestedManyWithoutCollaborateurInput = {
    create?: XOR<CollaborateurRolesCreateWithoutCollaborateurInput, CollaborateurRolesUncheckedCreateWithoutCollaborateurInput> | CollaborateurRolesCreateWithoutCollaborateurInput[] | CollaborateurRolesUncheckedCreateWithoutCollaborateurInput[]
    connectOrCreate?: CollaborateurRolesCreateOrConnectWithoutCollaborateurInput | CollaborateurRolesCreateOrConnectWithoutCollaborateurInput[]
    createMany?: CollaborateurRolesCreateManyCollaborateurInputEnvelope
    connect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
  }

  export type ComptesUtilisateursUncheckedCreateNestedOneWithoutCollaborateurInput = {
    create?: XOR<ComptesUtilisateursCreateWithoutCollaborateurInput, ComptesUtilisateursUncheckedCreateWithoutCollaborateurInput>
    connectOrCreate?: ComptesUtilisateursCreateOrConnectWithoutCollaborateurInput
    connect?: ComptesUtilisateursWhereUniqueInput
  }

  export type DemandeurUncheckedCreateNestedManyWithoutAuteurInput = {
    create?: XOR<DemandeurCreateWithoutAuteurInput, DemandeurUncheckedCreateWithoutAuteurInput> | DemandeurCreateWithoutAuteurInput[] | DemandeurUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutAuteurInput | DemandeurCreateOrConnectWithoutAuteurInput[]
    createMany?: DemandeurCreateManyAuteurInputEnvelope
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
  }

  export type FonctionUncheckedCreateNestedManyWithoutChefInput = {
    create?: XOR<FonctionCreateWithoutChefInput, FonctionUncheckedCreateWithoutChefInput> | FonctionCreateWithoutChefInput[] | FonctionUncheckedCreateWithoutChefInput[]
    connectOrCreate?: FonctionCreateOrConnectWithoutChefInput | FonctionCreateOrConnectWithoutChefInput[]
    createMany?: FonctionCreateManyChefInputEnvelope
    connect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
  }

  export type HistoriqueValidationUncheckedCreateNestedManyWithoutValideurInput = {
    create?: XOR<HistoriqueValidationCreateWithoutValideurInput, HistoriqueValidationUncheckedCreateWithoutValideurInput> | HistoriqueValidationCreateWithoutValideurInput[] | HistoriqueValidationUncheckedCreateWithoutValideurInput[]
    connectOrCreate?: HistoriqueValidationCreateOrConnectWithoutValideurInput | HistoriqueValidationCreateOrConnectWithoutValideurInput[]
    createMany?: HistoriqueValidationCreateManyValideurInputEnvelope
    connect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutChefInput = {
    create?: XOR<ServiceCreateWithoutChefInput, ServiceUncheckedCreateWithoutChefInput> | ServiceCreateWithoutChefInput[] | ServiceUncheckedCreateWithoutChefInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutChefInput | ServiceCreateOrConnectWithoutChefInput[]
    createMany?: ServiceCreateManyChefInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type NullableEnumCiviliteFieldUpdateOperationsInput = {
    set?: $Enums.Civilite | null
  }

  export type CollaborateurRolesUpdateManyWithoutCollaborateurNestedInput = {
    create?: XOR<CollaborateurRolesCreateWithoutCollaborateurInput, CollaborateurRolesUncheckedCreateWithoutCollaborateurInput> | CollaborateurRolesCreateWithoutCollaborateurInput[] | CollaborateurRolesUncheckedCreateWithoutCollaborateurInput[]
    connectOrCreate?: CollaborateurRolesCreateOrConnectWithoutCollaborateurInput | CollaborateurRolesCreateOrConnectWithoutCollaborateurInput[]
    upsert?: CollaborateurRolesUpsertWithWhereUniqueWithoutCollaborateurInput | CollaborateurRolesUpsertWithWhereUniqueWithoutCollaborateurInput[]
    createMany?: CollaborateurRolesCreateManyCollaborateurInputEnvelope
    set?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    disconnect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    delete?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    connect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    update?: CollaborateurRolesUpdateWithWhereUniqueWithoutCollaborateurInput | CollaborateurRolesUpdateWithWhereUniqueWithoutCollaborateurInput[]
    updateMany?: CollaborateurRolesUpdateManyWithWhereWithoutCollaborateurInput | CollaborateurRolesUpdateManyWithWhereWithoutCollaborateurInput[]
    deleteMany?: CollaborateurRolesScalarWhereInput | CollaborateurRolesScalarWhereInput[]
  }

  export type FonctionUpdateOneWithoutCollaborateursNestedInput = {
    create?: XOR<FonctionCreateWithoutCollaborateursInput, FonctionUncheckedCreateWithoutCollaborateursInput>
    connectOrCreate?: FonctionCreateOrConnectWithoutCollaborateursInput
    upsert?: FonctionUpsertWithoutCollaborateursInput
    disconnect?: FonctionWhereInput | boolean
    delete?: FonctionWhereInput | boolean
    connect?: FonctionWhereUniqueInput
    update?: XOR<XOR<FonctionUpdateToOneWithWhereWithoutCollaborateursInput, FonctionUpdateWithoutCollaborateursInput>, FonctionUncheckedUpdateWithoutCollaborateursInput>
  }

  export type ServiceUpdateOneWithoutCollaborateursNestedInput = {
    create?: XOR<ServiceCreateWithoutCollaborateursInput, ServiceUncheckedCreateWithoutCollaborateursInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutCollaborateursInput
    upsert?: ServiceUpsertWithoutCollaborateursInput
    disconnect?: ServiceWhereInput | boolean
    delete?: ServiceWhereInput | boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutCollaborateursInput, ServiceUpdateWithoutCollaborateursInput>, ServiceUncheckedUpdateWithoutCollaborateursInput>
  }

  export type ComptesUtilisateursUpdateOneWithoutCollaborateurNestedInput = {
    create?: XOR<ComptesUtilisateursCreateWithoutCollaborateurInput, ComptesUtilisateursUncheckedCreateWithoutCollaborateurInput>
    connectOrCreate?: ComptesUtilisateursCreateOrConnectWithoutCollaborateurInput
    upsert?: ComptesUtilisateursUpsertWithoutCollaborateurInput
    disconnect?: ComptesUtilisateursWhereInput | boolean
    delete?: ComptesUtilisateursWhereInput | boolean
    connect?: ComptesUtilisateursWhereUniqueInput
    update?: XOR<XOR<ComptesUtilisateursUpdateToOneWithWhereWithoutCollaborateurInput, ComptesUtilisateursUpdateWithoutCollaborateurInput>, ComptesUtilisateursUncheckedUpdateWithoutCollaborateurInput>
  }

  export type DemandeurUpdateManyWithoutAuteurNestedInput = {
    create?: XOR<DemandeurCreateWithoutAuteurInput, DemandeurUncheckedCreateWithoutAuteurInput> | DemandeurCreateWithoutAuteurInput[] | DemandeurUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutAuteurInput | DemandeurCreateOrConnectWithoutAuteurInput[]
    upsert?: DemandeurUpsertWithWhereUniqueWithoutAuteurInput | DemandeurUpsertWithWhereUniqueWithoutAuteurInput[]
    createMany?: DemandeurCreateManyAuteurInputEnvelope
    set?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    disconnect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    delete?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    update?: DemandeurUpdateWithWhereUniqueWithoutAuteurInput | DemandeurUpdateWithWhereUniqueWithoutAuteurInput[]
    updateMany?: DemandeurUpdateManyWithWhereWithoutAuteurInput | DemandeurUpdateManyWithWhereWithoutAuteurInput[]
    deleteMany?: DemandeurScalarWhereInput | DemandeurScalarWhereInput[]
  }

  export type FonctionUpdateManyWithoutChefNestedInput = {
    create?: XOR<FonctionCreateWithoutChefInput, FonctionUncheckedCreateWithoutChefInput> | FonctionCreateWithoutChefInput[] | FonctionUncheckedCreateWithoutChefInput[]
    connectOrCreate?: FonctionCreateOrConnectWithoutChefInput | FonctionCreateOrConnectWithoutChefInput[]
    upsert?: FonctionUpsertWithWhereUniqueWithoutChefInput | FonctionUpsertWithWhereUniqueWithoutChefInput[]
    createMany?: FonctionCreateManyChefInputEnvelope
    set?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    disconnect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    delete?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    connect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    update?: FonctionUpdateWithWhereUniqueWithoutChefInput | FonctionUpdateWithWhereUniqueWithoutChefInput[]
    updateMany?: FonctionUpdateManyWithWhereWithoutChefInput | FonctionUpdateManyWithWhereWithoutChefInput[]
    deleteMany?: FonctionScalarWhereInput | FonctionScalarWhereInput[]
  }

  export type HistoriqueValidationUpdateManyWithoutValideurNestedInput = {
    create?: XOR<HistoriqueValidationCreateWithoutValideurInput, HistoriqueValidationUncheckedCreateWithoutValideurInput> | HistoriqueValidationCreateWithoutValideurInput[] | HistoriqueValidationUncheckedCreateWithoutValideurInput[]
    connectOrCreate?: HistoriqueValidationCreateOrConnectWithoutValideurInput | HistoriqueValidationCreateOrConnectWithoutValideurInput[]
    upsert?: HistoriqueValidationUpsertWithWhereUniqueWithoutValideurInput | HistoriqueValidationUpsertWithWhereUniqueWithoutValideurInput[]
    createMany?: HistoriqueValidationCreateManyValideurInputEnvelope
    set?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    disconnect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    delete?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    connect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    update?: HistoriqueValidationUpdateWithWhereUniqueWithoutValideurInput | HistoriqueValidationUpdateWithWhereUniqueWithoutValideurInput[]
    updateMany?: HistoriqueValidationUpdateManyWithWhereWithoutValideurInput | HistoriqueValidationUpdateManyWithWhereWithoutValideurInput[]
    deleteMany?: HistoriqueValidationScalarWhereInput | HistoriqueValidationScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutChefNestedInput = {
    create?: XOR<ServiceCreateWithoutChefInput, ServiceUncheckedCreateWithoutChefInput> | ServiceCreateWithoutChefInput[] | ServiceUncheckedCreateWithoutChefInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutChefInput | ServiceCreateOrConnectWithoutChefInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutChefInput | ServiceUpsertWithWhereUniqueWithoutChefInput[]
    createMany?: ServiceCreateManyChefInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutChefInput | ServiceUpdateWithWhereUniqueWithoutChefInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutChefInput | ServiceUpdateManyWithWhereWithoutChefInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurNestedInput = {
    create?: XOR<CollaborateurRolesCreateWithoutCollaborateurInput, CollaborateurRolesUncheckedCreateWithoutCollaborateurInput> | CollaborateurRolesCreateWithoutCollaborateurInput[] | CollaborateurRolesUncheckedCreateWithoutCollaborateurInput[]
    connectOrCreate?: CollaborateurRolesCreateOrConnectWithoutCollaborateurInput | CollaborateurRolesCreateOrConnectWithoutCollaborateurInput[]
    upsert?: CollaborateurRolesUpsertWithWhereUniqueWithoutCollaborateurInput | CollaborateurRolesUpsertWithWhereUniqueWithoutCollaborateurInput[]
    createMany?: CollaborateurRolesCreateManyCollaborateurInputEnvelope
    set?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    disconnect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    delete?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    connect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    update?: CollaborateurRolesUpdateWithWhereUniqueWithoutCollaborateurInput | CollaborateurRolesUpdateWithWhereUniqueWithoutCollaborateurInput[]
    updateMany?: CollaborateurRolesUpdateManyWithWhereWithoutCollaborateurInput | CollaborateurRolesUpdateManyWithWhereWithoutCollaborateurInput[]
    deleteMany?: CollaborateurRolesScalarWhereInput | CollaborateurRolesScalarWhereInput[]
  }

  export type ComptesUtilisateursUncheckedUpdateOneWithoutCollaborateurNestedInput = {
    create?: XOR<ComptesUtilisateursCreateWithoutCollaborateurInput, ComptesUtilisateursUncheckedCreateWithoutCollaborateurInput>
    connectOrCreate?: ComptesUtilisateursCreateOrConnectWithoutCollaborateurInput
    upsert?: ComptesUtilisateursUpsertWithoutCollaborateurInput
    disconnect?: ComptesUtilisateursWhereInput | boolean
    delete?: ComptesUtilisateursWhereInput | boolean
    connect?: ComptesUtilisateursWhereUniqueInput
    update?: XOR<XOR<ComptesUtilisateursUpdateToOneWithWhereWithoutCollaborateurInput, ComptesUtilisateursUpdateWithoutCollaborateurInput>, ComptesUtilisateursUncheckedUpdateWithoutCollaborateurInput>
  }

  export type DemandeurUncheckedUpdateManyWithoutAuteurNestedInput = {
    create?: XOR<DemandeurCreateWithoutAuteurInput, DemandeurUncheckedCreateWithoutAuteurInput> | DemandeurCreateWithoutAuteurInput[] | DemandeurUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutAuteurInput | DemandeurCreateOrConnectWithoutAuteurInput[]
    upsert?: DemandeurUpsertWithWhereUniqueWithoutAuteurInput | DemandeurUpsertWithWhereUniqueWithoutAuteurInput[]
    createMany?: DemandeurCreateManyAuteurInputEnvelope
    set?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    disconnect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    delete?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    update?: DemandeurUpdateWithWhereUniqueWithoutAuteurInput | DemandeurUpdateWithWhereUniqueWithoutAuteurInput[]
    updateMany?: DemandeurUpdateManyWithWhereWithoutAuteurInput | DemandeurUpdateManyWithWhereWithoutAuteurInput[]
    deleteMany?: DemandeurScalarWhereInput | DemandeurScalarWhereInput[]
  }

  export type FonctionUncheckedUpdateManyWithoutChefNestedInput = {
    create?: XOR<FonctionCreateWithoutChefInput, FonctionUncheckedCreateWithoutChefInput> | FonctionCreateWithoutChefInput[] | FonctionUncheckedCreateWithoutChefInput[]
    connectOrCreate?: FonctionCreateOrConnectWithoutChefInput | FonctionCreateOrConnectWithoutChefInput[]
    upsert?: FonctionUpsertWithWhereUniqueWithoutChefInput | FonctionUpsertWithWhereUniqueWithoutChefInput[]
    createMany?: FonctionCreateManyChefInputEnvelope
    set?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    disconnect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    delete?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    connect?: FonctionWhereUniqueInput | FonctionWhereUniqueInput[]
    update?: FonctionUpdateWithWhereUniqueWithoutChefInput | FonctionUpdateWithWhereUniqueWithoutChefInput[]
    updateMany?: FonctionUpdateManyWithWhereWithoutChefInput | FonctionUpdateManyWithWhereWithoutChefInput[]
    deleteMany?: FonctionScalarWhereInput | FonctionScalarWhereInput[]
  }

  export type HistoriqueValidationUncheckedUpdateManyWithoutValideurNestedInput = {
    create?: XOR<HistoriqueValidationCreateWithoutValideurInput, HistoriqueValidationUncheckedCreateWithoutValideurInput> | HistoriqueValidationCreateWithoutValideurInput[] | HistoriqueValidationUncheckedCreateWithoutValideurInput[]
    connectOrCreate?: HistoriqueValidationCreateOrConnectWithoutValideurInput | HistoriqueValidationCreateOrConnectWithoutValideurInput[]
    upsert?: HistoriqueValidationUpsertWithWhereUniqueWithoutValideurInput | HistoriqueValidationUpsertWithWhereUniqueWithoutValideurInput[]
    createMany?: HistoriqueValidationCreateManyValideurInputEnvelope
    set?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    disconnect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    delete?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    connect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    update?: HistoriqueValidationUpdateWithWhereUniqueWithoutValideurInput | HistoriqueValidationUpdateWithWhereUniqueWithoutValideurInput[]
    updateMany?: HistoriqueValidationUpdateManyWithWhereWithoutValideurInput | HistoriqueValidationUpdateManyWithWhereWithoutValideurInput[]
    deleteMany?: HistoriqueValidationScalarWhereInput | HistoriqueValidationScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutChefNestedInput = {
    create?: XOR<ServiceCreateWithoutChefInput, ServiceUncheckedCreateWithoutChefInput> | ServiceCreateWithoutChefInput[] | ServiceUncheckedCreateWithoutChefInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutChefInput | ServiceCreateOrConnectWithoutChefInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutChefInput | ServiceUpsertWithWhereUniqueWithoutChefInput[]
    createMany?: ServiceCreateManyChefInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutChefInput | ServiceUpdateWithWhereUniqueWithoutChefInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutChefInput | ServiceUpdateManyWithWhereWithoutChefInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type CollaborateurCreateNestedOneWithoutComptesInput = {
    create?: XOR<CollaborateurCreateWithoutComptesInput, CollaborateurUncheckedCreateWithoutComptesInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutComptesInput
    connect?: CollaborateurWhereUniqueInput
  }

  export type CollaborateurUpdateOneRequiredWithoutComptesNestedInput = {
    create?: XOR<CollaborateurCreateWithoutComptesInput, CollaborateurUncheckedCreateWithoutComptesInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutComptesInput
    upsert?: CollaborateurUpsertWithoutComptesInput
    connect?: CollaborateurWhereUniqueInput
    update?: XOR<XOR<CollaborateurUpdateToOneWithWhereWithoutComptesInput, CollaborateurUpdateWithoutComptesInput>, CollaborateurUncheckedUpdateWithoutComptesInput>
  }

  export type CollaborateurRolesCreateNestedManyWithoutRoleInput = {
    create?: XOR<CollaborateurRolesCreateWithoutRoleInput, CollaborateurRolesUncheckedCreateWithoutRoleInput> | CollaborateurRolesCreateWithoutRoleInput[] | CollaborateurRolesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: CollaborateurRolesCreateOrConnectWithoutRoleInput | CollaborateurRolesCreateOrConnectWithoutRoleInput[]
    createMany?: CollaborateurRolesCreateManyRoleInputEnvelope
    connect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
  }

  export type CollaborateurRolesUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<CollaborateurRolesCreateWithoutRoleInput, CollaborateurRolesUncheckedCreateWithoutRoleInput> | CollaborateurRolesCreateWithoutRoleInput[] | CollaborateurRolesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: CollaborateurRolesCreateOrConnectWithoutRoleInput | CollaborateurRolesCreateOrConnectWithoutRoleInput[]
    createMany?: CollaborateurRolesCreateManyRoleInputEnvelope
    connect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
  }

  export type CollaborateurRolesUpdateManyWithoutRoleNestedInput = {
    create?: XOR<CollaborateurRolesCreateWithoutRoleInput, CollaborateurRolesUncheckedCreateWithoutRoleInput> | CollaborateurRolesCreateWithoutRoleInput[] | CollaborateurRolesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: CollaborateurRolesCreateOrConnectWithoutRoleInput | CollaborateurRolesCreateOrConnectWithoutRoleInput[]
    upsert?: CollaborateurRolesUpsertWithWhereUniqueWithoutRoleInput | CollaborateurRolesUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: CollaborateurRolesCreateManyRoleInputEnvelope
    set?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    disconnect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    delete?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    connect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    update?: CollaborateurRolesUpdateWithWhereUniqueWithoutRoleInput | CollaborateurRolesUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: CollaborateurRolesUpdateManyWithWhereWithoutRoleInput | CollaborateurRolesUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: CollaborateurRolesScalarWhereInput | CollaborateurRolesScalarWhereInput[]
  }

  export type CollaborateurRolesUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<CollaborateurRolesCreateWithoutRoleInput, CollaborateurRolesUncheckedCreateWithoutRoleInput> | CollaborateurRolesCreateWithoutRoleInput[] | CollaborateurRolesUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: CollaborateurRolesCreateOrConnectWithoutRoleInput | CollaborateurRolesCreateOrConnectWithoutRoleInput[]
    upsert?: CollaborateurRolesUpsertWithWhereUniqueWithoutRoleInput | CollaborateurRolesUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: CollaborateurRolesCreateManyRoleInputEnvelope
    set?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    disconnect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    delete?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    connect?: CollaborateurRolesWhereUniqueInput | CollaborateurRolesWhereUniqueInput[]
    update?: CollaborateurRolesUpdateWithWhereUniqueWithoutRoleInput | CollaborateurRolesUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: CollaborateurRolesUpdateManyWithWhereWithoutRoleInput | CollaborateurRolesUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: CollaborateurRolesScalarWhereInput | CollaborateurRolesScalarWhereInput[]
  }

  export type CollaborateurCreateNestedOneWithoutCollaborateurRolesInput = {
    create?: XOR<CollaborateurCreateWithoutCollaborateurRolesInput, CollaborateurUncheckedCreateWithoutCollaborateurRolesInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutCollaborateurRolesInput
    connect?: CollaborateurWhereUniqueInput
  }

  export type RolesCreateNestedOneWithoutCollaborateurRolesInput = {
    create?: XOR<RolesCreateWithoutCollaborateurRolesInput, RolesUncheckedCreateWithoutCollaborateurRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutCollaborateurRolesInput
    connect?: RolesWhereUniqueInput
  }

  export type CollaborateurUpdateOneRequiredWithoutCollaborateurRolesNestedInput = {
    create?: XOR<CollaborateurCreateWithoutCollaborateurRolesInput, CollaborateurUncheckedCreateWithoutCollaborateurRolesInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutCollaborateurRolesInput
    upsert?: CollaborateurUpsertWithoutCollaborateurRolesInput
    connect?: CollaborateurWhereUniqueInput
    update?: XOR<XOR<CollaborateurUpdateToOneWithWhereWithoutCollaborateurRolesInput, CollaborateurUpdateWithoutCollaborateurRolesInput>, CollaborateurUncheckedUpdateWithoutCollaborateurRolesInput>
  }

  export type RolesUpdateOneRequiredWithoutCollaborateurRolesNestedInput = {
    create?: XOR<RolesCreateWithoutCollaborateurRolesInput, RolesUncheckedCreateWithoutCollaborateurRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutCollaborateurRolesInput
    upsert?: RolesUpsertWithoutCollaborateurRolesInput
    connect?: RolesWhereUniqueInput
    update?: XOR<XOR<RolesUpdateToOneWithWhereWithoutCollaborateurRolesInput, RolesUpdateWithoutCollaborateurRolesInput>, RolesUncheckedUpdateWithoutCollaborateurRolesInput>
  }

  export type ServiceCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<ServiceCreateWithoutBudgetsInput, ServiceUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutBudgetsInput
    connect?: ServiceWhereUniqueInput
  }

  export type DemandeurCreateNestedManyWithoutBudgetInput = {
    create?: XOR<DemandeurCreateWithoutBudgetInput, DemandeurUncheckedCreateWithoutBudgetInput> | DemandeurCreateWithoutBudgetInput[] | DemandeurUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutBudgetInput | DemandeurCreateOrConnectWithoutBudgetInput[]
    createMany?: DemandeurCreateManyBudgetInputEnvelope
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
  }

  export type DemandeurUncheckedCreateNestedManyWithoutBudgetInput = {
    create?: XOR<DemandeurCreateWithoutBudgetInput, DemandeurUncheckedCreateWithoutBudgetInput> | DemandeurCreateWithoutBudgetInput[] | DemandeurUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutBudgetInput | DemandeurCreateOrConnectWithoutBudgetInput[]
    createMany?: DemandeurCreateManyBudgetInputEnvelope
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ServiceUpdateOneWithoutBudgetsNestedInput = {
    create?: XOR<ServiceCreateWithoutBudgetsInput, ServiceUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutBudgetsInput
    upsert?: ServiceUpsertWithoutBudgetsInput
    disconnect?: ServiceWhereInput | boolean
    delete?: ServiceWhereInput | boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutBudgetsInput, ServiceUpdateWithoutBudgetsInput>, ServiceUncheckedUpdateWithoutBudgetsInput>
  }

  export type DemandeurUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<DemandeurCreateWithoutBudgetInput, DemandeurUncheckedCreateWithoutBudgetInput> | DemandeurCreateWithoutBudgetInput[] | DemandeurUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutBudgetInput | DemandeurCreateOrConnectWithoutBudgetInput[]
    upsert?: DemandeurUpsertWithWhereUniqueWithoutBudgetInput | DemandeurUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: DemandeurCreateManyBudgetInputEnvelope
    set?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    disconnect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    delete?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    update?: DemandeurUpdateWithWhereUniqueWithoutBudgetInput | DemandeurUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: DemandeurUpdateManyWithWhereWithoutBudgetInput | DemandeurUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: DemandeurScalarWhereInput | DemandeurScalarWhereInput[]
  }

  export type DemandeurUncheckedUpdateManyWithoutBudgetNestedInput = {
    create?: XOR<DemandeurCreateWithoutBudgetInput, DemandeurUncheckedCreateWithoutBudgetInput> | DemandeurCreateWithoutBudgetInput[] | DemandeurUncheckedCreateWithoutBudgetInput[]
    connectOrCreate?: DemandeurCreateOrConnectWithoutBudgetInput | DemandeurCreateOrConnectWithoutBudgetInput[]
    upsert?: DemandeurUpsertWithWhereUniqueWithoutBudgetInput | DemandeurUpsertWithWhereUniqueWithoutBudgetInput[]
    createMany?: DemandeurCreateManyBudgetInputEnvelope
    set?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    disconnect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    delete?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    connect?: DemandeurWhereUniqueInput | DemandeurWhereUniqueInput[]
    update?: DemandeurUpdateWithWhereUniqueWithoutBudgetInput | DemandeurUpdateWithWhereUniqueWithoutBudgetInput[]
    updateMany?: DemandeurUpdateManyWithWhereWithoutBudgetInput | DemandeurUpdateManyWithWhereWithoutBudgetInput[]
    deleteMany?: DemandeurScalarWhereInput | DemandeurScalarWhereInput[]
  }

  export type EnumTypeNavetteFieldUpdateOperationsInput = {
    set?: $Enums.TypeNavette
  }

  export type CollaborateurCreateNestedOneWithoutDemandesInput = {
    create?: XOR<CollaborateurCreateWithoutDemandesInput, CollaborateurUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutDemandesInput
    connect?: CollaborateurWhereUniqueInput
  }

  export type BudgetCreateNestedOneWithoutDemandesInput = {
    create?: XOR<BudgetCreateWithoutDemandesInput, BudgetUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutDemandesInput
    connect?: BudgetWhereUniqueInput
  }

  export type FournisseurCreateNestedOneWithoutDemandesInput = {
    create?: XOR<FournisseurCreateWithoutDemandesInput, FournisseurUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: FournisseurCreateOrConnectWithoutDemandesInput
    connect?: FournisseurWhereUniqueInput
  }

  export type HistoriqueValidationCreateNestedManyWithoutDemandeurInput = {
    create?: XOR<HistoriqueValidationCreateWithoutDemandeurInput, HistoriqueValidationUncheckedCreateWithoutDemandeurInput> | HistoriqueValidationCreateWithoutDemandeurInput[] | HistoriqueValidationUncheckedCreateWithoutDemandeurInput[]
    connectOrCreate?: HistoriqueValidationCreateOrConnectWithoutDemandeurInput | HistoriqueValidationCreateOrConnectWithoutDemandeurInput[]
    createMany?: HistoriqueValidationCreateManyDemandeurInputEnvelope
    connect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
  }

  export type HistoriqueValidationUncheckedCreateNestedManyWithoutDemandeurInput = {
    create?: XOR<HistoriqueValidationCreateWithoutDemandeurInput, HistoriqueValidationUncheckedCreateWithoutDemandeurInput> | HistoriqueValidationCreateWithoutDemandeurInput[] | HistoriqueValidationUncheckedCreateWithoutDemandeurInput[]
    connectOrCreate?: HistoriqueValidationCreateOrConnectWithoutDemandeurInput | HistoriqueValidationCreateOrConnectWithoutDemandeurInput[]
    createMany?: HistoriqueValidationCreateManyDemandeurInputEnvelope
    connect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumStatutDemandeFieldUpdateOperationsInput = {
    set?: $Enums.StatutDemande
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CollaborateurUpdateOneWithoutDemandesNestedInput = {
    create?: XOR<CollaborateurCreateWithoutDemandesInput, CollaborateurUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutDemandesInput
    upsert?: CollaborateurUpsertWithoutDemandesInput
    disconnect?: CollaborateurWhereInput | boolean
    delete?: CollaborateurWhereInput | boolean
    connect?: CollaborateurWhereUniqueInput
    update?: XOR<XOR<CollaborateurUpdateToOneWithWhereWithoutDemandesInput, CollaborateurUpdateWithoutDemandesInput>, CollaborateurUncheckedUpdateWithoutDemandesInput>
  }

  export type BudgetUpdateOneWithoutDemandesNestedInput = {
    create?: XOR<BudgetCreateWithoutDemandesInput, BudgetUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: BudgetCreateOrConnectWithoutDemandesInput
    upsert?: BudgetUpsertWithoutDemandesInput
    disconnect?: BudgetWhereInput | boolean
    delete?: BudgetWhereInput | boolean
    connect?: BudgetWhereUniqueInput
    update?: XOR<XOR<BudgetUpdateToOneWithWhereWithoutDemandesInput, BudgetUpdateWithoutDemandesInput>, BudgetUncheckedUpdateWithoutDemandesInput>
  }

  export type FournisseurUpdateOneWithoutDemandesNestedInput = {
    create?: XOR<FournisseurCreateWithoutDemandesInput, FournisseurUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: FournisseurCreateOrConnectWithoutDemandesInput
    upsert?: FournisseurUpsertWithoutDemandesInput
    disconnect?: FournisseurWhereInput | boolean
    delete?: FournisseurWhereInput | boolean
    connect?: FournisseurWhereUniqueInput
    update?: XOR<XOR<FournisseurUpdateToOneWithWhereWithoutDemandesInput, FournisseurUpdateWithoutDemandesInput>, FournisseurUncheckedUpdateWithoutDemandesInput>
  }

  export type HistoriqueValidationUpdateManyWithoutDemandeurNestedInput = {
    create?: XOR<HistoriqueValidationCreateWithoutDemandeurInput, HistoriqueValidationUncheckedCreateWithoutDemandeurInput> | HistoriqueValidationCreateWithoutDemandeurInput[] | HistoriqueValidationUncheckedCreateWithoutDemandeurInput[]
    connectOrCreate?: HistoriqueValidationCreateOrConnectWithoutDemandeurInput | HistoriqueValidationCreateOrConnectWithoutDemandeurInput[]
    upsert?: HistoriqueValidationUpsertWithWhereUniqueWithoutDemandeurInput | HistoriqueValidationUpsertWithWhereUniqueWithoutDemandeurInput[]
    createMany?: HistoriqueValidationCreateManyDemandeurInputEnvelope
    set?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    disconnect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    delete?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    connect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    update?: HistoriqueValidationUpdateWithWhereUniqueWithoutDemandeurInput | HistoriqueValidationUpdateWithWhereUniqueWithoutDemandeurInput[]
    updateMany?: HistoriqueValidationUpdateManyWithWhereWithoutDemandeurInput | HistoriqueValidationUpdateManyWithWhereWithoutDemandeurInput[]
    deleteMany?: HistoriqueValidationScalarWhereInput | HistoriqueValidationScalarWhereInput[]
  }

  export type HistoriqueValidationUncheckedUpdateManyWithoutDemandeurNestedInput = {
    create?: XOR<HistoriqueValidationCreateWithoutDemandeurInput, HistoriqueValidationUncheckedCreateWithoutDemandeurInput> | HistoriqueValidationCreateWithoutDemandeurInput[] | HistoriqueValidationUncheckedCreateWithoutDemandeurInput[]
    connectOrCreate?: HistoriqueValidationCreateOrConnectWithoutDemandeurInput | HistoriqueValidationCreateOrConnectWithoutDemandeurInput[]
    upsert?: HistoriqueValidationUpsertWithWhereUniqueWithoutDemandeurInput | HistoriqueValidationUpsertWithWhereUniqueWithoutDemandeurInput[]
    createMany?: HistoriqueValidationCreateManyDemandeurInputEnvelope
    set?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    disconnect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    delete?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    connect?: HistoriqueValidationWhereUniqueInput | HistoriqueValidationWhereUniqueInput[]
    update?: HistoriqueValidationUpdateWithWhereUniqueWithoutDemandeurInput | HistoriqueValidationUpdateWithWhereUniqueWithoutDemandeurInput[]
    updateMany?: HistoriqueValidationUpdateManyWithWhereWithoutDemandeurInput | HistoriqueValidationUpdateManyWithWhereWithoutDemandeurInput[]
    deleteMany?: HistoriqueValidationScalarWhereInput | HistoriqueValidationScalarWhereInput[]
  }

  export type DemandeurCreateNestedOneWithoutHistoriqueInput = {
    create?: XOR<DemandeurCreateWithoutHistoriqueInput, DemandeurUncheckedCreateWithoutHistoriqueInput>
    connectOrCreate?: DemandeurCreateOrConnectWithoutHistoriqueInput
    connect?: DemandeurWhereUniqueInput
  }

  export type CollaborateurCreateNestedOneWithoutHistoriqueValideInput = {
    create?: XOR<CollaborateurCreateWithoutHistoriqueValideInput, CollaborateurUncheckedCreateWithoutHistoriqueValideInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutHistoriqueValideInput
    connect?: CollaborateurWhereUniqueInput
  }

  export type EnumStatutValidationFieldUpdateOperationsInput = {
    set?: $Enums.StatutValidation
  }

  export type DemandeurUpdateOneRequiredWithoutHistoriqueNestedInput = {
    create?: XOR<DemandeurCreateWithoutHistoriqueInput, DemandeurUncheckedCreateWithoutHistoriqueInput>
    connectOrCreate?: DemandeurCreateOrConnectWithoutHistoriqueInput
    upsert?: DemandeurUpsertWithoutHistoriqueInput
    connect?: DemandeurWhereUniqueInput
    update?: XOR<XOR<DemandeurUpdateToOneWithWhereWithoutHistoriqueInput, DemandeurUpdateWithoutHistoriqueInput>, DemandeurUncheckedUpdateWithoutHistoriqueInput>
  }

  export type CollaborateurUpdateOneWithoutHistoriqueValideNestedInput = {
    create?: XOR<CollaborateurCreateWithoutHistoriqueValideInput, CollaborateurUncheckedCreateWithoutHistoriqueValideInput>
    connectOrCreate?: CollaborateurCreateOrConnectWithoutHistoriqueValideInput
    upsert?: CollaborateurUpsertWithoutHistoriqueValideInput
    disconnect?: CollaborateurWhereInput | boolean
    delete?: CollaborateurWhereInput | boolean
    connect?: CollaborateurWhereUniqueInput
    update?: XOR<XOR<CollaborateurUpdateToOneWithWhereWithoutHistoriqueValideInput, CollaborateurUpdateWithoutHistoriqueValideInput>, CollaborateurUncheckedUpdateWithoutHistoriqueValideInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCiviliteNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Civilite | EnumCiviliteFieldRefInput<$PrismaModel> | null
    in?: $Enums.Civilite[] | null
    notIn?: $Enums.Civilite[] | null
    not?: NestedEnumCiviliteNullableFilter<$PrismaModel> | $Enums.Civilite | null
  }

  export type NestedEnumCiviliteNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Civilite | EnumCiviliteFieldRefInput<$PrismaModel> | null
    in?: $Enums.Civilite[] | null
    notIn?: $Enums.Civilite[] | null
    not?: NestedEnumCiviliteNullableWithAggregatesFilter<$PrismaModel> | $Enums.Civilite | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCiviliteNullableFilter<$PrismaModel>
    _max?: NestedEnumCiviliteNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumTypeNavetteFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeNavette | EnumTypeNavetteFieldRefInput<$PrismaModel>
    in?: $Enums.TypeNavette[]
    notIn?: $Enums.TypeNavette[]
    not?: NestedEnumTypeNavetteFilter<$PrismaModel> | $Enums.TypeNavette
  }

  export type NestedEnumTypeNavetteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeNavette | EnumTypeNavetteFieldRefInput<$PrismaModel>
    in?: $Enums.TypeNavette[]
    notIn?: $Enums.TypeNavette[]
    not?: NestedEnumTypeNavetteWithAggregatesFilter<$PrismaModel> | $Enums.TypeNavette
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeNavetteFilter<$PrismaModel>
    _max?: NestedEnumTypeNavetteFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumStatutDemandeFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutDemande | EnumStatutDemandeFieldRefInput<$PrismaModel>
    in?: $Enums.StatutDemande[]
    notIn?: $Enums.StatutDemande[]
    not?: NestedEnumStatutDemandeFilter<$PrismaModel> | $Enums.StatutDemande
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatutDemandeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutDemande | EnumStatutDemandeFieldRefInput<$PrismaModel>
    in?: $Enums.StatutDemande[]
    notIn?: $Enums.StatutDemande[]
    not?: NestedEnumStatutDemandeWithAggregatesFilter<$PrismaModel> | $Enums.StatutDemande
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutDemandeFilter<$PrismaModel>
    _max?: NestedEnumStatutDemandeFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumStatutValidationFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutValidation | EnumStatutValidationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutValidation[]
    notIn?: $Enums.StatutValidation[]
    not?: NestedEnumStatutValidationFilter<$PrismaModel> | $Enums.StatutValidation
  }

  export type NestedEnumStatutValidationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutValidation | EnumStatutValidationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutValidation[]
    notIn?: $Enums.StatutValidation[]
    not?: NestedEnumStatutValidationWithAggregatesFilter<$PrismaModel> | $Enums.StatutValidation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutValidationFilter<$PrismaModel>
    _max?: NestedEnumStatutValidationFilter<$PrismaModel>
  }

  export type BudgetCreateWithoutServiceInput = {
    codeBudgetaire: string
    montantDisponible?: Decimal | DecimalJsLike | number | string
    demandes?: DemandeurCreateNestedManyWithoutBudgetInput
  }

  export type BudgetUncheckedCreateWithoutServiceInput = {
    id?: number
    codeBudgetaire: string
    montantDisponible?: Decimal | DecimalJsLike | number | string
    demandes?: DemandeurUncheckedCreateNestedManyWithoutBudgetInput
  }

  export type BudgetCreateOrConnectWithoutServiceInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutServiceInput, BudgetUncheckedCreateWithoutServiceInput>
  }

  export type BudgetCreateManyServiceInputEnvelope = {
    data: BudgetCreateManyServiceInput | BudgetCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type CollaborateurCreateWithoutServiceInput = {
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesCreateNestedManyWithoutCollaborateurInput
    fonction?: FonctionCreateNestedOneWithoutCollaborateursInput
    comptes?: ComptesUtilisateursCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceCreateNestedManyWithoutChefInput
  }

  export type CollaborateurUncheckedCreateWithoutServiceInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesUncheckedCreateNestedManyWithoutCollaborateurInput
    comptes?: ComptesUtilisateursUncheckedCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurUncheckedCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionUncheckedCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationUncheckedCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceUncheckedCreateNestedManyWithoutChefInput
  }

  export type CollaborateurCreateOrConnectWithoutServiceInput = {
    where: CollaborateurWhereUniqueInput
    create: XOR<CollaborateurCreateWithoutServiceInput, CollaborateurUncheckedCreateWithoutServiceInput>
  }

  export type CollaborateurCreateManyServiceInputEnvelope = {
    data: CollaborateurCreateManyServiceInput | CollaborateurCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type FonctionCreateWithoutServiceInput = {
    nomFonction: string
    abreviation?: string | null
    collaborateurs?: CollaborateurCreateNestedManyWithoutFonctionInput
    chef?: CollaborateurCreateNestedOneWithoutFonctionsChefInput
  }

  export type FonctionUncheckedCreateWithoutServiceInput = {
    id?: number
    nomFonction: string
    abreviation?: string | null
    chefMatricule?: string | null
    collaborateurs?: CollaborateurUncheckedCreateNestedManyWithoutFonctionInput
  }

  export type FonctionCreateOrConnectWithoutServiceInput = {
    where: FonctionWhereUniqueInput
    create: XOR<FonctionCreateWithoutServiceInput, FonctionUncheckedCreateWithoutServiceInput>
  }

  export type FonctionCreateManyServiceInputEnvelope = {
    data: FonctionCreateManyServiceInput | FonctionCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type CollaborateurCreateWithoutServicesChefInput = {
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesCreateNestedManyWithoutCollaborateurInput
    fonction?: FonctionCreateNestedOneWithoutCollaborateursInput
    service?: ServiceCreateNestedOneWithoutCollaborateursInput
    comptes?: ComptesUtilisateursCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationCreateNestedManyWithoutValideurInput
  }

  export type CollaborateurUncheckedCreateWithoutServicesChefInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesUncheckedCreateNestedManyWithoutCollaborateurInput
    comptes?: ComptesUtilisateursUncheckedCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurUncheckedCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionUncheckedCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationUncheckedCreateNestedManyWithoutValideurInput
  }

  export type CollaborateurCreateOrConnectWithoutServicesChefInput = {
    where: CollaborateurWhereUniqueInput
    create: XOR<CollaborateurCreateWithoutServicesChefInput, CollaborateurUncheckedCreateWithoutServicesChefInput>
  }

  export type BudgetUpsertWithWhereUniqueWithoutServiceInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutServiceInput, BudgetUncheckedUpdateWithoutServiceInput>
    create: XOR<BudgetCreateWithoutServiceInput, BudgetUncheckedCreateWithoutServiceInput>
  }

  export type BudgetUpdateWithWhereUniqueWithoutServiceInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutServiceInput, BudgetUncheckedUpdateWithoutServiceInput>
  }

  export type BudgetUpdateManyWithWhereWithoutServiceInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutServiceInput>
  }

  export type BudgetScalarWhereInput = {
    AND?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    OR?: BudgetScalarWhereInput[]
    NOT?: BudgetScalarWhereInput | BudgetScalarWhereInput[]
    id?: IntFilter<"Budget"> | number
    codeBudgetaire?: StringFilter<"Budget"> | string
    montantDisponible?: DecimalFilter<"Budget"> | Decimal | DecimalJsLike | number | string
    serviceId?: IntNullableFilter<"Budget"> | number | null
  }

  export type CollaborateurUpsertWithWhereUniqueWithoutServiceInput = {
    where: CollaborateurWhereUniqueInput
    update: XOR<CollaborateurUpdateWithoutServiceInput, CollaborateurUncheckedUpdateWithoutServiceInput>
    create: XOR<CollaborateurCreateWithoutServiceInput, CollaborateurUncheckedCreateWithoutServiceInput>
  }

  export type CollaborateurUpdateWithWhereUniqueWithoutServiceInput = {
    where: CollaborateurWhereUniqueInput
    data: XOR<CollaborateurUpdateWithoutServiceInput, CollaborateurUncheckedUpdateWithoutServiceInput>
  }

  export type CollaborateurUpdateManyWithWhereWithoutServiceInput = {
    where: CollaborateurScalarWhereInput
    data: XOR<CollaborateurUpdateManyMutationInput, CollaborateurUncheckedUpdateManyWithoutServiceInput>
  }

  export type CollaborateurScalarWhereInput = {
    AND?: CollaborateurScalarWhereInput | CollaborateurScalarWhereInput[]
    OR?: CollaborateurScalarWhereInput[]
    NOT?: CollaborateurScalarWhereInput | CollaborateurScalarWhereInput[]
    id?: IntFilter<"Collaborateur"> | number
    matricule?: StringFilter<"Collaborateur"> | string
    nom?: StringNullableFilter<"Collaborateur"> | string | null
    prenom?: StringNullableFilter<"Collaborateur"> | string | null
    prenomUsuelle?: StringNullableFilter<"Collaborateur"> | string | null
    civilite?: EnumCiviliteNullableFilter<"Collaborateur"> | $Enums.Civilite | null
    fonctionAbbrev?: StringNullableFilter<"Collaborateur"> | string | null
    serviceAbbrev?: StringNullableFilter<"Collaborateur"> | string | null
    telephone?: StringNullableFilter<"Collaborateur"> | string | null
    mailPro?: StringNullableFilter<"Collaborateur"> | string | null
    photo?: StringNullableFilter<"Collaborateur"> | string | null
  }

  export type FonctionUpsertWithWhereUniqueWithoutServiceInput = {
    where: FonctionWhereUniqueInput
    update: XOR<FonctionUpdateWithoutServiceInput, FonctionUncheckedUpdateWithoutServiceInput>
    create: XOR<FonctionCreateWithoutServiceInput, FonctionUncheckedCreateWithoutServiceInput>
  }

  export type FonctionUpdateWithWhereUniqueWithoutServiceInput = {
    where: FonctionWhereUniqueInput
    data: XOR<FonctionUpdateWithoutServiceInput, FonctionUncheckedUpdateWithoutServiceInput>
  }

  export type FonctionUpdateManyWithWhereWithoutServiceInput = {
    where: FonctionScalarWhereInput
    data: XOR<FonctionUpdateManyMutationInput, FonctionUncheckedUpdateManyWithoutServiceInput>
  }

  export type FonctionScalarWhereInput = {
    AND?: FonctionScalarWhereInput | FonctionScalarWhereInput[]
    OR?: FonctionScalarWhereInput[]
    NOT?: FonctionScalarWhereInput | FonctionScalarWhereInput[]
    id?: IntFilter<"Fonction"> | number
    nomFonction?: StringFilter<"Fonction"> | string
    abreviation?: StringNullableFilter<"Fonction"> | string | null
    serviceId?: IntNullableFilter<"Fonction"> | number | null
    chefMatricule?: StringNullableFilter<"Fonction"> | string | null
  }

  export type CollaborateurUpsertWithoutServicesChefInput = {
    update: XOR<CollaborateurUpdateWithoutServicesChefInput, CollaborateurUncheckedUpdateWithoutServicesChefInput>
    create: XOR<CollaborateurCreateWithoutServicesChefInput, CollaborateurUncheckedCreateWithoutServicesChefInput>
    where?: CollaborateurWhereInput
  }

  export type CollaborateurUpdateToOneWithWhereWithoutServicesChefInput = {
    where?: CollaborateurWhereInput
    data: XOR<CollaborateurUpdateWithoutServicesChefInput, CollaborateurUncheckedUpdateWithoutServicesChefInput>
  }

  export type CollaborateurUpdateWithoutServicesChefInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUpdateManyWithoutCollaborateurNestedInput
    fonction?: FonctionUpdateOneWithoutCollaborateursNestedInput
    service?: ServiceUpdateOneWithoutCollaborateursNestedInput
    comptes?: ComptesUtilisateursUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUpdateManyWithoutValideurNestedInput
  }

  export type CollaborateurUncheckedUpdateWithoutServicesChefInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurNestedInput
    comptes?: ComptesUtilisateursUncheckedUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUncheckedUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUncheckedUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUncheckedUpdateManyWithoutValideurNestedInput
  }

  export type DemandeurCreateWithoutFournisseurInput = {
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
    auteur?: CollaborateurCreateNestedOneWithoutDemandesInput
    budget?: BudgetCreateNestedOneWithoutDemandesInput
    historique?: HistoriqueValidationCreateNestedManyWithoutDemandeurInput
  }

  export type DemandeurUncheckedCreateWithoutFournisseurInput = {
    id?: number
    auteurMatricule?: string | null
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    budgetID?: number | null
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
    historique?: HistoriqueValidationUncheckedCreateNestedManyWithoutDemandeurInput
  }

  export type DemandeurCreateOrConnectWithoutFournisseurInput = {
    where: DemandeurWhereUniqueInput
    create: XOR<DemandeurCreateWithoutFournisseurInput, DemandeurUncheckedCreateWithoutFournisseurInput>
  }

  export type DemandeurCreateManyFournisseurInputEnvelope = {
    data: DemandeurCreateManyFournisseurInput | DemandeurCreateManyFournisseurInput[]
    skipDuplicates?: boolean
  }

  export type DemandeurUpsertWithWhereUniqueWithoutFournisseurInput = {
    where: DemandeurWhereUniqueInput
    update: XOR<DemandeurUpdateWithoutFournisseurInput, DemandeurUncheckedUpdateWithoutFournisseurInput>
    create: XOR<DemandeurCreateWithoutFournisseurInput, DemandeurUncheckedCreateWithoutFournisseurInput>
  }

  export type DemandeurUpdateWithWhereUniqueWithoutFournisseurInput = {
    where: DemandeurWhereUniqueInput
    data: XOR<DemandeurUpdateWithoutFournisseurInput, DemandeurUncheckedUpdateWithoutFournisseurInput>
  }

  export type DemandeurUpdateManyWithWhereWithoutFournisseurInput = {
    where: DemandeurScalarWhereInput
    data: XOR<DemandeurUpdateManyMutationInput, DemandeurUncheckedUpdateManyWithoutFournisseurInput>
  }

  export type DemandeurScalarWhereInput = {
    AND?: DemandeurScalarWhereInput | DemandeurScalarWhereInput[]
    OR?: DemandeurScalarWhereInput[]
    NOT?: DemandeurScalarWhereInput | DemandeurScalarWhereInput[]
    id?: IntFilter<"Demandeur"> | number
    auteurMatricule?: StringNullableFilter<"Demandeur"> | string | null
    type?: EnumTypeNavetteFilter<"Demandeur"> | $Enums.TypeNavette
    etapeActuelle?: IntFilter<"Demandeur"> | number
    numero?: IntNullableFilter<"Demandeur"> | number | null
    objet?: StringNullableFilter<"Demandeur"> | string | null
    description?: StringNullableFilter<"Demandeur"> | string | null
    motif?: StringNullableFilter<"Demandeur"> | string | null
    quantite?: IntNullableFilter<"Demandeur"> | number | null
    fournisseurID?: IntNullableFilter<"Demandeur"> | number | null
    pu?: DecimalNullableFilter<"Demandeur"> | Decimal | DecimalJsLike | number | string | null
    montant?: DecimalNullableFilter<"Demandeur"> | Decimal | DecimalJsLike | number | string | null
    devis?: StringNullableFilter<"Demandeur"> | string | null
    pieceJointe?: StringNullableFilter<"Demandeur"> | string | null
    justificationChoix?: StringNullableFilter<"Demandeur"> | string | null
    imputationComptable?: StringNullableFilter<"Demandeur"> | string | null
    activite?: StringNullableFilter<"Demandeur"> | string | null
    codeTIGER?: StringNullableFilter<"Demandeur"> | string | null
    modePaiement?: StringNullableFilter<"Demandeur"> | string | null
    paiementDetail?: StringNullableFilter<"Demandeur"> | string | null
    numeroBonCommande?: StringNullableFilter<"Demandeur"> | string | null
    dateLivraison?: DateTimeNullableFilter<"Demandeur"> | Date | string | null
    versQui?: StringNullableFilter<"Demandeur"> | string | null
    statut?: EnumStatutDemandeFilter<"Demandeur"> | $Enums.StatutDemande
    budgetID?: IntNullableFilter<"Demandeur"> | number | null
    dateDepot?: DateTimeFilter<"Demandeur"> | Date | string
    dateFinalisation?: DateTimeNullableFilter<"Demandeur"> | Date | string | null
    isAPGenere?: BoolFilter<"Demandeur"> | boolean
    isBCGenere?: BoolFilter<"Demandeur"> | boolean
    isAPExporte?: BoolFilter<"Demandeur"> | boolean
    reference?: StringNullableFilter<"Demandeur"> | string | null
  }

  export type CollaborateurCreateWithoutFonctionInput = {
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesCreateNestedManyWithoutCollaborateurInput
    service?: ServiceCreateNestedOneWithoutCollaborateursInput
    comptes?: ComptesUtilisateursCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceCreateNestedManyWithoutChefInput
  }

  export type CollaborateurUncheckedCreateWithoutFonctionInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesUncheckedCreateNestedManyWithoutCollaborateurInput
    comptes?: ComptesUtilisateursUncheckedCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurUncheckedCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionUncheckedCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationUncheckedCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceUncheckedCreateNestedManyWithoutChefInput
  }

  export type CollaborateurCreateOrConnectWithoutFonctionInput = {
    where: CollaborateurWhereUniqueInput
    create: XOR<CollaborateurCreateWithoutFonctionInput, CollaborateurUncheckedCreateWithoutFonctionInput>
  }

  export type CollaborateurCreateManyFonctionInputEnvelope = {
    data: CollaborateurCreateManyFonctionInput | CollaborateurCreateManyFonctionInput[]
    skipDuplicates?: boolean
  }

  export type CollaborateurCreateWithoutFonctionsChefInput = {
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesCreateNestedManyWithoutCollaborateurInput
    fonction?: FonctionCreateNestedOneWithoutCollaborateursInput
    service?: ServiceCreateNestedOneWithoutCollaborateursInput
    comptes?: ComptesUtilisateursCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurCreateNestedManyWithoutAuteurInput
    historiqueValide?: HistoriqueValidationCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceCreateNestedManyWithoutChefInput
  }

  export type CollaborateurUncheckedCreateWithoutFonctionsChefInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesUncheckedCreateNestedManyWithoutCollaborateurInput
    comptes?: ComptesUtilisateursUncheckedCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurUncheckedCreateNestedManyWithoutAuteurInput
    historiqueValide?: HistoriqueValidationUncheckedCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceUncheckedCreateNestedManyWithoutChefInput
  }

  export type CollaborateurCreateOrConnectWithoutFonctionsChefInput = {
    where: CollaborateurWhereUniqueInput
    create: XOR<CollaborateurCreateWithoutFonctionsChefInput, CollaborateurUncheckedCreateWithoutFonctionsChefInput>
  }

  export type ServiceCreateWithoutFonctionsInput = {
    nomService: string
    abreviation?: string | null
    budgets?: BudgetCreateNestedManyWithoutServiceInput
    collaborateurs?: CollaborateurCreateNestedManyWithoutServiceInput
    chef?: CollaborateurCreateNestedOneWithoutServicesChefInput
  }

  export type ServiceUncheckedCreateWithoutFonctionsInput = {
    id?: number
    nomService: string
    abreviation?: string | null
    chefServiceMatricule?: string | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutServiceInput
    collaborateurs?: CollaborateurUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutFonctionsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutFonctionsInput, ServiceUncheckedCreateWithoutFonctionsInput>
  }

  export type CollaborateurUpsertWithWhereUniqueWithoutFonctionInput = {
    where: CollaborateurWhereUniqueInput
    update: XOR<CollaborateurUpdateWithoutFonctionInput, CollaborateurUncheckedUpdateWithoutFonctionInput>
    create: XOR<CollaborateurCreateWithoutFonctionInput, CollaborateurUncheckedCreateWithoutFonctionInput>
  }

  export type CollaborateurUpdateWithWhereUniqueWithoutFonctionInput = {
    where: CollaborateurWhereUniqueInput
    data: XOR<CollaborateurUpdateWithoutFonctionInput, CollaborateurUncheckedUpdateWithoutFonctionInput>
  }

  export type CollaborateurUpdateManyWithWhereWithoutFonctionInput = {
    where: CollaborateurScalarWhereInput
    data: XOR<CollaborateurUpdateManyMutationInput, CollaborateurUncheckedUpdateManyWithoutFonctionInput>
  }

  export type CollaborateurUpsertWithoutFonctionsChefInput = {
    update: XOR<CollaborateurUpdateWithoutFonctionsChefInput, CollaborateurUncheckedUpdateWithoutFonctionsChefInput>
    create: XOR<CollaborateurCreateWithoutFonctionsChefInput, CollaborateurUncheckedCreateWithoutFonctionsChefInput>
    where?: CollaborateurWhereInput
  }

  export type CollaborateurUpdateToOneWithWhereWithoutFonctionsChefInput = {
    where?: CollaborateurWhereInput
    data: XOR<CollaborateurUpdateWithoutFonctionsChefInput, CollaborateurUncheckedUpdateWithoutFonctionsChefInput>
  }

  export type CollaborateurUpdateWithoutFonctionsChefInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUpdateManyWithoutCollaborateurNestedInput
    fonction?: FonctionUpdateOneWithoutCollaborateursNestedInput
    service?: ServiceUpdateOneWithoutCollaborateursNestedInput
    comptes?: ComptesUtilisateursUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUpdateManyWithoutAuteurNestedInput
    historiqueValide?: HistoriqueValidationUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateWithoutFonctionsChefInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurNestedInput
    comptes?: ComptesUtilisateursUncheckedUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUncheckedUpdateManyWithoutAuteurNestedInput
    historiqueValide?: HistoriqueValidationUncheckedUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUncheckedUpdateManyWithoutChefNestedInput
  }

  export type ServiceUpsertWithoutFonctionsInput = {
    update: XOR<ServiceUpdateWithoutFonctionsInput, ServiceUncheckedUpdateWithoutFonctionsInput>
    create: XOR<ServiceCreateWithoutFonctionsInput, ServiceUncheckedCreateWithoutFonctionsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutFonctionsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutFonctionsInput, ServiceUncheckedUpdateWithoutFonctionsInput>
  }

  export type ServiceUpdateWithoutFonctionsInput = {
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    budgets?: BudgetUpdateManyWithoutServiceNestedInput
    collaborateurs?: CollaborateurUpdateManyWithoutServiceNestedInput
    chef?: CollaborateurUpdateOneWithoutServicesChefNestedInput
  }

  export type ServiceUncheckedUpdateWithoutFonctionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    chefServiceMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    budgets?: BudgetUncheckedUpdateManyWithoutServiceNestedInput
    collaborateurs?: CollaborateurUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type CollaborateurRolesCreateWithoutCollaborateurInput = {
    role: RolesCreateNestedOneWithoutCollaborateurRolesInput
  }

  export type CollaborateurRolesUncheckedCreateWithoutCollaborateurInput = {
    roleID: number
  }

  export type CollaborateurRolesCreateOrConnectWithoutCollaborateurInput = {
    where: CollaborateurRolesWhereUniqueInput
    create: XOR<CollaborateurRolesCreateWithoutCollaborateurInput, CollaborateurRolesUncheckedCreateWithoutCollaborateurInput>
  }

  export type CollaborateurRolesCreateManyCollaborateurInputEnvelope = {
    data: CollaborateurRolesCreateManyCollaborateurInput | CollaborateurRolesCreateManyCollaborateurInput[]
    skipDuplicates?: boolean
  }

  export type FonctionCreateWithoutCollaborateursInput = {
    nomFonction: string
    abreviation?: string | null
    chef?: CollaborateurCreateNestedOneWithoutFonctionsChefInput
    service?: ServiceCreateNestedOneWithoutFonctionsInput
  }

  export type FonctionUncheckedCreateWithoutCollaborateursInput = {
    id?: number
    nomFonction: string
    abreviation?: string | null
    serviceId?: number | null
    chefMatricule?: string | null
  }

  export type FonctionCreateOrConnectWithoutCollaborateursInput = {
    where: FonctionWhereUniqueInput
    create: XOR<FonctionCreateWithoutCollaborateursInput, FonctionUncheckedCreateWithoutCollaborateursInput>
  }

  export type ServiceCreateWithoutCollaborateursInput = {
    nomService: string
    abreviation?: string | null
    budgets?: BudgetCreateNestedManyWithoutServiceInput
    fonctions?: FonctionCreateNestedManyWithoutServiceInput
    chef?: CollaborateurCreateNestedOneWithoutServicesChefInput
  }

  export type ServiceUncheckedCreateWithoutCollaborateursInput = {
    id?: number
    nomService: string
    abreviation?: string | null
    chefServiceMatricule?: string | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutServiceInput
    fonctions?: FonctionUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutCollaborateursInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutCollaborateursInput, ServiceUncheckedCreateWithoutCollaborateursInput>
  }

  export type ComptesUtilisateursCreateWithoutCollaborateurInput = {
    motDePasse: string
  }

  export type ComptesUtilisateursUncheckedCreateWithoutCollaborateurInput = {
    motDePasse: string
  }

  export type ComptesUtilisateursCreateOrConnectWithoutCollaborateurInput = {
    where: ComptesUtilisateursWhereUniqueInput
    create: XOR<ComptesUtilisateursCreateWithoutCollaborateurInput, ComptesUtilisateursUncheckedCreateWithoutCollaborateurInput>
  }

  export type DemandeurCreateWithoutAuteurInput = {
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
    budget?: BudgetCreateNestedOneWithoutDemandesInput
    fournisseur?: FournisseurCreateNestedOneWithoutDemandesInput
    historique?: HistoriqueValidationCreateNestedManyWithoutDemandeurInput
  }

  export type DemandeurUncheckedCreateWithoutAuteurInput = {
    id?: number
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    fournisseurID?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    budgetID?: number | null
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
    historique?: HistoriqueValidationUncheckedCreateNestedManyWithoutDemandeurInput
  }

  export type DemandeurCreateOrConnectWithoutAuteurInput = {
    where: DemandeurWhereUniqueInput
    create: XOR<DemandeurCreateWithoutAuteurInput, DemandeurUncheckedCreateWithoutAuteurInput>
  }

  export type DemandeurCreateManyAuteurInputEnvelope = {
    data: DemandeurCreateManyAuteurInput | DemandeurCreateManyAuteurInput[]
    skipDuplicates?: boolean
  }

  export type FonctionCreateWithoutChefInput = {
    nomFonction: string
    abreviation?: string | null
    collaborateurs?: CollaborateurCreateNestedManyWithoutFonctionInput
    service?: ServiceCreateNestedOneWithoutFonctionsInput
  }

  export type FonctionUncheckedCreateWithoutChefInput = {
    id?: number
    nomFonction: string
    abreviation?: string | null
    serviceId?: number | null
    collaborateurs?: CollaborateurUncheckedCreateNestedManyWithoutFonctionInput
  }

  export type FonctionCreateOrConnectWithoutChefInput = {
    where: FonctionWhereUniqueInput
    create: XOR<FonctionCreateWithoutChefInput, FonctionUncheckedCreateWithoutChefInput>
  }

  export type FonctionCreateManyChefInputEnvelope = {
    data: FonctionCreateManyChefInput | FonctionCreateManyChefInput[]
    skipDuplicates?: boolean
  }

  export type HistoriqueValidationCreateWithoutValideurInput = {
    etape: number
    statut: $Enums.StatutValidation
    motifRefus?: string | null
    dateValidation?: Date | string
    id_navette?: number | null
    reference_navette?: string | null
    demandeur: DemandeurCreateNestedOneWithoutHistoriqueInput
  }

  export type HistoriqueValidationUncheckedCreateWithoutValideurInput = {
    id?: number
    demandeurID: number
    etape: number
    statut: $Enums.StatutValidation
    motifRefus?: string | null
    dateValidation?: Date | string
    id_navette?: number | null
    reference_navette?: string | null
  }

  export type HistoriqueValidationCreateOrConnectWithoutValideurInput = {
    where: HistoriqueValidationWhereUniqueInput
    create: XOR<HistoriqueValidationCreateWithoutValideurInput, HistoriqueValidationUncheckedCreateWithoutValideurInput>
  }

  export type HistoriqueValidationCreateManyValideurInputEnvelope = {
    data: HistoriqueValidationCreateManyValideurInput | HistoriqueValidationCreateManyValideurInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutChefInput = {
    nomService: string
    abreviation?: string | null
    budgets?: BudgetCreateNestedManyWithoutServiceInput
    collaborateurs?: CollaborateurCreateNestedManyWithoutServiceInput
    fonctions?: FonctionCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutChefInput = {
    id?: number
    nomService: string
    abreviation?: string | null
    budgets?: BudgetUncheckedCreateNestedManyWithoutServiceInput
    collaborateurs?: CollaborateurUncheckedCreateNestedManyWithoutServiceInput
    fonctions?: FonctionUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutChefInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutChefInput, ServiceUncheckedCreateWithoutChefInput>
  }

  export type ServiceCreateManyChefInputEnvelope = {
    data: ServiceCreateManyChefInput | ServiceCreateManyChefInput[]
    skipDuplicates?: boolean
  }

  export type CollaborateurRolesUpsertWithWhereUniqueWithoutCollaborateurInput = {
    where: CollaborateurRolesWhereUniqueInput
    update: XOR<CollaborateurRolesUpdateWithoutCollaborateurInput, CollaborateurRolesUncheckedUpdateWithoutCollaborateurInput>
    create: XOR<CollaborateurRolesCreateWithoutCollaborateurInput, CollaborateurRolesUncheckedCreateWithoutCollaborateurInput>
  }

  export type CollaborateurRolesUpdateWithWhereUniqueWithoutCollaborateurInput = {
    where: CollaborateurRolesWhereUniqueInput
    data: XOR<CollaborateurRolesUpdateWithoutCollaborateurInput, CollaborateurRolesUncheckedUpdateWithoutCollaborateurInput>
  }

  export type CollaborateurRolesUpdateManyWithWhereWithoutCollaborateurInput = {
    where: CollaborateurRolesScalarWhereInput
    data: XOR<CollaborateurRolesUpdateManyMutationInput, CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurInput>
  }

  export type CollaborateurRolesScalarWhereInput = {
    AND?: CollaborateurRolesScalarWhereInput | CollaborateurRolesScalarWhereInput[]
    OR?: CollaborateurRolesScalarWhereInput[]
    NOT?: CollaborateurRolesScalarWhereInput | CollaborateurRolesScalarWhereInput[]
    matricule?: StringFilter<"CollaborateurRoles"> | string
    roleID?: IntFilter<"CollaborateurRoles"> | number
  }

  export type FonctionUpsertWithoutCollaborateursInput = {
    update: XOR<FonctionUpdateWithoutCollaborateursInput, FonctionUncheckedUpdateWithoutCollaborateursInput>
    create: XOR<FonctionCreateWithoutCollaborateursInput, FonctionUncheckedCreateWithoutCollaborateursInput>
    where?: FonctionWhereInput
  }

  export type FonctionUpdateToOneWithWhereWithoutCollaborateursInput = {
    where?: FonctionWhereInput
    data: XOR<FonctionUpdateWithoutCollaborateursInput, FonctionUncheckedUpdateWithoutCollaborateursInput>
  }

  export type FonctionUpdateWithoutCollaborateursInput = {
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    chef?: CollaborateurUpdateOneWithoutFonctionsChefNestedInput
    service?: ServiceUpdateOneWithoutFonctionsNestedInput
  }

  export type FonctionUncheckedUpdateWithoutCollaborateursInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: NullableIntFieldUpdateOperationsInput | number | null
    chefMatricule?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceUpsertWithoutCollaborateursInput = {
    update: XOR<ServiceUpdateWithoutCollaborateursInput, ServiceUncheckedUpdateWithoutCollaborateursInput>
    create: XOR<ServiceCreateWithoutCollaborateursInput, ServiceUncheckedCreateWithoutCollaborateursInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutCollaborateursInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutCollaborateursInput, ServiceUncheckedUpdateWithoutCollaborateursInput>
  }

  export type ServiceUpdateWithoutCollaborateursInput = {
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    budgets?: BudgetUpdateManyWithoutServiceNestedInput
    fonctions?: FonctionUpdateManyWithoutServiceNestedInput
    chef?: CollaborateurUpdateOneWithoutServicesChefNestedInput
  }

  export type ServiceUncheckedUpdateWithoutCollaborateursInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    chefServiceMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    budgets?: BudgetUncheckedUpdateManyWithoutServiceNestedInput
    fonctions?: FonctionUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ComptesUtilisateursUpsertWithoutCollaborateurInput = {
    update: XOR<ComptesUtilisateursUpdateWithoutCollaborateurInput, ComptesUtilisateursUncheckedUpdateWithoutCollaborateurInput>
    create: XOR<ComptesUtilisateursCreateWithoutCollaborateurInput, ComptesUtilisateursUncheckedCreateWithoutCollaborateurInput>
    where?: ComptesUtilisateursWhereInput
  }

  export type ComptesUtilisateursUpdateToOneWithWhereWithoutCollaborateurInput = {
    where?: ComptesUtilisateursWhereInput
    data: XOR<ComptesUtilisateursUpdateWithoutCollaborateurInput, ComptesUtilisateursUncheckedUpdateWithoutCollaborateurInput>
  }

  export type ComptesUtilisateursUpdateWithoutCollaborateurInput = {
    motDePasse?: StringFieldUpdateOperationsInput | string
  }

  export type ComptesUtilisateursUncheckedUpdateWithoutCollaborateurInput = {
    motDePasse?: StringFieldUpdateOperationsInput | string
  }

  export type DemandeurUpsertWithWhereUniqueWithoutAuteurInput = {
    where: DemandeurWhereUniqueInput
    update: XOR<DemandeurUpdateWithoutAuteurInput, DemandeurUncheckedUpdateWithoutAuteurInput>
    create: XOR<DemandeurCreateWithoutAuteurInput, DemandeurUncheckedCreateWithoutAuteurInput>
  }

  export type DemandeurUpdateWithWhereUniqueWithoutAuteurInput = {
    where: DemandeurWhereUniqueInput
    data: XOR<DemandeurUpdateWithoutAuteurInput, DemandeurUncheckedUpdateWithoutAuteurInput>
  }

  export type DemandeurUpdateManyWithWhereWithoutAuteurInput = {
    where: DemandeurScalarWhereInput
    data: XOR<DemandeurUpdateManyMutationInput, DemandeurUncheckedUpdateManyWithoutAuteurInput>
  }

  export type FonctionUpsertWithWhereUniqueWithoutChefInput = {
    where: FonctionWhereUniqueInput
    update: XOR<FonctionUpdateWithoutChefInput, FonctionUncheckedUpdateWithoutChefInput>
    create: XOR<FonctionCreateWithoutChefInput, FonctionUncheckedCreateWithoutChefInput>
  }

  export type FonctionUpdateWithWhereUniqueWithoutChefInput = {
    where: FonctionWhereUniqueInput
    data: XOR<FonctionUpdateWithoutChefInput, FonctionUncheckedUpdateWithoutChefInput>
  }

  export type FonctionUpdateManyWithWhereWithoutChefInput = {
    where: FonctionScalarWhereInput
    data: XOR<FonctionUpdateManyMutationInput, FonctionUncheckedUpdateManyWithoutChefInput>
  }

  export type HistoriqueValidationUpsertWithWhereUniqueWithoutValideurInput = {
    where: HistoriqueValidationWhereUniqueInput
    update: XOR<HistoriqueValidationUpdateWithoutValideurInput, HistoriqueValidationUncheckedUpdateWithoutValideurInput>
    create: XOR<HistoriqueValidationCreateWithoutValideurInput, HistoriqueValidationUncheckedCreateWithoutValideurInput>
  }

  export type HistoriqueValidationUpdateWithWhereUniqueWithoutValideurInput = {
    where: HistoriqueValidationWhereUniqueInput
    data: XOR<HistoriqueValidationUpdateWithoutValideurInput, HistoriqueValidationUncheckedUpdateWithoutValideurInput>
  }

  export type HistoriqueValidationUpdateManyWithWhereWithoutValideurInput = {
    where: HistoriqueValidationScalarWhereInput
    data: XOR<HistoriqueValidationUpdateManyMutationInput, HistoriqueValidationUncheckedUpdateManyWithoutValideurInput>
  }

  export type HistoriqueValidationScalarWhereInput = {
    AND?: HistoriqueValidationScalarWhereInput | HistoriqueValidationScalarWhereInput[]
    OR?: HistoriqueValidationScalarWhereInput[]
    NOT?: HistoriqueValidationScalarWhereInput | HistoriqueValidationScalarWhereInput[]
    id?: IntFilter<"HistoriqueValidation"> | number
    demandeurID?: IntFilter<"HistoriqueValidation"> | number
    etape?: IntFilter<"HistoriqueValidation"> | number
    valideurMatricule?: StringNullableFilter<"HistoriqueValidation"> | string | null
    statut?: EnumStatutValidationFilter<"HistoriqueValidation"> | $Enums.StatutValidation
    motifRefus?: StringNullableFilter<"HistoriqueValidation"> | string | null
    dateValidation?: DateTimeFilter<"HistoriqueValidation"> | Date | string
    id_navette?: IntNullableFilter<"HistoriqueValidation"> | number | null
    reference_navette?: StringNullableFilter<"HistoriqueValidation"> | string | null
  }

  export type ServiceUpsertWithWhereUniqueWithoutChefInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutChefInput, ServiceUncheckedUpdateWithoutChefInput>
    create: XOR<ServiceCreateWithoutChefInput, ServiceUncheckedCreateWithoutChefInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutChefInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutChefInput, ServiceUncheckedUpdateWithoutChefInput>
  }

  export type ServiceUpdateManyWithWhereWithoutChefInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutChefInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: IntFilter<"Service"> | number
    nomService?: StringFilter<"Service"> | string
    abreviation?: StringNullableFilter<"Service"> | string | null
    chefServiceMatricule?: StringNullableFilter<"Service"> | string | null
  }

  export type CollaborateurCreateWithoutComptesInput = {
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesCreateNestedManyWithoutCollaborateurInput
    fonction?: FonctionCreateNestedOneWithoutCollaborateursInput
    service?: ServiceCreateNestedOneWithoutCollaborateursInput
    demandes?: DemandeurCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceCreateNestedManyWithoutChefInput
  }

  export type CollaborateurUncheckedCreateWithoutComptesInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesUncheckedCreateNestedManyWithoutCollaborateurInput
    demandes?: DemandeurUncheckedCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionUncheckedCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationUncheckedCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceUncheckedCreateNestedManyWithoutChefInput
  }

  export type CollaborateurCreateOrConnectWithoutComptesInput = {
    where: CollaborateurWhereUniqueInput
    create: XOR<CollaborateurCreateWithoutComptesInput, CollaborateurUncheckedCreateWithoutComptesInput>
  }

  export type CollaborateurUpsertWithoutComptesInput = {
    update: XOR<CollaborateurUpdateWithoutComptesInput, CollaborateurUncheckedUpdateWithoutComptesInput>
    create: XOR<CollaborateurCreateWithoutComptesInput, CollaborateurUncheckedCreateWithoutComptesInput>
    where?: CollaborateurWhereInput
  }

  export type CollaborateurUpdateToOneWithWhereWithoutComptesInput = {
    where?: CollaborateurWhereInput
    data: XOR<CollaborateurUpdateWithoutComptesInput, CollaborateurUncheckedUpdateWithoutComptesInput>
  }

  export type CollaborateurUpdateWithoutComptesInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUpdateManyWithoutCollaborateurNestedInput
    fonction?: FonctionUpdateOneWithoutCollaborateursNestedInput
    service?: ServiceUpdateOneWithoutCollaborateursNestedInput
    demandes?: DemandeurUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateWithoutComptesInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurNestedInput
    demandes?: DemandeurUncheckedUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUncheckedUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUncheckedUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUncheckedUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurRolesCreateWithoutRoleInput = {
    collaborateur: CollaborateurCreateNestedOneWithoutCollaborateurRolesInput
  }

  export type CollaborateurRolesUncheckedCreateWithoutRoleInput = {
    matricule: string
  }

  export type CollaborateurRolesCreateOrConnectWithoutRoleInput = {
    where: CollaborateurRolesWhereUniqueInput
    create: XOR<CollaborateurRolesCreateWithoutRoleInput, CollaborateurRolesUncheckedCreateWithoutRoleInput>
  }

  export type CollaborateurRolesCreateManyRoleInputEnvelope = {
    data: CollaborateurRolesCreateManyRoleInput | CollaborateurRolesCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type CollaborateurRolesUpsertWithWhereUniqueWithoutRoleInput = {
    where: CollaborateurRolesWhereUniqueInput
    update: XOR<CollaborateurRolesUpdateWithoutRoleInput, CollaborateurRolesUncheckedUpdateWithoutRoleInput>
    create: XOR<CollaborateurRolesCreateWithoutRoleInput, CollaborateurRolesUncheckedCreateWithoutRoleInput>
  }

  export type CollaborateurRolesUpdateWithWhereUniqueWithoutRoleInput = {
    where: CollaborateurRolesWhereUniqueInput
    data: XOR<CollaborateurRolesUpdateWithoutRoleInput, CollaborateurRolesUncheckedUpdateWithoutRoleInput>
  }

  export type CollaborateurRolesUpdateManyWithWhereWithoutRoleInput = {
    where: CollaborateurRolesScalarWhereInput
    data: XOR<CollaborateurRolesUpdateManyMutationInput, CollaborateurRolesUncheckedUpdateManyWithoutRoleInput>
  }

  export type CollaborateurCreateWithoutCollaborateurRolesInput = {
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    fonction?: FonctionCreateNestedOneWithoutCollaborateursInput
    service?: ServiceCreateNestedOneWithoutCollaborateursInput
    comptes?: ComptesUtilisateursCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceCreateNestedManyWithoutChefInput
  }

  export type CollaborateurUncheckedCreateWithoutCollaborateurRolesInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    comptes?: ComptesUtilisateursUncheckedCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurUncheckedCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionUncheckedCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationUncheckedCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceUncheckedCreateNestedManyWithoutChefInput
  }

  export type CollaborateurCreateOrConnectWithoutCollaborateurRolesInput = {
    where: CollaborateurWhereUniqueInput
    create: XOR<CollaborateurCreateWithoutCollaborateurRolesInput, CollaborateurUncheckedCreateWithoutCollaborateurRolesInput>
  }

  export type RolesCreateWithoutCollaborateurRolesInput = {
    nomRole: string
  }

  export type RolesUncheckedCreateWithoutCollaborateurRolesInput = {
    id?: number
    nomRole: string
  }

  export type RolesCreateOrConnectWithoutCollaborateurRolesInput = {
    where: RolesWhereUniqueInput
    create: XOR<RolesCreateWithoutCollaborateurRolesInput, RolesUncheckedCreateWithoutCollaborateurRolesInput>
  }

  export type CollaborateurUpsertWithoutCollaborateurRolesInput = {
    update: XOR<CollaborateurUpdateWithoutCollaborateurRolesInput, CollaborateurUncheckedUpdateWithoutCollaborateurRolesInput>
    create: XOR<CollaborateurCreateWithoutCollaborateurRolesInput, CollaborateurUncheckedCreateWithoutCollaborateurRolesInput>
    where?: CollaborateurWhereInput
  }

  export type CollaborateurUpdateToOneWithWhereWithoutCollaborateurRolesInput = {
    where?: CollaborateurWhereInput
    data: XOR<CollaborateurUpdateWithoutCollaborateurRolesInput, CollaborateurUncheckedUpdateWithoutCollaborateurRolesInput>
  }

  export type CollaborateurUpdateWithoutCollaborateurRolesInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    fonction?: FonctionUpdateOneWithoutCollaborateursNestedInput
    service?: ServiceUpdateOneWithoutCollaborateursNestedInput
    comptes?: ComptesUtilisateursUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateWithoutCollaborateurRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    comptes?: ComptesUtilisateursUncheckedUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUncheckedUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUncheckedUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUncheckedUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUncheckedUpdateManyWithoutChefNestedInput
  }

  export type RolesUpsertWithoutCollaborateurRolesInput = {
    update: XOR<RolesUpdateWithoutCollaborateurRolesInput, RolesUncheckedUpdateWithoutCollaborateurRolesInput>
    create: XOR<RolesCreateWithoutCollaborateurRolesInput, RolesUncheckedCreateWithoutCollaborateurRolesInput>
    where?: RolesWhereInput
  }

  export type RolesUpdateToOneWithWhereWithoutCollaborateurRolesInput = {
    where?: RolesWhereInput
    data: XOR<RolesUpdateWithoutCollaborateurRolesInput, RolesUncheckedUpdateWithoutCollaborateurRolesInput>
  }

  export type RolesUpdateWithoutCollaborateurRolesInput = {
    nomRole?: StringFieldUpdateOperationsInput | string
  }

  export type RolesUncheckedUpdateWithoutCollaborateurRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomRole?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceCreateWithoutBudgetsInput = {
    nomService: string
    abreviation?: string | null
    collaborateurs?: CollaborateurCreateNestedManyWithoutServiceInput
    fonctions?: FonctionCreateNestedManyWithoutServiceInput
    chef?: CollaborateurCreateNestedOneWithoutServicesChefInput
  }

  export type ServiceUncheckedCreateWithoutBudgetsInput = {
    id?: number
    nomService: string
    abreviation?: string | null
    chefServiceMatricule?: string | null
    collaborateurs?: CollaborateurUncheckedCreateNestedManyWithoutServiceInput
    fonctions?: FonctionUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutBudgetsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutBudgetsInput, ServiceUncheckedCreateWithoutBudgetsInput>
  }

  export type DemandeurCreateWithoutBudgetInput = {
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
    auteur?: CollaborateurCreateNestedOneWithoutDemandesInput
    fournisseur?: FournisseurCreateNestedOneWithoutDemandesInput
    historique?: HistoriqueValidationCreateNestedManyWithoutDemandeurInput
  }

  export type DemandeurUncheckedCreateWithoutBudgetInput = {
    id?: number
    auteurMatricule?: string | null
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    fournisseurID?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
    historique?: HistoriqueValidationUncheckedCreateNestedManyWithoutDemandeurInput
  }

  export type DemandeurCreateOrConnectWithoutBudgetInput = {
    where: DemandeurWhereUniqueInput
    create: XOR<DemandeurCreateWithoutBudgetInput, DemandeurUncheckedCreateWithoutBudgetInput>
  }

  export type DemandeurCreateManyBudgetInputEnvelope = {
    data: DemandeurCreateManyBudgetInput | DemandeurCreateManyBudgetInput[]
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithoutBudgetsInput = {
    update: XOR<ServiceUpdateWithoutBudgetsInput, ServiceUncheckedUpdateWithoutBudgetsInput>
    create: XOR<ServiceCreateWithoutBudgetsInput, ServiceUncheckedCreateWithoutBudgetsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutBudgetsInput, ServiceUncheckedUpdateWithoutBudgetsInput>
  }

  export type ServiceUpdateWithoutBudgetsInput = {
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurs?: CollaborateurUpdateManyWithoutServiceNestedInput
    fonctions?: FonctionUpdateManyWithoutServiceNestedInput
    chef?: CollaborateurUpdateOneWithoutServicesChefNestedInput
  }

  export type ServiceUncheckedUpdateWithoutBudgetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    chefServiceMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurs?: CollaborateurUncheckedUpdateManyWithoutServiceNestedInput
    fonctions?: FonctionUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type DemandeurUpsertWithWhereUniqueWithoutBudgetInput = {
    where: DemandeurWhereUniqueInput
    update: XOR<DemandeurUpdateWithoutBudgetInput, DemandeurUncheckedUpdateWithoutBudgetInput>
    create: XOR<DemandeurCreateWithoutBudgetInput, DemandeurUncheckedCreateWithoutBudgetInput>
  }

  export type DemandeurUpdateWithWhereUniqueWithoutBudgetInput = {
    where: DemandeurWhereUniqueInput
    data: XOR<DemandeurUpdateWithoutBudgetInput, DemandeurUncheckedUpdateWithoutBudgetInput>
  }

  export type DemandeurUpdateManyWithWhereWithoutBudgetInput = {
    where: DemandeurScalarWhereInput
    data: XOR<DemandeurUpdateManyMutationInput, DemandeurUncheckedUpdateManyWithoutBudgetInput>
  }

  export type CollaborateurCreateWithoutDemandesInput = {
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesCreateNestedManyWithoutCollaborateurInput
    fonction?: FonctionCreateNestedOneWithoutCollaborateursInput
    service?: ServiceCreateNestedOneWithoutCollaborateursInput
    comptes?: ComptesUtilisateursCreateNestedOneWithoutCollaborateurInput
    fonctionsChef?: FonctionCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceCreateNestedManyWithoutChefInput
  }

  export type CollaborateurUncheckedCreateWithoutDemandesInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesUncheckedCreateNestedManyWithoutCollaborateurInput
    comptes?: ComptesUtilisateursUncheckedCreateNestedOneWithoutCollaborateurInput
    fonctionsChef?: FonctionUncheckedCreateNestedManyWithoutChefInput
    historiqueValide?: HistoriqueValidationUncheckedCreateNestedManyWithoutValideurInput
    servicesChef?: ServiceUncheckedCreateNestedManyWithoutChefInput
  }

  export type CollaborateurCreateOrConnectWithoutDemandesInput = {
    where: CollaborateurWhereUniqueInput
    create: XOR<CollaborateurCreateWithoutDemandesInput, CollaborateurUncheckedCreateWithoutDemandesInput>
  }

  export type BudgetCreateWithoutDemandesInput = {
    codeBudgetaire: string
    montantDisponible?: Decimal | DecimalJsLike | number | string
    service?: ServiceCreateNestedOneWithoutBudgetsInput
  }

  export type BudgetUncheckedCreateWithoutDemandesInput = {
    id?: number
    codeBudgetaire: string
    montantDisponible?: Decimal | DecimalJsLike | number | string
    serviceId?: number | null
  }

  export type BudgetCreateOrConnectWithoutDemandesInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutDemandesInput, BudgetUncheckedCreateWithoutDemandesInput>
  }

  export type FournisseurCreateWithoutDemandesInput = {
    nom?: string | null
    adresse?: string | null
    nomCheque?: string | null
    nif?: string | null
    cin?: string | null
  }

  export type FournisseurUncheckedCreateWithoutDemandesInput = {
    id?: number
    nom?: string | null
    adresse?: string | null
    nomCheque?: string | null
    nif?: string | null
    cin?: string | null
  }

  export type FournisseurCreateOrConnectWithoutDemandesInput = {
    where: FournisseurWhereUniqueInput
    create: XOR<FournisseurCreateWithoutDemandesInput, FournisseurUncheckedCreateWithoutDemandesInput>
  }

  export type HistoriqueValidationCreateWithoutDemandeurInput = {
    etape: number
    statut: $Enums.StatutValidation
    motifRefus?: string | null
    dateValidation?: Date | string
    id_navette?: number | null
    reference_navette?: string | null
    valideur?: CollaborateurCreateNestedOneWithoutHistoriqueValideInput
  }

  export type HistoriqueValidationUncheckedCreateWithoutDemandeurInput = {
    id?: number
    etape: number
    valideurMatricule?: string | null
    statut: $Enums.StatutValidation
    motifRefus?: string | null
    dateValidation?: Date | string
    id_navette?: number | null
    reference_navette?: string | null
  }

  export type HistoriqueValidationCreateOrConnectWithoutDemandeurInput = {
    where: HistoriqueValidationWhereUniqueInput
    create: XOR<HistoriqueValidationCreateWithoutDemandeurInput, HistoriqueValidationUncheckedCreateWithoutDemandeurInput>
  }

  export type HistoriqueValidationCreateManyDemandeurInputEnvelope = {
    data: HistoriqueValidationCreateManyDemandeurInput | HistoriqueValidationCreateManyDemandeurInput[]
    skipDuplicates?: boolean
  }

  export type CollaborateurUpsertWithoutDemandesInput = {
    update: XOR<CollaborateurUpdateWithoutDemandesInput, CollaborateurUncheckedUpdateWithoutDemandesInput>
    create: XOR<CollaborateurCreateWithoutDemandesInput, CollaborateurUncheckedCreateWithoutDemandesInput>
    where?: CollaborateurWhereInput
  }

  export type CollaborateurUpdateToOneWithWhereWithoutDemandesInput = {
    where?: CollaborateurWhereInput
    data: XOR<CollaborateurUpdateWithoutDemandesInput, CollaborateurUncheckedUpdateWithoutDemandesInput>
  }

  export type CollaborateurUpdateWithoutDemandesInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUpdateManyWithoutCollaborateurNestedInput
    fonction?: FonctionUpdateOneWithoutCollaborateursNestedInput
    service?: ServiceUpdateOneWithoutCollaborateursNestedInput
    comptes?: ComptesUtilisateursUpdateOneWithoutCollaborateurNestedInput
    fonctionsChef?: FonctionUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateWithoutDemandesInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurNestedInput
    comptes?: ComptesUtilisateursUncheckedUpdateOneWithoutCollaborateurNestedInput
    fonctionsChef?: FonctionUncheckedUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUncheckedUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUncheckedUpdateManyWithoutChefNestedInput
  }

  export type BudgetUpsertWithoutDemandesInput = {
    update: XOR<BudgetUpdateWithoutDemandesInput, BudgetUncheckedUpdateWithoutDemandesInput>
    create: XOR<BudgetCreateWithoutDemandesInput, BudgetUncheckedCreateWithoutDemandesInput>
    where?: BudgetWhereInput
  }

  export type BudgetUpdateToOneWithWhereWithoutDemandesInput = {
    where?: BudgetWhereInput
    data: XOR<BudgetUpdateWithoutDemandesInput, BudgetUncheckedUpdateWithoutDemandesInput>
  }

  export type BudgetUpdateWithoutDemandesInput = {
    codeBudgetaire?: StringFieldUpdateOperationsInput | string
    montantDisponible?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    service?: ServiceUpdateOneWithoutBudgetsNestedInput
  }

  export type BudgetUncheckedUpdateWithoutDemandesInput = {
    id?: IntFieldUpdateOperationsInput | number
    codeBudgetaire?: StringFieldUpdateOperationsInput | string
    montantDisponible?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    serviceId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FournisseurUpsertWithoutDemandesInput = {
    update: XOR<FournisseurUpdateWithoutDemandesInput, FournisseurUncheckedUpdateWithoutDemandesInput>
    create: XOR<FournisseurCreateWithoutDemandesInput, FournisseurUncheckedCreateWithoutDemandesInput>
    where?: FournisseurWhereInput
  }

  export type FournisseurUpdateToOneWithWhereWithoutDemandesInput = {
    where?: FournisseurWhereInput
    data: XOR<FournisseurUpdateWithoutDemandesInput, FournisseurUncheckedUpdateWithoutDemandesInput>
  }

  export type FournisseurUpdateWithoutDemandesInput = {
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    nomCheque?: NullableStringFieldUpdateOperationsInput | string | null
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FournisseurUncheckedUpdateWithoutDemandesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    nomCheque?: NullableStringFieldUpdateOperationsInput | string | null
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HistoriqueValidationUpsertWithWhereUniqueWithoutDemandeurInput = {
    where: HistoriqueValidationWhereUniqueInput
    update: XOR<HistoriqueValidationUpdateWithoutDemandeurInput, HistoriqueValidationUncheckedUpdateWithoutDemandeurInput>
    create: XOR<HistoriqueValidationCreateWithoutDemandeurInput, HistoriqueValidationUncheckedCreateWithoutDemandeurInput>
  }

  export type HistoriqueValidationUpdateWithWhereUniqueWithoutDemandeurInput = {
    where: HistoriqueValidationWhereUniqueInput
    data: XOR<HistoriqueValidationUpdateWithoutDemandeurInput, HistoriqueValidationUncheckedUpdateWithoutDemandeurInput>
  }

  export type HistoriqueValidationUpdateManyWithWhereWithoutDemandeurInput = {
    where: HistoriqueValidationScalarWhereInput
    data: XOR<HistoriqueValidationUpdateManyMutationInput, HistoriqueValidationUncheckedUpdateManyWithoutDemandeurInput>
  }

  export type DemandeurCreateWithoutHistoriqueInput = {
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
    auteur?: CollaborateurCreateNestedOneWithoutDemandesInput
    budget?: BudgetCreateNestedOneWithoutDemandesInput
    fournisseur?: FournisseurCreateNestedOneWithoutDemandesInput
  }

  export type DemandeurUncheckedCreateWithoutHistoriqueInput = {
    id?: number
    auteurMatricule?: string | null
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    fournisseurID?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    budgetID?: number | null
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
  }

  export type DemandeurCreateOrConnectWithoutHistoriqueInput = {
    where: DemandeurWhereUniqueInput
    create: XOR<DemandeurCreateWithoutHistoriqueInput, DemandeurUncheckedCreateWithoutHistoriqueInput>
  }

  export type CollaborateurCreateWithoutHistoriqueValideInput = {
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesCreateNestedManyWithoutCollaborateurInput
    fonction?: FonctionCreateNestedOneWithoutCollaborateursInput
    service?: ServiceCreateNestedOneWithoutCollaborateursInput
    comptes?: ComptesUtilisateursCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionCreateNestedManyWithoutChefInput
    servicesChef?: ServiceCreateNestedManyWithoutChefInput
  }

  export type CollaborateurUncheckedCreateWithoutHistoriqueValideInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
    collaborateurRoles?: CollaborateurRolesUncheckedCreateNestedManyWithoutCollaborateurInput
    comptes?: ComptesUtilisateursUncheckedCreateNestedOneWithoutCollaborateurInput
    demandes?: DemandeurUncheckedCreateNestedManyWithoutAuteurInput
    fonctionsChef?: FonctionUncheckedCreateNestedManyWithoutChefInput
    servicesChef?: ServiceUncheckedCreateNestedManyWithoutChefInput
  }

  export type CollaborateurCreateOrConnectWithoutHistoriqueValideInput = {
    where: CollaborateurWhereUniqueInput
    create: XOR<CollaborateurCreateWithoutHistoriqueValideInput, CollaborateurUncheckedCreateWithoutHistoriqueValideInput>
  }

  export type DemandeurUpsertWithoutHistoriqueInput = {
    update: XOR<DemandeurUpdateWithoutHistoriqueInput, DemandeurUncheckedUpdateWithoutHistoriqueInput>
    create: XOR<DemandeurCreateWithoutHistoriqueInput, DemandeurUncheckedCreateWithoutHistoriqueInput>
    where?: DemandeurWhereInput
  }

  export type DemandeurUpdateToOneWithWhereWithoutHistoriqueInput = {
    where?: DemandeurWhereInput
    data: XOR<DemandeurUpdateWithoutHistoriqueInput, DemandeurUncheckedUpdateWithoutHistoriqueInput>
  }

  export type DemandeurUpdateWithoutHistoriqueInput = {
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    auteur?: CollaborateurUpdateOneWithoutDemandesNestedInput
    budget?: BudgetUpdateOneWithoutDemandesNestedInput
    fournisseur?: FournisseurUpdateOneWithoutDemandesNestedInput
  }

  export type DemandeurUncheckedUpdateWithoutHistoriqueInput = {
    id?: IntFieldUpdateOperationsInput | number
    auteurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    fournisseurID?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    budgetID?: NullableIntFieldUpdateOperationsInput | number | null
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CollaborateurUpsertWithoutHistoriqueValideInput = {
    update: XOR<CollaborateurUpdateWithoutHistoriqueValideInput, CollaborateurUncheckedUpdateWithoutHistoriqueValideInput>
    create: XOR<CollaborateurCreateWithoutHistoriqueValideInput, CollaborateurUncheckedCreateWithoutHistoriqueValideInput>
    where?: CollaborateurWhereInput
  }

  export type CollaborateurUpdateToOneWithWhereWithoutHistoriqueValideInput = {
    where?: CollaborateurWhereInput
    data: XOR<CollaborateurUpdateWithoutHistoriqueValideInput, CollaborateurUncheckedUpdateWithoutHistoriqueValideInput>
  }

  export type CollaborateurUpdateWithoutHistoriqueValideInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUpdateManyWithoutCollaborateurNestedInput
    fonction?: FonctionUpdateOneWithoutCollaborateursNestedInput
    service?: ServiceUpdateOneWithoutCollaborateursNestedInput
    comptes?: ComptesUtilisateursUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUpdateManyWithoutChefNestedInput
    servicesChef?: ServiceUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateWithoutHistoriqueValideInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurNestedInput
    comptes?: ComptesUtilisateursUncheckedUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUncheckedUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUncheckedUpdateManyWithoutChefNestedInput
    servicesChef?: ServiceUncheckedUpdateManyWithoutChefNestedInput
  }

  export type BudgetCreateManyServiceInput = {
    id?: number
    codeBudgetaire: string
    montantDisponible?: Decimal | DecimalJsLike | number | string
  }

  export type CollaborateurCreateManyServiceInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    fonctionAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
  }

  export type FonctionCreateManyServiceInput = {
    id?: number
    nomFonction: string
    abreviation?: string | null
    chefMatricule?: string | null
  }

  export type BudgetUpdateWithoutServiceInput = {
    codeBudgetaire?: StringFieldUpdateOperationsInput | string
    montantDisponible?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    demandes?: DemandeurUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    codeBudgetaire?: StringFieldUpdateOperationsInput | string
    montantDisponible?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    demandes?: DemandeurUncheckedUpdateManyWithoutBudgetNestedInput
  }

  export type BudgetUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    codeBudgetaire?: StringFieldUpdateOperationsInput | string
    montantDisponible?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type CollaborateurUpdateWithoutServiceInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUpdateManyWithoutCollaborateurNestedInput
    fonction?: FonctionUpdateOneWithoutCollaborateursNestedInput
    comptes?: ComptesUtilisateursUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurNestedInput
    comptes?: ComptesUtilisateursUncheckedUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUncheckedUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUncheckedUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUncheckedUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUncheckedUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    fonctionAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FonctionUpdateWithoutServiceInput = {
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurs?: CollaborateurUpdateManyWithoutFonctionNestedInput
    chef?: CollaborateurUpdateOneWithoutFonctionsChefNestedInput
  }

  export type FonctionUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    chefMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurs?: CollaborateurUncheckedUpdateManyWithoutFonctionNestedInput
  }

  export type FonctionUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    chefMatricule?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DemandeurCreateManyFournisseurInput = {
    id?: number
    auteurMatricule?: string | null
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    budgetID?: number | null
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
  }

  export type DemandeurUpdateWithoutFournisseurInput = {
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    auteur?: CollaborateurUpdateOneWithoutDemandesNestedInput
    budget?: BudgetUpdateOneWithoutDemandesNestedInput
    historique?: HistoriqueValidationUpdateManyWithoutDemandeurNestedInput
  }

  export type DemandeurUncheckedUpdateWithoutFournisseurInput = {
    id?: IntFieldUpdateOperationsInput | number
    auteurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    budgetID?: NullableIntFieldUpdateOperationsInput | number | null
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    historique?: HistoriqueValidationUncheckedUpdateManyWithoutDemandeurNestedInput
  }

  export type DemandeurUncheckedUpdateManyWithoutFournisseurInput = {
    id?: IntFieldUpdateOperationsInput | number
    auteurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    budgetID?: NullableIntFieldUpdateOperationsInput | number | null
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CollaborateurCreateManyFonctionInput = {
    id?: number
    matricule: string
    nom?: string | null
    prenom?: string | null
    prenomUsuelle?: string | null
    civilite?: $Enums.Civilite | null
    serviceAbbrev?: string | null
    telephone?: string | null
    mailPro?: string | null
    photo?: string | null
  }

  export type CollaborateurUpdateWithoutFonctionInput = {
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUpdateManyWithoutCollaborateurNestedInput
    service?: ServiceUpdateOneWithoutCollaborateursNestedInput
    comptes?: ComptesUtilisateursUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateWithoutFonctionInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurRoles?: CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurNestedInput
    comptes?: ComptesUtilisateursUncheckedUpdateOneWithoutCollaborateurNestedInput
    demandes?: DemandeurUncheckedUpdateManyWithoutAuteurNestedInput
    fonctionsChef?: FonctionUncheckedUpdateManyWithoutChefNestedInput
    historiqueValide?: HistoriqueValidationUncheckedUpdateManyWithoutValideurNestedInput
    servicesChef?: ServiceUncheckedUpdateManyWithoutChefNestedInput
  }

  export type CollaborateurUncheckedUpdateManyWithoutFonctionInput = {
    id?: IntFieldUpdateOperationsInput | number
    matricule?: StringFieldUpdateOperationsInput | string
    nom?: NullableStringFieldUpdateOperationsInput | string | null
    prenom?: NullableStringFieldUpdateOperationsInput | string | null
    prenomUsuelle?: NullableStringFieldUpdateOperationsInput | string | null
    civilite?: NullableEnumCiviliteFieldUpdateOperationsInput | $Enums.Civilite | null
    serviceAbbrev?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    mailPro?: NullableStringFieldUpdateOperationsInput | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CollaborateurRolesCreateManyCollaborateurInput = {
    roleID: number
  }

  export type DemandeurCreateManyAuteurInput = {
    id?: number
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    fournisseurID?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    budgetID?: number | null
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
  }

  export type FonctionCreateManyChefInput = {
    id?: number
    nomFonction: string
    abreviation?: string | null
    serviceId?: number | null
  }

  export type HistoriqueValidationCreateManyValideurInput = {
    id?: number
    demandeurID: number
    etape: number
    statut: $Enums.StatutValidation
    motifRefus?: string | null
    dateValidation?: Date | string
    id_navette?: number | null
    reference_navette?: string | null
  }

  export type ServiceCreateManyChefInput = {
    id?: number
    nomService: string
    abreviation?: string | null
  }

  export type CollaborateurRolesUpdateWithoutCollaborateurInput = {
    role?: RolesUpdateOneRequiredWithoutCollaborateurRolesNestedInput
  }

  export type CollaborateurRolesUncheckedUpdateWithoutCollaborateurInput = {
    roleID?: IntFieldUpdateOperationsInput | number
  }

  export type CollaborateurRolesUncheckedUpdateManyWithoutCollaborateurInput = {
    roleID?: IntFieldUpdateOperationsInput | number
  }

  export type DemandeurUpdateWithoutAuteurInput = {
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: BudgetUpdateOneWithoutDemandesNestedInput
    fournisseur?: FournisseurUpdateOneWithoutDemandesNestedInput
    historique?: HistoriqueValidationUpdateManyWithoutDemandeurNestedInput
  }

  export type DemandeurUncheckedUpdateWithoutAuteurInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    fournisseurID?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    budgetID?: NullableIntFieldUpdateOperationsInput | number | null
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    historique?: HistoriqueValidationUncheckedUpdateManyWithoutDemandeurNestedInput
  }

  export type DemandeurUncheckedUpdateManyWithoutAuteurInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    fournisseurID?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    budgetID?: NullableIntFieldUpdateOperationsInput | number | null
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FonctionUpdateWithoutChefInput = {
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    collaborateurs?: CollaborateurUpdateManyWithoutFonctionNestedInput
    service?: ServiceUpdateOneWithoutFonctionsNestedInput
  }

  export type FonctionUncheckedUpdateWithoutChefInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: NullableIntFieldUpdateOperationsInput | number | null
    collaborateurs?: CollaborateurUncheckedUpdateManyWithoutFonctionNestedInput
  }

  export type FonctionUncheckedUpdateManyWithoutChefInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomFonction?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HistoriqueValidationUpdateWithoutValideurInput = {
    etape?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
    demandeur?: DemandeurUpdateOneRequiredWithoutHistoriqueNestedInput
  }

  export type HistoriqueValidationUncheckedUpdateWithoutValideurInput = {
    id?: IntFieldUpdateOperationsInput | number
    demandeurID?: IntFieldUpdateOperationsInput | number
    etape?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HistoriqueValidationUncheckedUpdateManyWithoutValideurInput = {
    id?: IntFieldUpdateOperationsInput | number
    demandeurID?: IntFieldUpdateOperationsInput | number
    etape?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceUpdateWithoutChefInput = {
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    budgets?: BudgetUpdateManyWithoutServiceNestedInput
    collaborateurs?: CollaborateurUpdateManyWithoutServiceNestedInput
    fonctions?: FonctionUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutChefInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
    budgets?: BudgetUncheckedUpdateManyWithoutServiceNestedInput
    collaborateurs?: CollaborateurUncheckedUpdateManyWithoutServiceNestedInput
    fonctions?: FonctionUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutChefInput = {
    id?: IntFieldUpdateOperationsInput | number
    nomService?: StringFieldUpdateOperationsInput | string
    abreviation?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CollaborateurRolesCreateManyRoleInput = {
    matricule: string
  }

  export type CollaborateurRolesUpdateWithoutRoleInput = {
    collaborateur?: CollaborateurUpdateOneRequiredWithoutCollaborateurRolesNestedInput
  }

  export type CollaborateurRolesUncheckedUpdateWithoutRoleInput = {
    matricule?: StringFieldUpdateOperationsInput | string
  }

  export type CollaborateurRolesUncheckedUpdateManyWithoutRoleInput = {
    matricule?: StringFieldUpdateOperationsInput | string
  }

  export type DemandeurCreateManyBudgetInput = {
    id?: number
    auteurMatricule?: string | null
    type: $Enums.TypeNavette
    etapeActuelle?: number
    numero?: number | null
    objet?: string | null
    description?: string | null
    motif?: string | null
    quantite?: number | null
    fournisseurID?: number | null
    pu?: Decimal | DecimalJsLike | number | string | null
    montant?: Decimal | DecimalJsLike | number | string | null
    devis?: string | null
    pieceJointe?: string | null
    justificationChoix?: string | null
    imputationComptable?: string | null
    activite?: string | null
    codeTIGER?: string | null
    modePaiement?: string | null
    paiementDetail?: string | null
    numeroBonCommande?: string | null
    dateLivraison?: Date | string | null
    versQui?: string | null
    statut?: $Enums.StatutDemande
    dateDepot?: Date | string
    dateFinalisation?: Date | string | null
    isAPGenere?: boolean
    isBCGenere?: boolean
    isAPExporte?: boolean
    reference?: string | null
  }

  export type DemandeurUpdateWithoutBudgetInput = {
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    auteur?: CollaborateurUpdateOneWithoutDemandesNestedInput
    fournisseur?: FournisseurUpdateOneWithoutDemandesNestedInput
    historique?: HistoriqueValidationUpdateManyWithoutDemandeurNestedInput
  }

  export type DemandeurUncheckedUpdateWithoutBudgetInput = {
    id?: IntFieldUpdateOperationsInput | number
    auteurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    fournisseurID?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    historique?: HistoriqueValidationUncheckedUpdateManyWithoutDemandeurNestedInput
  }

  export type DemandeurUncheckedUpdateManyWithoutBudgetInput = {
    id?: IntFieldUpdateOperationsInput | number
    auteurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeNavetteFieldUpdateOperationsInput | $Enums.TypeNavette
    etapeActuelle?: IntFieldUpdateOperationsInput | number
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    objet?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    motif?: NullableStringFieldUpdateOperationsInput | string | null
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    fournisseurID?: NullableIntFieldUpdateOperationsInput | number | null
    pu?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    montant?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devis?: NullableStringFieldUpdateOperationsInput | string | null
    pieceJointe?: NullableStringFieldUpdateOperationsInput | string | null
    justificationChoix?: NullableStringFieldUpdateOperationsInput | string | null
    imputationComptable?: NullableStringFieldUpdateOperationsInput | string | null
    activite?: NullableStringFieldUpdateOperationsInput | string | null
    codeTIGER?: NullableStringFieldUpdateOperationsInput | string | null
    modePaiement?: NullableStringFieldUpdateOperationsInput | string | null
    paiementDetail?: NullableStringFieldUpdateOperationsInput | string | null
    numeroBonCommande?: NullableStringFieldUpdateOperationsInput | string | null
    dateLivraison?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versQui?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutDemandeFieldUpdateOperationsInput | $Enums.StatutDemande
    dateDepot?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFinalisation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAPGenere?: BoolFieldUpdateOperationsInput | boolean
    isBCGenere?: BoolFieldUpdateOperationsInput | boolean
    isAPExporte?: BoolFieldUpdateOperationsInput | boolean
    reference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HistoriqueValidationCreateManyDemandeurInput = {
    id?: number
    etape: number
    valideurMatricule?: string | null
    statut: $Enums.StatutValidation
    motifRefus?: string | null
    dateValidation?: Date | string
    id_navette?: number | null
    reference_navette?: string | null
  }

  export type HistoriqueValidationUpdateWithoutDemandeurInput = {
    etape?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
    valideur?: CollaborateurUpdateOneWithoutHistoriqueValideNestedInput
  }

  export type HistoriqueValidationUncheckedUpdateWithoutDemandeurInput = {
    id?: IntFieldUpdateOperationsInput | number
    etape?: IntFieldUpdateOperationsInput | number
    valideurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HistoriqueValidationUncheckedUpdateManyWithoutDemandeurInput = {
    id?: IntFieldUpdateOperationsInput | number
    etape?: IntFieldUpdateOperationsInput | number
    valideurMatricule?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutValidationFieldUpdateOperationsInput | $Enums.StatutValidation
    motifRefus?: NullableStringFieldUpdateOperationsInput | string | null
    dateValidation?: DateTimeFieldUpdateOperationsInput | Date | string
    id_navette?: NullableIntFieldUpdateOperationsInput | number | null
    reference_navette?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}