import { useState } from "react";
import { View, Pressable, TextInput, StyleSheet } from "react-native";
import { router } from "expo-router";
import { units } from "../lib/course";
import { useProgress, streak } from "../lib/progress";
import { Txt, Icon, Button, Pip, Screen, c, s } from "./ui";
import { Lesson, type LessonSelection } from "./lesson";
import { Onboarding } from "./onboarding";
const icons = [
  "leaf-outline",
  "git-branch-outline",
  "repeat-outline",
  "layers-outline",
  "code-slash",
  "document-text-outline",
  "cube-outline",
  "sparkles-outline",
] as const;
export function Courses() {
  const { progress, update } = useProgress();
  return (
    <Screen
      title="A whole world\nof Python."
      subtitle="From your first hello to confident, creative coding."
    >
      <View style={styles.catalogSummary}>
        <View style={styles.summaryIcon}>
          <Icon name="trail-sign-outline" size={28} />
        </View>
        <View>
          <Txt style={{ fontSize: 14, fontFamily: "PoppinsSemi" }}>
            8 units. Endless possibilities.
          </Txt>
          <Txt style={[s.small, { fontSize: 9, marginTop: 4 }]}>
            {progress.completed.length} of 32 lessons complete
          </Txt>
        </View>
      </View>
      <View style={{ gap: 14 }}>
        {units.map((unit, i) => {
          const n = unit.lessons.filter((_, l) => progress.completed.includes(`${i}-${l}`)).length;
          return (
            <Pressable
              key={unit.title}
              accessibilityRole="button"
              accessibilityLabel={`Unit ${i + 1}: ${unit.title}`}
              onPress={() => {
                update({ unit: i });
                router.push("/(tabs)");
              }}
              style={styles.unitCard}
            >
              <View style={styles.unitTop}>
                <View
                  style={[
                    styles.catalogIcon,
                    { backgroundColor: ["#edf4df", "#f7eedf", "#e7f2f3", "#f6e9ed"][i % 4] },
                  ]}
                >
                  <Icon
                    name={icons[i]}
                    size={26}
                    color={["#86a361", "#c4a16f", "#86acb5", "#b2919b"][i % 4]}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Txt style={[s.eyebrow, { fontSize: 7 }]}>
                    UNIT {i + 1} · {i < 2 ? "BEGINNER" : i < 5 ? "INTERMEDIATE" : "ADVANCED"}
                  </Txt>
                  <Txt style={{ fontSize: 15, fontFamily: "PoppinsSemi", marginTop: 5 }}>
                    {unit.title}
                  </Txt>
                </View>
                <Icon name="chevron-forward" size={18} color="#a2af90" />
              </View>
              <Txt style={[s.small, { marginTop: 14, fontSize: 10 }]}>{unit.subtitle}</Txt>
              <View style={[s.track, { marginTop: 17, height: 5 }]}>
                <View style={[s.fill, { width: `${(n / 4) * 100}%` }]} />
              </View>
              <Txt style={{ fontSize: 8, color: "#9da98d", marginTop: 8 }}>
                {n} / 4 lessons · {unit.lessons.join(" · ")}
              </Txt>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}
export function Practice() {
  const [lesson, setLesson] = useState<LessonSelection | null>(null);
  return (
    <Screen
      title="Small practice.\nBig progress."
      subtitle="Build your confidence, one concept at a time."
    >
      <View style={styles.practiceHero}>
        <Pip size={137} />
        <View style={{ flex: 1 }}>
          <Txt style={s.eyebrow}>MAKE IT STICK</Txt>
          <Txt style={{ fontSize: 20, fontFamily: "PoppinsSemi", lineHeight: 28, marginTop: 9 }}>
            Python is a language. Let’s speak it.
          </Txt>
          <Txt style={[s.small, { fontSize: 9, marginTop: 8 }]}>
            3 little questions. A little more confidence.
          </Txt>
        </View>
      </View>
      <View style={{ gap: 13 }}>
        {units.map((unit, i) => (
          <View key={unit.title} style={styles.practiceCard}>
            <View style={styles.unitTop}>
              <View style={styles.catalogIcon}>
                <Icon name={icons[i]} size={24} />
              </View>
              <View style={{ flex: 1 }}>
                <Txt style={{ fontSize: 13, fontFamily: "PoppinsSemi" }}>{unit.title}</Txt>
                <Txt style={{ fontSize: 9, color: c.muted, marginTop: 5 }}>
                  3 questions · +30 XP
                </Txt>
              </View>
            </View>
            <Button
              title="Let’s practice"
              light
              onPress={() => setLesson({ unit: i, lesson: 0, practice: true })}
              style={{ paddingVertical: 10, marginTop: 17 }}
            />
          </View>
        ))}
      </View>
      {lesson && <Lesson selection={lesson} close={() => setLesson(null)} />}
    </Screen>
  );
}
export function Awards() {
  const { progress } = useProgress();
  const badges = [
    {
      name: "First steps",
      desc: "Complete your first lesson",
      icon: "leaf-outline",
      done: progress.completed.length > 0,
    },
    {
      name: "Trailblazer",
      desc: "Finish a full unit",
      icon: "trail-sign-outline",
      done: units.some((u, i) =>
        u.lessons.every((_, l) => progress.completed.includes(`${i}-${l}`)),
      ),
    },
    {
      name: "On a roll",
      desc: "Learn 3 days in a row",
      icon: "flame-outline",
      done: streak(progress.dates) >= 3,
    },
    {
      name: "Python explorer",
      desc: "Earn your first 100 XP",
      icon: "compass-outline",
      done: progress.xp >= 100,
    },
    {
      name: "Code collector",
      desc: "Complete 12 lessons",
      icon: "code-slash",
      done: progress.completed.length >= 12,
    },
    {
      name: "Python pro",
      desc: "Complete all 32 lessons",
      icon: "school-outline",
      done: progress.completed.length === 32,
    },
  ];
  return (
    <Screen
      title="Look how far\nyou’ve come."
      subtitle="Every little win deserves a little celebration."
    >
      <View style={styles.awardSummary}>
        <View style={styles.summaryIcon}>
          <Icon name="trophy-outline" size={32} />
        </View>
        <View>
          <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 24 }}>{progress.xp} XP</Txt>
          <Txt style={[s.small, { fontSize: 9 }]}>
            {progress.completed.length} lessons. Countless possibilities.
          </Txt>
        </View>
      </View>
      <View style={styles.badgeGrid}>
        {badges.map((b) => (
          <View
            key={b.name}
            style={[styles.badge, b.done && { borderColor: "#c5dba3", backgroundColor: "#fbfdf5" }]}
          >
            <View style={[styles.badgeIcon, b.done && { backgroundColor: "#e9f4d8" }]}>
              <Icon name={b.icon as any} size={31} color={b.done ? "#8ab25a" : "#bac5ab"} />
            </View>
            <Txt
              style={{
                fontSize: 13,
                fontFamily: "PoppinsSemi",
                textAlign: "center",
                marginTop: 15,
              }}
            >
              {b.name}
            </Txt>
            <Txt
              style={{
                fontSize: 9,
                color: "#a0ac91",
                textAlign: "center",
                lineHeight: 18,
                marginTop: 6,
              }}
            >
              {b.desc}
            </Txt>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                marginTop: 15,
              }}
            >
              <Icon
                name={b.done ? "checkmark-circle" : "lock-closed-outline"}
                size={11}
                color={b.done ? c.green : "#afb99f"}
              />
              <Txt style={{ fontSize: 7, color: b.done ? c.green : "#afb99f" }}>
                {b.done ? "Unlocked" : "Keep exploring"}
              </Txt>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.awardTip}>
        <Pip size={118} />
        <Txt style={{ fontSize: 12, color: "#8c9d73", lineHeight: 23, flex: 1 }}>
          Every expert was once a beginner. Keep taking those little steps.
        </Txt>
      </View>
    </Screen>
  );
}
export function Profile() {
  const { progress, update, storageError } = useProgress();
  const [onboarding, setOnboarding] = useState(false);
  return (
    <Screen title="Your adventure.\nYour own pace." subtitle="A curious mind is all you need.">
      <View style={styles.profileArt}>
        <Pip size={185} />
        <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 23, marginTop: 12 }}>
          Hello, {progress.name}.
        </Txt>
        <View style={styles.levelChip}>
          <Icon name="leaf-outline" size={13} />
          <Txt style={{ fontSize: 9, color: c.green }}>
            Level {Math.floor(progress.xp / 100) + 1} explorer
          </Txt>
        </View>
      </View>
      <View style={styles.profileStats}>
        {[
          { value: progress.xp, label: "TOTAL XP" },
          { value: progress.completed.length, label: "LESSONS" },
          { value: streak(progress.dates), label: "DAY STREAK" },
        ].map((item) => (
          <View key={item.label} style={{ alignItems: "center", flex: 1 }}>
            <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 26, color: "#789d51" }}>
              {item.value}
            </Txt>
            <Txt style={{ fontSize: 7, color: "#a1ac91", letterSpacing: 0.7, marginTop: 7 }}>
              {item.label}
            </Txt>
          </View>
        ))}
      </View>
      <View style={[s.card, { marginTop: 22 }]}>
        <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 13 }}>Make this journey yours</Txt>
        <Txt style={[s.small, { marginTop: 22, fontSize: 10 }]}>Your explorer name</Txt>
        <TextInput
          accessibilityLabel="Your explorer name"
          value={progress.name}
          maxLength={20}
          onChangeText={(name) => update({ name })}
          style={styles.input}
        />
        <Txt style={[s.small, { marginTop: 23, fontSize: 10 }]}>Daily learning goal</Txt>
        <View style={styles.goals}>
          {[5, 10, 20].map((g) => (
            <Pressable
              key={g}
              accessibilityRole="button"
              accessibilityLabel={`${g} minute goal`}
              onPress={() => update({ goal: g })}
              style={[
                styles.goal,
                progress.goal === g && { backgroundColor: "#edf5df", borderColor: "#accd83" },
              ]}
            >
              <Txt
                style={{
                  fontFamily: "PoppinsSemi",
                  fontSize: 14,
                  color: progress.goal === g ? c.green : "#9aa68a",
                }}
              >
                {g} min
              </Txt>
              <Txt style={{ fontSize: 7, color: "#a3af94", marginTop: 5 }}>
                {g === 5 ? "A little spark" : g === 10 ? "Steady growth" : "Big adventure"}
              </Txt>
            </Pressable>
          ))}
        </View>
      </View>
      <Button
        title="Meet Pip again"
        icon="refresh-outline"
        light
        onPress={() => setOnboarding(true)}
        style={{ marginTop: 20 }}
      />
      <View style={styles.privacy}>
        <Icon name="shield-checkmark-outline" size={18} color="#a6b594" />
        <Txt
          style={{
            fontSize: 9,
            lineHeight: 19,
            color: "#a1ad94",
            textAlign: "center",
            maxWidth: 270,
          }}
        >
          {storageError
            ? "Storage is unavailable. Progress may not survive an app restart."
            : "Your progress is saved on this device. No account needed. Web and mobile progress are separate."}
        </Txt>
      </View>
      {onboarding && (
        <Onboarding close={() => setOnboarding(false)} finish={() => setOnboarding(false)} />
      )}
    </Screen>
  );
}
const styles = StyleSheet.create({
  catalogSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 20,
    backgroundColor: "#eef4e1",
    borderRadius: 19,
    marginBottom: 22,
  },
  summaryIcon: {
    width: 49,
    height: 54,
    borderRadius: 15,
    backgroundColor: "#e2edcd",
    alignItems: "center",
    justifyContent: "center",
  },
  unitCard: {
    padding: 21,
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 20,
    backgroundColor: "white",
  },
  unitTop: { flexDirection: "row", gap: 13, alignItems: "center" },
  catalogIcon: {
    width: 46,
    height: 51,
    borderRadius: 13,
    backgroundColor: "#eef4e4",
    alignItems: "center",
    justifyContent: "center",
  },
  practiceHero: {
    backgroundColor: "#eef4e1",
    padding: 18,
    borderRadius: 21,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 23,
  },
  practiceCard: {
    backgroundColor: "white",
    padding: 20,
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 19,
  },
  awardSummary: {
    flexDirection: "row",
    gap: 17,
    alignItems: "center",
    padding: 23,
    backgroundColor: "#eef4df",
    borderRadius: 20,
    marginBottom: 24,
  },
  badgeGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 13 },
  badge: {
    width: "47.5%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 20,
    paddingVertical: 26,
    paddingHorizontal: 13,
  },
  badgeIcon: {
    width: 67,
    height: 73,
    borderRadius: 20,
    backgroundColor: "#f0f2e9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  awardTip: {
    backgroundColor: "#f0f4e6",
    marginTop: 22,
    borderRadius: 19,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileArt: { alignItems: "center", padding: 15, backgroundColor: "#eef4df", borderRadius: 22 },
  levelChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#d8e6c2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#f7faef",
  },
  profileStats: {
    flexDirection: "row",
    paddingVertical: 27,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 19,
    marginTop: 20,
  },
  input: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: c.forest,
    padding: 15,
    borderWidth: 1,
    borderColor: "#dee6d2",
    borderRadius: 11,
    backgroundColor: "#fafcf6",
    marginTop: 9,
  },
  goals: { flexDirection: "row", gap: 8, marginTop: 12 },
  goal: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 11,
    alignItems: "center",
  },
  privacy: { alignItems: "center", gap: 10, marginTop: 25 },
});
