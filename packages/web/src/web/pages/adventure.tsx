import { useState, useEffect, useRef } from "react";
import {
  Compass,
  BookOpen,
  Mic,
  Trophy,
  UserRound,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Flame,
  Gem,
  Heart,
  Bell,
  Check,
  LockKeyhole,
  Star,
  Sprout,
  Code2,
  Repeat2,
  Layers3,
  Signpost,
  FileCode2,
  Box,
  Sparkles,
  X,
  Volume2,
  Keyboard,
  Play,
  Settings,
  Target,
  Clock,
  Zap,
  Map,
  GraduationCap,
  Medal,
  RotateCcw,
} from "lucide-react";
import { Snake, Landscape, MountainBadge } from "../components/illustrations";
import { units, lessonQuestions, normalize, type Question } from "../lib/course";

const unitIcons = [Sprout, Signpost, Repeat2, Layers3, Code2, FileCode2, Box, Sparkles];
const navItems = [
  { name: "Adventure", icon: Compass },
  { name: "Courses", icon: BookOpen },
  { name: "Practice", icon: Mic },
  { name: "Achievements", icon: Trophy },
  { name: "Profile", icon: UserRound },
];
type Progress = {
  completed: string[];
  xp: number;
  gems: number;
  name: string;
  goal: number;
  minutes: number;
  minutesDate: string;
  goalRewardDates: string[];
  dates: string[];
  onboarded: boolean;
};
const initial: Progress = {
  completed: [],
  xp: 0,
  gems: 0,
  name: "Explorer",
  goal: 10,
  minutes: 0,
  minutesDate: "",
  goalRewardDates: [],
  dates: [],
  onboarded: false,
};
function load(): Progress {
  try {
    const p = { ...initial, ...JSON.parse(localStorage.getItem("python-adventure") || "{}") };
    return { ...p, minutes: p.minutesDate === today() ? p.minutes : 0 };
  } catch {
    return initial;
  }
}
function today() {
  return new Date().toLocaleDateString("en-CA");
}
function streak(dates: string[]) {
  let count = 0;
  const d = new Date();
  if (!dates.includes(today())) d.setDate(d.getDate() - 1);
  while (dates.includes(d.toLocaleDateString("en-CA"))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

export default function Adventure() {
  const [progress, setProgress] = useState<Progress>(load);
  const [page, setPage] = useState("Adventure");
  const [unit, setUnit] = useState(0);
  const [unitMenu, setUnitMenu] = useState(false);
  const [lesson, setLesson] = useState<{ unit: number; lesson: number; practice?: boolean } | null>(
    null,
  );
  const [onboarding, setOnboarding] = useState(false);
  const [notice, setNotice] = useState(false);
  const [goalEdit, setGoalEdit] = useState(false);
  useEffect(() => {
    localStorage.setItem("python-adventure", JSON.stringify(progress));
  }, [progress]);
  const complete = (u: number, l: number, practice?: boolean) => {
    setProgress((p) => {
      const minutes = (p.minutesDate === today() ? p.minutes : 0) + 3;
      const bonus = minutes >= p.goal && !p.goalRewardDates.includes(today());
      return {
        ...p,
        completed: practice ? p.completed : [...new Set([...p.completed, `${u}-${l}`])],
        xp: p.xp + 30 + (bonus ? 20 : 0),
        gems: p.gems + 5,
        minutes,
        minutesDate: today(),
        goalRewardDates: bonus ? [...p.goalRewardDates, today()] : p.goalRewardDates,
        dates: [...new Set([...p.dates, today()])],
      };
    });
  };
  const completedInUnit = progress.completed.filter((v) => v.startsWith(`${unit}-`)).length;
  const nextLesson = Math.min(3, completedInUnit);
  const current = units[unit];
  const Icon = unitIcons[unit];
  const start = () => {
    if (!progress.onboarded) setOnboarding(true);
    else setLesson({ unit, lesson: nextLesson });
  };
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a href="/" className="brand">
          <span className="brand-symbol">
            <Code2 size={23} />
          </span>
          <span>
            py<span className="brand-accent">lingo</span>
            <i>LEARN. CODE. GROW.</i>
          </span>
        </a>
        <div className="workspace-label">YOUR LEARNING SPACE</div>
        <nav>
          {navItems.map(({ name, icon: NavIcon }) => (
            <button
              key={name}
              className={`nav-item ${page === name ? "selected" : ""}`}
              onClick={() => setPage(name)}
            >
              <NavIcon size={21} />
              <span>{name}</span>
              {page === name && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-guide">
          <div className="small-snake">
            <Snake />
          </div>
          <h3>
            A little every day.
            <br />A big adventure ahead.
          </h3>
          <p>Your future self will thank you.</p>
          <button onClick={() => setOnboarding(true)}>
            Meet your guide <ArrowRight size={15} />
          </button>
        </div>
        <button className="sidebar-profile" onClick={() => setPage("Profile")}>
          <span className="avatar">
            <UserRound size={22} />
          </span>
          <span>
            <b>{progress.name}</b>
            <small>Python adventurer</small>
          </span>
          <Settings size={17} />
        </button>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <span>My learning</span>
            <ChevronRight size={14} />
            <b>{page}</b>
          </div>
          <div className="top-actions">
            <span className="course-chip">
              <Code2 size={17} /> Python <ChevronDown size={13} />
            </span>
            <div className="stat flame">
              <Flame size={21} fill="#fff0c8" />
              <b>{streak(progress.dates)}</b>
            </div>
            <div className="stat gem">
              <Gem size={20} fill="#ddf0fa" />
              <b>{progress.gems}</b>
            </div>
            <div className="stat heart">
              <Heart size={20} fill="#f7c8c2" />
              <b>5</b>
            </div>
            <button
              className="notification"
              aria-label="Notifications"
              onClick={() => setNotice(!notice)}
            >
              <Bell size={20} />
              <span />
            </button>
            <button
              className="top-avatar avatar"
              aria-label="View profile"
              onClick={() => setPage("Profile")}
            >
              <UserRound size={20} />
            </button>
          </div>
          {notice && (
            <div className="notification-panel">
              <b>Your adventure is waiting</b>
              <p>Complete a lesson today to earn 30 XP and keep your streak going.</p>
              <button
                onClick={() => {
                  setNotice(false);
                  start();
                }}
              >
                Let's do it <ArrowRight size={15} />
              </button>
            </div>
          )}
        </header>
        <div className="content-layout">
          <main className="main-content">
            <div className="page-heading">
              <div>
                <div className="eyebrow">
                  {page === "Adventure"
                    ? "A LITTLE PYTHON. A WORLD OF POSSIBILITIES."
                    : "YOUR PYTHON JOURNEY"}
                </div>
                <h1>
                  {page === "Adventure"
                    ? `Let’s keep growing, ${progress.name === "Explorer" ? "explorer" : progress.name}.`
                    : page === "Courses"
                      ? "A whole world of Python."
                      : page === "Practice"
                        ? "Small practice. Big progress."
                        : page === "Achievements"
                          ? "Look how far you’ve come."
                          : "Make this adventure yours."}
                </h1>
                <p>
                  {page === "Adventure"
                    ? "One small lesson today. One giant leap for your coding skills."
                    : page === "Courses"
                      ? "From your first hello to confident, creative coding."
                      : page === "Practice"
                        ? "Build your confidence, one concept at a time."
                        : page === "Achievements"
                          ? "Every little win deserves a little celebration."
                          : "Your goals, your pace, your Python journey."}
                </p>
              </div>
              {page === "Adventure" && (
                <span className="level-pill">
                  <span /> Level {Math.floor(progress.xp / 100) + 1} explorer
                </span>
              )}
            </div>
            {page === "Adventure" ? (
              <>
                <section className="welcome-card">
                  <div className="welcome-copy">
                    <div className="welcome-tag">
                      <Sparkles size={13} /> YOUR NEXT LITTLE WIN
                    </div>
                    <h2>
                      {progress.completed.length
                        ? "Ready for your next chapter?"
                        : "Big ideas start with a little code."}
                    </h2>
                    <p>
                      {progress.onboarded
                        ? "Pick up where you left off. Pip’s got your back."
                        : "Meet Pip, your guide to the wonderful world of Python."}
                    </p>
                    <button className="dark-button" onClick={start}>
                      {progress.onboarded ? "Continue learning" : "Let’s get started"}
                      <ArrowRight size={17} />
                    </button>
                    <span className="tiny-note">
                      <Clock size={13} /> Just 3 minutes · No experience needed
                    </span>
                  </div>
                  <div className="hero-illustration">
                    <div className="hero-bubble">
                      Hello, future coder!
                      <span />
                    </div>
                    <span className="code-float left">&lt;/&gt;</span>
                    <span className="code-float right">{"{ }"}</span>
                    <Snake />
                    <div className="hero-leaves" />
                  </div>
                </section>
                <div className="journey-heading">
                  <div>
                    <h2>Your adventure map</h2>
                    <p>A new skill around every bend.</p>
                  </div>
                  <button className="text-button" onClick={() => setPage("Courses")}>
                    View all units <ArrowRight size={15} />
                  </button>
                </div>
                <section className="map-card">
                  <div className="unit-header">
                    <span className="unit-icon">
                      <Icon size={25} />
                    </span>
                    <div>
                      <small>
                        UNIT {unit + 1} ·{" "}
                        {unit < 2 ? "BEGINNER" : unit < 5 ? "INTERMEDIATE" : "ADVANCED"}
                      </small>
                      <h3>{current.title}</h3>
                      <p>{current.subtitle}</p>
                    </div>
                    <div className="unit-select">
                      <button
                        className="unit-toggle"
                        aria-label="Choose course unit"
                        onClick={() => setUnitMenu(!unitMenu)}
                      >
                        <ChevronDown size={20} />
                      </button>
                      {unitMenu && (
                        <div className="unit-dropdown">
                          {units.map((u, i) => (
                            <button
                              key={u.title}
                              className={i === unit ? "active" : ""}
                              onClick={() => {
                                setUnit(i);
                                setUnitMenu(false);
                              }}
                            >
                              <span>0{i + 1}</span>
                              {u.title}
                              {i === unit && <Check size={15} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="map-land">
                    <Landscape />
                    <div className="map-progress">
                      <span className="progress-dot" />
                      {completedInUnit} of 4 lessons complete
                    </div>
                    {current.lessons.map((name, i) => {
                      const done = progress.completed.includes(`${unit}-${i}`);
                      const locked = i > 0 && !progress.completed.includes(`${unit}-${i - 1}`);
                      const coords = [
                        { left: "49%", top: 72 },
                        { left: "66%", top: 221 },
                        { left: "34%", top: 348 },
                        { left: "41%", top: 518 },
                      ];
                      const NodeIcon = [Code2, Box, Repeat2, Star][i];
                      return (
                        <div
                          key={name}
                          className={`level-node level-${i} ${done ? "done" : locked ? "locked" : "available"}`}
                          style={coords[i]}
                        >
                          {!locked && !done && (
                            <span className="start-flag">{i === 0 ? "START HERE" : "UP NEXT"}</span>
                          )}
                          <button
                            aria-label={`${name}${locked ? " — locked" : ""}`}
                            onClick={() => {
                              if (!locked) setLesson({ unit, lesson: i });
                            }}
                            disabled={locked}
                          >
                            <NodeIcon size={29} strokeWidth={2.4} />
                            {done ? (
                              <span className="node-badge">
                                <Check size={12} />
                              </span>
                            ) : locked ? (
                              <span className="node-badge">
                                <LockKeyhole size={11} />
                              </span>
                            ) : (
                              <span className="node-badge">
                                <Play size={10} fill="currentColor" />
                              </span>
                            )}
                          </button>
                          <b>{name}</b>
                          <small>
                            {done
                              ? "Nice work!"
                              : locked
                                ? "Keep going to unlock"
                                : `Lesson ${i + 1} · 3 min`}
                          </small>
                        </div>
                      );
                    })}
                    <div className="map-sign">
                      <span>ONE STEP AT A TIME</span>
                      <Sprout size={15} />
                    </div>
                  </div>
                  <div className="map-footer">
                    <span>
                      <Map size={16} /> Your journey is just beginning.
                    </span>
                    <button
                      onClick={() => {
                        setUnit((unit + 1) % units.length);
                      }}
                    >
                      Next unit <ArrowRight size={15} />
                    </button>
                  </div>
                </section>
                <div className="practice-heading">
                  <h2>A little extra practice?</h2>
                  <p>Keep those new skills fresh.</p>
                </div>
                <div className="quick-grid">
                  <button onClick={() => setLesson({ unit, lesson: 0, practice: true })}>
                    <span className="practice-icon mint">
                      <Mic size={23} />
                    </span>
                    <div>
                      <b>Speak Python</b>
                      <small>Say it. Know it. Remember it.</small>
                    </div>
                    <ChevronRight size={17} />
                  </button>
                  <button
                    onClick={() => {
                      setPage("Practice");
                    }}
                  >
                    <span className="practice-icon peach">
                      <Code2 size={23} />
                    </span>
                    <div>
                      <b>Code a little</b>
                      <small>A quick brain-boosting challenge.</small>
                    </div>
                    <ChevronRight size={17} />
                  </button>
                </div>
              </>
            ) : page === "Courses" ? (
              <div className="course-list">
                {units.map((u, i) => {
                  const UIcon = unitIcons[i];
                  const done = progress.completed.filter((v) => v.startsWith(`${i}-`)).length;
                  return (
                    <button
                      className="course-card"
                      key={u.title}
                      onClick={() => {
                        setUnit(i);
                        setPage("Adventure");
                      }}
                    >
                      <span className={`catalog-icon color-${i % 4}`}>
                        <UIcon size={27} />
                      </span>
                      <div>
                        <small>
                          UNIT {i + 1} · {i < 2 ? "BEGINNER" : i < 5 ? "INTERMEDIATE" : "ADVANCED"}
                        </small>
                        <h3>{u.title}</h3>
                        <p>{u.subtitle}</p>
                        <div className="catalog-lessons">{u.lessons.join(" · ")}</div>
                      </div>
                      <span className="catalog-progress">
                        {done}/4
                        <ChevronRight size={19} />
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : page === "Practice" ? (
              <>
                <section className="practice-banner">
                  <Snake />
                  <div>
                    <span className="eyebrow">MAKE IT STICK</span>
                    <h2>
                      Python is a language.
                      <br />
                      Let’s speak it.
                    </h2>
                    <p>Practice concepts out loud, or sharpen your skills with a quick quiz.</p>
                  </div>
                </section>
                <div className="practice-list">
                  {units.map((u, i) => {
                    const UIcon = unitIcons[i];
                    return (
                      <div className="practice-unit" key={u.title}>
                        <span className="unit-icon">
                          <UIcon size={22} />
                        </span>
                        <div>
                          <h3>{u.title}</h3>
                          <p>3 questions · +30 XP</p>
                        </div>
                        <button
                          className="dark-button"
                          onClick={() => setLesson({ unit: i, lesson: 0, practice: true })}
                        >
                          Practice <ArrowRight size={15} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : page === "Achievements" ? (
              <>
                <div className="achievement-summary">
                  <Trophy size={40} />
                  <div>
                    <h2>{progress.completed.length} lessons. Countless possibilities.</h2>
                    <p>You’ve earned {progress.xp} XP on your Python adventure.</p>
                  </div>
                </div>
                <div className="badge-grid">
                  {[
                    {
                      title: "First steps",
                      text: "Complete your first lesson",
                      icon: Sprout,
                      value: progress.completed.length >= 1,
                    },
                    {
                      title: "Trailblazer",
                      text: "Complete one full unit",
                      icon: MountainBadge,
                      value: units.some(
                        (_, i) =>
                          progress.completed.filter((v) => v.startsWith(`${i}-`)).length === 4,
                      ),
                    },
                    {
                      title: "On a roll",
                      text: "Learn for 3 days in a row",
                      icon: Flame,
                      value: streak(progress.dates) >= 3,
                    },
                    {
                      title: "Python explorer",
                      text: "Earn 100 XP",
                      icon: Compass,
                      value: progress.xp >= 100,
                    },
                    {
                      title: "Code collector",
                      text: "Complete 12 lessons",
                      icon: Code2,
                      value: progress.completed.length >= 12,
                    },
                    {
                      title: "Python pro",
                      text: "Complete all 32 lessons",
                      icon: GraduationCap,
                      value: progress.completed.length === 32,
                    },
                  ].map(({ title, text, icon: BIcon, value }) => (
                    <div key={title} className={`achievement ${value ? "earned" : ""}`}>
                      <span className="achievement-icon">
                        <BIcon />
                      </span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <span className="badge-status">
                        {value ? (
                          <>
                            <Check size={13} /> Unlocked
                          </>
                        ) : (
                          <>
                            <LockKeyhole size={12} /> Keep exploring
                          </>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <section className="profile-card">
                <div className="profile-intro">
                  <Snake />
                  <h2>Hello, {progress.name}.</h2>
                  <p>A curious mind is all you need.</p>
                </div>
                <label>
                  Your explorer name
                  <input
                    aria-label="Your explorer name"
                    value={progress.name}
                    maxLength={20}
                    onChange={(e) => setProgress({ ...progress, name: e.target.value })}
                  />
                </label>
                <label>
                  Daily learning goal
                  <select
                    value={progress.goal}
                    onChange={(e) => setProgress({ ...progress, goal: Number(e.target.value) })}
                  >
                    <option value={5}>5 minutes · A little spark</option>
                    <option value={10}>10 minutes · Steady growth</option>
                    <option value={20}>20 minutes · Big adventure</option>
                  </select>
                </label>
                <div className="profile-totals">
                  <span>
                    <b>{progress.xp}</b>Total XP
                  </span>
                  <span>
                    <b>{progress.completed.length}</b>Lessons learned
                  </span>
                  <span>
                    <b>{streak(progress.dates)}</b>Day streak
                  </span>
                </div>
                <button className="outline-button" onClick={() => setOnboarding(true)}>
                  <RotateCcw size={16} /> Revisit onboarding
                </button>
                <small className="local-note">
                  Your progress is saved in this browser. No account needed.
                </small>
              </section>
            )}
          </main>
          <aside className="right-rail">
            <section className="daily-card">
              <div className="card-heading">
                <h3>Your daily goal</h3>
                <button className="text-button" onClick={() => setGoalEdit(!goalEdit)}>
                  Edit
                </button>
              </div>
              {goalEdit && (
                <div className="goal-options">
                  {[5, 10, 20].map((g) => (
                    <button
                      key={g}
                      className={g === progress.goal ? "active" : ""}
                      onClick={() => {
                        setProgress({ ...progress, goal: g });
                        setGoalEdit(false);
                      }}
                    >
                      {g} min
                    </button>
                  ))}
                </div>
              )}
              <div className="goal-row">
                <span className="goal-icon">
                  <Target size={27} />
                </span>
                <div>
                  <b>{progress.goal} minutes of learning</b>
                  <small>A little effort. A lot of growth.</small>
                </div>
              </div>
              <div className="progress-track">
                <span
                  style={{ width: `${Math.min(100, (progress.minutes / progress.goal) * 100)}%` }}
                />
              </div>
              <div className="goal-bottom">
                <span>
                  {Math.min(progress.minutes, progress.goal)} / {progress.goal} min
                </span>
                <b>
                  <Zap size={12} fill="currentColor" /> +20 XP goal
                </b>
              </div>
            </section>
            <section className="streak-card">
              <div className="card-heading">
                <h3>Keep your spark alive</h3>
                <Flame className="orange" size={21} />
              </div>
              <div className="streak-title">
                <strong>{streak(progress.dates)}</strong>
                <div>
                  <b>day streak</b>
                  <p>
                    {streak(progress.dates) ? "Look at you go!" : "A fresh start is a good start."}
                  </p>
                </div>
              </div>
              <div className="week">
                {Array.from({ length: 7 }, (_, i) => {
                  const d = new Date();
                  const day = d.getDay();
                  d.setDate(d.getDate() - ((day + 6) % 7) + i);
                  const active = progress.dates.includes(d.toLocaleDateString("en-CA"));
                  return (
                    <div key={i}>
                      <span>{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                      <i
                        className={
                          active
                            ? "day-active"
                            : d.toLocaleDateString("en-CA") === today()
                              ? "today"
                              : ""
                        }
                      >
                        {active ? <Check size={13} /> : null}
                      </i>
                    </div>
                  );
                })}
              </div>
              <p className="streak-note">Show up today. Your streak starts here.</p>
            </section>
            <section className="next-badge-card">
              <div className="card-heading">
                <h3>Your next milestone</h3>
                <Medal size={20} />
              </div>
              <MountainBadge />
              <h3>{progress.completed.length ? "Trailblazer" : "First steps"}</h3>
              <p>
                {progress.completed.length
                  ? "Finish a unit. Find your footing."
                  : "Every great coder starts somewhere."}
              </p>
              <div className="progress-track">
                <span
                  style={{
                    width: `${progress.completed.length ? Math.min(100, (completedInUnit / 4) * 100) : 0}%`,
                  }}
                />
              </div>
              <small>
                {progress.completed.length
                  ? `${completedInUnit} / 4 lessons in this unit`
                  : "Complete your first lesson"}
              </small>
              <button className="text-button" onClick={() => setPage("Achievements")}>
                Explore achievements <ArrowRight size={14} />
              </button>
            </section>
            <section className="pip-tip">
              <div>
                <span className="tip-icon">
                  <Sprout size={18} />
                </span>
                <b>PIP’S LITTLE TIP</b>
              </div>
              <p>
                “You don’t have to know it all.
                <br />
                You just have to start.”
              </p>
              <span>One line of code at a time.</span>
              <Snake />
            </section>
            <footer className="rail-footer">
              <span>Made for curious minds.</span>
              <div>
                <span>Python 3</span>
                <i>·</i>
                <span>Learn at your own pace</span>
              </div>
            </footer>
          </aside>
        </div>
      </div>
      <nav className="mobile-nav">
        {navItems.map(({ name, icon: NIcon }) => (
          <button
            key={name}
            className={page === name ? "active" : ""}
            onClick={() => setPage(name)}
          >
            <NIcon size={21} />
            <span>{name === "Achievements" ? "Awards" : name}</span>
          </button>
        ))}
      </nav>
      {onboarding && (
        <Onboarding
          name={progress.name}
          close={() => setOnboarding(false)}
          finish={(name, goal) => {
            setProgress({ ...progress, name, goal, onboarded: true });
            setOnboarding(false);
            setLesson({ unit, lesson: nextLesson });
          }}
        />
      )}
      {lesson && (
        <Lesson
          unit={lesson.unit}
          lesson={lesson.lesson}
          practice={lesson.practice}
          close={() => setLesson(null)}
          complete={() => complete(lesson.unit, lesson.lesson, lesson.practice)}
        />
      )}
    </div>
  );
}

function Onboarding({
  name,
  close,
  finish,
}: {
  name: string;
  close: () => void;
  finish: (name: string, goal: number) => void;
}) {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState(name === "Explorer" ? "" : name);
  const [goal, setGoal] = useState(10);
  return (
    <div className="modal-backdrop">
      <dialog open
        className="onboard modal"
        aria-modal="true"
        aria-label="Welcome to Pylingo"
      >
        <button className="modal-close" onClick={close} aria-label="Close onboarding">
          <X size={20} />
        </button>
        <div className="onboard-art">
          <span className="art-spark one">
            <Code2 />
          </span>
          <Snake />
          <span className="art-spark two">
            <Star />
          </span>
        </div>
        <div className="step-dots">
          {[0, 1, 2].map((i) => (
            <span key={i} className={i === step ? "active" : ""} />
          ))}
        </div>
        <span className="eyebrow">
          {["YOUR ADVENTURE STARTS HERE", "LET’S MAKE THIS YOURS", "A LITTLE EVERY DAY"][step]}
        </span>
        <h2>
          {
            [
              "Hi, I’m Pip. Let’s learn Python!",
              "What should I call you?",
              "Find your learning rhythm.",
            ][step]
          }
        </h2>
        <p>
          {
            [
              "A friendly guide, bite-sized lessons, and a whole world of possibilities. No coding experience needed.",
              "Every adventure needs an explorer. Pick a name to make this journey your own.",
              "Small, steady steps make great coders. Choose a daily goal that feels right for you.",
            ][step]
          }
        </p>
        {step === 1 && (
          <input
            aria-label="Your explorer name"
            autoFocus
            placeholder="Your explorer name"
            value={username}
            maxLength={20}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}{" "}
        {step === 2 && (
          <div className="onboard-goals">
            {[5, 10, 20].map((g, i) => (
              <button key={g} className={g === goal ? "active" : ""} onClick={() => setGoal(g)}>
                <span>{g} min</span>
                <small>{["Easy does it", "Steady growth", "Big adventure"][i]}</small>
                {g === goal && <Check size={16} />}
              </button>
            ))}
          </div>
        )}
        <button
          className="dark-button"
          onClick={() =>
            step < 2 ? setStep(step + 1) : finish(username.trim() || "Explorer", goal)
          }
        >
          {step === 2 ? "Start my adventure" : "Let’s go"}
          <ArrowRight size={18} />
        </button>
        {step > 0 && (
          <button className="text-button onboard-back" onClick={() => setStep(step - 1)}>
            <ChevronLeft size={14} /> Back
          </button>
        )}
        <small className="local-note">Free to explore. Built for your curious mind.</small>
      </dialog>
    </div>
  );
}

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
function Lesson({
  unit,
  lesson,
  practice,
  close,
  complete,
}: {
  unit: number;
  lesson: number;
  practice?: boolean;
  close: () => void;
  complete: () => void;
}) {
  const qs = lessonQuestions(unit, lesson);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [typed, setTyped] = useState(false);
  const rec = useRef<Recognition | null>(null);
  const q: Question = qs[step];
  useEffect(
    () => () => {
      rec.current?.stop();
      window.speechSynthesis?.cancel();
    },
    [],
  );
  const listen = () => {
    setSpeechError("");
    const R = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!R) {
      setSpeechError(
        "Speech recognition isn’t available in this browser. Type your answer below instead.",
      );
      setTyped(true);
      return;
    }
    try {
      const r: Recognition = new R();
      rec.current = r;
      r.lang = "en-US";
      r.continuous = false;
      r.interimResults = false;
      r.onresult = (e) => {
        setAnswer(e.results[0][0].transcript);
        setListening(false);
      };
      r.onerror = (e) => {
        setListening(false);
        setTyped(true);
        setSpeechError(
          e.error === "not-allowed"
            ? "Microphone access was denied. You can type your answer instead."
            : "We couldn’t hear that. Try again, or type your answer.",
        );
      };
      r.onend = () => setListening(false);
      r.start();
      setListening(true);
    } catch {
      setListening(false);
      setTyped(true);
      setSpeechError("Microphone unavailable. Type your answer instead.");
    }
  };
  const read = () => {
    if (!window.speechSynthesis) {
      setSpeechError("Text-to-speech isn’t available in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(q.prompt);
    speech.lang = "en-US";
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
  };
  const check = () => {
    rec.current?.stop();
    setListening(false);
    setResult(
      [q.answer, ...(q.aliases || [])].some((a) => normalize(a) === normalize(answer))
        ? "correct"
        : "wrong",
    );
  };
  const next = () => {
    if (step === qs.length - 1) {
      complete();
      setFinished(true);
    } else {
      setStep(step + 1);
      setAnswer("");
      setResult(null);
      setTyped(false);
      setSpeechError("");
    }
  };
  return (
    <div className="modal-backdrop">
      <dialog open
        className="lesson-modal modal"
        aria-modal="true"
        aria-label="Python lesson"
      >
        <button className="modal-close" onClick={close} aria-label="Close lesson">
          <X size={20} />
        </button>
        {finished ? (
          <div className="lesson-success">
            <Snake />
            <span className="eyebrow">A LITTLE WIN. A BIG STEP.</span>
            <h2>Look at you grow!</h2>
            <p>You’ve just added a little more Python to your world.</p>
            <div className="reward-row">
              <span>
                <Zap size={25} /> <b>+30 XP</b>
              </span>
              <span>
                <Gem size={25} /> <b>+5 gems</b>
              </span>
            </div>
            <button className="dark-button" onClick={close}>
              Back to my adventure <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <>
            <div className="lesson-top">
              <span className="eyebrow">
                {practice ? "QUICK PRACTICE" : `UNIT ${unit + 1} · LESSON ${lesson + 1}`}
              </span>
              <h3>{units[unit].lessons[lesson]}</h3>
              <div className="lesson-progress">
                <div className="progress-track">
                  <span style={{ width: `${(step / qs.length) * 100}%` }} />
                </div>
                <small>
                  {step + 1} / {qs.length}
                </small>
              </div>
            </div>
            <div className="exercise-kind">
              {q.spoken ? (
                <>
                  <Mic size={16} /> SPEAK & CHECK
                </>
              ) : (
                <>
                  <Code2 size={16} /> THINK LIKE A CODER
                </>
              )}
            </div>
            <h2>{q.prompt}</h2>
            {q.code && (
              <pre>
                <span>PYTHON</span>
                <code>{q.code}</code>
              </pre>
            )}
            {q.spoken ? (
              <div className="speak-exercise">
                <div className="speak-pip">
                  <Snake />
                  <button className="outline-button" onClick={read}>
                    <Volume2 size={16} /> Hear the question
                  </button>
                </div>
                <button
                  className={`mic-button ${listening ? "listening" : ""}`}
                  aria-label={listening ? "Stop listening" : "Start microphone"}
                  onClick={() => (listening ? rec.current?.stop() : listen())}
                  disabled={!!result}
                >
                  <Mic size={30} />
                </button>
                <p>
                  {listening
                    ? "Listening… say your answer"
                    : answer
                      ? `You said: “${answer}”`
                      : "Tap the mic and say your answer"}
                </p>
                <button className="text-button" onClick={() => setTyped(!typed)}>
                  <Keyboard size={16} /> {typed ? "Hide keyboard" : "I’d rather type"}
                </button>
                {speechError && (
                  <output className="speech-error">
                    {speechError}
                  </output>
                )}
                {typed && (
                  <input
                    aria-label="Your answer"
                    placeholder="Type your answer…"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setResult(null);
                    }}
                    disabled={result === "correct"}
                  />
                )}
              </div>
            ) : (
              <div className="answer-options">
                {q.options?.map((a, i) => (
                  <button
                    key={a}
                    onClick={() => {
                      setAnswer(a);
                      setResult(null);
                    }}
                    className={`${answer === a ? "chosen" : ""} ${result === "correct" && answer === a ? "correct" : ""}`}
                    disabled={result === "correct"}
                  >
                    <span>{i + 1}</span>
                    <code>{a}</code>
                    {answer === a && <Check size={18} />}
                  </button>
                ))}
              </div>
            )}
            {result && (
              <output className={`answer-feedback ${result}`}>
                <b>
                  {result === "correct"
                    ? "That’s it. Nicely done!"
                    : "Not quite — give it another go."}
                </b>
                <p>
                  {result === "correct"
                    ? q.explanation
                    : "Take another look, or use a hint to find your way."}
                </p>
                {result === "wrong" && (
                  <details>
                    <summary>Show a hint</summary>
                    {q.explanation}
                  </details>
                )}
              </output>
            )}
            <div className="lesson-bottom">
              <span>
                <Zap size={16} /> Little lessons, lasting skills.
              </span>
              <button
                className="dark-button"
                disabled={!answer || listening}
                onClick={result === "correct" ? next : check}
              >
                {result === "correct"
                  ? step === qs.length - 1
                    ? "Finish lesson"
                    : "Continue"
                  : "Check answer"}
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
