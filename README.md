# 🧠 AI Medical Video Monitoring System

## Overview

This project is a **medical AI prototype** designed to assist doctors in monitoring patients (e.g. addiction recovery cases) by **analyzing patient videos**, detecting risky behaviors, and generating **AI-assisted medical reports and alerts**.

The system combines:

* **Video Understanding AI** (TwelveLabs / Pose-based models)
* **Deep Learning (ResNet-based video feature extraction)**
* **AI Agent (Claude)** for medical-style reasoning
* **n8n Workflow Automation** for alerts and reporting



---



## 🎯 Key Features

### ✅ Video-Based Behavior Detection

* Upload recorded patient videos
* Automatic detection of:

  * Walking / pacing
  * Sitting / standing
  * Falling
  * Agitation
  * Self-harm–like movements

### ✅ AI Agent Medical Reasoning

* Converts raw AI detections into:

  * Chronological behavior reports
  * Risk levels (Low / Medium / High)
  * Clear monitoring recommendations

### ✅ Alerts & Reporting

* **Telegram alerts** for critical events


---

## 🧠 AI Models Used

### 1️⃣ Video Understanding (Primary)

**TwelveLabs API**

* High-level semantic understanding of video
* Detects actions and events automatically
* Outputs timestamps + confidence scores

Example output:

```json
{
  "event": "aggressive_movement",
  "start": 12.4,
  "end": 14.9,
  "confidence": 0.87
}
```

---

### 2️⃣ ResNet-Based Video Feature Extraction (Optional / Local)

Used for deeper motion analysis or on-premise processing.

* Backbone: **ResNet-50 / ResNet-18**
* Input: Video frames or frame sequences
* Purpose:

  * Extract spatial features
  * Support fall detection or abnormal motion detection

Pipeline:

```
Video → Frames → ResNet → Feature Vectors → Motion Logic
```

Libraries:

* PyTorch
* OpenCV
* NumPy

---

### 3️⃣ AI Agent 

 is used as a **medical reasoning agent**, not a vision model.

Responsibilities:

* Interpret detected actions
* Generate medical-style reports
* Highlight dangerous behavior
* Avoid prescriptions or dosage recommendations

Claude receives **structured JSON**, not raw video.

---

## ⚙️ n8n Workflow

### Workflow Steps

1. **Webhook Trigger**

   * Receives patient ID, doctor info, and video URL

2. **HTTP Request – TwelveLabs**

   * Sends video for analysis
   * Receives action timeline

3. **AI Agent Node (Claude)**

   * Analyzes behavior timeline
   * Generates medical report

4. **IF Node (Risk Logic)**

   * High Risk → Immediate alert
   * Medium/Low Risk → Normal report

5. **Notifications**

   * Telegram Node (urgent alerts)
   * Email Node (full report)

---

## 🖥️ Web Application (Doctor Dashboard)

### Core Features

* Doctor login / authentication
* Create and manage patients
* Upload patient videos
* View AI-generated reports
* Receive alerts and notifications

### Suggested Tech Stack

* Frontend: React / Next.js
* Backend: FastAPI / Node.js
* Auth: JWT or OAuth
* Storage: Temporary video storage only

---

## 🔐 Privacy & Ethics

* Videos are processed temporarily
* No permanent storage of sensitive data
* AI outputs are **decision-support only**
* Final medical decisions remain with doctors

---

## 🚀 Prototype Scope

✔️ Hackathons
✔️ Proof of Concept
✔️ Research Demonstrations
✔️ Startup Pitch


---

## 📌 Future Improvements

* Real-time video stream analysis
* On-device pose estimation
* Multi-camera support
* Encrypted video processing
* Clinical validation

---

## 📄 Disclaimer

This system is an **AI-assisted monitoring prototype**.
It does NOT replace professional medical judgment.

---

## 🧩 Authors & Credits

* Video Understanding: TwelveLabs
* Deep Learning: ResNet (He et al.)


---

## 🏁 Status

**Prototype – Functional – Hackathon Ready** 🚀


