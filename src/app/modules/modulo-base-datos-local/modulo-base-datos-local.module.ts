import { NgModule } from '@angular/core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { IndiceCrear } from './data-base/estructuraIndices';
import { estructuraBD } from './data-base/estructuraBDLocal';

// Ahead of time compiles requires an exported function for factories
export function migrationFactory() {
    // The animal table was added with version 2 but none of the existing tables or data needed
    // to be modified so a migrator for that version is not included.

    let store;
    let arrayIndices;

    return {
      1: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(1);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      2: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(2);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      3: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(3);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      4: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(4);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      5: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(5);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      6: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(6);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      7: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(7);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      8: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(8);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      9: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(9);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      10: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(10);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      11: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(11);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      12: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(12);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      13: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(13);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      14: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(14);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      15: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(15);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      16: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(16);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      17: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(17);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      18: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(18);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      19: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(19);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      20: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(20);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      21: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(21);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      22: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(22);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      23: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(23);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      24: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(24);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      },
      25: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(25);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      }
    };
  }

const dbConfig: DBConfig  = {
    name: 'DBINVETSA',
    version: 4,
    objectStoresMeta: estructuraBD.BASE_DE_DATOS, migrationFactory
  };

@NgModule({
    declarations: [],
    imports: [ NgxIndexedDBModule.forRoot(dbConfig)
    ]
})
export class ModuloBaseDatosLocalModule {}