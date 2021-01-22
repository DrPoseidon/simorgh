import getTextContent from '../utils/getTextContent';

export default () => {
  describe('Timestamp', () => {
    const timestampEl = document.querySelector('time');
    const date = timestampEl.getAttribute('datetime');
    const text = getTextContent(timestampEl);

    it('should be in the document', () => {
      expect(timestampEl).toBeInTheDocument();
    });

    it('should contain text', () => {
      expect(text).toBeTruthy();
    });

    it('should match text and date', () => {
      expect({ text, date }).toMatchSnapshot();
    });
  });
};
