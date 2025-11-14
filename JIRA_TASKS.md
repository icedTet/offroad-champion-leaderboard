# Jira Task Breakdown for November 12 Commits

## Epic 1: Admin Panel Feature
**Epic ID**: OFFROAD-100
**Description**: Complete admin panel system with authentication, player management, race validation, prize configuration, and activity logging
**Story Points**: 34
**Created Files**: 14 | **Modified Files**: 4 | **Total Lines**: +3,704 / -80

---

### Story 1.1: Admin Authentication System
**Task ID**: OFFROAD-101
**Story Points**: 5
**Priority**: Highest
**Labels**: `backend`, `security`, `authentication`

#### Description
Implement complete admin authentication system with JWT-based login, session management, and role-based access control.

#### Acceptance Criteria
- [ ] Admin login page at `/admin/login` with username/password fields
- [ ] JWT token storage in localStorage
- [ ] AdminAuthContext provides authentication state across app
- [ ] Token validation on page load
- [ ] Automatic redirect to login for unauthenticated users
- [ ] Role validation (admin role required)
- [ ] Logout functionality with token cleanup
- [ ] useRequireAdmin hook for protected routes

#### Technical Details
**Files Created:**
- `src/pages/admin/login.tsx` (103 lines)
- `src/contexts/AdminAuthContext.tsx` (116 lines)

**Files Modified:**
- `src/pages/_app.tsx` (added AdminAuthProvider wrapper)

**API Endpoints:**
- POST `/api/v2/auth/login` - Admin login with credentials
- Includes token refresh on app reload via dashboard API call

#### Dependencies
- None (foundational task)

---

### Story 1.2: Admin API Service Layer
**Task ID**: OFFROAD-102
**Story Points**: 3
**Priority**: Highest
**Labels**: `backend`, `api`, `infrastructure`

#### Description
Create centralized admin API service with JWT authentication, error handling, and methods for all admin operations.

#### Acceptance Criteria
- [ ] AdminApiService class with token management
- [ ] Automatic JWT token injection in request headers
- [ ] Centralized error handling with status codes
- [ ] Methods for all admin operations (dashboard, players, races, prizes, logs)
- [ ] Token storage/retrieval from localStorage
- [ ] Singleton pattern for service instance

#### Technical Details
**Files Created:**
- `src/services/adminApi.ts` (272 lines)

**API Methods Implemented:**
```typescript
- login(username, password)
- logout()
- getDashboard()
- getPlayers(filters)
- getPlayer(userId)
- freezeAccount(userId, reason)
- unfreezeAccount(userId, reason)
- adjustFunds(userId, data)
- getLogs(filters)
- getPrizes()
- updatePrizeConfig(period, mode, data)
- getFlaggedRaces(filters)
- getRaceValidation(validationId)
- flagRace(validationId, reason)
- unflagRace(validationId, reason)
- getPlayerRaces(userId, filters)
```

#### Dependencies
- OFFROAD-101 (authentication context)

---

### Story 1.3: Admin Layout & Navigation
**Task ID**: OFFROAD-103
**Story Points**: 3
**Priority**: High
**Labels**: `frontend`, `ui`, `navigation`

#### Description
Build reusable admin layout with sidebar navigation, user info display, and consistent styling across all admin pages.

#### Acceptance Criteria
- [ ] Responsive sidebar with navigation links
- [ ] Active route highlighting
- [ ] User info display in header (username, role)
- [ ] Logout button
- [ ] Mobile-friendly collapsible menu
- [ ] Consistent padding and styling
- [ ] Navigation items: Dashboard, Players, Races, Prizes, Logs
- [ ] Icons for each navigation item

#### Technical Details
**Files Created:**
- `src/components/admin/AdminLayout.tsx` (157 lines)

**Navigation Structure:**
- Dashboard (home icon)
- Players (users icon)
- Races (flag icon)
- Prizes (trophy icon)
- Logs (file-text icon)

#### Dependencies
- OFFROAD-101 (for useAdminAuth hook)

---

### Story 1.4: Admin Dashboard Overview
**Task ID**: OFFROAD-104
**Story Points**: 5
**Priority**: High
**Labels**: `frontend`, `ui`, `dashboard`

#### Description
Create main admin dashboard with key metrics, recent activity, and quick access to common actions.

