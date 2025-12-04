# SAWai - Scaled Agile With AI

## Overview

SAWai (Scaled Agile With AI) is a streamlined agile methodology optimized for AI-assisted software development. It adapts traditional scaled agile principles to leverage AI tools effectively, emphasizing specification quality over heavy process ceremony.

**Key Insight**: AI amplifies delivery speed. When AI can accelerate implementation, the bottleneck shifts to specification quality. SAWai invests effort where it matters most.

**Core Philosophy**: No Epics. Capabilities and Enablers are sufficient when well-specified. AI can handle the implementation complexity that traditionally required Epic-level grouping.

---

## Core Principles

### 1. Specification Quality Over Process Ceremony

Traditional agile frameworks like SAFe include extensive ceremonies (PI Planning, multiple roles, complex documentation). SAWai recognizes that with AI assistance:

- **Well-defined specifications** yield better AI-generated outcomes
- **Heavy process overhead** slows delivery without proportional benefit
- **Clear acceptance criteria** enable AI to validate its own outputs

### 2. Accelerated Delivery Focus

AI tools can dramatically speed up implementation. SAWai optimizes for:

- Maximizing business value per unit time
- Reducing time from idea to deployed feature
- Enabling rapid iteration and feedback

### 3. Design-AI Integration

Capabilities connect directly to design artifacts, enabling:

- AI tools to understand visual and functional requirements
- Consistent translation from design to implementation
- Automated validation against design specifications

### 4. AI Reviews Before Implementation

Before any code is written, AI should review specifications to:

- Identify ambiguities and gaps
- Suggest missing requirements
- Validate technical feasibility
- Catch conflicts with existing architecture

---

## SAWai Hierarchy

```
Enterprise Strategy
       │
       ▼
Strategic Themes
       │
       ▼
Components (Systems/Applications)
       │
       ▼
Capabilities (Business Functions)
       │
       ▼
Enablers (Technical Implementations)
       │
       ▼
Requirements (Specific Needs)
```

### Why No Epics?

Traditional Epics exist to:
- Group work for funding/investment decisions
- Provide a container for "too big to estimate" work
- Coordinate across multiple teams over quarters

With AI-assisted development:
- Implementation velocity is dramatically higher
- The "too big" problem shrinks significantly
- A single developer + AI can span what previously required multiple teams
- Capabilities provide sufficient grouping for business alignment

---

## Strategic Themes

Strategic themes are differentiating business objectives that connect your portfolio to the enterprise strategy.

### Purpose
- Align development work with business goals
- Guide prioritization decisions
- Provide context for AI-assisted development

### In SAWai
With AI-assisted development, the emphasis shifts to high-quality theme definitions. Well-defined themes:

- Guide AI tools to generate better outcomes
- Provide clear context for implementation decisions
- Enable AI to understand business intent, not just technical requirements

### Template

```markdown
## Strategic Theme: [Name]

### Business Objective
[What business outcome does this theme support?]

### Success Metrics
- [Measurable outcome 1]
- [Measurable outcome 2]

### Time Horizon
[Expected duration or milestone]

### Related Capabilities
- [Capability 1]
- [Capability 2]
```

---

## Capabilities

In SAWai, capabilities represent high-level business outcomes that contain multiple enablers. This is where business alignment happens.

### Purpose
- Define what the system should be able to do
- Group related enablers under a common business outcome
- Connect to design artifacts for AI tooling
- **Investment focus**: Spend time here to ensure AI understands the "why"

### Characteristics
- **Outcome-focused**: Describes business value, not implementation
- **Measurable**: Has clear, testable acceptance criteria
- **AI-ready**: Integrates with design artifacts for AI-assisted development
- **Boundary-defined**: Explicit scope prevents AI over-engineering

### Enhanced Capability Template

