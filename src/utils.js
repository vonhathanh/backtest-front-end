export function toCamelCase(str) {
  return str
    .split(/[\s-_]+/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

export function createPriceLineFromOrder(order) {
  return {
    price: order.price,
    color: order.side === "BUY" ? "#00E396" : "#F72411",
    lineWidth: 2,
    lineStyle: 2, // LineStyle.Dashed
    axisLabelVisible: false,
    title: order.id,
  };
}

export function createMarkerFromOrder(order) {
  if (order.side === "BUY") {
    return {
      color: "green",
      position: "aboveBar",
      shape: "arrowDown",
      time: order.createdAt,
    };
  } else {
    return {
      color: "red",
      position: "belowBar",
      shape: "arrowUp",
      time: order.createdAt,
    };
  }
}

export function crosshairMoveHandler(param, tooltip, series, chartContainerRef) {
  const toolTipWidth = 80;
  const toolTipHeight = 80;
  if (
    param.point === undefined ||
    !param.time ||
    param.point.x < 0 ||
    param.point.x > chartContainerRef.clientWidth ||
    param.point.y < 0 ||
    param.point.y > chartContainerRef.clientHeight
  ) {
    tooltip.style.display = "none";
  } else {
    tooltip.style.display = "block";

    const data = param.seriesData.get(series);

    tooltip.innerHTML = `
          Open: ${data.open.toFixed(2)}
            <br>High: ${data.high.toFixed(2)}
            <br>Low: ${data.low.toFixed(2)}
            <br>Close: ${data.close.toFixed(2)}
          `;

    let x = param.point.x - toolTipWidth;
    let y = param.point.y - toolTipHeight;

    const MAX_X = chartContainerRef.clientWidth - toolTipWidth;
    const MAX_Y = chartContainerRef.clientHeight - toolTipHeight;

    x = Math.min(Math.max(0, x), MAX_X);
    y = Math.min(Math.max(0, y), MAX_Y);

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
}