#### Acceptance Criteria
- [ ] Dashboard page at `/admin`
- [ ] Protected route (requires admin authentication)
- [ ] Key metrics display (player count, active tournaments, etc.)
- [ ] Recent activity summary
- [ ] Quick action cards/links
- [ ] Loading states
- [ ] Error handling

#### Technical Details
**Files Created:**
- `src/pages/admin/index.tsx` (164 lines)

**API Endpoints:**
- GET `/api/v2/admin/dashboard` - Fetch dashboard statistics

**Metrics Displayed:**
- Total players
- Frozen accounts
- Active tournaments
- Recent admin actions
- System health indicators

#### Dependencies
- OFFROAD-102 (admin API service)
- OFFROAD-103 (admin layout)

---

### Story 1.5: Player Management - List & Search
**Task ID**: OFFROAD-105
**Story Points**: 5
**Priority**: High
**Labels**: `frontend`, `player-management`, `ui`

#### Description
Implement player list page with search, filtering, sorting, and pagination capabilities.

#### Acceptance Criteria
- [ ] Player list page at `/admin/players`
- [ ] Search by username or user ID
- [ ] Filter by frozen status
- [ ] Sortable columns (username, join date, races, etc.)
- [ ] Pagination with configurable page size
- [ ] Click row to view player details
- [ ] Frozen account indicators
- [ ] Loading and error states

#### Technical Details
**Files Created:**
- `src/pages/admin/players/index.tsx` (323 lines)

**Features:**
- Table with sortable columns
- Search debouncing
- URL query param sync
- 50 players per page
- Quick stats per player

#### Dependencies
- OFFROAD-102 (admin API service)
- OFFROAD-103 (admin layout)

---

### Story 1.6: Player Management - Detail View & Actions
**Task ID**: OFFROAD-106
**Story Points**: 8
**Priority**: High
**Labels**: `frontend`, `player-management`, `ui`, `actions`

#### Description
Build comprehensive player detail page with account actions (freeze/unfreeze), fund adjustments, race history, and audit trail.

#### Acceptance Criteria
- [ ] Player detail page at `/admin/players/[id]`
- [ ] Display complete player profile
- [ ] Freeze/Unfreeze account with reason modal
- [ ] Adjust funds (coins, gains, temporal coins) with reason
- [ ] View race history (last 10 races)
- [ ] Show flagged races with badges
- [ ] Link to full race history
- [ ] Display account statistics
- [ ] Show frozen status prominently
- [ ] All actions logged in admin_logs

#### Technical Details
**Files Created:**
- `src/pages/admin/players/[id].tsx` (504 lines)
- `src/components/admin/ActionModal.tsx` (130 lines)
- `src/components/admin/FundsAdjustmentModal.tsx` (224 lines)

**Player Info Displayed:**
- User ID, username, display name
- Country code
- Account creation date
- Frozen status and reason
- Current balances (coins, gains, temporal)
- Tournament statistics
- Race count and best times

**Actions Available:**
- Freeze Account (requires reason)
- Unfreeze Account (requires reason)
- Adjust Coins (±)
- Adjust Gains (±)
- Adjust Temporal Coins (±)
- View Race History

#### Dependencies
- OFFROAD-102 (admin API service)
- OFFROAD-103 (admin layout)

---

### Story 1.7: Race Validation Management
**Task ID**: OFFROAD-107
**Story Points**: 8
**Priority**: High
**Labels**: `frontend`, `anti-cheat`, `race-validation`, `ui`

#### Description
Implement race validation system for reviewing suspicious races, viewing checkpoint data, and flagging/unflagging races.

#### Acceptance Criteria
- [ ] Flagged races list page at `/admin/races`
- [ ] Race detail page at `/admin/races/[id]` with checkpoint visualization
- [ ] Search by user ID or track ID
- [ ] Pagination for race list
- [ ] Checkpoint timeline visualization
- [ ] Split times between checkpoints
- [ ] Flag/Unflag actions with reason
- [ ] Link to player profile
- [ ] Show validation hash
- [ ] Integration with player detail page (race history section)

#### Technical Details
**Files Created:**
- `src/pages/admin/races/index.tsx` (297 lines)
- `src/pages/admin/races/[id].tsx` (318 lines)
- `RACE_VALIDATION_FEATURE.md` (328 lines - documentation)

**Files Modified:**
- `src/pages/admin/players/[id].tsx` (added race history section)
- `src/components/admin/AdminLayout.tsx` (added Races nav item)

