import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import blueWifiIcon from "../../../public/wifi-blue-icon.png";
import deleteIcon from "../../../public/delete-icon.png";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { changeInternetStatus } from "@/redux/reducer/actions";

const InternetStatus = () => {
  const dispatch = useAppDispatch();
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : false
  );

  const handleOnlineStatusChange = useCallback(() => {
    const onlineStatus =
      typeof navigator !== "undefined" ? navigator.onLine : false;
    setIsOnline(onlineStatus);
  }, []);

  useEffect(() => {
    dispatch(changeInternetStatus(isOnline));
  }, [dispatch, isOnline]);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      window.addEventListener("online", handleOnlineStatusChange);
      window.addEventListener("offline", handleOnlineStatusChange);

      return () => {
        window.removeEventListener("online", handleOnlineStatusChange);
        window.removeEventListener("offline", handleOnlineStatusChange);
      };
    }
  }, [handleOnlineStatusChange]);

  return (
    <div className="w-[35px] h-[35px] flex flex-col items-center justify-center">
      {isOnline ? (
        <Image
          alt="wifi icon"
          src={blueWifiIcon}
          className="object-cover h-[30px] w-[30px]"
        />
      ) : (
        <>
          <Image
            alt="no wifi icon"
            src={deleteIcon}
            className="object-cover h-[30px] w-[30px]"
          />
        </>
      )}
    </div>
  );
};

export default InternetStatus;
