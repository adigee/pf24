# Portfolio Project Pages

This directory contains individual pages for each portfolio project.

## Project Pages

1. **[decision-module.html](decision-module.html)** - The Decision Module project
2. **[on-demand.html](on-demand.html)** - On-demand project
3. **[trq-dad.html](trq-dad.html)** - TRQ DAD chatbot project

## Structure

Each project page includes:

- **Navigation** with back link to main portfolio
- **Project Hero** with title, subtitle, and tags
- **Project Sidebar** with metadata (Role, Timeline, Team, Company)
- **Main Content** with sections:
  - Overview
  - The Challenge
  - The Solution
  - Design Process
  - Key Features/Decisions
  - Impact (with metrics)
  - Learnings
- **Image Sections** for screenshots and visuals
- **Next Project** link for easy navigation
- **Footer** with links and scroll-to-top button

## Styling

All project pages use:
- `../design-tokens.css` - Design system tokens
- `../styles.css` - Base portfolio styles
- `project-page.css` - Project page specific styles

## Customization

### Adding Your Content

1. **Replace placeholder text** with your actual project details
2. **Update metadata** in the sidebar (Role, Timeline, Team, Company)
3. **Add project images** to the `../images/` directory
4. **Customize sections** - Add or remove content blocks as needed

### Adding More Projects

To add a new project:

1. **Duplicate** one of the existing HTML files
2. **Rename** it (e.g., `new-project.html`)
3. **Update** all content and metadata
4. **Add** a project card on the main `../index.html` page
5. **Update** the "Next Project" links to include your new project in the navigation flow

### Content Guidelines

- **Keep titles concise** - 1-6 words for project titles
- **Subtitle length** - 1-2 sentences maximum
- **Use metrics** - Include specific numbers in Impact section
- **Add visuals** - Break up text with images (recommended 3-5 per project)
- **Tell a story** - Structure: Problem → Solution → Process → Impact

### Image Best Practices

- Use high-quality screenshots/mockups
- Add descriptive captions
- Recommended: 1200px wide minimum
- Use the `content-image-large` class for full-width images
- Optimize for web (compress images, aim for <500KB each)

## Features

- ✅ **Responsive design** - Works on all devices
- ✅ **Theme toggle** - Dark/light mode consistent with main site
- ✅ **Smooth navigation** - Back links and next project links
- ✅ **Sticky sidebar** - Metadata stays visible while scrolling (desktop)
- ✅ **Scroll to top** - Easy navigation on long pages

## Testing Checklist

When customizing project pages:

- [ ] All links work (back to home, next project, footer links)
- [ ] Images load correctly
- [ ] Content is readable in both dark and light themes
- [ ] Layout works on mobile, tablet, and desktop
- [ ] Metadata accurately reflects the project
- [ ] Metrics and impact numbers are correct
- [ ] No placeholder text remains

---

**Note:** The current content in the project pages is template/example text. Replace it with your actual project details and case studies.