**Checkpoint Visualization:**
```
CP1 -------- CP2 -------- CP3 -------- Finish
12.5s       25.8s        38.9s        45.1s
  +12.5s      +13.3s       +13.1s       +6.2s
```

**Race Data Displayed:**
- Validation ID and hash
- Player info (with frozen indicator)
- Track ID
- Total race time
- Complete checkpoint breakdown
- Flag status and reason
- Created date

#### Dependencies
- OFFROAD-102 (admin API service - race methods)
- OFFROAD-103 (admin layout)
- OFFROAD-106 (player detail integration)

---

### Story 1.8: Prize Configuration Management
**Task ID**: OFFROAD-108
**Story Points**: 5
**Priority**: Medium
**Labels**: `frontend`, `prize-management`, `ui`

#### Description
Create prize configuration interface for managing tournament prize amounts across all periods and modes.

#### Acceptance Criteria
- [ ] Prize management page at `/admin/prizes`
- [ ] Display current prizes for all tournament types
- [ ] Edit prizes for specific period/mode combinations
- [ ] Validation for prize amounts (non-negative, reasonable limits)
- [ ] Save confirmation
- [ ] Show last updated timestamp
- [ ] Matrix view of all prize configurations
- [ ] 1st, 2nd, 3rd place prizes for each tournament

#### Technical Details
**Files Created:**
- `src/pages/admin/prizes/index.tsx` (264 lines)

**Prize Matrix:**
```
             Single-Player           Multi-Player
           1st | 2nd | 3rd       1st | 2nd | 3rd
Daily      $X  | $Y  | $Z        $X  | $Y  | $Z
Weekly     $X  | $Y  | $Z        $X  | $Y  | $Z
Monthly    $X  | $Y  | $Z        $X  | $Y  | $Z
```

**API Endpoints:**
- GET `/api/v2/admin/prizes` - Get all prize configs
- GET `/api/v2/admin/prizes/:period/:mode` - Get specific config
- PUT `/api/v2/admin/prizes/:period/:mode` - Update prizes

#### Dependencies
- OFFROAD-102 (admin API service)
- OFFROAD-103 (admin layout)

---

### Story 1.9: Admin Activity Logs
**Task ID**: OFFROAD-109
**Story Points**: 5
**Priority**: Medium
**Labels**: `frontend`, `audit`, `logging`, `ui`

#### Description
Build activity log viewer for auditing all admin actions with filtering, search, and detailed action information.

#### Acceptance Criteria
- [ ] Admin logs page at `/admin/logs`
- [ ] Filter by admin user
- [ ] Filter by target user
- [ ] Filter by action type
- [ ] Date range filtering
- [ ] Pagination (50 logs per page)
- [ ] Show detailed action information
- [ ] Display admin name, target, action, reason, timestamp
- [ ] Export logs functionality (optional)
- [ ] Real-time updates (optional)

#### Technical Details
**Files Created:**
- `src/pages/admin/logs/index.tsx` (366 lines)

**Log Entry Information:**
- Log ID
- Admin ID and username
- Target user ID (if applicable)
- Target race ID (if applicable)
- Action type (freeze_account, flag_race, adjust_funds, etc.)
- Reason provided
- Timestamp
- IP address
- Additional metadata

**Filterable Actions:**
- freeze_account
- unfreeze_account
- adjust_funds
- flag_race
- unflag_race
- update_prizes
- login

#### Dependencies
- OFFROAD-102 (admin API service)
- OFFROAD-103 (admin layout)

---

### Story 1.10: Admin Panel Documentation
**Task ID**: OFFROAD-110
**Story Points**: 2
**Priority**: Low
**Labels**: `documentation`

#### Description
Create comprehensive documentation for the admin panel feature including setup, usage, and API integration.

#### Acceptance Criteria
- [ ] Feature overview documentation
- [ ] User guide for each admin page
- [ ] API endpoint documentation
- [ ] Security and access control documentation
- [ ] Workflow examples
- [ ] Testing checklist

#### Technical Details
**Files Created:**
- `RACE_VALIDATION_FEATURE.md` (328 lines - included in OFFROAD-107)

**Documentation Sections:**
- Overview of admin panel
- Authentication flow
- Player management workflows
- Race validation procedures
- Prize configuration guide
- Activity log interpretation
- Best practices
- Troubleshooting

#### Dependencies
- All previous admin stories (for complete documentation)

---

