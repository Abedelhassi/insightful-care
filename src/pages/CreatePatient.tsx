import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { User, Lock, Calendar, FileText, Pill, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CreatePatient() {
  const navigate = useNavigate();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const patientId = `P${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;

    localStorage.setItem('newPatient', JSON.stringify({
      ...formData,
      id: patientId,
    }));

    toast({
      title: "Patient Information Saved",
      description: `${formData.fullName}'s information has been saved. Proceeding to analysis...`,
    });

    navigate(`/patients/${patientId}/analysis`);
  };

  return (
    <DashboardLayout title="Create Patient - Step 1" subtitle="Enter patient basic information">
      <div className="max-w-3xl">
        <div className="mb-6 p-4 bg-medical-blue-light rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-medical-blue text-white flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="text-sm font-medium text-medical-blue">Patient Information</span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-2"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-border text-muted-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-sm text-muted-foreground">Video & Analysis</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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
              Treatment information is provided by the doctor. AI does not prescribe medication.
            </p>
          </div>

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

          <div className="flex flex-wrap justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-medical px-6 py-2.5 gap-2">
              Continue to Video & Analysis
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