```markdown
# Capability: [Name]

## Metadata
- **ID**: CAP-XXXXXX
- **Component**: [System/Application Name]
- **Owner**: [Team/Person]
- **State**: draft | pending_approval | approved | in_progress | completed
- **Stage**: specification | definition | design | execution
- **Priority**: high | medium | low

## Business Context

### Problem Statement
[What specific problem does this capability solve? Be concrete.]

### Value Proposition
[Why does this matter to users/business? Quantify if possible.]

### Success Metrics
- [Metric 1: e.g., "Reduce login time by 50%"]
- [Metric 2: e.g., "Support 10,000 concurrent users"]

## User Perspective

### Primary Persona
[Who benefits most from this capability?]

### User Journey (Before/After)
**Before**: [Current painful experience]
**After**: [Improved experience with this capability]

### User Scenarios
1. **Scenario 1**: [Concrete example with specific inputs/outputs]
2. **Scenario 2**: [Another concrete example]
3. **Scenario 3**: [Edge case scenario]

## Boundaries

### In Scope
- [Explicitly what IS included]
- [Another included item]

### Out of Scope
- [Explicitly what is NOT included]
- [Another excluded item]

### Assumptions
- [What we're assuming to be true]

### Constraints
- [Technical, business, or regulatory limits]

## Enablers
| ID | Name | Purpose | State |
|----|------|---------|-------|
| ENB-XXXXXX | [Name] | [One-line purpose] | [state] |

## Dependencies

### Upstream (What must exist before this works?)
| ID | Name | Status |
|----|------|--------|
| CAP-XXXXXX | [Name] | [status] |

### Downstream (What depends on this?)
| ID | Name | Status |
|----|------|--------|
| CAP-XXXXXX | [Name] | [status] |

## Acceptance Criteria
- [ ] [Specific, testable criterion with verification method]
- [ ] [Another criterion]
- [ ] [Edge case criterion]

## Design Artifacts
- [Link to Figma/design files]
- [Link to wireframes]
- [Link to user flows]

## Approval History
| Date | Stage | Decision | By | Feedback |
|------|-------|----------|-----|----------|
```

---

## Enablers

Enablers are the technical implementations that realize capabilities. This is where AI generates detailed specifications.

### Purpose
- Translate business capabilities into technical implementations
- Provide AI with concrete implementation guidance
- Define testable requirements with examples

### Characteristics
- **Technical focus**: Describes how, not why
- **Implementation-ready**: Contains enough detail for AI to write code
- **Example-driven**: Includes input/output examples for clarity
- **Edge-case aware**: Explicitly documents boundary conditions

### Enhanced Enabler Template

```markdown
# Enabler: [Name]

## Metadata
- **ID**: ENB-XXXXXX
- **Capability**: CAP-XXXXXX - [Capability Name]
- **Owner**: [Team/Person]
- **State**: draft | pending_approval | approved | in_progress | completed
- **Stage**: specification | definition | design | execution
- **Priority**: high | medium | low

## Technical Context

### Purpose
[One paragraph: what this enabler does technically]

### Architecture Fit
[How does this fit into the existing system architecture?]

### Existing Patterns to Follow
- [Pattern 1: e.g., "Use repository pattern from /internal/auth/repository.go"]
- [Pattern 2: e.g., "Follow error handling style in /pkg/errors"]

## Requirements

### Functional Requirements
| ID | Requirement | Input Example | Output Example | Edge Cases |
|----|-------------|---------------|----------------|------------|
| REQ-XXXXXX | [Description] | `{"user": "john"}` | `{"success": true}` | null input, empty string |

### Non-Functional Requirements
| ID | Requirement | Target | How to Verify |
|----|-------------|--------|---------------|
| REQ-XXXXXX | Response time | <200ms p95 | Load test with 1000 requests |
| REQ-XXXXXX | Concurrent users | 100 | Stress test |

## API Contract (if applicable)

### Endpoint
`POST /api/v1/resource`

### Request Schema
```json
{
  "field1": "string (required)",
  "field2": "number (optional, default: 0)"
}
```

### Response Schema (Success)
```json
{
  "id": "string",
  "created_at": "ISO8601 datetime"
}
```

### Error Responses
| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Invalid input | `{"error": "field1 is required"}` |
| 401 | Not authenticated | `{"error": "unauthorized"}` |
| 404 | Resource not found | `{"error": "not found"}` |
| 500 | Server error | `{"error": "internal error"}` |

## Data Model (if applicable)

```
Entity: [Name]
├── id: UUID (PK)
├── field1: string (required, max 255)
├── field2: integer (default: 0)
├── created_at: timestamp
└── updated_at: timestamp

Indexes:
- idx_field1 on field1 (for lookup performance)

Relationships:
- belongs_to: User (foreign key: user_id)
```

## Behavioral Specifications

### State Transitions (if stateful)
```
[Initial] → [Processing] → [Completed]
                ↓
           [Failed] → [Retry] → [Processing]
```

### Sequence Diagram (for complex flows)
```
User → API → Service → Repository → Database
  │      │       │          │           │
  │──────│───────│──────────│───────────│
  │  Request     │  Validate │   Query   │
  │      │       │          │           │
  │      │       │←─────────│───────────│
  │      │←──────│  Result  │           │
  │←─────│  Response        │           │
