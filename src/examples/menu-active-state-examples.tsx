/**
 * Examples demonstrating how menu items now show as active for nested paths
 *
 * BEFORE the change:
 * - /overview → Overview menu item is active ✓
 * - /overview/popular-resources → No menu item is active ✗
 * - /overview/personalized-mentors → No menu item is active ✗
 *
 * AFTER the change:
 * - /overview → Overview menu item is active ✓
 * - /overview/popular-resources → Overview menu item is active ✓
 * - /overview/personalized-mentors → Overview menu item is active ✓
 * - /guidance-hub → Guidance Hub menu item is active ✓
 * - /guidance-hub/some-nested-path → Guidance Hub menu item is active ✓
 */

// The logic now used in dashboard-sidebar.tsx:
function isMenuItemActive(currentPath: string, menuItemHref: string): boolean {
  return (
    currentPath === menuItemHref || currentPath.startsWith(menuItemHref + "/")
  );
}

// Examples:
const examples = [
  {
    currentPath: "/overview",
    menuItemHref: "/overview",
    result: isMenuItemActive("/overview", "/overview"), // true
    description: "Exact match - Overview page",
  },
  {
    currentPath: "/overview/popular-resources",
    menuItemHref: "/overview",
    result: isMenuItemActive("/overview/popular-resources", "/overview"), // true
    description: "Nested path - Popular Resources page under Overview",
  },
  {
    currentPath: "/overview/personalized-mentors",
    menuItemHref: "/overview",
    result: isMenuItemActive("/overview/personalized-mentors", "/overview"), // true
    description: "Nested path - Personalized Mentors page under Overview",
  },
  {
    currentPath: "/guidance-hub",
    menuItemHref: "/overview",
    result: isMenuItemActive("/guidance-hub", "/overview"), // false
    description:
      "Different section - Guidance Hub (Overview should not be active)",
  },
  {
    currentPath: "/guidance-hub/some-path",
    menuItemHref: "/guidance-hub",
    result: isMenuItemActive("/guidance-hub/some-path", "/guidance-hub"), // true
    description: "Nested path - Guidance Hub subsection",
  },
];

console.log("Menu Active State Examples:");
examples.forEach((example) => {
  console.log(`${example.description}: ${example.result ? "✓" : "✗"}`);
});

export { isMenuItemActive, examples };
