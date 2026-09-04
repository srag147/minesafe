export type Severity = "Critical" | "High" | "Medium" | "Low";
export type AlertStatus = "Open" | "Investigating" | "Assigned" | "Monitoring" | "Resolved";
export type IncidentStatus = "Open" | "Under investigation" | "Resolved" | "Closed";

export type SafetyAlert = {
  id: string;
  title: string;
  location: string;
  detected: string;
  severity: Severity;
  status: AlertStatus;
  assignedTo: string;
  description: string;
};

export type Incident = {
  id: string;
  type: string;
  location: string;
  severity: Severity;
  reportedBy: string;
  dateTime: string;
  status: IncidentStatus;
  description: string;
  peopleInvolved: string;
  immediateAction: string;
  witnesses: string;
};

export const safetyAlerts: SafetyAlert[] = [
  { id: "ALT-042", title: "High dust concentration detected", location: "Zone B", detected: "2 min ago", severity: "Critical", status: "Investigating", assignedTo: "Anita Rao", description: "PM2.5 levels crossed the operational threshold near the west transfer point." },
  { id: "ALT-041", title: "Vehicle proximity warning", location: "Haul Road 03", detected: "8 min ago", severity: "High", status: "Assigned", assignedTo: "M. Prakash", description: "TRK-017 and TRK-042 entered the same haul-road safety buffer." },
  { id: "ALT-040", title: "Worker entered restricted zone", location: "Sector 7", detected: "16 min ago", severity: "Medium", status: "Monitoring", assignedTo: "Ravi Kumar", description: "Badge W-184 crossed the restricted boundary during equipment movement." },
  { id: "ALT-039", title: "Visibility reduced", location: "North Tunnel", detected: "31 min ago", severity: "Low", status: "Monitoring", assignedTo: "Anita Rao", description: "Visibility sensor reports reduced range near the northern access point." },
  { id: "ALT-038", title: "Emergency radio battery low", location: "Zone A", detected: "1 hr ago", severity: "Low", status: "Resolved", assignedTo: "M. Prakash", description: "A portable emergency radio was replaced during the last equipment check." },
];

export const incidents: Incident[] = [
  { id: "INC-248", type: "Near miss", location: "Zone B", severity: "High", reportedBy: "Ravi Kumar", dateTime: "04 Sep 2026 · 09:18", status: "Under investigation", description: "A haul truck entered a shared work area while a spotter was repositioning equipment.", peopleInvolved: "2 operators, 1 spotter", immediateAction: "Vehicle movement paused and the area was isolated for review.", witnesses: "Anita Rao, M. Prakash" },
  { id: "INC-247", type: "Equipment issue", location: "Sector 7", severity: "Medium", reportedBy: "Anita Rao", dateTime: "03 Sep 2026 · 16:42", status: "Resolved", description: "A conveyor guard was found loose during the afternoon inspection.", peopleInvolved: "Maintenance team", immediateAction: "Guard secured and equipment returned to service after inspection.", witnesses: "Ravi Kumar" },
  { id: "INC-246", type: "Environmental", location: "North Tunnel", severity: "Low", reportedBy: "M. Prakash", dateTime: "03 Sep 2026 · 11:06", status: "Closed", description: "Short-duration visibility reduction was recorded at the north tunnel entrance.", peopleInvolved: "Ventilation crew", immediateAction: "Ventilation settings adjusted and sensor readings monitored.", witnesses: "Anita Rao" },
  { id: "INC-245", type: "Near miss", location: "Haul Road 02", severity: "Medium", reportedBy: "Ravi Kumar", dateTime: "02 Sep 2026 · 14:26", status: "Open", description: "A pedestrian route briefly overlapped with a reversing loader path.", peopleInvolved: "1 operator, 2 workers", immediateAction: "Route signage was repositioned and a toolbox talk was scheduled.", witnesses: "M. Prakash" },
];
