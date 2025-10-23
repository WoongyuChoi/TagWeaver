# TagWeaver
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=fff&labelColor=grey&color=62d9fb)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/WoongyuChoi/FlexiView/blob/main/LICENSE)
![Platform](https://img.shields.io/badge/platform-web-blue)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/WoongyuChoi/TagWeaver)

<figure align="center">
    <img src="https://github.com/user-attachments/assets/abc77d95-fc4e-4369-a30e-f0016d8538bf" width="80%"/>
</figure>

> Proof‑of‑concept **rich‑text→HTML** editor workbench for offline/air‑gapped environments.  
> Compare multiple editors (Tiptap, React‑Quill, Toast UI), sanitize/preview HTML, and **Normalize & Sync** content across editors.

---

## Overview
**TagWeaver** is a React + TypeScript + Vite app that helps you experiment with **HTML‑producing editors** and the “round‑trip” flow you described:
- Edit content in a WYSIWYG editor
- Save **HTML** to DB (e.g., CLOB) / receive HTML from API
- Re‑inject the HTML back into an editor
- Optionally **normalize** editor‑specific markup (e.g., Quill table classes) into a **vanilla `<table>`**

The project is intentionally **offline‑friendly**: no external API keys, no CDNs.

### What’s included
- **Editor 1 — Tiptap** (basic formatting, lists, alignment; HTML out/in)
- **Editor 2 — Toast UI** (WYSIWYG; HTML out/in; optional Viewer for consistent preview)
- **Editor 3 — React‑Quill** (Quill v2; optional table handling)
- **Normalize & Sync** button (from Editor 3 → normalize HTML → push to Editor 1 & 2)
- **Sanitized Preview** using DOMPurify (configurable strictness)

---

## Key Features
- **Side‑by‑side playground**: three editors on the top row; Toast UI can also be rendered full‑width below.
- **Round‑trip HTML**: editors emit HTML strings that can be saved and later re‑applied.
- **Normalization**: convert Quill/“better‑table” flavored markup into a clean, vanilla table:
  ```html
  <table style="border-collapse:collapse; width:100%">
    <thead>
      <tr>
        <th style="border:1px solid #ccc; padding:4px">Item</th>
        <th style="border:1px solid #ccc; padding:4px">Owner</th>
        <th style="border:1px solid #ccc; padding:4px">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #ccc; padding:4px">Schema & Styles</td>
        <td style="border:1px solid #ccc; padding:4px">FE</td>
        <td style="border:1px solid #ccc; padding:4px">In progress</td>
      </tr>
    </tbody>
  </table>
  ```
- **Offline/air‑gapped**: no API keys; all dependencies are local NPM packages.

---

## Setup
1. **Install**
   ```bash
   npm install
   ```
2. **Run (dev)**
   ```bash
   npm run dev
   ```
3. **Build**
   ```bash
   npm run build
   ```
4. **Preview (static)**
   ```bash
   npm run preview
   ```

---

## Usage
1. Open the app (Vite dev server).  
2. Top‑right: **Generate Sample** → fills editors with sample HTML (tables, lists, etc.).  
3. Edit content in any editor and observe:
   - **HTML Output** panel: raw HTML string
   - **Preview** panel: either DOMPurify preview or **Toast Viewer** preview
4. Click **Normalize & Sync** (next to Generate Sample) to:
   - Take HTML from **Editor 3 (React‑Quill)** as the source
   - Normalize tables into vanilla `<table>`
   - Push the normalized HTML into **Editor 1 (Tiptap)** and **Editor 2 (Toast UI)**

### Example: “Run” output in the UI
- **Header**: `Normalize & Sync` | `Generate Sample`
- **Top grid (3 columns)**:  
  - *Editor (Tiptap)* → **HTML Output** → **Sanitized Preview**  
  - *Editor (Toast UI)* → **HTML Output** → **Preview (Toast Viewer)**  
  - *Editor (React‑Quill)* → **HTML Output** → **Sanitized Preview**
- **Bottom (full width, optional)**: *Editor (Toast UI)* as a large single column

---

## Configuration Notes
- **Sanitization**: `HtmlViewer.tsx` uses DOMPurify. If you want to display editor HTML “as is”, relax its config (allow `table/tr/td`, `style`, `class`, `rowspan/colspan`, and `data-*`).
- **Toast UI Viewer**: for consistent preview of Toast‑generated HTML, use `ToastViewer.tsx`.
- **Air‑gapped**: set any analytics flags to **off** (e.g., `usageStatistics: false`).

---

## Troubleshooting
- **Editor HTML keeps resetting**  
  Ensure the editor component is **controlled** properly or that initial content is injected **once** (do not call `setHTML` on every keystroke).
- **Tables not visible in Preview**  
  Loosen DOMPurify config or use **ToastViewer** for that panel.
- **Toolbar pushes layout wide**  
  Add `minWidth: 0` to grid children; set editor container to `width:100%`; allow toolbar wrap via CSS.

---

## Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.
