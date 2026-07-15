# Changelog

All notable changes to Rivelle will be documented here. The project follows Semantic Versioning once the public package is released.

## [Unreleased]

### Fixed

- `add` now repairs missing font and motion dependencies when installation was skipped during `init`.
- Skipped theme installation now prints the exact package-manager command required to finish setup.

### Added

- Initial Rivelle CLI, theme engine and shadcn-compatible source registry.
- 53 editable React and Next.js components.
- Alert Dialog, Button Group, Input Group, Field, Table, Pagination, Empty and Spinner primitives.
- Form, Combobox, Calendar, Date Picker, Drawer, Navigation Menu and Input OTP primitives.
- Carousel, Resizable, Menubar, Kbd and Item primitives.
- Login, Sign Up, Hero, Pricing, Sidebar, Dashboard Shell, Settings and Empty Project blocks.
- Dedicated `/blocks` gallery with full-size previews and install commands.
- Interactive documentation, theme studio and syntax-highlighted usage examples.
- TypeScript and JavaScript HTTP installation verification.

### Changed

- CLI `0.2.0` installs `registry:block` files into `components/blocks` while keeping primitives in `components/ui`.
