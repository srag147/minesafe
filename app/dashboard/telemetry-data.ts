export type TruckStatus = "NORMAL" | "WARNING" | "CRITICAL";

export type GPSData = {
  latitude: number;
  longitude: number;
  signal: "Strong" | "Good" | "Searching";
};

export type SensorData = {
  distance: number;
  tilt: number;
  acceleration: number;
  impact: boolean;
  gps: GPSData;
  updatedAt: number;
};

export type Truck = {
  id: "TRUCK-01" | "TRUCK-02";
  name: string;
  sensor: SensorData;
};

export type TelemetryAlert = {
  id: string;
  truckId: Truck["id"];
  title: string;
  sensor: "HC-SR04" | "MPU6050";
  severity: TruckStatus;
  location: string;
  time: string;
};

export const initialTelemetry: Truck[] = [
  {
    id: "TRUCK-01",
    name: "Crusher Hauler",
    sensor: {
      distance: 8.4,
      tilt: 2.4,
      acceleration: 0.98,
      impact: false,
      gps: { latitude: 28.6139, longitude: 77.209, signal: "Strong" },
      updatedAt: Date.now(),
    },
  },
  {
    id: "TRUCK-02",
    name: "East Ridge Hauler",
    sensor: {
      distance: 8.1,
      tilt: 3.1,
      acceleration: 1.01,
      impact: false,
      gps: { latitude: 28.6148, longitude: 77.2084, signal: "Good" },
      updatedAt: Date.now(),
    },
  },
];

export function getTruckStatus(sensor: SensorData): TruckStatus {
  if (sensor.distance < 1.5 || sensor.tilt > 15 || sensor.impact) {
    return "CRITICAL";
  }
  if ((sensor.distance >= 1.5 && sensor.distance <= 3) || (sensor.tilt >= 8 && sensor.tilt <= 15)) {
    return "WARNING";
  }
  return "NORMAL";
}

export function getDemoTelemetry(phase: number, updatedAt: number): Truck[] {
  const truckOne = initialTelemetry[0];
  const truckTwo = initialTelemetry[1];
  const demoValues = [8.1, 4, 3.2, 2.5, 1.8, 1.2];
  const demoTilts = [3.1, 5, 8.5, 12, 17, 17.8];
  const step = Math.min(phase, demoValues.length - 1);

  return [
    { ...truckOne, sensor: { ...truckOne.sensor, updatedAt } },
    {
      ...truckTwo,
      sensor: {
        ...truckTwo.sensor,
        distance: demoValues[step],
        tilt: demoTilts[step],
        acceleration: step >= 5 ? 2.86 : 1.01 + step * 0.08,
        impact: step >= 5,
        updatedAt,
      },
    },
  ];
}

export function formatTelemetryTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
