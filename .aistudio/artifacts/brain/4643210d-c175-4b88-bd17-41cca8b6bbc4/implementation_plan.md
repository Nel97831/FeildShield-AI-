# FieldShield AI — Crop Insurance, AI Damage Detector, Satellite Alerting & UI Modernization Plan

FieldShield AI protects Indian farmers against natural disasters and crop losses. This update implements end-to-end crop insurance enrollment during farm registration, dynamic AI-powered damage detection with instant insurance claims or comprehensive non-insured disaster solutions, real satellite-relayed OTP and disaster warnings to farmer mobile phones, and vibrant color-coordinated agricultural task workflows.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following system behaviors and flows have been synthesized to match your specifications:

- **Confirmed Decision 1 (Insurance Enrollment Choice)**: Farm registration will include a clear choice at the final step: allow farmers to opt-in to subsidized PMFBY crop insurance or register without insurance.
- **Confirmed Decision 2 (AI Claim Payout vs Alternative Relief)**: The AI visual damage detector analyzes uploaded field photos. For insured farms, it computes the exact monetary claim compensation based on loss percentage and sum insured. For uninsured farms (or where claim is ₹0), it delivers a 5-pillar contingency package (SDRF disaster grants, KCC loan moratorium, free KVK re-seeding, and agronomic crop salvage).
- **Confirmed Decision 3 (Multimodal Vision Engine)**: Replaces the missing server endpoint and static problem fallbacks with live Gemini 3.8 Flash multimodal vision inspecting the uploaded image bytes directly. The reference photo picker is completely removed.
- **Confirmed Decision 4 (Real Mobile OTP & Satellite Uplink)**: Eliminates on-screen demo OTP cheat codes. Sends real OTPs via backend SMS gateway integration with NavIC/INSAT-3D satellite downlink telemetry and emergency broadcast dispatch.
- **Confirmed Decision 5 (Single Home CTA & Colorful Crop Planner)**: Consolidates duplicate registration buttons on the Home page into a single prominent primary CTA, and revamps Crop Planner with vibrant status cards, phenological progress bars, and high-contrast alert indicators.

---

## 1. Overview & Core Concept

- **What It Does**: 
  1. Allows farmers to register farms and choose whether to attach official PMFBY crop insurance.
  2. Evaluates farm damage photos using Gemini 3.8 Flash multimodal AI to detect exact loss percentage, disease/flood cause, and immediate payout.
  3. Provides relief assistance, government grant guidance (SDRF/NDRF), and agronomic revival protocols if the crop is not covered by insurance.
  4. Delivers authentic OTPs and disaster broadcasts to the farmer's mobile number via satellite downlink.
  5. Provides a color-coded crop planner and a streamlined home page.
- **Target Audience / Persona**: Smallholder, marginal, and tenant farmers across Indian states (Punjab, Haryana, UP, Bihar, Maharashtra, etc.) navigating flood seasons, pest outbreaks, and climate hazards.
- **Key Value**: Closes the loop from farm registration to early disaster alerts, dynamic AI loss verification, and rapid financial recovery.

---

## 2. User Experience & Visual Design

### Key User Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. Farm Registration                            │
│  Demarcate Land -> Crop & Sowing Details -> [Insurance Opt-in / Out]   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   2. Satellite Alert & Real Mobile OTP                 │
│  Enter Mobile Number -> Satellite Uplink -> Real Carrier OTP Dispatched│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 3. AI Crop Photo Damage Inspection                     │
│  Upload Real Field Damage Photo (No Reference Selector)                │
│  Gemini 3.8 Flash Vision Analyzes Loss %, Damage Type & Crop Vigor     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     ▼                             ▼
       ┌───────────────────────────┐ ┌───────────────────────────┐
       │   Insured Farm Path       │ │  Uninsured / ₹0 Payout    │
       │   - AI Loss % Calculated  │ │  - SDRF State Relief      │
       │   - PMFBY Claim Generated │ │  - KVK Re-seeding Seeds   │
       │   - Payout Direct to KCC  │ │  - Agronomic Bio-Salvage  │
       └───────────────────────────┘ └───────────────────────────┘
```

### Visual Identity & Color System
- **Theme**: High-contrast dark agricultural palette (`#051F20` Abyss, `#0B2B26` Surface, `#163832` Elevated, `#235347` Border, `#8EB69B` Primary Accent, `#DAF1DE` Light text).
- **Crop Planner & Tasks Color Coding**:
  - **Emerald (`#10B981` / `#059669`)**: Bio-fertilizers, organic inputs, vegetative tillering tasks.
  - **Amber (`#F59E0B` / `#D97706`)**: Drainage furrow clearance, canal inspection, AWD water management.
  - **Sky Blue (`#0EA5E9` / `#0284C7`)**: Irrigation intervals, submerged root aeration, water table watch.
  - **Crimson (`#EF4444` / `#DC2626`)**: Critical flood cautions, human safety warnings, emergency evacuation.
  - **Purple / Violet (`#8B5CF6`)**: Grain filling, harvest timing, mandi procurement logistics.
- **Zero-Pill Discipline**: Metadata displayed with clean unboxed text and typographic bullet separators (`·`).

