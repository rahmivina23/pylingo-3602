import { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import { lessonQuestions, normalize, units } from "../lib/course";
import { useProgress } from "../lib/progress";
import { Pip, Txt, Button, Icon, c, s } from "./ui";
export type LessonSelection = { unit: number; lesson: number; practice?: boolean };
export function Lesson({ selection, close }: { selection: LessonSelection; close: () => void }) {
  const { complete } = useProgress();
  const qs = lessonQuestions(selection.unit, selection.lesson);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [done, setDone] = useState(false);
  const [typed, setTyped] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [hint, setHint] = useState(false);
  const recognizer = useRef<any>(null);
  const subscriptions = useRef<{ remove: () => void }[]>([]);
  const q = qs[step];
  const stop = () => {
    try {
      recognizer.current?.stop();
    } catch {
      /* Already stopped */
    }
    setListening(false);
  };
  useEffect(
    () => () => {
      try {
        recognizer.current?.stop();
      } catch {
        /* Missing native module */
      }
      subscriptions.current.forEach((s) => s.remove());
      void Speech.stop();
    },
    [],
  );
  const fallback = (message: string) => {
    setSpeechError(message);
    setTyped(true);
    setListening(false);
  };
  const listen = async () => {
    if (listening) {
      stop();
      return;
    }
    setSpeechError("");
    if (Platform.OS === "web") {
      const R =
        (globalThis as any).SpeechRecognition || (globalThis as any).webkitSpeechRecognition;
      if (!R) {
        fallback("Microphone recognition is unavailable here. Type your answer instead.");
        return;
      }
      try {
        const r = new R();
        recognizer.current = r;
        r.lang = "en-US";
        r.continuous = false;
        r.interimResults = false;
        r.onresult = (e: any) => {
          setAnswer(e.results[0][0].transcript);
          setListening(false);
        };
        r.onerror = (e: any) =>
          fallback(
            e.error === "not-allowed"
              ? "Microphone permission was denied. You can type instead."
              : "We couldn’t hear that. Try again, or type your answer.",
          );
        r.onend = () => setListening(false);
        r.start();
        setListening(true);
      } catch {
        fallback("Microphone unavailable. You can still type your answer.");
      }
      return;
    }
    try {
      const { ExpoSpeechRecognitionModule: m } = require("expo-speech-recognition");
      subscriptions.current.forEach((s) => s.remove());
      subscriptions.current = [];
      recognizer.current = m;
      const permission = await m.requestPermissionsAsync();
      if (!permission.granted) {
        fallback("Microphone permission was denied. You can type instead.");
        return;
      }
      subscriptions.current = [
        m.addListener("result", (e: any) => {
          if (e.results[0]) setAnswer(e.results[0].transcript);
        }),
        m.addListener("end", () => setListening(false)),
        m.addListener("error", () =>
          fallback("Speech recognition couldn’t start. Try typing your answer."),
        ),
      ];
      m.start({ lang: "en-US", interimResults: false, continuous: false });
      setListening(true);
    } catch {
      fallback(
        "Voice recognition needs a published or development build, not Expo Go. Type your answer here instead.",
      );
    }
  };
  const check = () => {
    stop();
    setResult(
      [q.answer, ...(q.aliases || [])].some((a) => normalize(a) === normalize(answer))
        ? "correct"
        : "wrong",
    );
  };
  const next = () => {
    if (step === 2) {
      complete(selection.unit, selection.lesson, selection.practice);
      setDone(true);
    } else {
      setStep(step + 1);
      setAnswer("");
      setResult(null);
      setTyped(false);
      setSpeechError("");
      setHint(false);
    }
  };
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
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close lesson"
                onPress={close}
                style={styles.close}
              >
                <Icon name="close" color={c.muted} />
              </Pressable>
              <View style={[s.track, { flex: 1 }]}>
                <View style={[s.fill, { width: `${done ? 100 : (step / 3) * 100}%` }]} />
              </View>
              <View style={s.row}>
                <Icon name="heart" size={20} color="#d99184" />
                <Txt style={{ fontSize: 11, color: "#bc9380" }}>5</Txt>
              </View>
            </View>
            {done ? (
              <View style={styles.success}>
                <View style={styles.successArt}>
                  <Pip size={250} />
                </View>
                <Txt style={[s.eyebrow, { textAlign: "center" }]}>A LITTLE WIN. A BIG STEP.</Txt>
                <Txt style={styles.successTitle}>Look at you grow!</Txt>
                <Txt style={[s.small, { textAlign: "center", fontSize: 12, lineHeight: 23 }]}>
                  You’ve just added a little more Python to your world. Pip is proud of you.
                </Txt>
                <View style={styles.rewards}>
                  <View style={styles.reward}>
                    <Icon name="flash" size={27} />
                    <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 16, color: c.green }}>
                      +30 XP
                    </Txt>
                  </View>
                  <View
                    style={[styles.reward, { backgroundColor: "#e9f3f5", borderColor: "#dbe9ee" }]}
                  >
                    <Icon name="diamond" size={27} color="#83afbd" />
                    <Txt style={{ fontFamily: "PoppinsSemi", fontSize: 16, color: "#83afbd" }}>
                      +5 gems
                    </Txt>
                  </View>
                </View>
                <View style={{ flex: 1, minHeight: 35 }} />
                <Button title="Back to my adventure" onPress={close} />
              </View>
            ) : (
              <>
                <View style={styles.lessonHeading}>
                  <Txt style={s.eyebrow}>
                    {selection.practice
                      ? "QUICK PRACTICE"
                      : `UNIT ${selection.unit + 1} · LESSON ${selection.lesson + 1}`}
                  </Txt>
                  <Txt style={{ fontSize: 13, fontFamily: "PoppinsSemi", marginTop: 5 }}>
                    {units[selection.unit].lessons[selection.lesson]}
                  </Txt>
                </View>
                <View style={styles.kind}>
                  <Icon name={q.spoken ? "mic-outline" : "code-slash"} size={17} />
                  <Txt style={[s.eyebrow, { color: "#8da671" }]}>
                    {q.spoken ? "SPEAK & CHECK" : "THINK LIKE A CODER"}
                  </Txt>
                  <Txt style={{ fontSize: 9, color: "#9ba889", marginLeft: "auto" }}>
                    {step + 1}/3
                  </Txt>
                </View>
                <Txt style={styles.question}>{q.prompt}</Txt>
                {q.code && (
                  <View style={styles.code}>
                    <Txt style={{ fontSize: 8, color: "#a6bb90", letterSpacing: 1.3 }}>
                      PYTHON 3
                    </Txt>
                    <Txt style={styles.codeText}>{q.code}</Txt>
                  </View>
                )}
                {q.spoken ? (
                  <View style={styles.speak}>
                    <View style={styles.pipQuestion}>
                      <Pip size={122} />
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Hear the question"
                        onPress={() => {
                          void Speech.stop();
                          Speech.speak(q.prompt, { language: "en-US", rate: 0.88 });
                        }}
                        style={styles.hear}
                      >
                        <Icon name="volume-high-outline" size={17} />
                        <Txt style={{ fontSize: 10, color: c.green }}>Hear the question</Txt>
                      </Pressable>
                    </View>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={listening ? "Stop microphone" : "Start microphone"}
                      disabled={result === "correct"}
                      onPress={() => void listen()}
                      style={[styles.mic, listening && { backgroundColor: "#bedf8d" }]}
                    >
                      <Icon name="mic" size={35} />
                    </Pressable>
                    <Txt
                      style={{ fontSize: 12, color: c.muted, textAlign: "center", marginTop: 17 }}
                    >
                      {listening
                        ? "Listening… say your answer"
                        : answer
                          ? `You said: “${answer}”`
                          : "Tap the mic and say your answer"}
                    </Txt>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => setTyped(!typed)}
                      style={styles.typeButton}
                    >
                      <Icon name="keypad-outline" size={16} />
                      <Txt style={{ fontSize: 10, color: c.green }}>
                        {typed ? "Hide keyboard" : "I’d rather type"}
                      </Txt>
                    </Pressable>
                    {speechError && (
                      <Txt accessibilityLiveRegion="polite" style={styles.error}>
                        {speechError}
                      </Txt>
                    )}
                    {typed && (
                      <TextInput
                        accessibilityLabel="Your answer"
                        placeholder="Type your answer…"
                        placeholderTextColor="#a5af98"
                        value={answer}
                        onChangeText={(t) => {
                          setAnswer(t);
                          setResult(null);
                        }}
                        editable={result !== "correct"}
                        style={styles.input}
                        autoCapitalize="none"
                      />
                    )}
                  </View>
                ) : (
                  <View style={{ gap: 13 }}>
                    {q.options?.map((a, i) => (
                      <Pressable
                        key={a}
                        accessibilityRole="button"
                        accessibilityLabel={`Answer ${i + 1}: ${a}`}
                        disabled={result === "correct"}
                        onPress={() => {
                          setAnswer(a);
                          setResult(null);
                        }}
                        style={[
                          styles.option,
                          answer === a && {
                            backgroundColor: "#eef6df",
                            borderColor: "#a5c580",
                            borderBottomColor: "#a5c580",
                          },
                        ]}
                      >
                        <View style={styles.number}>
                          <Txt style={{ fontSize: 10, color: "#9baa88" }}>{i + 1}</Txt>
                        </View>
                        <Txt
                          style={{
                            fontSize: 13,
                            fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
                            flex: 1,
                          }}
                        >
                          {a}
                        </Txt>
                        {answer === a && <Icon name="checkmark-circle-outline" size={21} />}
                      </Pressable>
                    ))}
                  </View>
                )}
                {result && (
                  <View
                    style={[styles.feedback, result === "wrong" && { backgroundColor: "#fbf0dd" }]}
                  >
                    <Txt
                      accessibilityLiveRegion="polite"
                      style={{
                        fontFamily: "PoppinsSemi",
                        fontSize: 12,
                        color: result === "wrong" ? "#aa8252" : "#6b8c43",
                      }}
                    >
                      {result === "correct"
                        ? "That’s it. Nicely done!"
                        : "Not quite. Give it another go."}
                    </Txt>
                    <Txt style={{ fontSize: 10, lineHeight: 20, marginTop: 6, color: "#8c9c77" }}>
                      {result === "correct"
                        ? q.explanation
                        : "A wrong turn is part of the adventure."}
                    </Txt>
                    {result === "wrong" && (
                      <Pressable accessibilityRole="button" onPress={() => setHint(!hint)}>
                        <Txt style={{ fontSize: 10, color: "#a58153", marginTop: 8 }}>
                          {hint ? q.explanation : "Show a hint"}
                        </Txt>
                      </Pressable>
                    )}
                  </View>
                )}
                <View style={{ flex: 1, minHeight: 28 }} />
                <Button
                  disabled={!answer || listening}
                  title={
                    result === "correct"
                      ? step === 2
                        ? "Finish lesson"
                        : "Continue"
                      : "Check answer"
                  }
                  onPress={result === "correct" ? next : check}
                />
                <Txt style={styles.note}>Little lessons. Lasting skills.</Txt>
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25 },
  top: { flexDirection: "row", alignItems: "center", gap: 18, marginBottom: 26 },
  close: { padding: 8, backgroundColor: "#edf2e5", borderRadius: 30 },
  lessonHeading: { marginBottom: 26 },
  kind: { flexDirection: "row", gap: 7, alignItems: "center" },
  question: {
    fontFamily: "PoppinsSemi",
    fontSize: 25,
    letterSpacing: -0.7,
    lineHeight: 36,
    marginTop: 15,
    marginBottom: 26,
  },
  code: { backgroundColor: "#263e2d", padding: 23, borderRadius: 17, marginBottom: 23 },
  codeText: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 14,
    lineHeight: 24,
    color: "#e3efce",
    marginTop: 15,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRadius: 13,
    borderColor: "#e0e6d4",
    paddingVertical: 19,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  number: {
    borderWidth: 1,
    borderColor: "#e1e8d5",
    height: 26,
    width: 26,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  feedback: { backgroundColor: "#eaf5df", padding: 18, borderRadius: 14, marginTop: 23 },
  speak: { alignItems: "center" },
  pipQuestion: { flexDirection: "row", alignItems: "center", gap: 13 },
  hear: {
    padding: 11,
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "white",
  },
  mic: {
    width: 90,
    height: 90,
    backgroundColor: "#e2efd1",
    borderRadius: 50,
    borderWidth: 6,
    borderColor: "#eef5e1",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  typeButton: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 20 },
  error: {
    backgroundColor: "#fbf0dd",
    fontSize: 10,
    color: "#a68253",
    lineHeight: 20,
    padding: 14,
    borderRadius: 11,
    marginTop: 18,
  },
  input: {
    fontFamily: "Poppins",
    fontSize: 14,
    padding: 17,
    borderWidth: 1,
    borderColor: "#d8e2c9",
    borderRadius: 13,
    backgroundColor: "white",
    width: "100%",
    marginTop: 20,
    color: c.forest,
  },
  note: { fontSize: 9, color: "#a6af9a", textAlign: "center", marginTop: 18 },
  success: { flex: 1, alignItems: "stretch" },
  successArt: { alignItems: "center", marginTop: 12, marginBottom: 25 },
  successTitle: {
    fontFamily: "PoppinsSemi",
    fontSize: 31,
    textAlign: "center",
    letterSpacing: -1,
    marginTop: 12,
    marginBottom: 17,
  },
  rewards: { flexDirection: "row", gap: 15, justifyContent: "center", marginTop: 32 },
  reward: {
    gap: 10,
    padding: 22,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#e0ebcc",
    backgroundColor: "#eef6df",
    alignItems: "center",
    flex: 1,
  },
});
