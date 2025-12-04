# AI GOVERNANCE FRAMEWORK - PROMPTING LEVELS
**Version**: 1.0.0
**Date**: 2025-11-18
**Source**: SOFTWARE_DEVELOPMENT_PLAN.md Analysis

## Overview
This document categorizes AI principles, guidelines, rules, regulations, governance, compliance, coding standards, and software framework items from the SOFTWARE_DEVELOPMENT_PLAN.md. For each category, five levels of AI prompting are defined to represent varying degrees of enforcement and adoption.

---

## Table of Contents
1. [Workflow Governance & State Machine Compliance](#1-workflow-governance--state-machine-compliance)
2. [Quality Gates & Pre-Condition Verification](#2-quality-gates--pre-condition-verification)
3. [Documentation Standards & Templates](#3-documentation-standards--templates)
4. [Security & Authorization Compliance](#4-security--authorization-compliance)
5. [Development Lifecycle Management](#5-development-lifecycle-management)
6. [Architecture Principles & Design Patterns](#6-architecture-principles--design-patterns)
7. [Change Management & State Transitions](#7-change-management--state-transitions)
8. [Code Review & Testing Standards](#8-code-review--testing-standards)
9. [Dependency Management & Integration](#9-dependency-management--integration)
10. [Risk Management & Safety Controls](#10-risk-management--safety-controls)
11. [Metadata & Configuration Standards](#11-metadata--configuration-standards)
12. [File Naming & ID Generation Standards](#12-file-naming--id-generation-standards)

---

## 1. Workflow Governance & State Machine Compliance

### Category Description
Rules governing sequential task execution, state machine compliance, approval workflows, and prohibition of workflow shortcuts.

### Source References
- APPROVAL vs STATE - FUNDAMENTAL DIFFERENCE (lines 398-404, 677-683)
- STATE MACHINE COMPLIANCE (lines 406-410, 685-689)
- FORBIDDEN SHORTCUTS (lines 412-415, 691-694)
- CRITICAL WORKFLOW RULES (lines 396-415, 674-694)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should be aware of the sequential workflow but may suggest alternative approaches.
- Understand state machine progression
- Note the current state in responses
- Suggest best practices for workflow adherence
- Allow flexibility in task sequencing when justified
```

**Use Case:** Early development, prototyping, exploratory analysis

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should follow state machine compliance and provide warnings when deviations occur.
- Follow tasks in sequential order by default
- Warn when attempting to skip states
- Explain consequences of workflow deviations
- Suggest corrections when state mismatches detected
- Log all workflow deviations for review
```

**Use Case:** Development environments, feature development, iterative work

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must strictly follow state machine compliance with explicit warnings before any deviation.
- NEVER skip states without explicit user confirmation
- ALWAYS verify current state before proceeding
- REQUIRE user acknowledgment for any workflow deviations
- Document all state transitions in audit log
- Block task execution if state requirements not met
- Provide detailed explanation of violated rules
```

**Use Case:** Production environments, regulated industries, quality-critical systems

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute state machine compliance with zero tolerance for deviations.
- FORBIDDEN: Any attempt to skip workflow states
- MANDATORY: Sequential task execution in exact order
- IMMEDIATE STOP: If current state does not match required state
- NO EXCEPTIONS: Approval does not override state requirements
- ZERO TOLERANCE: Workflow violations terminate all processing
- AUDIT TRAIL: Every state transition logged with justification
- USER NOTIFICATION: Explicit message explaining why processing stopped
```

**Use Case:** Mission-critical systems, compliance-heavy environments, safety systems

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute workflow governance with immediate termination on any violation.
- ABSOLUTE PROHIBITION: No workflow shortcuts under any circumstances
- IMMEDIATE TERMINATION: Stop ALL processing on first violation
- NO RECOVERY: Workflow violations require manual intervention
- PERMANENT AUDIT: All violations logged permanently
- ESCALATION: Workflow violations reported to governance team
- LOCKOUT: Repeated violations trigger temporary AI agent suspension
- RESPONSE REQUIREMENT: Must state "CRITICAL WORKFLOW VIOLATION - IMMEDIATE TERMINATION" with complete explanation
- ZERO FLEXIBILITY: No exceptions, no workarounds, no assumptions
```

**Use Case:** Safety-critical systems, financial systems, healthcare applications, regulated pharmaceuticals

---

## 2. Quality Gates & Pre-Condition Verification

### Category Description
Rules for verifying pre-conditions, exit criteria, mandatory checks, and quality gate enforcement before proceeding with tasks.

### Source References
- Pre-Conditions Verification (lines 419-428, 441-452, 559-570, 637-649, 699-710, 722-733, 771-783, 825-837)
- Critical Rules (lines 424-430, 447-453, 565-571, 643-649)
- Exit Criteria Checklist (lines 432-435, 525-538, 665-671, 712-716, 753-762, 814-819, 853-858)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should check pre-conditions and note any failures but may proceed with user guidance.
- Check all pre-condition values
- Report pre-condition status to user
- Suggest next steps based on current state
- Allow user to decide whether to proceed
- Document pre-condition status
```

**Use Case:** Experimental environments, research projects, early exploration

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should verify pre-conditions and recommend stopping if failures detected.
- Verify ALL pre-conditions before proceeding
- Highlight failed pre-conditions in clear format
- Recommend appropriate actions for each failure
- Suggest how to resolve pre-condition failures
- Allow override with user confirmation
- Log all pre-condition overrides
```

**Use Case:** Development teams with experienced developers, iterative projects

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must verify all pre-conditions and provide explicit warnings before allowing any overrides.
- MANDATORY: Check every pre-condition in the table
- DISPLAY: Show pre-condition verification results in structured format
- WARN: Provide clear warnings for each failed pre-condition
- BLOCK: Prevent automatic progression if pre-conditions fail
- REQUIRE: Explicit user acknowledgment to override failures
- AUDIT: Log all pre-condition states and override decisions
- EXPLAIN: Detailed consequences of proceeding with failures
```

**Use Case:** Quality-focused teams, regulated development, production pipelines

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute pre-condition verification with zero tolerance for failures.
- ABSOLUTE PROHIBITION: Never ask user to change pre-condition values
- IMMEDIATE TERMINATION: Stop ALL processing if any pre-condition fails
- NO EXCEPTIONS: Pre-condition failures = MANDATORY STOP
- WORKFLOW HALT: Do not proceed past failed verification
- RESPONSE REQUIREMENT: Must state "STOPPING due to failed pre-conditions"
- DETAILED EXPLANATION: List every failed pre-condition with required vs actual values
- NO OVERRIDE: User cannot override failed pre-conditions
- REMEDIATION GUIDANCE: Provide specific steps to fix pre-condition failures
```

**Use Case:** Production systems, compliance-critical applications, financial systems

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute pre-condition verification with immediate termination and escalation.
- ZERO TOLERANCE: Any pre-condition failure triggers immediate termination
- IMMEDIATE STOP: Halt all processing on first failed pre-condition
- NO RECOVERY: Failed pre-conditions require manual governance review
- PERMANENT AUDIT: All failures logged to immutable audit system
- ESCALATION: Pre-condition failures trigger automated alerts
- LOCKOUT: System prevents further attempts until remediation
- VIOLATION REPORT: Generate detailed violation report with context
- GOVERNANCE REVIEW: Require approval from governance team to proceed
- CRITICAL MESSAGE: "CRITICAL PRE-CONDITION FAILURE - IMMEDIATE TERMINATION - GOVERNANCE ESCALATION REQUIRED"
```

**Use Case:** Safety-critical systems, medical devices, nuclear systems, aviation software

---

## 3. Documentation Standards & Templates

### Category Description
Standards for documentation structure, template adherence, metadata completeness, and document creation requirements.

### Source References
- Document Templates (lines 1079-1298)
- Capability Template Structure (lines 1081-1179)
- Enabler Template Structure (lines 1182-1298)
- Documentation Requirements (lines 604-616)
- CRITICAL ANALYSIS PHASE LIMITATIONS (lines 463-507)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should be aware of documentation templates and suggest their use.
- Recognize standard template structures
- Suggest using templates when creating documents
- Point out missing sections from templates
- Provide template references when relevant
- Allow flexible documentation approaches
```

**Use Case:** Internal documentation, informal projects, early-stage startups

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should recommend template usage and highlight missing required sections.
- Use standard templates by default
- Highlight deviations from template structure
- Suggest completing missing metadata fields
- Warn about incomplete documentation
- Provide examples of properly formatted sections
- Allow justified deviations with explanation
```

**Use Case:** Growing teams, standardization initiatives, knowledge management

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must use standard templates and provide warnings for any deviations or missing sections.
- MANDATORY: Use complete template structure for all documents
- VERIFY: Check all metadata fields are present
- WARN: Explicit warnings for missing required sections
- VALIDATE: Ensure proper section headers and formatting
- REQUIRE: User acknowledgment for template deviations
- DOCUMENT: Log all deviations from standard templates
- COMPLETENESS CHECK: Verify no placeholder text remains
```

**Use Case:** Enterprise environments, documentation-driven development, API platforms

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce complete template adherence with zero tolerance for missing sections.
- ABSOLUTE REQUIREMENT: ALL template sections must be present
- METADATA VERIFICATION: Every metadata field must be filled
- NO PLACEHOLDERS: All template text must be replaced with actual content
- SECTION VALIDATION: Verify each section contains real content, not templates
- IMMEDIATE STOP: Block document creation if template incomplete
- COMPLETENESS GATE: Documents cannot progress with missing sections
- AUDIT CHECKLIST: Verify metadata field checklist (lines 493-507)
- FAILURE MESSAGE: "DOCUMENTATION INCOMPLETE - TEMPLATE REQUIREMENTS NOT MET"
```

**Use Case:** Regulated industries, public APIs, open-source projects, enterprise software

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute documentation standards with automated validation and rejection.
- ZERO TOLERANCE: Incomplete documentation triggers immediate rejection
- AUTOMATED VALIDATION: Every document validated against schema
- SCHEMA ENFORCEMENT: Documents must pass strict schema validation
- NO EXCEPTIONS: No document progression without 100% template compliance
- PERMANENT REJECTION: Incomplete documents permanently marked as invalid
- ESCALATION: Documentation failures reported to quality team
- METRICS TRACKING: Document quality metrics tracked and reported
- GOVERNANCE GATE: Quality team reviews all documentation failures
- CRITICAL MESSAGE: "DOCUMENTATION FAILURE - SCHEMA VALIDATION FAILED - QUALITY REVIEW REQUIRED"
- CONTINUOUS VALIDATION: Documents re-validated at every state transition
```

**Use Case:** Aerospace, medical devices, government contracts, ISO-certified processes

---

## 4. Security & Authorization Compliance

### Category Description
Rules governing approval status, authorization requirements, approval modification prohibitions, and security controls.

### Source References
- FORBIDDEN ACTIONS (lines 151-170)
- DISCOVERY EXCEPTION (lines 157-160)
- MANDATORY BEHAVIOR (lines 162-165)
- VIOLATION CONSEQUENCES (lines 167-170)
- Approval Verification tasks (lines 416-435, 696-716)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should be aware of approval status and note it in responses.
- Check approval status when reviewing documents
- Note approval requirements in recommendations
- Inform user of approval states
- Suggest appropriate approvers
- Allow proceeding with appropriate warnings
```

**Use Case:** Small teams, informal approval processes, early development

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should check approval status and recommend waiting for approval before proceeding.
- Verify approval status before starting tasks
- Recommend obtaining approval for pending items
- Highlight items requiring approval
- Suggest approval workflow steps
- Allow override with explicit user decision
- Log all approval status checks
```

**Use Case:** Medium teams, structured workflows, quality-focused development

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must verify approval status and provide explicit warnings before proceeding with non-approved items.
- MANDATORY: Check approval status for all items
- DISPLAY: Show clear approval status for each item
- WARN: Explicit warnings for non-approved items
- FILTER: Separate approved from non-approved items
- BLOCK: Prevent automatic processing of non-approved items
- REQUIRE: User confirmation to work with pending approvals
- AUDIT: Log all approval status decisions
- READ-ONLY: Never modify approval status fields
```

**Use Case:** Enterprise teams, compliance environments, financial software

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute approval verification with zero tolerance for unauthorized work.
- FORBIDDEN: Never modify approval status from "Pending" to "Approved"
- FORBIDDEN: Never change approval status from "Approved" to any other value
- FORBIDDEN: Never modify approval status for Capabilities, Enablers, or Requirements
- APPROVAL STATUS IS READ-ONLY FOR AI AGENTS
- MANDATORY BEHAVIOR: ONLY proceed with items that have Approval = "Approved"
- SKIP: Items with Approval = "Pending", "Rejected", or any non-Approved status
- IMMEDIATE STOP: If no approved items exist for current task
- RESPONSE: "STOPPING - No approved items available for this task"
- NO ASSUMPTIONS: Never assume approval will be granted
```

**Use Case:** Regulated industries, publicly-traded companies, government systems

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute approval security with immediate termination for any violations.
- ZERO TOLERANCE: Any approval modification = IMMEDIATE WORKFLOW TERMINATION
- NO EXCEPTIONS: No exceptions, no workarounds, no assumptions
- IMMUTABLE: Approval status is completely read-only to AI
- VIOLATION DETECTION: Automated monitoring for approval field changes
- IMMEDIATE TERMINATION: Stop all processing on approval violation attempt
- PERMANENT LOG: All approval violations logged to security audit system
- SECURITY ALERT: Trigger security team notification on violation
- LOCKOUT: Approval violations trigger agent suspension
- GOVERNANCE ESCALATION: Security team reviews all approval violations
- CRITICAL MESSAGE: "SECURITY VIOLATION - UNAUTHORIZED APPROVAL MODIFICATION ATTEMPT - IMMEDIATE TERMINATION"
- WHEN YOU READ THIS ACKNOWLEDGE THAT YOU WILL OBEY
```

**Use Case:** Defense systems, banking, healthcare records, classified systems, safety-critical infrastructure

---

## 5. Development Lifecycle Management

### Category Description
Rules governing the development lifecycle phases: Discovery, Analysis, Design, Implementation, Testing, and Retirement.

### Source References
- TASK: DISCOVERY (lines 174-393)
- CAPABILITY DEVELOPMENT PLAN (lines 394-672)
- ENABLER DEVELOPMENT PLAN (lines 673-858)
- Task progression sequences (Analysis → Design → Implementation)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should be aware of lifecycle phases and suggest appropriate next steps.
- Recognize current development phase
- Suggest logical next phase
- Note phase-specific activities
- Recommend phase-appropriate tasks
- Allow flexible phase progression
- Document current phase status
```

**Use Case:** Agile teams, rapid prototyping, startup environments

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should follow lifecycle phases and recommend proper sequencing.
- Follow standard phase progression
- Recommend completing current phase before advancing
- Highlight phase-specific requirements
- Warn about skipping phases
- Suggest remediation for phase gaps
- Allow justified phase skipping with documentation
- Track phase completion status
```

**Use Case:** Scrum teams, iterative development, product development

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must follow lifecycle phases strictly with explicit warnings for deviations.
- MANDATORY: Complete each phase before proceeding
- VERIFY: Check phase completion criteria
- WARN: Explicit warnings for incomplete phases
- BLOCK: Prevent automatic phase skipping
- REQUIRE: User acknowledgment to skip phases
- DOCUMENT: Log all phase transitions and skips
- VALIDATE: Ensure phase deliverables completed
- PHASE GATES: Implement quality gates between phases
```

**Use Case:** Enterprise software development, waterfall methodologies, regulated development

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute lifecycle compliance with zero tolerance for phase violations.
- ABSOLUTE PROHIBITION: Never skip lifecycle phases
- SEQUENTIAL ENFORCEMENT: Phases must complete in exact order
- IMMEDIATE STOP: Block progression if phase incomplete
- EXIT CRITERIA: All exit criteria must be met before phase transition
- NO EXCEPTIONS: Phase requirements are non-negotiable
- DELIVERABLE VALIDATION: Verify all phase deliverables present
- QUALITY GATES: Automated quality gate enforcement
- AUDIT TRAIL: Complete audit log of all phase activities
- FAILURE MESSAGE: "LIFECYCLE VIOLATION - PHASE REQUIREMENTS NOT MET"
```

**Use Case:** Medical device software, aerospace systems, automotive software, ISO-certified processes

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute lifecycle integrity with automated enforcement and governance.
- ZERO TOLERANCE: Phase violations trigger immediate termination
- AUTOMATED GATES: Automated quality gates with hard stops
- NO BYPASS: Absolutely no mechanism to bypass phases
- IMMUTABLE PROGRESSION: Phase sequence is immutable
- PERMANENT AUDIT: All lifecycle activities logged permanently
- GOVERNANCE REVIEW: Phase transitions require governance approval
- TRACEABILITY: Complete traceability from requirements to implementation
- COMPLIANCE VALIDATION: Automated compliance checking at each phase
- METRICS ENFORCEMENT: Phase metrics must meet thresholds
- ESCALATION: Phase violations escalated to governance committee
- CRITICAL MESSAGE: "CRITICAL LIFECYCLE VIOLATION - GOVERNANCE REVIEW REQUIRED - IMMEDIATE TERMINATION"
- CERTIFICATION: Each phase completion requires formal certification
```

**Use Case:** Nuclear systems, medical life support, flight control systems, pharmaceutical software

---

## 6. Architecture Principles & Design Patterns

### Category Description
Principles governing component architecture, capability-enabler-requirement model, naming conventions, and design patterns.

### Source References
- Components-Capabilities-Enablers-Requirements Model (lines 135-139)
- Naming Conventions (lines 932-1077)
- Driving vs. Driven Naming Strategy (lines 934-1077)
- Dependency Relationship Patterns (lines 976-989)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should be aware of architecture principles and suggest best practices.
- Understand component-capability-enabler-requirement hierarchy
- Recognize naming patterns (verbs for drivers, nouns for driven)
- Suggest architectural improvements
- Note architectural inconsistencies
- Allow flexible architecture approaches
- Provide architecture pattern references
```

**Use Case:** Greenfield projects, architectural exploration, proof of concepts

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should follow architecture principles and recommend standard patterns.
- Apply component-capability-enabler model by default
- Recommend appropriate naming conventions
- Suggest design patterns for common scenarios
- Highlight architectural deviations
- Warn about anti-patterns
- Provide architectural alternatives
- Document architectural decisions
```

**Use Case:** Growing codebases, team standardization, refactoring projects

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must follow architecture principles with warnings for deviations.
- MANDATORY: Use component-capability-enabler-requirement model
- ENFORCE: Proper naming conventions (verbs for drivers, nouns for driven)
- VALIDATE: Dependency relationships follow patterns
- WARN: Explicit warnings for architectural violations
- BLOCK: Prevent creation of non-compliant structures
- REQUIRE: Justification for architectural deviations
- DOCUMENT: Log all architectural decisions
- CONSISTENCY: Enforce consistent patterns across codebase
```

**Use Case:** Large teams, microservices architectures, platform development

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute architecture compliance with zero tolerance for violations.
- ABSOLUTE REQUIREMENT: All elements must follow capability-enabler model
- NAMING ENFORCEMENT: Strict enforcement of driving (verb) vs driven (noun) naming
- DEPENDENCY VALIDATION: All dependencies must follow defined patterns
- IMMEDIATE STOP: Block creation of non-compliant components
- NO EXCEPTIONS: Architecture principles are non-negotiable
- AUTOMATED VALIDATION: Validate architecture against defined patterns
- TRACEABILITY: Complete traceability from components to requirements
- AUDIT: Architecture compliance tracked in all documents
- FAILURE MESSAGE: "ARCHITECTURE VIOLATION - COMPONENT MODEL NOT FOLLOWED"
```

**Use Case:** Enterprise platforms, public APIs, framework development, regulated systems

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute architectural integrity with automated enforcement and governance oversight.
- ZERO TOLERANCE: Architecture violations trigger immediate termination
- SCHEMA VALIDATION: All components validated against architecture schema
- AUTOMATED ENFORCEMENT: Continuous architecture validation
- IMMUTABLE PATTERNS: Architecture patterns cannot be bypassed
- DEPENDENCY ANALYSIS: Automated dependency graph validation
- NAMING COMPLIANCE: Automated naming convention enforcement
- PERMANENT AUDIT: All architecture decisions permanently logged
- GOVERNANCE REVIEW: Architecture violations reviewed by architecture board
- METRICS TRACKING: Architecture quality metrics continuously monitored
- ESCALATION: Violations escalated to chief architect
- CRITICAL MESSAGE: "CRITICAL ARCHITECTURE VIOLATION - ARCHITECTURE BOARD REVIEW REQUIRED"
- CERTIFICATION: Architecture compliance certification required
```

**Use Case:** Mission-critical platforms, defense systems, financial infrastructure, healthcare platforms

---

## 7. Change Management & State Transitions

### Category Description
Rules for managing state transitions, status updates, sequential execution, and preventing premature state changes.

### Source References
- Post-Condition Transition (lines 514-523, 749-752, 802-812, 849-851)
- SEQUENTIAL EXECUTION RULES (lines 519-524)
- Status field management throughout workflow tasks

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should track state changes and note transitions.
- Monitor current state values
- Note when states change
- Suggest appropriate state transitions
- Document state history
- Allow flexible state management
```

**Use Case:** Internal tools, prototype development, experimental features

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should manage states carefully and recommend proper transitions.
- Track all state fields (Status, Approval, etc.)
- Recommend appropriate state transitions
- Warn about skipping state transitions
- Suggest completing current phase before state change
- Log all state changes
- Validate state transition logic
```

**Use Case:** Feature development, continuous integration, team collaboration

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must manage state transitions strictly with explicit warnings for violations.
- MANDATORY: Set status to "In [Phase]" when starting phase work
- VERIFY: Status reflects current phase accurately
- WARN: Explicit warnings for premature state transitions
- BLOCK: Prevent jumping ahead to final status during phase work
- REQUIRE: Completion of phase work before final status
- SEQUENTIAL: Status must accurately represent current phase
- POST-CONDITIONS ONLY AT END: Transition only when ALL work complete
- DOCUMENT: Log every state transition with timestamp
```

**Use Case:** Production deployments, release management, enterprise workflows

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute state transition compliance with zero tolerance.
- STEP ORDERING: Step 2 MUST be completed first (set to "In [Phase]")
- NO JUMPING AHEAD: Never set final status during phase work
- STATUS REFLECTS PHASE: Status must accurately represent current phase
- POST-CONDITIONS ONLY AT END: Final status only when ALL work complete
- IMMEDIATE STOP: Block any premature state transitions
- VALIDATION: Validate state transition against allowed transitions
- AUDIT TRAIL: Complete audit log of all state changes
- ROLLBACK: Automatic rollback of invalid state changes
- FAILURE MESSAGE: "STATE TRANSITION VIOLATION - PHASE INCOMPLETE"
```

**Use Case:** Financial transactions, compliance tracking, audit systems, regulated processes

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute state transition integrity with automated enforcement.
- ZERO TOLERANCE: Invalid state transitions trigger immediate termination
- STATE MACHINE VALIDATION: All transitions validated against state machine
- IMMUTABLE RULES: State transition rules cannot be bypassed
- AUTOMATED ROLLBACK: Invalid transitions automatically rolled back
- PERMANENT AUDIT: All state changes logged to immutable audit system
- GOVERNANCE ALERTS: Invalid transitions trigger governance alerts
- TRANSACTION INTEGRITY: State changes wrapped in atomic transactions
- METRICS MONITORING: State transition metrics continuously tracked
- ESCALATION: Violations escalated to operations team
- CRITICAL MESSAGE: "CRITICAL STATE TRANSITION VIOLATION - OPS TEAM NOTIFIED"
- FORENSICS: Complete state transition forensics available
```

**Use Case:** Trading systems, payment processing, medical records, nuclear operations

---

## 8. Code Review & Testing Standards

### Category Description
Standards for code review requirements, testing strategies, quality assurance, and validation processes.

### Source References
- Code Review metadata field (lines 196, 1196)
- Testing Strategy section (lines 349-350, 1296-1297)
- Analysis Review settings (lines 292, 1195)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should suggest testing and code review practices.
- Recommend testing strategies
- Suggest code review when appropriate
- Note testing gaps
- Provide testing examples
- Allow flexible testing approaches
```

**Use Case:** Solo developers, hackathons, proof of concepts

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should recommend testing and code review based on settings.
- Check "Code Review" metadata field
- Recommend tests for all implementations
- Suggest appropriate testing strategies
- Highlight untested code
- Warn about missing test coverage
- Log testing status
```

**Use Case:** Small teams, continuous integration, agile development

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must enforce testing and code review requirements based on metadata settings.
- VERIFY: Check "Code Review" field for each enabler
- ENFORCE: "Required" = code review must occur
- VALIDATE: Testing strategy must be documented
- WARN: Explicit warnings for missing tests
- BLOCK: Prevent implementation without testing strategy
- REQUIRE: User acknowledgment to skip tests
- COVERAGE: Recommend minimum test coverage thresholds
```

**Use Case:** Product teams, quality-focused development, SaaS applications

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute testing and code review compliance.
- MANDATORY: Testing strategy required for all implementations
- CODE REVIEW GATE: "Code Review: Required" blocks progression without review
- COVERAGE REQUIREMENTS: Minimum test coverage must be met
- IMMEDIATE STOP: Block implementation without adequate testing
- VALIDATION: Automated test validation required
- QUALITY GATES: Testing quality gates must pass
- AUDIT: All testing activities logged
- FAILURE MESSAGE: "QUALITY GATE FAILURE - TESTING REQUIREMENTS NOT MET"
```

**Use Case:** Enterprise applications, customer-facing systems, financial software

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute quality assurance with comprehensive validation.
- ZERO TOLERANCE: Missing tests trigger immediate rejection
- AUTOMATED TESTING: All code must have automated tests
- COVERAGE ENFORCEMENT: Minimum coverage thresholds strictly enforced
- CODE REVIEW MANDATORY: All code requires review before merge
- STATIC ANALYSIS: Automated static analysis must pass
- SECURITY SCANNING: Security scans must pass with no critical issues
- PERFORMANCE TESTING: Performance requirements must be validated
- PERMANENT AUDIT: All quality metrics permanently logged
- GOVERNANCE REVIEW: Quality violations reviewed by QA team
- CRITICAL MESSAGE: "CRITICAL QUALITY FAILURE - QA REVIEW REQUIRED"
- CERTIFICATION: Quality certification required for production
```

**Use Case:** Medical devices, aerospace, autonomous vehicles, life-support systems

---

## 9. Dependency Management & Integration

### Category Description
Rules for managing internal/external dependencies, integration patterns, dependency flow diagrams, and cross-capability relationships.

### Source References
- Dependencies sections (lines 303-304, 1109-1120, 1293-1294)
- Dependency Flow Diagrams (lines 1123-1179, 1227-1236)
- Dependency Relationship Patterns (lines 976-989)
- Grey Theme Rule for non-existent capabilities (lines 610-616)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should identify and note dependencies.
- Identify internal dependencies
- Note external dependencies
- Suggest dependency documentation
- Highlight circular dependencies
- Allow flexible dependency management
```

**Use Case:** Early development, standalone services, prototypes

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should document dependencies and recommend proper management.
- Document all internal upstream dependencies
- Document all internal downstream impacts
- Identify external dependencies
- Recommend dependency version control
- Warn about missing dependency documentation
- Suggest dependency flow diagrams
- Log dependency changes
```

**Use Case:** Microservices, API development, integration projects

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must document all dependencies with explicit warnings for violations.
- MANDATORY: Document all dependencies in dependency tables
- VERIFY: Internal upstream and downstream dependencies listed
- VALIDATE: External dependencies properly documented
- WARN: Explicit warnings for undocumented dependencies
- REQUIRE: Dependency flow diagrams for complex relationships
- GREY THEME RULE: Non-existent capabilities styled grey in diagrams
- PLACEHOLDER NAMING: Use "CAP-XXX01" format for placeholders
- DOCUMENT: Note explaining grey capabilities are placeholders
```

**Use Case:** Platform development, integration layers, service meshes

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute dependency documentation and validation.
- ABSOLUTE REQUIREMENT: All dependencies must be documented
- DEPENDENCY VALIDATION: Verify all referenced capabilities exist
- IMMEDIATE STOP: Block progression with undocumented dependencies
- FLOW DIAGRAMS MANDATORY: Dependency flow diagrams required
- GREY THEME ENFORCEMENT: Non-existent capabilities must be grey
- NAMING COMPLIANCE: Placeholder naming must follow standards
- CIRCULAR DETECTION: Detect and prevent circular dependencies
- VERSION CONTROL: Dependency versions must be specified
- AUDIT: All dependency changes logged
- FAILURE MESSAGE: "DEPENDENCY VIOLATION - INCOMPLETE DOCUMENTATION"
```

**Use Case:** Enterprise integration, distributed systems, cloud platforms

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute dependency integrity with automated validation.
- ZERO TOLERANCE: Undocumented dependencies trigger immediate rejection
- AUTOMATED VALIDATION: Dependency graph automatically validated
- EXISTENCE CHECK: All dependencies verified to exist
- CIRCULAR PREVENTION: Circular dependencies automatically blocked
- VERSION ENFORCEMENT: Dependency version compatibility validated
- SECURITY SCANNING: Dependencies scanned for vulnerabilities
- LICENSE COMPLIANCE: Dependency licenses validated
- IMPACT ANALYSIS: Dependency changes trigger impact analysis
- PERMANENT AUDIT: All dependency changes permanently logged
- GOVERNANCE REVIEW: Dependency violations reviewed by architecture board
- CRITICAL MESSAGE: "CRITICAL DEPENDENCY VIOLATION - ARCHITECTURE REVIEW REQUIRED"
- TRACEABILITY: Complete dependency traceability maintained
```

**Use Case:** Critical infrastructure, defense systems, financial platforms, healthcare systems

---

## 10. Risk Management & Safety Controls

### Category Description
Safety rules, forbidden actions during discovery, absolute prohibitions, and risk mitigation controls.

### Source References
- CRITICAL WARNING - DISCOVERY LIMITATIONS (lines 176-206)
- DISCOVERY SAFETY RULES (lines 183-189)
- FORBIDDEN DURING DISCOVERY (lines 190-198)
- Absolute Prohibitions (lines 625-629)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should be aware of safety concerns and note risks.
- Identify potential risks
- Note forbidden actions
- Suggest safe alternatives
- Highlight safety concerns
- Allow proceeding with warnings
```

**Use Case:** Development environments, testing sandboxes, isolated systems

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should follow safety rules and recommend risk mitigation.
- Follow discovery safety rules
- Warn about forbidden actions
- Recommend read-only operations during discovery
- Suggest safe implementation approaches
- Log risky operations
- Provide risk assessment
```

**Use Case:** Staging environments, pre-production systems, integration testing

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must enforce safety rules with explicit warnings for violations.
- DISCOVERY = DOCUMENTATION ONLY
- STOP AT DESIGN: Never proceed to implementation during discovery
- NO CODE CHANGES: Never modify existing application code
- NO FILE OVERWRITES: Never overwrite existing files
- READ-ONLY ANALYSIS: Discovery is purely analytical
- WARN: Explicit warnings before any risky operations
- REQUIRE: User confirmation for actions near forbidden boundaries
```

**Use Case:** Production-like environments, customer demos, beta testing

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute safety controls with zero tolerance.
- ABSOLUTE PROHIBITION: Never proceed to implementation from discovery
- FORBIDDEN: Writing any application code during discovery
- FORBIDDEN: Modifying existing source files during discovery
- FORBIDDEN: Creating new application components during discovery
- FORBIDDEN: Deleting or moving application files during discovery
- FORBIDDEN: Running build processes during discovery
- FORBIDDEN: Making changes that could break existing applications
- IMMEDIATE STOP: Halt if any forbidden action attempted
- FAILURE MESSAGE: "SAFETY VIOLATION - FORBIDDEN ACTION BLOCKED"
```

**Use Case:** Production systems, live customer environments, mission-critical applications

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute safety with automated protection and monitoring.
- ZERO TOLERANCE: Any safety violation triggers immediate termination
- AUTOMATED PROTECTION: Read-only mode enforced during discovery
- FILE SYSTEM PROTECTION: Application files protected from modification
- CHANGE DETECTION: Automated detection of unauthorized changes
- IMMEDIATE ROLLBACK: Automatic rollback of any unsafe changes
- PERMANENT AUDIT: All actions logged to security audit system
- SECURITY ALERTS: Safety violations trigger security team alerts
- LOCKOUT: Safety violations trigger agent suspension
- FORENSICS: Complete forensic analysis of violation attempts
- GOVERNANCE ESCALATION: Violations reviewed by security governance
- CRITICAL MESSAGE: "CRITICAL SAFETY VIOLATION - SECURITY INCIDENT - IMMEDIATE TERMINATION"
- INCIDENT RESPONSE: Automated incident response procedures activated
```

**Use Case:** Nuclear systems, medical life support, flight controls, power grid management

---

## 11. Metadata & Configuration Standards

### Category Description
Standards for metadata fields, configuration rules, enabler/requirement configuration, and metadata completeness verification.

### Source References
- METADATA FIELD VERIFICATION CHECKLIST (lines 493-507)
- Enabler Configuration Rules (lines 508-513)
- Requirement Configuration Rules (lines 743-748)
- Metadata sections in templates (lines 1085-1096, 1186-1196)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should understand metadata fields and suggest completion.
- Recognize standard metadata fields
- Suggest filling in missing metadata
- Note incomplete metadata
- Provide metadata examples
- Allow flexible metadata
```

**Use Case:** Internal projects, exploratory work, rapid prototyping

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should recommend complete metadata and highlight missing fields.
- Check for all standard metadata fields
- Recommend appropriate values for each field
- Highlight missing required fields
- Suggest configuration based on "Analysis Review" settings
- Warn about incomplete metadata
- Log metadata completion status
```

**Use Case:** Team projects, documentation initiatives, API development

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must enforce metadata completeness with warnings for missing fields.
- VERIFY: All metadata fields present before proceeding
- VALIDATE: Metadata values follow configuration rules
- WARN: Explicit warnings for missing fields
- CONFIGURATION RULES: Apply enabler/requirement configuration rules
- BLOCK: Prevent progression with incomplete metadata
- CHECKLIST: Use metadata field verification checklist
- REQUIRE: User acknowledgment for metadata gaps
```

**Use Case:** Enterprise documentation, compliance projects, regulated development

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute metadata completeness with zero tolerance.
- MANDATORY: ALL metadata fields must be present and filled
- VERIFICATION CHECKLIST: Must pass complete metadata checklist
- IMMEDIATE STOP: Block document creation if metadata incomplete
- CONFIGURATION ENFORCEMENT: Strict adherence to configuration rules
- ANALYSIS REVIEW LOGIC: Apply correct approval/status based on "Analysis Review"
- NO PLACEHOLDERS: All metadata must contain real values
- VALIDATION: Automated metadata validation against schema
- AUDIT: All metadata tracked and versioned
- FAILURE MESSAGE: "METADATA INCOMPLETE - CHECKLIST VERIFICATION FAILED"
```

**Use Case:** Public APIs, open-source libraries, certified software, regulated systems

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute metadata integrity with automated validation.
- ZERO TOLERANCE: Incomplete metadata triggers immediate rejection
- SCHEMA VALIDATION: All metadata validated against strict schema
- AUTOMATED ENFORCEMENT: Continuous metadata validation
- IMMUTABLE FIELDS: Certain metadata fields become immutable after creation
- TYPE VALIDATION: Metadata field types strictly enforced
- ENUMERATION ENFORCEMENT: Enumerated values strictly validated
- RELATIONSHIP VALIDATION: Cross-document metadata relationships validated
- PERMANENT AUDIT: All metadata changes permanently logged
- GOVERNANCE REVIEW: Metadata violations reviewed by data governance
- METRICS TRACKING: Metadata quality metrics continuously monitored
- CRITICAL MESSAGE: "CRITICAL METADATA VIOLATION - DATA GOVERNANCE REVIEW REQUIRED"
- TRACEABILITY: Complete metadata lineage tracked
```

**Use Case:** Healthcare records, financial reporting, government systems, safety-critical data

---

## 12. File Naming & ID Generation Standards

### Category Description
Standards for unique ID generation, file naming conventions, collision detection, and file placement strategies.

### Source References
- File Naming and ID Generation Schema (lines 863-930)
- Unique ID Format (lines 865-869)
- ID Generation Algorithm (lines 872-910)
- File Naming Convention (lines 912-916)
- File Placement Strategy (lines 918-930)
- Critical Rules for Discovery (lines 353-359)

### Five AI Prompting Levels

#### Level 1: Awareness (Advisory)
**Prompt Template:**
```
AI should follow ID format and suggest proper naming.
- Use standard ID format (CAP-XXXXXX, ENB-XXXXXX)
- Suggest appropriate file names
- Note naming inconsistencies
- Provide naming examples
- Allow flexible naming when justified
```

**Use Case:** Personal projects, prototypes, temporary files

#### Level 2: Guided Recommendations (Suggested)
**Prompt Template:**
```
AI should generate proper IDs and recommend standard file naming.
- Generate IDs using standard algorithm
- Recommend numeric filename format
- Warn about naming convention violations
- Suggest proper file placement
- Check for obvious ID collisions
- Log all generated IDs
```

**Use Case:** Team development, shared repositories, collaborative projects

#### Level 3: Enforced with Warnings (Controlled)
**Prompt Template:**
```
AI must follow naming standards strictly with collision detection.
- MANDATORY: Scan for existing IDs before generating new ones
- ALGORITHM: Use ID generation algorithm exactly
- NUMERIC FILENAME: Extract numeric part from full ID
- COLLISION DETECTION: Check all markdown files for ID collisions
- WARN: Explicit warnings for naming violations
- PLACEMENT: Follow file placement strategy
- RELATIONSHIP: Maintain ID relationships in metadata
- DOCUMENT: Log all ID generation with collision checks
```

**Use Case:** Large codebases, multi-team projects, enterprise repositories

#### Level 4: Strict Enforcement (Mandatory)
**Prompt Template:**
```
AI must enforce absolute naming and ID uniqueness with zero tolerance.
- ABSOLUTE REQUIREMENT: All IDs must be globally unique
- EXHAUSTIVE SCAN: Scan ALL markdown files before ID generation
- COLLISION PREVENTION: Guaranteed collision avoidance algorithm
- NAMING ENFORCEMENT: Strict numeric filename format required
- PREFIX REMOVAL: Always remove CAP-/ENB- prefix from filenames
- PLACEMENT VALIDATION: Verify correct directory structure
- IMMEDIATE STOP: Block creation with naming violations
- SEQUENTIAL FALLBACK: Use sequential numbering if collisions persist
- AUDIT: All ID generation logged with collision check results
- FAILURE MESSAGE: "NAMING VIOLATION - ID COLLISION DETECTED"
```

**Use Case:** Global platforms, distributed teams, enterprise systems, public registries

#### Level 5: Zero-Tolerance Termination (Absolute)
**Prompt Template:**
```
AI must maintain absolute ID uniqueness with centralized registry and validation.
- ZERO TOLERANCE: ID collisions trigger immediate rejection
- CENTRALIZED REGISTRY: All IDs registered in central system
- ATOMIC GENERATION: ID generation is atomic and thread-safe
- CRYPTOGRAPHIC UNIQUENESS: Use cryptographic methods for uniqueness
- GLOBAL VALIDATION: IDs validated against global registry
- IMMUTABLE IDs: IDs cannot be changed once assigned
- NAMESPACE ENFORCEMENT: Strict namespace separation
- PERMANENT AUDIT: All IDs permanently logged with generation metadata
- GOVERNANCE TRACKING: ID registry managed by data governance
- METRICS MONITORING: ID generation metrics continuously tracked
- CRITICAL MESSAGE: "CRITICAL ID COLLISION - DATA GOVERNANCE REVIEW REQUIRED"
- FORENSICS: Complete ID generation forensics available
- RECOVERY: Automated recovery procedures for collision scenarios
```

**Use Case:** Global financial systems, international healthcare, government ID systems, blockchain platforms

---

## Summary Matrix

| Category | L1: Awareness | L2: Guided | L3: Enforced | L4: Strict | L5: Zero-Tolerance |
|----------|--------------|------------|--------------|------------|-------------------|
| **1. Workflow Governance** | Note states | Warn on skip | Block skip | Terminate skip | Lockout |
| **2. Quality Gates** | Note failures | Recommend stop | Require ack | Mandatory stop | Escalate |
| **3. Documentation** | Suggest templates | Highlight gaps | Warn missing | Block incomplete | Schema enforce |
| **4. Security** | Note approvals | Recommend wait | Warn unauthorized | Read-only enforce | Security alert |
| **5. Lifecycle** | Suggest phases | Recommend sequence | Require completion | Block skips | Certify phases |
| **6. Architecture** | Note patterns | Recommend standards | Warn violations | Enforce model | Architecture board |
| **7. State Management** | Track states | Recommend proper | Warn premature | Validate transitions | State machine enforce |
| **8. Quality Assurance** | Suggest tests | Recommend coverage | Warn missing | Require gates | Comprehensive validation |
| **9. Dependencies** | Note deps | Document all | Warn undocumented | Validate existence | Auto validate graph |
| **10. Risk Management** | Note risks | Warn forbidden | Block unsafe | Absolute prohibition | Automated protection |
| **11. Metadata** | Suggest fields | Highlight missing | Warn incomplete | Require all fields | Schema validation |
| **12. ID Generation** | Follow format | Recommend algorithm | Detect collisions | Prevent collisions | Centralized registry |

---

## Usage Recommendations

### Selecting the Right Level

**Level 1 (Awareness)**: Use for early-stage projects, prototypes, and learning environments where flexibility is more important than strict compliance.

**Level 2 (Guided)**: Use for established development teams that understand best practices but need gentle guidance and tracking.

**Level 3 (Enforced)**: Use for production systems that require quality assurance but can tolerate some controlled deviations with proper documentation.

**Level 4 (Strict)**: Use for regulated industries, enterprise systems, and customer-facing applications where compliance is mandatory.

**Level 5 (Zero-Tolerance)**: Use for safety-critical systems, financial infrastructure, healthcare, and other domains where failures can have severe consequences.

### Progressive Adoption Strategy

Organizations can adopt these levels progressively:

1. **Start with Level 1-2** for new teams to build awareness
2. **Progress to Level 3** as teams mature and processes stabilize
3. **Implement Level 4** for production systems and critical paths
4. **Reserve Level 5** for truly critical systems with appropriate governance infrastructure

### Context-Specific Application

Different categories can use different levels simultaneously:

- **Security & Authorization**: Level 5 (absolute protection)
- **Documentation**: Level 3 (enforced with warnings)
- **Architecture**: Level 4 (strict enforcement)
- **Risk Management**: Level 5 (zero tolerance)

This allows organizations to prioritize critical areas while maintaining flexibility in others.

---

**End of Document**
