import ampMetadataExtractor from './ampMetadataExtractor';

const includeSupportingAmp =
  '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png';

describe('Amp Metadata Extractor', () => {
  beforeEach(() => {
    process.env.SIMORGH_INCLUDES_BASE_AMP_URL = 'https://news.files.bbci.co.uk';
  });

  afterEach(() => {
    delete process.env.SIMORGH_INCLUDES_BASE_AMP_URL;
  });
  it('should return a url with amp inserted between the url path and query parameters', () => {
    const actual = ampMetadataExtractor(includeSupportingAmp).src;
    expect(actual).toEqual(
      'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
    );
  });

  it('should return image src, width, height and iframe src metadata', () => {
    const actual = ampMetadataExtractor(includeSupportingAmp);
    const expected = {
      imageWidth: '640',
      imageHeight: '360',
      image:
        'https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
      src:
        'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
    };
    expect(actual).toEqual(expected);
  });
});
