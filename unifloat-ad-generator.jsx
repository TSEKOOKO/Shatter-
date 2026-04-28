import { useState } from "react";

const ANGLES = [
  { label: "💸 Referral Earnings", value: "referral" },
  { label: "🏦 Quick Loans", value: "loans" },
  { label: "👛 Campus Wallet", value: "wallet" },
  { label: "🎮 Games & Win Cash", value: "games" },
  { label: "🛒 Marketplace", value: "market" },
];

const TONES = [
  { label: "🔥 Hype", value: "hype" },
  { label: "😎 Chill", value: "chill" },
  { label: "🤝 Trustworthy", value: "trust" },
];

const DURATIONS = [
  { label: "15 sec", value: "15" },
  { label: "30 sec", value: "30" },
  { label: "45 sec", value: "45" },
];

export default function App() {
  const [angle, setAngle] = useState("referral");
  const [tone, setTone] = useState("hype");
  const [duration, setDuration] = useState("30");
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setScript(null);
    setError(null);
    setCopied(false);

    const angleLabel = ANGLES.find((a) => a.value === angle)?.label;
    const toneLabel = TONES.find((t) => t.value === tone)?.label;

    const prompt = `You are a marketing expert creating WhatsApp video ad scripts for UniFloat — a campus fintech PWA for Ugandan university students.

UniFloat features:
- Digital wallet (send/receive money)
- Quick loans for students
- Referral program: earn UGX 3,000 per referral, bonuses up to UGX 20,000
- Campus marketplace
- Games to win cash
- Powered by MoMo payments (Pesapal)
- Tagline: "Float Your Way Through Campus"

Write a ${duration}-second WhatsApp video ad script focused on: ${angleLabel}
Tone: ${toneLabel}
Target audience: Ugandan university students aged 18-26

Rules:
- Open with: "My name is Ronny Smart..."
- Start with a strong hook (first 3 seconds must grab attention)
- Speak directly to a broke campus student's real pain
- Include a clear call to action at the end (sign up / create account)
- Use casual Ugandan campus language (can include light slang like "mzeei", "naye", "sure sure")
- Keep it tight for ${duration} seconds when spoken aloud
- NO bullet points. Write it as spoken words only, like a script.
- End with: "Sign up on UniFloat today — Float your way through campus!"

Return ONLY the script text. No titles, no labels, no formatting.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": window.ANTHROPIC_API_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      const text = data?.content?.find((b) => b.type === "text")?.text;
      if (text) {
        setScript(text.trim());
      } else {
        setError("Could not generate script. Try again.");
      }
    } catch (e) {
      setError("Network error. Check your connection.");
    }

    setLoading(false);
  };

  const copy = () => {
    if (!script) return;
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.root}>
      <div style={styles.bg} />

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>🌿</div>
          <div>
            <div style={styles.title}>UniFloat</div>
            <div style={styles.subtitle}>Ad Script Generator</div>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Controls */}
        <div style={styles.section}>
          <div style={styles.label}>Focus on</div>
          <div style={styles.chips}>
            {ANGLES.map((a) => (
              <button
                key={a.value}
                onClick={() => setAngle(a.value)}
                style={{
                  ...styles.chip,
                  ...(angle === a.value ? styles.chipActive : {}),
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.label}>Tone</div>
          <div style={styles.chips}>
            {TONES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTone(t.value)}
                style={{
                  ...styles.chip,
                  ...(tone === t.value ? styles.chipActive : {}),
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.label}>Video length</div>
          <div style={styles.chips}>
            {DURATIONS.map((d) => (
              <button
                key={d.value}
                onClick={() => setDuration(d.value)}
                style={{
                  ...styles.chip,
                  ...(duration === d.value ? styles.chipActive : {}),
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={loading}
          style={{
            ...styles.generateBtn,
            ...(loading ? styles.generateBtnDisabled : {}),
          }}
        >
          {loading ? (
            <span style={styles.spinner}>⏳ Generating...</span>
          ) : (
            "✨ Generate Script"
          )}
        </button>

        {/* Error */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Script Output */}
        {script && (
          <div style={styles.scriptBox}>
            <div style={styles.scriptHeader}>
              <div style={styles.scriptTag}>📝 Your Script</div>
              <button onClick={copy} style={styles.copyBtn}>
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>
            <div style={styles.scriptText}>{script}</div>
            <div style={styles.heygenHint}>
              👆 Copy this → paste into <strong>heygen.com</strong> → generate your video!
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          Float Your Way Through Campus 🌿
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0f0a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 16px",
    fontFamily: "'Georgia', serif",
    position: "relative",
    overflow: "hidden",
  },
  bg: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    background: "rgba(15,22,15,0.95)",
    border: "1px solid rgba(34,197,94,0.25)",
    borderRadius: 20,
    padding: "28px 24px",
    width: "100%",
    maxWidth: 460,
    position: "relative",
    boxShadow: "0 0 60px rgba(34,197,94,0.08), 0 20px 40px rgba(0,0,0,0.6)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  logo: {
    fontSize: 36,
    lineHeight: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#e8f5e9",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 13,
    color: "#4ade80",
    letterSpacing: "0.5px",
    marginTop: 2,
  },
  divider: {
    height: 1,
    background: "rgba(34,197,94,0.15)",
    marginBottom: 22,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    color: "#6b7280",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: 10,
    fontFamily: "'Georgia', serif",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: "7px 14px",
    color: "#9ca3af",
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "'Georgia', serif",
  },
  chipActive: {
    background: "rgba(34,197,94,0.15)",
    border: "1px solid rgba(34,197,94,0.5)",
    color: "#4ade80",
  },
  generateBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    border: "none",
    borderRadius: 12,
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 4,
    marginBottom: 16,
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.3px",
    boxShadow: "0 4px 20px rgba(22,163,74,0.35)",
    transition: "opacity 0.2s",
  },
  generateBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  spinner: {
    display: "inline-block",
  },
  error: {
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 10,
    padding: "12px 16px",
    color: "#f87171",
    fontSize: 14,
    marginBottom: 16,
  },
  scriptBox: {
    background: "rgba(34,197,94,0.05)",
    border: "1px solid rgba(34,197,94,0.2)",
    borderRadius: 14,
    padding: "16px",
    marginBottom: 16,
  },
  scriptHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  scriptTag: {
    fontSize: 12,
    color: "#4ade80",
    fontWeight: 600,
    letterSpacing: "0.5px",
  },
  copyBtn: {
    background: "rgba(34,197,94,0.15)",
    border: "1px solid rgba(34,197,94,0.3)",
    borderRadius: 8,
    padding: "5px 12px",
    color: "#4ade80",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
  },
  scriptText: {
    color: "#d1fae5",
    fontSize: 15,
    lineHeight: 1.75,
    whiteSpace: "pre-wrap",
  },
  heygenHint: {
    marginTop: 14,
    padding: "10px 12px",
    background: "rgba(251,191,36,0.08)",
    border: "1px solid rgba(251,191,36,0.2)",
    borderRadius: 8,
    color: "#fbbf24",
    fontSize: 12,
    lineHeight: 1.5,
  },
  footer: {
    textAlign: "center",
    color: "rgba(34,197,94,0.35)",
    fontSize: 12,
    letterSpacing: "0.5px",
    marginTop: 4,
  },
};
