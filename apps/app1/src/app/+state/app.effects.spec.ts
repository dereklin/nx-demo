import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { readAll, hot } from '@nrwl/nx/testing';
import { AppEffects } from './app.effects';
import { of } from 'rxjs/observable/of';

export const return1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 5000);
  });
};

describe('AppEffects', () => {
  let actions;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [AppEffects, DataPersistence, provideMockActions(() => actions)]
    });

    effects = TestBed.get(AppEffects);
  });

  describe('someEffect', () => {
    it("should support async execution of test preparation and expectations", async () => {
      expect(await return1()).toEqual(1);
    }, 10000);

    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(await readAll(effects.loadData)).toEqual([{ type: 'DATA_LOADED', payload: {} }]);
    }, 50000);

  });

});
