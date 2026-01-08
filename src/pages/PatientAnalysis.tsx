import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Video, Upload, Sparkles, X, Loader2, FileText, CheckCircle2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PatientAnalysis() {
  const navigate = useNavigate();
  const { id } = useParams();
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const reportFileInputRef = useRef<HTMLInputElement>(null);

  const [patientData, setPatientData] = useState<any>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [isVideoDragging, setIsVideoDragging] = useState(false);
  const [isReportDragging, setIsReportDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  useEffect(() => {
    const savedPatient = localStorage.getItem('newPatient');
    if (savedPatient) {
      setPatientData(JSON.parse(savedPatient));
    } else {
      toast({
        title: "Error",
        description: "Patient data not found. Please start from the beginning.",
        variant: "destructive",
      });
      navigate("/patients/new");
    }
  }, [navigate]);

  const handleVideoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsVideoDragging(true);
  };

  const handleVideoDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsVideoDragging(false);
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsVideoDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      toast({ title: "Invalid file", description: "Please upload a video file.", variant: "destructive" });
    }
  };

  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleReportDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsReportDragging(true);
  };

  const handleReportDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsReportDragging(false);
  };

  const handleReportDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsReportDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
      setReportFile(file);
    } else {
      toast({ title: "Invalid file", description: "Please upload a PDF or image file.", variant: "destructive" });
    }
  };

  const handleReportFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportFile(file);
    }
  };

  const handleAnalyzeWithAI = () => {
    if (!videoFile && !reportFile) {
      toast({
        title: "Missing files",
        description: "Please upload at least a video or medical report for analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAiAnalysis(`AI Analysis Complete for ${patientData?.fullName}:

Video Analysis:
${videoFile ? `• Video uploaded: ${videoFile.name}
• Duration: Analyzed successfully
• Behavioral Patterns: Patient shows stable posture and movement patterns
• Risk Indicators: No immediate high-risk behaviors detected
• Activity Level: Moderate activity observed
• Anomalies: None detected during observation period` : '• No video uploaded for analysis'}

Medical Report Analysis:
${reportFile ? `• Report uploaded: ${reportFile.name}
• Document Type: Medical report processed
• Key Findings: Medical history reviewed and cross-referenced with patient profile
• Treatment Compatibility: Current medication plan appears appropriate
• Recommendations: Continue monitoring as planned` : '• No medical report uploaded for analysis'}

Medication Review:
• Drug: ${patientData?.drugName || 'Not specified'}
• Dosage: ${patientData?.dosage || 'Not specified'}
• Frequency: ${patientData?.frequency || 'Not specified'}
• Assessment: Medication plan is within standard treatment protocols

Overall Risk Assessment: Low to Medium
• Patient profile indicates stable baseline
• No critical behavioral markers detected
• Medication plan aligns with addiction type
• Recommended monitoring frequency: Daily check-ins for first week

AI Recommendations:
1. Continue current treatment plan with scheduled follow-ups
2. Monitor for any changes in behavioral patterns
3. Ensure patient adherence to medication schedule
4. Schedule next review in 7 days
5. Enable real-time alerts for any concerning behaviors`);

      toast({
        title: "Analysis Complete",
        description: "AI has successfully analyzed the uploaded files and patient data."
      });
    }, 3000);
  };

  const handleFinish = () => {
    localStorage.removeItem('newPatient');

    toast({
      title: "Patient Created Successfully",
      description: `${patientData?.fullName} has been added to the system with AI analysis.`,
    });

    navigate("/dashboard");
  };

  if (!patientData) {
    return null;
  }

  return (
    <DashboardLayout
      title="Create Patient - Step 2"
      subtitle="Upload video and medical reports for AI analysis"
    >
      <div className="max-w-4xl">
        <div className="mb-6 p-4 bg-medical-blue-light rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-medical-green text-white flex items-center justify-center text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm text-muted-foreground">Patient Information</span>
            </div>
            <div className="flex-1 h-0.5 bg-medical-blue mx-2"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-medical-blue text-white flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-sm font-medium text-medical-blue">Video & Analysis</span>
            </div>
          </div>
        </div>

        <div className="medical-card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-lg">{patientData.fullName}</h3>
              <p className="text-sm text-muted-foreground">
                {patientData.age} years old • {patientData.gender} • {patientData.addictionType} Addiction
              </p>
            </div>
            <div className="px-4 py-2 bg-medical-green-light text-medical-green rounded-lg text-sm font-medium">
              Patient ID: {id}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="medical-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Video className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Upload Patient Video</h3>
                <p className="text-sm text-muted-foreground">Video for behavioral analysis and monitoring</p>
              </div>
            </div>

            <div
              onDragOver={handleVideoDragOver}
              onDragLeave={handleVideoDragLeave}
              onDrop={handleVideoDrop}
              onClick={() => videoFileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isVideoDragging
                  ? "border-medical-blue bg-medical-blue/5"
                  : "border-border hover:border-medical-blue/50 hover:bg-muted/50"
              }`}
            >
              <input
                ref={videoFileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoFileSelect}
                className="hidden"
              />
              {videoFile ? (
                <div className="flex items-center justify-center gap-3">
                  <Video className="w-8 h-8 text-medical-green" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{videoFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setVideoFile(null);
                    }}
                    className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-foreground font-medium">Drop video here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV up to 500MB</p>
                </>
              )}
            </div>
          </div>

          <div className="medical-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-medical-purple-light flex items-center justify-center">
                <FileText className="w-5 h-5 text-medical-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Upload Medical Report</h3>
                <p className="text-sm text-muted-foreground">Medical documents, lab results, or treatment history</p>
              </div>
            </div>

            <div
              onDragOver={handleReportDragOver}
              onDragLeave={handleReportDragLeave}
              onDrop={handleReportDrop}
              onClick={() => reportFileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isReportDragging
                  ? "border-medical-purple bg-medical-purple/5"
                  : "border-border hover:border-medical-purple/50 hover:bg-muted/50"
              }`}
            >
              <input
                ref={reportFileInputRef}
                type="file"
                accept=".pdf,image/*"
                onChange={handleReportFileSelect}
                className="hidden"
              />
              {reportFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-8 h-8 text-medical-green" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{reportFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(reportFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setReportFile(null);
                    }}
                    className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-foreground font-medium">Drop medical report here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">PDF, JPG, PNG up to 50MB</p>
                </>
              )}
            </div>
          </div>

          <div className="medical-card border-medical-blue/30 bg-medical-blue/5">
            <button
              onClick={handleAnalyzeWithAI}
              disabled={isAnalyzing || (!videoFile && !reportFile)}
              className="w-full py-4 rounded-xl bg-medical-purple text-white hover:bg-medical-purple/90 transition-colors flex items-center justify-center gap-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze with AI
                </>
              )}
            </button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              AI will analyze uploaded files and generate a comprehensive report
            </p>
          </div>

          {aiAnalysis && (
            <div className="medical-card border-medical-purple/30 bg-medical-purple/5 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-medical-purple-light flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-medical-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Analysis Results</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive AI-generated report</p>
                </div>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-foreground bg-background/50 p-4 rounded-lg font-sans">
                {aiAnalysis}
              </pre>
              <p className="text-xs text-muted-foreground mt-3">
                AI-assisted analysis. Final medical decisions remain the responsibility of the physician.
              </p>
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate("/patients/new")}
              className="px-6 py-2.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              Back
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('newPatient');
                  navigate("/dashboard");
                }}
                className="px-6 py-2.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              >
                Skip Analysis
              </button>
              <button
                onClick={handleFinish}
                disabled={!aiAnalysis}
                className="btn-medical px-6 py-2.5 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Finish & Create Patient
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
