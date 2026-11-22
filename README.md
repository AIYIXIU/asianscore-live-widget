# AsianScore Live Widget (`asianscore-widget`)

Zero-dependency Shadow DOM Web Component (`<asianscore-widget>`) for embedding real-time Football & NBA live scores, Dixon-Coles xG win probabilities, and verifiable SHA-256 prediction ledger metrics from [AsianScore](https://asianscore.com/).

- **Live Demo (GitHub Pages):** https://aiyixiu.github.io/asianscore-live-widget/
- **Open JSON API (No key, CORS enabled):** `https://asianscore.com/api/widget/summary`
- **Live Scoreboard:** https://asianscore.com/scores.html
- **SHA-256 Verifiable AI Prediction Ledger:** https://asianscore.com/models.html#ledger
- **Sports Quantitative Tools (Devig, Kelly, Poisson):** https://asianscore.com/tools.html

## Installation

### npm

```bash
npm install asianscore-widget
```

Import in your bundler or ES module entry:

```js
import 'asianscore-widget';
```

### jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/asianscore-widget@1.0.0/asianscore-widget.js" defer></script>
<asianscore-widget theme="light" limit="6"></asianscore-widget>
```

### GitHub Pages CDN

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

## Open Platform & Ecosystem

- **Official Platform:** https://asianscore.com/
- **Zenodo Academic Dataset (CERN DOI):** https://doi.org/10.5281/zenodo.24441036
- **PyPI Python SDK (`asianscore-quant`):** https://pypi.org/project/asianscore-quant/
- **Hugging Face Dataset:** https://huggingface.co/datasets/asianscore/football-nba-xg-prediction-ledger
- **Official Go SDK (`pkg.go.dev`):** https://pkg.go.dev/github.com/AIYIXIU/asianscore-go
- **GitHub Dataset Mirror:** https://github.com/AIYIXIU/asianscore-xg-ledger-dataset
- **GitHub Python Quant SDK:** https://github.com/AIYIXIU/asianscore-quant-sdk

## License

MIT
