export default function decorate(block) {
  if (block.children[1]) {
    block.children[1].classList.add('textblock');
    block.children[1].querySelectorAll('h3').forEach((h3) => {
        h3.classList.add('museo-sans-bold');
      });
    block.children[1].querySelectorAll('a').forEach((a) => {
        const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        svgElem.setAttribute('class', 'arrow');
        let useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/icons/sprite-redesign_9.svg#link-arrow');
        svgElem.appendChild(useElem);

        a.appendChild(svgElem);
      });

  }
}
