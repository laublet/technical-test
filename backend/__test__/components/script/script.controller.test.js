jest.mock('../../../__mocks__/runScript.js');

import launchScript from '@/components/script/script.controller';

describe('The script controller', () => {
  it('should return something', () => {
    // expect.assertions(1);
    expect(runScript).to
    launchScript().then(data => expect(data).toEqual('test'))
  });
});
