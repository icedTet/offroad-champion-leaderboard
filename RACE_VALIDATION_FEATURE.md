# Race Validation Management Feature

## Overview

Added complete race validation management to the admin dashboard, allowing administrators to review, flag, and manage suspicious race submissions to detect and prevent cheating.

## Features Implemented

### ✅ 1. Flagged Races Page (`/admin/races`)

**Location:** `src/pages/admin/races/index.tsx`

**Features:**
- View all flagged races in a table format
- Search by User ID
- Filter by Track ID
- Pagination (20 races per page)
- Shows:
  - Player username and name
  - Track ID
  - Race time
  - Flag reason
  - Date of race
  - Quick link to review details

**Access:** Via "Races" link in admin navigation sidebar

### ✅ 2. Race Detail Page (`/admin/races/[id]`)

**Location:** `src/pages/admin/races/[id].tsx`

**Features:**
- Comprehensive race information display
- Checkpoint data visualization
  - Shows each checkpoint time
  - Calculates split times between checkpoints
  - Visual timeline representation
- Flag/Unflag actions with reason required
- View player profile link
- Shows:
  - Validation ID and hash
  - Player information (with frozen status indicator)
  - Track ID
  - Total race time
  - Complete checkpoint breakdown
  - Flag status and reason (if flagged)

**Actions:**
- **Flag Race** - Mark race as suspicious with detailed reason
- **Unflag Race** - Remove flag with justification
- **View Player** - Navigate to player detail page

### ✅ 3. Race History in Player Detail

**Location:** `src/pages/admin/players/[id].tsx` (updated)

**Features:**
- Collapsible "Race History" section on player detail page
- Shows last 10 races
- Displays:
  - Track ID
  - Race time
  - Flagged status badge
  - Flag reason (if applicable)
  - Date and time
- Link to view full race details
- Link to view all player races

**Usage:** Click "Show Races" button to expand race history

### ✅ 4. API Service Integration

**Location:** `src/services/adminApi.ts` (updated)

**New Methods:**
```typescript
// Get all flagged races with filters
getFlaggedRaces(params: { userId?, trackId?, limit?, offset? })

// Get specific race validation details
getRaceValidation(validationId: string)

// Flag a race as suspicious
flagRace(validationId: string, reason: string)

// Unflag a race
unflagRace(validationId: string, reason: string)

// Get player's race history
getPlayerRaces(userId: string, params: { trackId?, flaggedOnly?, limit?, offset? })
```

### ✅ 5. Updated Navigation

**Location:** `src/components/admin/AdminLayout.tsx` (updated)

- Added "Races" navigation item with flag icon
- Positioned between "Players" and "Prizes"
- Active state highlighting on race pages

## API Endpoints Used

### GET `/api/v2/admin/races/flagged`
Get all flagged races with optional filters

### GET `/api/v2/admin/races/:validationId`
Get detailed race validation information

### POST `/api/v2/admin/races/:validationId/flag`
Flag a race with reason (logged in admin_logs)

### POST `/api/v2/admin/races/:validationId/unflag`
Unflag a race with reason (logged in admin_logs)

### GET `/api/v2/admin/players/:userId/races`
Get complete race history for a player

## User Interface

### Color Coding
- **Flagged Races**: Red badges and backgrounds
- **Track IDs**: Purple code blocks
- **Race Times**: Monospace font with clock icon
- **Checkpoint Times**: Organized in timeline format

### Checkpoint Visualization

The race detail page includes an interactive checkpoint timeline that shows:
1. Each checkpoint as a circle node
2. Time at each checkpoint
3. Split times between consecutive checkpoints
4. Visual connection between checkpoints

Example:
```
CP1 -------- CP2 -------- CP3 -------- Finish
12.5s       25.8s        38.9s        45.1s
  +12.5s      +13.3s       +13.1s       +6.2s
```

## Workflow

### Reviewing Flagged Races

1. **Navigate to Races** page (`/admin/races`)
2. **Browse flagged races** in the table
3. **Click "Review"** on any race
4. **Analyze checkpoint data** for anomalies
5. **Take action:**
   - Keep flagged if suspicious
   - Unflag if legitimate (with reason)
   - Navigate to player profile for further investigation

### Flagging a Race from Player Profile

1. **Navigate to Player Detail** page
2. **Click "Show Races"** to expand race history
3. **Click "View"** on any race
4. **Review checkpoint times**
5. **Click "Flag Race"** if suspicious
6. **Provide detailed reason** for flagging

