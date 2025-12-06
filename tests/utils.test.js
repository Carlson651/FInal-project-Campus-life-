test("filtering works correctly", () => {
  const items = [
    { title: "Chess club" },
    { title: "Sports" },
    { title: "Library" }
  ];

  const filtered = items.filter(i => i.title.toLowerCase().includes("c"));

  expect(filtered.length).toBe(1);
});