```

## Edge Cases and Error Handling

| Scenario | Expected Behavior | Test Case |
|----------|-------------------|-----------|
| Null input | Return 400 error | `test_null_input()` |
| Duplicate entry | Return 409 conflict | `test_duplicate()` |
| Database timeout | Retry 3x, then fail | `test_db_timeout()` |

## Testing Strategy

### Unit Tests
- [ ] Test [function 1] with valid input
- [ ] Test [function 1] with invalid input
- [ ] Test [edge case]

### Integration Tests
- [ ] Test API endpoint with valid request
- [ ] Test API endpoint with invalid request
- [ ] Test database operations

## Implementation Hints

### Suggested Approach
[High-level approach recommendation]

### Known Gotchas
- [Gotcha 1: e.g., "Database connection pool exhaustion under load"]
- [Gotcha 2: e.g., "Timezone handling for datetime fields"]

### Reference Implementations
- [Link to similar code in codebase]
- [External reference if applicable]

## Dependencies
| Type | Description |
|------|-------------|
| Internal | [Internal services/packages needed] |
| External | [External APIs/services needed] |

## Approval History
| Date | Stage | Decision | By | Feedback |
|------|-------|----------|-----|----------|
```

---

## Capability Workflow

SAWai uses a streamlined four-stage workflow for capabilities:

```
Specification → Definition → Design → Execution
      │              │           │          │
      ▼              ▼           ▼          ▼
  [APPROVE]      [APPROVE]   [APPROVE]  [COMPLETE]
```

### Stage 1: Specification
**Focus**: Define WHAT and WHY

**Activities:**
- Identify business capabilities needed
- Document business value and success criteria
- Identify stakeholders and users
- Define scope boundaries (in/out)
- Create user scenarios with concrete examples

**AI Role**: Assist in identifying capabilities, drafting specifications, suggesting success criteria.

**Human Role**: Validate business value, approve capability definitions.

**Exit Criteria:**
- [ ] Problem statement clearly articulated
- [ ] User scenarios documented with examples
- [ ] Scope boundaries defined
- [ ] Success metrics identified
- [ ] **HUMAN APPROVAL OBTAINED**

### Stage 2: Definition
**Focus**: Define HOW (high-level) - Enabler identification

**Activities:**
- Break capability into enablers
- Identify technical dependencies
- Define integration points
- Estimate complexity

**AI Role**: Suggest enabler breakdown, identify dependencies, create initial enabler specs with examples.

**Human Role**: Validate technical approach, approve enabler definitions.

**Exit Criteria:**
- [ ] All enablers identified
- [ ] Dependencies mapped
- [ ] Technical approach validated
- [ ] **HUMAN APPROVAL OBTAINED**

### Stage 3: Design
**Focus**: Define HOW (detailed) - AI specification review

**Activities:**
- Design APIs with request/response examples
- Create data models with constraints
- Design component interactions
- **AI reviews specifications for ambiguities**
- Document edge cases

**AI Role**: Generate detailed technical specs, identify gaps, suggest improvements.

**Human Role**: Review technical design, resolve ambiguities, approve implementation approach.

**AI Specification Review Checklist:**
- [ ] All requirements have input/output examples
- [ ] Edge cases are documented
- [ ] Error handling is specified
- [ ] No conflicting requirements
- [ ] Patterns match existing codebase
- [ ] Performance requirements are testable

**Exit Criteria:**
- [ ] Technical specifications complete
- [ ] APIs defined with examples
- [ ] Data models documented
- [ ] AI review completed - no ambiguities
- [ ] **HUMAN APPROVAL OBTAINED**

### Stage 4: Execution
**Focus**: BUILD and TEST

**Activities:**
- Implement code following design specs
- Write and run tests
- Integrate with existing systems
- Validate against acceptance criteria

**AI Role**: Generate code, write tests, assist with debugging.

**Human Role**: Review code, validate functionality, approve completion.

**Exit Criteria:**
- [ ] Code implemented and working
- [ ] Tests passing
- [ ] Integration verified
- [ ] Acceptance criteria met
- [ ] **HUMAN APPROVAL TO MARK COMPLETE**

---

## WSJF Prioritization

**WSJF (Weighted Shortest Job First)** is the primary prioritization mechanism in SAWai.

### Formula

```
WSJF = Cost of Delay / Job Duration
```

Where **Cost of Delay** = User-Business Value + Time Criticality + Risk Reduction/Opportunity Enablement

### Scoring Guide

