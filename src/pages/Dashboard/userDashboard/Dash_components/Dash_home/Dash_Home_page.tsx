// ============================================
// DASH_HOME_PAGE — NOTES & TODO
// ============================================

// ---- FIXED ----
// - interface DataProps had a stray colon before `{` — interfaces don't use `:`
//   (that was the actual syntax error breaking compilation)

// ---- TODO: DATA FETCHING ----
// [ ] Replace static `greeting` prop with a fetch to backend (/api/dashboard or similar)
// [ ] Use useState + useEffect to load: userName, greeting, activities[]
// [ ] Add loading state (show spinner/skeleton, not blank screen)
// [ ] Add error state (show retry button, don't just console.log and die)
// [ ] Type the response properly — don't use `any`, define DashboardData + Activity interfaces

// ---- TODO: AUTH / PROTECTION ----
// [ ] Decide auth strategy: cookie-based (credentials: "include") vs JWT (Authorization header)
//     -> check what AuthProvider/useAuth is already doing elsewhere in the app, stay consistent
// [ ] Make sure this route is wrapped in a protected route (redirect to /login if not authenticated)
//     -> check redirectUtils.ts / consumeRedirectPath, reuse same pattern as other dashboard pages
// [ ] Handle 401/403 responses from backend specifically — auto logout + redirect, not generic error
// [ ] Don't trust frontend-only auth checks — backend must verify token/session on every request
// [ ] If using tokens, store securely (httpOnly cookie preferred over localStorage if possible)
// [ ] Sanitize/validate any user-generated content before rendering (activity titles, etc.)
//     -> reuse sanitize.ts pattern from earlier SkillQuest work

// ---- TODO: UX / EDGE CASES ----
// [ ] Empty state: what shows if activities[] is empty? ("No activity yet" message)
// [ ] Handle slow network gracefully — don't let loading state hang forever (add timeout?)
// [ ] Re-fetch on focus/interval? or just on mount? decide based on how "live" this needs to be

// ---- TODO: CODE CLEANUP ----
// [ ] Rename component to PascalCase consistently (Dash_Home_page -> DashHomePage)
//     -> only do this if it doesn't break existing imports/routes elsewhere
// [ ] Move fetch logic into a custom hook (useDashboardData) if this pattern repeats
//     across other dashboard pages — keeps components clean

// ============================================

// import { Activity, useEffect, useState } from "react";
import "./dash_home.css";
// interface DashboardData {
//   greeting: string;
//   userName: string;
//   activities: Activity[];
// }

// interface Activity {
//   id: string;
//   title: string;
//   date: string;
// }

function Dash_Home_page() {
  // const [Data, setData] = useState<DashboardData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchDashboardData() {
  //     try {
  //       const response = await fetch("/api/dashboard", {
  //         credentials: "include",
  //       });
  //       if (!response.ok) {
  //         throw new Error("failed to load dashboard data");
  //       }
  //       const result: DashboardData = await response.json();
  //       setData(result);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "something went wrong");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchDashboardData();
  // }, []);

  // if (loading) return <div className="dash_home_container">Loading...</div>;
  // if (error) return <div className="dash_home_container">Error: {error}</div>;
  // if (!Data) return null;

  return (
    <div className="dash_home_container">
      <div className="dash_home_wrapper">
        <div className="dash_home_header">
          <h2 className="dash_home_greeting">
            Welcome Back, David
            {/* {Data?.greeting}, {Data?.userName} */}
          </h2>
          <div className="dash_search_profile">
            <input type="text" placeholder="Search" />
            <div className="notification"></div>
            <div className="profile"></div>
          </div>
        </div>
        <div className="dash_home_activities">
          {/* {Data.activities.map((activity) => ( */}
          <div
            //  key={activity.id}
            className="dash_activity_item"
          >
            {/* <p>{activity.title}</p> */}
            {/* <span>{activity.date}</span> */}
          </div>
          {/* ))} */}
        </div>
        <div className="dash_grid_layout"></div>
      </div>
    </div>
  );
}

export default Dash_Home_page;
