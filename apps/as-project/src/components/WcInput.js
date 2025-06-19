export class WcInput extends HTMLElement {
  static get observedAttributes() {
    return ['data-model'];
  }

  constructor() {
    super();
    this.model = '';
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render(); // 初始渲染
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-model' && newValue !== oldValue) {
      try {
        this.model = newValue;
        this.render();
      } catch (error) {
        console.error('解析 data-list 失败:', error);
      }
    }
  }

  render() {
    const style = document.createElement('style');
    style.textContent = `
      .task-list { display: flex; flex-direction: column; gap: 8px; }
      .task-item { display: flex; align-items: center; gap: 8px; }
      .task-input { padding: 8px; margin-bottom: 8px; border: 1px solid #ccc; border-radius: 4px; }
    `;

    const container = document.createElement('div');
    container.classList.add('task-list');

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('task-item');

    const input = document.createElement('input');
    input.classList.add('task-input');
    input.type = 'text';
    input.value = this.model;
    input.addEventListener('change', (event) => {
      this.model = event.target.value;
      this.dispatchEvent(new CustomEvent('change', {
        detail: {value: this.model},
        bubbles: true,
      }));
    });

    itemContainer.appendChild(input);
    container.appendChild(itemContainer);

    this.shadow.innerHTML = '';
    this.shadow.appendChild(style);
    this.shadow.appendChild(container);
  }
}