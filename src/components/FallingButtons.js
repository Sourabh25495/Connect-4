export const CreateFallingButtons = (boardSettings, handleDrop, currentPlayer) => {
    const btns = [];
    for (let i = 0; i < boardSettings.columns; i++) {
      btns.push(
        <button
          key={i}
          className="cell drop-button"
          onClick={() => handleDrop(i)}
          style={{
            backgroundColor: currentPlayer
          }}
        />
      );
    }
    return btns;
  }