import { useState } from "react";
import {
  Modal,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProgress } from "../lib/progress";
import { Pip, Txt, Button, Icon, c, s } from "./ui";
export function Onboarding({ close, finish }: { close: () => void; finish: () => void }) {
  const { progress, update } = useProgress();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(progress.name === "Explorer" ? "" : progress.name);
  const [goal, setGoal] = useState(progress.goal);
  return (
    <Modal animationType="slide" onRequestClose={close}>
      <SafeAreaView
        edges={["top", "left", "right", "bottom"]}
        style={{ flex: 1, backgroundColor: c.bg }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
            <View style={styles.top}>
              <Txt style={s.eyebrow}>A NEW ADVENTURE</Txt>
              <Pressable
                accessibilityLabel="Close onboarding"
                accessibilityRole="button"
                onPress={close}
                style={styles.close}
              >
                <Icon name="close" color={c.muted} />
              </Pressable>
            </View>
            <View style={styles.art}>
              <View style={styles.orbit} />
              <View style={styles.spark}>
                <Icon name="code-slash" size={27} />
              </View>
              <Pip size={230} />
              <View style={styles.star}>
                <Icon name="star-outline" size={23} />
              </View>
            </View>
            <View style={styles.dots}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={[styles.dot, step === i && styles.activeDot]} />
              ))}
            </View>
            <Txt style={[s.eyebrow, { textAlign: "center" }]}>
              {["YOUR ADVENTURE STARTS HERE", "LET’S MAKE THIS YOURS", "A LITTLE EVERY DAY"][step]}
            </Txt>
            <Txt style={styles.title}>
              {
                [
                  "Hi, I’m Pip.\nLet’s learn Python!",
                  "What should\nI call you?",
                  "Find your\nlearning rhythm.",
                ][step]
              }
            </Txt>
            <Txt style={styles.desc}>
              {
                [
                  "A friendly guide, bite-sized lessons, and a whole world of possibilities. No experience needed.",
                  "Every adventure needs an explorer. Choose a name to make this journey your own.",
                  "Small, steady steps make great coders. Pick a daily goal that feels right for you.",
                ][step]
              }
            </Txt>
            {step === 1 && (
              <TextInput
                accessibilityLabel="Explorer name"
                placeholder="Your explorer name"
                placeholderTextColor="#a4ae95"
                maxLength={20}
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            )}{" "}
            {step === 2 && (
              <View style={{ gap: 10, marginTop: 23 }}>
                {[5, 10, 20].map((g, i) => (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${g} minute daily goal`}
                    key={g}
                    onPress={() => setGoal(g)}
                    style={[
                      styles.goal,
                      goal === g && { backgroundColor: "#edf5df", borderColor: "#a7c87e" },
                    ]}
                  >
                    <View>
                      <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 14 }}>{g} minutes</Txt>
                      <Txt style={[s.small, { fontSize: 9 }]}>
                        {["A little spark", "Steady growth", "A big adventure"][i]}
                      </Txt>
                    </View>
                    <Icon
                      name={g === goal ? "checkmark-circle" : "ellipse-outline"}
                      color={g === goal ? c.green : "#cbd5be"}
                    />
                  </Pressable>
                ))}
              </View>
            )}
            <View style={{ flex: 1, minHeight: 24 }} />
            <Button
              title={step === 2 ? "Start my adventure" : "Let’s go"}
              onPress={() => {
                if (step < 2) setStep(step + 1);
                else {
                  update({ name: name.trim() || "Explorer", goal, onboarded: true });
                  finish();
                }
              }}
            />
            {step > 0 && (
              <Pressable
                accessibilityRole="button"
                onPress={() => setStep(step - 1)}
                style={{ alignItems: "center", paddingTop: 19 }}
              >
                <Txt style={s.small}>Go back</Txt>
              </Pressable>
            )}
            <Txt style={styles.note}>Free to explore. Made for curious minds.</Txt>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 27 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  close: { padding: 8, borderRadius: 30, backgroundColor: "#eff3e6" },
  art: { height: 242, alignItems: "center", justifyContent: "center", marginTop: 12 },
  orbit: {
    position: "absolute",
    width: 240,
    height: 220,
    borderRadius: 140,
    backgroundColor: "#edf4df",
  },
  spark: { position: "absolute", left: 14, top: 52, transform: [{ rotate: "-15deg" }] },
  star: { position: "absolute", right: 19, bottom: 60 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 7, marginVertical: 21 },
  dot: { width: 6, height: 6, borderRadius: 4, backgroundColor: "#dce5cf" },
  activeDot: { width: 24, backgroundColor: "#8bb758" },
  title: {
    fontFamily: "PoppinsSemi",
    fontSize: 30,
    lineHeight: 41,
    letterSpacing: -1,
    textAlign: "center",
    marginTop: 12,
  },
  desc: { fontSize: 12, lineHeight: 23, color: c.muted, textAlign: "center", marginTop: 14 },
  input: {
    fontFamily: "Poppins",
    fontSize: 14,
    padding: 17,
    borderWidth: 1,
    borderColor: "#dbe4cc",
    borderRadius: 13,
    backgroundColor: "white",
    marginTop: 24,
    color: c.forest,
  },
  goal: {
    padding: 15,
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  note: { fontSize: 8, color: "#a2ad95", textAlign: "center", marginTop: 23 },
});