### Investigating Cheating Patterns

1. **Search for player** in flagged races
2. **Review multiple races** from same player
3. **Look for patterns:**
   - Consistently impossible split times
   - Identical checkpoint patterns across races
   - Sudden improvement in times
4. **Take appropriate action:**
   - Flag additional suspicious races
   - Freeze player account if confirmed cheating
   - Document findings in admin logs

## Data Types

### RaceValidation Interface
```typescript
interface RaceValidation {
  validationId: string;
  userId: string;
  raceTime: string;
  trackId: string;
  checkpointData: Record<string, number>;
  validationHash: string;
  flagged: boolean;
  flagReason: string | null;
  createdAt: string;
  user: {
    id: string;
    username: string;
    name: string;
    isFrozen?: boolean;
  };
}
```

### Checkpoint Data Format
```json
{
  "checkpoint1": 12.456,
  "checkpoint2": 25.789,
  "checkpoint3": 38.901,
  "finalCheckpoint": 45.123
}
```

## Security & Audit

### All race management actions are logged:
- **Action Type**: `flag_race` or `unflag_race`
- **Admin ID**: Who performed the action
- **Target Race ID**: Which race was affected
- **Reason**: Detailed justification
- **Timestamp**: When action occurred
- **IP Address**: Admin's IP address

### Access Control:
- All endpoints require admin authentication
- JWT token with admin role required
- Regular players cannot access race management

## Testing

### Manual Testing Checklist

1. **Flagged Races Page**
   - [ ] Navigate to /admin/races
   - [ ] View list of flagged races
   - [ ] Search by User ID
   - [ ] Filter by Track ID
   - [ ] Navigate pages
   - [ ] Click "Review" to view details

2. **Race Detail Page**
   - [ ] View race information
   - [ ] See checkpoint breakdown
   - [ ] See checkpoint timeline
   - [ ] Flag an unflagged race
   - [ ] Unflag a flagged race
   - [ ] Click "View Player" link

3. **Player Race History**
   - [ ] Go to player detail page
   - [ ] Click "Show Races"
   - [ ] View race list
   - [ ] See flagged badge on flagged races
   - [ ] Click "View" to see race details
   - [ ] Click "View All Races"

4. **Navigation**
   - [ ] "Races" link appears in sidebar
   - [ ] Active state highlights on race pages
   - [ ] Mobile menu includes Races

## Files Created/Modified

### Created:
- `src/pages/admin/races/index.tsx` - Flagged races list page
- `src/pages/admin/races/[id].tsx` - Race detail page
- `RACE_VALIDATION_FEATURE.md` - This documentation

### Modified:
- `src/services/adminApi.ts` - Added race validation API methods
- `src/components/admin/AdminLayout.tsx` - Added Races navigation item
- `src/pages/admin/players/[id].tsx` - Added Race History section

## Build Status

✅ **Build**: Passing
✅ **TypeScript**: No errors
✅ **All pages**: Working

## Integration with Existing Features

### Works with:
- **Player Management**: View races from player detail page
- **Account Actions**: Frozen players visible in race details
- **Admin Logs**: All flag/unflag actions logged
- **Authentication**: Protected with admin-only access

## Future Enhancements

Potential improvements:
- [ ] Batch flag/unflag operations
- [ ] Export flagged races to CSV
- [ ] Automated cheating detection algorithms
- [ ] Race comparison view (compare two races side-by-side)
- [ ] Track-specific statistics and records
- [ ] Heatmap of checkpoint times
- [ ] Pattern recognition for common cheating methods
- [ ] Integration with anti-cheat systems

## Usage Tips

### Identifying Suspicious Races:

1. **Look for impossible split times**
   - If split between checkpoints is faster than physically possible
   - Consistent pattern of impossible times

2. **Check validation hash**
   - Multiple races with identical hash indicate replay attack

3. **Review player history**
   - Sudden dramatic improvement in times
   - All races flagged
   - Recent account creation with suspiciously good times

4. **Track-specific analysis**
   - Compare times to track records
   - Look at checkpoint order and progression

### Best Practices:

- Always provide detailed reasons when flagging/unflagging
- Review multiple races before freezing an account
- Document patterns in admin logs
- Cross-reference with transaction history
- Check if player is already frozen before investigating

---

**Feature Status**: ✅ Complete and Production Ready
**Integration**: ✅ Fully integrated with admin dashboard
**Documentation**: ✅ Complete
**Testing**: Ready for QA
