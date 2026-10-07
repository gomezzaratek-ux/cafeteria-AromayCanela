// Catálogo de productos con estado actualizado en tiempo real
const products = [
    {
        id: 1,
        name: "Latte de Caramelo",
        category: "calientes",
        price: 9.50,
        status: "disponible", // disponible, agotado, ultimas
        statusText: "Disponible",
        stockCount: null,
        description: "Espresso doble con leche texturizada y nuestro dulce caramelo artesanal de la casa.",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
        review: "Dulce y reconfortante. El toque de caramelo está perfectamente equilibrado."
    },
    {
        id: 2,
        name: "Capuchino Clásico",
        category: "calientes",
        price: 8.50,
        status: "disponible",
        statusText: "Disponible",
        stockCount: null,
        description: "Partes iguales de espresso, leche vaporizada y una generosa capa de espuma cremosa.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
        review: "Espuma cremosa y cuerpo intenso. Un clásico que nunca falla."
    },
    {
        id: 3,
        name: "Espresso Vainilla Bourbon",
        category: "calientes",
        price: 7.00,
        status: "ultimas",
        statusText: "¡Últimas 3 porciones!",
        stockCount: 3,
        description: "Café de grano seleccionado con infusión natural de vainilla bourbon.",
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80",
        review: "Aroma inigualable a vainilla natural. Ideal para acompañar la tarde."
    },
    {
        id: 4,
        name: "Café Mocha Helado",
        category: "frias",
        price: 11.00,
        status: "disponible",
        statusText: "Disponible",
        stockCount: null,
        description: "Mezcla fría de espresso, cacao fino peruano, leche fría y hielo granizado.",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
        review: "Refrescante y con notas intensas a chocolate y café."
    },
    {
        id: 5,
        name: "Cold Brew Artesanal",
        category: "frias",
        price: 10.00,
        status: "disponible",
        statusText: "Disponible",
        stockCount: null,
        description: "Extracción en frío durante 18 horas. Notas florales y baja acidez.",
        image: "https://images.unsplash.com/photo-1517578230551-e6a3cf9355c7?auto=format&fit=crop&w=600&q=80",
        review: "Suave, energizante y sin amargor. Una obra de arte."
    },
    {
        id: 6,
        name: "Frappé de Dulce de Leche",
        category: "frias",
        price: 12.50,
        status: "agotado",
        statusText: "Agotado temporalmente",
        stockCount: 0,
        description: "Batido helado con manjar blanco artesanal, café espresso y crema batida.",
        image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600&q=80",
        review: "¡El favorito del público! Vuelve mañana por más."
    },
    {
        id: 7,
        name: "Croissant de Jamón y Queso Edam",
        category: "salados",
        price: 10.00,
        status: "disponible",
        statusText: "Disponible",
        stockCount: null,
        description: "Hojaldre francés crujiente recién horneado relleno con jamón inglés y queso fundido.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
        review: "Masa sumamente hojaldrada y crujiente con centro tibio y fundido."
    },
    {
        id: 8,
        name: "Panini Caprese",
        category: "salados",
        price: 13.00,
        status: "ultimas",
        statusText: "¡Quedan 2 unidades!",
        stockCount: 2,
        description: "Pan artesanal de masa madre, mozzarella fresca, tomates jugosos y albahaca.",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
        review: "Ingredientes súper frescos y el pan tostado en su punto exacto."
    },
    {
        id: 9,
        name: "Quiche Lorraine",
        category: "salados",
        price: 11.50,
        status: "disponible",
        statusText: "Disponible",
        stockCount: null,
        description: "Tarta salada horneada con tocino ahumado, crema de leche y queso gruyère.",
        image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=600&q=80",
        review: "Porción generosa, textura suave y delicado aroma ahumado."
    },
    {
        id: 10,
        name: "Torta de Chocolate Fudge",
        category: "dulces",
        price: 10.50,
        status: "disponible",
        statusText: "Disponible",
        stockCount: null,
        description: "Bizcocho húmedo de cacao con capas de fudge artesanal de chocolate peruano.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
        review: "Intenso sabor a chocolate, sumamente húmedo y equilibrado."
    },
    {
        id: 11,
        name: "Cheesecake de Frutos Rojos",
        category: "dulces",
        price: 11.00,
        status: "ultimas",
        statusText: "¡Últimas 4 porciones!",
        stockCount: 4,
        description: "Clásico pastel de queso cremoso sobre base de galleta y compota de frutos rojos.",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
        review: "Textura sedosa con un contraste ácido y dulce perfecto."
    },
    {
        id: 12,
        name: "Roll de Canela Glaseado",
        category: "dulces",
        price: 8.00,
        status: "agotado",
        statusText: "Agotado",
        stockCount: 0,
        description: "Suave masa brioche enrollada con canela de Ceylon y glaseado tibio de queso crema.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        review: "Suave y aromático. El glaseado derrite en la boca."
    }
];
