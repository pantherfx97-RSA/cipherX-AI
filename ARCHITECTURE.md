# System Architecture 🏛️

This document outlines the architectural design and data flow of **CipherX AI**.

## 1. Architectural Overview
The application follows a **Modular Client-Side Architecture**. It is a Single Page Application (SPA) that emphasizes performance, responsiveness, and zero-backend dependency for data persistence (utilizing LocalStorage).

## 2. Core Layers

### UI Layer (Components)
- **Atomic Components**: Reusable UI elements (e.g., `Logo`, `Sidebar`).
- **Feature Views**: Top-level containers for specific app sections (e.g., `ChatInterface`, `Vault`, `Dashboard`).
- **Context/Props Flow**: State is managed primarily at the `App.tsx` level and passed down through props to maintain a unidirectional data flow.

### Logic Layer (Services)
- **GeminiService**: Handles all AI interactions including streaming chat, image analysis, and TTS. It abstracts the `@google/genai` SDK.
- **StorageService**: Manages all I/O with Browser LocalStorage. Includes logic for credit resets and data migration.
- **PDFService**: Encapsulates the logic for transforming JSON chat sessions into structured, confidential PDF documents.

### Definition Layer (Types & Constants)
- **types.ts**: Single source of truth for interfaces and enums.
- **constants.ts**: Configuration for pricing, branding, and system prompts.

## 3. Data Flow

### Conversational Flow
1. User enters text/image in `ChatInterface`.
2. UI triggers `GeminiService.streamChat`.
3. AI returns a stream of chunks.
4. UI updates state in real-time, simulating a typing effect.
5. `StorageService` persists the updated session object.

### Security Flow (Vault)
1. User sets a custom PIN in `Vault` (initialized on first use).
2. Data is stored as a JSON string in LocalStorage.
3. Access to views like `Vault` or `Private Sessions` triggers a PIN validation check.

## 4. Performance Optimizations
- **Streaming**: Minimizes Time To First Token (TTFT).
- **Audio Context Caching**: The `AudioContext` in `GeminiService` is lazily initialized and reused.
- **Memoization**: Heavy computations (like dashboard stats) use `useMemo`.

## 5. Security Measures
- **System Instructions**: Hardcoded prompts in `constants.ts` define the AI's persona and prevent prompt injection (at a basic level).
- **Client-Side Only**: Sensitive information never leaves the user's browser except when sent directly to the Gemini API for processing.
