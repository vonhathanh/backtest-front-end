import { useState } from "react";

import PositionsTable from "./PositionsTable";
import OrdersTable from "./OrdersTable";
import Tab from "./Tab";

export default function AccountInfo({ price, positions, openOrders }) {
  const [currentTab, setcurrentTab] = useState("positions");

  return (
    <section>
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
          price={price ? price.close : 0.0}
          positions={positions}
        />
      )}
      {currentTab === "openOrders" && <OrdersTable orders={openOrders} />}
    </section>
  );
}
