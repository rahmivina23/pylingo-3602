import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { router } from "expo-router";
import { landscapeXml } from "../lib/art";
import { units } from "../lib/course";
import { useProgress, streak } from "../lib/progress";
import { Pip, Txt, Button, Icon, Screen, c, s } from "./ui";
import { Onboarding } from "./onboarding";
import { Lesson, type LessonSelection } from "./lesson";
export default function Adventure() {
  const { progress } = useProgress();
  const [onboarding, setOnboarding] = useState(false);
  const [lesson, setLesson] = useState<LessonSelection | null>(null);
  const u = progress.unit;
  const unit = units[u];
  const count = unit.lessons.filter((_, i) => progress.completed.includes(`${u}-${i}`)).length;
  const next = Math.max(
    0,
    unit.lessons.findIndex((_, i) => !progress.completed.includes(`${u}-${i}`)),
  );
  const start = () =>
    progress.onboarded ? setLesson({ unit: u, lesson: next }) : setOnboarding(true);
  return (
    <Screen>
      <View style={styles.greeting}>
        <View>
          <Txt style={s.eyebrow}>A LITTLE PYTHON. A WORLD OF POSSIBILITIES.</Txt>
          <Txt style={styles.hello}>
            Let’s keep growing,{"\n"}
            {progress.name === "Explorer" ? "explorer" : progress.name}.
          </Txt>
        </View>
        <View style={styles.level}>
          <Icon name="leaf-outline" size={13} />
          <Txt style={{ fontSize: 8, color: "#7a955f" }}>
            Level {Math.floor(progress.xp / 100) + 1}
          </Txt>
        </View>
      </View>
      <Txt style={[s.small, { marginBottom: 23 }]}>
        One small lesson. One giant leap for your coding skills.
      </Txt>
      <View style={styles.hero}>
        <View style={styles.heroHill} />
        <View style={styles.heroCopy}>
          <Txt style={[s.eyebrow, { fontSize: 7, color: "#829365", letterSpacing: 1 }]}>
            YOUR NEXT LITTLE WIN
          </Txt>
          <Txt style={styles.heroTitle}>
            {progress.completed.length
              ? "Your next chapter\nis waiting."
              : "Big ideas start\nwith a little code."}
          </Txt>
          <Txt style={styles.heroDesc}>
            {progress.onboarded
              ? "Pick up where you left off. Pip’s got your back."
              : "Meet Pip, your friendly guide to the world of Python."}
          </Txt>
          <Button
            title={progress.onboarded ? "Continue learning" : "Let’s get started"}
            onPress={start}
            style={{ alignSelf: "flex-start", paddingHorizontal: 13, paddingVertical: 11 }}
          />
          <View style={[s.row, { gap: 4, marginTop: 11 }]}>
            <Icon name="time-outline" size={11} color="#94a278" />
            <Txt style={{ fontSize: 7, color: "#94a278" }}>
              Just 3 minutes · No experience needed
            </Txt>
          </View>
        </View>
        <View style={styles.heroPip}>
          <View style={styles.bubble}>
            <Txt style={{ fontSize: 8, color: "#7a9561" }}>Hello, future coder!</Txt>
          </View>
          <Pip size={155} />
        </View>
      </View>
      <View style={styles.goal}>
        <View style={styles.goalIcon}>
          <Icon name="flame" color="#d8aa56" size={23} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 11 }}>A little every day</Txt>
            <Txt style={{ fontSize: 9, color: "#8e9b7b" }}>
              {Math.min(progress.minutes, progress.goal)} / {progress.goal} min
            </Txt>
          </View>
          <View style={[s.track, { marginTop: 9, height: 5 }]}>
            <View
              style={[
                s.fill,
                { width: `${Math.min(100, (progress.minutes / progress.goal) * 100)}%` },
              ]}
            />
          </View>
        </View>
        <View style={styles.streak}>
          <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 15, color: "#9b955b" }}>
            {streak(progress.dates)}
          </Txt>
          <Txt style={{ fontSize: 6, color: "#a4aa96" }}>DAY STREAK</Txt>
        </View>
      </View>
      <View style={styles.sectionHead}>
        <View>
          <Txt style={s.sectionTitle}>Your adventure map</Txt>
          <Txt style={[s.small, { fontSize: 9 }]}>A new skill around every bend.</Txt>
        </View>
        <Pressable accessibilityRole="button" onPress={() => router.push("/(tabs)/explore")}>
          <View style={s.row}>
            <Txt style={{ fontSize: 9, color: "#849b6a" }}>All units</Txt>
            <Icon name="arrow-forward" size={14} />
          </View>
        </Pressable>
      </View>
      <View style={styles.mapCard}>
        <View style={styles.unitHead}>
          <View style={styles.unitIcon}>
            <Icon name="leaf-outline" size={26} />
          </View>
          <View style={{ flex: 1 }}>
            <Txt style={[s.eyebrow, { fontSize: 7 }]}>
              UNIT {u + 1} · {u < 2 ? "BEGINNER" : u < 5 ? "INTERMEDIATE" : "ADVANCED"}
            </Txt>
            <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 14, marginTop: 4 }}>
              {unit.title}
            </Txt>
            <Txt style={{ fontSize: 8, color: "#9ca889", marginTop: 5 }}>
              {count} of 4 lessons complete
            </Txt>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Choose course unit"
            onPress={() => router.push("/(tabs)/explore")}
            style={styles.unitMenu}
          >
            <Icon name="chevron-down" size={17} color="#92a177" />
          </Pressable>
        </View>
        <View style={styles.mapLand}>
          <View style={styles.landscape}>
            <SvgXml xml={landscapeXml} width={560} height={640} />
          </View>
          <View style={styles.mapTag}>
            <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: "#93b66a" }} />
            <Txt style={{ fontSize: 7, color: "#7d9463" }}>One step at a time</Txt>
          </View>
          {unit.lessons.map((name, i) => {
            const done = progress.completed.includes(`${u}-${i}`);
            const locked = i > 0 && !progress.completed.includes(`${u}-${i - 1}`);
            const pos = [
              { top: 81, left: "48%" },
              { top: 228, left: "78%" },
              { top: 365, left: "22%" },
              { top: 521, left: "38%" },
            ][i];
            return (
              <View key={name} style={[styles.node, pos as any]}>
                {!done && !locked && (
                  <View style={styles.flag}>
                    <Txt
                      style={{
                        fontFamily: "PoppinsSemi",
                        fontSize: 6,
                        color: "#86a659",
                        letterSpacing: 1,
                      }}
                    >
                      {i === 0 ? "START HERE" : "UP NEXT"}
                    </Txt>
                  </View>
                )}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${name}${locked ? " locked" : ""}`}
                  disabled={locked}
                  onPress={() => setLesson({ unit: u, lesson: i })}
                  style={[styles.nodeButton, locked && styles.locked, done && styles.done]}
                >
                  <Icon
                    name={
                      locked
                        ? "lock-closed-outline"
                        : done
                          ? "checkmark"
                          : (
                              [
                                "code-slash",
                                "cube-outline",
                                "calculator-outline",
                                "star-outline",
                              ] as const
                            )[i]
                    }
                    size={29}
                    color={locked ? "#a6b592" : "white"}
                  />
                  <View
                    style={[
                      styles.nodeBadge,
                      locked && { backgroundColor: "#e4e9d5" },
                      done && { backgroundColor: "#448b73" },
                    ]}
                  >
                    <Icon
                      name={locked ? "lock-closed" : done ? "checkmark" : "play"}
                      size={9}
                      color={locked ? "#99aa84" : "white"}
                    />
                  </View>
                </Pressable>
                <Txt style={styles.nodeLabel}>{name}</Txt>
                <Txt style={styles.nodeSub}>
                  {done
                    ? "Nice work!"
                    : locked
                      ? "Keep going to unlock"
                      : `Lesson ${i + 1} · 3 min`}
                </Txt>
              </View>
            );
          })}
        </View>
        <View style={styles.mapFoot}>
          <Icon name="map-outline" size={14} color="#a5b28f" />
          <Txt style={{ fontSize: 8, color: "#97a383" }}>Your journey is just beginning.</Txt>
        </View>
      </View>
      <View style={[styles.sectionHead, { marginTop: 27 }]}>
        <View>
          <Txt style={s.sectionTitle}>A little extra practice?</Txt>
          <Txt style={[s.small, { fontSize: 9 }]}>Keep those new skills fresh.</Txt>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {[
          { name: "Speak Python", desc: "Say it. Know it.", icon: "mic-outline" },
          { name: "Code a little", desc: "A quick brain boost.", icon: "code-slash" },
        ].map((item, i) => (
          <Pressable
            accessibilityRole="button"
            key={item.name}
            onPress={() =>
              i === 0
                ? setLesson({ unit: u, lesson: 0, practice: true })
                : router.push("/(tabs)/practice")
            }
            style={styles.quick}
          >
            <View style={[styles.quickIcon, i === 1 && { backgroundColor: "#f8eedf" }]}>
              <Icon name={item.icon as any} color={i === 1 ? "#c5a171" : c.green} size={24} />
            </View>
            <Txt style={{ fontSize: 11, fontFamily: "PoppinsSemi", marginTop: 12 }}>
              {item.name}
            </Txt>
            <Txt style={{ fontSize: 8, color: "#a0aa91", marginTop: 6 }}>{item.desc}</Txt>
          </Pressable>
        ))}
      </View>
      <View style={styles.tip}>
        <View>
          <Txt style={[s.eyebrow, { fontSize: 7 }]}>PIP’S LITTLE TIP</Txt>
          <Txt style={{ fontSize: 12, lineHeight: 23, marginTop: 9, color: "#85956d" }}>
            “You don’t have to know it all.{"\n"}You just have to start.”
          </Txt>
        </View>
        <Pip size={84} />
      </View>
      {onboarding && (
        <Onboarding
          close={() => setOnboarding(false)}
          finish={() => {
            setOnboarding(false);
            setLesson({ unit: u, lesson: next });
          }}
        />
      )}
      {lesson && <Lesson selection={lesson} close={() => setLesson(null)} />}
    </Screen>
  );
}
const styles = StyleSheet.create({
  greeting: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  hello: {
    fontSize: 27,
    lineHeight: 36,
    fontFamily: "PoppinsSemi",
    letterSpacing: -1,
    marginTop: 8,
  },
  level: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e9d5",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: "center",
  },
  hero: {
    borderWidth: 1,
    borderColor: "#e4ebd3",
    borderRadius: 22,
    backgroundColor: c.cream,
    overflow: "hidden",
    minHeight: 254,
  },
  heroHill: {
    position: "absolute",
    right: -90,
    bottom: -60,
    width: 250,
    height: 205,
    borderRadius: 160,
    backgroundColor: "#d8e8be",
  },
  heroCopy: { padding: 21, zIndex: 2 },
  heroTitle: {
    fontFamily: "PoppinsSemi",
    fontSize: 23,
    letterSpacing: -0.7,
    lineHeight: 31,
    marginTop: 13,
  },
  heroDesc: {
    fontSize: 9,
    lineHeight: 18,
    color: "#8a9873",
    maxWidth: 185,
    marginTop: 10,
    marginBottom: 18,
  },
  heroPip: { position: "absolute", right: -12, bottom: 14 },
  bubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 11,
    alignSelf: "center",
    marginBottom: 4,
    transform: [{ rotate: "4deg" }],
  },
  goal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    padding: 16,
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 17,
    backgroundColor: "white",
    marginTop: 17,
  },
  goalIcon: {
    width: 39,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#faf3e3",
    alignItems: "center",
    justifyContent: "center",
  },
  streak: { borderLeftWidth: 1, borderColor: c.line, paddingLeft: 12, alignItems: "center" },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 17,
  },
  mapCard: {
    borderWidth: 1,
    borderColor: "#e1e7d6",
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "white",
  },
  unitHead: { padding: 19, flexDirection: "row", alignItems: "center", gap: 13 },
  unitIcon: {
    width: 43,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#f0f5e5",
    alignItems: "center",
    justifyContent: "center",
  },
  unitMenu: { padding: 5, borderWidth: 1, borderColor: "#e9efdd", borderRadius: 8 },
  mapLand: { height: 650, overflow: "hidden", backgroundColor: "#dcebbc" },
  landscape: { position: "absolute", left: "50%", marginLeft: -280, top: 0 },
  mapTag: {
    position: "absolute",
    right: 13,
    top: 16,
    backgroundColor: "#f9fbe9dd",
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 14,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  node: { position: "absolute", width: 150, marginLeft: -75, alignItems: "center" },
  nodeButton: {
    width: 72,
    height: 72,
    borderRadius: 40,
    backgroundColor: "#8bb952",
    borderWidth: 5,
    borderColor: "white",
    borderBottomWidth: 8,
    shadowColor: "#477833",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  locked: { backgroundColor: "#e3e9d4", borderColor: "#fafbec", shadowColor: "#869a71" },
  done: { backgroundColor: "#559d7e" },
  nodeBadge: {
    position: "absolute",
    right: -5,
    bottom: -8,
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fafbea",
    backgroundColor: "#68993e",
    alignItems: "center",
    justifyContent: "center",
  },
  nodeLabel: {
    fontSize: 10,
    fontFamily: "PoppinsSemi",
    color: "#5e7d43",
    marginTop: 15,
    backgroundColor: "#d8e8b9d9",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  nodeSub: { fontSize: 7, color: "#8fa674", marginTop: 3 },
  flag: {
    position: "absolute",
    top: -29,
    backgroundColor: "white",
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e5ecd8",
  },
  mapFoot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#fcfdf7",
  },
  quick: {
    flex: 1,
    padding: 19,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 19,
  },
  quickIcon: {
    width: 42,
    height: 46,
    backgroundColor: "#edf4e2",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tip: {
    backgroundColor: "#eff4e5",
    borderWidth: 1,
    borderColor: "#e4ebd6",
    borderRadius: 18,
    marginTop: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
