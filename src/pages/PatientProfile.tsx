import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  User, 
  Activity, 
  Upload, 
  Play, 
  CheckCircle2,
  AlertTriangle,
  FileText,
  Pill,
  Clock,
  Video,
  Loader2,
  ClipboardList
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateMockAnalysis, AnalysisData } from "@/lib/mockAnalysisData";

// Mock patient data
const patientData = {
  id: "P001",
  name: "John Anderson",
  age: 35,
  gender: "Male",
  addictionType: "Alcohol",
  assignedDoctor: "Dr. Sarah Wilson",
  riskStatus: "high" as const,
  lastAnalysis: "2 hours ago",
};

const detectedBehaviors = [
  { behavior: "Walking", detected: true },
  { behavior: "Sitting", detected: true },
  { behavior: "Agitation", detected: true },
  { behavior: "Falling", detected: false },
  { behavior: "Self-harm behavior", detected: true },
];

export default function PatientProfile() {
  const { id } = useParams();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisData | null>(null);
  const [treatmentData, setTreatmentData] = useState({
    drugName: "Naltrexone",
    dosage: "50mg",
    frequency: "Once daily",
    notes: "Patient responding well to treatment. Continue monitoring for side effects.",
  });

  useEffect(() => {
    // Load existing analysis if any
    const mock = generateMockAnalysis(id || "P001");
    setAnalysisResults(mock);
  }, [id]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const mock = generateMockAnalysis(id || "P001");
      setAnalysisResults(mock);
      toast({
        title: "Analysis Complete",
        description: "Video and behavioral analysis has been completed successfully.",
      });
    }, 3000);
  };

  const riskColors = {
    low: { bg: "bg-risk-low-bg", text: "text-risk-low", label: "Low Risk" },
    medium: { bg: "bg-risk-medium-bg", text: "text-risk-medium", label: "Medium Risk" },
    high: { bg: "bg-risk-high-bg", text: "text-risk-high", label: "High Risk" },
  };

  return (
    <DashboardLayout 
      title={`Patient Profile`} 
      subtitle={`ID: ${id || patientData.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Info & Video Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Info Card */}
          <div className="medical-card">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {patientData.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{patientData.name}</h2>
                  <p className="text-muted-foreground">{patientData.addictionType} Addiction</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl text-lg font-semibold ${riskColors[patientData.riskStatus].bg} ${riskColors[patientData.riskStatus].text}`}>
                {riskColors[patientData.riskStatus].label}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="text-lg font-medium text-foreground">{patientData.age} years</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="text-lg font-medium text-foreground">{patientData.gender}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Assigned Doctor</p>
                <p className="text-lg font-medium text-foreground">{patientData.assignedDoctor}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Last Analysis</p>
                <p className="text-lg font-medium text-foreground">{patientData.lastAnalysis}</p>
              </div>
            </div>
          </div>

          {/* Behavior Log Display */}
          {analysisResults && (
            <div className="medical-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-medical-blue-light flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-medical-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Behavior Log</h3>
                  <p className="text-sm text-muted-foreground">Recorded observations for the current period</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisResults.behaviorLog.map((log, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                    <Clock className="w-4 h-4 text-medical-blue" />
                    <div className="flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">{log.timeRange}</p>
                      <p className="text-sm font-medium text-foreground">{log.behavior}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Upload & Analysis */}
          <div className="medical-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-medical-blue-light flex items-center justify-center">
                <Video className="w-5 h-5 text-medical-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Video Upload & AI Analysis</h3>
                <p className="text-sm text-muted-foreground">Upload video for behavioral analysis</p>
              </div>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-6 hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground">Drop video file here or click to upload</p>
              <p className="text-sm text-muted-foreground mt-1">Supports MP4, AVI, MOV up to 500MB</p>
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-medical w-full py-3 gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Video...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Analyze Video
                </>
              )}
            </button>
          </div>

          {/* Treatment Information */}
          <div className="medical-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-medical-green-light flex items-center justify-center">
                <Pill className="w-5 h-5 text-medical-green" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Treatment Information</h3>
                <p className="text-sm text-muted-foreground">Doctor-prescribed treatment plan</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Drug Name</label>
                <input
                  type="text"
                  value={treatmentData.drugName}
                  onChange={(e) => setTreatmentData({...treatmentData, drugName: e.target.value})}
                  className="input-medical"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Dosage</label>
                <input
                  type="text"
                  value={treatmentData.dosage}
                  onChange={(e) => setTreatmentData({...treatmentData, dosage: e.target.value})}
                  className="input-medical"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Frequency</label>
                <input
                  type="text"
                  value={treatmentData.frequency}
                  onChange={(e) => setTreatmentData({...treatmentData, frequency: e.target.value})}
                  className="input-medical"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Treatment Notes</label>
              <textarea
                value={treatmentData.notes}
                onChange={(e) => setTreatmentData({...treatmentData, notes: e.target.value})}
                rows={3}
                className="input-medical resize-none"
              />
            </div>

            <div className="mt-4 p-3 bg-medical-yellow-light rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-medical-yellow mt-0.5" />
              <p className="text-sm text-medical-yellow">
                Treatment information is provided by the doctor. AI does not prescribe medication.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - AI Report & Alerts */}
        <div className="space-y-6">
          {/* Risk Level Indicator */}
          <div className={`medical-card text-center ${riskColors[patientData.riskStatus].bg}`}>
            <Activity className={`w-12 h-12 mx-auto mb-3 ${riskColors[patientData.riskStatus].text}`} />
            <p className="text-sm text-muted-foreground mb-1">Current Risk Level</p>
            <p className={`text-3xl font-bold ${riskColors[patientData.riskStatus].text}`}>
              {riskColors[patientData.riskStatus].label}
            </p>
            <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              Updated {patientData.lastAnalysis}
            </p>
          </div>

          {/* Relapse Probability */}
          {analysisResults && (
            <div className="medical-card bg-medical-purple/5 border-medical-purple/20 text-center">
              <p className="text-sm text-muted-foreground mb-1">Relapse Probability</p>
              <p className="text-4xl font-bold text-medical-purple">{analysisResults.relapseRisk}%</p>
              <div className="mt-4 p-3 bg-background/50 rounded-lg text-left text-xs text-muted-foreground">
                <p>Based on behavioral patterns and biochemical markers.</p>
              </div>
            </div>
          )}

          {/* Medical Results */}
          {analysisResults && (
            <div className="medical-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-medical-green-light flex items-center justify-center">
                  <Activity className="w-5 h-5 text-medical-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Medical Results</h3>
                  <p className="text-xs text-muted-foreground">Lab and metabolic markers</p>
                </div>
              </div>
              <div className="space-y-3">
                {analysisResults.medicalResults.map((result, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded border border-border/30">
                    <div>
                      <p className="text-xs font-medium text-foreground">{result.parameter}</p>
                      <p className="text-[10px] text-muted-foreground">{result.normalRange}</p>
                    </div>
                    <p className={`text-xs font-bold ${result.status === 'abnormal' ? 'text-destructive' : 'text-medical-green'}`}>
                      {result.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Treatment Advices */}
          {analysisResults && (
            <div className="medical-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-medical-purple-light flex items-center justify-center">
                  <FileText className="w-5 h-5 text-medical-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Treatment Advice</h3>
                  <p className="text-xs text-muted-foreground">AI recommendations</p>
                </div>
              </div>
              <ul className="space-y-2">
                {analysisResults.treatmentAdvices.map((advice, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <CheckCircle2 className="w-3 h-3 text-medical-green shrink-0 mt-0.5" />
                    {advice}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alert History */}
          <div className="medical-card">
            <h3 className="font-semibold text-foreground mb-4">Alert History</h3>
            <div className="space-y-3">
              {[
                { type: "High-Risk Behavior", time: "2 hours ago", desc: "Agitation detected" },
                { type: "High-Risk Behavior", time: "5 hours ago", desc: "Irregular movement" },
                { type: "Monitoring Alert", time: "1 day ago", desc: "Restlessness observed" },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-risk-high-bg rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-risk-high mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Privacy Notice: All patient data is encrypted and handled according to HIPAA regulations.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Prototype – Not a diagnostic medical system
        </p>
      </footer>
    </DashboardLayout>
  );
}