| Factor | 1 | 2 | 3 | 5 | 8 | 13 | 20 |
|--------|---|---|---|---|---|----|----|
| User-Business Value | Minimal | Low | Moderate | Significant | High | Very High | Critical |
| Time Criticality | Can wait | Low urgency | Moderate | Important deadline | Urgent | Very urgent | Immediate |
| Risk Reduction | Minimal | Low | Moderate | Significant | High | Very High | Critical |
| Job Duration | Very large | Large | Medium-large | Medium | Small-medium | Small | Very small |

### AI Consideration

Since AI amplifies delivery speed:
- **Job Duration** tends to be smaller than traditional estimates
- **Focus shifts to Cost of Delay** - which capabilities deliver the most value?
- **Specification quality** directly impacts actual job duration with AI

---

## AI-Assisted Development Guidelines

### Specification Quality Checklist

Before AI implementation, ensure specifications include:

- [ ] Clear business context and "why"
- [ ] Specific acceptance criteria with given/when/then format
- [ ] **Concrete input/output examples** (not just descriptions)
- [ ] **Explicit scope boundaries** (in/out of scope)
- [ ] Links to design artifacts (Figma, wireframes)
- [ ] Technical constraints and patterns to follow
- [ ] API contracts with request/response examples
- [ ] Data models with constraints
- [ ] **Edge cases documented**
- [ ] Error handling requirements
- [ ] Performance expectations with verification methods

### AI Specification Review

Before implementation begins, AI should review specifications to:

1. **Identify Ambiguities**: "The requirement says 'fast response' - what is the specific target?"
2. **Find Missing Requirements**: "Error handling for database timeout is not specified"
3. **Detect Conflicts**: "Requirement A says X, but Requirement B implies Y"
4. **Validate Feasibility**: "This requires library Z which conflicts with existing dependencies"
5. **Suggest Improvements**: "Consider adding rate limiting based on similar endpoints"

### Effective AI Prompting

When working with AI tools:

1. **Provide context**: Include relevant code, patterns, and conventions
2. **Be specific**: Vague specs yield vague implementations
3. **Include constraints**: What should the AI NOT do?
4. **Reference examples**: Point to similar implementations in the codebase
5. **Iterate**: Refine specs based on AI output quality

### Quality Gates

AI-generated code should pass through:

1. **AI Self-Review**: AI validates against specifications before presenting
2. **Automated tests**: Unit, integration, and e2e tests
3. **Code review**: Human verification of AI output
4. **Design validation**: Compare against design artifacts
5. **Performance check**: Verify meets performance criteria

---

## SAWai vs Traditional SAFe

| Aspect | Traditional SAFe | SAWai |
|--------|------------------|-------|
| Process ceremony | Heavy (PI Planning, etc.) | Light |
| Hierarchy | Theme → Epic → Feature → Story | Theme → Capability → Enabler → Requirement |
| Epics | Required | **Eliminated** |
| Specification focus | Moderate | High (AI-optimized with examples) |
| Delivery speed | Standard | Accelerated (AI-assisted) |
| Role complexity | Many specialized roles | Streamlined |
| Documentation | Extensive | Targeted, AI-ready |
| Design integration | Optional | Core requirement |
| AI Review | Not applicable | **Required before implementation** |

---

## Implementation Checklist

When adopting SAWai:

- [ ] Define strategic themes aligned with business strategy
- [ ] Create capability specifications with:
  - [ ] Concrete user scenarios
  - [ ] Explicit scope boundaries
  - [ ] Measurable success criteria
- [ ] Create enabler specifications with:
  - [ ] Input/output examples
  - [ ] Edge cases documented
  - [ ] API contracts with examples
- [ ] Implement WSJF scoring for capability prioritization
- [ ] Set up 4-stage workflow (Specification → Definition → Design → Execution)
- [ ] Establish AI specification review checkpoint
- [ ] Configure AI tools with project context
- [ ] Define quality gates for AI-generated code
- [ ] Train team on AI-assisted development practices

---

## Quick Reference

### Workflow
```
Specification → Definition → Design → Execution
     │              │           │          │
 [APPROVE]      [APPROVE]   [APPROVE]  [COMPLETE]
```

### WSJF Formula
```
WSJF = (User Value + Time Criticality + Risk Reduction) / Job Duration
```

### Hierarchy
```
Strategic Theme → Component → Capability → Enabler → Requirement
```

### Key Principles

1. **No Epics** - Capabilities and Enablers are sufficient with AI
2. **Invest in Specifications** - AI quality depends on specification quality
3. **Examples Over Descriptions** - Concrete inputs/outputs beat abstract requirements
4. **AI Reviews First** - Catch ambiguities before implementation
5. **Human Approvals at Gates** - AI assists, humans decide

---

**Document Version**: 2.0
**Last Updated**: 2025-12-01
**Maintained By**: Development Team
