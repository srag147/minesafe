"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./dashboard.css";
import {
  formatTelemetryTime,
  getDemoTelemetry,
  getSensorStatuses,
  getTruckStatus,
  initialTelemetry,
  type Truck,
  type TruckStatus,
} from "./telemetry-data";

type Severity = "Critical" | "High" | "Medium" | "Low";
type Risk = {
  title: string;
  location: string;
  severity: Severity;
  status: string;
  time: string;
};

const navItems = [
  "Overview",
  "Live Monitoring",
  "Vehicles",
  "Workers",
  "Safety Alerts",
  "Analytics",
  "Reports",
  "Settings",
];
const icons = [
  "grid",
  "radar",
  "truck",
  "user",
  "alert",
  "chart",
  "report",
  "settings",
];
const risks: Risk[] = [
  {
    title: "High dust concentration detected",
    location: "Zone B",
    severity: "Critical",
    status: "Investigating",
    time: "2 min ago",
  },
  {
    title: "Vehicle proximity warning",
    location: "Haul Road 03",
    severity: "High",
    status: "Assigned",
    time: "8 min ago",
  },
  {
    title: "Worker entered restricted zone",
    location: "Sector 7",
    severity: "Medium",
    status: "Monitoring",
    time: "16 min ago",
  },
  {
    title: "Visibility reduced",
    location: "North Tunnel",
    severity: "Low",
    status: "Monitoring",
    time: "31 min ago",
  },
];
const incidents = [
  ["INC-248", "Near miss", "Zone B", "High", "Under review", "Today · 09:18"],
  [
    "INC-247",
    "Equipment issue",
    "Sector 7",
    "Medium",
    "Resolved",
    "Yesterday · 16:42",
  ],
  [
    "INC-246",
    "Environmental",
    "North Tunnel",
    "Low",
    "Closed",
    "Yesterday · 11:06",
  ],
];
const inspections = [
  [
    "Underground ventilation",
    "North Tunnel",
    "Anita Rao",
    "Today · 14:00",
    "Due today",
  ],
  [
    "Haul road condition",
    "Haul Road 03",
    "M. Prakash",
    "Tomorrow · 08:00",
    "Scheduled",
  ],
  [
    "Emergency equipment",
    "Zone B",
    "Ravi Kumar",
    "06 Sep · 10:00",
    "Scheduled",
  ],
];
const training = [
  ["Underground hazard awareness", "86%", "213", "34"],
  ["Emergency response protocol", "72%", "178", "69"],
  ["Vehicle interaction safety", "94%", "232", "15"],
];

