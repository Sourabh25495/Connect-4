export const CurrentPlayer = ({
  boardSettings,
  currentPlayer,
  win,
  setShowGame,
}) => {
  return (
    <>
      {!win ? (
        <h2 style={{ color: currentPlayer }}>
          {currentPlayer === boardSettings.colors.p1
            ? boardSettings.playerNames.p1
            : boardSettings.playerNames.p2}
        </h2>
      ) : (
        <>
          <h1 style={{ color: win.winner }}>
            {" "}
            {win.winner === boardSettings.colors.p1
              ? boardSettings.playerNames.p1
              : boardSettings.playerNames.p2}{" "}
            WON!
          </h1>
          <button onClick={() => setShowGame(false)}>Restart</button>
          <br />
        </>
      )}
    </>
  );
};
