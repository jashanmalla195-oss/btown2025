# BTown Tax Intake - Design System

## Design Philosophy

### Visual Language
- **Professional Trust**: Clean, modern interface that instills confidence in users handling sensitive financial information
- **Efficiency-First**: Streamlined workflow that guides users through complex tax requirements with minimal friction
- **Accessibility**: High contrast, clear typography, and intuitive navigation for users of all technical abilities
- **Premium Feel**: Subtle animations and refined interactions that rival commercial tax software

### Color Palette
- **Primary**: Deep Navy (#1a365d) - Trust, professionalism, stability
- **Secondary**: Soft Blue (#4299e1) - Progress, action, reliability  
- **Accent**: Emerald Green (#38a169) - Success, completion, money
- **Warning**: Amber (#d69e2e) - Caution, important information
- **Error**: Coral Red (#e53e3e) - Errors, required fields
- **Neutral**: Cool Gray (#718096) - Supporting text, borders
- **Background**: Pure White (#ffffff) with subtle gray sections (#f7fafc)

### Typography
- **Display Font**: "Inter" - Clean, modern sans-serif for headings
- **Body Font**: "Inter" - Consistent typography system for optimal readability
- **Monospace**: "JetBrains Mono" - For SIN numbers, amounts, form codes
- **Font Sizes**: Mobile-optimized scale (14px base, 18px headings, 24px titles)

## Visual Effects & Styling

### Used Libraries & Effects
- **Anime.js**: Smooth step transitions, progress bar animations, field reveal/hide effects
- **ECharts.js**: Progress visualization, completion statistics
- **Splide**: Document upload carousel, testimonial slider
- **Typed.js**: Welcome message typewriter effect
- **Splitting.js**: Text reveal animations for section headers

### Animation Strategy
- **Micro-interactions**: Subtle hover states, button press feedback, form field focus
- **Step Transitions**: Smooth slide animations between form sections
- **Progress Indicators**: Animated progress bar and completion checkmarks
- **Conditional Reveals**: Gentle fade-in animations for dynamically shown fields
- **Loading States**: Professional loading spinners and skeleton screens

### Header Effect
- **Clean Navigation**: Fixed header with company logo and progress indicator
- **Gradient Accent**: Subtle blue-to-navy gradient on active elements
- **Sticky Progress**: Progress bar remains visible during scroll
- **Mobile Collapse**: Hamburger menu for mobile navigation

### Component Styling
- **Form Cards**: White background, soft shadows (0 4px 6px -1px rgba(0, 0, 0, 0.1))
- **Input Fields**: Rounded corners (8px), subtle borders, focus states with blue accent
- **Buttons**: Rounded (6px), consistent padding, clear hierarchy (primary/secondary)
- **Checkboxes**: Custom styled with smooth check animations
- **File Uploads**: Drag-and-drop zones with visual feedback
- **Validation**: Inline error states with clear messaging

### Layout Principles
- **Grid System**: 12-column responsive grid with consistent gutters
- **Spacing**: 8px base unit system (8px, 16px, 24px, 32px, 48px)
- **Breakpoints**: Mobile-first (320px, 768px, 1024px, 1440px)
- **Content Width**: Maximum 1200px centered with proper padding
- **Sidebar**: 300px fixed width on desktop, collapsible drawer on mobile

### Interactive Elements
- **Hover States**: Subtle scale (1.02x) and shadow increase
- **Focus States**: Clear blue outline for keyboard navigation
- **Active States**: Slightly darker background color
- **Disabled States**: Reduced opacity (0.6) with cursor: not-allowed
- **Loading States**: Skeleton screens and progress indicators

### Mobile Optimizations
- **Touch Targets**: Minimum 44px tap targets for all interactive elements
- **Swipe Gestures**: Support for swipe navigation between form steps
- **Keyboard Handling**: Proper input types and keyboard avoidance
- **Scroll Behavior**: Smooth scrolling with momentum
- **Responsive Images**: Proper scaling and optimization

### Accessibility Features
- **Color Contrast**: Minimum 4.5:1 ratio for all text
- **Focus Management**: Logical tab order and visible focus indicators
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Error Handling**: Clear, descriptive error messages
- **Progress Indication**: Multiple ways to understand form completion

### Professional Polish
- **Consistent Iconography**: Feather icons for UI elements
- **Subtle Shadows**: Layered shadow system for depth
- **Border Radius**: Consistent 6px radius for modern feel
- **Status Indicators**: Color-coded badges for completion states
- **Empty States**: Helpful illustrations and guidance

## Implementation Notes
- Use Tailwind CSS as the foundation with custom component classes
- Implement dark mode toggle for accessibility
- Ensure all animations respect prefers-reduced-motion
- Use CSS custom properties for theme consistency
- Implement proper focus trap for modal dialogs
- Test across all major browsers and devices