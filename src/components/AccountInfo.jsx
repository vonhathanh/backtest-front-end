import { useState } from "react";

import PositionsTable from "./PositionsTable";
import OrdersTable from "./OrdersTable";
import OrderHistoryTable from "./OrderHistoryTable";
import Tab from "./Tab";

export default function AccountInfo({ price, positions, openOrders, filledOrders }) {
  const [currentTab, setcurrentTab] = useState("positions");

  return (
    <section>
      <section id="account-info">
        <Tab currentTab={currentTab} name="positions" onClick={setcurrentTab} value="Positions" />
        <Tab
          currentTab={currentTab}
          name="openOrders"
          onClick={setcurrentTab}
          value="Open Orders"
        />
        <Tab
          currentTab={currentTab}
          name="orderHistory"
          onClick={setcurrentTab}
          value="Order History"
        />
      </section>

      {currentTab === "positions" && (
        <PositionsTable price={price ? price.close : 0.0} positions={positions} />
      )}
      {currentTab === "openOrders" && <OrdersTable orders={openOrders} />}
      {currentTab === "orderHistory" && <OrderHistoryTable orders={filledOrders} />}
    </section>
  );
}
