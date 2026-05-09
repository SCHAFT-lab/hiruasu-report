import { createContext, useState, useEffect, useContext } from 'react';
import { get, set } from 'idb-keyval';

const LogContext = createContext();
const STORAGE_KEY = 'choucho_reports_v2';

export function LogProvider({ children }) {
  const [logs, setLogs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    get(STORAGE_KEY).then((storedLogs) => {
      if (storedLogs) {
        setLogs(storedLogs);
      } else {
        const oldLogs = localStorage.getItem('choucho_reports');
        if (oldLogs) {
          try {
            const parsed = JSON.parse(oldLogs);
            setLogs(parsed);
            set(STORAGE_KEY, parsed);
          } catch (e) {
            console.error("Migration failed", e);
          }
        }
      }
      setIsLoaded(true);
    });
  }, []);

  const saveLog = (newLog) => {
    const today = new Date().toLocaleDateString('sv-SE');
    const dateToSave = newLog.date || today;

    setLogs((prevLogs) => {
      const existingLogIndex = prevLogs.findIndex(log => log.date === dateToSave);
      let updatedLogs;

      if (existingLogIndex >= 0) {
        updatedLogs = [...prevLogs];
        const existing = updatedLogs[existingLogIndex];
        updatedLogs[existingLogIndex] = {
          ...existing,
          [newLog.type]: newLog.content,
          [`${newLog.type}Audio`]: newLog.audioBlob !== undefined ? newLog.audioBlob : existing[`${newLog.type}Audio`],
          updatedAt: new Date().toISOString()
        };
      } else {
        const entry = {
          id: Date.now().toString(),
          date: dateToSave,
          morning: '',
          night: '',
          morningAudio: null,
          nightAudio: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        entry[newLog.type] = newLog.content;
        entry[`${newLog.type}Audio`] = newLog.audioBlob || null;
        updatedLogs = [entry, ...prevLogs];
      }

      set(STORAGE_KEY, updatedLogs).catch(err => console.error("Failed to save to idb", err));
      return updatedLogs;
    });
  };

  const deleteLog = (id) => {
    setLogs((prevLogs) => {
      const updatedLogs = prevLogs.filter(log => log.id !== id);
      set(STORAGE_KEY, updatedLogs).catch(err => console.error("Failed to delete from idb", err));
      return updatedLogs;
    });
  };

  const value = {
    logs,
    isLoaded,
    saveLog,
    deleteLog
  };

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
}

export function useLogContext() {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error('useLogContext must be used within a LogProvider');
  }
  return context;
}
