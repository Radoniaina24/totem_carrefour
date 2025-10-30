// hooks/useTaskEvents.ts
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";
import { candidateAPI } from "@/redux/api/candidateApi";

export const useCvEvents = (params: Record<string, any>) => {
  const socket = getSocket();
  const [triggerRefetch] =
    candidateAPI.endpoints.getAllCandidate.useLazyQuery();

  const [admin] = candidateAPI.endpoints.getMyCv.useLazyQuery();
  useEffect(() => {
    const refetch = () => {
      triggerRefetch(params);
      admin("");
    };

    socket.on("cvCreated", refetch);
    socket.on("cvUpdated", refetch);

    return () => {
      socket.off("cvCreated", refetch);
      socket.off("cvUpdated", refetch);
    };
  }, [params]);
};
