# Responsive Design Guide – Premium Steel Works

Quick reference for how phone and desktop views work in this project.

---

## Breakpoints Used

| Width | Name | Use case |
|-------|------|----------|
| (default) | Mobile | Phones, base styles |
| 640px | `sm` | Large phones, small tablets |
| 768px | `md` | Tablets |
| 1024px | `lg` | Laptops, small desktops |
| 1280px | `xl` | Large desktops |

---

## Per Component

### Header
| What | Mobile | Desktop (768px+) |
|------|--------|------------------|
| Nav links | Horizontal scroll (swipe) | All visible, no scroll |
| Logo size | 1.125rem | 1.25rem |
| Link size | 0.75rem | 0.875rem |
| Padding | 1rem | 2rem |

### Footer
| What | Mobile | Desktop (768px+) |
|------|--------|------------------|
| Grid | 2 columns | 4 columns |
| Sections | Company+Products, Support+Contact | All 4 side by side |

### Home
| What | Mobile | 640px | 1024px |
|------|--------|-------|--------|
| Hero title | 2.25rem | 3rem | 3.75rem |
| Category grid | 1 col | 2 cols | 4 cols |

### Category
| What | Mobile | 640px | 1024px | 1280px |
|------|--------|-------|--------|--------|
| Product grid | 1 col | 2 cols | 3 cols | 4 cols |

### ProductCard
No media queries. Uses `aspect-ratio: 4/3` and inherits width from the parent grid.

---

## Testing

1. **Chrome DevTools**: F12 → Toggle device toolbar (Ctrl+Shift+M) → choose device or resize.
2. **Resize window**: Drag the browser edge to see breakpoints in action.
3. **Real phone**: Run `npm run dev` and open `http://<your-ip>:5173` on your phone.

---

## Pattern Cheat Sheet

```css
/* Mobile-first: base = mobile */
.element { padding: 1rem; }

/* Add/override for larger screens */
@media (min-width: 640px) {
  .element { padding: 1.5rem; }
}

/* Responsive grid */
.grid {
  grid-template-columns: 1fr;  /* mobile */
}
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
```
