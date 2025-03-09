import { useState } from "react";

import PositionsTable from "./PositionsTable";
import OrdersTable from "./OrdersTable";
import Tab from "./Tab";

export default function AccountInfo({ price, positions, openOrders }) {
  const [currentTab, setcurrentTab] = useState("positions");

  return (
    <>
      <section id="account-info">
        <Tab
          currentTab={currentTab}
          name="positions"
          onClick={setcurrentTab}
          value="Positions"
        />
        <Tab
          currentTab={currentTab}
          name="openOrders"
          onClick={setcurrentTab}
          value="Open Orders"
        />
      </section>

      {currentTab === "positions" && (
        <PositionsTable
          price={price.length > 0 ? price[0].y[3] : 0.0}
          positions={positions}
        />
      )}
      {currentTab === "openOrders" && <OrdersTable orders={openOrders} />}
    </>
  );
}
