export default function decorate(block) {
  /* Moving h1 content to a span so that a gradient can be applied */
  const h1 = block.querySelector('h1');
  const content = h1.innerHTML;
  const span = document.createElement('span');
  span.innerHTML = content;
  h1.replaceChildren(span);
}
