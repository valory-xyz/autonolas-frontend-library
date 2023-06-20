import React from 'react';
import { SimpleMarkdown } from './SimpleMarkdown';

export default {
  title: 'Simple Markdown',
};

const exampleMd = `

# What are cookies?
## What are cookies?
### What are cookies?

A cookie is a small file of letters and numbers that we may store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer's hard drive. 

## What types of cookies do we use?

* Strictly necessary cookies. These are cookies that are required for the operation of our Websites. They include, for example, cookies that enable you to log into secure areas of our Websites, use a shopping cart, or make use of e-commerce payment processing services.
  * One
  * Two
* Analytical/performance cookies. They allow us to recognize and count the number of visitors and to see how visitors move around our Websites when they are using it. This may help us improve how our Websites work, for example, by ensuring that users find what they are looking for easily.

<ul>
  <li>1. First Item</li>
  <li>2. Second Item
    <ul>
    <li>2.1 Second Item Sub Item 1 </li>
    <li>2.2 Second Item Sub Item 2</li>
    <li>2.3 Second Item Sub Item 3</li>
    </ul>
  </li>
  <li>3 Third Item </li>
</ul>

## Add HTML

<table>
  <thead>
    <tr>
    <th><strong>One</strong></th>
    <th><strong>Two</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cookie name 1</td>
      <td>Description 1</td>
    </tr>
    <tr>
      <td>Cookie name 2</td>
      <td>Description 2</td>
    </tr>
    <tr>
      <td colspan="2">Cookie name</td>
    </tr>
  </tbody>
<table>

<br />
<li>Set when a user first lands on a page.

`;

export const Default = () => <SimpleMarkdown title='Disclaimer' content={exampleMd} />;