## Epic 2: Live Data Sync Feature
**Epic ID**: OFFROAD-200
**Description**: Real-time tournament data synchronization across all public-facing pages using new API service layer
**Story Points**: 21
**Created Files**: 2 | **Modified Files**: 5 | **Total Lines**: +880 / -138

---

### Story 2.1: Tournament API Service Layer
**Task ID**: OFFROAD-201
**Story Points**: 5
**Priority**: Highest
**Labels**: `backend`, `api`, `infrastructure`

#### Description
Create comprehensive Tournament API service for fetching live tournament data, leaderboards, user stats, and global platform statistics.

#### Acceptance Criteria
- [ ] TournamentApiService class with API key authentication
- [ ] TypeScript interfaces for all API response types
- [ ] Methods for leaderboard data (daily/weekly/monthly, SP/MP)
- [ ] User statistics endpoint integration
- [ ] Tournament summary endpoint
- [ ] Global stats endpoint
- [ ] Prize data endpoint
- [ ] Error handling with typed errors
- [ ] Singleton pattern for service instance

#### Technical Details
**Files Created:**
- `src/services/tournamentApi.ts` (312 lines)

**API Methods:**
```typescript
getLeaderboard(params: {
  period: 'daily' | 'weekly' | 'monthly',
  mode: 'singleplayer' | 'multiplayer' | 'both',
  date?, limit?, offset?, country?
})

getUserStats(params: {
  userId?, username?,
  period?, mode?
})

getTournamentSummary(params?: {
  period?, includeWinners?
})

getGlobalStats()

getPrizes()
```

**Response Types Defined:**
- TournamentInfo
- LeaderboardEntry
- LeaderboardResponse
- BothModesLeaderboardResponse
- UserStatsResponse
- TournamentSummaryResponse
- GlobalStatsResponse
- PrizesResponse

**API Endpoints Used:**
- GET `/api/v2/tournament/leaderboard`
- GET `/api/v2/tournament/user-stats`
- GET `/api/v2/tournament/summary`
- GET `/api/v2/tournament/global-stats`
- GET `/api/v2/tournament/prizes`

#### Dependencies
- None (foundational task)

---

### Story 2.2: API Data Transformers
**Task ID**: OFFROAD-202
**Story Points**: 3
**Priority**: Highest
**Labels**: `frontend`, `data-layer`, `utilities`

#### Description
Implement data transformation utilities to convert Tournament API responses into the format expected by existing UI components.

#### Acceptance Criteria
- [ ] Transform tournament info to Leaderboard type
- [ ] Transform API entries to LeaderboardEntry type
- [ ] Transform API entries to MergedEntry type (with user data)
- [ ] Transform full leaderboard response
- [ ] Prize formatting utility
- [ ] Leaderboard ID generation utility
- [ ] Handle race data conversion (seconds to milliseconds)
- [ ] Preserve all race details (time, date, trackID)

#### Technical Details
**Files Created:**
- `src/utils/apiTransformers.ts` (136 lines)

**Transformer Functions:**
```typescript
transformTournamentToLeaderboard(response, leaderboardId)
transformApiEntryToLeaderboardEntry(apiEntry, leaderboardId)
transformApiEntryToMergedEntry(apiEntry, leaderboardId)
transformLeaderboardResponse(response, leaderboardId, prizeAmount?)
formatPrize(amount)
generateLeaderboardId(period, mode)
```

**Data Transformations:**
- Convert seconds to milliseconds for race times
- Generate user-friendly tournament names
- Map API race array to RaceDetails format
- Convert country codes
- Handle missing data with sensible defaults
- Merge user and leaderboard entry data

#### Dependencies
- OFFROAD-201 (for API response types)

---

### Story 2.3: Dashboard Live Data Integration
**Task ID**: OFFROAD-203
**Story Points**: 5
**Priority**: High
**Labels**: `frontend`, `dashboard`, `live-data`

#### Description
Integrate live tournament data into the main dashboard page, replacing static data with real-time API calls.

#### Acceptance Criteria
- [ ] Fetch live tournament summary on page load
- [ ] Display active tournaments with current leaders
- [ ] Show real-time participant counts
- [ ] Display prize pools from API
- [ ] Show time remaining for each tournament
- [ ] Auto-refresh data periodically (optional)
- [ ] Loading states during data fetch
- [ ] Error handling with user feedback
- [ ] Maintain existing UI/UX

#### Technical Details
**Files Modified:**
- `src/pages/dashboard.tsx` (+114/-69 lines)

