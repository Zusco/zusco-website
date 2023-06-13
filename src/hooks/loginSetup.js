import { useRouter } from "next/navigation";
import {
  saveToken,
  saveUserInfoToStorage,
  clearAccountCreation,
  PENDING_BOOKING_DATA,
} from "utils/storage";
import { setToken } from "utils/apiInstance";
import { useAuth } from "./auth";

function useLoginSetup() {
  const router = useRouter();
  const { setAuthenticatedUser } = useAuth();

  const logUserIn = (user, route, isModal) => {
    if (user) {
      const { token, ...rest } = user;
      let pendingBookingData = localStorage.getItem(PENDING_BOOKING_DATA);
      pendingBookingData = JSON.parse(pendingBookingData);
      const pendingBookingDataId = pendingBookingData?.id;
      saveToken(token);
      setToken(token);
      saveUserInfoToStorage(rest);
      setAuthenticatedUser(user);
      clearAccountCreation();

      if (!isModal) {
        router.push(
          route ||
            (pendingBookingDataId
              ? `/listing/${pendingBookingDataId}`
              : "/dashboard/explore"),
          {
            replace: true,
          }
        );
      }
    }
  };

  return {
    logUserIn,
  };
}

export default useLoginSetup;
