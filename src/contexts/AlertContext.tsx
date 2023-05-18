import { createContext, ReactNode, useState } from "react";

type AlertType = {
  message: string;
  id: number;
};

type AlertContextType = {
  showAlert: (message: string) => void;
  hideAlert: (id: number) => void;
  alerts: AlertType[];
};

const AlertContext = createContext<AlertContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showAlert: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideAlert: () => {},
  alerts: [],
});

let alertId = 1;

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([
    // { id: 0, message: "Error: This is a test." },
  ]);

  const showAlert = (message: string) => {
    setAlerts([...alerts, { message, id: alertId++ }]);
    // Remove alert after 3 seconds
    setTimeout(() => hideAlert(alertId - 1), 3000);
  };

  const hideAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alerts }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