**Live Data Displayed:**
- Active tournament list (daily, weekly, monthly)
- Current participants per tournament
- Qualified player count
- Current leader username and time
- Time remaining
- Prize pool amounts
- Platform statistics

**API Calls:**
- `tournamentApi.getTournamentSummary({ period: 'active' })`
- `tournamentApi.getGlobalStats()`
- `tournamentApi.getPrizes()`

**Performance Optimizations:**
- Parallel API calls for independent data
- Caching with stale-while-revalidate pattern
- Debounced refresh on tab focus

#### Dependencies
- OFFROAD-201 (tournament API service)
- OFFROAD-202 (data transformers)

---

### Story 2.4: Homepage Live Data Integration
**Task ID**: OFFROAD-204
**Story Points**: 5
**Priority**: High
**Labels**: `frontend`, `homepage`, `live-data`

#### Description
Update homepage with live leaderboard previews, current tournament status, and real-time statistics.

#### Acceptance Criteria
- [ ] Fetch live leaderboard data for featured tournaments
- [ ] Display top 3 players with real-time rankings
- [ ] Show current tournament countdown timers
- [ ] Display live participant counts
- [ ] Real-time prize amounts
- [ ] Platform-wide statistics (total players, races today)
- [ ] Loading skeletons during data fetch
- [ ] Error boundaries with fallback UI
- [ ] Responsive design maintained

#### Technical Details
**Files Modified:**
- `src/pages/index.tsx` (+146/-33 lines)

**Live Data Displayed:**
- Top 3 leaderboard preview (daily SP as featured)
- Active tournament cards
- Real-time participant counts
- Platform statistics (24h active players, races today)
- Current prize pools
- Tournament end countdown

**API Calls:**
- `tournamentApi.getLeaderboard({ period: 'daily', mode: 'singleplayer', limit: 3 })`
- `tournamentApi.getTournamentSummary({ includeWinners: true })`
- `tournamentApi.getGlobalStats()`

**Enhancement Features:**
- Podium animation for top 3
- Countdown timer with live updates
- Smooth transitions when data updates

#### Dependencies
- OFFROAD-201 (tournament API service)
- OFFROAD-202 (data transformers)

---

### Story 2.5: Individual Leaderboard Page Live Data
**Task ID**: OFFROAD-205
**Story Points**: 5
**Priority**: High
**Labels**: `frontend`, `leaderboard`, `live-data`

#### Description
Integrate live data into individual leaderboard pages with real-time rankings, user details, and race history.

#### Acceptance Criteria
- [ ] Fetch leaderboard data by ID (period + mode)
- [ ] Display real-time rankings
- [ ] Show actual race data from API (not mock data)
- [ ] Display user country flags
- [ ] Show qualified status
- [ ] Display race details (time, track, timestamp)
- [ ] Pagination with API offset/limit
- [ ] User search functionality
- [ ] Country filtering
- [ ] Sort by various metrics
- [ ] Loading states
- [ ] Error handling

#### Technical Details
**Files Modified:**
- `src/pages/leaderboard/[id].tsx` (+110/-20 lines)

**Live Data Displayed:**
- Full leaderboard entries (paginated)
- User rank and stats
- Cumulative time
- Races completed
- Best single race time
- Average race time
- Last updated timestamp
- Actual race details per user
- Qualification status

**API Calls:**
- `tournamentApi.getLeaderboard({ period, mode, limit, offset, country? })`
- `tournamentApi.getUserStats({ userId })` - for user profile views

**ID Mapping:**
```
daily -> daily/singleplayer
daily-multi -> daily/multiplayer
weekly -> weekly/singleplayer
weekly-multi -> weekly/multiplayer
monthly -> monthly/singleplayer
monthly-multi -> monthly/multiplayer
```

#### Dependencies
- OFFROAD-201 (tournament API service)
- OFFROAD-202 (data transformers)

---

### Story 2.6: Tournament Leaderboard Page Live Data
**Task ID**: OFFROAD-206
**Story Points**: 3
**Priority**: High
**Labels**: `frontend`, `leaderboard`, `live-data`

#### Description
Update tournament-specific leaderboard pages to fetch and display live data from the API.

#### Acceptance Criteria
- [ ] Fetch leaderboard by tournament parameter
- [ ] Support both single and dual-mode views
- [ ] Display tournament info (start/end dates, qualifying races)
- [ ] Real-time prize amounts
- [ ] Show cache age and last update time
- [ ] Pagination info (total, hasMore)
- [ ] Loading states
- [ ] Error handling with retry

