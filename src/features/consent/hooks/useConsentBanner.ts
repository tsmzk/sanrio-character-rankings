import { useCallback, useEffect, useState } from "react";
import { getCurrentPath } from "../../../hooks/routePath";
import { getConsentStatus, setConsentStatus, trackEvent } from "../../../shared/firebase";

export function useConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(getConsentStatus() === "unset");
  }, []);

  const grant = useCallback(async () => {
    // setConsentStatus は granted のとき Analytics 初期化の完了を待てる Promise を返す。
    // 初期化完了後に page_view を送ることで、SDK 初期化と自前 PV の競合を避ける。
    await setConsentStatus("granted");
    trackEvent({
      name: "page_view",
      params: {
        page_path: getCurrentPath(),
        page_title: typeof document !== "undefined" ? document.title : "",
      },
    });
    setIsVisible(false);
  }, []);

  const deny = useCallback(() => {
    setConsentStatus("denied");
    setIsVisible(false);
  }, []);

  return { isVisible, grant, deny };
}