---

## 3. Technical Architecture & Implementation Details

```
┌───────────────────────────────────────────────────────────────────────┐
│                          Client (React 19 + Vite)                     │
│                                                                       │
│  HomePage.tsx            ──> Single Unified Primary 'Register Farm'   │
│  CropPlannerPage.tsx     ──> Vivid Categorized Tasks & Growth Bar     │
│  RegisterFarmPage.tsx    ──> PMFBY Insurance Enrolment Option (Yes/No)│
│  CropPhotoAssessmentPage ──> Real Photo Upload -> AI Claim Calculator │
│  SmsAlertsPage.tsx       ──> Real Mobile OTP + Satellite Downlink     │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │ HTTP JSON / Multimodal Base64
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│                         Server.ts (Express API)                       │
│                                                                       │
│  POST /api/gemini/analyze-crop-photo (Gemini 3.8 Flash Multimodal)    │
│  POST /api/sms/send-otp             (SMS Gateway + Satellite Telemetry)
│  POST /api/sms/verify-otp           (Real Code Verification)          │
│  POST /api/satellite/disaster-alert (Emergency Broadcast Relay)       │
└───────────────────────────────────────────────────────────────────────┘
```

### Planned File Edits
1. `server.ts`:
   - Add `POST /api/gemini/analyze-crop-photo`: Uses `@google/genai` with model `gemini-3.8-flash` receiving image base64 + crop type, returns JSON schema containing: `cropType`, `detectedHealth`, `damagePercentage`, `severity`, `visibleSymptoms`, `suspectedConditions`, `immediateSteps`, `recoveryPotential`, `estimatedLossPerAcreInr`, `recommendedClaimAmountInr`, `uninsuredAlternativeSolutions`.
   - Add `POST /api/sms/send-otp` & `POST /api/sms/verify-otp`: Real OTP generation and delivery logic for the registered mobile number, with satellite packet telemetry (NavIC transponder ID, frequency, latency).
   - Add `POST /api/satellite/disaster-alert`: Dispatches real emergency broadcast payload to registered mobile numbers.
2. `src/types/index.ts`:
   - Add insurance fields to `Farm`: `hasInsurance: boolean`, `insurancePolicyNumber?: string`, `sumInsuredPerAcre?: number`, `insuranceCompany?: string`.
   - Update `CropPhotoAssessment` to include `damagePercentage: number`, `financialLossInr: number`, `insuranceClaimStatus: 'eligible' | 'ineligible' | 'not_insured'`, `payoutAmountInr: number`, `alternativeSolutions: string[]`.
3. `src/pages/HomePage.tsx`:
   - Remove redundant second register farm card/button in the pillar section.
   - Establish the Hero button ("Register Your Farm") as the single primary call-to-action.
   - Update Pillar 1 to be "Farm Cadastral Intelligence & Land Records" linking to the Dashboard / Farm Records view.
4. `src/pages/CropPlannerPage.tsx`:
   - Restyle completely into the `#051F20` / `#0B2B26` / `#163832` theme.
   - Add rich color coding across task categories (drainage, nutrition, pest defense, safety).
   - Implement phenological stage visual timeline with dynamic progress meters and actionable status indicators.
5. `src/pages/RegisterFarmPage.tsx`:
   - Add Step 5: "PMFBY Crop Insurance Coverage Enrolment" with toggle/choice (Yes - Enroll in PMFBY Crop Insurance / No - Proceed without insurance).
   - When enrolled, display coverage details (sum insured per acre based on crop type, farmer premium contribution 1.5% - 2.0%, government subsidy 98%).
6. `src/pages/CropPhotoAssessmentPage.tsx`:
   - Completely remove the reference photo picker section (`REFERENCE_FLOOD_PHOTOS` thumbnails).
   - Only allow uploading or snapping the farmer's actual field photo.
   - Remove hardcoded problem presets that override AI output.
   - Send the actual photo to `/api/gemini/analyze-crop-photo`.
   - Render the comprehensive Insurance Claim Payout section:
     - If farm is insured: Show calculated payout in ₹ (Rupees), claim submission button, reference ID, and surveyor report.
     - If farm is not insured or ₹0 payout: Display complete alternative relief solutions (SDRF emergency funds, KVK free seed kits, KCC loan moratorium, soil aeration, bio-stimulants).
7. `src/pages/SmsAlertsPage.tsx`:
   - Remove on-screen demo OTP display.
   - Send real OTP request to `/api/sms/send-otp`.
   - Add Satellite Uplink Status monitor showing NavIC/INSAT-3D transponder communication.
   - Enable satellite emergency disaster alert broadcast testing.

---

## 4. Verification & Testing Plan
- Test server builds and starts without compilation or bundling errors (`compile_applet`).
- Verify Home page renders a single prominent register farm CTA.
- Verify Crop Planner displays vibrant, contrasting color themes without white-box regressions.
- Verify Crop Photo Assessment receives dynamic analysis for any uploaded image, removes reference photo selection, and outputs either claim money or complete alternative solutions.
- Verify farm registration allows choosing crop insurance and saves the selection.
- Verify OTP and satellite alerts transmit cleanly without displaying demo codes.
