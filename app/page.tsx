
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import Stars from "../components/stars";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import ProjectCarousel from "../components/ProjectCarousel";
import IntroSplash from "../components/IntroSplash";

export default async function Home() {
  let liveProjects: any[] = [];

  if (supabaseAdmin) {
    const { data: projects, error } = await supabaseAdmin
      .from("projects")
      .select(
        "id, name, category, description, image_url, gallery, status, created_at"
      )
      .eq("status", "Live")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("PUBLIC PROJECTS ERROR:", error);
    }

    liveProjects = projects || [];
  } else {
    console.warn(
      "Supabase not configured; homepage project list is empty."
    );
  }

  return (
    <>
      <IntroSplash />
      <Stars />
      <Navbar />

      <main>
        {/* HERO */}
        <header className="hero">
          <div className="hero-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-mark"
              src="/outverse-mark.png"
              alt=""
            />

            <h1>
              We build digital products
              <br />
              and teach{" "}
              <span className="grad-text">
                people to build them
              </span>
            </h1>

            <p className="lead">
              Outverse is a software studio, an academy and a
              launchpad — one ecosystem for turning ideas into
              working products.
            </p>

            <div className="hero-cta">
              <a href="#contact" className="btn btn-red">
                Start a project
              </a>

              <a href="#courses" className="btn btn-ghost">
                Explore courses
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <b>40+</b>
                <span>Projects shipped</span>
              </div>

              <div>
                <b>1,200+</b>
                <span>Students taught</span>
              </div>

              <div>
                <b>6</b>
                <span>Courses live</span>
              </div>
            </div>
          </div>
        </header>

        {/* STUDIO */}
        <section className="section" id="studio">
          <div className="container">
            <span className="eyebrow">Studio</span>

            <h2>A studio that ships</h2>

            <p className="lead">
              From first sketch to production deploy — we
              design and build web apps, sites and internal
              tools for founders and teams.
            </p>

            <div className="grid3">
              <div className="card">
                <div className="icon">◆</div>

                <h3>Web apps</h3>

                <p>
                  React &amp; Next.js applications with real
                  auth, data and payments — built to scale with
                  your business.
                </p>
              </div>

              <div className="card">
                <div className="icon">◈</div>

                <h3>Product design</h3>

                <p>
                  Interfaces that feel inevitable. We design
                  systems, not screens — tokens, components and
                  clear flows.
                </p>
              </div>

              <div className="card">
                <div className="icon">◇</div>

                <h3>MVPs in weeks</h3>

                <p>
                  A focused scope, weekly demos and a
                  launch-ready product in 4–8 weeks. No endless
                  development cycles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMY */}
        <section className="section" id="academy">
          <div className="container">
            <span className="eyebrow">Academy</span>

            <h2>Learn by building for real</h2>

            <p className="lead">
              No passive video watching. Every course is a
              guided build of a real product, reviewed by
              working engineers.
            </p>

            <div className="grid3">
              <div className="card">
                <div className="icon">01</div>

                <h3>Real projects</h3>

                <p>
                  You graduate with a deployed portfolio, not a
                  certificate PDF gathering dust.
                </p>
              </div>

              <div className="card">
                <div className="icon">02</div>

                <h3>Live feedback</h3>

                <p>
                  Weekly review sessions where actual code gets
                  actually reviewed, line by line.
                </p>
              </div>

              <div className="card">
                <div className="icon">03</div>

                <h3>Career support</h3>

                <p>
                  CV clinics, mock interviews and warm intros to
                  hiring partners in our network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LAUNCHPAD */}
        <section className="section" id="launchpad">
          <div className="container">
            <span className="eyebrow">Launchpad</span>

            <h2>Idea to launch, guided</h2>

            <p className="lead">
              A structured program for founders and junior devs
              who want to take a product from idea to real users.
            </p>

            <div className="grid2">
              <div className="vstack">
                <div className="step">
                  <div className="step-num">1</div>

                  <div>
                    <h3>Scope &amp; strategy</h3>

                    <p>
                      We pressure-test the idea, define a
                      buildable MVP and cut everything that does
                      not matter.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-num">2</div>

                  <div>
                    <h3>Build sprints</h3>

                    <p>
                      Two-week sprints with demos every Friday.
                      You see progress while it happens, not at
                      the end.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-num">3</div>

                  <div>
                    <h3>Launch &amp; grow</h3>

                    <p>
                      Deploy, measure, iterate. We stay on for
                      the first months after launch to help you
                      find traction.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <h3 style={{ fontSize: "1.5rem" }}>
                  Next cohort starts soon
                </h3>

                <p style={{ fontSize: ".95rem" }}>
                  Limited seats. Applications reviewed on a
                  rolling basis.
                </p>

                <a
                  href="https://forms.gle/BQxzCCxJa98cmHAFA"
                  className="btn btn-red"
                  style={{ marginTop: 8 }}
                >
                  Apply now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section className="section" id="courses">
          <div className="container">
            <span className="eyebrow">Courses</span>

            <h2>Popular courses</h2>

            <p className="lead">
              Practical, project-based paths taught the way we
              wish someone had taught us.
            </p>

            <div className="coming-soon-wrapper">
              <div className="card course course-coming-soon single-course-panel">
                <span className="tag">Coming soon</span>

                <h3>New courses dropping soon</h3>

                <p>
                  We are building fresh practical tracks for
                  founders, builders, and product teams.
                </p>

                <div className="loading-wrapper">
                  <div className="loading-bar">
                    <span className="loading-fill" />
                  </div>

                  <div className="loading-meta">
                    <span>Launch prep</span>
                    <strong>90%</strong>
                  </div>
                </div>
                
              </div>
              
            </div>
          </div>
        </section>

        {/* WORK - CONNECTED TO SUPABASE */}
        <section className="section" id="work">
          <div className="container">
            <span className="eyebrow">Work</span>

            <h2>Selected work</h2>

            <p className="lead">
              A few things we have designed, built and launched
              recently.
            </p>

            <div className="work-grid">
              {liveProjects.length > 0 ? (
                liveProjects.map((project) => (
                  <ProjectCarousel
                    key={project.id}
                    project={project}
                  />
                ))
              ) : (
                <div className="work-tile">
                  <span className="label">
                    Projects coming soon
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="container">
            <div className="cta-box">
              <span className="eyebrow">
                Get in touch
              </span>

              <h2>
                Have an idea?{" "}
                <span className="grad-text">
                  Let&apos;s build it.
                </span>
              </h2>

              <p
                className="lead"
                style={{ margin: "0 auto 32px" }}
              >
                Tell us what you want to make — a product, a
                career switch, or both.
              </p>

              <a
                href="mailto:hello@outverse.dev"
                className="btn btn-red"
              >
                hello@outverse.dev
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
