import React, { useEffect, useState } from "react";
import FootballMatchModel from "../FootballMatchModel/FootballMatchModel";
import "./HeroSection.css";
import { parseISO, isValid, format } from "date-fns";

const HeroSection = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/matches");
        if (!response.ok) throw new Error("Failed to fetch matches");

        const data = await response.json();
        const matchObjs = data.map((m) => FootballMatchModel.fromJson(m));
        setMatches(matchObjs);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading football matches...</p>;
  if (!matches.length) return <p>No matches found.</p>;

  return (
    <section className="hero-section">
      <h1 className="hero-title">⚽ Live Matches</h1>

      <div className="match-list">
        {matches.map((match) => {
          // Safe date parsing
          let parsedDate = parseISO(match.matchDate);
          if (!isValid(parsedDate)) {
            const [year, month, day] = match.matchDate.split("-");
            parsedDate = new Date(`${year}-${month}-${day}`);
          }
          const formattedDate = isValid(parsedDate)
            ? format(parsedDate, "PPP")
            : "Invalid date";

          // Use team logos directly from backend, with fallback
          const homeLogo = match.homeTeamId?.logo || "default-home-logo.png";
          const awayLogo = match.awayTeamId?.logo || "default-away-logo.png";

          return (
            <div key={match.id} className="match-card single-match-card">
              <h2 className="team-lineup">
                <img
                  src={homeLogo}
                  alt={match.homeTeamId?.name || "Home Team"}
                  className="team-logo"
                />
                <span className="team-name">
                  {match.homeTeamId?.name || "Home Team"}
                </span>
                <span className="team-score">{match.homeScore ?? 0}</span>

                <span className="vs"> vs </span>

                <span className="team-score">{match.awayScore ?? 0}</span>
                <span className="team-name">
                  {match.awayTeamId?.name || "Away Team"}
                </span>
                <img
                  src={awayLogo}
                  alt={match.awayTeamId?.name || "Away Team"}
                  className="team-logo"
                />
              </h2>

              <p className="match-date">📅 {formattedDate}</p>
              <p className="match-stadium">🏟 {match.stadium || "Unknown Stadium"}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
