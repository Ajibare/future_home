import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/admin-api";
import type { SiteMessage } from "@/types";

interface NotificationsResponse {
  unreadCount: number;
  recent: SiteMessage[];
}

const POLL_INTERVAL = 15000;

export function useAdminNotifications() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-notifications"],
    queryFn: () => adminApi.get<NotificationsResponse>("/api/admin/notifications"),
    refetchInterval: POLL_INTERVAL,
    refetchOnWindowFocus: true,
  });

  const markAllRead = useMutation({
    mutationFn: () => adminApi.patch<{ success: boolean }>("/api/admin/notifications"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  return { ...query, markAllRead };
}
