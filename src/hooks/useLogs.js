import { useLogContext } from '../context/LogContext';

export function useLogs() {
  const { logs, isLoaded, saveLog, deleteLog } = useLogContext();

  const getLogByDate = (dateStr) => {
    return logs.find(log => log.date === dateStr) || null;
  };

  const getTodayLog = () => {
    const today = new Date().toLocaleDateString('sv-SE');
    return getLogByDate(today);
  };

  return { logs, saveLog, deleteLog, getLogByDate, getTodayLog, isLoaded };
}
