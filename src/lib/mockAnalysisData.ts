export interface BehaviorLogEntry {
  timeRange: string;
  behavior: string;
}

export interface MedicalResult {
  parameter: string;
  value: string;
  normalRange: string;
  status: 'normal' | 'abnormal';
}

export interface AnalysisData {
  behaviorLog: BehaviorLogEntry[];
  medicalResults: MedicalResult[];
  relapseRisk: number; // percentage
  treatmentAdvices: string[];
}

export const generateMockAnalysis = (patientId: string): AnalysisData => {
  return {
    behaviorLog: [
      { timeRange: "08:00 - 09:30", behavior: "Sad / Distant" },
      { timeRange: "09:30 - 10:00", behavior: "Aggressive / Angry" },
      { timeRange: "10:00 - 11:30", behavior: "Anxious / Restless" },
      { timeRange: "11:30 - 13:00", behavior: "Calm / Cooperative" },
      { timeRange: "13:00 - 14:30", behavior: "Withdrawn" },
      { timeRange: "14:30 - 16:00", behavior: "Irritable" },
      { timeRange: "16:00 - 18:00", behavior: "Paranoid episodes" },
    ],
    medicalResults: [
      { parameter: "Cortisol Level", value: "22.4 µg/dL", normalRange: "5-23 µg/dL", status: 'normal' },
      { parameter: "Serotonin Index", value: "85 ng/mL", normalRange: "101-283 ng/mL", status: 'abnormal' },
      { parameter: "Sleep Efficiency", value: "62%", normalRange: ">85%", status: 'abnormal' },
      { parameter: "Dopamine Stability", value: "Low", normalRange: "Stable", status: 'abnormal' },
    ],
    relapseRisk: 68,
    treatmentAdvices: [
      "Adjust dosage of antipsychotic medication (Risperidone +0.5mg)",
      "Schedule immediate Cognitive Behavioral Therapy (CBT) session",
      "Monitor sleep patterns for the next 48 hours",
      "Reduce environmental stressors and increase supervision during morning peaks",
    ]
  };
};
