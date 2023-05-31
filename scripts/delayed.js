// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

const PROD_SITE = 'https://investors.epam.com/';

document.querySelectorAll('a').forEach((a) => {
    if (a.href.indexOf(PROD_SITE) === 0) {
        a.href = a.href.replace(PROD_SITE, '/');
    }
});

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here