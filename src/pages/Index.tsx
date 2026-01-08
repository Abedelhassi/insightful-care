import { Link } from "react-router-dom";
import { Activity, Shield, Users, FileText, Bell, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">CareWatch</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link to="/signup" className="btn-medical">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-blue-light text-medical-blue text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            AI-Powered Healthcare Platform
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
            Intelligent Addiction Monitoring for{" "}
            <span className="text-primary">Better Patient Care</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
            Advanced AI-assisted behavioral analysis and real-time monitoring to support 
            healthcare professionals in addiction treatment and recovery management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link to="/signup" className="btn-medical px-8 py-3 text-base gap-2">
              Start Monitoring
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-base font-medium"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Comprehensive Monitoring Suite</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Everything you need to monitor and support patients through their recovery journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "AI Video Analysis",
                description: "Real-time behavioral pattern detection using advanced machine learning algorithms.",
                color: "blue",
              },
              {
                icon: Bell,
                title: "Instant Alerts",
                description: "Automatic Telegram notifications for high-risk behaviors and critical events.",
                color: "red",
              },
              {
                icon: Users,
                title: "Patient Management",
                description: "Comprehensive patient profiles with treatment history and progress tracking.",
                color: "green",
              },
              {
                icon: FileText,
                title: "AI Reports",
                description: "Automated medical reports with behavioral summaries and recommendations.",
                color: "purple",
              },
              {
                icon: Shield,
                title: "HIPAA Compliant",
                description: "Enterprise-grade security with encrypted data storage and transmission.",
                color: "blue",
              },
              {
                icon: CheckCircle2,
                title: "Treatment Tracking",
                description: "Monitor medication adherence and treatment effectiveness over time.",
                color: "green",
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="medical-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  feature.color === "blue" ? "bg-medical-blue-light text-medical-blue" :
                  feature.color === "red" ? "bg-medical-red-light text-medical-red" :
                  feature.color === "green" ? "bg-medical-green-light text-medical-green" :
                  "bg-medical-purple-light text-medical-purple"
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="gradient-primary rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-8">Trusted by Healthcare Professionals</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "500+", label: "Active Patients" },
                { value: "50+", label: "Healthcare Providers" },
                { value: "24/7", label: "Monitoring" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-primary-foreground/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join healthcare professionals who are using AI-assisted monitoring to improve patient outcomes.
          </p>
          <Link to="/signup" className="btn-medical px-8 py-3 text-base gap-2">
            Create Your Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-medium text-foreground">CareWatch</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Notice</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-xs text-muted-foreground">
              Prototype – Not a diagnostic medical system
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
