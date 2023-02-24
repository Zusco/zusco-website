const indicatorStyles = {
  background: "#fff",
  width: 8,
  height: 8,
  display: "inline-block",
  margin: "0 8px",
  borderRadius: "100%",
  transition: "all 1s ease",
};
export const renderIndicator = (onClickHandler, isSelected, index, label) => {
  if (isSelected) {
    return (
      <li
        style={{
          ...indicatorStyles,
          background: "#000",
          width: 16,
          borderRadius: 4,
        }}
        aria-label={`Selected: ${label} ${index + 1}`}
        title={`Selected: ${label} ${index + 1}`}
      />
    );
  }
  return (
    <li
      style={indicatorStyles}
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      value={index}
      key={index}
      role="button"
      tabIndex={0}
      title={`${label} ${index + 1}`}
      aria-label={`${label} ${index + 1}`}
    />
  );
};
