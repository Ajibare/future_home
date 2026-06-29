import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Property, SearchFilters, User, PropertyType, ListingType } from "@/types";

interface ThemeState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const current = get().theme;
        const next = current === "light" ? "dark" : "light";
        set({ theme: next });
      },
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface UIState {
  isMobileMenuOpen: boolean;
  isSearchModalOpen: boolean;
  isFilterDrawerOpen: boolean;
  isCompareModalOpen: boolean;
  isWishlistDrawerOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  setFilterDrawerOpen: (open: boolean) => void;
  setCompareModalOpen: (open: boolean) => void;
  setWishlistDrawerOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  (set) => ({
    isMobileMenuOpen: false,
    isSearchModalOpen: false,
    isFilterDrawerOpen: false,
    isCompareModalOpen: false,
    isWishlistDrawerOpen: false,
    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    setSearchModalOpen: (open) => set({ isSearchModalOpen: open }),
    setFilterDrawerOpen: (open) => set({ isFilterDrawerOpen: open }),
    setCompareModalOpen: (open) => set({ isCompareModalOpen: open }),
    setWishlistDrawerOpen: (open) => set({ isWishlistDrawerOpen: open }),
  })
);

interface PropertyState {
  wishlist: string[];
  compareList: string[];
  recentlyViewed: string[];
  searchFilters: SearchFilters;
  viewMode: "grid" | "list";
  addToWishlist: (propertyId: string) => void;
  removeFromWishlist: (propertyId: string) => void;
  toggleWishlist: (propertyId: string) => void;
  isInWishlist: (propertyId: string) => boolean;
  addToCompare: (propertyId: string) => void;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  isInCompare: (propertyId: string) => boolean;
  addToRecentlyViewed: (propertyId: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;
  setViewMode: (mode: "grid" | "list") => void;
}

const defaultFilters: SearchFilters = {
  listingType: "sale",
  page: 1,
  limit: 12,
  sortBy: "newest",
};

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      compareList: [],
      recentlyViewed: [],
      searchFilters: defaultFilters,
      viewMode: "grid",
      addToWishlist: (propertyId) =>
        set((state) => ({
          wishlist: [...new Set([...state.wishlist, propertyId])],
        })),
      removeFromWishlist: (propertyId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== propertyId),
        })),
      toggleWishlist: (propertyId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(propertyId)
            ? state.wishlist.filter((id) => id !== propertyId)
            : [...state.wishlist, propertyId],
        })),
      isInWishlist: (propertyId) => get().wishlist.includes(propertyId),
      addToCompare: (propertyId) =>
        set((state) => {
          if (state.compareList.length >= 4) return state;
          if (state.compareList.includes(propertyId)) return state;
          return { compareList: [...state.compareList, propertyId] };
        }),
      removeFromCompare: (propertyId) =>
        set((state) => ({
          compareList: state.compareList.filter((id) => id !== propertyId),
        })),
      clearCompare: () => set({ compareList: [] }),
      isInCompare: (propertyId) => get().compareList.includes(propertyId),
      addToRecentlyViewed: (propertyId) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((id) => id !== propertyId);
          return { recentlyViewed: [propertyId, ...filtered].slice(0, 20) };
        }),
      setSearchFilters: (filters) =>
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters, page: 1 },
        })),
      resetSearchFilters: () => set({ searchFilters: defaultFilters }),
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: "property-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  updateFavorites: (propertyIds: string[]) => void;
  addFavorite: (propertyId: string) => void;
  removeFavorite: (propertyId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateFavorites: (propertyIds) =>
        set((state) => ({
          user: state.user ? { ...state.user, favorites: propertyIds } : null,
        })),
      addFavorite: (propertyId) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, favorites: [...new Set([...state.user.favorites, propertyId])] }
            : null,
        })),
      removeFavorite: (propertyId) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, favorites: state.user.favorites.filter((id) => id !== propertyId) }
            : null,
        })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

interface NotificationState {
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    title: string;
    message?: string;
    duration?: number;
  }>;
  addNotification: (notification: Omit<NotificationState["notifications"][0], "id">) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Math.random().toString(36).substring(7) },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));