import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Video, Upload, Sparkles, X, Loader2, FileText, CheckCircle2, Save, Clock, ClipboardList, Activity } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateMockAnalysis, AnalysisData, BehaviorLogEntry } from "@/lib/mockAnalysisData";

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
  const [aiAnalysis, setAiAnalysis] = useState<AnalysisData | null>(null);

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
      const mockData = generateMockAnalysis(id || "P001");
      setAiAnalysis(mockData);

      toast({
        title: "Analysis Complete",
        description: "AI has successfully analyzed the uploaded files and generated a comprehensive behavioral report."
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
      title="Create Patient - Analysis & Results"
      subtitle="Input behavior logs and upload medical reports for AI analysis"
    >
      <div className="max-w-4xl pb-12">
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
              <span className="text-sm font-medium text-medical-blue">Behavior & Medical Analysis</span>
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
              Patient ID: {id || "NEW-001"}
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
                <p className="text-sm text-muted-foreground">Video for behavioral verification</p>
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
                <p className="text-sm text-muted-foreground">Medical documents or lab results</p>
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
                  Generating AI Analysis...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze Patient Case
                </>
              )}
            </button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              AI will synthesize behavior logs, video, and medical reports to generate results
            </p>
          </div>

          {aiAnalysis && (
            <div className="space-y-6 animate-fade-in">
              <div className="medical-card border-medical-purple/30 bg-medical-purple/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-medical-purple-light flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-medical-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI Medical Results & Findings</h3>
                    <p className="text-sm text-muted-foreground">Generated from behavioral and medical data</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Behavioral Observations</h4>
                    <div className="grid gap-2">
                      {aiAnalysis.behaviorLog.map((log, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 bg-background/50 rounded-lg border border-border">
                          <Clock className="w-3 h-3 text-medical-blue" />
                          <div className="flex-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">{log.timeRange}</p>
                            <p className="text-xs font-medium text-foreground">{log.behavior}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Lab Parameters</h4>
                    <div className="space-y-2">
                      {aiAnalysis.medicalResults.map((result, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border">
                          <div>
                            <p className="text-sm font-medium text-foreground">{result.parameter}</p>
                            <p className="text-xs text-muted-foreground">Range: {result.normalRange}</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-bold ${result.status === 'abnormal' ? 'text-destructive' : 'text-medical-green'}`}>
                              {result.value}
                            </p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full uppercase font-bold ${result.status === 'abnormal' ? 'bg-destructive/10 text-destructive' : 'bg-medical-green/10 text-medical-green'}`}>
                              {result.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Addiction Risk Assessment</h4>
                    <div className="p-6 bg-background/50 rounded-lg border border-border text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-medical-purple/20 mb-3">
                        <span className="text-3xl font-bold text-medical-purple">{aiAnalysis.relapseRisk}%</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">Average Relapse Probability</p>
                      <div className="mt-4 flex items-start gap-2 text-left p-3 bg-risk-high-bg rounded-lg">
                        <Activity className="w-4 h-4 text-risk-high mt-0.5" />
                        <p className="text-xs text-risk-high">
                          Behavioral peaks correlate with biochemical markers indicating elevated relapse potential.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Treatment Advices</h4>
                    <div className="grid gap-2">
                      {aiAnalysis.treatmentAdvices.map((advice, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-medical-green-light/30 rounded-lg border border-medical-green/10">
                          <CheckCircle2 className="w-4 h-4 text-medical-green mt-0.5" />
                          <p className="text-sm text-foreground">{advice}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground mt-6 text-center italic">
                  AI-assisted analysis. Final medical decisions remain the responsibility of the physician.
                </p>
              </div>
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
                Cancel
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
