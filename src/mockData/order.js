export const fetchOrders = () => {
  return [
    {
      id: 1,
      customerName: "Ram",
      price: 54,
      lastModified: "2024-05-24T12:46:41.995873Z",
    },
    {
      id: 2,
      customerName: "John Doe",
      price: 32,
      lastModified: "2024-05-23T11:35:41.995873Z",
    },
  ];
};

export const fetchCompletedOrders = () => {
  return [
    {
      id: 1,
      customerName: "Jane Smith",
      price: 75,
      lastModified: "2024-05-22T09:15:41.995873Z",
    },
    {
      id: 2,
      customerName: "Bob Johnson",
      price: 120,
      lastModified: "2024-05-21T14:30:41.995873Z",
    },
  ];
};