#### Technical Details
**Files Modified:**
- `src/pages/leaderboards/[leaderboard].tsx` (+62/-16 lines)

**Live Data Displayed:**
- Tournament period and mode
- Start and end dates
- Qualifying race requirements
- Prize amounts (1st, 2nd, 3rd)
- Total participants
- Last data update timestamp
- Cache age indicator

**API Calls:**
- `tournamentApi.getLeaderboard({ period, mode })`
- `tournamentApi.getPrizes()` - for prize amounts

**Route Handling:**
```
/leaderboards/daily -> daily SP + MP
/leaderboards/weekly -> weekly SP + MP
/leaderboards/monthly -> monthly SP + MP
```

#### Dependencies
- OFFROAD-201 (tournament API service)
- OFFROAD-202 (data transformers)

---

### Story 2.7: Tournament Component Empty Rows Fix
**Task ID**: OFFROAD-207
**Story Points**: 2
**Priority**: Medium
**Labels**: `frontend`, `ui`, `bug-fix`

#### Description
Improve TournamentLeaderboard component to display empty rows when data is insufficient and ensure "See More" button is always visible.

#### Acceptance Criteria
- [ ] Display empty placeholder rows when entries < 10
- [ ] Ensure consistent table height
- [ ] "See More" button always rendered if hasMore is true
- [ ] Empty rows styled appropriately
- [ ] No layout shift when data loads
- [ ] Maintain existing functionality

#### Technical Details
**Files Modified:**
- `src/components/v2/TournamentLeaderboard/TournamentLeaderboard.tsx` (+45/-15 lines)

**Changes Made:**
- Calculate empty row count: `emptyRows = max(0, 10 - entries.length)`
- Render empty `<tr>` elements with placeholder data
- Move "See More" button outside conditional
- Add key props for empty rows
- Improve loading skeleton

#### Dependencies
- OFFROAD-205 or OFFROAD-206 (leaderboard pages using the component)

---

### Story 2.8: Podium UI Bug Fixes
**Task ID**: OFFROAD-208
**Story Points**: 1
**Priority**: Low
**Labels**: `frontend`, `ui`, `bug-fix`

#### Description
Fix minor UI bugs in the Podium component for all-time best display.

#### Acceptance Criteria
- [ ] Correct alignment of podium positions
- [ ] Fix spacing issues
- [ ] Resolve text overflow
- [ ] All changes are visual only (no logic changes)

#### Technical Details
**Files Modified:**
- `src/components/v2/AllTimeBest/Podium.tsx` (+3/-3 lines)

**Changes:**
- Adjusted CSS classes/styles (3 lines changed)

#### Dependencies
- None (independent UI fix)

---

## Summary Statistics

### Admin Panel Feature (Epic 1)
- **Total Story Points**: 49
- **Total Tasks**: 10
- **Files Created**: 14
- **Files Modified**: 4
- **Lines Added**: 3,704
- **Lines Removed**: 80
- **Complexity**: High (authentication, security, multiple integrations)
- **Estimated Dev Time**: 8-10 days

### Live Data Sync Feature (Epic 2)
- **Total Story Points**: 29
- **Total Tasks**: 8
- **Files Created**: 2
- **Files Modified**: 5
- **Lines Added**: 880
- **Lines Removed**: 138
- **Complexity**: Medium (API integration, data transformation)
- **Estimated Dev Time**: 5-7 days

### Combined Totals
- **Total Story Points**: 78
- **Total Tasks**: 18
- **Files Created**: 16
- **Files Modified**: 9
- **Total Lines**: +4,584 / -218
- **Estimated Dev Time**: 13-17 days (assuming single developer)

---

## Task Dependencies Diagram

```
Admin Panel:
OFFROAD-101 (Auth)
    ↓
OFFROAD-102 (API Service) → OFFROAD-103 (Layout)
    ↓                             ↓
    ├─→ OFFROAD-104 (Dashboard)   ├─→ All pages
    ├─→ OFFROAD-105 (Player List) │
    ├─→ OFFROAD-106 (Player Detail)
    │        ↓
    ├─→ OFFROAD-107 (Race Validation)
    ├─→ OFFROAD-108 (Prizes)
    └─→ OFFROAD-109 (Logs)
              ↓
         OFFROAD-110 (Docs)

Live Data Sync:
OFFROAD-201 (Tournament API)
    ↓
OFFROAD-202 (Transformers)
    ↓
    ├─→ OFFROAD-203 (Dashboard)
    ├─→ OFFROAD-204 (Homepage)
    ├─→ OFFROAD-205 (Leaderboard)
    ├─→ OFFROAD-206 (Tournament Page)
    └─→ OFFROAD-207 (Component Fix)

OFFROAD-208 (Podium Fix) - Independent
```

