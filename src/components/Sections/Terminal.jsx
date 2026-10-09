import { useState, useRef, useEffect } from 'react';
import { useReveal } from '../../hooks/useAnimations';
import { terminalCommands, personalInfo } from '../../data/profile';
import { usePortfolio } from '../../context/PortfolioContext';
import { getStoredMessages, exportMessagesToExcel } from '../../utils/excelExport';

const EXTENDED_COMMANDS = {
  ...terminalCommands,
  whoami: `Mahesh Tawar — Java Backend Developer & Full Stack Engineer
Senior Project Associate I @ MKCL (Pune, India)
2× Promoted in 2 Years | 15+ Production Features Shipped | 50K+ Users Impacted`,
  stack: `Core Stack:
  Backend:   Java 17, Spring Boot, Microservices, REST APIs, Spring Security
  Database:  MySQL 8.0 (Oracle Certified OCP), Redis (Redis Certified Associate Developer), JDBC
  Frontend:  Vue 3, PrimeVue, React, ES6+
  DevOps:    Docker, GitLab CI/CD, Maven, Nginx`,
  status: `Runtime Status:
  ● Core Services:    OPERATIONAL
  ● Security Layer:   HARDENED (AES-256 / JWE, Zero-Trust RBAC, 50K+ accounts)
  ● API Gateway:      HEALTHY (97% latency reduced, <65ms)
  ● Database Pool:    CONNECTED (MySQL 8.0 multi-tenant)
  ● Cache Cluster:    ACTIVE (Redis cache hit ratio >85%)
  ● Deployment State: 0 deployment incidents across 5 profiles`,
  security: `Security Architecture & Practices:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
● Authentication:      AES-256 encrypted OTP pipelines + JWE payload validation
● Scope Protected:     50,000+ accounts secured against brute force & replay attacks
● Authorization:       Role-Based Access Control (RBAC) & method-level @PreAuthorize
● Multi-Tenant:        Zero-leakage row-level schema isolation across 5 college profiles
● Audit Trails:        Trigger-based immutable audit logging for forensic compliance
● Injection Immunity:  100% prepared statements via custom JdbcTemplate RowMappers`,
  metrics: `Production Metrics:
  ⚡ API Response:      2s -> 65ms (97% latency reduction)
  ⚡ Schedulers:        10+ migrated to isolated microservices
  ⚡ Account Security:  50,000+ accounts secured with AES/JWE OTP
  ⚡ Reallocation:      1,000+ users bulk processed transactionally`,
};

const Terminal = () => {
  const headerRef = useReveal();
  const { selectTech } = usePortfolio();
  const [history, setHistory] = useState([
    { type: 'output', text: `Mahesh Tawar Interactive Developer Terminal (v2.4.0-prod)\nType "help", "whoami", "stack", or "status" to query profile.` },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim();
    const normalized = trimmed.toLowerCase();
    if (!trimmed) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const newHistory = [...history, { type: 'input', text: trimmed }];

    if (normalized === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (normalized === 'resume') {
      window.open(personalInfo.resume, '_blank');
      newHistory.push({ type: 'output', text: EXTENDED_COMMANDS.resume });
    } else if (normalized === 'excel' || normalized === 'export') {
      const msgs = getStoredMessages();
      if (msgs.length === 0) {
        newHistory.push({ type: 'output', text: 'No contact messages recorded yet. Submit a message through the Contact section first.' });
      } else {
        exportMessagesToExcel();
        newHistory.push({ type: 'output', text: `✓ Exported ${msgs.length} contact ${msgs.length === 1 ? 'message' : 'messages'} to Excel (.csv) file!` });
      }
    } else if (normalized === 'messages') {
      const msgs = getStoredMessages();
      if (msgs.length === 0) {
        newHistory.push({ type: 'output', text: 'No contact messages recorded yet.' });
      } else {
        const list = msgs.map((m, idx) => `[#${idx + 1}] ${m.timestamp} | ${m.name} <${m.email}> | Topic: ${m.subject}\n     "${m.message}"`).join('\n\n');
        newHistory.push({ type: 'output', text: `Logged Contact Inquiries (${msgs.length} total):\n━━━━━━━━━━━━━━━━━━━━\n${list}\n\nType "excel" to download as a spreadsheet file.` });
      }
    } else if (normalized.startsWith('filter ')) {
      const tech = trimmed.substring(7).trim();
      selectTech(tech);
      newHistory.push({ type: 'output', text: `Triggered global portfolio highlight for: "${tech}"` });
    } else if (EXTENDED_COMMANDS[normalized]) {
      newHistory.push({ type: 'output', text: EXTENDED_COMMANDS[normalized] });
    } else {
      newHistory.push({
        type: 'output',
        text: `Command not recognized: "${trimmed}". Type "help" or try: whoami, stack, status, metrics, skills, projects, resume, clear.`,
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextPointer = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextPointer);
        setInput(commandHistory[nextPointer]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer !== -1) {
        const nextPointer = historyPointer + 1;
        if (nextPointer < commandHistory.length) {
          setHistoryPointer(nextPointer);
          setInput(commandHistory[nextPointer]);
        } else {
          setHistoryPointer(-1);
          setInput('');
        }
      }
    }
  };

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Header */}
        <div className="section-header reveal" ref={headerRef}>
          <span className="text-label">Interactive Developer Shell</span>
          <h2 className="heading-section">Developer Console</h2>
          <p className="text-body">
            Query Mahesh's background, production metrics, tech stack, and systems directly via CLI.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="terminal-container" data-cursor="terminal">
          <div
            style={{
              background: '#090d16',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px var(--accent-glow)',
            }}
          >
            {/* Title Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.2rem',
                background: '#0f172a',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
              <span className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '12px' }}>
                mahesh@workstation: ~ (zsh)
              </span>
              <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--accent)', marginLeft: 'auto' }}>
                ● LIVE RUNTIME
              </span>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalRef}
              style={{
                padding: '1.25rem',
                maxHeight: '380px',
                minHeight: '260px',
                overflowY: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                lineHeight: 1.65,
                background: '#090d16',
              }}
              onClick={() => inputRef.current?.focus()}
              role="log"
              aria-live="polite"
            >
              {history.map((entry, i) => (
                <div key={i} style={{ marginBottom: '0.4rem' }}>
                  {entry.type === 'input' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>➜</span>
                      <span style={{ color: 'var(--accent-light)' }}>mahesh@mkcl</span>
                      <span style={{ color: '#64748b' }}>git:(main)</span>
                      <span style={{ color: 'var(--text-primary)' }}>{entry.text}</span>
                    </div>
                  ) : (
                    <pre
                      style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        color: '#cbd5e1',
                        margin: 0,
                        fontFamily: 'inherit',
                        fontSize: '0.8rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {entry.text}
                    </pre>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>➜</span>
                <span style={{ color: 'var(--accent-light)' }}>mahesh@mkcl</span>
                <span style={{ color: '#64748b' }}>git:(main)</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Terminal input"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#f8fafc',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    caretColor: 'var(--accent)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Clickable Suggestions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginTop: 'var(--space-md)',
              justifyContent: 'center',
            }}
          >
            <span className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
              Suggestions:
            </span>
            {['whoami', 'stack', 'status', 'metrics', 'projects', 'resume', 'clear'].map((cmd) => (
              <button
                key={cmd}
                className="tag"
                style={{
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-tertiary)',
                }}
                onClick={() => executeCommand(cmd)}
              >
                $ {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
