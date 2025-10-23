// hooks/useTaskEvents.ts
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";
import { candidateAPI } from "@/redux/api/candidateApi";

export const useCvEvents = (params: Record<string, any>) => {
  const socket = getSocket();
  const [triggerRefetch] =
    candidateAPI.endpoints.getAllCandidate.useLazyQuery();

  useEffect(() => {
    const refetch = () => {
      triggerRefetch(params);
    };

    socket.on("cvCreated", refetch);

    return () => {
      socket.off("cvCreated", refetch);
    };
  }, [params]);
};
