# Adding New Tools to the Developer Tools Collection

This document provides step-by-step instructions for adding new tools to the tools collection repository at `https://github.com/DayDstrysNit/tools`.

## Repository Structure

```
/
├── README.md
├── docs/                     # GitHub Pages served content
│   ├── index.html           # Main tools landing page
│   └── [tool-name]/         # Individual tool folders
│       └── index.html       # Tool's main page
├── [ToolName]/              # Tool development folders
│   ├── index.html           # Development version
│   ├── package.json         # If using build tools
│   └── vite.config.ts       # Build configuration
└── [additional tool folders...]
```

## Types of Tools to Add

### Type 1: Simple HTML Tools (No Build Process)
Tools that are standalone HTML files with embedded CSS/JS.

### Type 2: Built Tools (With Build Process)
Tools that use build systems like Vite, webpack, etc.

---

## Adding a Simple HTML Tool

### Step 1: Create the Tool
1. Create a new folder in the repository root: `/[ToolName]/`
2. Create `index.html` with your tool's complete code
3. Ensure the tool is self-contained (all CSS and JS inline or from CDN)
4. Test the tool locally by opening the HTML file

### Step 2: Deploy to GitHub Pages
1. Create the production folder: `/docs/[tool-name]/` (lowercase, hyphenated)
2. Copy your `index.html` to `/docs/[tool-name]/index.html`

### Step 3: Update the Main Landing Page
Edit `/docs/index.html`:

1. **Find a "coming-soon" placeholder card** in the tools grid
2. **Replace the placeholder** with your new tool:

```html
<!-- Change this coming-soon card: -->
<div class="tool-card coming-soon">
    <span class="tool-icon">🎨</span>
    <div class="tool-title">Color Palette Generator <span class="badge new">Coming Soon</span></div>
    <!-- ... rest of placeholder ... -->
</div>

<!-- To this live tool: -->
<a href="./[tool-name]/" class="tool-card">
    <span class="tool-icon">🎨</span>
    <div class="tool-title">[Tool Display Name] <span class="badge">Live</span></div>
    <div class="tool-description">[Brief description of what the tool does]</div>
    <div class="tool-tags">
        <span class="tag">[Tag1]</span>
        <span class="tag">[Tag2]</span>
        <span class="tag">[Tag3]</span>
    </div>
</a>
```

### Step 4: Commit and Push
```bash
cd "/path/to/tools"
git add .
git commit -m "feat: add [ToolName] tool"
git push origin main
```

---

## Adding a Built Tool (Vite/React/etc.)

### Step 1: Create the Development Environment
1. Create tool folder: `/[ToolName]/`
2. Set up your build system (Vite, Create React App, etc.)
3. Develop your tool in this folder

### Step 2: Configure Build Output
Edit your build config (e.g., `vite.config.ts`) to output to GitHub Pages:

```typescript
export default defineConfig({
  // ... other config
  base: './',
  build: {
    outDir: '../docs/[tool-name]',  // lowercase, hyphenated
    emptyOutDir: true,
    assetsDir: 'assets'
  }
})
```

### Step 3: Build and Deploy
```bash
cd "/path/to/tools/[ToolName]"
npm install
npm run build
```

### Step 4: Update Main Landing Page
Follow the same process as Step 3 in "Adding a Simple HTML Tool"

### Step 5: Commit and Push
```bash
cd "/path/to/tools"
git add .
git commit -m "feat: add [ToolName] tool with build process"
git push origin main
```

---

## Tool Requirements and Guidelines

### Essential Requirements
- **Self-contained**: All processing must happen client-side
- **No data transmission**: Tools should not send data to external servers
- **Privacy-focused**: Include privacy messaging in tool descriptions
- **Responsive design**: Tools must work on mobile and desktop
- **Accessible**: Follow basic accessibility guidelines

### File Naming Conventions
- **Development folder**: `/ToolName/` (PascalCase)
- **Production folder**: `/docs/tool-name/` (lowercase, hyphenated)
- **URL**: `https://daydstrysnit.github.io/tools/tool-name/`

### Tool Card Guidelines
- **Icons**: Use appropriate emoji or icon
- **Title**: Clear, concise tool name
- **Description**: 1-2 sentences explaining functionality
- **Tags**: 3-4 relevant tags for categorization
- **Badge**: Use "Live" for working tools, "Coming Soon" for placeholders

---

## Example Tool Cards

### Data Processing Tool
```html
<a href="./json-formatter/" class="tool-card">
    <span class="tool-icon">📋</span>
    <div class="tool-title">JSON Formatter <span class="badge">Live</span></div>
    <div class="tool-description">Format, validate, and beautify JSON data with syntax highlighting and error detection.</div>
    <div class="tool-tags">
        <span class="tag">JSON</span>
        <span class="tag">Format</span>
        <span class="tag">Validate</span>
        <span class="tag">Data</span>
    </div>
</a>
```

### Design Tool
```html
<a href="./color-picker/" class="tool-card">
    <span class="tool-icon">🎨</span>
    <div class="tool-title">Color Picker <span class="badge">Live</span></div>
    <div class="tool-description">Pick colors from images, generate palettes, and convert between color formats.</div>
    <div class="tool-tags">
        <span class="tag">Colors</span>
        <span class="tag">Design</span>
        <span class="tag">CSS</span>
        <span class="tag">Palette</span>
    </div>
</a>
```

### Security Tool
```html
<a href="./password-gen/" class="tool-card">
    <span class="tool-icon">🔐</span>
    <div class="tool-title">Password Generator <span class="badge">Live</span></div>
    <div class="tool-description">Generate secure passwords with customizable length and character sets.</div>
    <div class="tool-tags">
        <span class="tag">Security</span>
        <span class="tag">Passwords</span>
        <span class="tag">Generator</span>
        <span class="tag">Crypto</span>
    </div>
</a>
```

---

## Testing Checklist

Before deploying a new tool:

- [ ] Tool works correctly in development
- [ ] Tool is responsive (test on mobile)
- [ ] All functionality works client-side only
- [ ] Privacy/security messaging is included
- [ ] Tool card is properly formatted on main page
- [ ] Links work correctly from main page
- [ ] Tool loads quickly and handles errors gracefully
- [ ] Build process (if applicable) outputs correctly

---

## Common Issues and Solutions

### Issue: Tool doesn't appear on main page
**Solution**: Check that the href in the tool card matches the folder name exactly

### Issue: Build fails or outputs to wrong location
**Solution**: Verify build config `outDir` path is correct: `../docs/[tool-name]`

### Issue: Tool works locally but not on GitHub Pages
**Solution**: Ensure all assets use relative paths and check browser console for errors

### Issue: CSS/JS not loading
**Solution**: Verify asset paths are relative (`./`) not absolute (`/`)

---

## Maintenance

### Updating Existing Tools
1. Edit source files in development folder
2. Rebuild if using build process
3. Commit and push changes

### Removing Tools
1. Delete development folder
2. Delete production folder from `/docs/`
3. Update main page to show "Coming Soon" placeholder
4. Commit changes

### Adding Tool Categories
If you want to organize tools by category, consider adding section headers to the main landing page grid.

---

## Repository URLs
- **Repository**: https://github.com/DayDstrysNit/tools
- **Live Site**: https://daydstrysnit.github.io/tools/
- **Individual Tool URL Pattern**: https://daydstrysnit.github.io/tools/[tool-name]/

Follow these instructions to maintain consistency and ensure all tools integrate seamlessly with the existing collection structure.
