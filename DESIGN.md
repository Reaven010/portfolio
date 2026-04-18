# Design System Document: Obsidian Performance

## 1. Overview & Creative North Star
**The Creative North Star: The Digital Architect.**

This design system is engineered to move beyond the "standard" developer portfolio. Instead of a generic grid of project cards, this system treats the UI as a high-performance IDE—sharp, confident, and meticulously organized. We break the "template" look through **Intentional Asymmetry** and **Tonal Depth**. 

By utilizing overlapping elements, massive typographic scales, and physical layering, we create an editorial experience that feels custom-built. This system isn't just a container for code; it is a reflection of the precision and performance of the engineer behind it.

---

## 2. Colors & Surface Philosophy
The palette is rooted in "Obsidian" depths (`#0e0e0e`), using light not as a decoration, but as a functional tool to define hierarchy.

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for sectioning. High-end design doesn't rely on "boxes." Boundaries must be defined solely through background color shifts. 
*   Example: A `surface-container-low` section sitting directly on a `surface` background creates a natural, sophisticated edge.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of frosted glass.
*   **Base:** `surface` (#0e0e0e)
*   **Nesting:** Use `surface-container-lowest` through `surface-container-highest` to define importance.
*   **The Layering Principle:** Place a `surface-container-highest` card on a `surface-container-low` section to create a soft, natural lift without a single drop shadow.

### The "Glass & Gradient" Rule
To achieve a "signature" look, floating elements (Modals, Navigation Bars, Hovering Cards) must use **Glassmorphism**:
*   **Fill:** `surface-variant` at 40%–60% opacity.
*   **Effect:** `backdrop-filter: blur(20px)`.
*   **Soul:** Main CTAs should utilize a linear gradient from `primary` (#73b1ff) to `secondary` (#b088fe) at a 135-degree angle. This provides a professional polish that flat color cannot replicate.

---

## 3. Typography
We use **Inter** or **SF Pro** to lean into the Apple-like aesthetic of clarity and authority.

*   **Display (lg/md):** Reserved for hero statements and personality. Use `on-surface` (Pure White) with tight letter-spacing (-0.02em).
*   **Headline & Title:** Used to anchor technical sections.
*   **Body (lg/md):** Primary information in `on-surface`. Secondary metadata or "fine print" must use `on-surface-variant` (Muted Grey).
*   **Label:** Always uppercase with slightly increased letter-spacing (+0.05em) to denote technical "specs" or tags.

The contrast between the massive `display-lg` and the tiny, precise `label-md` creates an editorial rhythm that feels like a premium magazine.

---

## 4. Elevation & Depth
In this system, depth is a result of light and transparency, not "ink."

### Ambient Shadows
If a floating effect is required, shadows must be **Extra-Diffused**.
*   **Blur:** 40px–80px.
*   **Opacity:** 4%–8%.
*   **Color:** Use a tinted version of `primary` or `secondary` rather than black to mimic the glow of a high-end monitor.

### The "Ghost Border" Fallback
If a border is required for accessibility, it must be a **Ghost Border**:
*   **Stroke:** 1px.
*   **Color:** `outline-variant` at **15% opacity**. 
*   **Constraint:** Never use 100% opaque borders; they shatter the glass illusion.

---

## 5. Components

### Buttons
*   **Primary:** High-performance. 135° Gradient (`primary` to `secondary`). White text (`on-primary-fixed`). Large rounded corners (`xl` - 3rem).
*   **Secondary:** Glassmorphic. `surface-container-high` at 50% opacity with a `backdrop-blur`.
*   **Tertiary:** No background. `on-surface` text with a subtle underline on hover.

### Cards & Projects
*   **Style:** No divider lines. Use vertical white space and the `surface-container` hierarchy.
*   **Interaction:** On hover, a card should transition from `surface-container-low` to `surface-container-high` and scale slightly (1.02x).
*   **Border:** Use the **Ghost Border** fallback only.

### Chips (Tags/Tech Stack)
*   **Style:** `surface-container-highest` background with `label-md` typography.
*   **Shape:** `full` (pill-shaped) to contrast against the more architectural card shapes.

### Input Fields
*   **Style:** Minimalist obsidian. Background is `surface-container-lowest`.
*   **Focus State:** A 1px `ghost border` at 50% opacity and a subtle `primary` outer glow (8px blur).

### Specialized Portfolio Components
*   **Code Snippet Container:** Use `surface-container-lowest` (pure black) with `surface-variant` glass headers.
*   **Scroll Progress:** A thin 2px `primary` gradient line at the very top of the viewport.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Negative Space:** Let the obsidian backgrounds breathe. A lack of clutter is a sign of confidence.
*   **Use Asymmetry:** Place a `display-lg` headline on the left and a small `body-md` description offset to the right. 
*   **Tone-on-Tone:** Use `surface-container-low` text on `surface` backgrounds for non-essential UI elements to keep the focus on the content.

### Don't:
*   **Don't Use Dividers:** Never use a `<hr>` or 1px line to separate content. Use the Spacing Scale (minimum 4rem between sections).
*   **Don't Over-Glow:** Gradients and glass are for accents and floating elements only. If everything glows, nothing is important.
*   **Don't Use Pure Black for Text:** Text should be `#ffffff`. For secondary text, use the provided `on-surface-variant`—never use a mid-grey that looks "muddy" against the obsidian background.

---

## 7. Roundedness Scale
*   **Default (1rem):** Standard interactive elements (Inputs, Small Cards).
*   **XL (3rem):** Main Buttons and Large Hero Containers.
*   **Full (9999px):** Chips and status indicators.
*   **None (0px):** Prohibited. Everything must feel approachable and refined.