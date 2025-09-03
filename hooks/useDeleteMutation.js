import { showToast } from "@/lib/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeleteMutation = (queryKey, deleteEndpoint) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ids, deleteType }) => {
      const { data: response } = await axios({
        url: deleteEndpoint,
        method: deleteType === "PD" ? "DELETE" : "PUT",
        data: { ids, deleteType },
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: (data) => {
      showToast("success", data.message);
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      showToast("error", error.message);
    },
  });
};

export default useDeleteMutation;
