import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { User, Lock, Calendar, FileText, Pill, Save, Video, Upload, Sparkles, X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CreatePatient() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    age: "",
    gender: "",
    addictionType: "",
    medicalHistory: "",
    notes: "",
    drugName: "",
    dosage: "",
    frequency: "",
    treatmentNotes: "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      toast({ title: "Invalid file", description: "Please upload a video file.", variant: "destructive" });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleAnalyzeWithAI = () => {
    if (!videoFile && !formData.drugName) {
      toast({ title: "Missing data", description: "Please upload a video or enter medication details.", variant: "destructive" });
      return;
    }
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiAnalysis(`AI Analysis Complete:
      
• Video Analysis: Patient shows stable behavioral patterns with no signs of acute distress.
• Medication Review: ${formData.drugName || "No medication specified"} at ${formData.dosage || "unspecified dosage"} - Compatible with patient profile.
• Risk Assessment: Low to moderate risk level based on provided data.
• Recommendations: Continue current treatment plan with regular monitoring.`);
      toast({ title: "Analysis Complete", description: "AI has analyzed the patient data." });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Patient Created",
      description: `${formData.fullName} has been added to the system.`,
    });
    navigate("/dashboard");
  };

  return (
    <DashboardLayout title="Create Patient" subtitle="Add a new patient to the monitoring system">
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Login Credentials Section */}
          <div className="medical-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-medical-blue-light flex items-center justify-center">
                <Lock className="w-5 h-5 text-medical-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Patient Login Credentials</h3>
                <p className="text-sm text-muted-foreground">Create login access for the patient</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Patient Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="patient_john"
                  className="input-medical"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Patient Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-medical"
                  required
                />
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="medical-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-medical-green-light flex items-center justify-center">
                <User className="w-5 h-5 text-medical-green" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Private Patient Information</h3>
                <p className="text-sm text-muted-foreground">Personal and medical details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Anderson"
                  className="input-medical"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Age
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="35"
                    min="1"
                    max="120"
                    className="input-medical pl-11"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-medical appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type of Addiction
                </label>
                <div className="relative">
                  <Pill className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    name="addictionType"
                    value={formData.addictionType}
                    onChange={handleChange}
                    className="input-medical pl-11 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select addiction type</option>
                    <option value="alcohol">Alcohol</option>
                    <option value="opioids">Opioids</option>
                    <option value="cocaine">Cocaine</option>
                    <option value="methamphetamine">Methamphetamine</option>
                    <option value="benzodiazepines">Benzodiazepines</option>
                    <option value="cannabis">Cannabis</option>
                    <option value="prescription-drugs">Prescription Drugs</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Video Upload Section */}
          <div className="medical-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Video className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Video Upload</h3>
                <p className="text-sm text-muted-foreground">Upload patient monitoring video for AI analysis</p>
              </div>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-medical-blue bg-medical-blue/5"
                  : "border-border hover:border-medical-blue/50 hover:bg-muted/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
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
                  <p className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV up to 100MB</p>
                </>
              )}
            </div>
          </div>

          {/* Medication / Treatment Section */}
          <div className="medical-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-medical-green-light flex items-center justify-center">
                <Pill className="w-5 h-5 text-medical-green" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Treatment Information</h3>
                <p className="text-sm text-muted-foreground">Medication and treatment details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Drug Name
                </label>
                <input
                  type="text"
                  name="drugName"
                  value={formData.drugName}
                  onChange={handleChange}
                  placeholder="e.g., Methadone, Buprenorphine"
                  className="input-medical"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Dosage
                </label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  placeholder="e.g., 10mg"
                  className="input-medical"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Frequency
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="input-medical appearance-none cursor-pointer"
                >
                  <option value="">Select frequency</option>
                  <option value="once-daily">Once Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="three-times-daily">Three Times Daily</option>
                  <option value="as-needed">As Needed</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Treatment Notes
                </label>
                <input
                  type="text"
                  name="treatmentNotes"
                  value={formData.treatmentNotes}
                  onChange={handleChange}
                  placeholder="Additional treatment notes..."
                  className="input-medical"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
              ⚠️ Treatment information is provided by the doctor. AI does not prescribe medication.
            </p>
          </div>

          {/* Medical History Section */}
          <div className="medical-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-medical-purple-light flex items-center justify-center">
                <FileText className="w-5 h-5 text-medical-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Medical History & Notes</h3>
                <p className="text-sm text-muted-foreground">Additional medical information</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  placeholder="Enter relevant medical history, previous treatments, allergies, etc."
                  rows={4}
                  className="input-medical resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional notes or observations..."
                  rows={3}
                  className="input-medical resize-none"
                />
              </div>
            </div>
          </div>

          {/* AI Analysis Section */}
          {aiAnalysis && (
            <div className="medical-card border-medical-purple/30 bg-medical-purple/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-medical-purple-light flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-medical-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Analysis Results</h3>
                  <p className="text-sm text-muted-foreground">AI-generated insights</p>
                </div>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-foreground bg-background/50 p-4 rounded-lg">
                {aiAnalysis}
              </pre>
              <p className="text-xs text-muted-foreground mt-3">
                ⚠️ AI-assisted analysis. Final medical decisions remain the responsibility of the physician.
              </p>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex flex-wrap justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAnalyzeWithAI}
              disabled={isAnalyzing}
              className="px-6 py-2.5 rounded-lg bg-medical-purple text-white hover:bg-medical-purple/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
            </button>
            <button type="submit" className="btn-medical px-6 py-2.5 gap-2">
              <Save className="w-4 h-4" />
              Create Patient
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
