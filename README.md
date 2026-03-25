# Bridgebox Family Law

A production-grade Family Law Command Center designed to unify matter intelligence, financial forensics, and chronology generation into an audit-friendly, litigation-ready platform mapping across Clio, OurFamilyWizard, and SoberLink.

## Core Features
1. **Family Law Command Center**: Portfolio & Matter-level drill-down dashboards.
2. **Unified Chronology Engine**: Automatic arrangement of timeline events from diverse imported sources.
3. **Evidence Intake**: Intake mappings for complex document parsing.
4. **Financial Forensics**: Recoverable expense ledgers mapped specifically for family law petitions.
5. **Evaluation Workflows**: Mental Health and Substance Abuse milestone tracking.
6. **Integration Layer**: Stub adapters for extracting intel from Clio, OFW, and SoberLink natively.

## Local Development Workflow

### Prerequisites
- Node.js v18+ 
- NPM 9+
- Git

### Installation & Setup
1. **Clone the repository**:
   ```ps1
   git clone https://github.com/nedpearson/BridgeBox_Family_Law.git
   cd Bridgebox_Family_Law
   ```

2. **Install Dependencies**:
   ```ps1
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root matching `.env.example`:
   ```bash
   VITE_SUPABASE_URL=your_local_or_remote_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_CLIO_CLIENT_ID=your_clio_oauth_client_id
   ```
   *(Ensure no actual secrets are ever committed. The application safely handles missing environmental keys by defaulting to UI stub-mode)*

4. **Run Local Server**:
   ```ps1
   npm run dev
   ```
   App will be available at `http://localhost:5173`. 
   The public landing page sits at `/`, and the Command Center dashboard at `/app`.

### Build for Production
To generate the static bundle and ensure all typechecks pass:
```ps1
npm run build
```

## Security & Multitenancy Architecture

The application requires strict tenant isolation to prevent cross-matter leakage across law firms.

- **Supabase RLS (Row Level Security)**: All queries are implicitly restricted at the database level by the Postgres database using `auth.tenant_id()` from user JWT claims.
- **Role Based Access Control (RBAC)**: Enforced isolation preventing standard paralegal or attorney accounts from overriding firm-level integration configurations.
- **Backup Strategy**: 
  - **Primary**: Supabase Point-In-Time-Recovery (PITR) is expected to be enabled on the production project.
  - **Replica**: Daily logical pg_dump backups run securely via GitHub actions/Supabase edge functions.
  - **Immutable Storage**: Hosted on a cold-storage S3-compliant bucket with versioning locking for legal retention compliance.

See `supabase/schema.sql` for canonical RLS implementations.
