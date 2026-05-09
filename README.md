# Gezira Hila Impex — Website

Multi-page marketing website for **Gezira Hila Impex Co. Ltd**, one of the world's leading suppliers of Gum Arabic and natural commodities, exporting from Sudan since 1997.

## Stack

Static HTML / CSS / JavaScript — no build step required. Hosts on any static file server.

- Vanilla HTML5 + CSS3 (custom design system)
- Vanilla JS (IntersectionObserver scroll reveals, counters, lightbox, custom cursor)
- Google Fonts: Cormorant Garamond + Inter

## Pages

| Page              | File                  |
| ----------------- | --------------------- |
| Home              | `index.html`          |
| About             | `about.html`          |
| Products          | `products.html`       |
| Gum Arabic        | `gum-arabic.html`     |
| Gallery           | `gallery.html`        |
| Contact           | `contact.html`        |

## Local development

Any static file server works. With Python 3:

```bash
python -m http.server 5173
```

Then open <http://localhost:5173>.

## Project structure

```
GHI/
├── index.html              # Home
├── about.html              # About / founder / timeline / policy
├── products.html           # All commodities
├── gum-arabic.html         # Featured product detail
├── gallery.html            # Filterable photo gallery
├── contact.html            # Form + team contacts
├── Gallery/                # Original Gum Arabic operation photos (16)
├── assets/
│   ├── css/
│   │   ├── main.css        # Design system + components
│   │   └── pages.css       # Page-specific sections
│   ├── js/
│   │   └── main.js         # All interactions
│   └── img/
│       ├── logo-*.png
│       ├── founder.png
│       ├── showcase.mp4
│       ├── logistics-showcase.mp4
│       ├── products/       # Product photography
│       ├── logistics/      # Cargo / port / containers
│       ├── uses/           # Industry application photos
│       └── heritage/       # Sudanese heritage / acacia / farmers
└── .claude/
    └── launch.json         # Local Claude preview config (ignored)
```

## Image attribution

Photographs sourced from [Pexels](https://www.pexels.com) under the [Pexels License](https://www.pexels.com/license/) (free for commercial use, no attribution required). Authentic operation and workforce photos belong to Gezira Hila Impex.

## Contact

- **Web** — <https://www.gezira.group>
- **Email** — <Info@gezira.group>
- **HQ** — Khartoum, Sudan
- **Regional office** — Dubai, UAE
