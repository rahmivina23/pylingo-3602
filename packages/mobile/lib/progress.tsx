import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

export type Progress = {
  name: string;
  goal: number;
  completed: string[];
  xp: number;
  gems: number;
  dates: string[];
  minutes: number;
  minutesDate: string;
  goalDates: string[];
  onboarded: boolean;
  unit: number;
};
const initial: Progress = {
  name: "Explorer",
  goal: 10,
  completed: [],
  xp: 0,
  gems: 0,
  dates: [],
  minutes: 0,
  minutesDate: "",
  goalDates: [],
  onboarded: false,
  unit: 0,
};
export function today() {
  return new Date().toLocaleDateString("en-CA");
}
export function streak(dates: string[]) {
  let n = 0;
  const d = new Date();
  if (!dates.includes(today())) d.setDate(d.getDate() - 1);
  while (dates.includes(d.toLocaleDateString("en-CA"))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
type Context = {
  progress: Progress;
  update: (change: Partial<Progress>) => void;
  complete: (unit: number, lesson: number, practice?: boolean) => void;
  storageError: boolean;
};
const ProgressContext = createContext<Context | null>(null);
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(initial);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("pylingo-native-v1")
      .then((value) => {
        if (value) {
          const p = { ...initial, ...JSON.parse(value) };
          setProgress({ ...p, minutes: p.minutesDate === today() ? p.minutes : 0 });
        }
      })
      .catch(() => setStorageError(true))
      .finally(() => setReady(true));
  }, []);
  useEffect(() => {
    if (ready)
      AsyncStorage.setItem("pylingo-native-v1", JSON.stringify(progress)).catch(() =>
        setStorageError(true),
      );
  }, [progress, ready]);
  const update = (change: Partial<Progress>) => setProgress((p) => ({ ...p, ...change }));
  const complete = (unit: number, lesson: number, practice?: boolean) =>
    setProgress((p) => {
      const minutes = (p.minutesDate === today() ? p.minutes : 0) + 3;
      const bonus = minutes >= p.goal && !p.goalDates.includes(today());
      return {
        ...p,
        completed: practice ? p.completed : [...new Set([...p.completed, `${unit}-${lesson}`])],
        xp: p.xp + 30 + (bonus ? 20 : 0),
        gems: p.gems + 5,
        minutes,
        minutesDate: today(),
        goalDates: bonus ? [...p.goalDates, today()] : p.goalDates,
        dates: [...new Set([...p.dates, today()])],
      };
    });
  if (!ready)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9f3",
        }}
      >
        <ActivityIndicator color="#78a747" />
      </View>
    );
  return (
    <ProgressContext.Provider value={{ progress, update, complete, storageError }}>
      {children}
    </ProgressContext.Provider>
  );
}
export function useProgress() {
  const c = useContext(ProgressContext);
  if (!c) throw new Error("Missing progress provider");
  return c;
}
