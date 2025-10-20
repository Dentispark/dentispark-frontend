export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: {
    active: React.ReactNode;
    inactive: React.ReactNode;
  };
  allowedMemberTypes?: (
    | "STUDENT"
    | "ACADEMIC_MENTOR"
    | "PLATFORM_ADMIN"
    | "PLATFORM_SYSTEM"
  )[];
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  currentPath: string;
}

export interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}
