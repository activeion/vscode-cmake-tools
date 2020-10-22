import { ConfigureTrigger, ConfigureType } from '@cmt/cmake-tools';
import {expect} from 'chai';

import {smokeSuite, smokeTestDefaultKit} from '../smoke';

smokeSuite('bad-project', suite => {
  suite.smokeTest('fails to build', async test => {
    return test.withCMakeTools({
      kit: await smokeTestDefaultKit(),
      async run(cmt) {
        expect( (await cmt.getCMakeExecutable()).isFileApiModeSupported).to.be.equal(true);
        const retc = await cmt.configure([], ConfigureType.Normal, ConfigureTrigger.runTests);
        // Test will fail because of a bad command:
        expect(retc, 'Configure should have failed').to.eq(1);
      }
    });
  });
});
