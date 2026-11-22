/**
 * <asianscore-widget> — Zero-dependency Shadow DOM live scores & AI probability widget
 * Data source: https://asianscore.com/api/widget/summary (open CORS JSON, no API key required)
 * License: MIT | Homepage: https://asianscore.com/tools.html
 */
class AsianScoreWidget extends HTMLElement {
  static get observedAttributes() {
    return ['theme', 'limit', 'api'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._timer = null;
  }

  connectedCallback() {
    this.renderLoading();
    this.load();
    this._timer = setInterval(() => this.load(), 30000);
  }

  disconnectedCallback() {
    if (this._timer) clearInterval(this._timer);
  }

  attributeChangedCallback() {
    if (this.isConnected) this.load();
  }

  get apiUrl() {
    return this.getAttribute('api') || 'https://asianscore.com/api/widget/summary';
  }

  get limit() {
    const n = parseInt(this.getAttribute('limit') || '6', 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, 20) : 6;
  }

  get isDark() {
    return (this.getAttribute('theme') || 'light') === 'dark';
  }

  renderLoading() {
    this.shadowRoot.innerHTML = `<style>${this.styles()}</style><div class="card"><div class="head"><span class="brand">AsianScore Live</span><span class="meta">Loading…</span></div></div>`;
  }

  styles() {
    const dark = this.isDark;
    const bg = dark ? '#141518' : '#ffffff';
    const card = dark ? '#1c1d21' : '#f8f9fa';
    const line = dark ? 'rgba(255,255,255,0.09)' : 'rgba(17,24,39,0.09)';
    const ink = dark ? '#f3f4f6' : '#111827';
    const muted = dark ? '#9ca3af' : '#6b7280';
    return `
      :host { display: block; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .card { background: ${bg}; color: ${ink}; border: 1px solid ${line}; border-radius: 12px; overflow: hidden; }
      .head { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid ${line}; gap: 12px; flex-wrap: wrap; }
      .brand { font-weight: 600; font-size: 14px; letter-spacing: -0.01em; color: ${ink}; text-decoration: none; }
      .meta { font-size: 12px; color: ${muted}; font-variant-numeric: tabular-nums; }
      .list { display: flex; flex-direction: column; }
      .row { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 11px 16px; border-bottom: 1px solid ${line}; text-decoration: none; color: inherit; transition: background 140ms ease; }
      .row:last-child { border-bottom: 0; }
      .row:hover { background: ${card}; }
      .left { min-width: 0; flex: 1; }
      .league { font-size: 11px; color: ${muted}; margin-bottom: 2px; }
      .teams { font-size: 13.5px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .right { text-align: right; flex-shrink: 0; }
      .prob { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 600; background: rgba(16,185,129,0.12); color: #059669; font-variant-numeric: tabular-nums; }
      .foot { display: flex; justify-content: space-between; align-items: center; padding: 9px 16px; border-top: 1px solid ${line}; background: ${card}; font-size: 11.5px; color: ${muted}; }
      .foot a { color: ${ink}; text-decoration: none; font-weight: 500; }
      .foot a:hover { text-decoration: underline; }
    `;
  }

  async load() {
    try {
      const res = await fetch(this.apiUrl);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const ledger = data.ledger || {};
      const matches = (data.matches || []).slice(0, this.limit);
      const rows = matches.map((m) => {
        const score = m.state === 'pre' ? (m.kickoff || '').slice(5, 16) : `${m.homeScore} - ${m.awayScore}`;
        const href = m.url || 'https://asianscore.com/live.html';
        return `<a class="row" href="${href}" target="_blank" rel="noopener">
          <div class="left">
            <div class="league">${m.league || ''} · ${score}</div>
            <div class="teams">${m.homeTeam || ''} vs ${m.awayTeam || ''}</div>
          </div>
          <div class="right">
            ${m.topLabel ? `<span class="prob">${m.topLabel} ${m.topProbPct || ''}%</span>` : ''}
          </div>
        </a>`;
      }).join('');
      this.shadowRoot.innerHTML = `<style>${this.styles()}</style>
        <div class="card">
          <div class="head">
            <a class="brand" href="https://asianscore.com/" target="_blank" rel="noopener">AsianScore Live &amp; xG</a>
            <span class="meta">${ledger.settled || 0} settled · Brier ${ledger.avgBrier || '—'} · Hit ${ledger.hitRatePct || '—'}%</span>
          </div>
          <div class="list">${rows || '<div class="row"><span class="meta">No active fixtures</span></div>'}</div>
          <div class="foot">
            <span>Verifiable SHA-256 Ledger (${ledger.totalLocked || 0} locked)</span>
            <a href="https://asianscore.com/ai.html" target="_blank" rel="noopener">Full Ledger →</a>
          </div>
        </div>`;
    } catch (e) {
      this.shadowRoot.innerHTML = `<style>${this.styles()}</style><div class="card"><div class="head"><a class="brand" href="https://asianscore.com/" target="_blank" rel="noopener">AsianScore Live</a><span class="meta">Feed offline</span></div></div>`;
    }
  }
}

if (!customElements.get('asianscore-widget')) {
  customElements.define('asianscore-widget', AsianScoreWidget);
}
