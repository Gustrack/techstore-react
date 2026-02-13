const products = [
  // Laptops
  {
    id: 1,
    title: "MacBook Pro 14",
    price: 1999.99,
    description: "Chip M3 Pro con CPU de 12 núcleos y GPU de 18 núcleos, 16GB RAM, 512GB SSD. Pantalla Liquid Retina XDR de 14 pulgadas.",
    category: "laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    stock: 8
  },
  {
    id: 2,
    title: "Dell XPS 15",
    price: 1799.99,
    description: "Intel Core i7 de 13ª generación, 16GB RAM, 512GB SSD, NVIDIA GeForce RTX 3050. Pantalla OLED 3.5K.",
    category: "laptops",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    stock: 5
  },
  {
    id: 3,
    title: "HP Spectre x360",
    price: 1499.99,
    description: "Intel Core i7, 16GB RAM, 1TB SSD, pantalla táctil 2-en-1 de 13.5 pulgadas. Incluye lápiz digital.",
    category: "laptops",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    stock: 10
  },
  {
    id: 4,
    title: "iPhone 15 Pro",
    price: 1199.99,
    description: "Titanio, chip A17 Pro, pantalla Super Retina XDR de 6.1 pulgadas, cámara de 48MP, batería para todo el día.",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
    stock: 15
  },
  {
    id: 5,
    title: "Samsung Galaxy S24 Ultra",
    price: 1299.99,
    description: "Pantalla Dynamic AMOLED 2X de 6.8 pulgadas, Snapdragon 8 Gen 3, cámara de 200MP, S Pen incluido.",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
    stock: 7
  },
  {
    id: 6,
    title: "Google Pixel 8 Pro",
    price: 999.99,
    description: "Tensor G3, pantalla Super Actua de 6.7 pulgadas, cámara avanzada con IA, 7 años de actualizaciones.",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    stock: 12
  },
  {
    id: 7,
    title: "iPad Pro 12.9",
    price: 1299.99,
    description: "Chip M2, pantalla Liquid Retina XDR de 12.9 pulgadas, 128GB, compatible con Apple Pencil y Magic Keyboard.",
    category: "tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    stock: 6
  },
  {
    id: 8,
    title: "Samsung Tab S9 Ultra",
    price: 1199.99,
    description: "Pantalla Dynamic AMOLED 2X de 14.6 pulgadas, Snapdragon 8 Gen 2, S Pen incluido, resistente al agua.",
    category: "tablets",
    image: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=500",
    stock: 4
  },
  {
  id: 9,
  title: "Microsoft Surface Pro 9",
  price: 1399.99,
  description: "Intel Core i5, 8GB RAM, 256GB SSD, pantalla táctil de 13 pulgadas, incluye teclado.",
  category: "tablets",
  image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500&auto=format", 
  stock: 3
}
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1500);
  });
};

export const getProductByCategory = (category) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const filteredProducts = products.filter(
                (product) => product.category === category
            );
            
            if (filteredProducts.length > 0) {
                resolve(filteredProducts);
            } else {
                reject(new Error(`No se encontraron productos en la categoría: ${category}`));
            }
        }, 1500); // ✅ setTimeout cierra aquí
    });
};

export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((product) => product.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Producto no encontrado"));
      }
    }, 1500);
  });
};

export default products;
