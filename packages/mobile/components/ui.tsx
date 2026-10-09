import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  type TextProps,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { pipXml } from "../lib/art";
import { useColors } from "../hooks/use-colors";
import { useProgress, streak } from "../lib/progress";
export const c = {
  forest: "#203d2c",
  green: "#78a747",
  lime: "#c4e593",
  bg: "#f8f9f3",
  muted: "#8b957f",
  line: "#e5eada",
  cream: "#ebf2d9",
};
export function Txt({ style, ...props }: TextProps) {
  return <Text {...props} style={[{ fontFamily: "Poppins", color: c.forest }, style]} />;
}
export function Pip({ size = 150 }: { size?: number }) {
  return <SvgXml xml={pipXml} width={size} height={size * 0.91} />;
}
export function Icon({
  name,
  size = 20,
  color = c.green,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
}) {
  return <Ionicons name={name} size={size} color={color} />;
}
export function Button({
  title,
  onPress,
  disabled = false,
  light = false,
  icon = "arrow-forward",
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  light?: boolean;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  style?: ViewStyle;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        light && s.light,
        style,
        { opacity: disabled ? 0.4 : pressed ? 0.8 : 1 },
      ]}
    >
      <Txt style={[s.buttonText, light && { color: c.green }]}>{title}</Txt>
      <Icon name={icon} size={17} color={light ? c.green : "#fff"} />
    </Pressable>
  );
}
export function Screen({
  children,
  title,
  subtitle,
  scroll = true,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  scroll?: boolean;
}) {
  const colors = useColors();
  const { progress } = useProgress();
  const content = (
    <>
      <View style={s.top}>
        <View style={s.brand}>
          <View style={s.logo}>
            <Icon name="code-slash" size={20} />
          </View>
          <Txt style={s.brandText}>
            py<Txt style={{ color: c.green, fontFamily: "PoppinsBold" }}>lingo</Txt>
          </Txt>
        </View>
        <View style={s.stats}>
          <Icon name="flame" size={18} color="#d7a251" />
          <Txt style={s.stat}>{streak(progress.dates)}</Txt>
          <Icon name="diamond" size={17} color="#82b1bd" />
          <Txt style={s.stat}>{progress.gems}</Txt>
          <View style={s.avatar}>
            <Icon name="person" size={17} color="#878969" />
          </View>
        </View>
      </View>
      {title && (
        <View style={s.heading}>
          <Txt style={s.eyebrow}>YOUR PYTHON JOURNEY</Txt>
          <Txt style={s.title}>{title}</Txt>
          {subtitle && <Txt style={s.subtitle}>{subtitle}</Txt>}
        </View>
      )}
      {children}
    </>
  );
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {scroll ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 26 }}
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export const s = StyleSheet.create({
  button: {
    borderRadius: 13,
    backgroundColor: c.forest,
    paddingHorizontal: 18,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#142c1d",
  },
  buttonText: { fontSize: 12, fontFamily: "PoppinsSemi", color: "#fff" },
  light: { backgroundColor: "#eef5e2", borderBottomColor: "#dce8c9" },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 24,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 8 },
  logo: {
    width: 32,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#edf3e2",
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: { fontFamily: "PoppinsBold", fontSize: 25, letterSpacing: -1.2 },
  stats: { flexDirection: "row", alignItems: "center", gap: 6 },
  stat: { fontSize: 11, marginRight: 8, fontFamily: "PoppinsSemi", color: "#93a078" },
  avatar: {
    width: 29,
    height: 29,
    borderRadius: 18,
    backgroundColor: "#eae2c9",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  heading: { marginBottom: 23 },
  eyebrow: { fontSize: 8, letterSpacing: 1.4, color: "#95a184", fontFamily: "PoppinsSemi" },
  title: {
    fontSize: 25,
    fontFamily: "PoppinsSemi",
    letterSpacing: -0.8,
    lineHeight: 35,
    marginTop: 8,
  },
  subtitle: { fontSize: 10, color: c.muted, lineHeight: 19, marginTop: 7 },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: "white",
    padding: 20,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  sectionTitle: { fontSize: 16, fontFamily: "PoppinsSemi", letterSpacing: -0.3 },
  small: { fontSize: 10, color: c.muted, lineHeight: 19 },
  track: { height: 7, borderRadius: 5, backgroundColor: "#eef1e7", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 5, backgroundColor: "#a6cc72" },
});
