import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const StakeGame = lazy(() => import("./pages/StakeGame"));
const TicTacToeGame = lazy(() => import("./pages/TicTacToeGame"));

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <Header />
        <main className="flex-grow p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      to="/stake"
                      className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <h2 className="text-xl font-bold mb-2">Stake Game</h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        Play the New Generation Stake Game, Add a Bet & Win Cash
                        Prize.
                      </p>
                    </Link>
                    <Link
                      to="/tic-tac-toe"
                      className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <h2 className="text-xl font-bold mb-2">Tic-Tac-Toe</h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        Play the classic Tic-Tac-Toe game with Computer.
                      </p>
                    </Link>
                  </div>
                }
              />
              <Route path="/stake" element={<StakeGame />} />
              <Route path="/tic-tac-toe" element={<TicTacToeGame />} />
              <Route
                path="*"
                element={
                  <div className="text-xl">Not Found Check the Correct URL</div>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
