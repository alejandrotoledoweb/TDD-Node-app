import { translate } from './input';

describe('Input Test', () => {
  it('translates d to half a dev day', () => {
    expect(translate('d')).toEqual({ Dev: 0.5, QA: 0 });
  });

  it('translates D to one dev day', () => {
    expect(translate('D')).toEqual({ Dev: 1.0, QA: 0 });
  });

  it('translates dD to 1.5 dev days', () => {
    expect(translate('dD')).toEqual({ Dev: 1.5, QA: 0 });
  });

  it('translate q to 0.5 QA day', () => {
    expect(translate('q')).toEqual({ Dev: 0, QA: 0.5 });
  });
});
