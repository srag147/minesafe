export type MonitoringStatus = "Normal" | "Attention" | "Restricted";
export type EventSeverity = "Critical" | "High" | "Medium" | "Low";

export type MonitoringZone = { name: string; status: MonitoringStatus; detail: string };
export type MonitoringEvent = { id: string; type: string; location: string; time: string; severity: EventSeverity; status: string; description: string };
export type MonitoringWorker = { name: string; id: string; zone: string; status: string; checkIn: string; safety: string };
export type MonitoringVehicle = { id: string; type: string; zone: string; status: string; operator: string; updated: string };
export type EnvironmentalReading = { label: string; value: string; unit: string; status: string; tone: "good" | "watch" | "normal"; updated: string };

export const monitoringOverview = { workers: 128, vehicles: 24, alerts: 4, zones: 12, site: "Singareni Mine — Site 04", shift: "Day Shift" };

export const monitoringZones: MonitoringZone[] = [
  { name: "Zone A", status: "Normal", detail: "Operations clear" },
  { name: "Zone B", status: "Attention", detail: "Dust sensor elevated" },
  { name: "Zone C", status: "Normal", detail: "Operations clear" },
  { name: "Zone D", status: "Restricted", detail: "Vehicle access limited" },
];

export const monitoringEvents: MonitoringEvent[] = [
  { id: "EVT-042", type: "High dust concentration detected", location: "Zone B", time: "2 min ago", severity: "High", status: "Investigating", description: "Dust levels are above the preferred operating range near the west transfer point." },
  { id: "EVT-041", type: "Vehicle entered restricted zone", location: "Zone D", time: "5 min ago", severity: "Critical", status: "Action required", description: "A service vehicle crossed the Zone D access boundary. Route control has been notified." },
  { id: "EVT-040", type: "Worker safety check completed", location: "Zone A", time: "8 min ago", severity: "Low", status: "Resolved", description: "Routine worker check completed with all required equipment confirmed." },
];

export const monitoringWorkers: MonitoringWorker[] = [
  { name: "A. Rao", id: "W-184", zone: "Zone A", status: "Active", checkIn: "10:39", safety: "Clear" },
  { name: "M. Prakash", id: "W-162", zone: "Zone B", status: "Safety Check Required", checkIn: "10:32", safety: "Review" },
  { name: "R. Kumar", id: "W-108", zone: "Zone C", status: "On Break", checkIn: "10:12", safety: "Clear" },
  { name: "S. Das", id: "W-091", zone: "Zone A", status: "Active", checkIn: "10:40", safety: "Clear" },
];

export const monitoringVehicles: MonitoringVehicle[] = [
  { id: "TRK-042", type: "Haul Truck", zone: "Zone B", status: "Moving", operator: "Operator assigned", updated: "10:41" },
  { id: "EXC-008", type: "Excavator", zone: "Zone C", status: "Idle", operator: "Operator assigned", updated: "10:39" },
  { id: "SV-019", type: "Service Vehicle", zone: "Zone D", status: "Restricted Zone", operator: "Route review", updated: "10:37" },
  { id: "WT-006", type: "Water Tanker", zone: "Zone B", status: "Moving", operator: "Operator assigned", updated: "10:35" },
];

export const environmentalReadings: EnvironmentalReading[] = [
  { label: "Air quality", value: "Good", unit: "AQI 34", status: "Within limits", tone: "good", updated: "1 min ago" },
  { label: "Dust level", value: "34", unit: "µg/m³", status: "Within limits", tone: "good", updated: "2 min ago" },
  { label: "Temperature", value: "31", unit: "°C", status: "Stable", tone: "normal", updated: "1 min ago" },
  { label: "Humidity", value: "62", unit: "%", status: "Stable", tone: "normal", updated: "1 min ago" },
  { label: "Gas level", value: "Normal", unit: "CH₄ 0.2%", status: "All clear", tone: "good", updated: "1 min ago" },
];
