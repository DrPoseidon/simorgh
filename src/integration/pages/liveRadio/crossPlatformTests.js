import getTextContent from '../../utils/getTextContent';
import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runMediaPlayerEmbedTests();

  describe('Summary', () => {
    const summaryEl = document.querySelector('main p');
    const summaryText = getTextContent(summaryEl);

    it('should be in the document', () => {
      expect(summaryEl).toBeInTheDocument();
    });

    it('should contain text', () => {
      expect(summaryText).toBeTruthy();
    });

    it('should match text', () => {
      expect(summaryText).toMatchSnapshot();
    });
  });
};
