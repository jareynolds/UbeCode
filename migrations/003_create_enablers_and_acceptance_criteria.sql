-- Migration: Create Enablers and Acceptance Criteria System
-- This migration adds:
-- 1. acceptance_criteria JSONB field to capabilities table
-- 2. enablers table for technical implementations
-- 3. enabler_requirements table for functional/non-functional requirements
-- 4. acceptance_criteria table for flexible criteria tracking

-- =====================================================
-- 1. Add acceptance_criteria to capabilities table
-- =====================================================
ALTER TABLE capabilities
ADD COLUMN IF NOT EXISTS acceptance_criteria JSONB DEFAULT '[]';

COMMENT ON COLUMN capabilities.acceptance_criteria IS 'Structured acceptance criteria as JSON array: [{id, description, completed, priority, type}]';

-- =====================================================
-- 2. Create enablers table
-- =====================================================
CREATE TABLE IF NOT EXISTS enablers (
    id SERIAL PRIMARY KEY,
    enabler_id VARCHAR(50) UNIQUE NOT NULL,  -- e.g., ENB-582341
    capability_id INTEGER NOT NULL REFERENCES capabilities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    purpose TEXT,
    owner VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'draft',  -- draft, ready_for_analysis, in_analysis, ready_for_design, in_design, ready_for_implementation, in_implementation, implemented, deprecated
    approval_status VARCHAR(50) DEFAULT 'draft',  -- draft, pending_approval, approved, rejected
    workflow_stage VARCHAR(50) DEFAULT 'specification',  -- specification, definition, design, execution
    priority VARCHAR(20) DEFAULT 'medium',  -- high, medium, low
    analysis_review_required BOOLEAN DEFAULT true,
    code_review_required BOOLEAN DEFAULT false,
    technical_specs JSONB DEFAULT '{}',  -- Store technical specifications as JSON
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_enablers_enabler_id ON enablers(enabler_id);
CREATE INDEX IF NOT EXISTS idx_enablers_capability_id ON enablers(capability_id);
CREATE INDEX IF NOT EXISTS idx_enablers_status ON enablers(status);
CREATE INDEX IF NOT EXISTS idx_enablers_approval_status ON enablers(approval_status);
CREATE INDEX IF NOT EXISTS idx_enablers_workflow_stage ON enablers(workflow_stage);

-- Create trigger for enablers table
DROP TRIGGER IF EXISTS update_enablers_updated_at ON enablers;
CREATE TRIGGER update_enablers_updated_at
    BEFORE UPDATE ON enablers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE enablers IS 'Technical implementations that realize capabilities';

-- =====================================================
-- 3. Create enabler_requirements table (FR/NFR)
-- =====================================================
CREATE TABLE IF NOT EXISTS enabler_requirements (
    id SERIAL PRIMARY KEY,
    requirement_id VARCHAR(50) UNIQUE NOT NULL,  -- e.g., FR-582341 or NFR-582341
    enabler_id INTEGER NOT NULL REFERENCES enablers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirement_type VARCHAR(20) NOT NULL,  -- 'functional' or 'non_functional'
    nfr_category VARCHAR(50),  -- Performance, Security, Usability, Scalability, Reliability, Maintainability, Compatibility
    status VARCHAR(50) NOT NULL DEFAULT 'draft',  -- draft, ready_for_design, in_design, ready_for_implementation, in_implementation, implemented, verified, rejected
    approval_status VARCHAR(50) DEFAULT 'pending',  -- pending, approved, rejected
    priority VARCHAR(20) DEFAULT 'should_have',  -- must_have, should_have, could_have, wont_have (MoSCoW)
    completed BOOLEAN DEFAULT false,
    verified_by INTEGER REFERENCES users(id),
    verified_at TIMESTAMP,
    notes TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enabler_requirements_requirement_id ON enabler_requirements(requirement_id);
CREATE INDEX IF NOT EXISTS idx_enabler_requirements_enabler_id ON enabler_requirements(enabler_id);
CREATE INDEX IF NOT EXISTS idx_enabler_requirements_type ON enabler_requirements(requirement_type);
CREATE INDEX IF NOT EXISTS idx_enabler_requirements_status ON enabler_requirements(status);
CREATE INDEX IF NOT EXISTS idx_enabler_requirements_priority ON enabler_requirements(priority);

-- Create trigger for enabler_requirements table
DROP TRIGGER IF EXISTS update_enabler_requirements_updated_at ON enabler_requirements;
CREATE TRIGGER update_enabler_requirements_updated_at
    BEFORE UPDATE ON enabler_requirements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE enabler_requirements IS 'Functional and Non-Functional requirements for enablers';

-- =====================================================
-- 4. Create acceptance_criteria table (flexible)
-- =====================================================
CREATE TABLE IF NOT EXISTS acceptance_criteria (
    id SERIAL PRIMARY KEY,
    criteria_id VARCHAR(50) UNIQUE NOT NULL,  -- e.g., AC-582341
    entity_type VARCHAR(20) NOT NULL,  -- 'capability', 'enabler', or 'requirement'
    entity_id INTEGER NOT NULL,  -- References capability.id, enabler.id, or enabler_requirement.id
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    criteria_format VARCHAR(50) DEFAULT 'checklist',  -- 'checklist', 'given_when_then', 'metric'
    given_clause TEXT,  -- For given_when_then format
    when_clause TEXT,   -- For given_when_then format
    then_clause TEXT,   -- For given_when_then format
    metric_name VARCHAR(255),  -- For metric format
    metric_target VARCHAR(255),  -- For metric format (e.g., "< 200ms", "> 99.9%")
    metric_actual VARCHAR(255),  -- Actual measured value
    priority VARCHAR(20) DEFAULT 'must',  -- must, should, could, wont (MoSCoW)
    status VARCHAR(50) DEFAULT 'pending',  -- pending, passed, failed, blocked, skipped
    verified_by INTEGER REFERENCES users(id),
    verified_at TIMESTAMP,
    verification_notes TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_acceptance_criteria_criteria_id ON acceptance_criteria(criteria_id);
CREATE INDEX IF NOT EXISTS idx_acceptance_criteria_entity ON acceptance_criteria(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_acceptance_criteria_status ON acceptance_criteria(status);
CREATE INDEX IF NOT EXISTS idx_acceptance_criteria_priority ON acceptance_criteria(priority);

-- Create trigger for acceptance_criteria table
DROP TRIGGER IF EXISTS update_acceptance_criteria_updated_at ON acceptance_criteria;
CREATE TRIGGER update_acceptance_criteria_updated_at
    BEFORE UPDATE ON acceptance_criteria
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE acceptance_criteria IS 'Flexible acceptance criteria that can be attached to capabilities, enablers, or requirements';

-- =====================================================
-- 5. Create enabler_dependencies table
-- =====================================================
CREATE TABLE IF NOT EXISTS enabler_dependencies (
    id SERIAL PRIMARY KEY,
    enabler_id INTEGER NOT NULL REFERENCES enablers(id) ON DELETE CASCADE,
    depends_on_enabler_id INTEGER REFERENCES enablers(id) ON DELETE CASCADE,
    depends_on_capability_id INTEGER REFERENCES capabilities(id) ON DELETE CASCADE,
    dependency_type VARCHAR(20) NOT NULL,  -- 'upstream' or 'downstream'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT enabler_dep_check CHECK (
        (depends_on_enabler_id IS NOT NULL AND depends_on_capability_id IS NULL) OR
        (depends_on_enabler_id IS NULL AND depends_on_capability_id IS NOT NULL)
    ),
    UNIQUE(enabler_id, depends_on_enabler_id, dependency_type),
    UNIQUE(enabler_id, depends_on_capability_id, dependency_type)
);

CREATE INDEX IF NOT EXISTS idx_enabler_dependencies_enabler_id ON enabler_dependencies(enabler_id);
CREATE INDEX IF NOT EXISTS idx_enabler_dependencies_depends_on_enabler ON enabler_dependencies(depends_on_enabler_id);
CREATE INDEX IF NOT EXISTS idx_enabler_dependencies_depends_on_capability ON enabler_dependencies(depends_on_capability_id);

COMMENT ON TABLE enabler_dependencies IS 'Dependencies between enablers and other enablers or capabilities';

-- =====================================================
-- 6. Create enabler_approvals table (for approval workflow)
-- =====================================================
CREATE TABLE IF NOT EXISTS enabler_approvals (
    id SERIAL PRIMARY KEY,
    enabler_id INTEGER NOT NULL REFERENCES enablers(id) ON DELETE CASCADE,
    stage VARCHAR(50) NOT NULL,  -- specification, definition, design, execution
    status VARCHAR(50) NOT NULL DEFAULT 'pending_approval',  -- pending_approval, approved, rejected, withdrawn
    requested_by INTEGER NOT NULL REFERENCES users(id),
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    decided_by INTEGER REFERENCES users(id),
    decided_at TIMESTAMP,
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enabler_approvals_enabler_id ON enabler_approvals(enabler_id);
CREATE INDEX IF NOT EXISTS idx_enabler_approvals_status ON enabler_approvals(status);
CREATE INDEX IF NOT EXISTS idx_enabler_approvals_stage ON enabler_approvals(stage);

-- Create trigger for enabler_approvals table
DROP TRIGGER IF EXISTS update_enabler_approvals_updated_at ON enabler_approvals;
CREATE TRIGGER update_enabler_approvals_updated_at
    BEFORE UPDATE ON enabler_approvals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE enabler_approvals IS 'Approval workflow for enablers';

-- =====================================================
-- 7. Insert sample data for testing (optional)
-- =====================================================
-- This can be commented out in production

-- Example: Add acceptance criteria to capability format
-- UPDATE capabilities SET acceptance_criteria = '[
--   {"id": "AC-001", "description": "Users can authenticate with email/password", "completed": false, "priority": "must", "type": "checklist"},
--   {"id": "AC-002", "description": "System maintains session for 24 hours", "completed": false, "priority": "should", "type": "checklist"}
-- ]' WHERE id = 1;
