import { atom, selector } from "recoil";

interface AlertData {
  severity: "error" | "info" | "success" | "warning";
  message: string;
}

interface AlertStore {
  isVisible: boolean;
  data?: AlertData;
}

export const alertState = atom({
  key: "alertState",
  default: { isVisible: false } as AlertStore,
});

export const displayAlertSelector = selector({
  key: "displayAlert",
  get: (_) => null,
  set: ({ set }, dataParams) => {
    set(alertState, { isVisible: true, data: dataParams as AlertData });
  },
});
