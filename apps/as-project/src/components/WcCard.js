export class WcCard extends HTMLElement {
  constructor() {
    super();

    // 创建 Shadow DOM
    this.attachShadow({ mode: 'open' });
    this.user = { name: 'Alice', age: 25 };
    // 默认属性
    this._title = '';
    this._icon = '';
  }

  // 属性变化观察器
  static get observedAttributes() {
    return ['title', 'icon'];
  }

  // 属性变化时调用
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      this._title = newValue;
    } else if (name === 'icon') {
      this._icon = newValue;
    }
    this.render();
  }

  // 连接 DOM 时调用
  connectedCallback() {
    this.render();
  }

  // 渲染方法
  render() {
    // 使用 CSS 变量实现样式定制
    const styles = `
          :host {
            display: block;
            margin-bottom: 20px;
            font-family: inherit;
            --card-border-color: #ddd;
            --card-header-bg: #f8f8f8;
            --card-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .card {
            border: 1px solid var(--card-border-color);
            border-radius: 4px;
            box-shadow: var(--card-shadow);
            overflow: hidden;
          }
          
          .card-header {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            background-color: var(--card-header-bg);
            border-bottom: 1px solid var(--card-border-color);
          }
          
          .card-title {
            margin: 0;
            font-size: 1.1em;
            font-weight: bold;
            flex-grow: 1;
          }
          
          .card-icon {
            margin-right: 8px;
          }
          
          .card-body {
            padding: 16px;
          }
        `;

    // 构建模板
    const template = document.createElement('template');
    template.innerHTML = `
          <style>${styles}</style>
          <div class="card">
            <div class="card-header">
              ${this._icon ? `<span class="card-icon">${this._icon}</span>` : ''}
              <h3 class="card-title">${this._title}</h3>
            </div>
            <div class="card-body">
              <slot .slotProps=${this.user}></slot>
            </div>
            <div class="card-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        `;

    // 渲染到 Shadow DOM
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export class WcFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              padding: 8px 16px;
              text-align: center;
              font-size: 0.8em;
              color: #666;
              border-top: 1px solid #eee;
            }
          </style>
          <slot></slot>
          <div>© 2023 My Company</div>
        `;
  }
}