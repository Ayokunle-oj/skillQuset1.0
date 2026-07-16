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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
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
        {/* this is the container */}
        <div className="dash_grid_layout">
          {/* this is the wrapper */}
          <div className="dash_wrapper">
            {/* item 1 */}

            <div className="item-1">
              <div className="item_wrapper">
                <div className="item_icon">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div
                  className="item_text_up"
                  style={{ fontFamily: "Times New Roman" }}
                >
                  KEEP GOING
                </div>
              </div>
              <div
                className="item_number"
                style={{ fontFamily: "Times New Roman" }}
              >
                56
              </div>
              <div
                className="item_text_down"
                style={{ fontFamily: "Times New Roman" }}
              >
                streaks
              </div>
            </div>
            {/* item 2 */}
            <div className="item-2">
              <div className="item_wrapper">
                <div className="item_icon"></div>
                <div
                  className="item_text_up"
                  style={{ fontFamily: "Times New Roman" }}
                >
                  +5 new Views
                </div>
              </div>
              <div
                className="item_number"
                style={{ fontFamily: "Times New Roman" }}
              >
                5M
              </div>
              <div
                className="item_text_down"
                style={{ fontFamily: "Times New Roman" }}
              >
                Followers
              </div>
            </div>
            {/* item 3 */}
            <div className="item-3">
              <div className="item_wrapper">
                <div className="item_icon"></div>
                <div
                  className="item_text_up"
                  style={{ fontFamily: "Times New Roman" }}
                >
                  LEVEL UP
                </div>
              </div>
              <div
                className="item_number"
                style={{ fontFamily: "Times New Roman" }}
              >
                1,056
              </div>
              <div
                className="item_text_down"
                style={{ fontFamily: "Times New Roman" }}
              >
                Coins
              </div>
            </div>
            <div className="item-4">
              <div className="cal-header">
                <button className="cal-nav" aria-label="Previous month">
                  <svg viewBox="0 0 8 14" fill="none">
                    <path
                      d="M7 1L1 7l6 6"
                      stroke="#9a9a9a"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <span className="cal-title">August, 2023</span>
                <button className="cal-nav" aria-label="Next month">
                  <svg viewBox="0 0 8 14" fill="none">
                    <path
                      d="M1 1l6 6-6 6"
                      stroke="#9a9a9a"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="cal-grid">
                <div className="cal-cell weekday">S</div>
                <div className="cal-cell weekday">M</div>
                <div className="cal-cell weekday">T</div>
                <div className="cal-cell weekday">W</div>
                <div className="cal-cell weekday">T</div>
                <div className="cal-cell weekday">F</div>
                <div className="cal-cell weekday">S</div>

                <div className="cal-cell faded">29</div>
                <div className="cal-cell faded">30</div>
                <div className="cal-cell faded">31</div>
                <div className="cal-cell">1</div>
                <div className="cal-cell">2</div>
                <div className="cal-cell">3</div>
                <div className="cal-cell">4</div>

                <div className="cal-cell">5</div>
                <div className="cal-cell">6</div>
                <div className="cal-cell">7</div>
                <div className="cal-cell">8</div>
                <div className="cal-cell">9</div>
                <div className="cal-cell">10</div>
                <div className="cal-cell">11</div>

                <div className="cal-cell">12</div>
                <div className="cal-cell">13</div>
                <div className="cal-cell">14</div>
                <div className="cal-cell">15</div>
                <div className="cal-cell">16</div>
                <div className="cal-cell active">
                  <span>17</span>
                </div>
                <div className="cal-cell">18</div>

                <div className="cal-cell">19</div>
                <div className="cal-cell">20</div>
                <div className="cal-cell">21</div>
                <div className="cal-cell">22</div>
                <div className="cal-cell">23</div>
                <div className="cal-cell">24</div>
                <div className="cal-cell">25</div>

                <div className="cal-cell">26</div>
                <div className="cal-cell">27</div>
                <div className="cal-cell">28</div>
                <div className="cal-cell">29</div>
                <div className="cal-cell">30</div>
                <div className="cal-cell">31</div>
                <div className="cal-cell faded">1</div>
              </div>
            </div>
            <div className="item-5">
              <div className="chart">
                <div className="chart-header">
                  <p className="chart-title">Hours Activity</p>
                  <div className="period-dropdown">
                    Weekly
                    <svg viewBox="0 0 10 6" fill="none">
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="#4a4a4a"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="increase-row">
                  <div className="increase-badge">
                    <svg viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="#2fb463"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="increase-text">
                    <strong>+3%</strong> increase than last week
                  </span>
                </div>

                <div className="chart-body">
                  <div className="y-axis">
                    <span>8h</span>
                    <span>6h</span>
                    <span>4h</span>
                    <span>2h</span>
                    <span>1h</span>
                  </div>

                  <div className="bars-area">
                    <div className="bar-col">
                      <div className="bar" style={{ height: "62%" }}></div>
                      <span className="bar-label">Su</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: "78%" }}></div>
                      <span className="bar-label">Mo</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: "34%" }}></div>
                      <span className="bar-label">Tu</span>
                    </div>
                    <div className="bar-col">
                      <div
                        className="bar active"
                        style={{ height: "85%" }}
                      ></div>
                      <div className="tooltip">
                        <div className="tooltip-row">
                          <span className="tooltip-clock">🕐</span> 6h 45 min
                        </div>
                        <div className="tooltip-row">
                          <span className="tooltip-dot"></span> 5 Jan 2023
                        </div>
                      </div>
                      <span className="bar-label">We</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: "68%" }}></div>
                      <span className="bar-label">Th</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: "18%" }}></div>
                      <span className="bar-label">Fr</span>
                    </div>
                    <div className="bar-col">
                      <div className="bar" style={{ height: "62%" }}></div>
                      <span className="bar-label">Sa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-6">
              <div className="leader-container">
                <div className="title">🏆 Leadership Board</div>

                <div className="row rank-1">
                  <div className="row-left">
                    <div className="icon">JD</div>
                    <div className="name-con">
                      <div className="name">user name</div>
                      <div className="level">LEVEL 5</div>
                    </div>
                  </div>
                  <div className="position">1st</div>
                </div>

                <div className="row rank-2">
                  <div className="row-left">
                    <div className="icon">JD</div>
                    <div className="name-con">
                      <div className="name">user name</div>
                      <div className="level">LEVEL 5</div>
                    </div>
                  </div>
                  <div className="position">2nd</div>
                </div>

                <div className="row rank-3">
                  <div className="row-left">
                    <div className="icon">JD</div>
                    <div className="name-con">
                      <div className="name">user name</div>
                      <div className="level">LEVEL 5</div>
                    </div>
                  </div>
                  <div className="position">3rd</div>
                </div>

                <div className="row rank-other">
                  <div className="row-left">
                    <div className="icon">JD</div>
                    <div className="name-con">
                      <div className="name">user name</div>
                      <div className="level">LEVEL 5</div>
                    </div>
                  </div>
                  <div className="position">4th</div>
                </div>

                <div className="row rank-other">
                  <div className="row-left">
                    <div className="icon">JD</div>
                    <div className="name-con">
                      <div className="name">user name</div>
                      <div className="level">LEVEL 5</div>
                    </div>
                  </div>
                  <div className="position">5th</div>
                </div>
              </div>
            </div>
            <div className="item-7">7</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash_Home_page;
