An interactive, accessible, and responsive **Todo Card component** built with **pure HTML, CSS, and Vanilla JavaScript**.
This project extends a basic static todo card into a more dynamic, stateful UI with editing, status management, and real-time updates.

---

## 📌 Live Demo

https://payne-igb.github.io/Full-Todo-Card-Component/

---


##  Overview

This project is focused on building a single, feature-rich Todo Card component with:

* Editable content
* Dynamic state management
* Accessibility enhancements
* Responsive design
* Real-time time tracking

---

##  Features

###  Edit Mode

* Toggle into edit mode via the **Edit button**
* Update:

  * Title
  * Description
  * Priority
  * Due date
* **Save** updates the UI
* **Cancel** restores previous values
* Focus returns to Edit button after closing

---

###  Status Management

* Status options:

  * Pending
  * In Progress
  * Done
* Status is controlled via:

  * Checkbox
  * Dropdown (segmented control)
* Fully synchronized:

  * Checkbox ↔ Status text ↔ Status control

---

###  Priority Indicator

* Visual indicator updates dynamically:

  *  High
  *  Medium
  *  Low

---

###  Expand / Collapse Description

* Long descriptions are truncated by default
* Expand/collapse toggle:

  * Keyboard accessible
  * Uses `aria-expanded` and `aria-controls`
* Smooth UX for handling large content

---

###  Time Management

* Displays:

  * “Due in X days/hours/minutes”
  * “Overdue by X minutes”
* Automatically updates every **30–60 seconds**
* If completed:

  * Displays **“Completed”**
  * Stops time updates

---

###  Overdue Indicator

* Visual feedback when task is overdue
* Displays explicit **“Overdue”** label
* Styled with strong visual emphasis (red)

---

###  Visual State Changes

* **Done**

  * Strike-through title
  * Muted styling
* **In Progress**

  * Distinct styling
* **High Priority**

  * Strong visual highlight
* **Overdue**

  * Red accent

---

##  Accessibility

This project includes several accessibility best practices:

* Proper `<label for="">` usage in forms
* `aria-live="polite"` for time updates
* Expand/collapse:

  * `aria-expanded`
  * `aria-controls`
* Logical keyboard navigation order:

  * Checkbox → Status → Expand → Edit → Delete → Form controls
* Focus management:

  * Focus moves into edit mode
  * Returns to Edit button on exit

---

##  Responsiveness

* Fully responsive across:

  * Mobile (320px+)
  * Tablet (768px+)
  * Desktop (1024px+)
* Layout adapts:

  * Form fields stack on smaller screens
  * Flexible wrapping for tags and content
* Handles:

  * Long titles
  * Long descriptions
  * Multiple tags

---

##  Tech Stack

* **HTML5** (Semantic structure)
* **CSS3**

  * Flexbox
  * Grid
  * Responsive design
* **Vanilla JavaScript**

  * DOM manipulation
  * Event handling
  * State synchronization
  * Time-based updates

---

##  Testing Hooks

All required `data-testid` attributes are implemented, including:

* Edit form elements
* Status control
* Priority indicator
* Expand/collapse toggle
* Overdue indicator

This ensures compatibility with automated testing environments.

---

##  What Changed from Stage 0

| Feature            | Stage 0         | Stage 1a                        |
| ------------------ | --------------- | ------------------------------- |
| Edit functionality | ❌               | ✅ Fully implemented             |
| Status control     | Basic display   | Interactive + synced            |
| Priority indicator | Static text     | Dynamic visual indicator        |
| Description        | Static          | Expand/Collapse                 |
| Time handling      | Basic countdown | Granular + live updates         |
| Overdue logic      | ❌               | ✅ Implemented                   |
| Accessibility      | Basic           | Enhanced (ARIA, focus handling) |
| State management   | Minimal         | Structured + dynamic            |

---

## ⚙️ Design Decisions

* **Vanilla JS only** → Keeps logic transparent and framework-free
* **Single state object** → Central source of truth for UI updates
* **Separation of modes** → View mode vs Edit mode improves clarity
* **Interval-based time updates** → Efficient and lightweight
* **Progressive enhancement** → Built on top of Stage 0 without breaking structure
---

##  How to Run Locally

```bash
git clone <github.com/Payne-igb/Full-Todo-Card-Component/>
cd <your-project-folder>
open index.html
```

---

##  Author

**Igbonekwu Christopher**