function Brand() {
  return (
    <Link className="dashboard-brand" href="/">
      <span className="dashboard-logo" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        Mine<span>Safe</span>
      </span>
    </Link>
  );
}
function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    radar: "M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 12l7-7",
    truck:
      "M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
    user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 21a8 8 0 0 1 16 0",
    alert: "M12 3 2.5 20h19zM12 9v5M12 17v.1",
    chart: "M4 19V5M4 19h17M8 15l3-4 3 2 5-7",
    report: "M6 3h9l3 3v15H6zM9 11h6M9 15h6M9 7h3",
    settings:
      "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a8 8 0 0 0-1.7-1L14.5 3h-5l-.4 3a8 8 0 0 0-1.7 1L5 6 3 9.5 5 11a7 7 0 0 0 0 2l-2 1.5L5 18l2.4-1 1.7 1 .4 3h5l.4-3 1.7-1 2.4 1 2-3.5-2-1.5a7 7 0 0 0 .1-1",
  };
  return (
    <svg aria-hidden="true" className="dashboard-icon" viewBox="0 0 24 24">
      <path d={paths[name]} />
    </svg>
  );
}
function SiteMap() {
  return (
    <div
      className="site-map"
      aria-label="Live map of Singareni Mine Site 04"
      role="img"
    >
      <div className="map-toolbar">
        <span className="live-pill">
          <b /> LIVE
        </span>
        <span className="map-time">Updated just now</span>
      </div>
      <svg viewBox="0 0 760 410" preserveAspectRatio="none">
        <path
          className="map-outline"
          d="M0 54 110 38l87 35 84-28 92 45 120-31 70 51 85-18 112 54v184l-123 42-91-29-97 38-124-40-94 25-101-47L0 370z"
        />
        <path className="zone zone-a" d="M24 81 110 56l79 31-30 91-116-17z" />
        <path className="zone zone-b" d="m192 88 88-25 88 43-43 92-112-20z" />
        <path className="zone zone-c" d="m373 107 119-31 68 48-39 92-112-21z" />
        <path className="zone zone-d" d="m523 125 94-20 117 51-26 93-110-26z" />
        <path
          className="tunnel-line"
          d="M37 144 145 182l104 12 112-35 119 29 120 51 119 4"
        />
        <path
          className="road-line"
          d="M25 265 145 182l104 12 112-35 119 29 120 51 119 4"
        />
        <g className="vehicle-marker marker-orange">
          <rect x="135" y="167" width="16" height="16" rx="2" />
        </g>
        <g className="vehicle-marker marker-orange">
          <rect x="442" y="170" width="16" height="16" rx="2" />
        </g>
        <g className="worker-marker">
          <circle cx="267" cy="194" r="7" />
          <path d="M267 190v8M263 195h8" />
        </g>
        <g className="worker-marker">
          <circle cx="555" cy="226" r="7" />
          <path d="M555 222v8M551 227h8" />
        </g>
        <text x="61" y="119">
          ZONE A
        </text>
        <text x="232" y="121">
          ZONE B
        </text>
        <text x="414" y="127">
          ZONE C
        </text>
        <text x="579" y="151">
          ZONE D
        </text>
      </svg>
      <div className="map-legend">
        <span>
          <i className="legend-vehicle" /> Vehicle
        </span>
        <span>
          <i className="legend-worker" /> Worker
        </span>
        <span>
          <i className="legend-zone" /> Safety zone
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [alertFilter, setAlertFilter] = useState<Severity | "All">("All");
  const [siteOpen, setSiteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState("Singareni Mine — Site 04");
  const [telemetry, setTelemetry] = useState(initialTelemetry);
  const [selectedTruckId, setSelectedTruckId] = useState<Truck["id"]>("TRUCK-02");
  const [demoPhase, setDemoPhase] = useState(0);
  const [demoRunning, setDemoRunning] = useState(false);
  const [telemetryNow, setTelemetryNow] = useState(0);
  const filteredRisks =
    alertFilter === "All"
      ? risks
      : risks.filter((risk) => risk.severity === alertFilter);
  useEffect(() => {
    let tick = 0;
    const interval = window.setInterval(() => {
      const updatedAt = Date.now();
      setTelemetryNow(updatedAt);
      if (demoRunning) return;
      tick += 1;
      const distanceOne = [8.4, 8.1, 8.6][tick % 3];
      const distanceTwo = [8.1, 7.8, 8.3][tick % 3];
      setTelemetry((current) => current.map((truck, index) => ({
        ...truck,
        sensor: {
          ...truck.sensor,
          distance: index === 0 ? distanceOne : distanceTwo,
          tilt: index === 0 ? [2.4, 2.6, 2.2][tick % 3] : [3.1, 3.3, 2.9][tick % 3],
          gps: {
            ...truck.sensor.gps,
            latitude: truck.sensor.gps.latitude + (index === 0 ? 0.0001 : 0.00008),
            longitude: truck.sensor.gps.longitude - (index === 0 ? 0.0001 : 0.00006),
          },
          updatedAt,
        },
      })));
    }, 2500);
    return () => window.clearInterval(interval);
  }, [demoRunning]);
  useEffect(() => {
    if (!demoRunning) return;
    const interval = window.setInterval(() => {
      setDemoPhase((phase) => {
        const updatedAt = Date.now();
        if (phase >= 5) {
          setDemoRunning(false);
          return phase;
        }
        const nextPhase = phase + 1;
        setTelemetry(getDemoTelemetry(nextPhase, updatedAt));
        setTelemetryNow(updatedAt);
        return nextPhase;
      });
    }, 1600);
    return () => window.clearInterval(interval);
  }, [demoRunning]);
  const startDemo = () => {
    const updatedAt = Date.now();
    setDemoPhase(0);
    setDemoRunning(true);
    setTelemetry(getDemoTelemetry(0, updatedAt));
    setTelemetryNow(updatedAt);
  };
  const resetDemo = () => {
    const updatedAt = Date.now();
    setDemoRunning(false);
    setDemoPhase(0);
    setTelemetry(initialTelemetry.map((truck) => ({
      ...truck,
      sensor: { ...truck.sensor, updatedAt },
    })));
    setTelemetryNow(updatedAt);
  };
  const selectedTruck = telemetry.find((truck) => truck.id === selectedTruckId) ?? telemetry[0];
  const selectedStatus = getTruckStatus(selectedTruck.sensor);
  const selectedSensorStatuses = getSensorStatuses(selectedTruck.sensor);
  const criticalTruck = telemetry.find((truck) => getTruckStatus(truck.sensor) === "CRITICAL");
  const demoMessage = demoPhase >= 5
    ? "Sudden impact detected. Operator response required immediately."
    : demoPhase >= 3
      ? "Dangerous tilt detected on the east ridge haul road."
      : demoPhase >= 1
        ? "Obstacle detected within the Truck-02 safety threshold."
        : "All vehicle sensors are within the normal operating range.";
  const alertHistory = [
    ...(demoPhase >= 5 ? [{ id: "demo-impact", truckId: "TRUCK-02", title: "Sudden impact detected", sensor: "MPU6050", severity: "CRITICAL" as TruckStatus, location: "East Ridge haul road", time: formatTelemetryTime(telemetryNow) }] : []),
    ...(demoPhase >= 3 ? [{ id: "demo-tilt", truckId: "TRUCK-02", title: "Dangerous tilt detected", sensor: "MPU6050", severity: "CRITICAL" as TruckStatus, location: "East Ridge haul road", time: formatTelemetryTime(telemetryNow - 1600) }] : []),
    ...(demoPhase >= 1 ? [{ id: "demo-obstacle", truckId: "TRUCK-02", title: `Obstacle detected at ${telemetry[1].sensor.distance.toFixed(1)}m`, sensor: "HC-SR04", severity: (demoPhase >= 3 ? "CRITICAL" : "WARNING") as TruckStatus, location: "East Ridge haul road", time: formatTelemetryTime(telemetryNow - 3200) }] : []),
    { id: "baseline-check", truckId: "TRUCK-01", title: "Vehicle telemetry healthy", sensor: "HC-SR04" as const, severity: "NORMAL" as TruckStatus, location: "Crusher haul road", time: "10:42:18" },
  ];
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Brand />
        <div className="sidebar-label">Workspace</div>
        <nav>
          {navItems.map((item, index) => (
            <Link
              className={item === "Overview" ? "active" : ""}
              href={
                  item === "Overview"
                    ? "/dashboard"
                    : item === "Live Monitoring"
                      ? "/dashboard/monitoring"
                      : item === "Safety Alerts"
                        ? "/dashboard/alerts"
                        : `/dashboard/${item.toLowerCase().replaceAll(" ", "-")}`
              }
              key={item}
            >
              <Icon name={icons[index]} />
              {item}
              {item === "Safety Alerts" && <b className="nav-count">4</b>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="shift-card">
            <span className="shift-pulse" />
            <div>
              <strong>Day shift active</strong>
              <small>07:00 — 19:00 IST</small>
            </div>
          </div>
          <a className="sidebar-help" href="mailto:safety-ops@minesafe.example">
            Need help? <span>Contact safety ops ↗</span>
          </a>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="mobile-brand">
            <Brand />
          </div>
          <div className="header-title">
            <p>MineSafe / Operations</p>
            <h1>Operations Overview</h1>
          </div>
          <div className="header-actions">
            <div className="site-selector-wrap">
              <button
                className="site-selector"
                aria-expanded={siteOpen}
                onClick={() => setSiteOpen(!siteOpen)}
              >
                <span className="site-pin">+</span>
                <span>
                  <small>Current site</small>
                  {selectedSite}
                </span>
                <b>⌄</b>
              </button>
              {siteOpen && (
                <div className="site-menu">
                  <button
                    onClick={() => {
                      setSelectedSite("Singareni Mine — Site 04");
                      setSiteOpen(false);
                    }}
                  >
                    Singareni Mine — Site 04
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSite("Kothagudem Mine — Site 02");
                      setSiteOpen(false);
                    }}
                  >
                    Kothagudem Mine — Site 02
                  </button>
                </div>
              )}
            </div>
            <span className="header-divider" />
            <div className="notification-wrap">
              <button
                className="icon-button"
                aria-label="Open notifications"
                aria-expanded={notificationsOpen}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="notification-dot" />◌
              </button>
              {notificationsOpen && (
                <div className="notification-panel">
                  <strong>Notifications</strong>
                  <p>4 safety alerts need review.</p>
                  <Link href="/dashboard/safety-alerts">Review alerts ↗</Link>
                </div>
              )}
            </div>
            <div className="profile-wrap">
              <button
                className="profile profile-button"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <span className="avatar">RK</span>
                <span>
                  <strong>Ravi Kumar</strong>
                  <small>Safety operator</small>
                </span>
                <b>⌄</b>
              </button>
              {profileOpen && (
                <div className="profile-menu">
                  <Link href="/dashboard/settings">Profile</Link>
                  <Link href="/dashboard/settings">Account settings</Link>
                  <button onClick={() => setProfileOpen(false)}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="dashboard-content">
          <section className="welcome-row">
            <div>
              <p className="dashboard-eyebrow">
                <span /> Friday, 04 September 2026 · 10:42 IST
              </p>
              <h2>Good morning, Ravi.</h2>
              <p className="welcome-text">
                Here&apos;s how {selectedSite} is looking right now.
              </p>
            </div>
            <div className="system-status">
              <i /> SYSTEM OPERATIONAL
            </div>
          </section>
          <section className="metric-cards milestone-metrics">
            <Metric
              label="Safety score"
              value="82"
              suffix=" / 100"
              detail="↑ 4% this week"
              tone="green"
            />
            <Metric
              label="Active risks"
              value="04"
              detail="1 critical requires action"
              tone="orange"
            />
            <Metric
              label="Open incidents"
              value="03"
              detail="1 under review"
              tone="orange"
              href="/dashboard/incidents"
            />
            <Metric
              label="Inspections due"
              value="06"
              detail="2 due today"
              tone="neutral"
            />
            <Metric
              label="Training completion"
              value="86%"
              detail="+5% this month"
              tone="green"
            />
          </section>
          <section className="safety-status panel">
            <div>
              <p className="panel-kicker">Safety status</p>
              <h2>Good standing</h2>
              <p>
                Operations are within the expected safety range. One critical
                dust alert is being investigated in Zone B.
              </p>
            </div>
            <div className="status-score">
              <strong>82</strong>
              <span>/ 100</span>
              <small>Risk level: Low</small>
            </div>
            <time>Last updated 2 min ago</time>
          </section>
          <section className="demo-command panel">
            <div>
              <p className="panel-kicker">Presentation controls</p>
              <h2>MineSafe Safety Command Center</h2>
              <p>Run a deterministic vehicle safety scenario from healthy telemetry to operator response.</p>
            </div>
            <div className="demo-actions">
              <span className="demo-mode-badge">DEMO MODE — Simulated Sensor Data</span>
              <button className="demo-button demo-button-primary" onClick={startDemo} disabled={demoRunning}>
                {demoRunning ? `Demo running · Phase ${Math.min(demoPhase + 1, 5)}/5` : "Start demo"}
              </button>
              <button className="demo-button" onClick={resetDemo}>Reset</button>
            </div>
          </section>
          {criticalTruck && (
            <section className="emergency-alert" aria-live="assertive">
              <div className="emergency-alert-mark">!</div>
              <div>
                <p className="panel-kicker">Critical emergency alert</p>
                <h2>{criticalTruck.id}: {demoMessage}</h2>
                <p>Severity: CRITICAL · Sensor: {criticalTruck.sensor.impact ? "MPU6050" : "HC-SR04 / MPU6050"} · Location: East Ridge haul road</p>
              </div>
              <time>{formatTelemetryTime(criticalTruck.sensor.updatedAt)}</time>
            </section>
          )}
          <section className="fleet-section">
            <div className="section-title fleet-heading">
              <div>
                <p className="panel-kicker">Live fleet overview</p>
                <h2>Two trucks, one safety picture</h2>
              </div>
              <span className="telemetry-live"><i /> Sensors updating live</span>
            </div>
            <div className="fleet-grid">
              {telemetry.map((truck) => (
                <TruckCard
                  key={`${truck.id}-${truck.sensor.updatedAt}`}
                  truck={truck}
                  status={getTruckStatus(truck.sensor)}
                  selected={truck.id === selectedTruckId}
                  onSelect={() => setSelectedTruckId(truck.id)}
                />
              ))}
            </div>
          </section>
          <section className="telemetry-layout">
            <div className="panel telemetry-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Sensor monitoring</p>
                  <h2>{selectedTruck.id} live sensor status</h2>
                </div>
                <span className={`status-chip status-chip-${selectedStatus.toLowerCase()}`}><i /> {selectedStatus}</span>
              </div>
              <div className="sensor-grid">
                <SensorCard label="HC-SR04" title="Proximity distance" value={Math.round(selectedTruck.sensor.distance * 100).toString()} unit="cm" detail={selectedTruck.sensor.distance < 3 ? "Obstacle threshold reached" : "Clear operating distance"} status={selectedSensorStatuses.distance} />
                <SensorCard label="MPU6050" title="Motion and tilt" value={selectedTruck.sensor.tilt.toFixed(1)} unit="°" detail={`${selectedTruck.sensor.acceleration.toFixed(2)} g · ${selectedTruck.sensor.impact ? "Impact detected" : "No impact"}`} status={selectedSensorStatuses.motion} />
                <SensorCard label="MPU6050" title="Impact state" value={selectedTruck.sensor.impact ? "DETECTED" : "NORMAL"} detail={selectedTruck.sensor.impact ? "Immediate inspection required" : "Motion within safe range"} status={selectedSensorStatuses.motion} />
                <SensorCard label="NEO-6M" title="GPS location" value={selectedTruck.sensor.gps.signal} detail={`${selectedTruck.sensor.gps.latitude.toFixed(4)}, ${selectedTruck.sensor.gps.longitude.toFixed(4)}`} status={selectedSensorStatuses.gps} />
              </div>
              <p className="telemetry-updated">Last updated {telemetryNow === 0 ? 0 : Math.max(0, Math.floor((telemetryNow - selectedTruck.sensor.updatedAt) / 1000))} seconds ago · {telemetryNow === 0 ? "Awaiting sync" : formatTelemetryTime(selectedTruck.sensor.updatedAt)}</p>
            </div>
            <div className="panel alert-history-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Operator queue</p>
                  <h2>Alert history</h2>
                </div>
                <span className="alert-count">{alertHistory.length.toString().padStart(2, "0")}</span>
              </div>
              <div className="telemetry-alert-list">
                {alertHistory.map((alert) => (
                  <div className="telemetry-alert" key={alert.id}>
                    <span className={`severity severity-${alert.severity.toLowerCase()}`} />
                    <div>
                      <strong>{alert.title}</strong>
                      <p>{alert.truckId} · {alert.sensor} · {alert.time}</p>
                      <small>{alert.location}</small>
                    </div>
                    <b className={`severity-text-${alert.severity.toLowerCase()}`}>{alert.severity}</b>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="dashboard-grid">
            <section className="panel map-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Live site status</p>
                  <h2>{selectedSite}</h2>
                </div>
                <Link
                  className="panel-link"
                  href="/dashboard/monitoring"
                >
                  Open full map ↗
                </Link>
              </div>
              <SiteMap />
            </section>
            <section className="panel alerts-panel" id="risks">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Attention required</p>
                  <h2>
                    Active risks{" "}
                    <span>
                      {filteredRisks.length.toString().padStart(2, "0")}
                    </span>
                  </h2>
                </div>
                <select
                  aria-label="Filter active risks"
                  value={alertFilter}
                  onChange={(event) =>
                    setAlertFilter(event.target.value as Severity | "All")
                  }
                >
                  <option>All</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="alert-list">
                {filteredRisks.map((risk) => (
                  <Link
                    className="alert-row"
                    href="/dashboard/alerts"
                    key={risk.title}
                  >
                    <span
                      className={`severity severity-${risk.severity.toLowerCase()}`}
                    />
                    <div>
                      <strong>{risk.title}</strong>
                      <p>
                        {risk.location} <span>·</span> {risk.time}
                      </p>
                    </div>
                    <span
                      className={`severity-label severity-text-${risk.severity.toLowerCase()}`}
                    >
                      {risk.status}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                className="panel-footer-link"
                href="/dashboard/alerts"
              >
                View all risks <span>→</span>
              </Link>
            </section>
          </div>
          <section className="overview-section">
            <div className="section-title">
              <p className="panel-kicker">Recent activity</p>
              <h2>Incidents</h2>
            </div>
            <div className="data-panel">
              <table>
                <thead>
                  <tr>
                    <th>Incident ID</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Date / time</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident[0]}>
                      {incident.map((value, index) => (
                        <td key={`${incident[0]}-${index}`}>
                          {index === 3 ? (
                            <span
                              className={`risk risk-${value.toLowerCase()}`}
                            >
                              {value}
                            </span>
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div className="overview-columns">
            <section className="panel compact-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Upcoming</p>
                  <h2>Inspections</h2>
                </div>
                <Link className="panel-link" href="/dashboard/safety-checklist">
                  View checklist ↗
                </Link>
              </div>
              <div className="mini-list">
                {inspections.map((inspection) => (
                  <div key={inspection[0]}>
                    <strong>{inspection[0]}</strong>
                    <p>
                      {inspection[1]} · {inspection[2]}
                    </p>
                    <span>
                      {inspection[3]} <em>{inspection[4]}</em>
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section className="panel compact-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">People readiness</p>
                  <h2>Training progress</h2>
                </div>
                <Link className="panel-link" href="/dashboard/analytics">
                  View analytics ↗
                </Link>
              </div>
              <div className="training-list">
                {training.map((course) => (
                  <div key={course[0]}>
                    <div>
                      <strong>{course[0]}</strong>
                      <span>{course[1]}</span>
                    </div>
                    <div className="training-track">
                      <i style={{ width: course[1] }} />
                    </div>
                    <p>
                      {course[2]} completed · {course[3]} pending
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <section className="quick-actions">
            <div>
              <p className="panel-kicker">Shortcuts</p>
              <h2>Quick actions</h2>
            </div>
            <div className="action-buttons">
              <Link
                className="action-primary"
                href="/dashboard/incidents/new"
              >
                ＋ Report incident <span>↗</span>
              </Link>
              <Link href="/dashboard/safety-checklist">
                ＋ Start inspection <span>↗</span>
              </Link>
              <Link href="#risks">
                ◉ View risks <span>↗</span>
              </Link>
              <Link href="/dashboard/reports#report-generation">
                ▤ Safety resources <span>↗</span>
              </Link>
            </div>
          </section>
        </main>
        <footer className="dashboard-footer">
          <span>MineSafe Operations Console v1.0</span>
          <span>
            Last system sync: 10:42:18 IST <i />
          </span>
        </footer>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  suffix,
  detail,
  tone,
  href,
}: {
  label: string;
  value: string;
  suffix?: string;
  detail: string;
  tone: string;
  href?: string;
}) {
  const content = (
    <>
      <div className={`metric-icon icon-${tone}`} aria-hidden="true">
        ◒
      </div>
      <p>{label}</p>
      <strong>
        {value}
        <small>{suffix}</small>
      </strong>
      <span className={`metric-detail detail-${tone}`}>{detail}</span>
    </>
  );
  return href ? <Link className="metric-card metric-card-link" href={href}>{content}</Link> : <article className="metric-card">{content}</article>;
}

function TruckCard({
  truck,
  status,
  selected,
  onSelect,
}: {
  truck: Truck;
  status: TruckStatus;
  selected: boolean;
  onSelect: () => void;
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - truck.sensor.updatedAt) / 1000)));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [truck.sensor.updatedAt]);

  return (
    <button className={`truck-card ${selected ? "truck-card-selected" : ""}`} onClick={onSelect}>
      <div className="truck-card-topline">
        <span className="truck-symbol">▰</span>
        <span className={`status-chip status-chip-${status.toLowerCase()}`}><i /> {status}</span>
      </div>
      <div className="truck-card-title">
        <div>
          <p className="panel-kicker">{truck.name}</p>
          <h3>{truck.id}</h3>
        </div>
        <span className="truck-updated">{elapsedSeconds}s ago</span>
      </div>
      <div className="truck-readings">
        <span><small>Distance</small><strong>{truck.sensor.distance.toFixed(1)}<em> m</em></strong></span>
        <span><small>Tilt</small><strong>{truck.sensor.tilt.toFixed(1)}<em>°</em></strong></span>
        <span><small>Impact</small><strong className={truck.sensor.impact ? "reading-critical" : ""}>{truck.sensor.impact ? "Detected" : "Normal"}</strong></span>
      </div>
      <p className="truck-gps"><span>NEO-6M GPS</span> {truck.sensor.gps.latitude.toFixed(4)}, {truck.sensor.gps.longitude.toFixed(4)}</p>
    </button>
  );
}

function SensorCard({
  label,
  title,
  value,
  unit,
  detail,
  status,
}: {
  label: string;
  title: string;
  value: string;
  unit?: string;
  detail: string;
  status: "NORMAL" | "WARNING" | "CRITICAL";
}) {
  return (
    <article className={`sensor-card sensor-card-${status.toLowerCase()}`}>
      <div className="sensor-card-label"><span>{label}</span><b className={`sensor-status sensor-status-${status.toLowerCase()}`}><i /> {status}</b></div>
      <p>{title}</p>
      <strong>{value}<small>{unit}</small></strong>
      <span className="sensor-card-detail">{detail}</span>
    </article>
  );
}
