import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

const STORAGE_KEY = 'choucho_reports_v2';

export function useLogs() {
  const [logs, setLogs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    get(STORAGE_KEY).then((storedLogs) => {
      if (storedLogs) {
        setLogs(storedLogs);
      } else {
        // 旧バージョン（localStorage）からのマイグレーション
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
    // newLog should have: date, type ('morning' or 'night'), content, and audioBlob
    const today = new Date().toLocaleDateString('sv-SE');
    const dateToSave = newLog.date || today;

    setLogs((prevLogs) => {
      const existingLogIndex = prevLogs.findIndex(log => log.date === dateToSave);
      let updatedLogs;

      if (existingLogIndex >= 0) {
        updatedLogs = [...prevLogs];
        updatedLogs[existingLogIndex] = {
          ...updatedLogs[existingLogIndex],
          [newLog.type]: newLog.content,
          [`${newLog.type}Audio`]: newLog.audioBlob !== undefined ? newLog.audioBlob : updatedLogs[existingLogIndex][`${newLog.type}Audio`],
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

  const getLogByDate = (dateStr) => {
    return logs.find(log => log.date === dateStr) || null;
  };

  const getTodayLog = () => {
    const today = new Date().toLocaleDateString('sv-SE');
    return getLogByDate(today);
  };

  const deleteLog = (id) => {
    setLogs((prevLogs) => {
      const updatedLogs = prevLogs.filter(log => log.id !== id);
      set(STORAGE_KEY, updatedLogs).catch(err => console.error("Failed to delete from idb", err));
      return updatedLogs;
    });
  };

  return { logs, saveLog, deleteLog, getLogByDate, getTodayLog, isLoaded };
}
