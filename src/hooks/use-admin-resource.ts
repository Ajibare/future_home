import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/admin-api";

export function useAdminList<T>(resource: string) {
  return useQuery({
    queryKey: [resource],
    queryFn: () => adminApi.get<T[]>(`/api/${resource}`),
  });
}

export function useAdminItem<T>(resource: string, id: string | undefined) {
  return useQuery({
    queryKey: [resource, id],
    queryFn: () => adminApi.get<T>(`/api/${resource}/${id}`),
    enabled: Boolean(id),
  });
}

export function useAdminMutations<T>(resource: string) {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [resource] });

  const create = useMutation({
    mutationFn: (body: Partial<T>) => adminApi.post<T>(`/api/${resource}`, body),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<T> }) => adminApi.put<T>(`/api/${resource}/${id}`, body),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminApi.delete<{ success: boolean }>(`/api/${resource}/${id}`),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
