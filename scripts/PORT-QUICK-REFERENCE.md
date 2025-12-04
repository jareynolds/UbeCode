# Port Configuration Quick Reference

## Current Ports (Default)

```
8080 - Integration Service     (Go/HTTP)
8081 - Design Service          (Go/HTTP)
8082 - Capability Service      (Go/HTTP)
8083 - Auth Service            (Go/HTTP)
8084 - Collaboration Server    (Node.js/WebSocket)
3001 - Specification API       (Node.js/HTTP)
3002 - Shared Workspace API    (Node.js/HTTP)
5173 - Web UI (Vite)           (Frontend Dev Server)
5432 - PostgreSQL              (Database)
```

## Suggested Alternative Port Sets

### Option 1: 9000 Range (Recommended)
```
9080 - Integration Service
9081 - Design Service
9082 - Capability Service
9083 - Auth Service
9084 - Collaboration Server
4001 - Specification API
4002 - Shared Workspace API
6173 - Web UI (Vite)
6432 - PostgreSQL
```

### Option 2: 7000 Range
```
7080 - Integration Service
7081 - Design Service
7082 - Capability Service
7083 - Auth Service
7084 - Collaboration Server
7001 - Specification API
7002 - Shared Workspace API
7173 - Web UI (Vite)
7432 - PostgreSQL
```

### Option 3: High Port Range (10000+)
```
10080 - Integration Service
10081 - Design Service
10082 - Capability Service
10083 - Auth Service
10084 - Collaboration Server
11001 - Specification API
11002 - Shared Workspace API
11173 - Web UI (Vite)
15432 - PostgreSQL
```

## Quick Commands

### Change Ports
```bash
./scripts/change-ports.sh
```

### Check Port Usage
```bash
# Check if port is in use
lsof -i :8080

# Check all service ports
lsof -i :8080 -i :8081 -i :8082 -i :8083 -i :8084 -i :3001 -i :3002 -i :5173

# Kill process on port
lsof -ti:8080 | xargs kill
```

### Restart Services After Port Change
```bash
# Stop everything
docker-compose down
cd web-ui && pkill node && cd ..

# Rebuild and start Docker services
docker-compose build
docker-compose up -d

# Start Node.js servers
cd web-ui
node server.js &
node collaboration-server.js &
node shared-workspace-server.js &
npm run dev
```

## Files Updated by Script

- `.env`
- `docker-compose.yml`
- `web-ui/.env`
- `web-ui/vite.config.ts`
- `web-ui/server.js`
- `web-ui/collaboration-server.js`
- `web-ui/shared-workspace-server.js`
- `web-ui/src/context/WorkspaceContext.tsx`
- `web-ui/src/context/CollaborationContext.tsx`
- `web-ui/src/pages/Ideation.tsx`

## Common Ports to Avoid

```
3000  - Create React App, Next.js
4200  - Angular CLI
5000  - Flask
8000  - Django
8888  - Jupyter Notebook
3306  - MySQL
27017 - MongoDB
6379  - Redis
```

## Backups

Automatic backups are created at:
```
.port-backup-YYYYMMDD-HHMMSS/
```

To restore:
```bash
cp .port-backup-*/[filename] .
```

## Health Checks

After changing ports, verify services:
```bash
# Integration Service
curl http://localhost:9080/health

# Design Service
curl http://localhost:9081/health

# Capability Service
curl http://localhost:9082/health

# Auth Service
curl http://localhost:9083/health

# Specification API
curl http://localhost:4001/api/health

# Web UI
open http://localhost:6173
```

## Troubleshooting

### Service won't start
1. Check port availability: `lsof -i :[port]`
2. Check Docker logs: `docker-compose logs [service-name]`
3. Verify .env file: `cat .env`

### Frontend can't connect
1. Check web-ui/.env: `cat web-ui/.env`
2. Check browser console for errors
3. Verify backend is running: `curl http://localhost:[port]/health`

### Database connection issues
1. Check database port: `docker-compose ps`
2. Verify DB_PORT in docker-compose.yml
3. Check connection string in service configs

## Quick Test

After port changes:
```bash
# Test all services respond
for port in 9080 9081 9082 9083; do
  echo "Testing port $port..."
  curl -s http://localhost:$port/health || echo "FAILED"
done

# Test Node.js servers
curl -s http://localhost:4001/api/health
curl -s http://localhost:4002/api/health

# Test frontend
curl -s http://localhost:6173 | head -n 5
```
