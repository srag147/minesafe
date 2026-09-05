"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { monitoringWorkers, type MonitoringWorker } from "../monitoring-data";
import "../dashboard.css";

const nav = [["Overview", "/dashboard", "▦"], ["Live Monitoring", "/dashboard/monitoring", "◉"], ["Vehicles", "/dashboard/vehicles", "▱"], ["Workers", "/dashboard/workers", "♙"], ["Safety Alerts", "/dashboard/alerts", "△"], ["Analytics", "/dashboard/analytics", "⌁"], ["Reports", "/dashboard/reports", "▤"], ["Settings", "/dashboard/settings", "⚙"]];
type WorkerFilter = "All" | "Clear" | "Review" | "On Break";

function Brand() {
  return <Link className="dashboard-brand" href="/"><span className="dashboard-logo" aria-hidden="true"><i /><i /><i /></span><span>Mine<span>Safe</span></span></Link>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="dashboard-shell worker-page"><aside className="dashboard-sidebar"><Brand /><div className="sidebar-label">Workspace</div><nav>{nav.map(([label, href, icon]) => <Link className={label === "Workers" ? "active" : ""} href={href} key={label}><span className="sidebar-text-icon">{icon}</span>{label}{label === "Safety Alerts" && <b className="nav-count">4</b>}</Link>)}</nav><div className="sidebar-bottom"><div className="shift-card"><span className="shift-pulse" /><div><strong>Day shift active</strong><small>07:00 — 19:00 IST</small></div></div><a className="sidebar-help" href="mailto:safety-ops@minesafe.example">Need help? <span>Contact safety ops ↗</span></a></div></aside><div className="dashboard-main"><header className="dashboard-header"><div className="mobile-brand"><Brand /></div><div className="header-title"><p>MineSafe / People safety</p><h1>Worker Monitoring</h1></div><div className="header-actions"><div className="site-selector"><span className="site-pin">+</span><span><small>Current site</small>Singareni Mine — Site 04</span></div><span className="header-divider" /><span className="avatar">RK</span></div></header><main className="dashboard-content">{children}</main><footer className="dashboard-footer"><span>MineSafe Operations Console v1.0</span><span>Simulated worker telemetry · Last sync updates live <i /></span></footer></div></div>;
}

function formatTime(date: Date) {
  return `${date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })} IST`;
}

export default function WorkersPage() {
  const [workers, setWorkers] = useState<MonitoringWorker[]>(monitoringWorkers);
  const [filter, setFilter] = useState<WorkerFilter>("All");
  const [lastUpdated, setLastUpdated] = useState("10:42:18 IST");

  useEffect(() => {
    let tick = 0;
    const interval = window.setInterval(() => {
      const currentTime = new Date();
      tick += 1;
      setLastUpdated(formatTime(currentTime));
      setWorkers((current) => current.map((worker, index) => index === tick % current.length && worker.status === "Active" ? { ...worker, checkIn: currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }) } : worker));
    }, 4000);
    return () => window.clearInterval(interval);
  }, []);

  const filteredWorkers = filter === "All" ? workers : workers.filter((worker) => filter === "Clear" ? worker.safety === "Clear" : filter === "Review" ? worker.safety === "Review" : worker.status === "On Break");
  const reviewCount = workers.filter((worker) => worker.safety === "Review").length;
  const activeCount = workers.filter((worker) => worker.status === "Active").length;

  return <Shell><section className="management-intro worker-intro"><div><p className="dashboard-eyebrow"><span /> People safety · DEMO MODE</p><h2>Worker safety <span className="title-count">{workers.length.toString().padStart(2, "0")}</span></h2><p>Keep every crew member accounted for, checked in, and supported throughout the shift.</p></div><span className="monitoring-system"><i /> WORKER TELEMETRY ONLINE</span></section><section className="worker-stats"><div><strong>{activeCount}</strong><span>Active workers</span><small>Checked in this shift</small></div><div><strong>{workers.length}</strong><span>Tracked on site</span><small>Site 04 workforce</small></div><div className={reviewCount > 0 ? "worker-stat-warning" : ""}><strong>{reviewCount.toString().padStart(2, "0")}</strong><span>Safety review</span><small>Supervisor attention</small></div><div><strong>100%</strong><span>Accounted for</span><small>Last sync {lastUpdated}</small></div></section><section className="panel worker-panel"><div className="worker-panel-toolbar"><div><p className="panel-kicker">Live roster</p><h2>People on site</h2></div><div className="worker-controls"><span className="telemetry-live"><i /> Updated {lastUpdated}</span><select aria-label="Filter workers" value={filter} onChange={(event) => setFilter(event.target.value as WorkerFilter)}><option>All</option><option>Clear</option><option>Review</option><option>On Break</option></select></div></div><div className="worker-list">{filteredWorkers.map((worker) => <article className="worker-row" key={worker.id}><div className="worker-avatar">{worker.name.split(" ").map((part) => part[0]).join("")}</div><div className="worker-identity"><strong>{worker.name}</strong><span>{worker.id} · {worker.zone}</span></div><span className={`worker-presence worker-presence-${worker.status.toLowerCase().replaceAll(" ", "-")}`}><i />{worker.status}</span><div className="worker-checkin"><small>Last check-in</small><strong>{worker.checkIn}</strong></div><span className={`worker-safety worker-safety-${worker.safety.toLowerCase()}`}>{worker.safety === "Clear" ? "Safety clear" : "Safety check required"}</span><button className="worker-action" aria-label={`Review ${worker.name}`}>Review ↗</button></article>)}</div>{filteredWorkers.length === 0 && <div className="empty-state"><strong>No workers match this filter.</strong><p>Choose another roster state to continue monitoring.</p></div>}</section><section className="worker-note"><div><p className="panel-kicker">Safety response</p><h2>{reviewCount > 0 ? "One crew member needs a safety check." : "All crew members are clear."}</h2><p>Worker states are simulated for the SIH demo and are ready to be replaced by future ESP32, badge, or control-room data.</p></div><Link className="button action-primary" href="/dashboard/safety-checklist">Open checklist <span>↗</span></Link></section></Shell>;
}
