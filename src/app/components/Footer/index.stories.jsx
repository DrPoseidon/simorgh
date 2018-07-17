import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Footer from './index';

const link = name => ({
  href: 'https://www.bbc.co.uk/news',
  text: `Link ${name}`,
});

const list = [link(1), link(2), link(3), link(4), link(5), link(6), link(7)];

storiesOf('Footer', module).add('default', () => (
  <Footer list={list} text="Text here. " link={link('last')} />
));
