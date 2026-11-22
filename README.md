# AsianScore Live Widget

Zero-dependency Shadow DOM Web Component (`<asianscore-widget>`) for embedding real-time Football & NBA live scores, Dixon-Coles xG win probabilities, and verifiable SHA-256 prediction ledger metrics from [AsianScore](https://asianscore.com/).

- **Live Demo (GitHub Pages):** https://aiyixiu.github.io/asianscore-live-widget/
- **Open JSON API (No key, CORS enabled):** `https://asianscore.com/api/widget/summary`
- **Live Scoreboard:** https://asianscore.com/live.html
- **SHA-256 Verifiable AI Prediction Ledger:** https://asianscore.com/ai.html
- **Sports Quantitative Tools (Devig, Kelly, Poisson):** https://asianscore.com/tools.html

## Quick Start

```html
<script src="https://aiyixiu.github.io/asianscore-live-widget/asianscore-widget.js" defer></script>
<asianscore-widget theme="light" limit="6"></asianscore-widget>
```

## Attributes

| Attribute | Default | Description |
| --- | --- | --- |
| `theme` | `light` | `light` or `dark` |
| `limit` | `6` | Maximum fixtures displayed (`1`–`20`) |
| `api` | `https://asianscore.com/api/widget/summary` | JSON summary endpoint |

## Related Open-Source Repositories

- [asianscore-xg-ledger-dataset](https://github.com/AIYIXIU/asianscore-xg-ledger-dataset) — CC BY 4.0 historical & daily settled xG prediction ledger (CSV / JSONL)
- [asianscore-quant-sdk](https://github.com/AIYIXIU/asianscore-quant-sdk) — Zero-dependency Python & TypeScript sports quantitative toolkit

## License

MIT