---

## Recommended Sprint Planning

### Sprint 1 (Admin Foundation)
- OFFROAD-101: Admin Authentication System
- OFFROAD-102: Admin API Service Layer
- OFFROAD-103: Admin Layout & Navigation
- OFFROAD-104: Admin Dashboard Overview
- **Points**: 16

### Sprint 2 (Player & Race Management)
- OFFROAD-105: Player Management - List & Search
- OFFROAD-106: Player Management - Detail View & Actions
- OFFROAD-107: Race Validation Management
- **Points**: 21

### Sprint 3 (Prizes, Logs & Live Data Foundation)
- OFFROAD-108: Prize Configuration Management
- OFFROAD-109: Admin Activity Logs
- OFFROAD-201: Tournament API Service Layer
- OFFROAD-202: API Data Transformers
- **Points**: 15

### Sprint 4 (Live Data Integration)
- OFFROAD-203: Dashboard Live Data Integration
- OFFROAD-204: Homepage Live Data Integration
- OFFROAD-205: Individual Leaderboard Page Live Data
- OFFROAD-206: Tournament Leaderboard Page Live Data
- **Points**: 18

### Sprint 5 (Polish & Documentation)
- OFFROAD-207: Tournament Component Empty Rows Fix
- OFFROAD-208: Podium UI Bug Fixes
- OFFROAD-110: Admin Panel Documentation
- **Points**: 5

---

## Testing Recommendations

### Admin Panel Testing
1. **Authentication Testing**
   - Valid/invalid credentials
   - Token expiration
   - Role validation
   - Session persistence

2. **Player Management Testing**
   - Search and filter accuracy
   - Freeze/unfreeze actions
   - Fund adjustment calculations
   - Race history display

3. **Race Validation Testing**
   - Checkpoint visualization accuracy
   - Flag/unflag functionality
   - Integration with player page
   - Search and pagination

4. **Security Testing**
   - Unauthorized access attempts
   - SQL injection protection
   - XSS prevention
   - CSRF token validation

### Live Data Sync Testing
1. **API Integration Testing**
   - All endpoints return correct data
   - Error handling for failed requests
   - Timeout handling
   - Rate limiting

2. **Data Transformation Testing**
   - Correct data mapping
   - Handle missing fields
   - Time conversions accurate
   - Race data preservation

3. **UI Testing**
   - Loading states display correctly
   - Error states show user-friendly messages
   - Data refreshes properly
   - Pagination works

4. **Performance Testing**
   - API response times
   - Large leaderboard rendering
   - Concurrent requests
   - Memory usage

---

## Risk Assessment

### High Risk Items
- **OFFROAD-101**: Authentication security critical - requires thorough security review
- **OFFROAD-107**: Race validation logic must be accurate to prevent false positives
- **OFFROAD-201**: API service is foundation for all live data - must be robust

### Medium Risk Items
- **OFFROAD-106**: Complex UI with multiple modals - potential for state management issues
- **OFFROAD-109**: Log queries could be slow with large datasets
- **OFFROAD-203-206**: Multiple pages depending on same API - failure affects many pages

### Low Risk Items
- **OFFROAD-103**: Standard layout component
- **OFFROAD-208**: Minor CSS changes
- **OFFROAD-207**: Simple UI improvement

---

## Technical Debt Notes

1. **API Key Hardcoding**: Both services have hardcoded "KEY" - should use proper env vars
2. **Error Handling**: Could be more granular with specific error types
3. **Caching Strategy**: No caching implemented - could improve performance
4. **Real-time Updates**: Currently no WebSocket for live updates
5. **Testing Coverage**: No unit tests included in the commit
6. **Type Safety**: Some `unknown` types could be more specific
7. **Accessibility**: No ARIA labels or keyboard navigation mentioned
8. **Internationalization**: No i18n support for admin panel

---

*Generated from commits on November 12, 2025*
*Commit range: f105a42 → 022b200*
