
export enum AlertSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface DetectionEvent {
  id: string;
  cameraId: string;
  timestamp: Date;
  location: string;
  type: string;
  severity: AlertSeverity;
  description: string;
  imageUrl: string;
  videoUrl?: string; // Video dalil uchun
  evidencePoints: string[];
}

export interface CameraState {
  id: string;
  name: string;
  status: 'active' | 'offline' | 'alert';
  lastDetection?: string;
}
