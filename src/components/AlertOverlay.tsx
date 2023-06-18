import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import AlertContext from "~/contexts/AlertContext";

const AlertOverlay = () => {
  const { alerts, hideAlert } = useContext(AlertContext);

  return (
    <div className="fixed bottom-0 right-0 grid max-h-screen grid-flow-dense justify-end justify-items-end gap-4 justify-self-end pb-5 pr-5">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex flex-row gap-x-2 rounded-lg border border-red-400 bg-red-200 px-5 py-4 text-base text-red-900 shadow-sm"
        >
          <span>{alert.message}</span>
          <button onClick={() => hideAlert(alert.id)}>
            <XMarkIcon className="-mx-1 h-6 hover:opacity-50" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertOverlay;
