export const GetCells = ({ board }) =>
  board.map((c, i) => (
    <button
      key={"cell" + i}
      className="cell board-block"
      style={{
        backgroundColor: "none",
      }}
    />
  ));

  export const getDroppingButtons = (boardSettings, currentPlayer, handleUserMove) => {
    const cellBtn = [];

    for (let i = 0; i < boardSettings.columns; i++) {
      cellBtn.push(
        <button
          key={i}
          onClick={() => handleUserMove(i)}
          style={{
            backgroundColor: currentPlayer,
          }}
        />
      );
    }
    return cellBtn;
  };
