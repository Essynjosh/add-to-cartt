import React, { useState } from "react";
import r4 from "./r4.jpg";
import r3 from "./r3.jpg";

function Home() {
  const items = [
    { name: "avocado with", img: r4, price: 50 },
    { name: "without cherry", img: r4, price: 40 },
    { name: "glad cherry", img: r4, price: 30 },
    { name: "cherry gladdy", img: r4, price: 20 },
  ];

  const goods = [
    { name: "food1", img: r3, price: 15 },
    { name: "food2", img: r3, price: 25 },
    { name: "food3", img: r3, price: 35 },
    { name: "food4", img: r3, price: 45 },
  ];

  const [selected, setSelected] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [orderLocked, setOrderLocked] = useState(false);

  const addToCart = (newItem) => {
    const exists = selected.find((s) => s.name === newItem.name);
    if (!exists) setSelected([...selected, { ...newItem, qty: 1 }]);
  };

  const addOne = (item) =>
    setSelected(
      selected.map((s) =>
        s.name === item.name ? { ...s, qty: s.qty + 1 } : s
      )
    );

  const removeOne = (item) => {
    const exists = selected.find((s) => s.name === item.name);
    if (!exists) return;
    if (exists.qty === 1) {
      setSelected(selected.filter((s) => s.name !== item.name));
    } else {
      setSelected(
        selected.map((s) =>
          s.name === item.name ? { ...s, qty: s.qty - 1 } : s
        )
      );
    }
  };

  const removeItemCompletely = (item) =>
    setSelected(selected.filter((s) => s.name !== item.name));

  const total = selected.reduce((sum, s) => sum + s.price * s.qty, 0);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      {/* Disabled overlay */}
      {orderLocked && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            color: "white",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: 32, marginBottom: 10 }}>✅ Order Confirmed</h1>
          <h2 style={{ fontSize: 24, marginBottom: 20 }}>
            Total: ${total.toFixed(2)}
          </h2>
          <button
            onClick={() => {
              setOrderLocked(false);
              setSelected([]);
              setShowReview(false);
            }}
            style={{
              padding: "12px 24px",
              fontSize: 16,
              background: "orange",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Order Again
          </button>
        </div>
      )}

      {/* Main layout */}
      <div style={{ display: "flex", gap: 40, opacity: orderLocked ? 0.5 : 1 }}>
        {/* Products */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: 10 }}>Dogs</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 20,
            }}
          >
            {items.map((item) => {
              const inCart = selected.some((s) => s.name === item.name);
              return (
                <div
                  key={item.name}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 12,
                    textAlign: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    width="100"
                    style={{ borderRadius: 6 }}
                  />
                  <p style={{ fontWeight: "bold", margin: "8px 0 4px" }}>
                    {item.name}
                  </p>
                  <p style={{ margin: "4px 0", color: "#444" }}>
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(item)}
                    disabled={inCart || orderLocked}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 4,
                      border: "none",
                      background: inCart ? "gray" : "green",
                      color: "white",
                      cursor: inCart ? "not-allowed" : "pointer",
                      marginTop: 6,
                    }}
                  >
                    {inCart ? "Added" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>

          <h2 style={{ margin: "30px 0 10px" }}>Cats</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 20,
            }}
          >
            {goods.map((g) => {
              const inCart = selected.some((s) => s.name === g.name);
              return (
                <div
                  key={g.name}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 12,
                    textAlign: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={g.img}
                    alt={g.name}
                    width="100"
                    style={{ borderRadius: 6 }}
                  />
                  <p style={{ fontWeight: "bold", margin: "8px 0 4px" }}>
                    {g.name}
                  </p>
                  <p style={{ margin: "4px 0", color: "#444" }}>
                    ${g.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(g)}
                    disabled={inCart || orderLocked}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 4,
                      border: "none",
                      background: inCart ? "gray" : "green",
                      color: "white",
                      cursor: inCart ? "not-allowed" : "pointer",
                      marginTop: 6,
                    }}
                  >
                    {inCart ? "Added" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: 20,
            borderRadius: 8,
            width: 400,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            background: "#fafafa",
          }}
        >
          <h1 style={{ marginBottom: 12 }}>🛒 Your Cart</h1>

          {/* Items */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
            }}
          >
            {selected.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                Cart is empty
              </div>
            ) : (
              selected.map((s) => (
                <div
                  key={s.name}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    padding: 8,
                    textAlign: "center",
                    background: "white",
                  }}
                >
                  <img
                    src={s.img}
                    alt={s.name}
                    width="80"
                    style={{ borderRadius: 6 }}
                  />
                  <div style={{ fontWeight: "bold", marginTop: 6 }}>{s.name}</div>
                  <div style={{ fontSize: 14, color: "#555" }}>
                    ${s.price.toFixed(2)}
                  </div>
                  <div>Qty: {s.qty}</div>
                  <div style={{ fontSize: 14, margin: "4px 0" }}>
                    Subtotal: ${(s.price * s.qty).toFixed(2)}
                  </div>

                  {!showReview && !orderLocked && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 6,
                          marginTop: 6,
                        }}
                      >
                        <button onClick={() => addOne(s)}>+1</button>
                        <button onClick={() => removeOne(s)}>-1</button>
                      </div>
                      <button
                        onClick={() => removeItemCompletely(s)}
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: 4,
                          marginTop: 6,
                          padding: "4px 8px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div style={{ marginTop: 20 }}>
            {showReview ? (
              <div>
                <h3>Your orders are:</h3>
                <ul>
                  {selected.map((s) => (
                    <li key={s.name}>
                      {s.qty} × {s.name} = ${(s.price * s.qty).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <h3 style={{ marginTop: 10 }}>Total: ${total.toFixed(2)}</h3>

                <div style={{ marginTop: 12, textAlign: "center" }}>
                  <button
                    onClick={() => setShowReview(false)}
                    style={{
                      marginRight: 8,
                      padding: "8px 14px",
                      borderRadius: 4,
                      border: "none",
                      background: "orange",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Change Order
                  </button>
                  <button
                    onClick={() => {
                      setOrderLocked(true);
                      setShowReview(false);
                    }}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 4,
                      border: "none",
                      background: "green",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            ) : (
              selected.length > 0 &&
              !orderLocked && (
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => setShowReview(true)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 6,
                      border: "none",
                      background: "blue",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Accept
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
