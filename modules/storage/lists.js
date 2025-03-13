const orders = {
    current: {}, // Kundens nuvarande order
    previous: [], // Tidigare ordrar (måste ha date.now()-ordernummer som id. Sista i arrayen är senaste)
    toRestaurant: [], // Restaurangens orderlista
  };